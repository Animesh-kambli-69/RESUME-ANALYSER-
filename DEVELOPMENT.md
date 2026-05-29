# Development & Customization Guide

## Table of Contents
1. [Development Setup](#development-setup)
2. [Adding New Features](#adding-new-features)
3. [Customizing AI Analysis](#customizing-ai-analysis)
4. [Frontend Customization](#frontend-customization)
5. [Backend Customization](#backend-customization)
6. [Testing Guide](#testing-guide)
7. [Deployment Guide](#deployment-guide)

---

## Development Setup

### IDE Setup

**Recommended: VS Code**

**Essential Extensions:**
```
- ES7+ React/Redux/React-Native snippets
- Prettier - Code formatter
- ESLint
- REST Client
- MongoDB for VS Code
- Thunder Client (API testing)
```

**VS Code Settings:**
```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```

### Environment Setup

**Install Git Hooks (Optional):**
```bash
# Install husky for pre-commit hooks
npm install husky --save-dev
npx husky install

# Add pre-commit hook
npx husky add .husky/pre-commit "npm run lint"
```

---

## Adding New Features

### Backend: Add New AI Analysis

**Example: Add Resume Quality Score**

1. **Add to ResumeAIService:**

```typescript
// backend/src/services/ResumeAIService.ts

async analyzeResumeQuality(resumeText: string) {
  const message = await client.messages.create({
    model: this.model,
    max_tokens: 1000,
    messages: [
      {
        role: "user",
        content: `Analyze the quality of this resume on a scale of 0-100. Return JSON:
{
  "qualityScore": number,
  "strengths": [string],
  "improvements": [string]
}

Resume:
${resumeText}

Return ONLY valid JSON.`,
      },
    ],
  });

  return JSON.parse(
    message.content[0].type === "text" ? message.content[0].text : ""
  );
}
```

2. **Add Controller Method:**

```typescript
// backend/src/controllers/ResumeController.ts

static async analyzeQuality(req: Request, res: Response) {
  try {
    const file = req.file;
    if (!file) return res.status(400).json({ error: "No file" });

    const resumeText = await fileProcessingService.extractText(file.path);
    const qualityAnalysis = await resumeAIService.analyzeResumeQuality(resumeText);

    fileProcessingService.cleanupFile(file.path);
    res.json({ success: true, data: qualityAnalysis });
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : "Error" });
  }
}
```

3. **Add Route:**

```typescript
// backend/src/routes/resume.routes.ts

router.post("/quality", upload.single("resume"), ResumeController.analyzeQuality);
```

4. **Update Frontend API Client:**

```typescript
// frontend/src/services/api.ts

analyzeQuality: async (file: File) => {
  const formData = new FormData();
  formData.append("resume", file);
  const response = await apiClient.post("/resume/quality", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data.data;
}
```

### Frontend: Add New Page

**Example: Add Results History Page**

1. **Create New Page Component:**

```typescript
// frontend/src/pages/HistoryPage.tsx

import React from "react";
import { useResumeStore } from "../services/store";

export const HistoryPage: React.FC = () => {
  const [history, setHistory] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    // Load history from localStorage or API
    const saved = localStorage.getItem("analysisHistory");
    setHistory(saved ? JSON.parse(saved) : []);
    setLoading(false);
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Analysis History</h1>
      {/* Display history items */}
      {history.length === 0 ? (
        <p>No analyses yet</p>
      ) : (
        <div className="space-y-4">
          {history.map((item, i) => (
            <div key={i} className="bg-white p-4 rounded shadow">
              <div className="flex justify-between">
                <span>{item.fileName}</span>
                <span>{new Date(item.date).toLocaleDateString()}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HistoryPage;
```

2. **Update App.tsx:**

```typescript
// frontend/src/App.tsx - Add import and route
import HistoryPage from "./pages/HistoryPage";

// In button rendering:
{
  currentPage === "history" && <HistoryPage />
}
```

---

## Customizing AI Analysis

### Modify Analysis Prompts

**Location:** `backend/src/services/ResumeAIService.ts`

**Change ATS Prompt:**
```typescript
// Add stricter ATS checking
const message = await client.messages.create({
  model: this.model,
  max_tokens: 1500,
  messages: [
    {
      role: "user",
      content: `Perform STRICT ATS compatibility analysis. Resume must:
1. Use single column layout
2. Have standard fonts (Arial, Times, Calibri)
3. No tables or graphics
4. No special formatting or colors

Return JSON with:
- score: 0-100
- passesStrict: boolean
- issues: [{severity, title, fix}]

${resumeText}

Return ONLY valid JSON.`,
    },
  ],
});
```

### Adjust Scoring Weights

**In CandidateRanking:**
```typescript
// Modify the prompt to adjust weights
const rankingPrompt = `
Calculate score as:
- Skills match: 40% weight
- Experience: 35% weight
- Education: 20% weight
- Certifications: 5% weight

...rest of prompt
`;
```

### Add Custom Analysis

**Example: Add Culture Fit Analysis**

```typescript
async analyzeCultureFit(resumeText: string, jobDescription: string, companyValues: string[]) {
  const message = await client.messages.create({
    model: this.model,
    max_tokens: 1000,
    messages: [
      {
        role: "user",
        content: `Analyze culture fit based on:
Company Values: ${companyValues.join(", ")}

Job Description: ${jobDescription}

Resume: ${resumeText}

Return JSON with cultureScore and reasoning.`,
      },
    ],
  });
  return JSON.parse(...);
}
```

---

## Frontend Customization

### Change Theme Colors

**Edit Tailwind Config:**
```typescript
// frontend/tailwind.config.js

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#1e40af",     // Blue
        secondary: "#dc2626",   // Red
        accent: "#059669",      // Green
        brand: "#f59e0b",       // Amber
      },
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
        serif: ["Playfair Display", "serif"],
      },
    },
  },
  plugins: [],
};
```

**Update Component:**
```typescript
// Use custom color
<div className="bg-primary text-white">Primary Color</div>
<div className="bg-secondary">Secondary Color</div>
```

### Add Dark Mode

**Update tailwind.config.js:**
```typescript
export default {
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        dark: {
          bg: "#0f172a",
          text: "#f1f5f9",
        },
      },
    },
  },
};
```

**Create Dark Mode Hook:**
```typescript
// frontend/src/hooks/useDarkMode.ts

export const useDarkMode = () => {
  const [isDark, setIsDark] = React.useState(false);

  React.useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  return { isDark, setIsDark };
};
```

### Add New Component

**Create Component:**
```typescript
// frontend/src/components/ResumeFeedback.tsx

import React from "react";

interface ResumeFeedbackProps {
  title: string;
  score: number;
  feedback: string[];
}

export const ResumeFeedback: React.FC<ResumeFeedbackProps> = ({
  title,
  score,
  feedback,
}) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
        <div
          className="bg-green-600 h-2 rounded-full"
          style={{ width: `${score}%` }}
        />
      </div>
      <ul className="space-y-2">
        {feedback.map((item, i) => (
          <li key={i} className="flex items-start">
            <span className="mr-2">•</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
```

---

## Backend Customization

### Add Database Models

**Create Model:**
```typescript
// backend/src/models/Resume.ts

import mongoose from "mongoose";

const ResumeSchema = new mongoose.Schema({
  userId: String,
  fileName: String,
  rawText: String,
  parsedData: mongoose.Schema.Types.Mixed,
  analysis: mongoose.Schema.Types.Mixed,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const Resume = mongoose.model("Resume", ResumeSchema);
```

### Add Authentication

**Create Auth Controller:**
```typescript
// backend/src/controllers/AuthController.ts

import jwt from "jsonwebtoken";

export class AuthController {
  static login(req: Request, res: Response) {
    const { email, password } = req.body;
    
    // Validate credentials
    const token = jwt.sign({ email }, process.env.JWT_SECRET!, {
      expiresIn: process.env.JWT_EXPIRY,
    });
    
    res.json({ success: true, token });
  }

  static logout(req: Request, res: Response) {
    res.json({ success: true, message: "Logged out" });
  }
}
```

### Add Middleware

**Create Auth Middleware:**
```typescript
// backend/src/middleware/auth.ts

import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];
  
  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    (req as any).user = decoded;
    next();
  } catch {
    res.status(401).json({ error: "Invalid token" });
  }
};
```

**Apply Middleware:**
```typescript
// backend/src/index.ts

app.use("/api/protected", authMiddleware);
```

---

## Testing Guide

### Backend Testing

**Create Test File:**
```typescript
// backend/src/__tests__/ResumeAIService.test.ts

import { ResumeAIService } from "../services/ResumeAIService";

describe("ResumeAIService", () => {
  const service = new ResumeAIService();

  test("should parse resume correctly", async () => {
    const sampleResume = `
      John Doe
      john@example.com
      Senior Software Engineer
      Experience: Python, React, Node.js
    `;
    
    const result = await service.parseResume(sampleResume);
    expect(result.contactInfo.fullName).toBe("John Doe");
  });

  test("should analyze ATS compatibility", async () => {
    const resumeText = "Sample resume text";
    const result = await service.analyzeAtsCompatibility(resumeText);
    expect(result.score).toBeGreaterThanOrEqual(0);
    expect(result.score).toBeLessThanOrEqual(100);
  });
});
```

**Run Tests:**
```bash
npm test
```

### Frontend Testing

**Create Test File:**
```typescript
// frontend/src/__tests__/FileUploader.test.tsx

import React from "react";
import { render, screen } from "@testing-library/react";
import FileUploader from "../components/FileUploader";

test("renders file uploader", () => {
  const mockHandler = jest.fn();
  render(<FileUploader onFileSelect={mockHandler} />);
  expect(screen.getByText(/Click to upload/i)).toBeInTheDocument();
});
```

---

## Deployment Guide

### Production Environment

**Backend .env (Production):**
```env
NODE_ENV=production
PORT=5000
CLAUDE_API_KEY=sk-ant-...
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/resume-analyzer
JWT_SECRET=very-strong-secret-key
FRONTEND_URL=https://yourdomain.com
```

### Docker Deployment

**Build Images:**
```bash
docker-compose build
```

**Push to Registry:**
```bash
docker tag resume-analyzer-backend:latest myregistry/backend:1.0.0
docker push myregistry/backend:1.0.0
```

### Cloud Deployment (AWS Example)

**Deploy with ECS:**
```bash
# Create cluster
aws ecs create-cluster --cluster-name resume-analyzer

# Register task definition
aws ecs register-task-definition --cli-input-json file://task-definition.json

# Create service
aws ecs create-service --cluster resume-analyzer --service-name backend --task-definition backend:1 --desired-count 1
```

---

## Best Practices

### Code Quality

1. **TypeScript**
   - Use strict mode
   - Define all types
   - Avoid `any` type

2. **React**
   - Use functional components
   - Memoize expensive computations
   - Lazy load components

3. **Node.js**
   - Use async/await
   - Handle all promises
   - Use environment variables

### Performance

1. **Frontend**
   - Lazy load routes
   - Optimize images
   - Minimize bundle size

2. **Backend**
   - Use caching
   - Connection pooling
   - Rate limiting

### Security

1. **Always**
   - Validate input
   - Sanitize output
   - Use HTTPS
   - Rotate secrets

2. **Never**
   - Hardcode secrets
   - Log sensitive data
   - Trust user input
   - Expose stack traces

---

**Happy Developing! 🚀**
