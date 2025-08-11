import { NextResponse } from 'next/server';
import { backendConfigService } from '@/lib/backendConfigService';

export async function GET() {
  const providerInfo = backendConfigService.getProviderInfo();
  
  return NextResponse.json({
    message: 'Chatbot is configured on the backend',
    currentProvider: providerInfo.provider,
    currentModel: providerInfo.model,
    isConfigured: providerInfo.configured,
    note: 'Configuration is managed via environment variables on the server side'
  });
}
