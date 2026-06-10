import React, { useRef } from 'react';
import { useResumeStore } from '../services/store';
import FileUploader from '../components/FileUploader';
import ATSReport from '../components/ATSReport';
import KeywordAnalysis from '../components/KeywordAnalysis';
import { resumeApi } from '../services/api';

const JobSeekerPage = () => {
  const textareaRef = useRef(null);
  const {
    resumeFile,
    jobDescription,
    analysisResults,
    isLoading,
    error,
    setResumeFile,
    setJobDescription,
    setAnalysisResults,
    setIsLoading,
    setError,
  } = useResumeStore();

  const handleAnalyze = async () => {
    if (!resumeFile) {
      setError('Please upload a resume');
      return;
    }

    try {
      setError(null);
      setIsLoading(true);
      const results = await resumeApi.analyzeForJobSeeker(
        resumeFile,
        jobDescription
      );
      setAnalysisResults(results);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Analysis failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 fade-in">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-extrabold mb-3 text-slate-800 tracking-tight">Resume Analyzer</h1>
        <p className="text-slate-600 mb-8 text-lg">
          Optimize your resume for ATS systems and increase your chances of
          getting hired.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
            <FileUploader
              onFileSelect={setResumeFile}
              label="Upload Your Resume"
            />
            {resumeFile && (
              <div className="mt-6 p-4 bg-emerald-50 border border-emerald-100 rounded-xl flex items-center">
                <span className="text-emerald-500 mr-3 text-xl">✓</span>
                <p className="font-medium text-emerald-800">
                  Ready to analyze: {resumeFile.name}
                </p>
              </div>
            )}

            <div className="mt-8">
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Job Description (Optional)
              </label>
              <textarea
                ref={textareaRef}
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste the job description here to get keyword optimization tips..."
                className="w-full h-40 p-4 border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all text-slate-700 font-sans resize-none"
              />
              <p className="text-xs text-slate-500 mt-2 font-medium">
                Providing a job description will help identify missing keywords
                and skills.
              </p>
            </div>

            <button
              onClick={handleAnalyze}
              disabled={!resumeFile || isLoading}
              className={`mt-8 w-full py-4 rounded-xl font-bold text-lg transition-all flex justify-center items-center ${
                isLoading || !resumeFile
                  ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-200 hover:-translate-y-0.5'
              }`}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Analyzing with Local AI...
                </>
              ) : (
                'Analyze Resume'
              )}
            </button>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 h-fit">
            <h3 className="font-bold text-xl mb-6 text-slate-800">How it Works</h3>
            <ol className="space-y-6 text-sm text-slate-600 font-medium">
              <li className="flex items-start">
                <span className="inline-flex items-center justify-center p-2 rounded-lg bg-blue-50 text-blue-600 font-bold mr-4">
                  1
                </span>
                <span className="mt-1">Upload your resume (PDF, DOCX, or TXT)</span>
              </li>
              <li className="flex items-start">
                <span className="inline-flex items-center justify-center p-2 rounded-lg bg-blue-50 text-blue-600 font-bold mr-4">
                  2
                </span>
                <span className="mt-1">Paste job description (optional but recommended)</span>
              </li>
              <li className="flex items-start">
                <span className="inline-flex items-center justify-center p-2 rounded-lg bg-blue-50 text-blue-600 font-bold mr-4">
                  3
                </span>
                <span className="mt-1">Get instant feedback on ATS compatibility</span>
              </li>
              <li className="flex items-start">
                <span className="inline-flex items-center justify-center p-2 rounded-lg bg-blue-50 text-blue-600 font-bold mr-4">
                  4
                </span>
                <span className="mt-1">View keyword optimization suggestions</span>
              </li>
            </ol>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-100 text-red-700 px-6 py-4 rounded-xl mb-8 flex items-center font-medium">
            <span className="mr-3 text-xl">⚠️</span>
            {error}
          </div>
        )}

        {analysisResults && analysisResults.analysis && (
          <>
            <ATSReport
              score={analysisResults.analysis.atsCompatibility.score}
              passesAts={analysisResults.analysis.atsCompatibility.passesAts}
              issues={analysisResults.analysis.atsCompatibility.issues}
              recommendations={
                analysisResults.analysis.recommendations || []
              }
            />

            {analysisResults.analysis.keywordAnalysis && (
              <KeywordAnalysis
                matchPercentage={
                  analysisResults.analysis.keywordAnalysis.matchPercentage
                }
                matchedKeywords={
                  analysisResults.analysis.keywordAnalysis.matchedKeywords
                }
                missingKeywords={
                  analysisResults.analysis.keywordAnalysis.missingKeywords
                }
                suggestions={
                  analysisResults.analysis.keywordAnalysis.suggestions || []
                }
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default JobSeekerPage;
