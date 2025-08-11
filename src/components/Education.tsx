'use client';

import { motion } from 'framer-motion';
import { Education as EducationType } from '@/types/portfolio';
import { AcademicCapIcon } from '@heroicons/react/24/outline';
import { useTheme } from '../contexts/ThemeContext';

interface EducationProps {
  education: EducationType[];
}

export default function Education({ education }: EducationProps) {
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
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  const educationData = [
    {
      ...education[0],
      icon: '🎓',
      color: 'from-purple-500 to-pink-500',
      description: 'Advanced studies in Data Science with focus on machine learning, statistical analysis, and AI applications.',
      highlights: ['Machine Learning', 'Statistical Analysis', 'AI Applications', 'Research Methods']
    },
    {
      ...education[1],
      icon: '🏛️',
      color: 'from-blue-500 to-cyan-500',
      description: 'Specialized postgraduate program in Data Science covering advanced analytics and computational methods.',
      highlights: ['Advanced Analytics', 'Computational Methods', 'Data Engineering', 'ML Algorithms']
    },
    {
      ...education[2],
      icon: '🎯',
      color: 'from-green-500 to-emerald-500',
      description: 'Foundation in Information Technology with comprehensive understanding of software development and systems.',
      highlights: ['Software Development', 'Systems Architecture', 'Database Design', 'Web Technologies']
    }
  ];

  return (
    <section id="education" className="py-20 px-4 sm:px-6 lg:px-8">
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
            Education
          </motion.h2>
          <motion.div
            variants={itemVariants}
            className={`w-24 h-1 mx-auto ${
              theme === 'dark' 
                ? 'bg-gradient-to-r from-purple-400 to-blue-400' 
                : 'bg-gradient-to-r from-[#8fbc8f] to-[#d2b48c]'
            }`}
          />
          <motion.p
            variants={itemVariants}
            className={`text-xl mt-6 max-w-3xl mx-auto ${
              theme === 'dark' ? 'text-white/70' : 'text-[#6b7280]'
            }`}
          >
            A strong academic foundation that has been continuously enhanced through 
            practical experience and industry applications in data science and AI.
          </motion.p>
        </motion.div>

        {/* Education Cards */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
          className="grid lg:grid-cols-3 gap-8 mb-16"
        >
          {educationData.map((edu, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.02, y: -5 }}
              className={`backdrop-blur-sm rounded-2xl p-8 border hover:border-white/20 transition-all duration-300 relative overflow-hidden ${
                theme === 'dark' 
                  ? 'bg-white/5 border-white/10' 
                  : 'bg-[#faf8f0]/90 border-[#d2b48c]'
              }`}
            >
              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${edu.color} opacity-5`} />
              
              {/* Content */}
              <div className="relative z-10">
                {/* Header */}
                <div className="text-center mb-6">
                  <div className="text-5xl mb-4">{edu.icon}</div>
                  <h3 className={`text-xl font-bold mb-2 ${
                    theme === 'dark' ? 'text-white' : 'text-[#2d2d2d]'
                  }`}>{edu.institution}</h3>
                  <div className={`w-12 h-1 bg-gradient-to-r ${edu.color} mx-auto mb-3`} />
                </div>

                {/* Degree Info */}
                <div className="text-center mb-6">
                  <h4 className={`text-lg font-semibold mb-2 ${
                    theme === 'dark' ? 'text-purple-300' : 'text-[#8fbc8f]'
                  }`}>{edu.degree}</h4>
                  <p className={`text-sm ${
                    theme === 'dark' ? 'text-white/70' : 'text-[#6b7280]'
                  }`}>{edu.degree.split('·')[1]?.trim() || ''}</p>
                </div>

                {/* Description */}
                <p className={`text-sm leading-relaxed mb-6 text-center ${
                  theme === 'dark' ? 'text-white/80' : 'text-[#2d2d2d]/80'
                }`}>
                  {edu.description}
                </p>

                {/* Key Focus Areas */}
                <div className="space-y-2">
                  <h5 className={`text-sm font-semibold mb-3 ${
                    theme === 'dark' ? 'text-white/90' : 'text-[#2d2d2d]/90'
                  }`}>Key Focus Areas:</h5>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {edu.highlights.map((highlight, highlightIndex) => (
                      <span
                        key={highlightIndex}
                        className={`px-3 py-1 text-xs font-medium rounded-full ${
                          theme === 'dark' 
                            ? `bg-gradient-to-r ${edu.color} bg-opacity-20 text-white border border-opacity-30`
                            : 'bg-[#8fbc8f]/20 text-[#2d2d2d] border border-[#8fbc8f]/30'
                        }`}
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional Sections */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Professional Certifications */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className={`backdrop-blur-sm rounded-2xl p-8 border ${
              theme === 'dark' 
                ? 'bg-white/5 border-white/10' 
                : 'bg-[#faf8f0]/90 border-[#d2b48c]'
            }`}
          >
            <div className="flex items-center space-x-3 mb-6">
              <AcademicCapIcon className={`w-8 h-8 ${
                theme === 'dark' ? 'text-purple-400' : 'text-[#8fbc8f]'
              }`} />
              <h3 className={`text-2xl font-bold ${
                theme === 'dark' ? 'text-white' : 'text-[#2d2d2d]'
              }`}>Professional Certifications</h3>
            </div>
            <div className="space-y-4">
              {[
                'Azure 2X Certified',
                'AWS Cloud Primer',
                'Lean Six Sigma Green Belt',
                'AMCAT Certified Business Analyst',
                'AMCAT Certified Corporate Communications Professional'
              ].map((cert, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className={`w-2 h-2 rounded-full ${
                    theme === 'dark' ? 'bg-purple-400' : 'bg-[#8fbc8f]'
                  }`} />
                  <span className={`${
                    theme === 'dark' ? 'text-white/80' : 'text-[#2d2d2d]/80'
                  }`}>{cert}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Continuous Learning Journey */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className={`rounded-2xl p-8 border ${
              theme === 'dark'
                ? 'bg-gradient-to-r from-purple-500/10 to-blue-500/10 border-purple-400/20'
                : 'bg-gradient-to-r from-[#8fbc8f]/10 to-[#d2b48c]/10 border-[#8fbc8f]/20'
            }`}
          >
            <h3 className={`text-2xl font-bold mb-6 ${
              theme === 'dark' ? 'text-white' : 'text-[#2d2d2d]'
            }`}>Continuous Learning Journey</h3>
            <div className="space-y-4">
              {[
                {
                  step: 'Started with Information Technology',
                  description: 'Built foundation in software and systems',
                  color: theme === 'dark' ? 'bg-purple-400' : 'bg-[#8fbc8f]'
                },
                {
                  step: 'Advanced to Data Science',
                  description: 'Specialized in analytics and ML',
                  color: theme === 'dark' ? 'bg-blue-400' : 'bg-[#d2b48c]'
                },
                {
                  step: "Master's in Data Science",
                  description: 'Advanced research and applications',
                  color: theme === 'dark' ? 'bg-green-400' : 'bg-[#8fbc8f]'
                }
              ].map((item, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className={`w-3 h-3 rounded-full mt-2 flex-shrink-0 ${item.color}`} />
                  <div>
                    <p className={`font-medium ${
                      theme === 'dark' ? 'text-white' : 'text-[#2d2d2d]'
                    }`}>{item.step}</p>
                    <p className={`text-sm ${
                      theme === 'dark' ? 'text-white/70' : 'text-[#6b7280]'
                    }`}>{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Learning Philosophy */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <div className={`backdrop-blur-sm rounded-2xl p-8 border ${
            theme === 'dark' 
              ? 'bg-white/5 border-white/10' 
              : 'bg-[#faf8f0]/90 border-[#d2b48c]'
          }`}>
            <h3 className={`text-2xl font-bold mb-4 ${
              theme === 'dark' ? 'text-white' : 'text-[#2d2d2d]'
            }`}>My Learning Philosophy</h3>
            <p className={`text-lg max-w-4xl mx-auto leading-relaxed ${
              theme === 'dark' ? 'text-white/80' : 'text-[#6b7280]'
            }`}>
              I believe in continuous learning and practical application. My educational journey from Information Technology to Data Science reflects my commitment to staying at the forefront of technological innovation. Every degree and certification has been carefully chosen to complement my career goals and enhance my ability to deliver cutting-edge AI solutions.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <div className={`rounded-full px-6 py-2 ${
                theme === 'dark' ? 'bg-white/10 text-white/80' : 'bg-[#faf8f0]/80 text-[#2d2d2d]'
              }`}>
                <span className={`font-semibold ${
                  theme === 'dark' ? 'text-purple-300' : 'text-[#8fbc8f]'
                }`}>3</span> Degrees
              </div>
              <div className={`rounded-full px-6 py-2 ${
                theme === 'dark' ? 'bg-white/10 text-white/80' : 'bg-[#faf8f0]/80 text-[#2d2d2d]'
              }`}>
                <span className={`font-semibold ${
                  theme === 'dark' ? 'text-purple-300' : 'text-[#8fbc8f]'
                }`}>5</span> Certifications
              </div>
              <div className={`rounded-full px-6 py-2 ${
                theme === 'dark' ? 'bg-white/10 text-white/80' : 'bg-[#faf8f0]/80 text-[#2d2d2d]'
              }`}>
                <span className={`font-semibold ${
                  theme === 'dark' ? 'text-purple-300' : 'text-[#8fbc8f]'
                }`}>7+</span> Years Learning
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 