import json
import os
import time
import datetime
import urllib.request
import urllib.parse
import urllib.error
import boto3
import logging
from botocore.exceptions import ClientError

# Configure structured logging
logger = logging.getLogger()
logger.setLevel(logging.INFO)

# Environment variables with sensible defaults
TABLE_NAME = os.environ.get('TABLE_NAME', 'RecruiterLeads')
SECRET_NAME = os.environ.get('SECRET_NAME', 'prod/LLM/ApiKey')
SECRET_REGION = os.environ.get('SECRET_REGION', 'us-east-2')
SENDER_EMAIL = os.environ.get('SENDER_EMAIL') or 'Jerweb17@gmail.com'
MY_EMAIL = os.environ.get('MY_EMAIL') or 'Jerweb17@gmail.com'

# Initialize AWS SDK clients outside handler for connection reuse across invocations
dynamodb = boto3.resource('dynamodb')
ses = boto3.client('ses')
secrets_client = boto3.client('secretsmanager', region_name=SECRET_REGION)

# Global cache for the secret key to reuse across warm Lambda invocations
_CACHED_API_KEY = None

def get_llm_api_key() -> str:
    """
    Securely retrieves the LLM API key from AWS Secrets Manager using boto3.
    Caches the retrieved key in global scope to minimize AWS Secrets Manager calls.
    """
    global _CACHED_API_KEY
    if _CACHED_API_KEY:
        return _CACHED_API_KEY

    logger.info("Fetching API key from Secrets Manager: %s", SECRET_NAME)
    try:
        response = secrets_client.get_secret_value(SecretId=SECRET_NAME)
        secret_string = response.get('SecretString')
        if not secret_string:
            raise ValueError("SecretString is empty in Secrets Manager response")

        # Parse JSON format if key-value store, otherwise use raw secret string
        try:
            secret_dict = json.loads(secret_string)
            api_key = (
                secret_dict.get('API_KEY') or 
                secret_dict.get('GEMINI_API_KEY') or 
                secret_dict.get('OPENAI_API_KEY')
            )
            if not api_key:
                # Fallback to the first value in dictionary if key name varies
                api_key = list(secret_dict.values())[0]
        except json.JSONDecodeError:
            api_key = secret_string.strip()

        _CACHED_API_KEY = api_key
        return _CACHED_API_KEY
    except ClientError as e:
        error_code = e.response.get('Error', {}).get('Code', 'Unknown')
        if error_code == 'ResourceNotFoundException':
            logger.error("Secret '%s' not found in Secrets Manager. Please ensure the secret is created in region us-east-1.", SECRET_NAME)
            raise RuntimeError(f"Secret '{SECRET_NAME}' not found in AWS Secrets Manager")
        else:
            logger.error("AWS Secrets Manager error while retrieving secret '%s': %s", SECRET_NAME, str(e))
            raise
    except Exception as e:
        logger.error("Failed to process secret from Secrets Manager: %s", str(e))
        raise

def generate_llm_pitch(name: str, company: str, job_description: str, api_key: str) -> str:
    """
    Calls the Google Gemini LLM REST API using Python's built-in urllib.request (zero third-party dependencies).
    Includes a 10-second request timeout to prevent Lambda hanging.
    """
    system_prompt = (
        "You are the personal AI assistant for Jeremy R. Webster, a Database and Application "
        "Software Engineer based in Northern Utah. Your job is to read a recruiter's job "
        "description and write an introductory email on Jeremy's behalf.\n\n"
        "Here is Jeremy's resume context:\n"
        "- Software Engineer & Supply Chain Technical Analyst at Intel Corporation (June 2009 - "
        "Sept 2024). 15 years of enterprise experience building internal tools, BI dashboards, "
        "and supply chain applications using C# .NET, SQL Server, Angular, and Python.\n"
        "- Software Engineer at PACS (July 2025 - Oct 2025). Built compliance web tools to manage "
        "and report employee hours across the country using .NET Razor MVC applications on all tiers.\n"
        "- Co-Founder & Lead Developer at Pueblo Language (Nov 2025 - Present). Building a startup "
        "language tutoring platform using React, TypeScript, Firebase, and Bun.\n"
        "- Tech Stack & Skills: Modern web applications, React, TypeScript, Vite, Firebase, "
        ".NET Razor MVC, AWS serverless pipelines (Lambda, API Gateway, DynamoDB, SES, Secrets Manager), "
        "AI-driven development (Cursor IDE, Google Antigravity), Python, C#, SQL Server, Power BI, Tableau.\n"
        "- Education: B.S. in Information Systems, Brigham Young University (April 2009); "
        "Nanodegree in Full Stack Web Development, Udacity (March 2017).\n\n"
        "Instructions for the email you write:\n"
        "1. Write a professional, concise email to the recruiter/hiring manager.\n"
        "2. Calculate Jeremy's compatibility with the specific job description provided.\n"
        "3. Include a bulleted list highlighting 2 to 3 specific areas where Jeremy's experience "
        "directly matches the job requirements.\n"
        "4. DO NOT include any URLs, hyperlinks, or markdown links anywhere in the email output. "
        "Keep it strictly plain text.\n"
        "5. Sign off professionally as Jeremy R. Webster."
    )

    user_message = (
        f"Recruiter/Hiring Manager: {name}\n"
        f"Company: {company}\n\n"
        f"Job Description:\n{job_description}\n\n"
        "Please write the introductory email now."
    )

    models_to_try = ["gemini-flash-latest", "gemini-2.0-flash", "gemini-3.5-flash", "gemini-pro-latest"]
    last_error = None

    for model in models_to_try:
        url = f"https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent?key={api_key}"
        payload = {
            "system_instruction": {
                "parts": [
                    {"text": system_prompt}
                ]
            },
            "contents": [
                {
                    "parts": [
                        {"text": user_message}
                    ]
                }
            ],
            "generationConfig": {
                "temperature": 0.7,
                "maxOutputTokens": 2000
            }
        }

        req = urllib.request.Request(
            url,
            data=json.dumps(payload).encode('utf-8'),
            headers={"Content-Type": "application/json"},
            method="POST"
        )

        try:
            logger.info("Sending prompt request to Gemini LLM API (model: %s) for company: %s", model, company)
            with urllib.request.urlopen(req, timeout=10) as response:
                res_data = json.loads(response.read().decode('utf-8'))
                candidates = res_data.get('candidates', [])
                if candidates and 'content' in candidates[0]:
                    finish_reason = candidates[0].get('finishReason', 'UNKNOWN')
                    parts = candidates[0]['content'].get('parts', [])
                    if parts:
                        text = parts[0].get('text', '').strip()
                        logger.info("Gemini response generated successfully. Length: %d chars. Finish Reason: %s", len(text), finish_reason)
                        return text
                raise ValueError("Unexpected payload structure in Gemini LLM API response")
        except urllib.error.HTTPError as e:
            error_body = e.read().decode('utf-8') if e.fp else str(e)
            logger.warning("Gemini API HTTP Error for model %s (Status %d): %s", model, e.code, error_body)
            last_error = f"Gemini API error ({model}, Status {e.code}): {error_body}"
            # Continue to next model on 404 (Not Found) or 429 (Resource Exhausted / Rate Limit)
            if e.code in (404, 429):
                continue
            raise RuntimeError(last_error)
        except (urllib.error.URLError, TimeoutError) as e:
            logger.error("Gemini API connection timeout or network error: %s", str(e))
            raise TimeoutError("Gemini API request timed out after 10 seconds")
        except Exception as e:
            logger.error("Error generating pitch from Gemini API: %s", str(e))
            raise

    # Smart fallback pitch if LLM quota is temporarily exhausted
    logger.warning("All Gemini LLM models exhausted or unavailable. Returning fallback AI pitch template.")
    return (
        f"Hi {name},\n\n"
        f"I came across the {job_description} role at {company} and wanted to reach out. "
        "As an AI-accelerated Software Engineer, I combine modern cloud architecture (AWS Lambda, Serverless, DynamoDB) "
        "with cutting-edge AI tools to deliver production-grade software 5x faster.\n\n"
        "I would love to connect and discuss how my skill set can add immediate velocity to your engineering team.\n\n"
        "Best regards,\nJeremy Web"
    )

def lambda_handler(event, context):
    """
    AWS Lambda entry point for handling API Gateway POST requests.
    """
    logger.info("Lambda invocation started.")

    # 1. Payload Parsing: Safe parsing of API Gateway HTTP API v2 / REST proxy event body
    try:
        body_raw = event.get('body', '{}')
        if isinstance(body_raw, str):
            body = json.loads(body_raw) if body_raw.strip() else {}
        elif isinstance(body_raw, dict):
            body = body_raw
        else:
            body = {}
    except Exception as e:
        logger.error("Failed to parse JSON body from event: %s", str(e))
        return response_json(400, {"error": "Invalid JSON payload in request body"})

    name = (body.get('Name') or body.get('name') or '').strip()
    company = (body.get('Company') or body.get('company') or '').strip()
    email = (body.get('Email') or body.get('email') or '').strip()
    job_description = (body.get('JobDescription') or body.get('job_description') or body.get('jobDescription') or '').strip()

    # Validate required payload fields
    missing_fields = []
    if not name: missing_fields.append('Name')
    if not company: missing_fields.append('Company')
    if not email: missing_fields.append('Email')
    if not job_description: missing_fields.append('JobDescription')

    if missing_fields:
        logger.warning("Missing required fields: %s", missing_fields)
        return response_json(400, {
            "error": f"Missing required payload fields: {', '.join(missing_fields)}"
        })

    # 2. Secret Retrieval: Retrieve Gemini API key from AWS Secrets Manager
    try:
        api_key = get_llm_api_key()
    except Exception as e:
        logger.error("Secrets Manager access failure: %s", str(e))
        return response_json(500, {
            "error": f"Failed to retrieve secret '{SECRET_NAME}' from Secrets Manager. Ensure secret exists in region us-east-1."
        })

    # 3. Call LLM API (urllib standard library)
    try:
        pitch_email = generate_llm_pitch(name, company, job_description, api_key)
    except TimeoutError:
        return response_json(504, {"error": "Gemini LLM API timed out after 10 seconds."})
    except Exception as e:
        logger.error("LLM pitch generation failure: %s", str(e))
        return response_json(502, {"error": f"LLM generation failed: {str(e)}"})

    # 4. DynamoDB Logging: Log lead details into 'RecruiterLeads' table
    timestamp = datetime.datetime.now(datetime.timezone.utc).isoformat()
    try:
        table = dynamodb.Table(TABLE_NAME)
        item = {
            'Email': email,
            'Name': name,
            'Company': company,
            'JobDescription': job_description,
            'GeneratedPitch': pitch_email,
            'CreatedAt': timestamp
        }
        table.put_item(Item=item)
        logger.info("Successfully recorded lead for email '%s' into DynamoDB table '%s'", email, TABLE_NAME)
    except ClientError as e:
        logger.error("DynamoDB put_item failed for %s: %s", email, str(e))
        return response_json(500, {"error": "Failed to store lead in DynamoDB database"})

    # 5. SES Email Dispatch (Sender: SENDER_EMAIL, Destination: email, BCC: MY_EMAIL)
    try:
        destination_dict = {'ToAddresses': [email]}
        if MY_EMAIL and MY_EMAIL.lower() != email.lower():
            destination_dict['BccAddresses'] = [MY_EMAIL]

        ses_response = ses.send_email(
            Source=SENDER_EMAIL,
            Destination=destination_dict,
            Message={
                'Subject': {
                    'Data': f"AI-Accelerated Software Engineer Pitch - {name} ({company})",
                    'Charset': 'UTF-8'
                },
                'Body': {
                    'Text': {
                        'Data': pitch_email,
                        'Charset': 'UTF-8'
                    }
                }
            }
        )
        logger.info("SES email dispatched successfully to %s (MessageId: %s)", email, ses_response.get('MessageId'))
    except ClientError as e:
        logger.error("SES email dispatch failed for %s: %s", email, str(e))
        return response_json(500, {
            "error": f"SES email dispatch failed. Verify email identity in SES sandbox mode. Details: {str(e)}"
        })

    return response_json(201, {
        "message": "Recruiter lead recorded and pitch dispatched successfully",
        "recruiter": {
            "email": email,
            "name": name,
            "company": company
        },
        "pitch": pitch_email
    })

def response_json(status_code: int, payload: dict) -> dict:
    """
    Returns properly formatted API Gateway proxy response with CORS headers.
    """
    return {
        "statusCode": status_code,
        "headers": {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "OPTIONS,POST",
            "Access-Control-Allow-Headers": "Content-Type"
        },
        "body": json.dumps(payload)
    }
