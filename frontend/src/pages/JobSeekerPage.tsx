import React, { useRef } from "react";
import { useResumeStore } from "../services/store";
import FileUploader from "../components/FileUploader";
import ATSReport from "../components/ATSReport";
import KeywordAnalysis from "../components/KeywordAnalysis";
import resumeApi from "../services/api";

export const JobSeekerPage: React.FC = () => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
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
      setError("Please upload a resume");
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
      setError(err instanceof Error ? err.message : "Analysis failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-2">Resume Analyzer</h1>
        <p className="text-gray-600 mb-8">
          Optimize your resume for ATS systems and increase your chances of
          getting hired
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2 bg-white rounded-lg shadow-lg p-6">
            <FileUploader
              onFileSelect={setResumeFile}
              label="Upload Your Resume"
            />
            {resumeFile && (
              <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded">
                <p className="text-sm text-green-800">
                  ✓ File uploaded: {resumeFile.name}
                </p>
              </div>
            )}

            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Job Description (Optional)
              </label>
              <textarea
                ref={textareaRef}
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste the job description here to get keyword optimization tips..."
                className="w-full h-40 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <p className="text-xs text-gray-500 mt-1">
                Providing a job description will help identify missing keywords
                and skills
              </p>
            </div>

            <button
              onClick={handleAnalyze}
              disabled={!resumeFile || isLoading}
              className="mt-6 w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 rounded-lg transition-colors"
            >
              {isLoading ? "Analyzing..." : "Analyze Resume"}
            </button>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="font-semibold text-lg mb-4">How it Works</h3>
            <ol className="space-y-3 text-sm">
              <li className="flex">
                <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-blue-100 text-blue-800 text-xs font-bold mr-2 flex-shrink-0">
                  1
                </span>
                <span>Upload your resume (PDF, DOCX, or TXT)</span>
              </li>
              <li className="flex">
                <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-blue-100 text-blue-800 text-xs font-bold mr-2 flex-shrink-0">
                  2
                </span>
                <span>Paste job description (optional but recommended)</span>
              </li>
              <li className="flex">
                <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-blue-100 text-blue-800 text-xs font-bold mr-2 flex-shrink-0">
                  3
                </span>
                <span>Get instant feedback on ATS compatibility</span>
              </li>
              <li className="flex">
                <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-blue-100 text-blue-800 text-xs font-bold mr-2 flex-shrink-0">
                  4
                </span>
                <span>View keyword optimization suggestions</span>
              </li>
            </ol>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded mb-6">
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
                  analysisResults.analysis.keywordAnalysis.suggestions
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
