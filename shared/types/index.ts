// Shared types for Resume Analyzer

export interface ResumeData {
  id: string;
  contactInfo: ContactInfo;
  summary: string;
  experience: Experience[];
  education: Education[];
  skills: Skill[];
  certifications: Certification[];
  rawText: string;
  uploadedAt: Date;
}

export interface ContactInfo {
  fullName: string;
  email: string;
  phone?: string;
  location?: string;
  linkedin?: string;
  portfolio?: string;
}

export interface Experience {
  jobTitle: string;
  company: string;
  location?: string;
  startDate: string;
  endDate?: string;
  currentlyWorking: boolean;
  description: string[];
  keywords: string[];
}

export interface Education {
  degree: string;
  institution: string;
  location?: string;
  graduationDate: string;
  cgpa?: string;
  fieldOfStudy: string;
}

export interface Skill {
  name: string;
  category: SkillCategory;
  proficiencyLevel: ProficiencyLevel;
}

export type SkillCategory = "technical" | "soft" | "language" | "tool";
export type ProficiencyLevel = "beginner" | "intermediate" | "advanced" | "expert";

export interface Certification {
  name: string;
  issuingOrganization: string;
  issueDate: string;
  expiryDate?: string;
  credentialId?: string;
  credentialUrl?: string;
}

// Analysis Results
export interface AtsCompatibilityReport {
  score: number;
  issues: AtsIssue[];
  recommendations: string[];
  passesAts: boolean;
}

export interface AtsIssue {
  severity: "critical" | "warning" | "info";
  title: string;
  description: string;
  suggestion: string;
}

export interface KeywordAnalysis {
  jobDescription: string;
  extractedKeywords: string[];
  matchedKeywords: string[];
  missingKeywords: string[];
  matchPercentage: number;
  suggestions: KeywordSuggestion[];
}

export interface KeywordSuggestion {
  keyword: string;
  category: string;
  whereToAdd: string;
  relevance: number;
}

export interface CandidateRankingReport {
  candidateName: string;
  overallScore: number;
  skills: SkillMatch[];
  experience: ExperienceMatch;
  education: EducationMatch;
  ranking: number;
  strengths: string[];
  gaps: string[];
}

export interface SkillMatch {
  skillName: string;
  required: boolean;
  matched: boolean;
  relevanceScore: number;
}

export interface ExperienceMatch {
  requiredYears: number;
  actualYears: number;
  relevantExperienceYears: number;
  matchScore: number;
}

export interface EducationMatch {
  requiredLevel: string;
  actualLevel: string;
  matchScore: number;
}

export interface AnalysisResult {
  resumeId: string;
  atsCompatibility: AtsCompatibilityReport;
  keywordAnalysis?: KeywordAnalysis;
  candidateRanking?: CandidateRankingReport;
  analyzedAt: Date;
}

export interface BiasReductionMetrics {
  objectivityScore: number;
  formatBias: string[];
  nameBias: string[];
  recommendations: string[];
}
