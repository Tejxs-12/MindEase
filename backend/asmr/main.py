from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from utils.asmr_helpers import generate_support_package, get_user_gender

app = FastAPI(title="ASMR Personalized Support API")

class ASMRRequest(BaseModel):
    user_text: str
    profile_gender: str = None

@app.post("/asmr/json")
async def get_asmr_json(request: ASMRRequest):
    if not request.user_text:
        raise HTTPException(status_code=400, detail="user_text cannot be empty")
    
    # Detect gender (profile first, then text)
    gender = get_user_gender(request.profile_gender, request.user_text)
    
    # Generate ASMR package
    package = generate_support_package(request.user_text, gender)
    
    # Prepare clean JSON response
    response = {
        "gender_detected": gender,
        "quote": package["quote"],
        "journal_prompt": package["journal_prompt"],
        "videos": [{"title": v["title"], "url": v["url"]} for v in package["videos"]]
    }
    
    return response
