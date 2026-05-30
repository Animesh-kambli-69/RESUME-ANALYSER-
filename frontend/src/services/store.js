import create from 'zustand';

export const useResumeStore = create((set) => ({
  resumeFile: null,
  jobDescription: '',
  analysisResults: null,
  isLoading: false,
  error: null,
  userRole: 'job-seeker',

  setResumeFile: (file) => set({ resumeFile: file }),
  setJobDescription: (description) => set({ jobDescription: description }),
  setAnalysisResults: (results) => set({ analysisResults: results }),
  setIsLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
  setUserRole: (role) => set({ userRole: role }),

  reset: () =>
    set({
      resumeFile: null,
      jobDescription: '',
      analysisResults: null,
      isLoading: false,
      error: null,
    }),
}));
