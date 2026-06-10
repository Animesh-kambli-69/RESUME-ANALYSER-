import React, { useRef } from 'react';
import { useResumeStore } from '../services/store';
import FileUploader from '../components/FileUploader';
import CandidateRanking from '../components/CandidateRanking';
import { resumeApi } from '../services/api';

const RecruiterPage = () => {
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

    if (!jobDescription) {
      setError('Please provide a job description');
      return;
    }

    try {
      setError(null);
      setIsLoading(true);
      const results = await resumeApi.analyzeForRecruiter(
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
        <h1 className="text-4xl font-extrabold mb-3 text-slate-800 tracking-tight">Candidate Analyzer</h1>
        <p className="text-slate-600 mb-8 text-lg">
          Streamline your hiring process with AI-powered candidate ranking and
          unbiased screening.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
            <FileUploader
              onFileSelect={setResumeFile}
              label="Upload Candidate Resume"
            />
            {resumeFile && (
              <div className="mt-6 p-4 bg-indigo-50 border border-indigo-100 rounded-xl flex items-center">
                <span className="text-indigo-500 mr-3 text-xl">✓</span>
                <p className="font-medium text-indigo-800">
                  Ready to analyze: {resumeFile.name}
                </p>
              </div>
            )}

            <div className="mt-8">
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Job Description <span className="text-red-500">*</span>
              </label>
              <textarea
                ref={textareaRef}
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste the job requirements and description..."
                className="w-full h-40 p-4 border border-slate-200 rounded-xl focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition-all text-slate-700 font-sans resize-none"
              />
              <p className="text-xs text-slate-500 mt-2 font-medium">Required for matching evaluation</p>
            </div>

            <button
              onClick={handleAnalyze}
              disabled={!resumeFile || !jobDescription || isLoading}
              className={`mt-8 w-full py-4 rounded-xl font-bold text-lg transition-all flex justify-center items-center ${
                isLoading || !resumeFile || !jobDescription
                  ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                  : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-200 hover:-translate-y-0.5'
              }`}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Analyzing Candidate...
                </>
              ) : (
                'Analyze Candidate'
              )}
            </button>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 h-fit">
            <h3 className="font-bold text-xl mb-6 text-slate-800">Recruiter Benefits</h3>
            <ul className="space-y-5 text-sm text-slate-600 font-medium">
              <li className="flex items-start">
                <span className="text-indigo-500 mr-3 text-lg">✨</span>
                <span className="mt-0.5">Automated candidate ranking</span>
              </li>
              <li className="flex items-start">
                <span className="text-indigo-500 mr-3 text-lg">✨</span>
                <span className="mt-0.5">Skills match scoring</span>
              </li>
              <li className="flex items-start">
                <span className="text-indigo-500 mr-3 text-lg">✨</span>
                <span className="mt-0.5">Experience gap analysis</span>
              </li>
              <li className="flex items-start">
                <span className="text-indigo-500 mr-3 text-lg">✨</span>
                <span className="mt-0.5">Bias-free evaluation</span>
              </li>
              <li className="flex items-start">
                <span className="text-indigo-500 mr-3 text-lg">✨</span>
                <span className="mt-0.5">Structured data extraction</span>
              </li>
            </ul>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-100 text-red-700 px-6 py-4 rounded-xl mb-8 flex items-center font-medium">
            <span className="mr-3 text-xl">⚠️</span>
            {error}
          </div>
        )}

        {analysisResults && analysisResults.ranking && (
          <div className="animate-in slide-in-from-bottom-8 duration-700">
            <CandidateRanking
              candidateName={analysisResults.candidateName}
              overallScore={analysisResults.ranking.overallScore}
              skills={analysisResults.ranking.skills}
              experience={analysisResults.ranking.experience}
              education={analysisResults.ranking.education}
              strengths={analysisResults.ranking.strengths}
              gaps={analysisResults.ranking.gaps}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default RecruiterPage;
