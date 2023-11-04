import boto3
import json
from prompts import prompt


#Replace these values with the matching credentials upon usage
region_name = "us-east-1"
aws_access_key_id = "ASIA3CW6ONM4MU5CZCOO"
aws_secret_access_key = "GyagSQ8C9efNPBgW7qIvcREph5d7KVxUC1F4uRnF"
aws_session_token = "IQoJb3JpZ2luX2VjECoaCXVzLWVhc3QtMSJIMEYCIQCo9meNndzrFCfsMyW7vplHSlLmhH4XnOl6evjVgFJeQQIhAJ5rOWUp51rJ9NfBBNXMBtVI111g2oCh5UY79HZ3A7k9KqUDCGMQABoMNzYxNzQ5NDY1OTEyIgyCkV7iy6Lm42ntikwqggMVcG6TWqrvmJ8LiadtwMWq5EBhlcwM3lml1VbMfIplQI/YiKkoBX5zBviUsBnZv1ZQ7altBSDDFt6Zvn1qegnj8HOz2ZwjKR7YLTvcdUAkJfuLb2BAgtuLQSq9JkQIYVMW78PZG9lJqRlXUpWbXiE/QlMiZemzEwLchKl8XMH1KN67jVVewj+sarPBxCBt8g/qFcIZl7QfyfEvfAK8T1tW6F4XEFwap+DQVkaZeYY0PPAVW2aABirdK4jZm30aHHu/+uf94DhL76qNa+6ll9epzQ10dcoAYGnHM4T1Gg8IIz4GxxiM6n5IRDw4ErpgI7Hvc4D7cZnTV+d+TIYclY9cvgd6udzeOXY4PK4dGGWQa7cE4NBcq6kY3Sk3yILaRXzsfhgfiOKsXQxat/lCEsjYzbrI759Qg3u2ORJnfZtY2Fv2duUfHiMRY85JlnUGcJauqcPPUsT2jkkga21MKhusAPa/mnDZo8u4AOfTPIuhnAX7MpW73yNgafllWh+N2tu58TD7jZqqBjqlAU4HtKeqPD6iqOJgytk7Y5Jg2CM3yMOVlY4JS0rMxaRwcjfKhsxAnONrB7Vi9L4/r9sZQhJ1nURb30RFpSGYr/2rUYoO+1ZTV6hbiMqWP1HUfYVebuNkHRe3n4vq/CFCRCYV1gmQJQwFanWeyobobvTkUysAbB+oRDV7QEe4P9ggVSDWca6ys9vjtzyiLRXza9/cwzy3A/22DS78J9v4i5VDQ9MHEA=="

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

def query(input):
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

print("Welcome to the virtual teaching assistant. To quit, type \"quit\".") 

user_query = ""
while True: 
    user_query = input("\rType your response here:")
    if user_query == "quit":
        break
    result = query(user_query)
    print(result)