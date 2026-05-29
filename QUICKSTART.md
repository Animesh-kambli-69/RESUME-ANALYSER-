# Quick Start Guide

## 📋 Overview

This Resume Analyzer is a full-stack AI-powered application with:
- **Backend**: Node.js/Express + Claude AI API
- **Frontend**: React + TypeScript + Tailwind CSS
- **Database**: MongoDB (optional for development)
- **Containerization**: Docker & Docker Compose

## 🚀 Quick Start (Local Development)

### Step 1: Get Claude API Key
1. Visit [console.anthropic.com](https://console.anthropic.com)
2. Sign up or login
3. Create a new API key
4. Save it safely (you'll need it)

### Step 2: Setup Backend

```bash
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env with your Claude API key
# Windows: notepad .env
# macOS/Linux: nano .env
```

Add your Claude API key:
```
CLAUDE_API_KEY=sk-ant-...your-key-here...
```

### Step 3: Start Backend

```bash
npm run dev
# Server should start on http://localhost:5000
```

You should see:
```
╔════════════════════════════════════════╗
║     Resume Analyzer Backend Running    ║
║     Port: 5000                         ║
║     Environment: development           ║
╚════════════════════════════════════════╝
```

### Step 4: Setup Frontend (New Terminal)

```bash
cd frontend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Frontend will use backend at http://localhost:5000 by default
```

### Step 5: Start Frontend

```bash
npm start
# Frontend opens automatically at http://localhost:3000
```

## 🐳 Docker Setup (Recommended)

### Prerequisites
- Docker Desktop installed and running
- Claude API key

### Steps

1. **Create .env file in root directory**
```bash
echo CLAUDE_API_KEY=sk-ant-...your-key-here... > .env
```

2. **Start all services**
```bash
docker-compose up --build
```

3. **Access the application**
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000/api/health
- MongoDB: mongodb://localhost:27017

4. **Stop services**
```bash
docker-compose down
```

## 📁 Project Structure Quick Reference

```
RESUME-ANALYSER/
├── backend/                 # Node.js + Express server
│   └── src/
│       ├── services/       # Claude AI integration
│       ├── controllers/    # API endpoints
│       └── routes/         # API routes
│
├── frontend/               # React application
│   └── src/
│       ├── components/     # UI components
│       ├── pages/          # Page components
│       └── services/       # API client
│
└── shared/                 # Shared TypeScript types
    └── types/

```

## 🎯 Core Features

### For Job Seekers
```
Upload Resume → AI Analysis → Get Feedback
↓
- ATS Compatibility Score
- Keyword Matching Report
- Formatting Issues
- Actionable Recommendations
```

### For Recruiters
```
Upload Resume + Job Description → AI Analysis → Get Ranking
↓
- Candidate Score (0-100)
- Skills Matching
- Experience Analysis
- Bias-Free Evaluation
```

## 🔑 Key APIs

### Analyze for Job Seeker
```bash
curl -X POST http://localhost:5000/api/resume/analyze-job-seeker \
  -F "resume=@resume.pdf" \
  -F "jobDescription=Senior Developer position with Python and React"
```

### Analyze for Recruiter
```bash
curl -X POST http://localhost:5000/api/resume/analyze-recruiter \
  -F "resume=@resume.pdf" \
  -F "jobDescription=Job description here"
```

### Health Check
```bash
curl http://localhost:5000/api/health
```

## ⚙️ Environment Variables

### Backend (.env)
```
CLAUDE_API_KEY=sk-ant-...
CLAUDE_MODEL=claude-3-5-sonnet-20241022
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:5000
REACT_APP_API_TIMEOUT=30000
```

## 🐛 Troubleshooting

### Issue: "CLAUDE_API_KEY not found"
**Solution:**
1. Verify .env file exists in backend directory
2. Verify API key is correctly set
3. Restart backend: `npm run dev`

### Issue: "Cannot GET /api/resume/..."
**Solution:**
1. Ensure backend is running on port 5000
2. Check that Node processes aren't already using port 5000
3. Restart backend

### Issue: Frontend can't reach backend
**Solution:**
1. Check backend is running: `curl http://localhost:5000/api/health`
2. Verify REACT_APP_API_URL in frontend .env
3. Clear browser cache and restart frontend

### Issue: Port already in use
**Solution:**
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# macOS/Linux
lsof -i :5000
kill -9 <PID>
```

## 📊 What AI Is Doing

### Resume Parsing
Claude AI extracts:
- Contact information (name, email, phone)
- Work experience (job titles, companies, dates, descriptions)
- Education (degrees, institutions, graduation dates)
- Skills (technical, soft, languages, tools)
- Certifications

### ATS Compatibility
Claude AI checks for:
- PDF/format compatibility issues
- Formatting that breaks ATS parsing
- Missing standard resume sections
- Font readability issues
- Multi-column layouts

### Keyword Analysis
Claude AI performs:
- Job description keyword extraction
- Resume keyword matching
- Gap analysis (missing keywords)
- Context-aware suggestions for additions

### Candidate Ranking
Claude AI calculates:
- Skills relevance scores
- Experience match (years and type)
- Education fit
- Overall compatibility score (0-100)

### Bias Reduction
Claude AI identifies:
- Formatting elements that trigger bias
- Unnecessary personal information
- Objectivity score
- Standardization recommendations

## 🎓 Learning Outcomes

After setup, you'll understand:
- Full-stack TypeScript development
- React state management (Zustand)
- Express.js API design
- Claude AI API integration
- File upload and processing
- Docker containerization
- TypeScript interfaces and types

## 📚 Next Steps

1. **Customize the UI**: Edit React components in `frontend/src/components`
2. **Add Database**: Configure MongoDB in backend
3. **User Authentication**: Implement JWT in backend
4. **Add More Features**: See README.md for enhancement ideas
5. **Deploy**: Use Docker images for cloud deployment

## 🆘 Need Help?

1. Check the main [README.md](../README.md)
2. Review [API Documentation](../README.md#api-documentation)
3. Check backend logs: `docker-compose logs backend`
4. Check frontend console: Press F12 in browser

## 📞 Support

For issues:
- Check error messages carefully
- Review logs in backend and frontend consoles
- Verify environment variables are set correctly
- Ensure all services are running

---

**Happy coding! 🚀**
