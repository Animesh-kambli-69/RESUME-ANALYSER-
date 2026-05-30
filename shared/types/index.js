/**
 * @typedef {Object} ContactInfo
 * @property {string} fullName
 * @property {string} email
 * @property {string} [phone]
 * @property {string} [location]
 * @property {string} [linkedin]
 * @property {string} [portfolio]
 */

/**
 * @typedef {Object} Experience
 * @property {string} jobTitle
 * @property {string} company
 * @property {string} [location]
 * @property {string} startDate
 * @property {string} [endDate]
 * @property {boolean} currentlyWorking
 * @property {string[]} description
 * @property {string[]} keywords
 */

/**
 * @typedef {Object} Education
 * @property {string} degree
 * @property {string} institution
 * @property {string} [location]
 * @property {string} graduationDate
 * @property {string} [cgpa]
 * @property {string} fieldOfStudy
 */

/**
 * @typedef {Object} Skill
 * @property {string} name
 * @property {'technical'|'soft'|'language'|'tool'} category
 * @property {'beginner'|'intermediate'|'advanced'|'expert'} proficiencyLevel
 */

/**
 * @typedef {Object} Certification
 * @property {string} name
 * @property {string} issuingOrganization
 * @property {string} issueDate
 * @property {string} [expiryDate]
 * @property {string} [credentialId]
 * @property {string} [credentialUrl]
 */

/**
 * @typedef {Object} ResumeData
 * @property {string} id
 * @property {ContactInfo} contactInfo
 * @property {string} summary
 * @property {Experience[]} experience
 * @property {Education[]} education
 * @property {Skill[]} skills
 * @property {Certification[]} certifications
 * @property {string} rawText
 * @property {Date} uploadedAt
 */

/**
 * @typedef {Object} AtsIssue
 * @property {'critical'|'warning'|'info'} severity
 * @property {string} title
 * @property {string} description
 * @property {string} suggestion
 */

/**
 * @typedef {Object} AtsCompatibilityReport
 * @property {number} score
 * @property {AtsIssue[]} issues
 * @property {string[]} recommendations
 * @property {boolean} passesAts
 */

/**
 * @typedef {Object} KeywordSuggestion
 * @property {string} keyword
 * @property {string} category
 * @property {string} whereToAdd
 * @property {number} relevance
 */

/**
 * @typedef {Object} KeywordAnalysis
 * @property {string} jobDescription
 * @property {string[]} extractedKeywords
 * @property {string[]} matchedKeywords
 * @property {string[]} missingKeywords
 * @property {number} matchPercentage
 * @property {KeywordSuggestion[]} suggestions
 */

/**
 * @typedef {Object} SkillMatch
 * @property {string} skillName
 * @property {boolean} required
 * @property {boolean} matched
 * @property {number} relevanceScore
 */

/**
 * @typedef {Object} ExperienceMatch
 * @property {number} requiredYears
 * @property {number} actualYears
 * @property {number} relevantExperienceYears
 * @property {number} matchScore
 */

/**
 * @typedef {Object} EducationMatch
 * @property {string} requiredLevel
 * @property {string} actualLevel
 * @property {number} matchScore
 */

/**
 * @typedef {Object} CandidateRankingReport
 * @property {string} candidateName
 * @property {number} overallScore
 * @property {SkillMatch[]} skills
 * @property {ExperienceMatch} experience
 * @property {EducationMatch} education
 * @property {number} ranking
 * @property {string[]} strengths
 * @property {string[]} gaps
 */

/**
 * @typedef {Object} AnalysisResult
 * @property {ResumeData} resumeData
 * @property {Object} analysis
 * @property {AtsCompatibilityReport} analysis.atsCompatibility
 * @property {KeywordAnalysis} [analysis.keywordAnalysis]
 * @property {Object} analysis.biasReduction
 * @property {string[]} analysis.recommendations
 */

export {};
