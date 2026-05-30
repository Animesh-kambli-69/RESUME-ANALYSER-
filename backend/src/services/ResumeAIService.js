// Resume AI Service - Supports Ollama (Local LLM) + Mock Mode
// Set AI_MODE in .env to one of: 'ollama', 'mock', 'claude'

import axios from 'axios';

export class ResumeAIService {
  constructor() {
    this.aiMode = process.env.AI_MODE || 'mock';
    this.ollamaUrl = process.env.OLLAMA_URL || 'http://localhost:11434/api/generate';
    this.ollamaModel = process.env.OLLAMA_MODEL || 'mistral';
    
    console.log(`
╔════════════════════════════════════════╗
║   Resume AI Service Configuration      ║
║   Mode: ${this.aiMode.toUpperCase().padEnd(30)}║
║   Model: ${this.ollamaModel.padEnd(26)}║
╚════════════════════════════════════════╝
    `);
  }

  /**
   * Call Ollama local LLM via HTTP API
   */
  async callOllama(prompt) {
    try {
      const response = await axios.post(this.ollamaUrl, {
        model: this.ollamaModel,
        prompt: prompt,
        stream: false,
        temperature: 0.1, // Lower temp = more consistent JSON
      });

      if (response.data && response.data.response) {
        return response.data.response;
      }
      throw new Error('No response from Ollama');
    } catch (error) {
      console.error('❌ Ollama Error:', error.message);
      throw new Error(`Ollama connection failed. Is it running on ${this.ollamaUrl}?`);
    }
  }

  /**
   * Extract JSON from LLM response (handles imperfect JSON from local models)
   */
  extractJSON(text) {
    // Try to find JSON in the response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      try {
        return JSON.parse(jsonMatch[0]);
      } catch (e) {
        // JSON might be malformed, try to fix it
        return this._repairJSON(jsonMatch[0]);
      }
    }
    throw new Error('No JSON found in response');
  }

  /**
   * Attempt to repair broken JSON from LLM
   */
  _repairJSON(str) {
    try {
      // Try common repairs
      str = str.replace(/[\x00-\x1F\x7F-\x9F]/g, ' '); // Remove control chars
      str = str.replace(/,\s*}/g, '}'); // Remove trailing commas
      str = str.replace(/,\s*]/g, ']'); // Remove trailing commas in arrays
      str = str.replace(/'/g, '"'); // Replace single quotes with double
      return JSON.parse(str);
    } catch (e) {
      console.error('Could not repair JSON:', e);
      return null;
    }
  }

  // ============================================
  // Parse Resume
  // ============================================
  async parseResume(resumeText) {
    if (this.aiMode === 'mock') {
      return this._mockParseResume(resumeText);
    }
    if (this.aiMode === 'ollama') {
      return this._parseResumeWithOllama(resumeText);
    }
    throw new Error(`Unknown AI_MODE: ${this.aiMode}`);
  }

  async _parseResumeWithOllama(resumeText) {
    const prompt = `Parse the resume text and extract structured data as JSON.
Return ONLY valid JSON, no markdown or code blocks.

{
  "contactInfo": {
    "fullName": "string",
    "email": "string",
    "phone": "string",
    "location": "string",
    "linkedin": "string",
    "portfolio": "string"
  },
  "summary": "string",
  "experience": [
    {
      "jobTitle": "string",
      "company": "string",
      "location": "string",
      "startDate": "YYYY-MM",
      "endDate": "YYYY-MM",
      "currentlyWorking": boolean,
      "description": ["string"],
      "keywords": ["string"]
    }
  ],
  "education": [
    {
      "degree": "string",
      "institution": "string",
      "location": "string",
      "graduationDate": "YYYY-MM",
      "cgpa": "string",
      "fieldOfStudy": "string"
    }
  ],
  "skills": [
    {
      "name": "string",
      "category": "string",
      "proficiencyLevel": "string"
    }
  ],
  "certifications": []
}

Resume:
${resumeText}`;

    const response = await this.callOllama(prompt);
    return this.extractJSON(response);
  }

  _mockParseResume(resumeText) {
    return {
      contactInfo: {
        fullName: 'John Doe',
        email: 'john@example.com',
        phone: '555-1234',
        location: 'New York, NY',
        linkedin: 'linkedin.com/in/johndoe',
        portfolio: 'johndoe.dev',
      },
      summary: 'Experienced software developer with 5+ years in web development',
      experience: [
        {
          jobTitle: 'Senior Developer',
          company: 'Tech Corp',
          location: 'New York, NY',
          startDate: '2021-01',
          endDate: 'Present',
          currentlyWorking: true,
          description: ['Led team of 5 developers', 'Improved performance by 40%'],
          keywords: ['JavaScript', 'React', 'Node.js'],
        },
      ],
      education: [
        {
          degree: "Bachelor's",
          institution: 'State University',
          location: 'New York, NY',
          graduationDate: '2018-05',
          cgpa: '3.8',
          fieldOfStudy: 'Computer Science',
        },
      ],
      skills: [
        { name: 'JavaScript', category: 'technical', proficiencyLevel: 'expert' },
        { name: 'React', category: 'technical', proficiencyLevel: 'advanced' },
      ],
      certifications: [],
    };
  }

  // ============================================
  // Analyze ATS Compatibility
  // ============================================
  async analyzeAtsCompatibility(resumeText) {
    if (this.aiMode === 'mock') {
      return this._mockAnalyzeAts();
    }
    if (this.aiMode === 'ollama') {
      return this._analyzeAtsWithOllama(resumeText);
    }
    throw new Error(`Unknown AI_MODE: ${this.aiMode}`);
  }

  async _analyzeAtsWithOllama(resumeText) {
    const prompt = `Analyze this resume for ATS (Applicant Tracking System) compatibility.
Return ONLY valid JSON:

{
  "score": 0-100,
  "passesAts": true/false,
  "issues": [
    {
      "title": "string",
      "description": "string",
      "severity": "critical|warning|info",
      "suggestion": "string"
    }
  ],
  "recommendations": ["string"]
}

Resume:
${resumeText}`;

    const response = await this.callOllama(prompt);
    return this.extractJSON(response);
  }

  _mockAnalyzeAts() {
    return {
      score: 78,
      passesAts: true,
      issues: [
        {
          title: 'Missing Keywords',
          description: 'Resume lacks some industry keywords',
          severity: 'warning',
          suggestion: 'Add keywords from job description',
        },
      ],
      recommendations: ['Add quantifiable metrics', 'Use action verbs'],
    };
  }

  // ============================================
  // Analyze Keywords
  // ============================================
  async analyzeKeywords(resumeText, jobDescription) {
    if (this.aiMode === 'mock') {
      return this._mockAnalyzeKeywords();
    }
    if (this.aiMode === 'ollama') {
      return this._analyzeKeywordsWithOllama(resumeText, jobDescription);
    }
    throw new Error(`Unknown AI_MODE: ${this.aiMode}`);
  }

  async _analyzeKeywordsWithOllama(resumeText, jobDescription) {
    const prompt = `Compare resume against job description and analyze keywords.
Return ONLY valid JSON:

{
  "extractedKeywords": ["string"],
  "matchedKeywords": ["string"],
  "missingKeywords": ["string"],
  "matchPercentage": 0-100,
  "suggestions": [
    {
      "keyword": "string",
      "category": "string",
      "whereToAdd": "string",
      "relevance": 0-10
    }
  ]
}

Job Description:
${jobDescription}

Resume:
${resumeText}`;

    const response = await this.callOllama(prompt);
    return this.extractJSON(response);
  }

  _mockAnalyzeKeywords() {
    return {
      extractedKeywords: ['JavaScript', 'React', 'TypeScript', 'AWS'],
      matchedKeywords: ['JavaScript', 'React'],
      missingKeywords: ['TypeScript', 'AWS'],
      matchPercentage: 50,
      suggestions: [
        {
          keyword: 'TypeScript',
          category: 'skill',
          whereToAdd: 'Skills section',
          relevance: 9,
        },
      ],
    };
  }

  // ============================================
  // Rank Candidate
  // ============================================
  async rankCandidate(resumeData, jobDescription, candidateName) {
    if (this.aiMode === 'mock') {
      return this._mockRankCandidate();
    }
    if (this.aiMode === 'ollama') {
      return this._rankCandidateWithOllama(resumeData, jobDescription, candidateName);
    }
    throw new Error(`Unknown AI_MODE: ${this.aiMode}`);
  }

  async _rankCandidateWithOllama(resumeData, jobDescription, candidateName) {
    const prompt = `Rank candidate fit for job. Return ONLY valid JSON:

{
  "candidateName": "string",
  "overallScore": 0-100,
  "skills": [
    {"skillName": "string", "required": true/false, "matched": true/false, "relevanceScore": 0-10}
  ],
  "experience": {
    "requiredYears": number,
    "actualYears": number,
    "relevantExperienceYears": number,
    "matchScore": 0-100
  },
  "education": {
    "requiredLevel": "string",
    "actualLevel": "string",
    "matchScore": 0-100
  },
  "strengths": ["string"],
  "gaps": ["string"]
}

Job Requirements:
${jobDescription}

Candidate: ${candidateName}
Resume: ${JSON.stringify(resumeData, null, 2)}`;

    const response = await this.callOllama(prompt);
    return this.extractJSON(response);
  }

  _mockRankCandidate() {
    return {
      candidateName: 'John Doe',
      overallScore: 82,
      skills: [
        { skillName: 'JavaScript', required: true, matched: true, relevanceScore: 9 },
        { skillName: 'React', required: true, matched: true, relevanceScore: 8 },
        { skillName: 'TypeScript', required: false, matched: false, relevanceScore: 0 },
      ],
      experience: {
        requiredYears: 3,
        actualYears: 5,
        relevantExperienceYears: 5,
        matchScore: 85,
      },
      education: {
        requiredLevel: "Bachelor's",
        actualLevel: "Bachelor's",
        matchScore: 90,
      },
      strengths: ['5+ years experience', 'Strong in core techs'],
      gaps: ['No TypeScript', 'No AWS'],
    };
  }

  // ============================================
  // Check Bias
  // ============================================
  async checkBiasReduction(resumeText) {
    if (this.aiMode === 'mock') {
      return this._mockCheckBias();
    }
    if (this.aiMode === 'ollama') {
      return this._checkBiasWithOllama(resumeText);
    }
    throw new Error(`Unknown AI_MODE: ${this.aiMode}`);
  }

  async _checkBiasWithOllama(resumeText) {
    const prompt = `Analyze resume for bias and non-objective language.
Return ONLY valid JSON:

{
  "objectivityScore": 0-100,
  "formatBias": ["string"],
  "nameBias": ["string"],
  "recommendations": ["string"]
}

Resume:
${resumeText}`;

    const response = await this.callOllama(prompt);
    return this.extractJSON(response);
  }

  _mockCheckBias() {
    return {
      objectivityScore: 85,
      formatBias: [],
      nameBias: [],
      recommendations: ['Use objective language', 'Remove subjective adjectives'],
    };
  }

  // ============================================
  // Generate Recommendations
  // ============================================
  async generateRecommendations(resumeText, jobDescription) {
    if (this.aiMode === 'mock') {
      return this._mockGenerateRecommendations();
    }
    if (this.aiMode === 'ollama') {
      return this._generateRecommendationsWithOllama(resumeText, jobDescription);
    }
    throw new Error(`Unknown AI_MODE: ${this.aiMode}`);
  }

  async _generateRecommendationsWithOllama(resumeText, jobDescription) {
    const prompt = `Generate 5-10 specific recommendations to improve this resume for the job.
Return ONLY a JSON array of strings, no markdown:

["Recommendation 1", "Recommendation 2", ...]

Job Description:
${jobDescription}

Resume:
${resumeText}`;

    const response = await this.callOllama(prompt);
    const jsonArray = this.extractJSON(response);
    return Array.isArray(jsonArray) ? jsonArray : [jsonArray];
  }

  _mockGenerateRecommendations() {
    return [
      'Add more quantifiable metrics to experience',
      'Include specific technologies and frameworks',
      'Use action verbs to start bullet points',
      'Expand on achievements, not just duties',
      'Add certifications or continuous learning',
      'Highlight business impact and results',
    ];
  }
}

export default ResumeAIService;
