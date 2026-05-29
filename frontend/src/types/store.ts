export interface ResumeStore {
  // State
  resumeFile: File | null;
  jobDescription: string;
  analysisResults: any;
  isLoading: boolean;
  error: string | null;
  userRole: "job-seeker" | "recruiter";

  // Actions
  setResumeFile: (file: File | null) => void;
  setJobDescription: (description: string) => void;
  setAnalysisResults: (results: any) => void;
  setIsLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setUserRole: (role: "job-seeker" | "recruiter") => void;
  reset: () => void;
}

export interface AuthStore {
  isAuthenticated: boolean;
  user: any;
  login: (credentials: any) => Promise<void>;
  logout: () => void;
  register: (userData: any) => Promise<void>;
}
