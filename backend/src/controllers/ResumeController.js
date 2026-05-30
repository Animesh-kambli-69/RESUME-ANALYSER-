import { ResumeAIService } from '../services/ResumeAIService.js';
import { FileProcessingService } from '../services/FileProcessingService.js';

const resumeAIService = new ResumeAIService();
const fileProcessingService = new FileProcessingService();

export class ResumeController {
  /**
   * Upload and analyze resume (Job Seeker Perspective)
   * POST /api/resume/analyze-job-seeker
   */
  static async analyzeForJobSeeker(req, res) {
    try {
      const file = req.file;
      const jobDescription = req.body.jobDescription || '';

      if (!file) {
        return res.status(400).json({ error: 'No file uploaded' });
      }

      // Extract text from file
      const resumeText = await fileProcessingService.extractText(file.path);

      // Parse resume
      const parsedResume = await resumeAIService.parseResume(resumeText);

      // Analyze ATS compatibility
      const atsAnalysis =
        await resumeAIService.analyzeAtsCompatibility(resumeText);

      // Analyze keywords if job description provided
      let keywordAnalysis = null;
      if (jobDescription) {
        keywordAnalysis = await resumeAIService.analyzeKeywords(
          resumeText,
          jobDescription
        );
      }

      // Check bias
      const biasAnalysis = await resumeAIService.checkBiasReduction(resumeText);

      // Generate recommendations
      const recommendations =
        await resumeAIService.generateRecommendations(resumeText, {
          atsAnalysis,
          keywordAnalysis,
          biasAnalysis,
        });

      // Cleanup file
      fileProcessingService.cleanupFile(file.path);

      res.json({
        success: true,
        data: {
          resumeData: parsedResume,
          analysis: {
            atsCompatibility: atsAnalysis,
            keywordAnalysis,
            biasReduction: biasAnalysis,
            recommendations,
          },
        },
      });
    } catch (error) {
      console.error('Error analyzing resume:', error);
      if (req.file) {
        fileProcessingService.cleanupFile(req.file.path);
      }
      res
        .status(500)
        .json({ error: error instanceof Error ? error.message : 'Unknown error' });
    }
  }

  /**
   * Analyze resume for recruiter (Candidate Ranking)
   * POST /api/resume/analyze-recruiter
   */
  static async analyzeForRecruiter(req, res) {
    try {
      const file = req.file;
      const jobDescription = req.body.jobDescription;
      const candidateName = req.body.candidateName || 'Candidate';

      if (!file) {
        return res.status(400).json({ error: 'No file uploaded' });
      }

      if (!jobDescription) {
        return res.status(400).json({ error: 'Job description required' });
      }

      // Extract text from file
      const resumeText = await fileProcessingService.extractText(file.path);

      // Parse resume
      const parsedResume = await resumeAIService.parseResume(resumeText);

      // Rank candidate
      const ranking = await resumeAIService.rankCandidate(
        parsedResume,
        jobDescription,
        candidateName
      );

      // Check bias for standardized evaluation
      const biasAnalysis = await resumeAIService.checkBiasReduction(resumeText);

      // Cleanup file
      fileProcessingService.cleanupFile(file.path);

      res.json({
        success: true,
        data: {
          candidateName,
          ranking,
          standardization: {
            objectivityScore: biasAnalysis.objectivityScore,
            formatBias: biasAnalysis.formatBias,
            nameBias: biasAnalysis.nameBias,
          },
        },
      });
    } catch (error) {
      console.error('Error analyzing for recruiter:', error);
      if (req.file) {
        fileProcessingService.cleanupFile(req.file.path);
      }
      res
        .status(500)
        .json({ error: error instanceof Error ? error.message : 'Unknown error' });
    }
  }

  /**
   * Extract resume data only
   * POST /api/resume/extract
   */
  static async extractResume(req, res) {
    try {
      const file = req.file;

      if (!file) {
        return res.status(400).json({ error: 'No file uploaded' });
      }

      // Extract text from file
      const resumeText = await fileProcessingService.extractText(file.path);

      // Parse resume
      const parsedResume = await resumeAIService.parseResume(resumeText);

      // Cleanup file
      fileProcessingService.cleanupFile(file.path);

      res.json({
        success: true,
        data: parsedResume,
      });
    } catch (error) {
      console.error('Error extracting resume:', error);
      if (req.file) {
        fileProcessingService.cleanupFile(req.file.path);
      }
      res
        .status(500)
        .json({ error: error instanceof Error ? error.message : 'Unknown error' });
    }
  }

  /**
   * Batch analyze multiple resumes for recruitment
   * POST /api/resume/batch-analyze
   */
  static async batchAnalyzeResumes(req, res) {
    try {
      const files = req.files;
      const jobDescription = req.body.jobDescription;

      if (!files || files.length === 0) {
        return res.status(400).json({ error: 'No files uploaded' });
      }

      if (!jobDescription) {
        return res.status(400).json({ error: 'Job description required' });
      }

      const results = [];

      for (const file of files) {
        try {
          const resumeText = await fileProcessingService.extractText(file.path);
          const parsedResume = await resumeAIService.parseResume(resumeText);
          const ranking = await resumeAIService.rankCandidate(
            parsedResume,
            jobDescription,
            parsedResume.contactInfo?.fullName || file.originalname
          );

          results.push({
            filename: file.originalname,
            candidateName: parsedResume.contactInfo?.fullName || 'Unknown',
            ranking,
          });

          fileProcessingService.cleanupFile(file.path);
        } catch (error) {
          console.error(`Error processing ${file.originalname}:`, error);
          results.push({
            filename: file.originalname,
            error: error instanceof Error ? error.message : 'Unknown error',
          });
        }
      }

      // Sort by overall score descending
      results.sort((a, b) => {
        const scoreA = a.ranking?.overallScore || 0;
        const scoreB = b.ranking?.overallScore || 0;
        return scoreB - scoreA;
      });

      res.json({
        success: true,
        data: {
          totalProcessed: results.length,
          results,
        },
      });
    } catch (error) {
      console.error('Error in batch analysis:', error);
      res
        .status(500)
        .json({ error: error instanceof Error ? error.message : 'Unknown error' });
    }
  }
}
