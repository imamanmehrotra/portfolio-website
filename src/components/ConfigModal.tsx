'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  XMarkIcon, 
  CogIcon, 
  KeyIcon, 
  ServerIcon,
  CheckCircleIcon 
} from '@heroicons/react/24/outline';
import { useChatbot } from '@/contexts/ChatbotContext';
import { useTheme } from '@/contexts/ThemeContext';
import { ChatbotConfig } from '@/types/portfolio';

interface ConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ConfigModal({ isOpen, onClose }: ConfigModalProps) {
  const { theme } = useTheme();
  const { config, providers, updateConfig, isLoading } = useChatbot();
  
  const [formData, setFormData] = useState<ChatbotConfig>({
    provider: config?.provider || 'openai',
    model: config?.model || '',
    apiKey: config?.apiKey || '',
    baseUrl: config?.baseUrl || 'http://localhost:11434'
  });

  const [showApiKey, setShowApiKey] = useState(false);
  const [isValidating, setIsValidating] = useState(false);

  const selectedProvider = providers.find(p => p.id === formData.provider);

  const handleProviderChange = (providerId: string) => {
    const provider = providers.find(p => p.id === providerId);
    setFormData(prev => ({
      ...prev,
      provider: providerId as 'openai' | 'groq' | 'ollama',
      model: provider?.models[0] || '',
      apiKey: providerId === 'ollama' ? '' : prev.apiKey,
      baseUrl: providerId === 'ollama' ? 'http://localhost:11434' : prev.baseUrl
    }));
  };

  const handleSave = async () => {
    setIsValidating(true);
    
    try {
      // Validate configuration
      const response = await fetch('/api/config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const error = await response.json();
        alert(error.error || 'Configuration validation failed');
        return;
      }

      updateConfig(formData);
      onClose();
    } catch (error) {
      console.error('Configuration save error:', error);
      alert('Failed to save configuration');
    } finally {
      setIsValidating(false);
    }
  };

  if (isLoading) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            className={`w-full max-w-md rounded-2xl shadow-2xl ${
              theme === 'dark' 
                ? 'bg-slate-900 border border-slate-700' 
                : 'bg-[#faf8f0] border border-[#d2b48c]'
            }`}
          >
            {/* Header */}
            <div className={`flex items-center justify-between p-6 border-b ${
              theme === 'dark' ? 'border-white/10' : 'border-[#d2b48c]'
            }`}>
              <div className="flex items-center space-x-3">
                <CogIcon className={`w-6 h-6 ${
                  theme === 'dark' ? 'text-purple-400' : 'text-[#8fbc8f]'
                }`} />
                <h2 className={`text-lg font-semibold ${
                  theme === 'dark' ? 'text-white' : 'text-[#2d2d2d]'
                }`}>
                  Chatbot Configuration
                </h2>
              </div>
              <button
                onClick={onClose}
                className={`p-2 rounded-lg transition-colors ${
                  theme === 'dark' 
                    ? 'text-white/60 hover:text-white hover:bg-white/10' 
                    : 'text-[#6b7280] hover:text-[#2d2d2d] hover:bg-[#e8f5e8]'
                }`}
              >
                <XMarkIcon className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Provider Selection */}
              <div className="space-y-3">
                <label className={`text-sm font-medium ${
                  theme === 'dark' ? 'text-white' : 'text-[#2d2d2d]'
                }`}>
                  AI Provider
                </label>
                <div className="grid gap-3">
                  {providers.map((provider) => (
                    <button
                      key={provider.id}
                      onClick={() => handleProviderChange(provider.id)}
                      className={`p-4 rounded-lg border text-left transition-colors ${
                        formData.provider === provider.id
                          ? theme === 'dark'
                            ? 'border-purple-500 bg-purple-500/20'
                            : 'border-[#8fbc8f] bg-[#8fbc8f]/10'
                          : theme === 'dark'
                          ? 'border-white/20 hover:border-white/40'
                          : 'border-[#d2b48c] hover:border-[#8fbc8f]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className={`font-medium ${
                            theme === 'dark' ? 'text-white' : 'text-[#2d2d2d]'
                          }`}>
                            {provider.name}
                          </div>
                          <div className={`text-xs mt-1 ${
                            theme === 'dark' ? 'text-white/60' : 'text-[#6b7280]'
                          }`}>
                            {provider.description}
                          </div>
                        </div>
                        {formData.provider === provider.id && (
                          <CheckCircleIcon className="w-5 h-5 text-green-500" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Model Selection */}
              {selectedProvider && (
                <div className="space-y-3">
                  <label className={`text-sm font-medium ${
                    theme === 'dark' ? 'text-white' : 'text-[#2d2d2d]'
                  }`}>
                    Model
                  </label>
                  <select
                    value={formData.model}
                    onChange={(e) => setFormData(prev => ({ ...prev, model: e.target.value }))}
                    className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-purple-400 ${
                      theme === 'dark'
                        ? 'bg-white/10 border-white/20 text-white'
                        : 'bg-[#faf8f0] border-[#d2b48c] text-[#2d2d2d]'
                    }`}
                  >
                    {selectedProvider.models.map(model => (
                      <option key={model} value={model} className={
                        theme === 'dark' ? 'bg-slate-800' : 'bg-white'
                      }>
                        {model}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* API Key */}
              {selectedProvider?.requiresApiKey && (
                <div className="space-y-3">
                  <label className={`text-sm font-medium ${
                    theme === 'dark' ? 'text-white' : 'text-[#2d2d2d]'
                  }`}>
                    API Key
                  </label>
                  <div className="relative">
                    <KeyIcon className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${
                      theme === 'dark' ? 'text-white/40' : 'text-[#6b7280]'
                    }`} />
                    <input
                      type={showApiKey ? 'text' : 'password'}
                      value={formData.apiKey}
                      onChange={(e) => setFormData(prev => ({ ...prev, apiKey: e.target.value }))}
                      placeholder="Enter your API key"
                      className={`w-full pl-10 pr-20 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-purple-400 ${
                        theme === 'dark'
                          ? 'bg-white/10 border-white/20 text-white placeholder-white/40'
                          : 'bg-[#faf8f0] border-[#d2b48c] text-[#2d2d2d] placeholder-[#6b7280]'
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowApiKey(!showApiKey)}
                      className={`absolute right-3 top-1/2 transform -translate-y-1/2 text-xs ${
                        theme === 'dark' ? 'text-white/60 hover:text-white' : 'text-[#6b7280] hover:text-[#2d2d2d]'
                      }`}
                    >
                      {showApiKey ? 'Hide' : 'Show'}
                    </button>
                  </div>
                </div>
              )}

              {/* Ollama Base URL */}
              {formData.provider === 'ollama' && (
                <div className="space-y-3">
                  <label className={`text-sm font-medium ${
                    theme === 'dark' ? 'text-white' : 'text-[#2d2d2d]'
                  }`}>
                    Ollama URL
                  </label>
                  <div className="relative">
                    <ServerIcon className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${
                      theme === 'dark' ? 'text-white/40' : 'text-[#6b7280]'
                    }`} />
                    <input
                      type="text"
                      value={formData.baseUrl}
                      onChange={(e) => setFormData(prev => ({ ...prev, baseUrl: e.target.value }))}
                      placeholder="http://localhost:11434"
                      className={`w-full pl-10 pr-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-purple-400 ${
                        theme === 'dark'
                          ? 'bg-white/10 border-white/20 text-white placeholder-white/40'
                          : 'bg-[#faf8f0] border-[#d2b48c] text-[#2d2d2d] placeholder-[#6b7280]'
                      }`}
                    />
                  </div>
                </div>
              )}

              {/* Buttons */}
              <div className="flex space-x-3">
                <button
                  onClick={onClose}
                  className={`flex-1 px-4 py-2 rounded-lg border transition-colors ${
                    theme === 'dark'
                      ? 'border-white/20 text-white/60 hover:text-white hover:border-white/40'
                      : 'border-[#d2b48c] text-[#6b7280] hover:text-[#2d2d2d] hover:border-[#8fbc8f]'
                  }`}
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={isValidating}
                  className={`flex-1 px-4 py-2 rounded-lg bg-gradient-to-r transition-colors ${
                    theme === 'dark'
                      ? 'from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700'
                      : 'from-[#8fbc8f] to-[#d2b48c] hover:from-[#7aac7a] hover:to-[#c2a47c]'
                  } text-white font-medium ${isValidating ? 'opacity-50' : ''}`}
                >
                  {isValidating ? 'Validating...' : 'Save Configuration'}
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
