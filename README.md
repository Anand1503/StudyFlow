# StudyFlow

## Overview
StudyFlow is a web application designed to help students manage their assessments and study materials. It provides features for uploading and managing assessment files, viewing deadlines, and tracking submission statuses.

## Features
- User authentication and authorization
- Assessment management with file uploads
- Subject-based filtering of assessments
- Responsive design with modern UI components

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MySQL (v8.0 or higher)
- Python (v3.8 or higher)

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Set up the database:
   ```bash
   python app/init_db.py
   ```
4. Start the server:
   ```bash
   uvicorn app.main:app --reload
   ```

## Usage
- Open your browser and go to `http://localhost:3000` to access the application.
- Log in with your credentials to manage your assessments and upload files.

## Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

## License
This project is licensed under the MIT License - see the LICENSE file for details. 