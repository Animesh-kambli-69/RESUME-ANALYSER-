import React from 'react';

const ATSReport = ({ score, passesAts, issues, recommendations }) => {
  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical':
        return 'bg-red-50 border-red-200 text-red-800';
      case 'warning':
        return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      case 'info':
        return 'bg-blue-50 border-blue-200 text-blue-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">ATS Compatibility Report</h2>
        <div
          className={`text-center p-4 rounded-lg ${
            passesAts
              ? 'bg-green-100 text-green-800'
              : 'bg-red-100 text-red-800'
          }`}
        >
          <div className="text-3xl font-bold">{score}</div>
          <div className="text-sm">Score</div>
          <div className="text-xs mt-1">
            {passesAts ? 'Passes ATS' : 'Fails ATS'}
          </div>
        </div>
      </div>

      {issues.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">Issues Found</h3>
          <div className="space-y-3">
            {issues.map((issue, idx) => (
              <div
                key={idx}
                className={`p-4 border-l-4 rounded ${getSeverityColor(
                  issue.severity
                )}`}
              >
                <div className="font-semibold">{issue.title}</div>
                <div className="text-sm mt-1">{issue.description}</div>
                <div className="text-sm mt-2 font-medium">
                  Suggestion: {issue.suggestion}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {recommendations.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-3">Recommendations</h3>
          <ul className="space-y-2">
            {recommendations.map((rec, idx) => (
              <li key={idx} className="flex items-start">
                <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-blue-100 text-blue-800 text-sm font-bold mr-2 flex-shrink-0">
                  {idx + 1}
                </span>
                <span>{rec}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ATSReport;
