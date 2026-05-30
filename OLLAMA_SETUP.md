# 🚀 Local LLM Setup with Ollama

This guide shows how to run the Resume Analyzer with **local LLM models** using Ollama (no Claude API needed).

---

## **What You'll Need**

- **Ollama** - Free local LLM runner
- **4GB+ RAM** - For running local models
- **Disk Space** - ~10GB for model files

---

## **Step 1: Install Ollama**

### **Windows**
1. Download: https://ollama.ai/download
2. Run the installer
3. Open PowerShell and verify:
```powershell
ollama --version
```

### **Mac**
```bash
brew install ollama
```

### **Linux**
```bash
curl https://ollama.ai/install.sh | sh
```

---

## **Step 2: Download a Local Model**

Open Terminal/PowerShell and pull a model:

```powershell
# Recommended - Good balance of speed and quality (7B)
ollama pull mistral

# OR: Fastest option (4B)
ollama pull neural-chat

# OR: More capable but slower (7B)
ollama pull llama2
```

**Download times:**
- Neural-chat: ~5 min (4GB)
- Mistral: ~10 min (5GB)
- Llama2: ~15 min (7GB)

Check what's installed:
```powershell
ollama list
```

---

## **Step 3: Start Ollama Server**

Open a Terminal/PowerShell and keep it running:

```powershell
ollama serve
```

You should see:
```
time=2024-05-30T14:22:37.123Z level=INFO msg="Listening on 127.0.0.1:11434"
```

**Keep this terminal open while using the app!**

---

## **Step 4: Configure Backend**

Copy `.env.example` to `.env`:

```bash
cd backend
cp .env.example .env
```

Edit `backend/.env`:

```env
# Choose AI mode
AI_MODE=ollama

# Ollama settings
OLLAMA_URL=http://localhost:11434/api/generate
OLLAMA_MODEL=mistral
```

**Available models:**
| Model | Speed | Quality | Size |
|-------|-------|---------|------|
| neural-chat | ⚡⚡⚡ | ⭐⭐ | 4GB |
| mistral | ⚡⚡ | ⭐⭐⭐ | 5GB |
| llama2 | ⚡ | ⭐⭐⭐⭐ | 7GB |

---

## **Step 5: Install & Run Backend**

```bash
cd backend
npm install
npm run dev
```

You should see:
```
╔════════════════════════════════════════╗
║   Resume AI Service Configuration      ║
║   Mode: OLLAMA                         ║
║   Ollama Model: mistral                ║
╚════════════════════════════════════════╝

Server listening on http://localhost:5000
```

---

## **Step 6: Start Frontend**

In another terminal:

```bash
cd frontend
npm install
npm start
```

Opens at: http://localhost:3000

---

## **Complete Setup Flow**

```
Terminal 1: Ollama Server
$ ollama serve
→ Keeps running in background

Terminal 2: Backend
$ cd backend && npm run dev
→ Express server on :5000

Terminal 3: Frontend
$ cd frontend && npm start
→ React app on :3000

Browser: http://localhost:3000
→ Upload resume, see results
```

---

## **Troubleshooting**

### **"Connection refused" - Ollama not running**
```bash
# Make sure Ollama is running in another terminal
ollama serve
```

### **"Model not found" - Model not downloaded**
```bash
# Check which models you have
ollama list

# Download missing model
ollama pull mistral
```

### **Slow responses - Model choice**
- Switch to `neural-chat` in `.env`: `OLLAMA_MODEL=neural-chat`
- Or use mock mode for instant responses: `AI_MODE=mock`

### **Out of memory - Not enough RAM**
- Use smaller model: `neural-chat` (4GB)
- Close other apps to free RAM

---

## **Using Mock Mode (No LLM needed)**

If you just want to test the UI without any AI:

Edit `backend/.env`:
```env
AI_MODE=mock
```

This gives fake but realistic responses instantly.

---

## **Performance Tips**

### **Faster Responses**
- Use `neural-chat` model (fastest)
- Close other applications
- Use GPU acceleration (if available)

### **Better Quality**
- Use `mistral` or `llama2` (slower but smarter)

### **Development Workflow**
1. First test with `AI_MODE=mock` → UI works
2. Switch to Ollama for real testing
3. Switch to `CLAUDE_API_KEY` for production (if you have it)

---

## **What's Happening Behind the Scenes**

When you analyze a resume with Ollama:

1. **Frontend** → Uploads file to backend
2. **Backend** → Extracts text from file
3. **Backend** → Sends text to Ollama (local LLM)
4. **Ollama** → Analyzes and returns JSON
5. **Backend** → Returns results to frontend
6. **Frontend** → Displays results

All happens locally on your machine - no cloud!

---

## **Switching Between Modes**

Edit `backend/.env` to switch:

```env
# Option 1: Mock (instant, no AI)
AI_MODE=mock

# Option 2: Ollama (local LLM)
AI_MODE=ollama
OLLAMA_MODEL=mistral

# Option 3: Claude API (cloud, paid)
AI_MODE=claude
CLAUDE_API_KEY=sk-ant-...
```

No code changes needed - just restart backend!

---

## **Next Steps**

1. ✅ Install Ollama
2. ✅ Download model (`ollama pull mistral`)
3. ✅ Start Ollama server (`ollama serve`)
4. ✅ Configure `.env` file
5. ✅ Install backend & frontend
6. ✅ Run both servers
7. ✅ Upload resume and test!

Enjoy local, private, free resume analysis! 🎉
