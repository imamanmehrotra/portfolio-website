import { dataService } from './dataService';
import { LLMServiceFactory, LLMConfig, LLMService } from './llmService';

export class ChatbotService {
  private llmService: LLMService | null = null;
  private systemPrompt: string = '';
  private isInitialized: boolean = false;

  async initialize(config: LLMConfig): Promise<void> {
    try {
      // Load all data sources
      const data = await dataService.getAllData();
      
      // Create system prompt with all available data
      this.systemPrompt = dataService.formatDataForLLM(data);
      
      // Initialize LLM service
      this.llmService = LLMServiceFactory.createService(config);
      
      this.isInitialized = true;
    } catch (error) {
      console.error('Failed to initialize chatbot service:', error);
      throw error;
    }
  }

  async generateResponse(userMessage: string): Promise<string> {
    if (!this.isInitialized || !this.llmService) {
      throw new Error('Chatbot service not initialized. Call initialize() first.');
    }

    try {
      const response = await this.llmService.generateResponse(this.systemPrompt, userMessage);
      return response;
    } catch (error) {
      console.error('Error generating response:', error);
      return this.getFallbackResponse(userMessage);
    }
  }

  private getFallbackResponse(userMessage: string): string {
    const input = userMessage.toLowerCase();
    
    if (input.includes('experience') || input.includes('work') || input.includes('job')) {
      return "I have extensive experience across multiple organizations. I'm currently a Senior Manager at PepsiCo leading AI initiatives. Previously, I worked at State Street as Manager - AI/ML, Microsoft as Senior Data Scientist, Walmart Global Tech, Genpact, EXL, and started my career at ZS Associates in 2017. I specialize in AI adoption strategy, GenAI solutions, and have led initiatives across 65+ international markets.";
    }
    
    if (input.includes('skill') || input.includes('technology') || input.includes('tech')) {
      return "My technical skills include Machine Learning, Deep Learning, GenAI, NLP/LLMs, Data Warehousing, and MLOps. I'm proficient with Python, PySpark, SQL, TensorFlow, AWS, GCP, Azure, Databricks, Airflow, Power BI, and Tableau. I have domain experience in Healthcare Analytics, Financial Services, Retail Analytics, and Banking.";
    }
    
    if (input.includes('education') || input.includes('degree') || input.includes('university')) {
      return "I hold a Master's degree in Data Science from Liverpool John Moores University (2022-2024), a Postgraduate Degree in Data Science from IIIT Bangalore (2022-2023), and a B.Tech in Information Technology from KIET Group of Institutions (2013-2017).";
    }
    
    if (input.includes('personal') || input.includes('hobby') || input.includes('interest')) {
      return "I'm from Moradabad, India, and moved to Bangalore in 2022. I'm married to a biotechnological engineer. My interests include playing Tabla, attending tech seminars, adventure sports, running, and I'm a state-level Table Tennis player. My favorite food is Choley Bhaturey with Kulhad Lassi!";
    }
    
    if (input.includes('contact') || input.includes('email') || input.includes('linkedin')) {
      return "You can reach me at amansammehrotra@gmail.com or connect with me on LinkedIn at www.linkedin.com/in/aman-mehrotra-dataislife. I'm currently based in Bangalore, Karnataka, India.";
    }
    
    return "I'd be happy to help! You can ask me about my experience, skills, education, projects, achievements, or personal background. What specific information are you looking for?";
  }

  isReady(): boolean {
    return this.isInitialized && this.llmService !== null;
  }
}

export const chatbotService = new ChatbotService();
