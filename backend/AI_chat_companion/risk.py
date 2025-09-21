HIGH_RISK_WORDS = ["suicide", "kill myself", "self-harm", "depressed", "hopeless"]

def risk_check(text: str) -> bool:
    """
    Returns True if any high-risk keywords are found.
    """
    text_lower = text.lower()
    return any(word in text_lower for word in HIGH_RISK_WORDS)
