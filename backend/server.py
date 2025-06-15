from fastapi import FastAPI, HTTPException, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from dotenv import load_dotenv
import logging

load_dotenv()

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(title="Web Development Services API")

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ContactFormRequest(BaseModel):
    name: str
    email: EmailStr
    contact: str = ""  # Optional
    query: str

class ContactResponse(BaseModel):
    status: str
    message: str

def send_contact_email(name: str, email: str, contact: str, query: str):
    """
    Send contact form email using Gmail SMTP
    """
    try:
        # Gmail SMTP configuration (using placeholder credentials)
        smtp_server = "smtp.gmail.com"
        smtp_port = 587
        sender_email = os.getenv('GMAIL_USER', 'placeholder@gmail.com')
        sender_password = os.getenv('GMAIL_PASSWORD', 'placeholder_password')
        recipient_email = "agarahari110@gmail.com"
        
        # Create message
        message = MIMEMultipart()
        message["From"] = sender_email
        message["To"] = recipient_email
        message["Subject"] = f"New Contact Form Submission from {name}"
        
        # Email body
        body = f"""
        New contact form submission received:
        
        Name: {name}
        Email: {email}
        Contact: {contact if contact else 'Not provided'}
        
        Query:
        {query}
        
        ---
        Sent from Web Development Services Website
        """
        
        message.attach(MIMEText(body, "plain"))
        
        # Send email
        with smtplib.SMTP(smtp_server, smtp_port) as server:
            server.starttls()
            server.login(sender_email, sender_password)
            server.send_message(message)
            
        logger.info(f"Contact form email sent successfully for {name}")
        return True
        
    except Exception as e:
        logger.error(f"Failed to send contact email: {str(e)}")
        # For development, we'll return True even if email fails (since credentials are placeholders)
        if "placeholder" in str(sender_email) or "placeholder" in str(sender_password):
            logger.info("Using placeholder credentials - simulating successful email send")
            return True
        return False

@app.post("/api/contact", response_model=ContactResponse)
async def submit_contact_form(request: ContactFormRequest, background_tasks: BackgroundTasks):
    """
    Handle contact form submission and send email
    """
    try:
        # Add email sending to background tasks for better performance
        background_tasks.add_task(
            send_contact_email,
            request.name,
            request.email,
            request.contact,
            request.query
        )
        
        return ContactResponse(
            status="success",
            message="Thank you for your message! We'll get back to you soon."
        )
    except Exception as e:
        logger.error(f"Error processing contact form: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to submit contact form")

@app.get("/api/health")
async def health_check():
    return {"status": "healthy", "service": "web-development-services-api"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)