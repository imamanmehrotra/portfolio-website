'use client';

import { motion } from 'framer-motion';
import { Experience as ExperienceType } from '@/types/portfolio';
import { MapPinIcon, CalendarIcon, BuildingOfficeIcon } from '@heroicons/react/24/outline';
import { useTheme } from '../contexts/ThemeContext';

interface ExperienceProps {
  experience: ExperienceType[];
}

export default function Experience({ experience }: ExperienceProps) {
  const { theme } = useTheme();
  
  // Function to get company icon path
  const getCompanyIcon = (company: string) => {
    const iconMap: { [key: string]: string } = {
      'PepsiCo': '/PepsiCo_Icon.png',
      'State Street': '/State-street_icon.svg',
      'Microsoft': '/Microsoft_icon.png',
      'Walmart Global Tech India': '/Walmart_Icon.png',
      'Genpact': '/Genpact_Icon.png',
      'EXL': '/EXL_Service_icon.png',
      'ZS Associates': '/ZS_Associates_icon.png',
    };
    return iconMap[company] || '/building-office.svg'; // fallback icon
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8">
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
            Work Experience
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

        <div className="relative">
          {/* Timeline Line */}
          <div className={`absolute left-8 top-0 bottom-0 w-0.5 ${
            theme === 'dark' 
              ? 'bg-gradient-to-b from-purple-400 via-blue-400 to-purple-400' 
              : 'bg-gradient-to-b from-[#8fbc8f] via-[#d2b48c] to-[#8fbc8f]'
          }`} />

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={containerVariants}
            className="space-y-12"
          >
            {experience.map((exp, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="relative flex items-start flex-row"
              >
                {/* Timeline Dot with Company Icon */}
                <div className={`absolute left-4 top-8 w-8 h-8 backdrop-blur-sm rounded-full border-4 z-10 p-1 flex items-center justify-center ${
                  theme === 'dark' 
                    ? 'bg-white/10 border-slate-900' 
                    : 'bg-[#faf8f0]/90 border-[#d2b48c]'
                }`}>
                  <img
                    src={getCompanyIcon(exp.company)}
                    alt={`${exp.company} logo`}
                    className="w-full h-full object-contain rounded-full"
                    onError={(e) => {
                      // Fallback to gradient dot
                      (e.target as HTMLImageElement).style.display = 'none';
                      if (theme === 'dark') {
                        (e.target as HTMLImageElement).parentElement!.style.background = 'linear-gradient(135deg, rgb(168, 85, 247), rgb(59, 130, 246))';
                      } else {
                        (e.target as HTMLImageElement).parentElement!.style.background = 'linear-gradient(135deg, #8fbc8f, #d2b48c)';
                      }
                    }}
                  />
                </div>

                {/* Content Card */}
                <div className="flex-1 ml-16">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className={`backdrop-blur-sm rounded-2xl p-8 border transition-all duration-300 ${
                      theme === 'dark' 
                        ? 'bg-white/5 border-white/10 hover:border-purple-400/30' 
                        : 'bg-[#faf8f0]/90 border-[#d2b48c] hover:border-[#8fbc8f]/50'
                    }`}
                  >
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0">
                          <div className={`w-16 h-16 rounded-xl backdrop-blur-sm border p-2 flex items-center justify-center ${
                            theme === 'dark' 
                              ? 'bg-white/10 border-white/20' 
                              : 'bg-[#faf8f0]/80 border-[#d2b48c]'
                          }`}>
                            <img
                              src={getCompanyIcon(exp.company)}
                              alt={`${exp.company} logo`}
                              className="w-full h-full object-contain rounded-lg"
                            />
                          </div>
                        </div>
                        <div>
                          <h3 className={`text-2xl font-bold mb-2 ${
                            theme === 'dark' ? 'text-white' : 'text-[#2d2d2d]'
                          }`}>
                            {exp.role}
                          </h3>
                          <div className={`flex items-center space-x-4 ${
                            theme === 'dark' ? 'text-purple-300' : 'text-[#8fbc8f]'
                          }`}>
                            <div className="flex items-center space-x-2">
                              <BuildingOfficeIcon className="w-5 h-5" />
                              <span className="font-semibold">{exp.company}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 sm:mt-0 text-right">
                        <div className={`flex items-center justify-end space-x-2 mb-2 ${
                          theme === 'dark' ? 'text-white/70' : 'text-[#6b7280]'
                        }`}>
                          <CalendarIcon className="w-4 h-4" />
                          <span className="text-sm">{exp.duration}</span>
                        </div>
                        <div className={`flex items-center justify-end space-x-2 ${
                          theme === 'dark' ? 'text-white/70' : 'text-[#6b7280]'
                        }`}>
                          <MapPinIcon className="w-4 h-4" />
                          <span className="text-sm">{exp.location}</span>
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <div className="space-y-3">
                      {exp.description.map((desc, idx) => (
                        <div key={idx} className="flex items-start space-x-3">
                          <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                            theme === 'dark' ? 'bg-purple-400' : 'bg-[#8fbc8f]'
                          }`} />
                          <p className={`leading-relaxed ${
                            theme === 'dark' ? 'text-white/80' : 'text-[#2d2d2d]/80'
                          }`}>
                            {desc}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Company Badge */}
                    <div className={`mt-6 pt-6 border-t ${
                      theme === 'dark' ? 'border-white/10' : 'border-[#d2b48c]'
                    }`}>
                      <div className="flex items-center space-x-3">
                        <div className={`w-8 h-8 rounded-lg p-1 flex items-center justify-center ${
                          theme === 'dark' 
                            ? 'bg-white/10' 
                            : 'bg-[#faf8f0]/80'
                        }`}>
                          <img
                            src={getCompanyIcon(exp.company)}
                            alt={`${exp.company} logo`}
                            className="w-full h-full object-contain rounded"
                          />
                        </div>
                        <span className={`inline-block px-4 py-2 rounded-full text-sm font-medium border ${
                          theme === 'dark' 
                            ? 'bg-gradient-to-r from-purple-500/20 to-blue-500/20 text-purple-300 border-purple-400/30'
                            : 'bg-gradient-to-r from-[#8fbc8f]/20 to-[#d2b48c]/20 text-[#8fbc8f] border-[#8fbc8f]/30'
                        }`}>
                          {exp.company}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Career Summary */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="mt-20 text-center"
        >
          <div className={`rounded-2xl p-8 border transition-colors duration-300 ${
            theme === 'dark'
              ? 'bg-gradient-to-r from-purple-500/10 to-blue-500/10 border-purple-400/20'
              : 'bg-gradient-to-r from-[#8fbc8f]/10 to-[#d2b48c]/10 border-[#8fbc8f]/20'
          }`}>
            <h3 className={`text-2xl font-bold mb-4 ${
              theme === 'dark' ? 'text-white' : 'text-[#2d2d2d]'
            }`}>
              Career Journey Summary
            </h3>
            <p className={`text-lg max-w-3xl mx-auto leading-relaxed ${
              theme === 'dark' ? 'text-white/80' : 'text-[#2d2d2d]/80'
            }`}>
              From starting as a Business Technology Analyst at ZS Associates in 2017 to currently leading AI initiatives as a Senior Manager at PepsiCo, my career has been a continuous journey of growth in data science, AI, and technology leadership. I&apos;ve worked across diverse domains including healthcare, finance, retail, and technology, always focusing on delivering innovative AI solutions that drive business value.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <div className={`rounded-full px-6 py-2 text-sm ${
                theme === 'dark' ? 'bg-white/10 text-white/80' : 'bg-[#faf8f0]/80 text-[#2d2d2d]'
              }`}>
                <span className={`font-semibold ${
                  theme === 'dark' ? 'text-purple-300' : 'text-[#8fbc8f]'
                }`}>7+</span> Years Experience
              </div>
              <div className={`rounded-full px-6 py-2 text-sm ${
                theme === 'dark' ? 'bg-white/10 text-white/80' : 'bg-[#faf8f0]/80 text-[#2d2d2d]'
              }`}>
                <span className={`font-semibold ${
                  theme === 'dark' ? 'text-purple-300' : 'text-[#8fbc8f]'
                }`}>6</span> Organizations
              </div>
              <div className={`rounded-full px-6 py-2 text-sm ${
                theme === 'dark' ? 'bg-white/10 text-white/80' : 'bg-[#faf8f0]/80 text-[#2d2d2d]'
              }`}>
                <span className={`font-semibold ${
                  theme === 'dark' ? 'text-purple-300' : 'text-[#8fbc8f]'
                }`}>65+</span> Markets
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 