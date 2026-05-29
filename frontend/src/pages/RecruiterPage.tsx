import React, { useRef } from "react";
import { useResumeStore } from "../services/store";
import FileUploader from "../components/FileUploader";
import CandidateRanking from "../components/CandidateRanking";
import resumeApi from "../services/api";

export const RecruiterPage: React.FC = () => {
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

    if (!jobDescription) {
      setError("Please provide a job description");
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
      setError(err instanceof Error ? err.message : "Analysis failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-2">Candidate Analyzer</h1>
        <p className="text-gray-600 mb-8">
          Streamline your hiring process with AI-powered candidate ranking and
          unbiased screening
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2 bg-white rounded-lg shadow-lg p-6">
            <FileUploader
              onFileSelect={setResumeFile}
              label="Upload Candidate Resume"
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
                Job Description *
              </label>
              <textarea
                ref={textareaRef}
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste the job requirements and description..."
                className="w-full h-40 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <p className="text-xs text-gray-500 mt-1">Required</p>
            </div>

            <button
              onClick={handleAnalyze}
              disabled={!resumeFile || !jobDescription || isLoading}
              className="mt-6 w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 rounded-lg transition-colors"
            >
              {isLoading ? "Analyzing..." : "Analyze Candidate"}
            </button>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="font-semibold text-lg mb-4">Benefits</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">✓</span>
                <span>Automated candidate ranking</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">✓</span>
                <span>Skills match scoring</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">✓</span>
                <span>Experience gap analysis</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">✓</span>
                <span>Bias-free evaluation</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">✓</span>
                <span>Structured data extraction</span>
              </li>
            </ul>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        {analysisResults && analysisResults.ranking && (
          <CandidateRanking
            candidateName={analysisResults.candidateName}
            overallScore={analysisResults.ranking.overallScore}
            skills={analysisResults.ranking.skills}
            experience={analysisResults.ranking.experience}
            education={analysisResults.ranking.education}
            strengths={analysisResults.ranking.strengths}
            gaps={analysisResults.ranking.gaps}
          />
        )}
      </div>
    </div>
  );
};

export default RecruiterPage;
