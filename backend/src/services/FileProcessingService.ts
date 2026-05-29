import * as fs from "fs";
import * as path from "path";
import * as pdf from "pdf-parse";

export class FileProcessingService {
  /**
   * Extract text from PDF file
   */
  async extractTextFromPdf(filePath: string): Promise<string> {
    try {
      const dataBuffer = fs.readFileSync(filePath);
      const data = await pdf(dataBuffer);
      return data.text;
    } catch (error) {
      console.error("Error extracting PDF text:", error);
      throw new Error("Failed to extract text from PDF");
    }
  }

  /**
   * Extract text from DOCX file
   */
  async extractTextFromDocx(filePath: string): Promise<string> {
    try {
      // Using a simple approach - in production, use a proper DOCX library
      const { Document } = require("docx");
      const fs = require("fs").promises;

      const fileContent = await fs.readFile(filePath);
      // This is a simplified version - implement proper DOCX parsing
      return fileContent.toString("utf-8");
    } catch (error) {
      console.error("Error extracting DOCX text:", error);
      throw new Error("Failed to extract text from DOCX");
    }
  }

  /**
   * Extract text from TXT file
   */
  async extractTextFromTxt(filePath: string): Promise<string> {
    try {
      return fs.readFileSync(filePath, "utf-8");
    } catch (error) {
      console.error("Error reading TXT file:", error);
      throw new Error("Failed to read TXT file");
    }
  }

  /**
   * Route to appropriate extraction method based on file type
   */
  async extractText(filePath: string): Promise<string> {
    const ext = path.extname(filePath).toLowerCase();

    switch (ext) {
      case ".pdf":
        return this.extractTextFromPdf(filePath);
      case ".docx":
        return this.extractTextFromDocx(filePath);
      case ".txt":
        return this.extractTextFromTxt(filePath);
      default:
        throw new Error(`Unsupported file type: ${ext}`);
    }
  }

  /**
   * Validate file size
   */
  validateFileSize(filePath: string, maxSizeBytes: number): boolean {
    const stats = fs.statSync(filePath);
    return stats.size <= maxSizeBytes;
  }

  /**
   * Validate file type
   */
  validateFileType(
    filePath: string,
    allowedTypes: string[] = [".pdf", ".docx", ".txt"]
  ): boolean {
    const ext = path.extname(filePath).toLowerCase();
    return allowedTypes.includes(ext);
  }

  /**
   * Clean up temporary file
   */
  cleanupFile(filePath: string): void {
    try {
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    } catch (error) {
      console.error("Error cleaning up file:", error);
    }
  }
}
