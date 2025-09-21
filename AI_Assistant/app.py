import pandas as pd
import numpy as np
import faiss
import requests
from sentence_transformers import SentenceTransformer
import pickle
from fastapi import FastAPI, Query as FQuery
from pydantic import BaseModel
import joblib
import scr.emergency_call as emergency_call
import json

# -----------------------------
# Load embedding model
# -----------------------------
embedder = SentenceTransformer("all-MiniLM-L6-v2")

# Load FAISS index
index = faiss.read_index("faiss_index.bin")

# Load Q&A
with open("questions.pkl", "rb") as f:
    questions = pickle.load(f)
with open("answers.pkl", "rb") as f:
    answers = pickle.load(f)

# -----------------------------
# FAISS retrieval function
# -----------------------------
def retrieve(user_query, top_k=2):
    query_vec = embedder.encode([user_query], convert_to_numpy=True)
    faiss.normalize_L2(query_vec)
    D, I = index.search(query_vec, top_k)
    
    results = []
    for idx, score in zip(I[0], D[0]):
        results.append({
            "question": questions[idx],
            "answer": answers[idx],
            "score": float(score)
        })
    return results

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

# -----------------------------
# RAG chat 
# -----------------------------
MISTRAL_API_KEY = "api_ley"
MISTRAL_MODEL = "open-mixtral-8x22b"
MISTRAL_URL = "https://api.mistral.ai/v1/chat/completions"

# Store chat history for each user_id
user_histories = {}

def rag_chat(user_id, user_query, top_k=3):

     # suicide_detection
    df = pd.DataFrame([user_query], columns=["text"])

    count_vectorizer = joblib.load('countvector.pkl')
    vector_inp = count_vectorizer.transform(df['text'])

    model = joblib.load('model.pkl')
    out= int(model.predict(vector_inp)[0])
    if out == 1:
        # Emergergency call
        emergency_call.coneect_call()

    chat_history = user_histories.get(user_id, [])

    # Retrieve context
    retrieved = retrieve(user_query, top_k)

    # Build messages including previous chat history
    messages = []
    for chat in chat_history:
        messages.append({"role": "user", "content": chat["user"]})
        messages.append({"role": "assistant", "content": chat["assistant"]})

    # Add retrieved context
    context_text = ""
    for i, item in enumerate(retrieved):
        context_text += f"{i+1}. Q: {item['question']}\n   A: {item['answer']}\n"

    messages.append({"role": "user", "content":f"""
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

"""})

    # Call Mistral API
    headers = {"Authorization": f"Bearer {MISTRAL_API_KEY}", "Content-Type": "application/json"}
    payload = {"model": MISTRAL_MODEL, "messages": messages}
    response = requests.post(MISTRAL_URL, headers=headers, json=payload)
    response_json = response.json()
    answer = response_json["choices"][0]["message"]["content"]

    # Save chat
    save_chat(user_query, retrieved, answer)

    # Update user's chat history
    chat_history.append({"user": user_query, "assistant": answer})
    user_histories[user_id] = chat_history

    return {"query": user_query, "retrieved": retrieved, "response": answer}

# -----------------------------
# FastAPI app
# -----------------------------
app = FastAPI(title="Mental Health RAG Chat API")

# Root endpoint
@app.get("/")
def root():
    return {"message": "Mental Health RAG Chat API is running. Use /chat endpoint."}

# Pydantic model for POST requests
class Query(BaseModel):
    user_id: str
    question: str
    top_k: int = 2

# POST endpoint
@app.post("/chat")
def chat_post(query: Query):
    return rag_chat(query.user_id, query.question, top_k=query.top_k)

# GET endpoint for quick testing in browser
@app.get("/chat")
def chat_get(
    user_id: str = FQuery(...),
    question: str = FQuery(...),
    top_k: int = FQuery(2)
):
    return rag_chat(user_id, question, top_k=top_k)

