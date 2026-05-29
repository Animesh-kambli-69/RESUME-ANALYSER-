import create from "zustand";
import type { ResumeStore } from "../types/store";

export const useResumeStore = create<ResumeStore>((set) => ({
  resumeFile: null,
  jobDescription: "",
  analysisResults: null,
  isLoading: false,
  error: null,
  userRole: "job-seeker",

  setResumeFile: (file) => set({ resumeFile: file }),
  setJobDescription: (description) => set({ jobDescription: description }),
  setAnalysisResults: (results) => set({ analysisResults: results }),
  setIsLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
  setUserRole: (role) => set({ userRole: role }),

  reset: () =>
    set({
      resumeFile: null,
      jobDescription: "",
      analysisResults: null,
      isLoading: false,
      error: null,
    }),
}));
