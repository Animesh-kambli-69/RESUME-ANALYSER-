import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { ResumeController } from '../controllers/ResumeController.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, '../../uploads');
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  fileFilter: (req, file, cb) => {
    const allowedMimes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'text/plain',
    ];
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only PDF, DOCX, and TXT are allowed.'));
    }
  },
});

// Routes for Job Seeker
router.post(
  '/analyze-job-seeker',
  upload.single('resume'),
  ResumeController.analyzeForJobSeeker
);

// Routes for Recruiter
router.post(
  '/analyze-recruiter',
  upload.single('resume'),
  ResumeController.analyzeForRecruiter
);

// Extract resume data only
router.post(
  '/extract',
  upload.single('resume'),
  ResumeController.extractResume
);

// Batch analyze multiple resumes
router.post(
  '/batch-analyze',
  upload.array('resumes', 10),
  ResumeController.batchAnalyzeResumes
);

export default router;
