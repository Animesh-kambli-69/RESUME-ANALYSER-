import React from "react";
import { useResumeStore } from "../services/store";

export const HomePage: React.FC = () => {
  const { setUserRole } = useResumeStore();

  const handleSelectRole = (role: "job-seeker" | "recruiter") => {
    setUserRole(role);
    // Navigation would happen here in a full app
    window.location.href = role === "job-seeker" ? "/job-seeker" : "/recruiter";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900">
            📄 Resume Analyzer
          </h1>
          <p className="text-gray-600">
            Powered by AI - Optimized for Success
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Choose Your Path
          </h2>
          <p className="text-xl text-gray-600">
            Select your role to get started with intelligent resume analysis
          </p>
        </div>

        {/* Role Selection Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Job Seeker Card */}
          <div
            onClick={() => handleSelectRole("job-seeker")}
            className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow cursor-pointer"
          >
            <div className="text-5xl mb-4">👨‍💼</div>
            <h3 className="text-2xl font-bold mb-3">Job Seeker</h3>
            <p className="text-gray-600 mb-6">
              Optimize your resume to pass ATS systems and land more interviews
            </p>

            <ul className="space-y-3 mb-8">
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                <span>ATS Compatibility Check</span>
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                <span>Keyword Optimization</span>
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                <span>Match Against Job Description</span>
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                <span>Actionable Recommendations</span>
              </li>
            </ul>

            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors">
              Start Optimizing
            </button>
          </div>

          {/* Recruiter Card */}
          <div
            onClick={() => handleSelectRole("recruiter")}
            className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow cursor-pointer"
          >
            <div className="text-5xl mb-4">👔</div>
            <h3 className="text-2xl font-bold mb-3">Recruiter</h3>
            <p className="text-gray-600 mb-6">
              Screen candidates efficiently with unbiased, objective evaluation
            </p>

            <ul className="space-y-3 mb-8">
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                <span>Automated Candidate Ranking</span>
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                <span>Structured Data Extraction</span>
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                <span>Bias Reduction & Standardization</span>
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                <span>Batch Processing (Coming Soon)</span>
              </li>
            </ul>

            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors">
              Start Screening
            </button>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-16 bg-white rounded-lg shadow-lg p-12">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Powered by AI
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-3">🤖</div>
              <h4 className="font-semibold text-lg mb-2">Claude AI</h4>
              <p className="text-gray-600">
                Advanced AI model for accurate document parsing and analysis
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-3">📊</div>
              <h4 className="font-semibold text-lg mb-2">Smart Matching</h4>
              <p className="text-gray-600">
                Intelligent keyword extraction and relevance scoring
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-3">⚖️</div>
              <h4 className="font-semibold text-lg mb-2">Unbiased Evaluation</h4>
              <p className="text-gray-600">
                Objective, standardized assessment for fair hiring
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-400">
            © 2024 Resume Analyzer. Powered by Claude AI.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
