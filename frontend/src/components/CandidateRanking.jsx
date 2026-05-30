import React from 'react';

const CandidateRanking = ({
  candidateName,
  overallScore,
  skills,
  experience,
  education,
  strengths,
  gaps,
}) => {
  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBgColor = (score) => {
    if (score >= 80) return 'bg-green-100';
    if (score >= 60) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">{candidateName}</h2>
        <div
          className={`p-4 rounded-lg text-center ${getScoreBgColor(
            overallScore
          )}`}
        >
          <div className={`text-3xl font-bold ${getScoreColor(overallScore)}`}>
            {overallScore}
          </div>
          <div className="text-sm text-gray-600">Overall Score</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-gray-50 p-4 rounded">
          <div className="font-semibold text-gray-700 mb-2">Experience</div>
          <div className="text-2xl font-bold text-blue-600">
            {experience.matchScore}%
          </div>
          <div className="text-sm text-gray-600 mt-2">
            {experience.relevantExperienceYears} years relevant
          </div>
        </div>
        <div className="bg-gray-50 p-4 rounded">
          <div className="font-semibold text-gray-700 mb-2">Skills</div>
          <div className="text-2xl font-bold text-blue-600">
            {skills.filter((s) => s.matched).length}/{skills.length}
          </div>
          <div className="text-sm text-gray-600 mt-2">Skills matched</div>
        </div>
        <div className="bg-gray-50 p-4 rounded">
          <div className="font-semibold text-gray-700 mb-2">Education</div>
          <div className="text-2xl font-bold text-blue-600">
            {education.matchScore}%
          </div>
          <div className="text-sm text-gray-600 mt-2">{education.actualLevel}</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <h3 className="font-semibold mb-3 text-green-700">Strengths</h3>
          <ul className="space-y-2">
            {strengths.map((strength, idx) => (
              <li key={idx} className="flex items-start">
                <span className="text-green-600 mr-2">✓</span>
                <span>{strength}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="font-semibold mb-3 text-red-700">Gaps</h3>
          <ul className="space-y-2">
            {gaps.map((gap, idx) => (
              <li key={idx} className="flex items-start">
                <span className="text-red-600 mr-2">✗</span>
                <span>{gap}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CandidateRanking;
