#!/usr/bin/env python3
"""
Backend API Testing for Khyontek AI Website
Tests all API endpoints: GET /api/, POST /api/contact, POST /api/register
"""

import requests
import json
import sys
from datetime import datetime

# Base URL from environment
BASE_URL = "https://khyontek-ai-research.preview.emergentagent.com"

def test_get_root_endpoint():
    """Test GET /api/ endpoint"""
    print("\n=== Testing GET /api/ ===")
    try:
        url = f"{BASE_URL}/api/"
        response = requests.get(url, timeout=30)
        
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
        
        if response.status_code == 200:
            data = response.json()
            if "message" in data and "Khyontek AI API is running" in data["message"]:
                print("✅ GET /api/ - PASSED: Returns correct JSON message")
                return True
            else:
                print("❌ GET /api/ - FAILED: Incorrect response format")
                return False
        else:
            print(f"❌ GET /api/ - FAILED: Expected 200, got {response.status_code}")
            return False
            
    except Exception as e:
        print(f"❌ GET /api/ - ERROR: {str(e)}")
        return False

def test_contact_endpoint_missing_fields():
    """Test POST /api/contact with missing fields"""
    print("\n=== Testing POST /api/contact - Missing Fields ===")
    try:
        url = f"{BASE_URL}/api/contact"
        
        # Test with missing fields
        test_data = {
            "name": "John Doe",
            "email": "john@example.com"
            # Missing subject and message
        }
        
        response = requests.post(url, json=test_data, timeout=30)
        
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
        
        if response.status_code == 400:
            data = response.json()
            if "error" in data and "All fields are required" in data["error"]:
                print("✅ POST /api/contact (missing fields) - PASSED: Correctly validates required fields")
                return True
            else:
                print("❌ POST /api/contact (missing fields) - FAILED: Incorrect error message")
                return False
        else:
            print(f"❌ POST /api/contact (missing fields) - FAILED: Expected 400, got {response.status_code}")
            return False
            
    except Exception as e:
        print(f"❌ POST /api/contact (missing fields) - ERROR: {str(e)}")
        return False

def test_contact_endpoint_invalid_email():
    """Test POST /api/contact with invalid email"""
    print("\n=== Testing POST /api/contact - Invalid Email ===")
    try:
        url = f"{BASE_URL}/api/contact"
        
        test_data = {
            "name": "John Doe",
            "email": "invalid-email",
            "subject": "Test Subject",
            "message": "Test message content"
        }
        
        response = requests.post(url, json=test_data, timeout=30)
        
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
        
        if response.status_code == 400:
            data = response.json()
            if "error" in data and "Invalid email format" in data["error"]:
                print("✅ POST /api/contact (invalid email) - PASSED: Correctly validates email format")
                return True
            else:
                print("❌ POST /api/contact (invalid email) - FAILED: Incorrect error message")
                return False
        else:
            print(f"❌ POST /api/contact (invalid email) - FAILED: Expected 400, got {response.status_code}")
            return False
            
    except Exception as e:
        print(f"❌ POST /api/contact (invalid email) - ERROR: {str(e)}")
        return False

def test_contact_endpoint_valid_data():
    """Test POST /api/contact with valid data"""
    print("\n=== Testing POST /api/contact - Valid Data ===")
    try:
        url = f"{BASE_URL}/api/contact"
        
        test_data = {
            "name": "Arjun Sharma",
            "email": "arjun.sharma@example.com",
            "subject": "Inquiry about AI Research Programme",
            "message": "I am interested in learning more about your AI research programmes and would like to know about the application process and requirements."
        }
        
        response = requests.post(url, json=test_data, timeout=30)
        
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
        
        if response.status_code == 200:
            data = response.json()
            if "success" in data and data["success"] and "message" in data:
                print("✅ POST /api/contact (valid data) - PASSED: Successfully processes contact form")
                return True
            else:
                print("❌ POST /api/contact (valid data) - FAILED: Incorrect success response format")
                return False
        else:
            print(f"❌ POST /api/contact (valid data) - FAILED: Expected 200, got {response.status_code}")
            return False
            
    except Exception as e:
        print(f"❌ POST /api/contact (valid data) - ERROR: {str(e)}")
        return False

def test_register_endpoint_missing_fields():
    """Test POST /api/register with missing fields"""
    print("\n=== Testing POST /api/register - Missing Fields ===")
    try:
        url = f"{BASE_URL}/api/register"
        
        # Test with missing fields
        test_data = {
            "fullName": "Priya Patel",
            "email": "priya@example.com",
            "phone": "+91-9876543210"
            # Missing other required fields
        }
        
        response = requests.post(url, json=test_data, timeout=30)
        
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
        
        if response.status_code == 400:
            data = response.json()
            if "error" in data and "All fields are required" in data["error"]:
                print("✅ POST /api/register (missing fields) - PASSED: Correctly validates required fields")
                return True
            else:
                print("❌ POST /api/register (missing fields) - FAILED: Incorrect error message")
                return False
        else:
            print(f"❌ POST /api/register (missing fields) - FAILED: Expected 400, got {response.status_code}")
            return False
            
    except Exception as e:
        print(f"❌ POST /api/register (missing fields) - ERROR: {str(e)}")
        return False

def test_register_endpoint_invalid_email():
    """Test POST /api/register with invalid email"""
    print("\n=== Testing POST /api/register - Invalid Email ===")
    try:
        url = f"{BASE_URL}/api/register"
        
        test_data = {
            "fullName": "Priya Patel",
            "email": "invalid-email-format",
            "phone": "+91-9876543210",
            "college": "Indian Institute of Technology Guwahati",
            "degree": "B.Tech Computer Science",
            "yearOfStudy": "3rd Year",
            "track": "Machine Learning",
            "motivation": "I am passionate about AI and want to contribute to cutting-edge research.",
            "referralSource": "University Website",
            "razorpayPaymentId": "pay_test123456789"
        }
        
        response = requests.post(url, json=test_data, timeout=30)
        
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
        
        if response.status_code == 400:
            data = response.json()
            if "error" in data and "Invalid email format" in data["error"]:
                print("✅ POST /api/register (invalid email) - PASSED: Correctly validates email format")
                return True
            else:
                print("❌ POST /api/register (invalid email) - FAILED: Incorrect error message")
                return False
        else:
            print(f"❌ POST /api/register (invalid email) - FAILED: Expected 400, got {response.status_code}")
            return False
            
    except Exception as e:
        print(f"❌ POST /api/register (invalid email) - ERROR: {str(e)}")
        return False

def test_register_endpoint_valid_data():
    """Test POST /api/register with valid data"""
    print("\n=== Testing POST /api/register - Valid Data ===")
    try:
        url = f"{BASE_URL}/api/register"
        
        test_data = {
            "fullName": "Priya Patel",
            "email": "priya.patel@iitg.ac.in",
            "phone": "+91-9876543210",
            "college": "Indian Institute of Technology Guwahati",
            "degree": "B.Tech Computer Science",
            "yearOfStudy": "3rd Year",
            "track": "Machine Learning",
            "motivation": "I am passionate about AI and machine learning. I want to contribute to cutting-edge research in natural language processing and computer vision. This programme will help me gain hands-on experience with real-world AI applications.",
            "referralSource": "University Website",
            "razorpayPaymentId": "pay_test123456789"
        }
        
        response = requests.post(url, json=test_data, timeout=30)
        
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
        
        if response.status_code == 200:
            data = response.json()
            if "success" in data and data["success"] and "registrationId" in data:
                print("✅ POST /api/register (valid data) - PASSED: Successfully processes registration")
                return True
            else:
                print("❌ POST /api/register (valid data) - FAILED: Incorrect success response format")
                return False
        else:
            print(f"❌ POST /api/register (valid data) - FAILED: Expected 200, got {response.status_code}")
            return False
            
    except Exception as e:
        print(f"❌ POST /api/register (valid data) - ERROR: {str(e)}")
        return False

def run_all_tests():
    """Run all backend API tests"""
    print("🚀 Starting Khyontek AI Backend API Tests")
    print(f"Base URL: {BASE_URL}")
    print(f"Test Time: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    
    tests = [
        test_get_root_endpoint,
        test_contact_endpoint_missing_fields,
        test_contact_endpoint_invalid_email,
        test_contact_endpoint_valid_data,
        test_register_endpoint_missing_fields,
        test_register_endpoint_invalid_email,
        test_register_endpoint_valid_data
    ]
    
    passed = 0
    failed = 0
    
    for test in tests:
        try:
            if test():
                passed += 1
            else:
                failed += 1
        except Exception as e:
            print(f"❌ {test.__name__} - EXCEPTION: {str(e)}")
            failed += 1
    
    print(f"\n📊 Test Results Summary:")
    print(f"✅ Passed: {passed}")
    print(f"❌ Failed: {failed}")
    print(f"📈 Total: {passed + failed}")
    
    if failed == 0:
        print("\n🎉 All tests passed! Backend APIs are working correctly.")
        return True
    else:
        print(f"\n⚠️  {failed} test(s) failed. Please check the issues above.")
        return False

if __name__ == "__main__":
    success = run_all_tests()
    sys.exit(0 if success else 1)