import requests
import unittest
import os
import json
from dotenv import load_dotenv

# Load environment variables
load_dotenv('/app/frontend/.env')

# Get the backend URL from environment variables
BACKEND_URL = os.getenv('REACT_APP_BACKEND_URL')
if not BACKEND_URL:
    raise ValueError("REACT_APP_BACKEND_URL environment variable not set")

# Ensure the URL ends with /api for backend routes
API_BASE_URL = f"{BACKEND_URL}/api"
print(f"Testing API at: {API_BASE_URL}")

class TestBackendAPI(unittest.TestCase):
    
    def test_health_endpoint(self):
        """Test the health check endpoint"""
        response = requests.get(f"{API_BASE_URL}/health")
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertEqual(data["status"], "healthy")
        self.assertEqual(data["service"], "web-development-services-api")
        print("✅ Health endpoint test passed")
    
    def test_contact_form_valid_submission(self):
        """Test contact form submission with all required fields"""
        payload = {
            "name": "John Doe",
            "email": "john.doe@example.com",
            "query": "I need a website for my business"
        }
        response = requests.post(f"{API_BASE_URL}/contact", json=payload)
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertEqual(data["status"], "success")
        print("✅ Valid contact form submission test passed")
    
    def test_contact_form_with_optional_field(self):
        """Test contact form submission with optional contact field"""
        payload = {
            "name": "Jane Smith",
            "email": "jane.smith@example.com",
            "contact": "+1234567890",
            "query": "I'm interested in your web development services"
        }
        response = requests.post(f"{API_BASE_URL}/contact", json=payload)
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertEqual(data["status"], "success")
        print("✅ Contact form with optional field test passed")
    
    def test_contact_form_invalid_email(self):
        """Test contact form submission with invalid email format"""
        payload = {
            "name": "Invalid User",
            "email": "not-an-email",
            "query": "This should fail due to invalid email"
        }
        response = requests.post(f"{API_BASE_URL}/contact", json=payload)
        self.assertEqual(response.status_code, 422)  # Validation error
        print("✅ Invalid email validation test passed")
    
    def test_contact_form_missing_required_fields(self):
        """Test contact form submission with missing required fields"""
        # Missing name
        payload1 = {
            "email": "test@example.com",
            "query": "Missing name field"
        }
        response1 = requests.post(f"{API_BASE_URL}/contact", json=payload1)
        self.assertEqual(response1.status_code, 422)  # Validation error
        
        # Missing email
        payload2 = {
            "name": "Missing Email",
            "query": "Missing email field"
        }
        response2 = requests.post(f"{API_BASE_URL}/contact", json=payload2)
        self.assertEqual(response2.status_code, 422)  # Validation error
        
        # Missing query
        payload3 = {
            "name": "Missing Query",
            "email": "missing.query@example.com"
        }
        response3 = requests.post(f"{API_BASE_URL}/contact", json=payload3)
        self.assertEqual(response3.status_code, 422)  # Validation error
        
        print("✅ Missing required fields validation test passed")
    
    def test_contact_form_empty_fields(self):
        """Test contact form submission with empty fields"""
        payload = {
            "name": "",
            "email": "empty.fields@example.com",
            "query": "Empty name field"
        }
        response = requests.post(f"{API_BASE_URL}/contact", json=payload)
        # FastAPI should validate that name is not empty
        self.assertNotEqual(response.status_code, 200)
        
        print("✅ Empty fields validation test passed")

if __name__ == "__main__":
    # Run the tests
    unittest.main(argv=['first-arg-is-ignored'], exit=False)