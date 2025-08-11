'use client';

import { motion } from 'framer-motion';
import { PersonalInfo } from '@/types/portfolio';
import { useTheme } from '../contexts/ThemeContext';

interface AboutProps {
  personalInfo: PersonalInfo;
}

export default function About({ personalInfo }: AboutProps) {
  const { theme } = useTheme();
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <>
      {/* About Me Section */}
      <section id="about" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={containerVariants}
            className="text-center mb-16"
          >
            <motion.h2
              variants={itemVariants}
              className={`text-4xl sm:text-5xl font-bold mb-6 ${
                theme === 'dark' ? 'text-white' : 'text-[#2d2d2d]'
              }`}
            >
              About Me
            </motion.h2>
            <motion.div
              variants={itemVariants}
              className={`w-24 h-1 mx-auto ${
                theme === 'dark' 
                  ? 'bg-gradient-to-r from-purple-400 to-blue-400' 
                  : 'bg-gradient-to-r from-[#8fbc8f] to-[#d2b48c]'
              }`}
            />
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left Column - Professional Summary Only */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8 }}
              className="h-full"
            >
              <div className={`backdrop-blur-sm rounded-2xl p-8 border h-full transition-colors duration-300 ${
                theme === 'dark' 
                  ? 'bg-white/5 border-white/10' 
                  : 'bg-[#faf8f0]/90 border-[#d2b48c]'
              }`}>
                <h3 className={`text-2xl font-semibold mb-4 ${
                  theme === 'dark' ? 'text-white' : 'text-[#2d2d2d]'
                }`}>Professional Summary</h3>
                <ul className={`list-disc pl-6 leading-relaxed text-lg ${
                  theme === 'dark' ? 'text-white/80' : 'text-[#2d2d2d]/80'
                }`}>
                  {personalInfo.summary.split(/\n+/).map((point, idx) => (
                    <li key={idx}>{point.trim()}</li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Right Column - Personal Background, Interests & Hobbies, What Drives Me */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8 }}
              className="h-full flex flex-col justify-between space-y-4"
            >
              {/* Personal Background */}
              <div className={`backdrop-blur-sm rounded-2xl p-6 border flex-1 transition-colors duration-300 ${
                theme === 'dark' 
                  ? 'bg-white/5 border-white/10' 
                  : 'bg-[#faf8f0]/90 border-[#d2b48c]'
              }`}>
                <h3 className={`text-xl font-semibold mb-3 ${
                  theme === 'dark' ? 'text-white' : 'text-[#2d2d2d]'
                }`}>
                  Personal Background
                </h3>
                <div className={`space-y-3 text-sm ${
                  theme === 'dark' ? 'text-white/80' : 'text-[#2d2d2d]/80'
                }`}>
                  <p>
                    <span className={`font-medium ${
                      theme === 'dark' ? 'text-purple-400' : 'text-[#8fbc8f]'
                    }`}>Native Place:</span> Moradabad, India
                  </p>
                  <p>
                    <span className={`font-medium ${
                      theme === 'dark' ? 'text-purple-400' : 'text-[#8fbc8f]'
                    }`}>Current Location:</span> Moved to Bangalore in 2022 for work
                  </p>
                  <p>
                    <span className={`font-medium ${
                      theme === 'dark' ? 'text-purple-400' : 'text-[#8fbc8f]'
                    }`}>Family:</span> Married to a biotechnological engineer
                  </p>
                  <p>
                    <span className={`font-medium ${
                      theme === 'dark' ? 'text-purple-400' : 'text-[#8fbc8f]'
                    }`}>Parents:</span> Run their own business in Moradabad
                  </p>
                </div>
              </div>

              {/* Interests & Hobbies */}
              <div className={`backdrop-blur-sm rounded-2xl p-6 border flex-1 transition-colors duration-300 ${
                theme === 'dark' 
                  ? 'bg-white/5 border-white/10' 
                  : 'bg-[#faf8f0]/90 border-[#d2b48c]'
              }`}>
                <h3 className={`text-xl font-semibold mb-4 ${
                  theme === 'dark' ? 'text-white' : 'text-[#2d2d2d]'
                }`}>
                  Interests & Hobbies
                </h3>
                <div className={`space-y-3 text-sm ${
                  theme === 'dark' ? 'text-white/80' : 'text-[#2d2d2d]/80'
                }`}>
                  <p>
                    <span className={`font-medium ${
                      theme === 'dark' ? 'text-purple-400' : 'text-[#8fbc8f]'
                    }`}>Technology:</span> AI/ML, Data Science, Cloud Computing
                  </p>
                  <p>
                    <span className={`font-medium ${
                      theme === 'dark' ? 'text-purple-400' : 'text-[#8fbc8f]'
                    }`}>Sports:</span> Cricket, Badminton, Swimming
                  </p>
                  <p>
                    <span className={`font-medium ${
                      theme === 'dark' ? 'text-purple-400' : 'text-[#8fbc8f]'
                    }`}>Reading:</span> Tech blogs, Business books, Sci-fi novels
                  </p>
                  <p>
                    <span className={`font-medium ${
                      theme === 'dark' ? 'text-purple-400' : 'text-[#8fbc8f]'
                    }`}>Travel:</span> Exploring new places, Cultural experiences
                  </p>
                </div>
              </div>

              {/* What Drives Me */}
              <div className={`backdrop-blur-sm rounded-2xl p-6 border flex-1 transition-colors duration-300 ${
                theme === 'dark' 
                  ? 'bg-white/5 border-white/10' 
                  : 'bg-[#faf8f0]/90 border-[#d2b48c]'
              }`}>
                <h3 className={`text-xl font-semibold mb-4 ${
                  theme === 'dark' ? 'text-white' : 'text-[#2d2d2d]'
                }`}>
                  What Drives Me
                </h3>
                <div className={`space-y-3 text-sm ${
                  theme === 'dark' ? 'text-white/80' : 'text-[#2d2d2d]/80'
                }`}>
                  <p>
                    <span className={`font-medium ${
                      theme === 'dark' ? 'text-purple-400' : 'text-[#8fbc8f]'
                    }`}>Innovation:</span> Creating cutting-edge AI solutions
                  </p>
                  <p>
                    <span className={`font-medium ${
                      theme === 'dark' ? 'text-purple-400' : 'text-[#8fbc8f]'
                    }`}>Impact:</span> Driving business transformation through data
                  </p>
                  <p>
                    <span className={`font-medium ${
                      theme === 'dark' ? 'text-purple-400' : 'text-[#8fbc8f]'
                    }`}>Learning:</span> Continuous skill development and growth
                  </p>
                  <p>
                    <span className={`font-medium ${
                      theme === 'dark' ? 'text-purple-400' : 'text-[#8fbc8f]'
                    }`}>Collaboration:</span> Working with diverse teams globally
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}