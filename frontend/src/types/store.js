/**
 * @typedef {Object} ResumeStore
 * @property {File|null} resumeFile
 * @property {string} jobDescription
 * @property {any} analysisResults
 * @property {boolean} isLoading
 * @property {string|null} error
 * @property {'job-seeker'|'recruiter'} userRole
 * @property {Function} setResumeFile
 * @property {Function} setJobDescription
 * @property {Function} setAnalysisResults
 * @property {Function} setIsLoading
 * @property {Function} setError
 * @property {Function} setUserRole
 * @property {Function} reset
 */

/**
 * @typedef {Object} AuthStore
 * @property {boolean} isAuthenticated
 * @property {any} user
 * @property {Function} login
 * @property {Function} logout
 * @property {Function} register
 */

export {};
