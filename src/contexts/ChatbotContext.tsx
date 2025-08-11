'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { ChatbotConfig, LLMProvider } from '@/types/portfolio';

interface ChatbotContextType {
  config: ChatbotConfig | null;
  providers: LLMProvider[];
  updateConfig: (config: ChatbotConfig) => void;
  isConfigured: boolean;
  isLoading: boolean;
}

const ChatbotContext = createContext<ChatbotContextType | undefined>(undefined);

export function ChatbotProvider({ children }: { children: React.ReactNode }) {
  const [config, setConfig] = useState<ChatbotConfig | null>(null);
  const [providers, setProviders] = useState<LLMProvider[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadProviders();
    loadStoredConfig();
  }, []);

  const loadProviders = async () => {
    try {
      const response = await fetch('/api/config');
      const data = await response.json();
      setProviders(data.providers);
    } catch (error) {
      console.error('Failed to load providers:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadStoredConfig = () => {
    try {
      const stored = localStorage.getItem('chatbot-config');
      if (stored) {
        setConfig(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Failed to load stored config:', error);
    }
  };

  const updateConfig = (newConfig: ChatbotConfig) => {
    setConfig(newConfig);
    try {
      localStorage.setItem('chatbot-config', JSON.stringify(newConfig));
    } catch (error) {
      console.error('Failed to store config:', error);
    }
  };

  const isConfigured = config !== null && 
    (config.provider === 'ollama' || (config.apiKey !== undefined && config.apiKey.length > 0));

  return (
    <ChatbotContext.Provider value={{
      config,
      providers,
      updateConfig,
      isConfigured,
      isLoading
    }}>
      {children}
    </ChatbotContext.Provider>
  );
}

export function useChatbot() {
  const context = useContext(ChatbotContext);
  if (!context) {
    throw new Error('useChatbot must be used within a ChatbotProvider');
  }
  return context;
}
