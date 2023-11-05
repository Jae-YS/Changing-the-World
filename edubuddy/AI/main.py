from helper_engine import query

while (True):
    user_query = input("What is your question? (type 'quit' to exit): ")
    if user_query == 'quit': break
    print(query(user_query, "help"))
    
