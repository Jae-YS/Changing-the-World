import wolframalpha
import requests

app_id = 'WOLFRAM_APP_ID
client = wolframalpha.Client(app_id)

# def query(input: str) -> str:
def w_query(query: str) -> str:
    res = ""
    result = client.query(query)
    for pod in result.pods:
        if pod.title:
            res = res + pod.title
        for sub in pod.subpods:
            if sub.plaintext:
                res = res + sub.plaintext
    return res

# def step_by_step(input: str) -> str:
#     res = ""
#     result = client.query(input, params={'podstate': 'Step-by-step solution'})
#     for pod in result.pods:
#         res = res + pod.title
#         for sub in pod.subpods:
#             if 'plaintext' in sub:
#                 res = res + sub.plaintext 
#     return res 
