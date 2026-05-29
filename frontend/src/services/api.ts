import axios from "axios";
import type {
  ResumeData,
  AnalysisResult,
  KeywordAnalysis,
  AtsCompatibilityReport,
} from "../../shared/types";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

const apiClient = axios.create({
  baseURL: `${API_URL}/api`,
  timeout: parseInt(process.env.REACT_APP_API_TIMEOUT || "30000"),
});

export const resumeApi = {
  /**
   * Analyze resume for job seeker (ATS + Keywords)
   */
  analyzeForJobSeeker: async (
    file: File,
    jobDescription?: string
  ): Promise<AnalysisResult> => {
    const formData = new FormData();
    formData.append("resume", file);
    if (jobDescription) {
      formData.append("jobDescription", jobDescription);
    }

    const response = await apiClient.post(
      "/resume/analyze-job-seeker",
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    return response.data.data;
  },

  /**
   * Analyze resume for recruiter (Ranking + Bias Check)
   */
  analyzeForRecruiter: async (
    file: File,
    jobDescription: string,
    candidateName?: string
  ): Promise<any> => {
    const formData = new FormData();
    formData.append("resume", file);
    formData.append("jobDescription", jobDescription);
    if (candidateName) {
      formData.append("candidateName", candidateName);
    }

    const response = await apiClient.post(
      "/resume/analyze-recruiter",
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    return response.data.data;
  },

  /**
   * Extract resume data only
   */
  extractResume: async (file: File): Promise<ResumeData> => {
    const formData = new FormData();
    formData.append("resume", file);

    const response = await apiClient.post("/resume/extract", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data.data;
  },

  /**
   * Batch analyze multiple resumes
   */
  batchAnalyzeResumes: async (
    files: File[],
    jobDescription: string
  ): Promise<any> => {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append("resumes", file);
    });
    formData.append("jobDescription", jobDescription);

    const response = await apiClient.post(
      "/resume/batch-analyze",
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    return response.data.data;
  },

  /**
   * Check API health
   */
  checkHealth: async (): Promise<boolean> => {
    try {
      await apiClient.get("/health");
      return true;
    } catch {
      return false;
    }
  },
};

export default resumeApi;
