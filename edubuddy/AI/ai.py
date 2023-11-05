from flask import Flask, jsonify, request
from flask_cors import CORS
import boto3
import json

from prompts import help_prompt, math_prompt, social_studies_prompt, english_prompt, english_prompt_1, science_prompt, PE_prompt, art_prompt, schedule_prompt, curriculum_prompt
from wolfram import w_query
from flask_cors import CORS, cross_origin

app = Flask(__name__)
CORS(app)
# cors = CORS(app, resources={r"/api/query": {"origins": "*"}})
app.config['CORS_HEADERS'] = 'Content-Type'

# @app.route('/')
# def hello():
#     return "Hello World!"

# @app.route('/test1', method=['GET'])
# def firstTest():
#     if request.method == 'GET':
#         return "First test passed"


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
    elif type == "help" or type == "math_help": prompt = help_prompt

    input = input + w_query(input)
    print(input)
        # if type == "help":
        #     input = input + "\n" + w_query(input)
        # elif type == "math_help":
        #     input = input + "\n" + w_query(input)


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

@app.route('/api/query', methods=['POST', 'GET'])
@cross_origin(origin='*',headers=['Content-Type','Authorization'])
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
    app.run(port=10000,debug=True)

