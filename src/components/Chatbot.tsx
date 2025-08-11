'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChatBubbleLeftRightIcon, XMarkIcon, PaperAirplaneIcon } from '@heroicons/react/24/outline';
import { ChatMessage } from '@/types/portfolio';
import { useTheme } from '../contexts/ThemeContext';

export default function Chatbot() {
  const { theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hi! I&apos;m Aman&apos;s AI assistant. I can help you learn more about his experience, skills, projects, and background. What would you like to know?",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
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

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    // Simulate AI response based on user input
    setTimeout(() => {
      const response = generateAIResponse(inputValue);
      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1000);
  };

  const generateAIResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    if (input.includes('experience') || input.includes('work') || input.includes('job')) {
      return "Aman has extensive experience across multiple organizations. He&apos;s currently a Senior Manager at PepsiCo leading AI initiatives. Previously, he worked at State Street as Manager - AI/ML, Microsoft as Senior Data Scientist, Walmart Global Tech, Genpact, EXL, and started his career at ZS Associates in 2017. He specializes in AI adoption strategy, GenAI solutions, and has led initiatives across 65+ international markets.";
    }
    
    if (input.includes('skill') || input.includes('technology') || input.includes('tech')) {
      return "Aman&apos;s technical skills include Machine Learning, Deep Learning, GenAI, NLP/LLMs, Data Warehousing, and MLOps. His tool expertise covers Python, PySpark, SQL, TensorFlow, AWS, GCP, Azure, Databricks, Airflow, Power BI, and Tableau. He has domain experience in Healthcare Analytics, Financial Services, Retail Analytics, and Banking.";
    }
    
    if (input.includes('education') || input.includes('degree') || input.includes('university')) {
      return "Aman holds a Master&apos;s degree in Data Science from Liverpool John Moores University (2022-2024), a Postgraduate Degree in Data Science from IIIT Bangalore (2022-2023), and a B.Tech in Information Technology from KIET Group of Institutions (2013-2017).";
    }
    
    if (input.includes('certification') || input.includes('certified')) {
      return "Aman is Azure 2X Certified, has AWS Cloud Primer certification, Lean Six Sigma Green Belt, AMCAT Certified Business Analyst, and AMCAT Certified Corporate Communications Professional.";
    }
    
    if (input.includes('project') || input.includes('achievement') || input.includes('accomplishment')) {
      return "Key achievements include developing Text2Chart GenAI tool for financial document analysis, building automated EDA framework for data science teams, implementing MLOps monitoring for 100+ ML models, and leading AI initiatives across 65+ international markets. He&apos;s also a state-level Table Tennis player!";
    }
    
    if (input.includes('personal') || input.includes('hobby') || input.includes('interest')) {
      return "Aman is from Moradabad, India, and moved to Bangalore in 2022. He's married to a biotechnological engineer. His interests include playing Tabla, attending tech seminars, adventure sports, running, and he's a state-level Table Tennis player. His favorite food is Choley Bhaturey with Kulhad Lassi!";
    }
    
    if (input.includes('contact') || input.includes('email') || input.includes('linkedin')) {
      return "You can reach Aman at amansammehrotra@gmail.com or connect with him on LinkedIn at www.linkedin.com/in/aman-mehrotra-dataislife. He's currently based in Bangalore, Karnataka, India.";
    }
    
          return "I&apos;d be happy to help! You can ask me about Aman&apos;s experience, skills, education, projects, achievements, or personal background. What specific information are you looking for?";
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
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
              className={`w-full max-w-md h-96 rounded-2xl shadow-2xl flex flex-col ${
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
                    <h3 className={`font-semibold ${
                      theme === 'dark' ? 'text-white' : 'text-[#2d2d2d]'
                    }`}>Aman&apos;s AI Assistant</h3>
                    <p className={`text-xs ${
                      theme === 'dark' ? 'text-white/60' : 'text-[#6b7280]'
                    }`}>Ask me anything!</p>
                  </div>
                </div>
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

              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 h-[380px]">
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
                      <p className="text-sm leading-relaxed">{message.content}</p>
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
                      <div className="flex space-x-2">
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" />
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
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