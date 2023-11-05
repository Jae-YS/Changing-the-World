import boto3
import json
from prompts import help_prompt, math_prompt, social_studies_prompt, english_prompt, science_prompt, PE_prompt, art_prompt, schedule_prompt
from wolfram import w_query

#Replace these values with the matching credentials upon usage
region_name = "AWS_REGION"
aws_access_key_id = "AWS_ACCESS_KEY_ID"
aws_secret_access_key = "AWS_SECRET_ACCESS_KEY"
aws_session_token = "AWS_SESSION_TOKEN"
#Input the required credentials to access bedrock
session = boto3.Session (
	region_name = region_name,
	aws_access_key_id = aws_access_key_id,
	aws_secret_access_key = aws_secret_access_key,
	aws_session_token = aws_session_token
)

bedrock = session.client('bedrock-runtime') #Initializing our bedrock connection

#Can swap the modelId to use other AWS Bedrock models as well
modelId = 'anthropic.claude-v2'
accept = 'application/json'
contentType = 'application/json'

def query(question: str, type: str) -> str:
    if type == "english": prompt = english_prompt
    elif type == "math": prompt = math_prompt
    elif type == "social_studies": prompt = social_studies_prompt
    elif type == "science": prompt = science_prompt
    elif type == "PE": prompt = PE_prompt
    elif type == "art": prompt = art_prompt
    elif type == "schedule": prompt = schedule_prompt
    elif type == "help": prompt = help_prompt

    question = question + w_query(question)

    body = json.dumps({
        "prompt": prompt.format(question),
        "max_tokens_to_sample": 4096,
        "temperature": 0.5,
        "top_k": 250,
        "top_p": 0.5,
        "stop_sequences": ["\n\nHuman:"]
    })
    response = bedrock.invoke_model(body=body, modelId=modelId, accept=accept, contentType=contentType)
    response_body = json.loads(response.get('body').read())
    return response_body.get('completion')
