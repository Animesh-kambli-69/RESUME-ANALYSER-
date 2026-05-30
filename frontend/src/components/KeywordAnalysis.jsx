import React from 'react';

const KeywordAnalysis = ({
  matchPercentage,
  matchedKeywords,
  missingKeywords,
  suggestions,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <h2 className="text-2xl font-bold mb-6">Keyword Analysis</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4">
          <div className="text-3xl font-bold text-blue-600">
            {matchPercentage}%
          </div>
          <div className="text-sm text-gray-600">Match Percentage</div>
        </div>
        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4">
          <div className="text-3xl font-bold text-green-600">
            {matchedKeywords.length}
          </div>
          <div className="text-sm text-gray-600">Matched Keywords</div>
        </div>
        <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-4">
          <div className="text-3xl font-bold text-orange-600">
            {missingKeywords.length}
          </div>
          <div className="text-sm text-gray-600">Missing Keywords</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <h3 className="font-semibold mb-3 text-green-700">
            ✓ Matched Keywords
          </h3>
          <div className="flex flex-wrap gap-2">
            {matchedKeywords.map((keyword, idx) => (
              <span
                key={idx}
                className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm"
              >
                {keyword}
              </span>
            ))}
          </div>
        </div>
        <div>
          <h3 className="font-semibold mb-3 text-orange-700">
            ✗ Missing Keywords
          </h3>
          <div className="flex flex-wrap gap-2">
            {missingKeywords.map((keyword, idx) => (
              <span
                key={idx}
                className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm"
              >
                {keyword}
              </span>
            ))}
          </div>
        </div>
      </div>

      {suggestions && suggestions.length > 0 && (
        <div>
          <h3 className="font-semibold mb-3">Suggestions</h3>
          <div className="space-y-3">
            {suggestions.slice(0, 5).map((suggestion, idx) => (
              <div key={idx} className="bg-blue-50 p-3 rounded border-l-4 border-blue-400">
                <div className="font-medium text-blue-900">
                  {suggestion.keyword}
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  Where to add: {suggestion.whereToAdd}
                </div>
                <div className="text-sm text-gray-600">
                  Relevance: {suggestion.relevance}/10
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default KeywordAnalysis;
