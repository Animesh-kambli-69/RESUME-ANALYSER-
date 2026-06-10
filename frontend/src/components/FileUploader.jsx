import React from 'react';

const FileUploader = ({ onFileSelect, label = 'Upload Resume' }) => {
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileSelect(file);
    }
  };

  return (
    <div className="w-full">
      <label className="block text-sm font-semibold text-slate-700 mb-2">
        {label}
      </label>
      <div className="border-2 border-dashed border-blue-200 bg-blue-50/50 rounded-2xl p-10 text-center hover:bg-blue-50 hover:border-blue-400 transition-all group">
        <input
          type="file"
          accept=".pdf,.docx,.txt"
          onChange={handleFileChange}
          className="hidden"
          id="file-input"
        />
        <label htmlFor="file-input" className="cursor-pointer block w-full h-full">
          <div className="text-slate-500 group-hover:text-blue-600 transition-colors">
            <span className="text-4xl mb-4 block group-hover:-translate-y-1 transition-transform drop-shadow-sm">📤</span>
            <p className="text-lg font-bold">Click to Browse</p>
            <p className="text-sm font-medium mt-1">or drag and drop your file here</p>
            <p className="text-xs font-medium text-slate-400 mt-4 bg-white/60 inline-block px-3 py-1 rounded-full border border-slate-100">Supports PDF, DOCX, TXT (up to 10MB)</p>
          </div>
        </label>
      </div>
    </div>
  );
};

export default FileUploader;
