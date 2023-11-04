import wolframalpha
app_id = 'JT5UGJ-YQRQPR8RP2'
client = wolframalpha.Client(app_id)

# def query(input: str) -> str:
def w_query(input: str) -> str:
    res = ""
    result = client.query(input)
    for pod in result.pods:
        res = res + pod.title
        for sub in pod.subpods:
            res = res + sub.plaintext
    return res

def step_by_step(input: str) -> str:
    res = ""
    result = client.query(input, params={'podstate': 'Step-by-step solution'})
    for pod in result.pods:
        res = res + pod.title
        for sub in pod.subpods:
            if 'plaintext' in sub:
                res = res + sub.plaintext 
    return res 
