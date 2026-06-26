import React, { useState } from 'react';
import { Briefcase, Users, BrainCircuit } from 'lucide-react';
import JobSeekerPortal from '../components/JobSeekerPortal';
import RecruiterPortal from '../components/RecruiterPortal';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('seeker');

  return (
    <div className="min-h-screen relative pt-32 pb-24 px-4 sm:px-6 lg:px-8">
      {/* Decorative Glow */}
      <div className="glow-bg" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-primary mb-6 text-sm font-medium">
            <BrainCircuit size={16} />
            AI-Powered Analysis Engine
          </div>
          <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-6 tracking-tight">
            Elevate Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">Career Trajectory</span>
          </h1>
          <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto">
            Leverage advanced semantic parsing to optimize your resume for ATS, or screen hundreds of candidates in seconds.
          </p>
        </div>

        <div className="flex justify-center mb-12 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-100">
          <div className="glass-panel p-1.5 rounded-2xl flex gap-2 w-full max-w-md relative">
            <button
              onClick={() => setActiveTab('seeker')}
              className={`flex-1 py-3.5 rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-2 relative z-10 ${
                activeTab === 'seeker'
                  ? 'text-white shadow-lg'
                  : 'text-white/50 hover:text-white hover:bg-white/5'
              }`}
            >
              <Briefcase size={16} /> Job Seeker
            </button>
            <button
              onClick={() => setActiveTab('recruiter')}
              className={`flex-1 py-3.5 rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-2 relative z-10 ${
                activeTab === 'recruiter'
                  ? 'text-white shadow-lg'
                  : 'text-white/50 hover:text-white hover:bg-white/5'
              }`}
            >
              <Users size={16} /> Recruiter
            </button>
            
            {/* Sliding Pill Background */}
            <div 
              className="absolute top-1.5 bottom-1.5 w-[calc(50%-6px)] bg-primary rounded-xl transition-all duration-300 ease-out z-0"
              style={{ left: activeTab === 'seeker' ? '6px' : 'calc(50%)' }}
            />
          </div>
        </div>

        <div className="transition-all duration-500">
          {activeTab === 'seeker' ? <JobSeekerPortal /> : <RecruiterPortal />}
        </div>
      </div>
    </div>
  );
}
