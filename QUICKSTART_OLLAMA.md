# 🚀 Quick Start - Resume Analyzer with Ollama

**Run locally with free open-source LLM (no API key needed!)**

---

## **5-Minute Setup**

### **1. Install Ollama** (2 min)
- Download: https://ollama.ai/download
- Run installer
- Verify: `ollama --version`

### **2. Download Model** (3-10 min depending on speed)
```powershell
ollama pull mistral
```

### **3. Keep Ollama Running**
```powershell
ollama serve
```
Keep this terminal open! 

---

## **4. Backend Setup**

In another terminal:

```bash
cd backend
npm install
```

Create `backend/.env`:
```env
AI_MODE=ollama
OLLAMA_URL=http://localhost:11434/api/generate
OLLAMA_MODEL=mistral
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

Start backend:
```bash
npm run dev
```

✅ You should see:
```
╔════════════════════════════════════════╗
║   Resume AI Service Configuration      ║
║   Mode: OLLAMA                         ║
║   Model: mistral                       ║
╚════════════════════════════════════════╝

Server listening on http://localhost:5000
```

---

## **5. Frontend Setup**

In another terminal:

```bash
cd frontend
npm install
npm start
```

Opens at: **http://localhost:3000**

---

## **✅ You're Done!**

Upload a resume, analyze it, get instant results - all locally!

---

## **Troubleshooting**

| Issue | Fix |
|-------|-----|
| "Connection refused" | Make sure Ollama server is running (`ollama serve`) |
| "Model not found" | Download it: `ollama pull mistral` |
| "Out of memory" | Use smaller model: `ollama pull neural-chat` |
| Slow responses | Use smaller model or close other apps |

---

## **Model Choices**

| Model | Speed | Quality | Size | RAM |
|-------|-------|---------|------|-----|
| **neural-chat** | ⚡⚡⚡ | ⭐⭐ | 4GB | 4GB |
| **mistral** | ⚡⚡ | ⭐⭐⭐ | 5GB | 8GB |
| **llama2** | ⚡ | ⭐⭐⭐⭐ | 7GB | 8GB |

Change in `backend/.env`: `OLLAMA_MODEL=neural-chat`

---

## **All Set!** 🎉

Your locally-powered resume analyzer is ready to use!
