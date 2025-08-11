import { NextRequest, NextResponse } from 'next/server';
import { chatbotService } from '@/lib/chatbotService';
import { backendConfigService } from '@/lib/backendConfigService';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message } = body;

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    // Get backend configuration
    const config = backendConfigService.getConfig();
    
    if (!backendConfigService.isConfigured()) {
      return NextResponse.json({
        response: "I'm currently experiencing configuration issues. Please contact the site administrator.",
        error: 'Backend configuration not available'
      }, { status: 200 });
    }

    // Initialize chatbot service with backend config
    if (!chatbotService.isReady()) {
      await chatbotService.initialize(config);
    }

    // Generate response
    const response = await chatbotService.generateResponse(message);

    return NextResponse.json({ 
      response,
      provider: config.provider,
      model: config.model
    });
  } catch (error) {
    console.error('Chat API Error:', error);
    
    // Return a fallback response on error
    const fallbackResponse = "I'm experiencing some technical difficulties right now. Please try asking me about my experience, skills, education, or personal background, and I'll do my best to help!";
    
    return NextResponse.json({ 
      response: fallbackResponse,
      error: 'Service temporarily unavailable'
    }, { status: 200 });
  }
}

export async function GET() {
  const providerInfo = backendConfigService.getProviderInfo();
  
  return NextResponse.json({
    message: 'Chatbot API is running',
    ...providerInfo,
    timestamp: new Date().toISOString()
  });
}
