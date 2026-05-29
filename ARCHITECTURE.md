# Project Architecture

## 📐 System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    User Interface (React)                   │
│              Frontend on http://localhost:3000               │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────────────────────────────────────────────────┐   │
│  │         React Components (TypeScript)                 │   │
│  ├─ HomePage       (Role Selection)                      │   │
│  ├─ JobSeekerPage  (Resume Analysis)                     │   │
│  ├─ RecruiterPage  (Candidate Ranking)                   │   │
│  └─ Supporting Components (UI Elements)                  │   │
│                                                               │
│  ┌──────────────────────────────────────────────────────┐   │
│  │    State Management (Zustand)                         │   │
│  ├─ Resume File                                          │   │
│  ├─ Job Description                                      │   │
│  ├─ Analysis Results                                     │   │
│  └─ Loading/Error States                                │   │
│                                                               │
│  ┌──────────────────────────────────────────────────────┐   │
│  │      API Client (Axios)                               │   │
│  └─ Calls Backend API Endpoints                         │   │
│                                                               │
└────────────────────────┬─────────────────────────────────────┘
                         │
                    HTTP/REST
                    (JSON)
                         │
┌────────────────────────┴─────────────────────────────────────┐
│              Backend API (Express/Node.js)                   │
│              Running on http://localhost:5000                │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────────────────────────────────────────────────┐   │
│  │         API Routes & Controllers                      │   │
│  ├─ POST /analyze-job-seeker                            │   │
│  ├─ POST /analyze-recruiter                             │   │
│  ├─ POST /extract                                       │   │
│  ├─ POST /batch-analyze                                 │   │
│  └─ GET  /health                                        │   │
│                                                               │
│  ┌──────────────────────────────────────────────────────┐   │
│  │         Business Logic Services                       │   │
│  ├─ ResumeAIService                                     │   │
│  │   └─ Calls Claude API                                │   │
│  └─ FileProcessingService                              │   │
│      └─ Extracts text from PDF/DOCX/TXT                 │   │
│                                                               │
│  ┌──────────────────────────────────────────────────────┐   │
│  │         Claude AI API                                 │   │
│  │    ├─ Resume Parsing                                 │   │
│  │    ├─ ATS Analysis                                   │   │
│  │    ├─ Keyword Matching                               │   │
│  │    ├─ Candidate Ranking                              │   │
│  │    └─ Bias Reduction Check                           │   │
│                                                               │
│  ┌──────────────────────────────────────────────────────┐   │
│  │         File Upload Handling (Multer)                │   │
│  │    ├─ PDF Processing                                 │   │
│  │    ├─ DOCX Processing                                │   │
│  │    └─ TXT Processing                                 │   │
│                                                               │
└────────────────────────┬─────────────────────────────────────┘
                         │
                    (Optional)
                    MongoDB
                         │
┌────────────────────────┴─────────────────────────────────────┐
│              Database (MongoDB)                              │
│              mongodb://localhost:27017                       │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  Collections (Future Use):                                  │
│  ├─ users      (User profiles)                              │
│  ├─ resumes    (Uploaded resumes)                           │
│  ├─ analyses   (Analysis results)                           │
│  └─ jobs       (Job descriptions)                           │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

## 🗂️ Complete Project Structure

```
RESUME-ANALYSER/
│
├── 📄 README.md                    # Main documentation
├── 📄 QUICKSTART.md               # Quick start guide
├── 📄 INSTALL.md                  # Installation guide
├── 📄 ARCHITECTURE.md             # This file
├── 📄 docker-compose.yml          # Docker orchestration
├── 📄 .gitignore                  # Git ignore rules
│
├── 📁 backend/                    # Node.js Backend
│   ├── src/
│   │   ├── 📁 controllers/
│   │   │   └── ResumeController.ts       # API handlers
│   │   │
│   │   ├── 📁 services/
│   │   │   ├── ResumeAIService.ts        # Claude AI integration
│   │   │   └── FileProcessingService.ts # File extraction logic
│   │   │
│   │   ├── 📁 routes/
│   │   │   └── resume.routes.ts         # API endpoints
│   │   │
│   │   ├── 📁 models/                    # Database models (future)
│   │   ├── 📁 middleware/                # Express middleware
│   │   ├── 📁 utils/                     # Utility functions
│   │   │
│   │   ├── 📁 config/
│   │   │   └── index.ts                 # Configuration
│   │   │
│   │   └── index.ts                     # Server entry point
│   │
│   ├── package.json               # Node.js dependencies
│   ├── tsconfig.json             # TypeScript configuration
│   ├── .env.example              # Environment variables template
│   ├── .gitignore                # Git ignore
│   ├── Dockerfile                # Docker image
│   └── uploads/                  # Temporary file storage
│
├── 📁 frontend/                   # React Frontend
│   ├── src/
│   │   ├── 📁 components/        # Reusable React components
│   │   │   ├── FileUploader.tsx  # File upload widget
│   │   │   ├── ATSReport.tsx     # ATS compatibility display
│   │   │   ├── KeywordAnalysis.tsx # Keyword matching results
│   │   │   └── CandidateRanking.tsx # Ranking display
│   │   │
│   │   ├── 📁 pages/             # Page components
│   │   │   ├── HomePage.tsx      # Role selection page
│   │   │   ├── JobSeekerPage.tsx # Job seeker analysis page
│   │   │   └── RecruiterPage.tsx # Recruiter ranking page
│   │   │
│   │   ├── 📁 services/          # API and state management
│   │   │   ├── api.ts           # API client (axios)
│   │   │   └── store.ts         # State management (zustand)
│   │   │
│   │   ├── 📁 types/            # TypeScript types
│   │   │   └── store.ts         # Store type definitions
│   │   │
│   │   ├── App.tsx               # Main application component
│   │   ├── index.tsx             # React entry point
│   │   ├── index.css             # Global styles
│   │   │
│   │   └── 📁 public/
│   │       └── index.html        # HTML template
│   │
│   ├── package.json              # React dependencies
│   ├── tsconfig.json            # TypeScript configuration
│   ├── tailwind.config.js        # Tailwind CSS config
│   ├── postcss.config.js         # PostCSS configuration
│   ├── .env.example              # Environment variables
│   ├── .gitignore                # Git ignore
│   └── Dockerfile                # Docker image
│
└── 📁 shared/                     # Shared TypeScript Types
    └── types/
        └── index.ts              # All shared type definitions
```

## 🔄 Data Flow

### Job Seeker Workflow
```
User Upload Resume
       ↓
┌──────────────────────────┐
│ Frontend UI              │
│ - File selector          │
│ - Job description input  │
└──────────────────────────┘
       ↓
┌──────────────────────────┐
│ POST /analyze-job-seeker │
├──────────────────────────┤
│ - Extract text from file │
│ - Parse resume data      │
│ - Analyze ATS compat     │
│ - Match keywords         │
│ - Check bias             │
│ - Generate recommendations
└──────────────────────────┘
       ↓
┌──────────────────────────┐
│ Display Results          │
│ - ATS Report             │
│ - Keyword Analysis       │
│ - Recommendations        │
└──────────────────────────┘
```

### Recruiter Workflow
```
User Upload Resume + Job Description
       ↓
┌──────────────────────────┐
│ Frontend UI              │
│ - File selector          │
│ - Job description field  │
└──────────────────────────┘
       ↓
┌──────────────────────────┐
│ POST /analyze-recruiter  │
├──────────────────────────┤
│ - Extract text from file │
│ - Parse resume data      │
│ - Rank candidate         │
│ - Analyze skills match   │
│ - Evaluate experience    │
│ - Check education fit    │
│ - Assess bias            │
└──────────────────────────┘
       ↓
┌──────────────────────────┐
│ Display Ranking          │
│ - Overall score          │
│ - Skills match           │
│ - Experience analysis    │
│ - Education evaluation   │
│ - Strengths & gaps       │
└──────────────────────────┘
```

## 🤖 Claude AI Service Integration

### ResumeAIService Methods

```typescript
ResumeAIService
├── parseResume()
│   ├── Input: Raw resume text
│   ├── Process: Claude AI extraction
│   └── Output: Structured JSON
│
├── analyzeAtsCompatibility()
│   ├── Input: Raw resume text
│   ├── Process: ATS parsing simulation
│   └── Output: Score + Issues + Recommendations
│
├── analyzeKeywords()
│   ├── Input: Resume text + Job description
│   ├── Process: Keyword extraction & matching
│   └── Output: Matched + Missing keywords
│
├── rankCandidate()
│   ├── Input: Parsed resume + Job description
│   ├── Process: Multi-factor scoring
│   └── Output: Overall score + Details
│
├── checkBiasReduction()
│   ├── Input: Raw resume text
│   ├── Process: Bias trigger detection
│   └── Output: Objectivity score + Recommendations
│
└── generateRecommendations()
    ├── Input: Resume + Analysis results
    ├── Process: Contextual suggestion generation
    └── Output: Array of actionable recommendations
```

## 📊 API Endpoints Summary

| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | `/api/resume/analyze-job-seeker` | Analyze resume for job seeker |
| POST | `/api/resume/analyze-recruiter` | Analyze resume for recruiter |
| POST | `/api/resume/extract` | Extract structured data only |
| POST | `/api/resume/batch-analyze` | Batch analyze multiple resumes |
| GET | `/api/health` | Health check |

## 🛡️ Security Considerations

```
├── Input Validation
│   ├── File type validation (PDF, DOCX, TXT only)
│   ├── File size limits (10MB max)
│   └── MIME type checking
│
├── API Security
│   ├── CORS configuration
│   ├── Rate limiting (ready to implement)
│   └── Error message sanitization
│
├── Data Handling
│   ├── Temporary file cleanup
│   ├── No sensitive data logging
│   └── API key environment variable
│
└── File Storage
    ├── Isolated upload directory
    ├── Auto-cleanup after processing
    └── No persistent storage without user consent
```

## 🚀 Deployment Architecture

### Docker Multi-Container Setup
```
┌─────────────────────────────────────┐
│      Docker Network                 │
├─────────────────────────────────────┤
│                                     │
│ ┌──────────────────────────────┐   │
│ │ Frontend Container           │   │
│ │ - React App (port 3000)      │   │
│ └───────────┬──────────────────┘   │
│             │                       │
│ ┌──────────────────────────────┐   │
│ │ Backend Container            │   │
│ │ - Node.js App (port 5000)    │   │
│ └───────────┬──────────────────┘   │
│             │                       │
│ ┌──────────────────────────────┐   │
│ │ Database Container           │   │
│ │ - MongoDB (port 27017)       │   │
│ └──────────────────────────────┘   │
│                                     │
└─────────────────────────────────────┘
```

## 📈 Scalability Considerations

```
Current Architecture
├── Single Backend Instance
├── Stateless API Calls
├── File Uploads (Temporary)
└── No Database Required (Optional)

Future Scaling Path
├── Load Balancer
├── Multiple Backend Instances
├── Redis for Caching
├── MongoDB for History
├── S3 for File Storage
└── Queue System for Batch Processing
```

## 🔄 Development Workflow

```
1. Development
   ├── Backend: npm run dev
   ├── Frontend: npm start
   └── File: src/**

2. Building
   ├── Backend: npm run build → dist/
   ├── Frontend: npm run build → build/
   └── Docker: docker-compose build

3. Testing (Future)
   ├── Backend: npm test
   ├── Frontend: npm test
   └── E2E: npm run e2e

4. Deployment
   ├── Docker Push
   ├── Cloud Deployment
   └── CI/CD Pipeline
```

---

**Last Updated**: 2024
