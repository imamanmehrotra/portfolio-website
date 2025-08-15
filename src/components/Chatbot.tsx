'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChatBubbleLeftRightIcon, 
  XMarkIcon, 
  PaperAirplaneIcon,
  InformationCircleIcon
} from '@heroicons/react/24/outline';
import { ChatMessage } from '@/types/portfolio';
import { useTheme } from '../contexts/ThemeContext';

export default function Chatbot() {
  const { theme } = useTheme();
  
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hi! I'm Aman Mehrotra 👋\n\nI'm excited to chat with you! Ask me about:\n• My AI/Data Science journey\n• Technical skills & experience\n• Personal interests & background\n\nWhat would you like to know?",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [providerInfo, setProviderInfo] = useState<{provider: string, model: string} | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Load provider info when component mounts
  useEffect(() => {
    const loadProviderInfo = async () => {
      try {
        const response = await fetch('/api/config');
        const data = await response.json();
        if (data.isConfigured) {
          setProviderInfo({
            provider: data.currentProvider,
            model: data.currentModel
          });
        }
      } catch (error) {
        console.error('Failed to load provider info:', error);
      }
    };
    loadProviderInfo();
  }, []);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const currentInput = inputValue;
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: currentInput
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      // Update provider info if available
      if (data.provider && data.model) {
        setProviderInfo({
          provider: data.provider,
          model: data.model
        });
      }
      
      let responseContent = data.response || "I'm sorry, I couldn't generate a response at the moment.";
      
      // Ensure the response looks complete
      if (responseContent && responseContent.length > 50 && !responseContent.match(/[.!?:]$/)) {
        responseContent += "...";
      }
      
      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: responseContent,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "I'm experiencing some technical difficulties. Here are some things you can ask me about:\n\n• My **career experience** and roles\n• **Technical skills** and expertise\n• **Education** and certifications\n• **Personal** interests and hobbies\n\nPlease try again in a moment!",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const getProviderDisplayName = (provider: string) => {
    switch (provider) {
      case 'openai': return 'OpenAI';
      case 'groq': return 'Groq';
      case 'ollama': return 'Ollama';
      default: return provider;
    }
  };

  return (
    <>
      {/* Chat with Me Label */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.5 }}
        className={`fixed bottom-24 right-4 px-3 py-2 rounded-lg shadow-lg z-40 ${
          theme === 'dark'
            ? 'bg-slate-800 text-white border border-slate-600'
            : 'bg-white text-[#2d2d2d] border border-[#d2b48c] shadow-md'
        }`}
      >
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium">💬 Chat with Me</span>
          <div className="w-2 h-2 rounded-full animate-pulse" 
               style={{ backgroundColor: '#00FF00' }} />
        </div>
        {/* Arrow pointing to chat button */}
        <div className={`absolute -bottom-2 right-8 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent ${
          theme === 'dark' ? 'border-t-slate-800' : 'border-t-white'
        }`} />
      </motion.div>

      {/* Chat Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 w-16 h-16 rounded-full shadow-lg transition-all duration-300 z-50 ${
          theme === 'dark'
            ? 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700'
            : 'bg-gradient-to-r from-[#8fbc8f] to-[#d2b48c] hover:from-[#7aac7a] hover:to-[#c2a47c]'
        }`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <ChatBubbleLeftRightIcon className="w-8 h-8 text-white mx-auto" />
      </motion.button>

      {/* Chat Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end justify-end p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 50 }}
              className={`w-full max-w-md h-[32rem] rounded-2xl shadow-2xl flex flex-col ${
                theme === 'dark' 
                  ? 'bg-slate-900 border border-slate-700' 
                  : 'bg-[#faf8f0] border border-[#d2b48c]'
              }`}
            >
              {/* Chat Header */}
              <div className={`flex items-center justify-between p-4 border-b transition-colors duration-300 ${
                theme === 'dark' ? 'border-white/10' : 'border-[#d2b48c]'
              }`}>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                    <ChatBubbleLeftRightIcon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className={`font-semibold ${
                        theme === 'dark' ? 'text-white' : 'text-[#2d2d2d]'
                      }`}>Chat with Aman</h3>
                      <div className="w-2 h-2 rounded-full animate-pulse" 
                           style={{ backgroundColor: '#00FF00' }} />
                    </div>
                    <p className={`text-xs ${
                      theme === 'dark' ? 'text-white/60' : 'text-[#6b7280]'
                    }`}>
                      {providerInfo 
                        ? `Powered by ${getProviderDisplayName(providerInfo.provider)}`
                        : 'AI-powered assistant'
                      }
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {providerInfo && (
                    <div className="group relative">
                      <button
                        className={`p-2 rounded-lg transition-colors ${
                          theme === 'dark' 
                            ? 'text-white/60 hover:text-white hover:bg-white/10' 
                            : 'text-[#6b7280] hover:text-[#2d2d2d] hover:bg-[#e8f5e8]'
                        }`}
                        title="AI Provider Info"
                      >
                        <InformationCircleIcon className="w-4 h-4" />
                      </button>
                      <div className={`absolute right-0 top-10 w-48 p-2 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none ${
                        theme === 'dark' ? 'bg-slate-800 text-white' : 'bg-white text-gray-800'
                      }`}>
                        <p className="text-xs">
                          <strong>Provider:</strong> {getProviderDisplayName(providerInfo.provider)}<br/>
                          <strong>Model:</strong> {providerInfo.model}
                        </p>
                      </div>
                    </div>
                  )}
                  <button
                    onClick={() => setIsOpen(false)}
                    className={`p-2 rounded-lg transition-colors ${
                      theme === 'dark' 
                        ? 'text-white/60 hover:text-white hover:bg-white/10' 
                        : 'text-[#6b7280] hover:text-[#2d2d2d] hover:bg-[#e8f5e8]'
                    }`}
                  >
                    <XMarkIcon className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 h-[28rem]">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                        message.role === 'user'
                          ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
                          : theme === 'dark'
                          ? 'bg-white/10 text-white'
                          : 'bg-[#e8f5e8] text-[#2d2d2d]'
                      }`}
                    >
                      <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                      <p className={`text-xs mt-2 ${
                        message.role === 'user' 
                          ? 'text-white/70' 
                          : theme === 'dark' 
                          ? 'text-white/50' 
                          : 'text-[#6b7280]'
                      }`}>
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </motion.div>
                ))}
                
                {/* Loading Indicator */}
                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex justify-start"
                  >
                    <div className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                      theme === 'dark' ? 'bg-white/10' : 'bg-[#e8f5e8]'
                    }`}>
                      <div className="flex items-center space-x-2">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" />
                          <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                          <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                        </div>
                        <span className={`text-xs ${
                          theme === 'dark' ? 'text-white/60' : 'text-[#6b7280]'
                        }`}>
                          Aman is typing...
                        </span>
                      </div>
                    </div>
                  </motion.div>
                )}
                
                <div ref={messagesEndRef} />
              </div>

              {/* Chat Input */}
              <div className={`p-4 border-t transition-colors duration-300 ${
                theme === 'dark' ? 'border-white/10' : 'border-[#d2b48c]'
              }`}>
                <div className="flex space-x-3">
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your message..."
                    className={`flex-1 px-4 py-2 rounded-lg border transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent ${
                      theme === 'dark'
                        ? 'bg-white/10 border-white/20 text-white placeholder-white/50'
                        : 'bg-[#faf8f0]/80 border-[#d2b48c] text-[#2d2d2d] placeholder-[#6b7280]'
                    }`}
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!inputValue.trim() || isLoading}
                    className={`p-2 rounded-lg transition-colors ${
                      !inputValue.trim() || isLoading
                        ? 'opacity-50 cursor-not-allowed'
                        : 'hover:bg-purple-500 hover:text-white'
                    } ${
                      theme === 'dark' 
                        ? 'text-purple-400 hover:bg-purple-500/20' 
                        : 'text-[#8fbc8f] hover:bg-[#e8f5e8]'
                    }`}
                  >
                    <PaperAirplaneIcon className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
} 