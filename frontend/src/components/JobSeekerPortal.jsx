import React, { useState } from 'react';
import { Upload, FileText, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { resumeApi } from '../services/api';

export default function JobSeekerPortal() {
  const [file, setFile] = useState(null);
  const [jobDesc, setJobDesc] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Please select a resume file.');
      return;
    }
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const data = await resumeApi.analyzeForJobSeeker(file, jobDesc);
      setResult(data);
    } catch (err) {
      setError('Failed to analyze resume. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="glass-panel rounded-2xl p-6 sm:p-10 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
          <Upload size={200} />
        </div>
        
        <div className="relative z-10">
          <h2 className="text-3xl font-display font-semibold mb-2 text-white">Optimize Your Resume</h2>
          <p className="text-white/60 mb-8">Upload your resume and the target job description to get AI-powered insights.</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <label className="block">
                <span className="text-sm font-medium text-white/80 mb-2 block">Upload Resume (PDF)</span>
                <div className="glass-input rounded-xl p-8 border-dashed border-2 flex flex-col items-center justify-center text-center cursor-pointer hover:border-primary/50 transition-colors">
                  <input
                    type="file"
                    className="hidden"
                    id="resume-upload"
                    accept=".pdf"
                    onChange={(e) => setFile(e.target.files[0])}
                  />
                  <label htmlFor="resume-upload" className="cursor-pointer flex flex-col items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center">
                      <FileText className="text-primary" size={24} />
                    </div>
                    {file ? (
                      <span className="text-primary font-medium">{file.name}</span>
                    ) : (
                      <span>
                        <span className="text-primary font-medium">Click to upload</span> or drag and drop
                      </span>
                    )}
                  </label>
                </div>
              </label>

              <label className="block">
                <span className="text-sm font-medium text-white/80 mb-2 block">Target Job Description (Optional)</span>
                <textarea
                  className="glass-input w-full rounded-xl p-4 min-h-[120px] resize-none"
                  placeholder="Paste the job description here..."
                  value={jobDesc}
                  onChange={(e) => setJobDesc(e.target.value)}
                />
              </label>
            </div>

            {error && (
              <div className="p-4 rounded-xl bg-destructive/20 border border-destructive/30 text-destructive-foreground flex gap-3 items-center">
                <AlertCircle size={20} className="shrink-0 text-destructive" />
                <p className="text-sm">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-4 rounded-xl transition-all hover-lift disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  Analyzing Resume...
                </>
              ) : (
                'Analyze Resume'
              )}
            </button>
          </form>
        </div>
      </div>

      {result && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="glass-panel p-8 rounded-2xl flex flex-col items-center justify-center text-center">
            <h3 className="text-lg text-white/60 font-medium mb-2">ATS Match Score</h3>
            <div className="text-6xl font-display font-bold text-white mb-4">
              {result.atsScore}%
            </div>
            <div className="w-full bg-white/10 rounded-full h-2 mb-2">
              <div className="bg-primary h-2 rounded-full" style={{ width: `${result.atsScore}%` }} />
            </div>
          </div>
          
          <div className="glass-panel p-8 rounded-2xl">
            <h3 className="text-lg text-white/80 font-medium mb-4 flex items-center gap-2">
              <CheckCircle2 className="text-green-400" size={20} />
              Key Suggestions
            </h3>
            <ul className="space-y-3">
              {result.suggestions?.map((s, i) => (
                <li key={i} className="flex gap-3 text-white/70 text-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-1.5" />
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
