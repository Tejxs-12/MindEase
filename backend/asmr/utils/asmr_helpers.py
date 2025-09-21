from transformers import pipeline
import random

# --- Curated BF/GF ASMR videos ---
CURATED_ASMR = [
    {"title": "BF ASMR 1 – Comfort Roleplay",
     "url": "https://youtu.be/VOszjyJ_Ypg?si=oiqQXMqSK3p2mq8t",
     "category": "bf_roleplay"},
    {"title": "BF ASMR 2 – Gentle Comfort",
     "url": "https://youtu.be/N8vF827nycw?si=Sgf_3g99yjRjbtOa",
     "category": "bf_roleplay"},
    {"title": "BF ASMR 3 – Protective & Caring",
     "url": "https://youtu.be/7oP_wXwwuxI?si=Ls1UT4rwfR_X-qa_",
     "category": "bf_roleplay"},
    {"title": "BF ASMR 4 – Whisper Comfort",
     "url": "https://youtu.be/pepA_fcefaY?si=iUX_OPHOLxoBdjuK",
     "category": "bf_roleplay"},
    {"title": "GF ASMR 1 – Caring Roleplay",
     "url": "https://youtu.be/-hiFn13RZFA?si=ENJaTYwdW8nX-Qwq",
     "category": "gf_roleplay"},
    {"title": "GF ASMR 2 – Whisper Reassurance",
     "url": "https://youtu.be/XVlM04HJdlU?si=YqgNltrARqA0NILJ",
     "category": "gf_roleplay"},
    {"title": "GF ASMR 3 – Comfort Talk",
     "url": "https://youtu.be/KgQwAZOCU0g?si=rD2g92mK9F1nEdHQ",
     "category": "gf_roleplay"},
    {"title": "GF ASMR 4 – Gentle Relaxation",
     "url": "https://youtu.be/eIIW99Tzluo?si=cLmFZHV-XTfr4ldN",
     "category": "gf_roleplay"},
]

# --- Motivational quotes ---
QUOTES = {
    "neutral": "Take today as it comes.",
    "bf_roleplay": "He’s here for you, let his words calm your heart 💙",
    "gf_roleplay": "She’s here for you, let her whispers ease your mind 💖"
}

# --- Initialize zero-shot classifier for text-based gender detection ---
gender_classifier = pipeline("zero-shot-classification", model="facebook/bart-large-mnli")

# --- Functions ---

def detect_gender_from_text(user_text: str) -> str:
    """
    Detect gender from user's text input using zero-shot classification.
    Returns: "Girl", "Boy", or "Other"
    """
    candidate_labels = ["Girl", "Boy", "Other"]
    result = gender_classifier(user_text, candidate_labels)
    return result['labels'][0]

def get_user_gender(profile_gender: str, user_text: str) -> str:
    """
    Determine user gender using profile info if available, else text-based detection.
    """
    if profile_gender in ["Girl", "Boy"]:
        return profile_gender
    return detect_gender_from_text(user_text)

def generate_support_package(user_text: str, gender: str) -> dict:
    """
    Generate ASMR video suggestions, quote, and journal prompt based on detected gender.
    """
    mood = "neutral"  # placeholder
    if gender == "Girl":
        pool = [v for v in CURATED_ASMR if v["category"] == "bf_roleplay"]
    elif gender == "Boy":
        pool = [v for v in CURATED_ASMR if v["category"] == "gf_roleplay"]
    else:
        pool = CURATED_ASMR

    videos = random.sample(pool, min(2, len(pool)))
    category = pool[0]["category"] if pool else "neutral"

    return {
        "mood_detected": mood,
        "videos": videos,
        "quote": QUOTES.get(category, QUOTES["neutral"]),
        "journal_prompt": "Write one thing you want to tell your inner self today."
    }

def create_html_response(package: dict, gender: str) -> str:
    """
    Generate HTML response with embedded YouTube videos and quote.
    """
    text_block = f"""
    <p><b>Detected Gender:</b> {gender}</p>
    <p><b>Quote:</b> {package['quote']}</p>
    <p><b>Journal Prompt:</b> {package['journal_prompt']}</p>
    <hr>
    """
    embeds = ""
    for v in package["videos"]:
        if "youtu.be" in v["url"]:
            video_id = v["url"].split("/")[-1].split("?")[0]
        elif "watch?v=" in v["url"]:
            video_id = v["url"].split("watch?v=")[-1].split("&")[0]
        else:
            video_id = v["url"]

        embed_url = f"https://www.youtube.com/embed/{video_id}"
        iframe = f"""
        <iframe width="400" height="225" src="{embed_url}" frameborder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; 
        gyroscope; picture-in-picture" allowfullscreen></iframe>
        """
        embeds += f"<div><b>{v['title']}</b><br>{iframe}<br><a href='{v['url']}' target='_blank'>Open on YouTube</a></div><br>"

    return text_block + embeds
