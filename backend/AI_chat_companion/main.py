from fastapi import FastAPI
from pydantic import BaseModel
from app.embeddings import load_chroma_db
from app.risk import risk_check
import google.generativeai as genai
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

# Configure Gemini using API key from .env
genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))

app = FastAPI(title="Mental Wellness Chatbot")

# Load ChromaDB and retriever
db = load_chroma_db()
retriever = db.as_retriever(search_kwargs={"k": 3})

class Query(BaseModel):
    question: str

@app.post("/ask")
def ask_chatbot(query: Query):
    if not query.question.strip():
        return {"error": "Empty question."}

    # Retrieve relevant docs
    try:
        docs = retriever.get_relevant_documents(query.question)
        context = "\n".join([doc.page_content for doc in docs])
    except Exception as e:
        return {"error": f"Retriever error: {str(e)}"}

    # Prepare prompt
    prompt = f"""You are an empathetic mental wellness assistant.
Use the context below to answer the question, suggest coping exercises (breathing, grounding, reflection),
and include helpline if high-risk words detected.

Context:
{context}

Question:
{query.question}
"""

    # Generate response with Gemini
    try:
        model = genai.GenerativeModel("gemini-1.5-flash")
        response = model.generate_content(prompt)
        answer_text = response.text
    except Exception as e:
        return {"error": f"LLM call failed: {str(e)}"}

    # Risk detection
    is_risk = risk_check(query.question) or risk_check(answer_text)
    helpline = "988 (US) / local helpline" if is_risk else None

    # Sample exercises / media links
    exercises = ["breathing", "grounding", "reflection"]
    media_links = ["audio1.mp3", "video1.mp4"]

    return {
        "answer": answer_text,
        "exercises": exercises,
        "media_links": media_links,
        "helpline": helpline
    }
