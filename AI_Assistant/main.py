
import pandas as pd
import numpy as np
import faiss
import requests
from sentence_transformers import SentenceTransformer
import faiss
import numpy as np
import joblib
import scr.emergency_call as emergency_call
import json
from datetime import datetime


# Load embedding model
embedder = SentenceTransformer("all-MiniLM-L6-v2")

# Load index
index = faiss.read_index("faiss_index.bin")

# Load questions and answers
import pickle
with open("questions.pkl", "rb") as f:
    questions = pickle.load(f)
with open("answers.pkl", "rb") as f:
    answers = pickle.load(f)


def save_chat(user_query, retrieved, response, chat_file="chat_history.json"):
    # Get current time in human-readable format
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    
    chat_entry = {
        "timestamp": timestamp,
        "query": user_query,
        "retrieved": retrieved,
        "response": response
    }
    
    # Load existing chats if file exists
    try:
        with open(chat_file, "r") as f:
            chat_history = json.load(f)
    except (FileNotFoundError, json.JSONDecodeError):
        chat_history = []
    
    # Append new chat
    chat_history.append(chat_entry)
    
    # Save back to file
    with open(chat_file, "w") as f:
        json.dump(chat_history, f, indent=4)

def retrieve(user_query, top_k=2):
    # Encode query
    query_vec = embedder.encode([user_query], convert_to_numpy=True)
    faiss.normalize_L2(query_vec)
    
    # Search in FAISS
    D, I = index.search(query_vec, top_k)
    
    results = []
    for idx, score in zip(I[0], D[0]):
        results.append({
            "question": questions[idx],
            "answer": answers[idx],
            "score": float(score)
        })

    return results



MISTRAL_MODEL = "open-mixtral-8x22b"
MISTRAL_URL = "https://api.mistral.ai/v1/chat/completions"

def rag_query(user_query, top_k=3):

    # suicide_detection
    df = pd.DataFrame([user_query], columns=["text"])

    count_vectorizer = joblib.load('countvector.pkl')
    vector_inp = count_vectorizer.transform(df['text'])

    model = joblib.load('model.pkl')
    out= int(model.predict(vector_inp)[0])
    if out == 1:
        # Emergergency call
        emergency_call.coneect_call()

    retrieved = retrieve(user_query, top_k)

    prompt = f"""
You are a supportive assistant. 
The user query is: "{user_query}"

Here are retrieved answers with scores:
{retrieved}

Instructions:
1. Always prioritize the highest score result as the main basis of your response.  
2. You may merge additional relevant points from other retrieved answers.  
3. Provide a warm, empathetic, and structured response.  
4. Do not ignore the main context of the query.

Final Response:

"""

    payload = {
        "model": MISTRAL_MODEL,
        "messages": [{"role": "user", "content": prompt}]
    }
    headers = {
        "Authorization": f"Bearer {MISTRAL_API_KEY}",
        "Content-Type": "application/json"
    }
    response = requests.post(MISTRAL_URL, headers=headers, json=payload)
    response_json = response.json()

    # Extract text from API response
    answer = response_json["choices"][0]["message"]["content"]

    # Save chat
    save_chat(user_query, retrieved, answer)

    return {"query": user_query, "retrieved": retrieved, "response": answer}

answer= rag_query(user_query='im happy', top_k=2)
print(answer)