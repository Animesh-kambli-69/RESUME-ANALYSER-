import React from 'react';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 glass-panel border-x-0 border-t-0 border-b border-white/5 bg-background/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
              <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                <polyline points="3.29 7 12 12 20.71 7"></polyline>
                <line x1="12" y1="22" x2="12" y2="12"></line>
              </svg>
            </div>
            <span className="text-2xl font-display font-bold tracking-tight text-white">
              Resume<span className="text-primary">AI</span>
            </span>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-white/70">
            <a href="#" className="hover:text-white transition-colors">Features</a>
            <a href="#" className="hover:text-white transition-colors">Pricing</a>
            <a href="#" className="hover:text-white transition-colors">API</a>
            <button className="bg-white text-black px-5 py-2.5 rounded-full hover:bg-white/90 hover-lift transition-all font-semibold">
              Get Started
            </button>
          </div>
        </div>
      </nav>

      <main>
        <Dashboard />
      </main>
      
      <footer className="border-t border-white/10 mt-auto py-12 px-6">
        <div className="max-w-7xl mx-auto text-center text-sm text-white/40">
          <p>© 2026 ResumeAI Engine. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}

export default App;
