from twilio.rest import Client

def coneect_call():
    # Twilio credentials
    account_sid = "TWILIO_ACCOUNT_SID"
    auth_token = "TWILIO_AUTH_TOKEN"
    twilio_number = "+1234567890"  
    emergency_number = "+911234567890"  

    client = Client(account_sid, auth_token)

    call = client.calls.create(
        to=emergency_number,
        from_=twilio_number,
        twiml='<Response><Say voice="alice">This is an automated alert. Someone may be in danger. Please respond immediately.</Say></Response>'
    )
    print(f"Emergency call initiated: {call.sid}")
