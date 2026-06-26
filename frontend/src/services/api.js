import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
});

// Mock responses for smooth UI dev if backend is down
const _mockAnalyzeSeeker = (file, jobDescription) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        atsScore: Math.floor(Math.random() * 40) + 60,
        keywordMatch: Math.floor(Math.random() * 50) + 50,
        missingKeywords: ['Kubernetes', 'GraphQL', 'AWS'],
        formattingScore: 85,
        suggestions: [
          'Add more quantifiable achievements in your recent role.',
          'Include the missing keywords to pass ATS filters.',
          'Consider moving the skills section closer to the top.'
        ],
        rawText: 'Extracted resume text simulation...',
      });
    }, 1500);
  });
};

const _mockBatchAnalyze = (files, jobDescription) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const results = Array.from(files).map((f, i) => ({
        filename: f.name,
        matchScore: Math.floor(Math.random() * 30) + 70,
        fitSummary: `Strong background in ${i % 2 === 0 ? 'frontend' : 'backend'} technologies.`,
        keySkills: ['React', 'Node.js', 'TypeScript', 'SQL'].slice(0, 2 + Math.floor(Math.random() * 3)),
        experienceYears: Math.floor(Math.random() * 10) + 1,
      })).sort((a, b) => b.matchScore - a.matchScore);
      
      resolve({ results });
    }, 2000);
  });
};

export const resumeApi = {
  // For Job Seekers
  analyzeForJobSeeker: async (file, jobDescription = '') => {
    try {
      const formData = new FormData();
      formData.append('resume', file);
      if (jobDescription) {
        formData.append('jobDescription', jobDescription);
      }
      const response = await api.post('/analyze/seeker', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return response.data;
    } catch (error) {
      console.warn("Backend unavailable, falling back to mock data");
      return _mockAnalyzeSeeker(file, jobDescription);
    }
  },

  // For Recruiters (Batch Analysis)
  batchAnalyzeResumes: async (files, jobDescription) => {
    try {
      const formData = new FormData();
      formData.append('jobDescription', jobDescription);
      Array.from(files).forEach((file) => {
        formData.append('resumes', file);
      });
      const response = await api.post('/analyze/batch', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return response.data;
    } catch (error) {
      console.warn("Backend unavailable, falling back to mock data");
      return _mockBatchAnalyze(files, jobDescription);
    }
  },
};
