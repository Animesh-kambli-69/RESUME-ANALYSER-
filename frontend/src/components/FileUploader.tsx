import React from "react";

export const FileUploader: React.FC<{
  onFileSelect: (file: File) => void;
  label?: string;
}> = ({ onFileSelect, label = "Upload Resume" }) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileSelect(file);
    }
  };

  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
        <input
          type="file"
          accept=".pdf,.docx,.txt"
          onChange={handleFileChange}
          className="hidden"
          id="file-input"
        />
        <label htmlFor="file-input" className="cursor-pointer">
          <div className="text-gray-500">
            <p className="text-lg font-semibold">Click to upload</p>
            <p className="text-sm mt-2">or drag and drop</p>
            <p className="text-xs mt-1">PDF, DOCX, or TXT (max 10MB)</p>
          </div>
        </label>
      </div>
    </div>
  );
};

export default FileUploader;
