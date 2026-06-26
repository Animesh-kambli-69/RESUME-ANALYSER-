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
    <div className="min-h-screen bg-[#070708] text-white">
      {currentPage !== 'home' && (
        <nav className="bg-[#0c0c0e] border-b border-zinc-900 sticky top-0 z-50 backdrop-blur-md bg-opacity-80">
          <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
            <button
              onClick={() => setCurrentPage('home')}
              className="text-2xl font-extrabold text-white flex items-center gap-2"
            >
              <svg className="w-6 h-6" viewBox="0 0 256 256" fill="#ffffff">
                <path d="M 256 256 L 128 256 L 0 128 L 128 128 Z M 256 128 L 128 128 L 0 0 L 128 0 Z" />
              </svg>
              <span className="font-playfair italic">Lithos</span>
            </button>
            <div className="space-x-2">
              <button
                onClick={() => setCurrentPage('home')}
                className="px-4 py-2 rounded-full font-medium text-zinc-300 hover:bg-zinc-900 hover:text-white transition-all text-sm"
              >
                Back to Home
              </button>
            </div>
          </div>
        </nav>
      )}
      <main className="animate-in fade-in duration-500">
        {renderPage()}
      </main>
    </div>
  );
}

export default App;
