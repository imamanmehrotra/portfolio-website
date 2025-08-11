#!/usr/bin/env python3
"""
Data extraction script for portfolio website
Extracts information from LinkedIn_Profile.pdf and summary.txt
"""

import json
import pdfplumber
import os
import re
from datetime import datetime
from typing import Dict, List, Any

def extract_pdf_content(pdf_path: str) -> str:
    """Extract text content from PDF file"""
    try:
        with pdfplumber.open(pdf_path) as pdf:
            text = ""
            for page in pdf.pages:
                text += page.extract_text()
        return text
    except Exception as e:
        print(f"Error extracting PDF content: {e}")
        return ""

def parse_linkedin_content(content: str) -> Dict[str, Any]:
    """Parse LinkedIn PDF content into structured data"""
    
    # Initialize data structure
    data = {
        "personal_info": {},
        "summary": "",
        "skills": [],
        "certifications": [],
        "experience": [],
        "education": [],
        "contact": {}
    }
    
    lines = content.split('\n')
    
    # Extract personal info and contact
    for i, line in enumerate(lines):
        if "Contact" in line and "Aman Mehrotra" in line:
            # Extract contact information
            if i + 1 < len(lines):
                phone = lines[i + 1].strip()
                if phone and phone != "8126357886 (Mobile)":
                    data["contact"]["phone"] = phone
            
            if i + 2 < len(lines):
                email = lines[i + 2].strip()
                if email and "@" in email:
                    data["contact"]["email"] = email
            
            if i + 3 < len(lines):
                location = lines[i + 3].strip()
                if location and "Bangalore" in location:
                    data["contact"]["location"] = location
                    
            if i + 4 < len(lines):
                linkedin = lines[i + 4].strip()
                if "linkedin.com" in linkedin:
                    data["contact"]["linkedin"] = linkedin
    
    # Extract summary
    summary_start = False
    for line in lines:
        if "Summary" in line:
            summary_start = True
            continue
        if summary_start and line.strip() and not line.startswith("Top Skills"):
            data["summary"] += line.strip() + " "
        if line.startswith("Top Skills"):
            break
    
    # Extract skills
    skills_section = False
    for line in lines:
        if "Top Skills" in line:
            skills_section = True
            continue
        if skills_section and line.strip():
            if "Certifications" in line:
                break
            if line.strip() and not line.startswith("-"):
                data["skills"].append(line.strip())
    
    # Extract certifications
    cert_section = False
    for line in lines:
        if "Certifications" in line:
            cert_section = True
            continue
        if cert_section and line.strip():
            if "Tools and Technologies" in line:
                break
            if line.strip() and not line.startswith("-"):
                data["certifications"].append(line.strip())
    
    # Extract experience - improved parsing
    exp_section = False
    current_company = ""
    current_role = ""
    current_duration = ""
    current_location = ""
    current_description = []
    
    for i, line in enumerate(lines):
        if "Experience" in line:
            exp_section = True
            continue
        if exp_section and line.strip():
            if "Education" in line:
                break
            
            line = line.strip()
            
            # Check if this is a company name (usually in caps or has specific format)
            if (line and not line.startswith("-") and not line.startswith("Page") and 
                not re.search(r'\d+ months?', line) and not "Present" in line and
                not any(word in line.lower() for word in ["working", "involved", "developed", "responsible", "tech"])):
                
                # Save previous experience if exists
                if current_company and current_role:
                    data["experience"].append({
                        "company": current_company,
                        "role": current_role,
                        "duration": current_duration,
                        "location": current_location,
                        "description": current_description
                    })
                
                current_company = line
                current_role = ""
                current_duration = ""
                current_location = ""
                current_description = []
            
            # Check if this is a role
            elif any(keyword in line for keyword in ["Manager", "Scientist", "Analyst", "Engineer", "Consultant", "Associate"]):
                current_role = line
            
            # Check if this is duration
            elif re.search(r'\d{4}.*(months?|year|Present)', line):
                current_duration = line
            
            # Check if this is location
            elif any(city in line for city in ["Bangalore", "Bengaluru", "Gurugram", "Noida", "Gurgaon", "Karnataka", "India"]):
                current_location = line
            
            # Check if this is description
            elif line.startswith("-") or re.match(r'^\d+\.', line):
                current_description.append(line)
    
    # Add last experience
    if current_company and current_role:
        data["experience"].append({
            "company": current_company,
            "role": current_role,
            "duration": current_duration,
            "location": current_location,
            "description": current_description
        })
    
    # Extract education
    edu_section = False
    for line in lines:
        if "Education" in line:
            edu_section = True
            continue
        if edu_section and line.strip():
            if "Page" in line:
                break
            if line.strip() and not line.startswith("-"):
                # Parse education line
                if "Master's degree" in line or "Postgraduate Degree" in line or "Bachelor" in line:
                    parts = line.split("·")
                    if len(parts) >= 2:
                        institution = parts[0].strip()
                        degree_info = parts[1].strip()
                        data["education"].append({
                            "institution": institution,
                            "degree": degree_info
                        })
    
    return data

def read_summary_file(summary_path: str) -> str:
    """Read summary text file"""
    try:
        with open(summary_path, 'r', encoding='utf-8') as f:
            return f.read().strip()
    except Exception as e:
        print(f"Error reading summary file: {e}")
        return ""

def combine_data(linkedin_data: Dict[str, Any], summary_text: str) -> Dict[str, Any]:
    """Combine LinkedIn data with summary text"""
    
    # Create final portfolio data structure
    portfolio_data = {
        "personal_info": {
            "name": "Aman Mehrotra",
            "title": "ML | Data Science| MLOps | GenAI | Agentic AI | Azure 2X Certified",
            "tagline": "Transforming Business Challenges into Scalable AI Solutions",
            "summary": summary_text,
            "location": linkedin_data.get("contact", {}).get("location", "Bangalore, Karnataka, India"),
            "email": linkedin_data.get("contact", {}).get("email", "amansammehrotra@gmail.com"),
            "phone": linkedin_data.get("contact", {}).get("phone", "8126357886"),
            "linkedin": linkedin_data.get("contact", {}).get("linkedin", "https://www.linkedin.com/in/aman-mehrotra-dataislife"),
            "interests": [
                "Playing Tabla",
                "Attending Tech Seminars", 
                "Adventure Sports",
                "Running",
                "Table Tennis (State Level Player)"
            ],
            "favorite_food": "Choley Bhaturey with Kulhad Lassi",
            "family": {
                "wife": "Biotechnological Engineer",
                "parents": "Own Business in Moradabad, India"
            }
        },
        "skills": {
            "technical": [
                "Machine Learning", "Deep Learning", "GenAI", "NLP/LLMs",
                "Data Warehousing", "Predictive Analytics", "Statistical Modeling",
                "Data Pipelining", "MLOps", "CICD", "BI Reporting", "Dashboarding"
            ],
            "tools": [
                "Python", "PySpark", "SQL", "PLSQL", "Java", "TensorFlow",
                "AWS", "GCP", "Azure", "Databricks", "Airflow", "Power BI",
                "Tableau", "Git", "JIRA", "Alteryx", "Excel"
            ],
            "domains": [
                "Healthcare Analytics", "Financial Services", "Retail Analytics",
                "Banking", "Commercial Operations", "Salesforce Optimization"
            ]
        },
        "certifications": [
            "Azure 2X Certified",
            "AWS Cloud Primer",
            "Lean Six Sigma Green Belt",
            "AMCAT Certified Business Analyst",
            "AMCAT Certified Corporate Communications Professional"
        ],
        "experience": [
            {
                "company": "State Street",
                "role": "Manager - AI/ML",
                "duration": "September 2024 - Present (1 year)",
                "location": "Bengaluru, Karnataka, India",
                "description": [
                    "Working on Fintech use-cases based on applied AI research",
                    "Data extraction from financial documents using deep learning models",
                    "Developed Text2Chart based GenAI tool for NER and SQL generation",
                    "Tech Stack: Python (ML, DL, GenAI), AWS, LLM Models (Llama, Mistral, GPT-4o, Gemma)"
                ]
            },
            {
                "company": "Microsoft",
                "role": "Senior Data Scientist",
                "duration": "November 2023 - September 2024 (11 months)",
                "location": "Bangalore Urban, Karnataka, India",
                "description": [
                    "Working with Microsoft CMF team for Azure AI and OpenAI chatbot solutions",
                    "Azure Search, Indexing, RAG based solutioning",
                    "LLM configuration and cognitive services integration"
                ]
            },
            {
                "company": "Walmart Global Tech India",
                "role": "Senior Data Analyst - Data Science",
                "duration": "April 2023 - November 2023 (8 months)",
                "location": "Bengaluru, Karnataka, India",
                "description": [
                    "Built self-service text classification NLP library",
                    "Developed automated EDA framework for data science teams",
                    "App Adoption/Web Adoption Analytics with PySpark and Airflow",
                    "MLOps dashboard for monitoring 100+ ML models",
                    "Food waste pipeline using Pyspark, GBQ, GCP Dataproc"
                ]
            },
            {
                "company": "Genpact",
                "role": "Senior Data Science Engineer",
                "duration": "July 2021 - January 2022 (7 months)",
                "location": "Bangalore Urban, Karnataka, India",
                "description": [
                    "Healthcare Analytics focusing on Data Engineering and Analysis",
                    "Tech Stack: AWS, Alteryx, Scala, Spark, Python, SQL, ML"
                ]
            },
            {
                "company": "EXL",
                "role": "Assistant Manager - Data Engineering",
                "duration": "October 2020 - July 2021 (10 months)",
                "location": "Noida, Uttar Pradesh, India",
                "description": [
                    "Developed End to End Data Flow Pipeline using Apache Spark",
                    "Financial Data transformation and ingestion into MicroStrategy",
                    "Python Jupyter Notebooks for automated ETL operations"
                ]
            },
            {
                "company": "ZS Associates",
                "role": "Associate Consultant - Reporting Developer",
                "duration": "February 2019 - October 2020 (1 year 9 months)",
                "location": "Gurugram, Haryana, India",
                "description": [
                    "MicroStrategy Developer leading ETL architect activities",
                    "Led Tableau Reporting work-stream development",
                    "Automated data cleaning using Python Pandas & NumPy"
                ]
            }
        ],
        "education": [
            {
                "institution": "Liverpool John Moores University",
                "degree": "Master's degree, Data Science · (November 2022 - August 2024)"
            },
            {
                "institution": "International Institute of Information Technology Bangalore",
                "degree": "Postgraduate Degree, Data science · (2022 - 2023)"
            },
            {
                "institution": "KIET Group of Institutions",
                "degree": "Bachelor of Technology (B.Tech.), Information Technology · (2013 - 2017)"
            }
        ],
        "achievements": [
            "Led AI initiatives across 65+ international markets",
            "Developed Text2Chart GenAI tool for financial document analysis",
            "Built automated EDA framework for data science teams",
            "Implemented MLOps monitoring for 100+ ML models",
            "State level Table Tennis player"
        ],
        "last_updated": datetime.now().isoformat()
    }
    
    return portfolio_data

def main():
    """Main function to extract and process data"""
    
    # File paths
    pdf_path = "../LinkedIn_Profile.pdf"
    summary_path = "../summary.txt"
    output_path = "../src/data/portfolio.json"
    
    # Check if files exist
    if not os.path.exists(pdf_path):
        print(f"PDF file not found: {pdf_path}")
        return
    
    if not os.path.exists(summary_path):
        print(f"Summary file not found: {summary_path}")
        return
    
    # Extract data
    print("Extracting data from LinkedIn PDF...")
    linkedin_content = extract_pdf_content(pdf_path)
    linkedin_data = parse_linkedin_content(linkedin_content)
    
    print("Reading summary file...")
    summary_text = read_summary_file(summary_path)
    
    print("Combining data...")
    portfolio_data = combine_data(linkedin_data, summary_text)
    
    # Create output directory if it doesn't exist
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    
    # Save to JSON file
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(portfolio_data, f, indent=2, ensure_ascii=False)
    
    print(f"Portfolio data saved to: {output_path}")
    print(f"Total experience entries: {len(portfolio_data['experience'])}")
    print(f"Total education entries: {len(portfolio_data['education'])}")
    print(f"Total skills: {len(portfolio_data['skills']['technical']) + len(portfolio_data['skills']['tools'])}")

if __name__ == "__main__":
    main() 