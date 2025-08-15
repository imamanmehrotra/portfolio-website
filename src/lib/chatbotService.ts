import { dataService } from './dataService';
import { LLMServiceFactory, LLMConfig, LLMService } from './llmService';

export class ChatbotService {
  private llmService: LLMService | null = null;
  private systemPrompt: string = '';
  private isInitialized: boolean = false;
  private responseCache: Map<string, string> = new Map();
  private conversationHistory: Array<{role: 'user' | 'assistant', content: string}> = [];

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

    // Check cache for quick responses to common questions
    const cacheKey = userMessage.toLowerCase().trim();
    if (this.responseCache.has(cacheKey)) {
      const cachedResponse = this.responseCache.get(cacheKey)!;
      this.updateConversationHistory(userMessage, cachedResponse);
      return cachedResponse;
    }

    try {
      // Add conversation context to the prompt if available
      let contextualPrompt = this.systemPrompt;
      if (this.conversationHistory.length > 0) {
        const recentHistory = this.conversationHistory.slice(-4); // Last 2 exchanges
        const historyString = recentHistory
          .map(entry => `${entry.role === 'user' ? 'User' : 'Assistant'}: ${entry.content}`)
          .join('\n');
        
        contextualPrompt += `\n\nRecent conversation context:\n${historyString}\n\n`;
      }
      
      const response = await this.llmService.generateResponse(contextualPrompt, userMessage);
      
      // Validate response quality
      if (!response || response.trim().length < 10) {
        console.warn('Received short or empty response, using fallback');
        const fallbackResponse = this.getFallbackResponse(userMessage);
        this.updateConversationHistory(userMessage, fallbackResponse);
        return fallbackResponse;
      }
      
      // Clean up the response
      let cleanedResponse = response.trim();
      
      // Ensure proper formatting for bullet points
      cleanedResponse = cleanedResponse.replace(/^\*\s+/gm, '• ');
      cleanedResponse = cleanedResponse.replace(/^-\s+/gm, '• ');
      
      // Cache common responses
      if (userMessage.length < 100) { // Only cache shorter questions
        this.responseCache.set(cacheKey, cleanedResponse);
      }
      
      // Update conversation history
      this.updateConversationHistory(userMessage, cleanedResponse);
      
      return cleanedResponse;
    } catch (error) {
      console.error('Error generating response:', error);
      const fallbackResponse = this.getFallbackResponse(userMessage);
      this.updateConversationHistory(userMessage, fallbackResponse);
      return fallbackResponse;
    }
  }

  private updateConversationHistory(userMessage: string, assistantResponse: string): void {
    this.conversationHistory.push(
      { role: 'user', content: userMessage },
      { role: 'assistant', content: assistantResponse }
    );
    
    // Keep only the last 10 exchanges (20 entries)
    if (this.conversationHistory.length > 20) {
      this.conversationHistory = this.conversationHistory.slice(-20);
    }
  }

  private getFallbackResponse(userMessage: string): string {
    const input = userMessage.toLowerCase();
    
    if (input.includes('experience') || input.includes('work') || input.includes('job')) {
      return "I'm currently a Senior Manager at PepsiCo leading AI initiatives across 65+ markets.\n\n• Previously: State Street (Manager - AI/ML), Microsoft (Senior Data Scientist), Walmart Global Tech\n• Started my career at ZS Associates in 2017\n• Specialize in AI adoption strategy and GenAI solutions\n\nWhat specific aspect of my experience interests you?";
    }
    
    if (input.includes('skill') || input.includes('technology') || input.includes('tech')) {
      return "My core technical expertise includes:\n\n• **AI/ML**: Machine Learning, Deep Learning, GenAI, NLP/LLMs\n• **Tools**: Python, PySpark, SQL, TensorFlow, AWS, GCP, Azure\n• **Platforms**: Databricks, Airflow, Power BI, Tableau\n• **Domains**: Healthcare Analytics, Financial Services, Retail\n\nWant to know more about any specific technology?";
    }
    
    if (input.includes('education') || input.includes('degree') || input.includes('university')) {
      return "My educational background:\n\n• **Master's in Data Science** - Liverpool John Moores University (2022-2024)\n• **PG in Data Science** - IIIT Bangalore (2022-2023)\n• **B.Tech IT** - KIET Group of Institutions (2013-2017)\n\nAny specific questions about my studies?";
    }
    
    if (input.includes('personal') || input.includes('hobby') || input.includes('interest')) {
      return "Here's a bit about me personally:\n\n• From Moradabad, India (moved to Bangalore in 2022)\n• Married to a biotechnological engineer\n• Love playing Tabla and state-level Table Tennis player\n• Enjoy adventure sports, running, and tech seminars\n• Favorite food: Choley Bhaturey with Kulhad Lassi! 🍛\n\nWhat would you like to know more about?";
    }
    
    if (input.includes('contact') || input.includes('email') || input.includes('linkedin')) {
      return "Let's connect!\n\n• **Email**: amansammehrotra@gmail.com\n• **LinkedIn**: www.linkedin.com/in/aman-mehrotra-dataislife\n• **Location**: Bangalore, Karnataka, India\n\nFeel free to reach out anytime!";
    }
    
    return "I'd be happy to help! Ask me about:\n\n• My **experience** across different companies\n• **Technical skills** and expertise\n• **Education** and certifications\n• **Personal** interests and background\n• **Contact** information\n\nWhat interests you most?";
  }

  isReady(): boolean {
    return this.isInitialized && this.llmService !== null;
  }

  clearConversationHistory(): void {
    this.conversationHistory = [];
  }

  getCacheSize(): number {
    return this.responseCache.size;
  }

  clearCache(): void {
    this.responseCache.clear();
  }
}

export const chatbotService = new ChatbotService();
