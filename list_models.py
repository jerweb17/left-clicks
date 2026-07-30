import json
import urllib.request
import os
import sys

# Add lambda dir to path so we can import the helper
sys.path.append(os.path.abspath('lambda'))
from index import get_llm_api_key

try:
    api_key = get_llm_api_key()
    url = f"https://generativelanguage.googleapis.com/v1beta/models?key={api_key}"
    req = urllib.request.Request(url, method="GET")
    with urllib.request.urlopen(req, timeout=10) as response:
        data = json.loads(response.read().decode('utf-8'))
        
        models = []
        for model in data.get('models', []):
            if 'generateContent' in model.get('supportedGenerationMethods', []):
                models.append(model.get('name'))
        
        print("Supported generateContent models:")
        for m in models:
            print(f"- {m}")
except Exception as e:
    print(f"Error: {e}")
