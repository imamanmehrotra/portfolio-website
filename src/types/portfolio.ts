export interface PersonalInfo {
  name: string;
  title: string;
  tagline: string;
  summary: string;
  location: string;
  email: string;
  phone: string;
  linkedin: string;
  interests: string[];
  favorite_food: string;
  family: {
    wife: string;
    parents: string;
  };
}

export interface Skills {
  technical: string[];
  tools: string[];
  domains: string[];
}

export interface Experience {
  company: string;
  role: string;
  duration: string;
  location: string;
  description: string[];
}

export interface Education {
  institution: string;
  degree: string;
}

export interface PortfolioData {
  personal_info: PersonalInfo;
  skills: Skills;
  certifications: string[];
  experience: Experience[];
  education: Education[];
  achievements: string[];
  last_updated: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface ChatbotConfig {
  provider: 'openai' | 'groq' | 'ollama';
  model?: string;
  apiKey?: string;
  baseUrl?: string;
}

export interface LLMProvider {
  id: string;
  name: string;
  models: string[];
  requiresApiKey: boolean;
  description: string;
} 