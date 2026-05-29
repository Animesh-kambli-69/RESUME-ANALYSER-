import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({
  apiKey: process.env.CLAUDE_API_KEY,
});

export class ResumeAIService {
  private model = process.env.CLAUDE_MODEL || "claude-3-5-sonnet-20241022";

  /**
   * Extract and parse resume data from raw text using Claude AI
   */
  async parseResume(resumeText: string) {
    const message = await client.messages.create({
      model: this.model,
      max_tokens: 2048,
      messages: [
        {
          role: "user",
          content: `Parse the following resume text and extract structured data. Return a JSON object with the following structure:
{
  "contactInfo": {
    "fullName": string,
    "email": string,
    "phone": string,
    "location": string,
    "linkedin": string,
    "portfolio": string
  },
  "summary": string,
  "experience": [
    {
      "jobTitle": string,
      "company": string,
      "location": string,
      "startDate": string,
      "endDate": string,
      "currentlyWorking": boolean,
      "description": string[],
      "keywords": string[]
    }
  ],
  "education": [
    {
      "degree": string,
      "institution": string,
      "location": string,
      "graduationDate": string,
      "cgpa": string,
      "fieldOfStudy": string
    }
  ],
  "skills": [
    {
      "name": string,
      "category": "technical" | "soft" | "language" | "tool",
      "proficiencyLevel": "beginner" | "intermediate" | "advanced" | "expert"
    }
  ],
  "certifications": [
    {
      "name": string,
      "issuingOrganization": string,
      "issueDate": string,
      "expiryDate": string,
      "credentialId": string,
      "credentialUrl": string
    }
  ]
}

Resume Text:
${resumeText}

Return ONLY valid JSON, no additional text.`,
        },
      ],
    });

    try {
      const jsonText =
        message.content[0].type === "text" ? message.content[0].text : "";
      return JSON.parse(jsonText);
    } catch (error) {
      console.error("Error parsing Claude response:", error);
      throw new Error("Failed to parse resume data");
    }
  }

  /**
   * Analyze ATS compatibility of resume
   */
  async analyzeAtsCompatibility(resumeText: string) {
    const message = await client.messages.create({
      model: this.model,
      max_tokens: 1500,
      messages: [
        {
          role: "user",
          content: `Analyze the following resume for ATS (Applicant Tracking System) compatibility. Return a JSON object:
{
  "score": number (0-100),
  "passesAts": boolean,
  "issues": [
    {
      "severity": "critical" | "warning" | "info",
      "title": string,
      "description": string,
      "suggestion": string
    }
  ],
  "recommendations": [string]
}

Focus on:
- Formatting issues that break ATS parsing
- Missing standard sections
- Unreadable fonts or symbols
- Multi-column layouts
- Tables and graphics
- Font size and spacing issues

Resume Text:
${resumeText}

Return ONLY valid JSON, no additional text.`,
        },
      ],
    });

    try {
      const jsonText =
        message.content[0].type === "text" ? message.content[0].text : "";
      return JSON.parse(jsonText);
    } catch (error) {
      console.error("Error parsing ATS analysis:", error);
      throw new Error("Failed to analyze ATS compatibility");
    }
  }

  /**
   * Analyze keywords match between resume and job description
   */
  async analyzeKeywords(resumeText: string, jobDescription: string) {
    const message = await client.messages.create({
      model: this.model,
      max_tokens: 1500,
      messages: [
        {
          role: "user",
          content: `Compare the resume with the job description and analyze keyword matches. Return JSON:
{
  "extractedKeywords": [string],
  "matchedKeywords": [string],
  "missingKeywords": [string],
  "matchPercentage": number (0-100),
  "suggestions": [
    {
      "keyword": string,
      "category": string,
      "whereToAdd": string,
      "relevance": number (0-10)
    }
  ]
}

Job Description:
${jobDescription}

Resume:
${resumeText}

Extract key skills, certifications, and technologies from the job description.
Identify which are present in the resume.
Suggest where missing keywords should be added.

Return ONLY valid JSON, no additional text.`,
        },
      ],
    });

    try {
      const jsonText =
        message.content[0].type === "text" ? message.content[0].text : "";
      return JSON.parse(jsonText);
    } catch (error) {
      console.error("Error parsing keyword analysis:", error);
      throw new Error("Failed to analyze keywords");
    }
  }

  /**
   * Rank candidate against job requirements
   */
  async rankCandidate(
    resumeData: any,
    jobDescription: string,
    candidateName: string
  ) {
    const message = await client.messages.create({
      model: this.model,
      max_tokens: 2000,
      messages: [
        {
          role: "user",
          content: `Rank this candidate against job requirements. Return JSON:
{
  "candidateName": string,
  "overallScore": number (0-100),
  "skills": [
    {
      "skillName": string,
      "required": boolean,
      "matched": boolean,
      "relevanceScore": number (0-10)
    }
  ],
  "experience": {
    "requiredYears": number,
    "actualYears": number,
    "relevantExperienceYears": number,
    "matchScore": number (0-100)
  },
  "education": {
    "requiredLevel": string,
    "actualLevel": string,
    "matchScore": number (0-100)
  },
  "strengths": [string],
  "gaps": [string]
}

Job Description:
${jobDescription}

Resume Data:
${JSON.stringify(resumeData, null, 2)}

Candidate Name: ${candidateName}

Analyze the fit based on skills match, experience level, and education.
Calculate years of experience from dates.

Return ONLY valid JSON, no additional text.`,
        },
      ],
    });

    try {
      const jsonText =
        message.content[0].type === "text" ? message.content[0].text : "";
      return JSON.parse(jsonText);
    } catch (error) {
      console.error("Error parsing candidate ranking:", error);
      throw new Error("Failed to rank candidate");
    }
  }

  /**
   * Check for bias in resume presentation
   */
  async checkBiasReduction(resumeText: string) {
    const message = await client.messages.create({
      model: this.model,
      max_tokens: 1200,
      messages: [
        {
          role: "user",
          content: `Analyze the resume for potential bias triggers and assess objectivity. Return JSON:
{
  "objectivityScore": number (0-100),
  "formatBias": [string],
  "nameBias": [string],
  "recommendations": [string]
}

Focus on:
- Excessive formatting that might trigger name bias
- Unnecessary personal information
- Objective vs subjective language
- Standardization opportunities
- Data presentation clarity

Resume Text:
${resumeText}

Return ONLY valid JSON, no additional text.`,
        },
      ],
    });

    try {
      const jsonText =
        message.content[0].type === "text" ? message.content[0].text : "";
      return JSON.parse(jsonText);
    } catch (error) {
      console.error("Error parsing bias analysis:", error);
      throw new Error("Failed to analyze bias");
    }
  }

  /**
   * Generate recommendations for resume improvement
   */
  async generateRecommendations(resumeText: string, analysisResults: any) {
    const message = await client.messages.create({
      model: this.model,
      max_tokens: 1500,
      messages: [
        {
          role: "user",
          content: `Based on the resume and analysis results, provide 5-10 actionable recommendations for improvement.

Resume:
${resumeText}

Analysis Results:
${JSON.stringify(analysisResults, null, 2)}

Return a JSON array of strings with specific, actionable recommendations:
["recommendation 1", "recommendation 2", ...]

Return ONLY valid JSON array, no additional text.`,
        },
      ],
    });

    try {
      const jsonText =
        message.content[0].type === "text" ? message.content[0].text : "";
      return JSON.parse(jsonText);
    } catch (error) {
      console.error("Error generating recommendations:", error);
      throw new Error("Failed to generate recommendations");
    }
  }
}
