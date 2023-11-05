from flask import Flask, jsonify, request
from flask_cors import CORS
import boto3
import json
from prompts import help_prompt, math_prompt, social_studies_prompt, english_prompt, english_prompt_1, science_prompt, PE_prompt, art_prompt, schedule_prompt, curriculum_prompt
from wolfram import w_query, step_by_step

app = Flask(__name__)

CORS(app)

#Replace these values with the matching credentials upon usage
region_name = "us-east-1"
aws_access_key_id = "ASIA3CW6ONM4ESM2L6UN"
aws_secret_access_key = "l+FHr1pPny/eKTcRNnBkiIajFs7ZEloXZtVWjrs7"
aws_session_token = "IQoJb3JpZ2luX2VjEDUaCXVzLWVhc3QtMSJIMEYCIQCB7dEemQCwFABD3qbDg4Fuz9mXwG7NJs+V3kzjsqN2pgIhANQ5YAzKzmfHXemLkSl+k308SCLshd5Vc5ZLaKyKZ/ZeKqUDCG0QABoMNzYxNzQ5NDY1OTEyIgwpLLgwUMV5smbPH58qggO29SYfyw6PUuoqm2twcI1IIfI6a1VBAItnoLXCEUIhZBSiXF4QfOSsfS7DJpcgjNjNKQuo5Ww454FpbiO3gTq8afx5JCmJQik/0pikma07UTigM6Fj9PrnsgFq9nvECTVYGtgiBcYfTk9z3YerXMfvxd+fPboSkMR59ArGasUGf4NLhuldsDjVcpO/vbXNAoE+vKryp1NmITBiI/Y7xf8CTgqwlY0YZcC697UDkNqL0qiMNniGobsVY41t8KDAT9ntyT5cb6lxF0EhE5LfkZmoFmBS/OGJM5BoNP3rpxBQZKwxiaF9hGrnndDuv2xVta1UmWcF7dhRaLydw7nOhnLkh6uaoih6cecAlPSSgbF4OPmTGKwSCh0OnKh7oooZFv8TZkQFc6iE/ORVL7obJfzWbkE0ZXKnoZ8sCIx02PydnL9MvM5TefaNnzj/43wbDhTAByKhdh+uW/YBP5FLaub8cAqDUmEDRgcMJY6v8P2Lf/4LaZdJHDgfqTwgFuA3wby//DC6r5yqBjqlATMcuo0TioTaRgei+bgk9mg4/+iFO2qII16DdQrFxiAoiTLaWUTIlT0VI19ghEKmQQUJCxbgB7AQMwjYxhNoxzB5V0Zt1K0hYX+hgmZeM6FoIsivAZSmcJo0Y3w/zJc2fwYp1LPo149jyHYABSbg/6HtT9YrL/ZxI7PxoTlDIo9Wynz4nH589I57729xZZxDM1aovooAmeyrHNPLlF0qcQ7khWPadg==/YiKkoBX5zBviUsBnZv1ZQ7altBSDDFt6Zvn1qegnj8HOz2ZwjKR7YLTvcdUAkJfuLb2BAgtuLQSq9JkQIYVMW78PZG9lJqRlXUpWbXiE/QlMiZemzEwLchKl8XMH1KN67jVVewj+sarPBxCBt8g/qFcIZl7QfyfEvfAK8T1tW6F4XEFwap+DQVkaZeYY0PPAVW2aABirdK4jZm30aHHu/+uf94DhL76qNa+6ll9epzQ10dcoAYGnHM4T1Gg8IIz4GxxiM6n5IRDw4ErpgI7Hvc4D7cZnTV+d+TIYclY9cvgd6udzeOXY4PK4dGGWQa7cE4NBcq6kY3Sk3yILaRXzsfhgfiOKsXQxat/lCEsjYzbrI759Qg3u2ORJnfZtY2Fv2duUfHiMRY85JlnUGcJauqcPPUsT2jkkga21MKhusAPa/mnDZo8u4AOfTPIuhnAX7MpW73yNgafllWh+N2tu58TD7jZqqBjqlAU4HtKeqPD6iqOJgytk7Y5Jg2CM3yMOVlY4JS0rMxaRwcjfKhsxAnONrB7Vi9L4/r9sZQhJ1nURb30RFpSGYr/2rUYoO+1ZTV6hbiMqWP1HUfYVebuNkHRe3n4vq/CFCRCYV1gmQJQwFanWeyobobvTkUysAbB+oRDV7QEe4P9ggVSDWca6ys9vjtzyiLRXza9/cwzy3A/22DS78J9v4i5VDQ9MHEA=="

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

def query(input: str, type: str) -> str:
    # if type == "english": prompt = english_prompt
    if type == "english": prompt = english_prompt_1
    elif type == "math": prompt = math_prompt
    elif type == "social studies": prompt = social_studies_prompt
    elif type == "science": prompt = science_prompt
    elif type == "pe": prompt = PE_prompt
    elif type == "art": prompt = art_prompt
    elif type == "schedule": prompt = schedule_prompt
    elif type == "curriculum": prompt = curriculum_prompt
    elif type == "help" or type == "math_help": 
        if type == "help":
            input = input + "\n" + w_query(input)
        elif type == "math_help":
            input = input + "\n" + w_query(input)
        prompt = help_prompt

    body = json.dumps({
        "prompt": prompt.format(input),
        "max_tokens_to_sample": 4096,
        "temperature": 0.5,
        "top_k": 250,
        "top_p": 0.5,
        "stop_sequences": ["\n\nHuman:"]
    })
    response = bedrock.invoke_model(body=body, modelId=modelId, accept=accept, contentType=contentType)
    response_body = json.loads(response.get('body').read())
    return response_body.get('completion')

@app.route('/api/query', methods=['POST'])
def handle_query():
    # Retrieve the data from the request
    data = request.json

    # Extract the input and the type from the request data
    user_input = data.get('input')
    query_type = data.get('type')
    
    # Check if the required data is present
    if not user_input or not query_type:
        return jsonify({'error': 'Missing input or type parameter'}), 400

    try:
        # Call your query function
        result = query(input=user_input, type=query_type)
        return jsonify({'response': result}), 200
    except Exception as e:
        # In case of an error
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(port=12000,debug=True)
