import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const apiClient = axios.create({
  baseURL: `${API_URL}/api`,
  timeout: parseInt(process.env.REACT_APP_API_TIMEOUT || '30000'),
});

export const resumeApi = {
  /**
   * Analyze resume for job seeker (ATS + Keywords)
   */
  analyzeForJobSeeker: async (file, jobDescription) => {
    const formData = new FormData();
    formData.append('resume', file);
    if (jobDescription) {
      formData.append('jobDescription', jobDescription);
    }

    const response = await apiClient.post(
      '/resume/analyze-job-seeker',
      formData,
      {
        headers: { 'Content-Type': 'multipart/form-data' },
      }
    );
    return response.data.data;
  },

  /**
   * Analyze resume for recruiter (Ranking + Bias Check)
   */
  analyzeForRecruiter: async (file, jobDescription, candidateName) => {
    const formData = new FormData();
    formData.append('resume', file);
    formData.append('jobDescription', jobDescription);
    if (candidateName) {
      formData.append('candidateName', candidateName);
    }

    const response = await apiClient.post(
      '/resume/analyze-recruiter',
      formData,
      {
        headers: { 'Content-Type': 'multipart/form-data' },
      }
    );
    return response.data.data;
  },

  /**
   * Extract resume data only
   */
  extractResume: async (file) => {
    const formData = new FormData();
    formData.append('resume', file);

    const response = await apiClient.post('/resume/extract', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data.data;
  },

  /**
   * Batch analyze multiple resumes
   */
  batchAnalyzeResumes: async (files, jobDescription) => {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append('resumes', file);
    });
    formData.append('jobDescription', jobDescription);

    const response = await apiClient.post(
      '/resume/batch-analyze',
      formData,
      {
        headers: { 'Content-Type': 'multipart/form-data' },
      }
    );
    return response.data.data;
  },
};

export default resumeApi;
