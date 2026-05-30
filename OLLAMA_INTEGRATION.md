# 🎯 Ollama Integration Guide

## **Architecture Overview**

```
┌─────────────────────────────────────────────────────────────┐
│                      Frontend (React)                       │
│                  http://localhost:3000                      │
│                                                             │
│  User uploads resume → FileUploader component              │
│  Calls backend API: POST /api/resume/analyze-job-seeker    │
└──────────────────────────┬──────────────────────────────────┘
                           │
                    FormData + file
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                    Backend (Express)                        │
│                 http://localhost:5000                       │
│                                                             │
│  ResumeController:                                          │
│  - Receives uploaded file                                  │
│  - Extracts text (PDF/DOCX/TXT)                           │
│  - Calls ResumeAIService                                   │
└──────────────────────────┬──────────────────────────────────┘
                           │
                    Prompt + text
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│              ResumeAIService (Decision Point)               │
│                                                             │
│  Reads AI_MODE from .env:                                   │
│  ├─ 'ollama'  → Routes to callOllama()                     │
│  ├─ 'mock'    → Returns hardcoded response                │
│  └─ 'claude'  → Routes to Claude API                       │
└──────────────────────────┬──────────────────────────────────┘
                           │
                    (Ollama path shown)
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                  HTTP POST Request                          │
│           http://localhost:11434/api/generate               │
│                                                             │
│  {                                                          │
│    "model": "mistral",                                      │
│    "prompt": "Parse this resume: ...",                     │
│    "stream": false,                                         │
│    "temperature": 0.1                                       │
│  }                                                          │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                  Ollama (Local LLM)                         │
│                 ollama serve process                        │
│                                                             │
│  Loads mistral model from ~/.ollama/models                 │
│  Processes prompt with neural network                       │
│  Returns JSON response                                      │
└──────────────────────────┬──────────────────────────────────┘
                           │
                    JSON response
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│          ResumeAIService (extractJSON method)               │
│                                                             │
│  1. Extract JSON from response                             │
│  2. If invalid, repair common JSON issues                  │
│  3. Parse to JavaScript object                             │
│  4. Return to controller                                   │
└──────────────────────────┬──────────────────────────────────┘
                           │
                   Structured data
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│              Backend Response to Frontend                   │
│                                                             │
│  HTTP 200:                                                  │
│  {                                                          │
│    "atsCompatibility": { score: 85, ... },                │
│    "keywordAnalysis": { matchPercentage: 75, ... }        │
│  }                                                          │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                 Frontend Components Display                 │
│                                                             │
│  ATSReport component renders score + issues                │
│  KeywordAnalysis component renders matched keywords        │
│  User sees visual breakdown of resume analysis             │
└─────────────────────────────────────────────────────────────┘
```

---

## **Switching Between AI Modes**

### **For Testing (Mock Mode - Instant)**
```env
AI_MODE=mock
```
Returns instant hardcoded responses. Perfect for UI testing.

### **For Local Analysis (Ollama - Free)**
```env
AI_MODE=ollama
OLLAMA_URL=http://localhost:11434/api/generate
OLLAMA_MODEL=mistral
```
Requires:
1. `ollama serve` running
2. Model downloaded: `ollama pull mistral`

### **For Cloud Analysis (Claude - Paid)**
```env
AI_MODE=claude
CLAUDE_API_KEY=sk-ant-...
CLAUDE_MODEL=claude-3-5-sonnet-20241022
```
Requires Claude API key from Anthropic.

---

## **ResumeAIService Methods**

All 6 methods support all 3 AI modes:

```javascript
// Each method follows this pattern:
async analyzeKeywords(resumeText, jobDescription) {
  if (this.aiMode === 'mock') {
    return this._mockAnalyzeKeywords();
  }
  if (this.aiMode === 'ollama') {
    return this._analyzeKeywordsWithOllama(resumeText, jobDescription);
  }
  // Could add 'claude' mode here
  throw new Error(`Unknown AI_MODE: ${this.aiMode}`);
}
```

### **Method Listing**

1. **parseResume(resumeText)**
   - Extracts structured data from resume
   - Returns: contactInfo, experience, education, skills, etc.

2. **analyzeAtsCompatibility(resumeText)**
   - Checks if resume passes ATS parsers
   - Returns: score (0-100), issues, recommendations

3. **analyzeKeywords(resumeText, jobDescription)**
   - Matches resume keywords to job description
   - Returns: matched%, missing keywords, suggestions

4. **rankCandidate(resumeData, jobDescription, candidateName)**
   - Scores candidate against job requirements
   - Returns: overall score, skill matches, gaps

5. **checkBiasReduction(resumeText)**
   - Flags biased or subjective language
   - Returns: objectivity score, format issues, recommendations

6. **generateRecommendations(resumeText, jobDescription)**
   - Suggests improvements to resume
   - Returns: array of actionable recommendations

---

## **Ollama Prompt Structure**

All prompts follow this pattern for consistency:

```javascript
const prompt = `<TASK DESCRIPTION>

<EXPECTED JSON STRUCTURE>

<USER DATA>

Return ONLY valid JSON, no markdown or extra text.`;

const response = await this.callOllama(prompt);
const result = this.extractJSON(response); // Parse JSON from response
```

**Why this structure?**
- Clear task description for LLM
- Explicit JSON schema expected
- Temperature=0.1 for consistency
- extractJSON() handles imperfect responses

---

## **Error Handling**

### **Ollama Connection Error**
```javascript
// User sees: "Ollama connection failed. Is it running?"
// Fix: Run `ollama serve` in another terminal
```

### **Invalid JSON Response**
```javascript
// Automatic repair attempts:
// 1. Remove control characters
// 2. Remove trailing commas
// 3. Fix quote escaping
// 4. Parse again
// If still fails: returns null, caught by controller
```

### **Model Not Found**
```javascript
// Error: Model not found
// Fix: ollama pull mistral
```

---

## **Performance Tuning**

### **Faster Responses**
- Use `neural-chat` model (4GB, ~5s per request)
- Or use `mock` mode (instant)

### **Better Quality**
- Use `llama2` model (might be slower, ~15s per request)
- More capable at complex analysis

### **Memory Optimization**
- `neural-chat`: 4GB RAM minimum
- `mistral`: 8GB RAM recommended
- `llama2`: 8GB RAM recommended
- Close other apps if running out of memory

### **Model Loading**
- First request ~5-10s (model loads into VRAM)
- Subsequent requests ~1-5s (cached in VRAM)
- Keep Ollama running to maintain cache

---

## **Testing Checklist**

- [ ] Ollama installed (`ollama --version`)
- [ ] Model downloaded (`ollama list`)
- [ ] Ollama server running (`ollama serve`)
- [ ] Backend .env has `AI_MODE=ollama`
- [ ] Backend running (`npm run dev`)
- [ ] Frontend running (`npm start`)
- [ ] Upload test resume
- [ ] See analysis results
- [ ] Switch to different model in .env
- [ ] Restart backend
- [ ] See different (better/faster) results

---

## **Troubleshooting Flowchart**

```
User uploads resume
    ↓
Frontend gets error?
├─ YES → Check browser console (network error)
│        - Backend running? (npm run dev)
│        - CORS configured? (should be auto)
└─ NO → Backend processes file
         ↓
         ResumeAIService called
         ↓
         AI_MODE=ollama?
         ├─ YES → HTTP call to localhost:11434
         │        ├─ Connection refused?
         │        │  └─ FIX: ollama serve
         │        ├─ Model not found?
         │        │  └─ FIX: ollama pull mistral
         │        └─ Success → Parse response
         │           ├─ Invalid JSON?
         │           │  └─ Auto-repair logic
         │           └─ Return to frontend
         └─ NO → Other mode (mock/claude)
                 └─ Return hardcoded/API response
                    ↓
                    Frontend displays results
```

---

## **Configuration Best Practices**

1. **Local Development**
   ```env
   AI_MODE=ollama
   OLLAMA_MODEL=neural-chat  # Fastest for dev
   ```

2. **Testing UI**
   ```env
   AI_MODE=mock  # Instant, no LLM needed
   ```

3. **Quality Assurance**
   ```env
   AI_MODE=ollama
   OLLAMA_MODEL=mistral  # Good balance
   ```

4. **Production**
   ```env
   AI_MODE=claude
   CLAUDE_API_KEY=sk-ant-...  # Professional grade
   ```

---

## **Environment Variables Quick Reference**

| Variable | Default | Options |
|----------|---------|---------|
| `AI_MODE` | `mock` | `mock`, `ollama`, `claude` |
| `OLLAMA_URL` | `http://localhost:11434/api/generate` | Any Ollama endpoint |
| `OLLAMA_MODEL` | `mistral` | `mistral`, `neural-chat`, `llama2`, `orca-mini` |
| `PORT` | `5000` | Any valid port |
| `NODE_ENV` | `development` | `development`, `production` |
| `CLAUDE_API_KEY` | *(empty)* | Your API key |

---

## **Summary**

✅ **What you get:**
- Local LLM analysis (no cloud, no API key)
- Instant mock mode for testing
- Clean, modular code supporting 3 AI backends
- Automatic JSON repair for imperfect responses
- Full documentation

🚀 **To run it:**
1. `ollama serve` (Terminal 1)
2. `npm run dev` (Terminal 2 - backend)
3. `npm start` (Terminal 3 - frontend)
4. Upload resume and analyze!

Enjoy free, local, private resume analysis! 🎉
