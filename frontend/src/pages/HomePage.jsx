import React, { useState, useEffect, useRef } from 'react';
import RevealLayer from '../components/RevealLayer';
import { resumeApi } from '../services/api';
import {
  UploadCloud,
  FileText,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  Trash2,
  Users,
  Briefcase,
  Loader2,
  Menu,
  X,
  Layers,
  Map,
  Award,
  Search,
  Check,
  AlertCircle
} from 'lucide-react';

const BG_IMAGE_1 =
  "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260609_195923_b0ba8ace-1d1d-4f2c-9a28-1ab84b330680.png&w=1280&q=85";
const BG_IMAGE_2 =
  "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260609_201152_bba90a12-bf12-459f-91f0-51f237dbaf3b.png&w=1280&q=85";

const SPOTLIGHT_R = 260;

export default function HomePage() {
  // Navigation & Hero States
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: -999, y: -999 });
  const mouse = useRef({ x: -999, y: -999 });
  const smooth = useRef({ x: -999, y: -999 });
  const rafRef = useRef(null);

  // Ingestion Dashboard States
  const [activeTab, setActiveTab] = useState('job-seeker'); // 'job-seeker' | 'recruiter'
  
  // Job Seeker States
  const [seekerFile, setSeekerFile] = useState(null);
  const [seekerJobDescription, setSeekerJobDescription] = useState('');
  const [seekerLoading, setSeekerLoading] = useState(false);
  const [seekerResult, setSeekerResult] = useState(null);
  const [seekerError, setSeekerError] = useState(null);

  // Recruiter States
  const [recruiterFiles, setRecruiterFiles] = useState([]);
  const [recruiterJobDescription, setRecruiterJobDescription] = useState('');
  const [recruiterLoading, setRecruiterLoading] = useState(false);
  const [recruiterResult, setRecruiterResult] = useState(null);
  const [recruiterError, setRecruiterError] = useState(null);
  const [expandedCandidate, setExpandedCandidate] = useState(null); // index or null

  // Mouse Spotlight Tracking (Lerped)
  useEffect(() => {
    const handleMouseMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('mousemove', handleMouseMove);

    const updateSpotlight = () => {
      if (mouse.current.x !== -999 && mouse.current.y !== -999) {
        if (smooth.current.x === -999 && smooth.current.y === -999) {
          smooth.current = { x: mouse.current.x, y: mouse.current.y };
        } else {
          smooth.current.x += (mouse.current.x - smooth.current.x) * 0.1;
          smooth.current.y += (mouse.current.y - smooth.current.y) * 0.1;
        }
        setCursorPos({ x: smooth.current.x, y: smooth.current.y });
      }
      rafRef.current = requestAnimationFrame(updateSpotlight);
    };

    rafRef.current = requestAnimationFrame(updateSpotlight);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const handleStartDigging = () => {
    document.getElementById('digging-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  // Job Seeker Ingestion
  const handleSeekerUpload = async (e) => {
    e.preventDefault();
    if (!seekerFile) {
      setSeekerError('Please select a resume file first.');
      return;
    }
    setSeekerLoading(true);
    setSeekerError(null);
    setSeekerResult(null);

    try {
      const data = await resumeApi.analyzeForJobSeeker(seekerFile, seekerJobDescription);
      setSeekerResult(data);
    } catch (err) {
      console.error(err);
      setSeekerError(err.response?.data?.error || err.message || 'Failed to analyze resume');
    } finally {
      setSeekerLoading(false);
    }
  };

  // Recruiter Batch Ingestion
  const handleRecruiterUpload = async (e) => {
    e.preventDefault();
    if (recruiterFiles.length === 0) {
      setRecruiterError('Please add at least one resume file.');
      return;
    }
    if (!recruiterJobDescription.trim()) {
      setRecruiterError('Job description is required for screening candidate fit.');
      return;
    }
    setRecruiterLoading(true);
    setRecruiterError(null);
    setRecruiterResult(null);

    try {
      const data = await resumeApi.batchAnalyzeResumes(recruiterFiles, recruiterJobDescription);
      setRecruiterResult(data);
    } catch (err) {
      console.error(err);
      setRecruiterError(err.response?.data?.error || err.message || 'Failed to screen resumes');
    } finally {
      setRecruiterLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#070708] tracking-[-0.02em] text-white" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between p-4 sm:p-5 transition-all bg-gradient-to-b from-black/80 to-transparent backdrop-blur-sm md:backdrop-blur-none md:bg-transparent">
        {/* Left wordmark */}
        <div className="flex items-center gap-2.5 z-50">
          <svg className="w-6.5 h-6.5" viewBox="0 0 256 256" fill="#ffffff">
            <path d="M 256 256 L 128 256 L 0 128 L 128 128 Z M 256 128 L 128 128 L 0 0 L 128 0 Z" />
          </svg>
          <span className="text-white text-2xl font-playfair italic select-none">Lithos</span>
        </div>

        {/* Center pill */}
        <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-lg border border-white/20 rounded-full px-2 py-2 items-center gap-1">
          <button className="text-white bg-white/20 px-4 py-1.5 rounded-full text-sm font-medium transition-all shadow-sm">
            Course
          </button>
          {['Field Guides', 'Geology', 'Plans', 'Live Tour'].map((item) => (
            <button
              key={item}
              className="text-white/80 hover:bg-white/10 hover:text-white px-4 py-1.5 rounded-full text-sm font-medium transition-colors"
            >
              {item}
            </button>
          ))}
        </div>

        {/* Right Desktop Button */}
        <div className="hidden md:block">
          <button className="bg-white text-zinc-900 text-sm font-semibold px-6 py-2.5 rounded-full hover:bg-zinc-200 active:scale-95 transition-all shadow-md">
            Sign Up
          </button>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-white hover:text-[#e8702a] transition-colors p-1 z-50"
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-[#0c0c0e] border-b border-zinc-800 p-6 flex flex-col gap-4 animate-in fade-in slide-in-from-top duration-300 md:hidden shadow-2xl">
            {['Course', 'Field Guides', 'Geology', 'Plans', 'Live Tour'].map((item) => (
              <button
                key={item}
                onClick={() => setMobileMenuOpen(false)}
                className="text-left text-zinc-300 hover:text-white text-lg py-2 border-b border-zinc-900 font-medium"
              >
                {item}
              </button>
            ))}
            <button className="bg-[#e8702a] hover:bg-[#d2611f] text-white py-3 rounded-xl font-semibold text-center mt-2 shadow-lg shadow-[#e8702a]/20">
              Sign Up
            </button>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative w-full overflow-hidden h-screen bg-black" style={{ height: '100dvh' }}>
        {/* Base Image Layer */}
        <div
          className="absolute inset-0 bg-center bg-cover bg-no-repeat z-10 hero-zoom"
          style={{ backgroundImage: `url(${BG_IMAGE_1})` }}
        />

        {/* Reveal Spotlight Layer */}
        <RevealLayer image={BG_IMAGE_2} cursorX={cursorPos.x} cursorY={cursorPos.y} />

        {/* Hero Content */}
        {/* Heading */}
        <div className="absolute top-[14%] left-0 right-0 flex flex-col items-center text-center px-5 pointer-events-none z-50">
          <h1 className="text-white leading-[0.95] flex flex-col items-center">
            <span
              className="block font-playfair italic font-normal text-5xl sm:text-7xl md:text-8xl hero-anim hero-reveal"
              style={{ letterSpacing: '-0.05em', animationDelay: '0.25s' }}
            >
              Layers hold
            </span>
            <span
              className="block font-normal text-5xl sm:text-7xl md:text-8xl -mt-1 hero-anim hero-reveal"
              style={{ letterSpacing: '-0.08em', animationDelay: '0.42s' }}
            >
              tales of time
            </span>
          </h1>
        </div>

        {/* Bottom-left paragraph */}
        <div
          className="hidden sm:block absolute bottom-14 left-10 md:left-14 max-w-[260px] hero-anim hero-fade z-50"
          style={{ animationDelay: '0.7s' }}
        >
          <p className="text-sm text-white/80 leading-relaxed font-light drop-shadow-md">
            Every layer of sediment records a chapter of our planet, from ancient seabeds to drifting ash, layered across millions of years beneath us.
          </p>
        </div>

        {/* Bottom-right block */}
        <div
          className="absolute bottom-10 sm:bottom-24 left-5 right-5 sm:left-auto sm:right-10 md:right-14 max-w-full sm:max-w-[260px] flex flex-col items-start gap-4 sm:gap-5 hero-anim hero-fade z-50"
          style={{ animationDelay: '0.85s' }}
        >
          <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-light drop-shadow-md">
            Our interactive maps let you peel back the crust to trace how stones, fossils, and deep time combine to shape the ground beneath your feet.
          </p>
          <button
            onClick={handleStartDigging}
            className="bg-[#e8702a] hover:bg-[#d2611f] text-white text-sm font-medium px-7 py-3.5 rounded-full transition-all hover:scale-[1.03] active:scale-95 hover:shadow-lg hover:shadow-[#e8702a]/30 shadow-md shadow-[#e8702a]/10"
          >
            Start Digging
          </button>
        </div>
      </section>

      {/* Core Ingestion Engine Section */}
      <section id="digging-section" className="relative bg-[#0d0e11] py-24 px-4 sm:px-6 lg:px-8 border-t border-zinc-900">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-zinc-900 border border-zinc-800 rounded-full px-4 py-1.5 text-[#e8702a] text-xs font-semibold uppercase tracking-wider mb-4">
              <Layers size={14} /> Sediment Ingestion Engine
            </div>
            <h2 className="text-4xl sm:text-5xl font-playfair italic font-medium text-white mb-4">
              Peel Back The Crust
            </h2>
            <p className="text-zinc-400 text-lg">
              Extract, parse, and analyze the layered experiences in resumes. Leverage deep semantic mapping to verify structure and candidate relevance.
            </p>
          </div>

          {/* Interactive Navigation Tabs */}
          <div className="flex justify-center mb-12">
            <div className="bg-[#15171e] p-1.5 rounded-2xl border border-zinc-800 flex gap-2 w-full max-w-md">
              <button
                onClick={() => {
                  setActiveTab('job-seeker');
                  setSeekerError(null);
                }}
                className={`flex-1 py-3.5 rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
                  activeTab === 'job-seeker'
                    ? 'bg-[#e8702a] text-white shadow-lg shadow-[#e8702a]/20'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
                }`}
              >
                <Briefcase size={16} /> Job Seeker Portal
              </button>
              <button
                onClick={() => {
                  setActiveTab('recruiter');
                  setRecruiterError(null);
                }}
                className={`flex-1 py-3.5 rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
                  activeTab === 'recruiter'
                    ? 'bg-[#e8702a] text-white shadow-lg shadow-[#e8702a]/20'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
                }`}
              >
                <Users size={16} /> Recruiter Screen
              </button>
            </div>
          </div>

          {/* Error alerts */}
          {activeTab === 'job-seeker' && seekerError && (
            <div className="bg-red-950/40 border border-red-900/60 text-red-200 px-5 py-4 rounded-2xl mb-8 flex items-start gap-3 animate-in fade-in duration-300 max-w-4xl mx-auto">
              <AlertCircle className="text-red-500 shrink-0 mt-0.5" size={20} />
              <div>
                <h4 className="font-semibold text-red-400">Analysis Excavation Error</h4>
                <p className="text-sm mt-0.5 text-zinc-300">{seekerError}</p>
              </div>
            </div>
          )}

          {activeTab === 'recruiter' && recruiterError && (
            <div className="bg-red-950/40 border border-red-900/60 text-red-200 px-5 py-4 rounded-2xl mb-8 flex items-start gap-3 animate-in fade-in duration-300 max-w-4xl mx-auto">
              <AlertCircle className="text-red-500 shrink-0 mt-0.5" size={20} />
              <div>
                <h4 className="font-semibold text-red-400">Batch Screening Error</h4>
                <p className="text-sm mt-0.5 text-zinc-300">{recruiterError}</p>
              </div>
            </div>
          )}

          {/* Tab Panels */}
          {activeTab === 'job-seeker' ? (
            /* ==================== JOB SEEKER TAB ==================== */
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-5xl mx-auto">
              {/* Left Column: Form Inputs */}
              <div className="lg:col-span-6 flex flex-col gap-6">
                <div className="bg-[#15171e]/75 backdrop-blur-sm p-6 sm:p-8 rounded-3xl border border-zinc-800 shadow-xl">
                  <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                    <UploadCloud className="text-[#e8702a]" size={20} />
                    Ingest Resume Sediment
                  </h3>

                  <form onSubmit={handleSeekerUpload} className="space-y-6">
                    {/* File Dropzone */}
                    <div
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={(e) => {
                        e.preventDefault();
                        const file = e.dataTransfer.files?.[0];
                        if (file) setSeekerFile(file);
                      }}
                      className="border-2 border-dashed border-zinc-800 bg-zinc-950 hover:bg-[#121319] hover:border-[#e8702a]/50 transition-all duration-300 rounded-2xl p-8 text-center cursor-pointer group"
                    >
                      <input
                        type="file"
                        accept=".pdf,.docx,.txt"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) setSeekerFile(file);
                        }}
                        className="hidden"
                        id="seeker-file-input"
                      />
                      <label htmlFor="seeker-file-input" className="cursor-pointer block w-full h-full">
                        <UploadCloud className="mx-auto text-zinc-500 group-hover:text-[#e8702a] group-hover:-translate-y-1 transition-all mb-4" size={40} />
                        <p className="text-base font-bold text-zinc-200">Click to browse file</p>
                        <p className="text-xs text-zinc-500 mt-1">or drag & drop your document here</p>
                        <span className="inline-block bg-zinc-900 border border-zinc-800 px-3 py-1 rounded-full text-xxs font-semibold text-zinc-400 mt-5">
                          PDF, DOCX, TXT (Max 10MB)
                        </span>
                      </label>
                    </div>

                    {/* Selected File Details */}
                    {seekerFile && (
                      <div className="flex items-center justify-between p-3.5 bg-zinc-950 border border-zinc-800 rounded-xl animate-in zoom-in-95 duration-200">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <FileText className="text-[#e8702a] shrink-0" size={18} />
                          <span className="text-sm font-semibold truncate text-zinc-300">{seekerFile.name}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => setSeekerFile(null)}
                          className="text-zinc-500 hover:text-red-400 p-1 transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    )}

                    {/* Job Description Textarea */}
                    <div>
                      <label className="block text-sm font-semibold text-zinc-300 mb-2">
                        Target Job Description <span className="text-zinc-500 font-normal">(Optional)</span>
                      </label>
                      <textarea
                        value={seekerJobDescription}
                        onChange={(e) => setSeekerJobDescription(e.target.value)}
                        placeholder="Paste details of the target job description to match skills and discover keyword alignment..."
                        className="w-full h-36 bg-zinc-950 border border-zinc-800 rounded-xl p-4 text-sm text-zinc-300 placeholder-zinc-600 focus:outline-none focus:border-[#e8702a] transition-all resize-none font-light"
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={seekerLoading || !seekerFile}
                      className={`w-full py-4 rounded-xl text-base font-bold transition-all flex items-center justify-center gap-2 ${
                        seekerLoading || !seekerFile
                          ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
                          : 'bg-[#e8702a] hover:bg-[#d2611f] text-white shadow-lg shadow-[#e8702a]/20 hover:-translate-y-0.5 active:translate-y-0'
                      }`}
                    >
                      {seekerLoading ? (
                        <>
                          <Loader2 className="animate-spin text-white" size={18} />
                          Excavating Sediment Layer...
                        </>
                      ) : (
                        <>
                          <Sparkles size={18} />
                          Ingest & Analyze Resume
                        </>
                      )}
                    </button>
                  </form>
                </div>
              </div>

              {/* Right Column: Seeker Results */}
              <div className="lg:col-span-6">
                <div className="bg-[#15171e]/75 backdrop-blur-sm p-6 sm:p-8 rounded-3xl border border-zinc-800 shadow-xl h-full flex flex-col">
                  {seekerLoading ? (
                    <div className="flex-1 flex flex-col items-center justify-center text-center p-8 animate-pulse">
                      <div className="w-16 h-16 rounded-full border-4 border-[#e8702a]/25 border-t-[#e8702a] animate-spin mb-6" />
                      <h4 className="text-lg font-bold text-white mb-2">Ingesting PDF into AI Core</h4>
                      <p className="text-sm text-zinc-500 max-w-xs">
                        Extracting textual layout, checking bias objective markers, and analyzing ATS specifications...
                      </p>
                    </div>
                  ) : seekerResult ? (
                    <div className="flex-1 space-y-6 overflow-y-auto max-h-[600px] pr-2">
                      {/* Analysis Header & Radial Score */}
                      <div className="flex items-center justify-between border-b border-zinc-800 pb-5">
                        <div>
                          <h4 className="text-lg font-bold text-white">Ingested Candidate Layer</h4>
                          <p className="text-xs text-zinc-400 mt-1">
                            Name: <span className="font-semibold text-zinc-200">{seekerResult.resumeData?.contactInfo?.fullName || 'John Doe'}</span>
                          </p>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="text-right">
                            <span className="text-2xl font-black text-white block">
                              {seekerResult.analysis?.atsCompatibility?.score || 0}%
                            </span>
                            <span className="text-xxs font-bold text-zinc-500 uppercase tracking-wider block">
                              ATS Match
                            </span>
                          </div>
                          <div className={`p-2.5 rounded-xl ${seekerResult.analysis?.atsCompatibility?.passesAts ? 'bg-emerald-950/50 border border-emerald-900/60 text-emerald-400' : 'bg-red-950/50 border border-red-900/60 text-red-400'}`}>
                            <Award size={20} />
                          </div>
                        </div>
                      </div>

                      {/* Contact Info parsed */}
                      <div className="bg-zinc-950/50 p-4 rounded-xl border border-zinc-900 grid grid-cols-2 gap-4 text-xs">
                        <div>
                          <span className="text-zinc-500 block mb-0.5">Email</span>
                          <span className="font-semibold text-zinc-300 break-all">{seekerResult.resumeData?.contactInfo?.email || 'john@example.com'}</span>
                        </div>
                        <div>
                          <span className="text-zinc-500 block mb-0.5">Location</span>
                          <span className="font-semibold text-zinc-300">{seekerResult.resumeData?.contactInfo?.location || 'New York, NY'}</span>
                        </div>
                      </div>

                      {/* Issues Found */}
                      {seekerResult.analysis?.atsCompatibility?.issues && seekerResult.analysis.atsCompatibility.issues.length > 0 && (
                        <div>
                          <h5 className="text-sm font-bold text-zinc-300 mb-3 flex items-center gap-1.5">
                            <AlertTriangle className="text-amber-500" size={16} /> Key Faults Found
                          </h5>
                          <div className="space-y-3">
                            {seekerResult.analysis.atsCompatibility.issues.map((issue, idx) => (
                              <div
                                key={idx}
                                className={`p-4 rounded-xl border text-xs leading-relaxed ${
                                  issue.severity === 'critical'
                                    ? 'bg-red-950/20 border-red-900/50 text-red-300'
                                    : issue.severity === 'warning'
                                    ? 'bg-amber-950/20 border-amber-900/50 text-amber-300'
                                    : 'bg-zinc-900 border-zinc-800 text-zinc-300'
                                }`}
                              >
                                <div className="font-bold text-sm mb-1">{issue.title}</div>
                                <p className="opacity-90">{issue.description}</p>
                                {issue.suggestion && (
                                  <div className="mt-2 text-xxs font-semibold uppercase tracking-wider opacity-80 border-t border-zinc-800/40 pt-1.5">
                                    Remediation: {issue.suggestion}
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Keyword Analysis (If job description provided) */}
                      {seekerResult.analysis?.keywordAnalysis && (
                        <div className="space-y-4">
                          <h5 className="text-sm font-bold text-zinc-300 flex items-center gap-1.5">
                            <Map className="text-[#e8702a]" size={16} /> Keyword Landscape ({seekerResult.analysis.keywordAnalysis.matchPercentage}% Alignment)
                          </h5>

                          <div className="grid grid-cols-2 gap-4">
                            <div className="bg-zinc-950 p-4 rounded-2xl border border-zinc-900">
                              <span className="text-xxs font-bold text-emerald-500 uppercase tracking-widest block mb-2">Matched ({seekerResult.analysis.keywordAnalysis.matchedKeywords?.length || 0})</span>
                              <div className="flex flex-wrap gap-1.5">
                                {seekerResult.analysis.keywordAnalysis.matchedKeywords?.map((kw, i) => (
                                  <span key={i} className="px-2 py-0.5 bg-emerald-950/50 text-emerald-400 border border-emerald-900/50 rounded-md text-xxs font-medium">{kw}</span>
                                ))}
                              </div>
                            </div>
                            <div className="bg-zinc-950 p-4 rounded-2xl border border-zinc-900">
                              <span className="text-xxs font-bold text-amber-500 uppercase tracking-widest block mb-2">Missing ({seekerResult.analysis.keywordAnalysis.missingKeywords?.length || 0})</span>
                              <div className="flex flex-wrap gap-1.5">
                                {seekerResult.analysis.keywordAnalysis.missingKeywords?.map((kw, i) => (
                                  <span key={i} className="px-2 py-0.5 bg-amber-950/50 text-amber-400 border border-amber-900/50 rounded-md text-xxs font-medium">{kw}</span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Recommendations */}
                      {seekerResult.analysis?.recommendations && (
                        <div>
                          <h5 className="text-sm font-bold text-zinc-300 mb-3 flex items-center gap-1.5">
                            <Sparkles className="text-amber-400" size={16} /> Layer Refinement Recommendations
                          </h5>
                          <ul className="space-y-2 text-xs text-zinc-400 font-light">
                            {seekerResult.analysis.recommendations.map((rec, i) => (
                              <li key={i} className="flex gap-2 bg-zinc-950/40 p-2.5 rounded-lg border border-zinc-900/80">
                                <span className="text-[#e8702a] font-bold">0{i+1}.</span>
                                <span>{rec}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-center p-8 border-2 border-dashed border-zinc-900 rounded-2xl">
                      <Layers className="text-zinc-700 mb-4 animate-bounce" size={48} />
                      <h4 className="text-lg font-bold text-zinc-400">Awaiting Sediment Ingestion</h4>
                      <p className="text-sm text-zinc-600 max-w-xs mt-1">
                        Use the left panel to upload your resume. Our local AI will analyze the structural lines of your career.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            /* ==================== RECRUITER TAB ==================== */
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-5xl mx-auto">
              {/* Left Column: Form Inputs */}
              <div className="lg:col-span-6 flex flex-col gap-6">
                <div className="bg-[#15171e]/75 backdrop-blur-sm p-6 sm:p-8 rounded-3xl border border-zinc-800 shadow-xl">
                  <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                    <UploadCloud className="text-[#e8702a]" size={20} />
                    Batch Upload Resumes
                  </h3>

                  <form onSubmit={handleRecruiterUpload} className="space-y-6">
                    {/* File Dropzone */}
                    <div
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={(e) => {
                        e.preventDefault();
                        const files = Array.from(e.dataTransfer.files);
                        setRecruiterFiles((prev) => [...prev, ...files].slice(0, 10));
                      }}
                      className="border-2 border-dashed border-zinc-800 bg-zinc-950 hover:bg-[#121319] hover:border-[#e8702a]/50 transition-all duration-300 rounded-2xl p-8 text-center cursor-pointer group"
                    >
                      <input
                        type="file"
                        accept=".pdf,.docx,.txt"
                        multiple
                        onChange={(e) => {
                          const files = Array.from(e.target.files || []);
                          setRecruiterFiles((prev) => [...prev, ...files].slice(0, 10));
                        }}
                        className="hidden"
                        id="recruiter-file-input"
                      />
                      <label htmlFor="recruiter-file-input" className="cursor-pointer block w-full h-full">
                        <UploadCloud className="mx-auto text-zinc-500 group-hover:text-[#e8702a] group-hover:-translate-y-1 transition-all mb-4" size={40} />
                        <p className="text-base font-bold text-zinc-200">Select Multiple Resumes</p>
                        <p className="text-xs text-zinc-500 mt-1">or drag & drop up to 10 files here</p>
                        <span className="inline-block bg-zinc-900 border border-zinc-800 px-3 py-1 rounded-full text-xxs font-semibold text-zinc-400 mt-5">
                          PDF, DOCX, TXT (Max 10 files)
                        </span>
                      </label>
                    </div>

                    {/* Selected File Details List */}
                    {recruiterFiles.length > 0 && (
                      <div className="space-y-2 animate-in zoom-in-95 duration-200">
                        <div className="flex justify-between items-center text-xs text-zinc-400 font-semibold px-1">
                          <span>Uploaded Files ({recruiterFiles.length})</span>
                          <button
                            type="button"
                            onClick={() => setRecruiterFiles([])}
                            className="text-red-400 hover:underline hover:text-red-300 transition-colors"
                          >
                            Clear all
                          </button>
                        </div>
                        <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-3.5 space-y-2 max-h-48 overflow-y-auto">
                          {recruiterFiles.map((file, idx) => (
                            <div key={idx} className="flex items-center justify-between text-xs py-1 border-b border-zinc-900 last:border-0">
                              <div className="flex items-center gap-2 min-w-0">
                                <span className="text-zinc-500 shrink-0">0{idx + 1}.</span>
                                <span className="font-medium truncate text-zinc-300">{file.name}</span>
                              </div>
                              <button
                                type="button"
                                onClick={() => setRecruiterFiles((prev) => prev.filter((_, i) => i !== idx))}
                                className="text-zinc-500 hover:text-red-400 transition-colors p-1"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Job Description Textarea (REQUIRED) */}
                    <div>
                      <label className="block text-sm font-semibold text-zinc-300 mb-2">
                        Target Job Description <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        value={recruiterJobDescription}
                        onChange={(e) => setRecruiterJobDescription(e.target.value)}
                        placeholder="Paste details of the target job description to match skills and rank candidates by compliance score..."
                        className="w-full h-36 bg-zinc-950 border border-zinc-800 rounded-xl p-4 text-sm text-zinc-300 placeholder-zinc-600 focus:outline-none focus:border-[#e8702a] transition-all resize-none font-light"
                        required
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={recruiterLoading || recruiterFiles.length === 0 || !recruiterJobDescription.trim()}
                      className={`w-full py-4 rounded-xl text-base font-bold transition-all flex items-center justify-center gap-2 ${
                        recruiterLoading || recruiterFiles.length === 0 || !recruiterJobDescription.trim()
                          ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
                          : 'bg-[#e8702a] hover:bg-[#d2611f] text-white shadow-lg shadow-[#e8702a]/20 hover:-translate-y-0.5 active:translate-y-0'
                      }`}
                    >
                      {recruiterLoading ? (
                        <>
                          <Loader2 className="animate-spin text-white" size={18} />
                          Excavating Candidate Layers...
                        </>
                      ) : (
                        <>
                          <Search size={18} />
                          Ingest & Screen Candidates
                        </>
                      )}
                    </button>
                  </form>
                </div>
              </div>

              {/* Right Column: Recruiter Results */}
              <div className="lg:col-span-6">
                <div className="bg-[#15171e]/75 backdrop-blur-sm p-6 sm:p-8 rounded-3xl border border-zinc-800 shadow-xl h-full flex flex-col">
                  {recruiterLoading ? (
                    <div className="flex-1 flex flex-col items-center justify-center text-center p-8 animate-pulse">
                      <div className="w-16 h-16 rounded-full border-4 border-[#e8702a]/25 border-t-[#e8702a] animate-spin mb-6" />
                      <h4 className="text-lg font-bold text-white mb-2">Screening Candidates</h4>
                      <p className="text-sm text-zinc-500 max-w-xs">
                        Ingesting batch data into AI Engine... Matching structured education and technical layers... Sorting ranking cards...
                      </p>
                    </div>
                  ) : recruiterResult ? (
                    <div className="flex-1 space-y-5 overflow-y-auto max-h-[600px] pr-2">
                      <div className="border-b border-zinc-800 pb-4">
                        <h4 className="text-lg font-bold text-white">Ranked Candidate Layers</h4>
                        <p className="text-xs text-zinc-400 mt-1">
                          Processed: <span className="font-semibold text-zinc-200">{recruiterResult.totalProcessed} Resumes</span>
                        </p>
                      </div>

                      <div className="space-y-4">
                        {recruiterResult.results?.map((cand, idx) => (
                          <div
                            key={idx}
                            className="bg-zinc-950 rounded-2xl border border-zinc-900 overflow-hidden transition-all hover:border-zinc-800"
                          >
                            {/* Candidate Header Row */}
                            <div
                              onClick={() => setExpandedCandidate(expandedCandidate === idx ? null : idx)}
                              className="p-4 flex items-center justify-between cursor-pointer select-none"
                            >
                              <div className="flex items-center gap-3 min-w-0">
                                <span className="text-[#e8702a] font-bold text-sm">#{idx + 1}</span>
                                <div className="truncate">
                                  <h5 className="text-sm font-semibold truncate text-zinc-200">{cand.candidateName || cand.filename}</h5>
                                  <span className="text-xxs text-zinc-500 font-light truncate block">{cand.filename}</span>
                                </div>
                              </div>
                              <div className="flex items-center gap-3">
                                <span className="text-sm font-black text-zinc-200">
                                  {cand.ranking?.overallScore || 0}%
                                </span>
                                {expandedCandidate === idx ? (
                                  <ChevronUp size={16} className="text-zinc-500" />
                                ) : (
                                  <ChevronDown size={16} className="text-zinc-500" />
                                )}
                              </div>
                            </div>

                            {/* Candidate Detailed Dropdown */}
                            {expandedCandidate === idx && (
                              <div className="px-4 pb-4 pt-2 border-t border-zinc-900 bg-zinc-950/80 space-y-4 text-xs animate-in slide-in-from-top-2 duration-300">
                                {/* Core stats */}
                                <div className="grid grid-cols-2 gap-4 border-b border-zinc-900 pb-3">
                                  <div>
                                    <span className="text-zinc-500 text-xxs font-bold uppercase tracking-wider block">Education Match</span>
                                    <span className="text-zinc-300 block mt-0.5">
                                      Degree: {cand.ranking?.education?.actualLevel || 'N/A'} (Score: {cand.ranking?.education?.matchScore || 0}%)
                                    </span>
                                  </div>
                                  <div>
                                    <span className="text-zinc-500 text-xxs font-bold uppercase tracking-wider block">Experience Match</span>
                                    <span className="text-zinc-300 block mt-0.5">
                                      Years: {cand.ranking?.experience?.actualYears || 0} / {cand.ranking?.experience?.requiredYears || 0} required
                                    </span>
                                  </div>
                                </div>

                                {/* Skills */}
                                <div>
                                  <span className="text-zinc-500 text-xxs font-bold uppercase tracking-wider block mb-2">Technical Alignment</span>
                                  <div className="flex flex-wrap gap-1.5">
                                    {cand.ranking?.skills?.map((sk, sidx) => (
                                      <span
                                        key={sidx}
                                        className={`px-2 py-0.5 rounded-md text-xxs font-medium border ${
                                          sk.matched
                                            ? 'bg-emerald-950/30 border-emerald-900/40 text-emerald-400'
                                            : 'bg-zinc-900 border-zinc-800 text-zinc-500'
                                        }`}
                                      >
                                        {sk.skillName} {sk.matched ? `(Match)` : `(Lacks)`}
                                      </span>
                                    ))}
                                  </div>
                                </div>

                                {/* Strengths and Gaps */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                                  <div className="bg-emerald-950/10 border border-emerald-900/30 rounded-xl p-3">
                                    <span className="text-[#e8702a] font-bold text-xxs uppercase tracking-wider block mb-1.5">Observed Strengths</span>
                                    <ul className="space-y-1 list-disc pl-3 text-xxs text-zinc-300 leading-relaxed">
                                      {cand.ranking?.strengths?.map((str, sidx) => (
                                        <li key={sidx}>{str}</li>
                                      )) || <li>Strong background fit</li>}
                                    </ul>
                                  </div>
                                  <div className="bg-amber-950/10 border border-amber-900/30 rounded-xl p-3">
                                    <span className="text-zinc-500 font-bold text-xxs uppercase tracking-wider block mb-1.5">Observed Gaps</span>
                                    <ul className="space-y-1 list-disc pl-3 text-xxs text-zinc-300 leading-relaxed">
                                      {cand.ranking?.gaps?.map((gap, sidx) => (
                                        <li key={sidx}>{gap}</li>
                                      )) || <li>No major gaps reported</li>}
                                    </ul>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-center p-8 border-2 border-dashed border-zinc-900 rounded-2xl">
                      <Users className="text-zinc-700 mb-4 animate-bounce" size={48} />
                      <h4 className="text-lg font-bold text-zinc-400">Awaiting Candidate Ingestion</h4>
                      <p className="text-sm text-zinc-600 max-w-xs mt-1">
                        Use the left panel to upload multiple resumes. Write a job description to extract compliance indicators.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#070708] border-t border-zinc-900 py-12 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5" viewBox="0 0 256 256" fill="#8b8e98">
              <path d="M 256 256 L 128 256 L 0 128 L 128 128 Z M 256 128 L 128 128 L 0 0 L 128 0 Z" />
            </svg>
            <span className="text-zinc-400 text-lg font-playfair italic font-medium">Lithos Resume Analyzer</span>
          </div>
          <p className="text-zinc-500 text-xs font-light">
            © {new Date().getFullYear()} Resume analyzer. All rights reserved. Ingesting earth time data.
          </p>
        </div>
      </footer>
    </div>
  );
}
