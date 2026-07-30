# ==============================================================================
# AWS Serverless Backend Terraform Configuration
# Architecture: API Gateway (HTTP API) -> Lambda (Python 3.10) -> DynamoDB + SES
# ==============================================================================

terraform {
  required_version = ">= 1.3.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
    archive = {
      source  = "hashicorp/archive"
      version = "~> 2.0"
    }
  }
}

provider "aws" {
  region = var.aws_region
}

provider "aws" {
  alias  = "us_east_1"
  region = "us-east-1"
}

# ------------------------------------------------------------------------------
# Input Variables
# ------------------------------------------------------------------------------
variable "aws_region" {
  type        = string
  default     = "us-east-1"
  description = "AWS region for infrastructure deployment"
}

variable "frontend_domain" {
  type        = string
  default     = "http://localhost:5173"
  description = "Frontend domain URL allowed by CORS (e.g., https://myfrontend.com or http://localhost:5173)"
}

variable "ses_sender_email" {
  type        = string
  default     = ""
  description = "Optional SES verified sender email address for lead notifications"
}

variable "secret_name" {
  type        = string
  default     = "prod/LLM/ApiKey"
  description = "AWS Secrets Manager secret identifier containing the LLM API Key"
}

# ------------------------------------------------------------------------------
# 1. DynamoDB Table
# ------------------------------------------------------------------------------
resource "aws_dynamodb_table" "recruiter_leads" {
  name         = "RecruiterLeads"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "Email"

  attribute {
    name = "Email"
    type = "S"
  }

  point_in_time_recovery {
    enabled = true
  }

  tags = {
    Environment = "Production"
    ManagedBy   = "Terraform"
    Project     = "RecruiterLeads"
  }
}

# ------------------------------------------------------------------------------
# 2. IAM Role & Security Policies for Lambda
# ------------------------------------------------------------------------------

# Assume Role Policy for Lambda Service
data "aws_iam_policy_document" "lambda_assume_role" {
  statement {
    effect  = "Allow"
    actions = ["sts:AssumeRole"]

    principals {
      type        = "Service"
      identifiers = ["lambda.amazonaws.com"]
    }
  }
}

resource "aws_iam_role" "lambda_exec_role" {
  name               = "recruiter_leads_lambda_exec_role"
  assume_role_policy = data.aws_iam_policy_document.lambda_assume_role.json

  tags = {
    Environment = "Production"
    ManagedBy   = "Terraform"
  }
}

# Policy for DynamoDB Write Access, CloudWatch Logging, and SES Email Sending
data "aws_iam_policy_document" "lambda_permissions" {
  # CloudWatch Logs permissions
  statement {
    sid    = "CloudWatchLogsAccess"
    effect = "Allow"
    actions = [
      "logs:CreateLogGroup",
      "logs:CreateLogStream",
      "logs:PutLogEvents"
    ]
    resources = ["arn:aws:logs:*:*:*"]
  }

  # DynamoDB Write permissions for RecruiterLeads table
  statement {
    sid    = "DynamoDBTableAccess"
    effect = "Allow"
    actions = [
      "dynamodb:PutItem",
      "dynamodb:UpdateItem",
      "dynamodb:GetItem"
    ]
    resources = [
      aws_dynamodb_table.recruiter_leads.arn
    ]
  }

  # AWS SES Email Send permissions
  statement {
    sid    = "SESEmailSendAccess"
    effect = "Allow"
    actions = [
      "ses:SendEmail",
      "ses:SendRawEmail"
    ]
    resources = ["*"]
  }

  # AWS Secrets Manager permissions for API keys (e.g., Gemini, OpenAI)
  statement {
    sid    = "SecretsManagerAccess"
    effect = "Allow"
    actions = [
      "secretsmanager:GetSecretValue"
    ]
    resources = ["*"]
  }
}

resource "aws_iam_policy" "lambda_permissions_policy" {
  name        = "recruiter_leads_lambda_policy"
  description = "IAM policy granting DynamoDB write, SES email sending, CloudWatch logs, and Secrets Manager access"
  policy      = data.aws_iam_policy_document.lambda_permissions.json
}

resource "aws_iam_role_policy_attachment" "lambda_policy_attach" {
  role       = aws_iam_role.lambda_exec_role.name
  policy_arn = aws_iam_policy.lambda_permissions_policy.arn
}

# AWS-managed policy for CloudWatch Logs (belt-and-suspenders for logging)
resource "aws_iam_role_policy_attachment" "lambda_basic_execution" {
  role       = aws_iam_role.lambda_exec_role.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}

# ------------------------------------------------------------------------------
# 3. Python 3.10 Lambda Function
# ------------------------------------------------------------------------------

# Package Lambda function source code into a ZIP file
data "archive_file" "lambda_zip" {
  type        = "zip"
  source_dir  = "${path.module}/lambda"
  output_path = "${path.module}/lambda_function_payload.zip"
}

resource "aws_cloudwatch_log_group" "lambda_log_group" {
  name              = "/aws/lambda/RecruiterLeadsHandler"
  retention_in_days = 14
}

resource "aws_lambda_function" "recruiter_leads_lambda" {
  function_name    = "RecruiterLeadsHandler"
  runtime          = "python3.12"
  handler          = "index.lambda_handler"
  role             = aws_iam_role.lambda_exec_role.arn
  filename         = data.archive_file.lambda_zip.output_path
  source_code_hash = data.archive_file.lambda_zip.output_base64sha256
  timeout          = 30

  environment {
    variables = {
      TABLE_NAME   = aws_dynamodb_table.recruiter_leads.name
      SENDER_EMAIL = var.ses_sender_email
      MY_EMAIL     = var.ses_sender_email
      SECRET_NAME  = var.secret_name
    }
  }

  depends_on = [
    aws_iam_role_policy_attachment.lambda_policy_attach,
    aws_cloudwatch_log_group.lambda_log_group
  ]

  tags = {
    Environment = "Production"
    ManagedBy   = "Terraform"
  }
}

# ------------------------------------------------------------------------------
# 4. API Gateway (HTTP API v2) with CORS & Lambda Trigger
# ------------------------------------------------------------------------------

resource "aws_apigatewayv2_api" "http_api" {
  name          = "RecruiterLeadsAPI"
  protocol_type = "HTTP"
  description   = "HTTP API Gateway endpoint for recruiter lead submissions"

  cors_configuration {
    allow_origins = ["*"]
    allow_methods = ["POST", "OPTIONS"]
    allow_headers = ["Content-Type"]
    max_age       = 300
  }

  tags = {
    Environment = "Production"
    ManagedBy   = "Terraform"
  }
}

# Default stage with auto-deploy enabled
resource "aws_apigatewayv2_stage" "api_stage" {
  api_id      = aws_apigatewayv2_api.http_api.id
  name        = "$default"
  auto_deploy = true
}

# API Gateway Lambda Integration (Payload v2.0)
resource "aws_apigatewayv2_integration" "lambda_integration" {
  api_id                 = aws_apigatewayv2_api.http_api.id
  integration_type       = "AWS_PROXY"
  integration_uri        = aws_lambda_function.recruiter_leads_lambda.invoke_arn
  payload_format_version = "2.0"
}

# Route for POST /leads
resource "aws_apigatewayv2_route" "post_lead_route" {
  api_id    = aws_apigatewayv2_api.http_api.id
  route_key = "POST /leads"
  target    = "integrations/${aws_apigatewayv2_integration.lambda_integration.id}"
}

# Grant API Gateway permission to invoke the Lambda function
resource "aws_lambda_permission" "api_gw_lambda_permission" {
  statement_id  = "AllowAPIGatewayInvoke"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.recruiter_leads_lambda.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_apigatewayv2_api.http_api.execution_arn}/*/*"
}

# ------------------------------------------------------------------------------
# Outputs
# ------------------------------------------------------------------------------
output "api_endpoint" {
  description = "The HTTP API Gateway root invoke URL"
  value       = aws_apigatewayv2_api.http_api.api_endpoint
}

output "post_leads_url" {
  description = "Full URL to submit POST lead requests"
  value       = "${aws_apigatewayv2_api.http_api.api_endpoint}/leads"
}

output "dynamodb_table_name" {
  description = "Name of the created DynamoDB table"
  value       = aws_dynamodb_table.recruiter_leads.name
}

output "lambda_function_arn" {
  description = "ARN of the Python 3.10 Lambda function"
  value       = aws_lambda_function.recruiter_leads_lambda.arn
}

# ------------------------------------------------------------------------------
# 5. Frontend S3 Bucket & CloudFront Static Web Hosting
# ------------------------------------------------------------------------------

resource "aws_s3_bucket" "frontend_bucket" {
  bucket = "leftclicksdevelopment-frontend-hosting"

  tags = {
    Environment = "Production"
    ManagedBy   = "Terraform"
  }
}

# Block all public access at the S3 bucket level
resource "aws_s3_bucket_public_access_block" "frontend_bucket_public_block" {
  bucket                  = aws_s3_bucket.frontend_bucket.id
  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

# S3 Bucket Policy to allow CloudFront OAC access
data "aws_iam_policy_document" "s3_cf_policy" {
  statement {
    actions   = ["s3:GetObject"]
    resources = ["${aws_s3_bucket.frontend_bucket.arn}/*"]

    principals {
      type        = "Service"
      identifiers = ["cloudfront.amazonaws.com"]
    }

    condition {
      test     = "StringEquals"
      variable = "AWS:SourceArn"
      values   = [aws_cloudfront_distribution.s3_distribution.arn]
    }
  }
}

resource "aws_s3_bucket_policy" "frontend_bucket_policy" {
  bucket = aws_s3_bucket.frontend_bucket.id
  policy = data.aws_iam_policy_document.s3_cf_policy.json
}

# ACM Certificate in us-east-1 for CloudFront compatibility
resource "aws_acm_certificate" "cert" {
  provider                  = aws.us_east_1
  domain_name               = "leftclicksdevelopment.com"
  subject_alternative_names = ["www.leftclicksdevelopment.com"]
  validation_method         = "DNS"

  lifecycle {
    create_before_destroy = true
  }

  tags = {
    Environment = "Production"
    ManagedBy   = "Terraform"
  }
}

# CloudFront Origin Access Control (OAC)
resource "aws_cloudfront_origin_access_control" "oac" {
  name                              = "s3-frontend-oac"
  description                       = "OAC for S3 frontend bucket"
  origin_access_control_origin_type = "s3"
  signing_behavior                  = "always"
  signing_protocol                  = "sigv4"
}

# CloudFront Distribution
resource "aws_cloudfront_distribution" "s3_distribution" {
  origin {
    domain_name              = aws_s3_bucket.frontend_bucket.bucket_regional_domain_name
    origin_access_control_id = aws_cloudfront_origin_access_control.oac.id
    origin_id                = "S3-FrontendOrigin"
  }

  enabled             = true
  is_ipv6_enabled     = true
  default_root_object = "index.html"

  aliases = ["leftclicksdevelopment.com", "www.leftclicksdevelopment.com"]

  default_cache_behavior {
    allowed_methods  = ["GET", "HEAD", "OPTIONS"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = "S3-FrontendOrigin"

    forwarded_values {
      query_string = false

      cookies {
        forward = "none"
      }
    }

    viewer_protocol_policy = "redirect-to-https"
    min_ttl                = 0
    default_ttl            = 3600
    max_ttl                = 86400
  }

  # Custom error responses to route all non-file SPA requests back to index.html (Vite routing)
  custom_error_response {
    error_code            = 403
    response_code         = 200
    response_page_path    = "/index.html"
    error_caching_min_ttl = 300
  }

  custom_error_response {
    error_code            = 404
    response_code         = 200
    response_page_path    = "/index.html"
    error_caching_min_ttl = 300
  }

  price_class = "PriceClass_100"

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    acm_certificate_arn      = aws_acm_certificate.cert.arn
    ssl_support_method       = "sni-only"
    minimum_protocol_version = "TLSv1.2_2021"
  }

  tags = {
    Environment = "Production"
    ManagedBy   = "Terraform"
  }
}

# ------------------------------------------------------------------------------
# Frontend Outputs
# ------------------------------------------------------------------------------
output "cloudfront_domain_name" {
  description = "Domain name of the CloudFront distribution"
  value       = aws_cloudfront_distribution.s3_distribution.domain_name
}

output "acm_validation_records" {
  description = "DNS validation records required for ACM Certificate validation"
  value = [
    for dvo in aws_acm_certificate.cert.domain_validation_options : {
      domain_name  = dvo.domain_name
      record_name  = dvo.resource_record_name
      record_type  = dvo.resource_record_type
      record_value = dvo.resource_record_value
    }
  ]
}
