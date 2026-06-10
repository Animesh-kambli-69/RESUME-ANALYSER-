import React from 'react';
import HomePage from './pages/HomePage';
import JobSeekerPage from './pages/JobSeekerPage';
import RecruiterPage from './pages/RecruiterPage';

function App() {
  const [currentPage, setCurrentPage] = React.useState('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'job-seeker':
        return <JobSeekerPage />;
      case 'recruiter':
        return <RecruiterPage />;
      case 'home':
      default:
        return <HomePage onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-200 shadow-sm transition-all">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <button
            onClick={() => setCurrentPage('home')}
            className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 hover:opacity-80 transition-opacity"
          >
            📄 ResumeAI
          </button>
          <div className="space-x-2">
            <button
              onClick={() => setCurrentPage('home')}
              className={`px-4 py-2 rounded-full font-medium transition-all ${
                currentPage === 'home'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-200'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => setCurrentPage('job-seeker')}
              className={`px-4 py-2 rounded-full font-medium transition-all ${
                currentPage === 'job-seeker'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-200'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              Job Seekers
            </button>
            <button
              onClick={() => setCurrentPage('recruiter')}
              className={`px-4 py-2 rounded-full font-medium transition-all ${
                currentPage === 'recruiter'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              Recruiters
            </button>
          </div>
        </div>
      </nav>
      <main className="animate-in fade-in duration-500">
        {renderPage()}
      </main>
    </div>
  );
}

export default App;
