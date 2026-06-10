# 🧪 Testing Guide - Resume Analyzer with Sample Data

## **Quick Start Testing**

### **Prerequisites**
1. ✅ Ollama running: `ollama serve` (in Terminal 1)
2. ✅ Backend ready: `cd backend && npm run dev` (in Terminal 2)
3. ✅ Frontend ready: `cd frontend && npm start` (in Terminal 3)

---

## **Sample Test Resumes Created**

Located in: `test-resumes/` folder

### **1. sample_resume_1.txt** 👨‍💻 Senior Software Engineer
- 5+ years experience
- Strong technical skills (JavaScript, React, Node.js)
- Leadership experience
- AWS & Agile certifications
- **Good for:** Testing ATS compatibility, keyword matching

### **2. sample_resume_2.txt** 👩‍💼 Marketing Manager
- Marketing background
- Digital campaign experience
- Team leadership
- Marketing certifications
- **Good for:** Testing multi-industry analysis

### **3. job_description_1.txt** 📋 Senior Full Stack Developer
- Tech stack matching resume 1
- 5+ years experience requirement
- Specific technical keywords
- **Good for:** Testing ATS scoring, keyword analysis

---

## **Testing Workflow**

### **Test 1: Job Seeker Mode - Resume 1 ✅**

**Steps:**
1. Open http://localhost:3000
2. Click "I'm a Job Seeker"
3. Upload `test-resumes/sample_resume_1.txt`
4. Click "Analyze Resume"

**Expected Results:**
```
✅ Parsed successfully
✅ Shows scores and metrics
✅ Lists ATS issues (if any)
✅ Shows keyword analysis
✅ Provides recommendations
```

**What to Check:**
- [ ] File uploads successfully
- [ ] No error messages
- [ ] Results display in reasonable time (3-15s)
- [ ] All 4 sections show data
- [ ] JSON responses are valid

---

### **Test 2: Recruiter Mode - Resume Analysis 👔**

**Steps:**
1. Go back to home
2. Click "I'm a Recruiter"
3. Upload `test-resumes/sample_resume_1.txt`
4. Paste job description from `job_description_1.txt`
5. Click "Analyze Candidate"

**Expected Results:**
```
✅ Shows compatibility score
✅ Lists matched keywords
✅ Shows skill gaps
✅ Provides hiring recommendations
✅ Bias check results
```

**What to Check:**
- [ ] Both file and job description process
- [ ] Compatibility scoring works
- [ ] Keywords are highlighted
- [ ] Results make logical sense

---

### **Test 3: Compare Candidates 🔄**

**Steps:**
1. In Recruiter Mode
2. Upload `sample_resume_1.txt` and get score (e.g., 85)
3. Upload `sample_resume_2.txt` and get score (e.g., 45)
4. Compare the scores and feedback

**Expected Results:**
```
✅ Resume 1 scores higher for tech role
✅ Resume 2 scores lower (marketing focus)
✅ Both get appropriate feedback
```

**What to Check:**
- [ ] Different resumes get different scores
- [ ] Scores match job requirements
- [ ] Feedback is relevant

---

### **Test 4: Mock Mode Testing ⚡**

**Steps:**
1. Edit `backend/.env`
2. Change: `AI_MODE=mock`
3. Restart backend: `npm run dev`
4. Upload resume again

**Expected Results:**
```
✅ Instant response (< 1 second)
✅ Same format as Ollama results
✅ Hardcoded but realistic data
```

**Why Test Mock Mode?**
- Verify UI works independently of AI
- Test without waiting for Ollama
- Isolate frontend bugs

---

## **Testing Checklist**

### **File Upload**
- [ ] TXT file uploads
- [ ] Large file handling (10MB limit)
- [ ] Empty file error handling
- [ ] Invalid file type error

### **Analysis Results**
- [ ] Results display correctly formatted
- [ ] Numbers are reasonable (0-100 scores)
- [ ] Text content is readable
- [ ] No JSON parsing errors in console

### **API Communication**
- [ ] Backend logs show requests
- [ ] Frontend console shows no errors (F12)
- [ ] Responses complete in reasonable time
- [ ] No 500 errors or timeouts

### **UI/UX**
- [ ] Buttons are clickable
- [ ] Loading state shows during analysis
- [ ] Results section is clearly visible
- [ ] Navigation works properly

---

## **Troubleshooting During Testing**

### **Problem: "Connection refused"**
```
❌ Backend not running
✅ Fix: npm run dev in backend folder
```

### **Problem: "Ollama not found"**
```
❌ Ollama server not running
✅ Fix: Run: ollama serve (in new terminal)
```

### **Problem: "File too large"**
```
❌ Resume > 10MB
✅ Fix: Use smaller resume file
```

### **Problem: "Timeout after 30s"**
```
❌ Ollama taking too long
✅ Fix: Check if system has enough resources
✅ Try: Use smaller model (neural-chat)
```

### **Problem: Results don't make sense**
```
❌ Ollama model generating random output
✅ Fix: Try with mock mode (AI_MODE=mock)
✅ Check: Ollama model is properly loaded
```

---

## **Performance Expectations**

| Mode | First Request | Subsequent Requests |
|------|---|---|
| **Mock** | < 1s | < 1s |
| **Ollama** | 5-15s | 3-10s |
| **Claude** | 2-5s | 2-5s |

---

## **Console Logs to Check**

### **Backend (Terminal 2)**
```
Expected logs when analyzing:
✅ Using Ollama LLM at http://localhost:11434
✅ POST /api/analyze-job-seeker
✅ Parsing resume...
✅ Calling Ollama API...
✅ Analysis complete
```

### **Frontend (Browser F12 Console)**
```
Expected logs:
✅ No errors
✅ API response received
✅ Results rendered
```

---

## **What Success Looks Like** ✅

1. **File Upload Works**
   - No errors
   - File accepted

2. **Analysis Runs**
   - Backend processes request
   - Ollama generates response
   - Frontend receives data

3. **Results Display**
   - All sections show data
   - Formatting is correct
   - Numbers are reasonable

4. **User Experience**
   - Fast response (under 20s)
   - Clear results
   - Helpful recommendations

---

## **Next Steps After Testing**

If everything works:
- ✅ Try with different resumes
- ✅ Test with different job descriptions
- ✅ Switch between AI modes (mock/ollama/claude)
- ✅ Test edge cases (empty files, large files, etc.)

If something doesn't work:
- Check backend logs
- Check browser console (F12)
- Check Ollama status (`ollama list`)
- Try mock mode first for isolation

---

## **Sample Data Files**

All ready in: `test-resumes/`

```
test-resumes/
├── sample_resume_1.txt (Software Engineer)
├── sample_resume_2.txt (Marketing Manager)
└── job_description_1.txt (Senior Full Stack Developer)
```

You can use these files to test the entire application workflow!

Happy Testing! 🚀
