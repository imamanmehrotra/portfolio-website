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

    // Generate response with timeout
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Response timeout')), 30000); // 30 second timeout
    });

    const responsePromise = chatbotService.generateResponse(message);
    
    const response = await Promise.race([responsePromise, timeoutPromise]) as string;

    // Ensure response is complete (not cut off)
    let finalResponse = response;
    if (response && !response.match(/[.!?]$/)) {
      // If response doesn't end with proper punctuation, it might be incomplete
      finalResponse = response + "...";
    }

    return NextResponse.json({ 
      response: finalResponse,
      provider: config.provider,
      model: config.model
    });
  } catch (error) {
    console.error('Chat API Error:', error);
    
    // Return a fallback response on error
    const fallbackResponse = "I'm experiencing some technical difficulties. Please try asking me about:\n\n• My **experience** and career journey\n• **Technical skills** and expertise\n• **Education** and background\n• **Personal** interests\n\nWhat interests you most?";
    
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
