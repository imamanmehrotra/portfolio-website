'use client';

import { motion } from 'framer-motion';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { PersonalInfo } from '@/types/portfolio';
import { useTheme } from '../contexts/ThemeContext';

interface HeroProps {
  personalInfo: PersonalInfo;
}

export default function Hero({ personalInfo }: HeroProps) {
  const { theme } = useTheme();
  const scrollToAbout = () => {
    const element = document.querySelector('#about');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className={`absolute top-20 left-20 w-72 h-72 rounded-full blur-3xl animate-pulse ${
          theme === 'dark' ? 'bg-purple-500/20' : 'bg-[#8fbc8f]/20'
        }`} />
        <div className={`absolute bottom-20 right-20 w-96 h-96 rounded-full blur-3xl animate-pulse delay-1000 ${
          theme === 'dark' ? 'bg-blue-500/20' : 'bg-[#d2b48c]/20'
        }`} />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className={`text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 ${
              theme === 'dark' ? 'text-white' : 'text-[#2d2d2d]'
            }`}
          >
            Hi, I&apos;m{' '}
            <span className={`bg-clip-text text-transparent ${
              theme === 'dark' 
                ? 'bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400'
                : 'bg-gradient-to-r from-[#8fbc8f] via-[#d2b48c] to-[#6b7280]'
            }`}>
              {personalInfo.name}
            </span>
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className={`text-xl sm:text-2xl lg:text-3xl mb-6 font-medium ${
              theme === 'dark' ? 'text-purple-300' : 'text-[#8fbc8f]'
            }`}
          >
            {personalInfo.title}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className={`text-lg sm:text-xl mb-8 max-w-3xl mx-auto leading-relaxed ${
              theme === 'dark' ? 'text-white/80' : 'text-[#2d2d2d]/80'
            }`}
          >
            {personalInfo.tagline}
          </motion.p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToAbout}
            className={`px-8 py-4 font-semibold rounded-full transition-all duration-300 shadow-lg hover:shadow-xl ${
              theme === 'dark'
                ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700'
                : 'bg-gradient-to-r from-[#8fbc8f] to-[#d2b48c] text-white hover:from-[#7aac7a] hover:to-[#c2a47c]'
            }`}
          >
            Learn More About Me
          </motion.button>
          
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href={personalInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className={`px-8 py-4 border-2 font-semibold rounded-full transition-all duration-300 ${
              theme === 'dark'
                ? 'border-purple-400 text-purple-300 hover:bg-purple-400 hover:text-white'
                : 'border-[#8fbc8f] text-[#8fbc8f] hover:bg-[#8fbc8f] hover:text-white'
            }`}
          >
            View LinkedIn
          </motion.a>
        </motion.div>

        {/* Location and Contact Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className={`text-sm sm:text-base ${
            theme === 'dark' ? 'text-white/60' : 'text-[#6b7280]'
          }`}
        >
          <p className="mb-2">
            📍 {personalInfo.location}
          </p>
          <p className="mb-2">
            📧 {personalInfo.email}
          </p>
          <p>
            📱 {personalInfo.phone}
          </p>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.button
          onClick={scrollToAbout}
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className={`transition-colors ${
            theme === 'dark' ? 'text-white/60 hover:text-white' : 'text-[#6b7280] hover:text-[#2d2d2d]'
          }`}
        >
          <ChevronDownIcon className="h-8 w-8" />
        </motion.button>
      </motion.div>

      {/* Floating Elements */}
      <motion.div
        animate={{
          y: [0, -20, 0],
          rotate: [0, 5, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className={`absolute top-32 right-32 w-4 h-4 rounded-full opacity-60 ${
          theme === 'dark' ? 'bg-purple-400' : 'bg-[#228b22]'
        }`}
      />
      <motion.div
        animate={{
          y: [0, 20, 0],
          rotate: [0, -5, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className={`absolute bottom-32 left-32 w-3 h-3 rounded-full opacity-60 ${
          theme === 'dark' ? 'bg-blue-400' : 'bg-[#deb887]'
        }`}
      />
    </section>
  );
} 