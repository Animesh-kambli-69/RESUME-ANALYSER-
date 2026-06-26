import React, { useState } from 'react';
import { Users, FileText, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { resumeApi } from '../services/api';

export default function RecruiterPortal() {
  const [files, setFiles] = useState([]);
  const [jobDesc, setJobDesc] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (files.length === 0) {
      setError('Please select at least one resume file.');
      return;
    }
    if (!jobDesc) {
      setError('A job description is required for batch screening.');
      return;
    }
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const data = await resumeApi.batchAnalyzeResumes(files, jobDesc);
      setResult(data);
    } catch (err) {
      setError('Failed to batch analyze resumes. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="glass-panel rounded-2xl p-6 sm:p-10 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
          <Users size={200} />
        </div>
        
        <div className="relative z-10">
          <h2 className="text-3xl font-display font-semibold mb-2 text-white">Batch Screen Candidates</h2>
          <p className="text-white/60 mb-8">Upload multiple resumes against a job description to instantly rank top matches.</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <label className="block">
                <span className="text-sm font-medium text-white/80 mb-2 block">Upload Resumes (Multiple PDFs)</span>
                <div className="glass-input rounded-xl p-8 border-dashed border-2 flex flex-col items-center justify-center text-center cursor-pointer hover:border-primary/50 transition-colors h-[200px]">
                  <input
                    type="file"
                    className="hidden"
                    id="resume-batch-upload"
                    accept=".pdf"
                    multiple
                    onChange={(e) => setFiles(e.target.files)}
                  />
                  <label htmlFor="resume-batch-upload" className="cursor-pointer flex flex-col items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center">
                      <FileText className="text-primary" size={24} />
                    </div>
                    {files.length > 0 ? (
                      <span className="text-primary font-medium">{files.length} files selected</span>
                    ) : (
                      <span>
                        <span className="text-primary font-medium">Select files</span> or drag and drop
                      </span>
                    )}
                  </label>
                </div>
              </label>

              <label className="block">
                <span className="text-sm font-medium text-white/80 mb-2 block">Job Description (Required)</span>
                <textarea
                  className="glass-input w-full rounded-xl p-4 h-[200px] resize-none"
                  placeholder="Paste the target job description here..."
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
              className="w-full bg-white text-black hover:bg-white/90 font-medium py-4 rounded-xl transition-all hover-lift disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  Screening Candidates...
                </>
              ) : (
                'Screen Candidates'
              )}
            </button>
          </form>
        </div>
      </div>

      {result && result.results && (
        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <h3 className="text-xl font-display font-medium text-white mb-4">Top Ranked Candidates</h3>
          {result.results.map((candidate, idx) => (
            <div key={idx} className="glass-panel p-6 rounded-2xl flex flex-col md:flex-row gap-6 items-center hover:bg-white/10 transition-colors cursor-pointer">
              <div className="flex-shrink-0 w-16 h-16 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center">
                <span className="text-2xl font-display font-bold text-primary">#{idx + 1}</span>
              </div>
              <div className="flex-grow text-center md:text-left">
                <h4 className="text-lg font-medium text-white">{candidate.filename}</h4>
                <p className="text-sm text-white/60 mt-1">{candidate.fitSummary}</p>
                <div className="flex flex-wrap gap-2 justify-center md:justify-start mt-3">
                  {candidate.keySkills?.map(skill => (
                    <span key={skill} className="px-2 py-1 rounded-md bg-white/5 text-xs text-white/80 border border-white/10">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex-shrink-0 text-right">
                <div className="text-3xl font-display font-bold text-white">{candidate.matchScore}%</div>
                <div className="text-xs text-white/50 uppercase tracking-wider mt-1">Match</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
