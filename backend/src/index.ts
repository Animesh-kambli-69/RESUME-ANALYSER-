import express from "express";
import cors from "cors";
import path from "path";
import fs from "fs";
import { config } from "./config";
import resumeRoutes from "./routes/resume.routes";

const app = express();
const PORT = config.server.port;

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Middleware
app.use(cors(config.cors));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
  });
});

// API Routes
app.use("/api/resume", resumeRoutes);

// Error handling middleware
app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error("Error:", err);
    res.status(err.status || 500).json({
      error: err.message || "Internal Server Error",
    });
  }
);

// Start server
app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════╗
║     Resume Analyzer Backend Running    ║
║     Port: ${PORT}                          ║
║     Environment: ${config.server.nodeEnv}         ║
╚════════════════════════════════════════╝
  `);
});

export default app;
