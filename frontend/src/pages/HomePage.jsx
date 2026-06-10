import React from 'react';
import { useResumeStore } from '../services/store';

const HomePage = ({ onNavigate }) => {
  const { setUserRole } = useResumeStore();

  const handleSelectRole = (role) => {
    setUserRole(role);
    if (onNavigate) {
      onNavigate(role);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 gap-12 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16 mt-8">
          <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 mb-6 tracking-tight">
            Optimize Your Career with <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Local AI</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Select your role to get started with intelligent, private, and secure resume analysis powered by Ollama.
          </p>
        </div>

        {/* Role Selection Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Job Seeker Card */}
          <div
            onClick={() => handleSelectRole('job-seeker')}
            className="group bg-white rounded-2xl shadow-sm border border-slate-200 p-8 hover:shadow-xl hover:border-blue-300 transition-all cursor-pointer transform hover:-translate-y-1"
          >
            <div className="text-5xl mb-6 transform group-hover:scale-110 transition-transform">👨‍💼</div>
            <h3 className="text-2xl font-bold mb-3 text-slate-800">Job Seeker</h3>
            <p className="text-slate-600 mb-8 leading-relaxed">
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

            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3.5 rounded-xl shadow-md shadow-blue-200 transition-all">
              Start Optimizing
            </button>
          </div>

          {/* Recruiter Card */}
          <div
            onClick={() => handleSelectRole('recruiter')}
            className="group bg-white rounded-2xl shadow-sm border border-slate-200 p-8 hover:shadow-xl hover:border-indigo-300 transition-all cursor-pointer transform hover:-translate-y-1"
          >
            <div className="text-5xl mb-6 transform group-hover:scale-110 transition-transform">👔</div>
            <h3 className="text-2xl font-bold mb-3 text-slate-800">Recruiter</h3>
            <p className="text-slate-600 mb-8 leading-relaxed">
              Screen candidates efficiently with unbiased, objective evaluation
            </p>

            <ul className="space-y-4 mb-8 text-slate-600">
              <li className="flex items-center">
                <span className="text-indigo-500 mr-3 text-xl">✓</span>
                <span>Automated Candidate Ranking</span>
              </li>
              <li className="flex items-center">
                <span className="text-indigo-500 mr-3 text-xl">✓</span>
                <span>Structured Data Extraction</span>
              </li>
              <li className="flex items-center">
                <span className="text-indigo-500 mr-3 text-xl">✓</span>
                <span>Bias Reduction & Standardization</span>
              </li>
              <li className="flex items-center text-slate-400">
                <span className="mr-3 text-xl opacity-50">✓</span>
                <span>Batch Processing (Coming Soon)</span>
              </li>
            </ul>

            <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3.5 rounded-xl shadow-md shadow-indigo-200 transition-all">
              Start Screening
            </button>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-16 bg-white/60 backdrop-blur-sm rounded-2xl border border-slate-100 shadow-xl p-12">
          <h2 className="text-3xl font-extrabold mb-8 text-center text-slate-800">
            Powered by Local AI
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-white rounded-xl shadow-sm border border-slate-50">
              <div className="text-4xl mb-4">🤖</div>
              <h4 className="font-bold text-lg mb-2 text-slate-800">Ollama API</h4>
              <p className="text-slate-600">
                100% local, private, and fast AI models analyzing your documents.
              </p>
            </div>
            <div className="text-center p-6 bg-white rounded-xl shadow-sm border border-slate-50">
              <div className="text-4xl mb-4">📊</div>
              <h4 className="font-bold text-lg mb-2 text-slate-800">Smart Matching</h4>
              <p className="text-slate-600">
                Intelligent keyword extraction and relevance scoring.
              </p>
            </div>
            <div className="text-center p-6 bg-white rounded-xl shadow-sm border border-slate-50">
              <div className="text-4xl mb-4">🛡️</div>
              <h4 className="font-bold text-lg mb-2 text-slate-800">Unbiased & Secure</h4>
              <p className="text-slate-600">
                Standardized assessment running safely on your own machine.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="tex-center py-8 mt-16 border-t border-slate-200 bg-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-slate-500 font-medium">
            © {new Date().getFullYear()} ResumeAI. Powered by Local Models.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
