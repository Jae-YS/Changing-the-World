import wolframalpha
app_id = 'JT5UGJ-YQRQPR8RP2'
client = wolframalpha.Client(app_id)

# def query(input: str) -> str:
def w_query(input: str) -> str:
    result = client.query(input)
    for pod in result.pods:
        print(pod.title)
        for sub in pod.subpods:
            print(sub.plaintext)

def step_by_step(input: str) -> str:
    result = client.query(input, params={'podstate': 'Step-by-step solution'})
    for pod in result.pods:
        print(pod.title)
        for sub in pod.subpods:
            if 'plaintext' in sub:
                print(sub.plaintext)
            if 'img' in sub:
                print(sub.img)
