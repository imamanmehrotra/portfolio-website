import { LLMConfig } from './llmService';

export class BackendConfigService {
  private static instance: BackendConfigService;
  private config: LLMConfig | null = null;

  private constructor() {}

  static getInstance(): BackendConfigService {
    if (!BackendConfigService.instance) {
      BackendConfigService.instance = new BackendConfigService();
    }
    return BackendConfigService.instance;
  }

  getConfig(): LLMConfig {
    if (this.config) {
      return this.config;
    }

    // Priority order: OpenAI -> Groq -> Ollama
    
    // Check OpenAI
    if (process.env.OPENAI_API_KEY) {
      this.config = {
        provider: 'openai',
        apiKey: process.env.OPENAI_API_KEY,
        model: process.env.OPENAI_MODEL || 'gpt-4o-mini'
      };
      console.log('Using OpenAI configuration');
      return this.config;
    }

    // Check Groq
    if (process.env.GROQ_API_KEY) {
      this.config = {
        provider: 'groq',
        apiKey: process.env.GROQ_API_KEY,
        model: process.env.GROQ_MODEL || 'llama-3.1-8b-instant'
      };
      console.log('Using Groq configuration');
      return this.config;
    }

    // Fallback to Ollama
    this.config = {
      provider: 'ollama',
      baseUrl: process.env.OLLAMA_BASE_URL || 'http://localhost:11434',
      model: process.env.OLLAMA_MODEL || 'llama2'
    };
    console.log('Using Ollama configuration');
    return this.config;
  }

  isConfigured(): boolean {
    const config = this.getConfig();
    
    switch (config.provider) {
      case 'openai':
      case 'groq':
        return !!config.apiKey;
      case 'ollama':
        return true; // Ollama doesn't require API key
      default:
        return false;
    }
  }

  getProviderInfo(): { provider: string; model: string; configured: boolean } {
    const config = this.getConfig();
    return {
      provider: config.provider,
      model: config.model || 'unknown',
      configured: this.isConfigured()
    };
  }
}

export const backendConfigService = BackendConfigService.getInstance();
