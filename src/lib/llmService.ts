export interface LLMService {
  generateResponse(prompt: string, userMessage: string): Promise<string>;
}

export interface LLMConfig {
  provider: 'openai' | 'groq' | 'ollama';
  apiKey?: string;
  baseUrl?: string;
  model?: string;
}

export class OpenAIService implements LLMService {
  private apiKey: string;
  private model: string;

  constructor(apiKey: string, model: string = 'gpt-4o-mini') {
    this.apiKey = apiKey;
    this.model = model;
  }

  async generateResponse(prompt: string, userMessage: string): Promise<string> {
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          model: this.model,
          messages: [
            {
              role: 'system',
              content: prompt
            },
            {
              role: 'user',
              content: userMessage
            }
          ],
          temperature: 0.7,
          max_tokens: 500
        }),
      });

      if (!response.ok) {
        throw new Error(`OpenAI API error: ${response.status}`);
      }

      const data = await response.json();
      return data.choices[0]?.message?.content || "I'm sorry, I couldn't generate a response.";
    } catch (error) {
      console.error('OpenAI Service Error:', error);
      throw error;
    }
  }
}

export class GroqService implements LLMService {
  private apiKey: string;
  private model: string;

  constructor(apiKey: string, model: string = 'llama-3.1-8b-instant') {
    this.apiKey = apiKey;
    this.model = model;
  }

  async generateResponse(prompt: string, userMessage: string): Promise<string> {
    try {
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          model: this.model,
          messages: [
            {
              role: 'system',
              content: prompt
            },
            {
              role: 'user',
              content: userMessage
            }
          ],
          temperature: 0.7,
          max_tokens: 500
        }),
      });

      if (!response.ok) {
        throw new Error(`Groq API error: ${response.status}`);
      }

      const data = await response.json();
      return data.choices[0]?.message?.content || "I'm sorry, I couldn't generate a response.";
    } catch (error) {
      console.error('Groq Service Error:', error);
      throw error;
    }
  }
}

export class OllamaService implements LLMService {
  private baseUrl: string;
  private model: string;

  constructor(baseUrl: string = 'http://localhost:11434', model: string = 'llama2') {
    this.baseUrl = baseUrl;
    this.model = model;
  }

  async generateResponse(prompt: string, userMessage: string): Promise<string> {
    try {
      const response = await fetch(`${this.baseUrl}/api/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: this.model,
          prompt: `${prompt}\n\nUser: ${userMessage}\nAssistant:`,
          stream: false,
          options: {
            temperature: 0.7,
            num_predict: 500
          }
        }),
      });

      if (!response.ok) {
        throw new Error(`Ollama API error: ${response.status}`);
      }

      const data = await response.json();
      return data.response || "I'm sorry, I couldn't generate a response.";
    } catch (error) {
      console.error('Ollama Service Error:', error);
      throw error;
    }
  }
}

export class LLMServiceFactory {
  static createService(config: LLMConfig): LLMService {
    switch (config.provider) {
      case 'openai':
        if (!config.apiKey) throw new Error('OpenAI API key is required');
        return new OpenAIService(config.apiKey, config.model);
      
      case 'groq':
        if (!config.apiKey) throw new Error('Groq API key is required');
        return new GroqService(config.apiKey, config.model);
      
      case 'ollama':
        return new OllamaService(config.baseUrl, config.model);
      
      default:
        throw new Error(`Unsupported LLM provider: ${config.provider}`);
    }
  }
}
