import faiss
import json

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
        
def retrieve_data(user_query, embedder, index, questions, answers, top_k=2):
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