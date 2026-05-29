import dotenv from "dotenv";

dotenv.config();

export const config = {
  server: {
    port: process.env.PORT || 5000,
    nodeEnv: process.env.NODE_ENV || "development",
  },
  claude: {
    apiKey: process.env.CLAUDE_API_KEY,
    model: process.env.CLAUDE_MODEL || "claude-3-5-sonnet-20241022",
  },
  upload: {
    maxFileSize: parseInt(process.env.MAX_FILE_SIZE || "10485760"),
    uploadDir: process.env.UPLOAD_DIR || "./uploads",
  },
  cors: {
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
  },
};

// Validate required environment variables
const requiredEnvVars = ["CLAUDE_API_KEY"];

for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    console.warn(`Warning: ${envVar} is not set in environment variables`);
  }
}
