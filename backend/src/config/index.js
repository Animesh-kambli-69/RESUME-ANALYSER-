import dotenv from 'dotenv';

dotenv.config();

export const config = {
  server: {
    port: process.env.PORT || 5000,
    nodeEnv: process.env.NODE_ENV || 'development',
  },
  ai: {
    mode: process.env.AI_MODE || 'mock', // 'mock', 'ollama', or 'claude'
    claude: {
      apiKey: process.env.CLAUDE_API_KEY,
      model: process.env.CLAUDE_MODEL || 'claude-3-5-sonnet-20241022',
    },
    ollama: {
      url: process.env.OLLAMA_URL || 'http://localhost:11434/api/generate',
      model: process.env.OLLAMA_MODEL || 'mistral',
    },
  },
  upload: {
    maxFileSize: parseInt(process.env.MAX_FILE_SIZE || '10485760'),
    uploadDir: process.env.UPLOAD_DIR || './uploads',
  },
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  },
};

// Validate configuration based on AI mode
if (config.ai.mode === 'claude' && !process.env.CLAUDE_API_KEY) {
  console.warn('⚠️  AI_MODE=claude but CLAUDE_API_KEY is not set!');
}

if (config.ai.mode === 'ollama') {
  console.log(`✅ Using Ollama LLM at ${config.ai.ollama.url}`);
  console.log(`   Model: ${config.ai.ollama.model}`);
  console.log(`   Make sure Ollama is running: ollama serve`);
}

if (config.ai.mode === 'mock') {
  console.log('✅ Using mock AI (fake responses for testing)');
}
