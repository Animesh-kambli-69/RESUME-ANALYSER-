# Installation Guide

Complete step-by-step installation instructions for Resume Analyzer.

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Backend Setup](#backend-setup)
3. [Frontend Setup](#frontend-setup)
4. [Database Setup (Optional)](#database-setup-optional)
5. [Docker Setup](#docker-setup)
6. [Verification](#verification)

## Prerequisites

### Required
- **Node.js**: 18.x or higher
- **npm**: 9.x or higher (comes with Node.js)
- **Claude API Key**: Get from [console.anthropic.com](https://console.anthropic.com)

### Optional
- **Docker**: For containerized setup
- **MongoDB**: For database (development can work without it)
- **Git**: For version control

### Check Versions
```bash
node --version   # Should be v18.x.x or higher
npm --version    # Should be 9.x.x or higher
```

## Backend Setup

### 1. Navigate to Backend Directory
```bash
cd backend
```

### 2. Install Dependencies
```bash
npm install
```

Expected output shows all packages installing without errors.

### 3. Create Environment File
```bash
# Windows
copy .env.example .env

# macOS/Linux
cp .env.example .env
```

### 4. Configure Environment Variables
Edit the `.env` file:
```bash
# Windows
notepad .env

# macOS
nano .env

# Linux
vim .env
```

**Minimum required configuration:**
```env
CLAUDE_API_KEY=sk-ant-...paste-your-api-key-here...
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

### 5. Verify Backend Installation
```bash
npm run build
```

Should compile TypeScript without errors.

### 6. Start Backend
```bash
npm run dev
```

Expected output:
```
╔════════════════════════════════════════╗
║     Resume Analyzer Backend Running    ║
║     Port: 5000                         ║
║     Environment: development           ║
╚════════════════════════════════════════╝
```

**Backend is ready!** ✓

Keep this terminal open and move to frontend setup in a new terminal.

## Frontend Setup

### 1. Open New Terminal and Navigate to Frontend
```bash
cd frontend
```

### 2. Install Dependencies
```bash
npm install
```

Expected output shows all packages installing.

### 3. Create Environment File
```bash
# Windows
copy .env.example .env

# macOS/Linux
cp .env.example .env
```

### 4. Configure Environment Variables (if needed)
The default `.env` should work:
```env
REACT_APP_API_URL=http://localhost:5000
REACT_APP_API_TIMEOUT=30000
```

Only change if:
- Backend is on a different port
- You're deploying to production

### 5. Start Frontend
```bash
npm start
```

Expected output:
```
Compiled successfully!

You can now view resume-analyzer-frontend in the browser.

  Local:            http://localhost:3000
  On Your Network:  http://192.168.x.x:3000

Note that the development build is not optimized.
```

**Frontend is ready!** ✓

Your browser should automatically open to http://localhost:3000

## Database Setup (Optional)

For development, the application works without a database. For production:

### Install MongoDB Locally

**Windows:**
1. Download from [mongodb.com/try/download/community](https://www.mongodb.com/try/download/community)
2. Run installer and follow prompts
3. MongoDB Service should start automatically

**macOS:**
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

**Linux (Ubuntu):**
```bash
sudo apt-get update
sudo apt-get install -y mongodb
sudo systemctl start mongodb
```

### Update Backend .env
```env
MONGODB_URI=mongodb://localhost:27017/resume-analyzer
```

### Verify Connection
```bash
# Your backend logs should show MongoDB connection successful
```

## Docker Setup

### Prerequisites
- Docker Desktop installed
- Docker daemon running

### 1. Create Root .env File
```bash
# In RESUME-ANALYSER root directory
echo CLAUDE_API_KEY=sk-ant-...your-api-key... > .env
```

### 2. Build and Start Services
```bash
docker-compose up --build
```

First run takes 2-5 minutes as it builds images.

Expected output (final lines):
```
backend  | ╔════════════════════════════════════════╗
backend  | ║     Resume Analyzer Backend Running    ║
backend  | ║     Port: 5000                         ║
backend  | ║     Environment: development           ║
backend  | ╚════════════════════════════════════════╝

frontend | Compiled successfully!
```

### 3. Access Services
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000/api/health
- **Database**: mongodb://localhost:27017

### 4. View Logs
```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f backend
docker-compose logs -f frontend
```

### 5. Stop Services
```bash
docker-compose down
```

## Verification

### 1. Check Backend Health
```bash
curl http://localhost:5000/api/health
```

Expected response:
```json
{
  "status": "ok",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

### 2. Test Frontend Access
Open browser to: http://localhost:3000

Should see the Resume Analyzer home page with two role options.

### 3. Test Resume Upload (Quick Test)
1. Click "Job Seeker"
2. Click file upload area
3. Select any PDF, DOCX, or TXT file
4. Click "Analyze Resume"

Should process without errors and show results.

### 4. Check Node Processes
```bash
# Show all node processes
ps aux | grep node

# Or on Windows
tasklist | findstr node
```

Should show:
- One process on port 5000 (backend)
- One process on port 3000 (frontend)

## Troubleshooting Installation

### Problem: npm install fails
**Solution:**
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and lock file
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

### Problem: Port already in use
**Solution:**
```bash
# Find what's using the port
# macOS/Linux
lsof -i :5000
lsof -i :3000

# Windows
netstat -ano | findstr :5000
netstat -ano | findstr :3000

# Kill the process
kill -9 <PID>  # macOS/Linux
taskkill /PID <PID> /F  # Windows
```

### Problem: CLAUDE_API_KEY not working
**Verify:**
1. Key is correct (copy from Anthropic console)
2. .env file is in the right directory (backend/.env)
3. Backend restarted after .env change
4. No extra spaces or quotes in .env

### Problem: CORS errors in browser console
**Solution:**
1. Ensure backend is running on port 5000
2. Check REACT_APP_API_URL in frontend .env
3. Clear browser cache: Ctrl+Shift+Del (or Cmd+Shift+Del on Mac)
4. Restart frontend

### Problem: TypeScript compilation errors
**Solution:**
```bash
# Clear build artifacts
rm -rf dist/

# Rebuild
npm run build
```

## Next Steps After Installation

1. **Read**: Check [QUICKSTART.md](./QUICKSTART.md) for quick start guide
2. **Explore**: Visit http://localhost:3000 and try analyzing a resume
3. **Customize**: Edit components in `frontend/src/components`
4. **Deploy**: Follow deployment section in main README.md

## System Requirements Summary

| Component | Minimum | Recommended |
|-----------|---------|-------------|
| RAM | 2GB | 4GB+ |
| Disk Space | 1GB | 2GB+ |
| Node.js | 18.0 | 18.12+ |
| npm | 9.0 | 9.5+ |
| Internet | Required | Required |

## Performance Notes

- First build: 2-5 minutes
- Subsequent starts: 10-30 seconds
- File upload processing: 5-15 seconds
- Claude API response: 2-10 seconds

---

**Installation complete! Proceed to [QUICKSTART.md](./QUICKSTART.md) or start using the application.** 🎉
