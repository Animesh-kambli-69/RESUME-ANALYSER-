# Resume Analyzer

An AI-powered resume analyzer that uses Claude API to help both job seekers optimize their resumes and recruiters screen candidates efficiently.

## Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Setup Instructions](#setup-instructions)
- [API Documentation](#api-documentation)
- [Usage](#usage)

## Features

### For Job Seekers 👨‍💼

- **ATS Compatibility Check**: Validates resume format for Applicant Tracking Systems
- **Keyword Optimization**: Compares resume against job description and suggests missing keywords
- **Smart Recommendations**: Provides actionable suggestions to improve resume
- **Format Validation**: Identifies formatting issues that break ATS parsing

### For Recruiters 👔

- **Automated Candidate Ranking**: Scores candidates based on job requirements
- **Structured Data Extraction**: Converts unstructured resume data into clean JSON
- **Bias Reduction**: Standardized evaluation metrics for objective screening
- **Batch Processing**: Analyze multiple resumes at once
- **Skills Matching**: Automatically matches candidate skills against job requirements

## Project Structure

```
RESUME-ANALYSER/
├── backend/                    # Node.js + Express server
│   ├── src/
│   │   ├── controllers/       # API handlers
│   │   ├── services/          # Business logic
│   │   ├── routes/            # API routes
│   │   ├── models/            # Database models
│   │   ├── middleware/        # Express middleware
│   │   ├── utils/             # Utility functions
│   │   ├── config/            # Configuration
│   │   └── index.ts           # Server entry point
│   ├── package.json
│   ├── tsconfig.json
│   ├── Dockerfile
│   └── .env.example
│
├── frontend/                   # React TypeScript app
│   ├── src/
│   │   ├── components/        # React components
│   │   ├── pages/             # Page components
│   │   ├── services/          # API client + state management
│   │   ├── types/             # TypeScript types
│   │   ├── App.tsx            # Main app component
│   │   └── index.tsx          # React entry point
│   ├── package.json
│   ├── tsconfig.json
│   ├── Dockerfile
│   └── .env.example
│
├── shared/                     # Shared types
│   └── types/
│       └── index.ts           # Shared TypeScript interfaces
│
├── docker-compose.yml         # Docker multi-container setup
├── README.md                  # This file
└── .gitignore
```

## Prerequisites

- **Node.js** 18+ and npm/yarn
- **Docker** & **Docker Compose** (optional, for containerized setup)
- **Claude API Key** from Anthropic
- **MongoDB** (if not using Docker)

## Setup Instructions

### Option 1: Local Development

#### 1. Clone and Setup
```bash
cd RESUME-ANALYSER

# Setup Backend
cd backend
npm install
cp .env.example .env
# Edit .env and add your CLAUDE_API_KEY

# Setup Frontend
cd ../frontend
npm install
cp .env.example .env
```

#### 2. Start Backend
```bash
cd backend
npm run dev
# Server starts on http://localhost:5000
```

#### 3. Start Frontend (in a new terminal)
```bash
cd frontend
npm start
# App opens on http://localhost:3000
```

### Option 2: Docker Compose (Recommended)

```bash
# Create .env file in root with your Claude API key
echo "CLAUDE_API_KEY=your_api_key_here" > .env

# Start all services
docker-compose up --build

# Access
# Frontend: http://localhost:3000
# Backend API: http://localhost:5000
# MongoDB: mongodb://localhost:27017
```

## API Documentation

### Base URL
```
http://localhost:5000/api
```

### Endpoints

#### 1. Analyze for Job Seeker
```
POST /resume/analyze-job-seeker
Content-Type: multipart/form-data

Body:
- resume: File (PDF, DOCX, or TXT)
- jobDescription: String (optional)

Response:
{
  "success": true,
  "data": {
    "resumeData": { ... },
    "analysis": {
      "atsCompatibility": { score, issues, recommendations },
      "keywordAnalysis": { matchPercentage, keywords, suggestions },
      "biasReduction": { objectivityScore, recommendations }
    }
  }
}
```

#### 2. Analyze for Recruiter
```
POST /resume/analyze-recruiter
Content-Type: multipart/form-data

Body:
- resume: File (PDF, DOCX, or TXT)
- jobDescription: String (required)
- candidateName: String (optional)

Response:
{
  "success": true,
  "data": {
    "candidateName": "...",
    "ranking": {
      "overallScore": number,
      "skills": [...],
      "experience": { ... },
      "education": { ... },
      "strengths": [...],
      "gaps": [...]
    },
    "standardization": {
      "objectivityScore": number,
      "formatBias": [],
      "nameBias": []
    }
  }
}
```

#### 3. Extract Resume Data
```
POST /resume/extract
Content-Type: multipart/form-data

Body:
- resume: File (PDF, DOCX, or TXT)

Response: { resumeData parsed from file }
```

#### 4. Batch Analyze
```
POST /resume/batch-analyze
Content-Type: multipart/form-data

Body:
- resumes: Files (multiple)
- jobDescription: String

Response:
{
  "success": true,
  "data": {
    "totalProcessed": number,
    "results": [{ fileName, candidateName, ranking }]
  }
}
```

#### 5. Health Check
```
GET /health

Response:
{
  "status": "ok",
  "timestamp": "2024-01-01T00:00:00Z"
}
```

## Usage

### For Job Seekers

1. Navigate to http://localhost:3000
2. Click "Job Seeker"
3. Upload your resume (PDF, DOCX, or TXT)
4. (Optional) Paste a job description
5. Click "Analyze Resume"
6. View your ATS score, issues, and keyword recommendations
7. Apply suggestions to improve your resume

### For Recruiters

1. Navigate to http://localhost:3000
2. Click "Recruiter"
3. Upload a candidate's resume
4. Paste the job description
5. Click "Analyze Candidate"
6. View the candidate's ranking, skills match, and gaps

## Technology Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **AI**: Claude API (Anthropic)
- **Database**: MongoDB
- **File Processing**: pdf-parse, docx
- **Authentication**: JWT (ready to implement)

### Frontend
- **Framework**: React 18
- **Language**: TypeScript
- **State Management**: Zustand
- **HTTP Client**: Axios
- **Styling**: Tailwind CSS
- **Routing**: React Router

### Infrastructure
- **Containerization**: Docker
- **Orchestration**: Docker Compose
- **Development**: Local with hot reload

## Key Capabilities

### Resume Parsing
Extracts and structures:
- Contact information
- Professional summary
- Work experience
- Education
- Skills (categorized by type)
- Certifications

### ATS Analysis
Checks for:
- Format compatibility
- Font and spacing issues
- Multi-column layouts
- Unreadable elements
- Missing sections

### Keyword Matching
- Extracts keywords from job description
- Identifies matched keywords in resume
- Highlights missing keywords
- Provides contextual suggestions

### Candidate Ranking
- Scores skills match
- Calculates experience relevance
- Evaluates education fit
- Provides overall ranking

### Bias Reduction
- Identifies formatting that triggers bias
- Checks for unnecessary personal info
- Measures objectivity score
- Suggests standardization

## Environment Variables

### Backend (.env)
```
PORT=5000
NODE_ENV=development
CLAUDE_API_KEY=your_api_key
CLAUDE_MODEL=claude-3-5-sonnet-20241022
MONGODB_URI=mongodb://localhost:27017/resume-analyzer
JWT_SECRET=your_secret
JWT_EXPIRY=7d
MAX_FILE_SIZE=10485760
UPLOAD_DIR=./uploads
FRONTEND_URL=http://localhost:3000
```

### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:5000
REACT_APP_API_TIMEOUT=30000
```

## Common Issues & Solutions

### CLAUDE_API_KEY not found
- Ensure you've created `.env` file with your API key
- Restart the backend service

### File upload fails
- Check file size (max 10MB)
- Ensure file format is PDF, DOCX, or TXT
- Verify uploads directory exists and has write permissions

### Frontend can't reach backend
- Ensure backend is running on port 5000
- Check REACT_APP_API_URL in frontend .env
- Verify CORS is properly configured

### MongoDB connection error
- If not using Docker, ensure MongoDB is running
- Check MONGODB_URI in .env

## Future Enhancements

- [ ] User authentication and resume history
- [ ] Resume version comparison
- [ ] Cover letter analysis
- [ ] Interview preparation tips
- [ ] LinkedIn profile integration
- [ ] Salary insights based on skills
- [ ] Real-time collaboration features
- [ ] Advanced analytics dashboard
- [ ] Email integration for job opportunities
- [ ] Mobile app

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT License - see LICENSE file for details

## Support

For issues or questions:
- Create an issue on GitHub
- Check existing documentation
- Contact the development team

---

**Built with ❤️ using Claude AI**
