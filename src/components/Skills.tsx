'use client';

import { motion } from 'framer-motion';
import { Skills as SkillsType } from '@/types/portfolio';
import { useTheme } from '../contexts/ThemeContext';

interface SkillsProps {
  skills: SkillsType;
}

export default function Skills({ skills }: SkillsProps) {
  const { theme } = useTheme();
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const skillCategories = [
    {
      title: 'Technical Skills',
      skills: skills.technical,
      color: theme === 'dark' ? 'from-purple-500 to-pink-500' : 'from-[#8fbc8f] to-[#a0d0a0]',
      icon: '🧠',
    },
    {
      title: 'Tools & Technologies',
      skills: skills.tools,
      color: theme === 'dark' ? 'from-blue-500 to-cyan-500' : 'from-[#d2b48c] to-[#deb887]',
      icon: '🛠️',
    },
    {
      title: 'Domain Expertise',
      skills: skills.domains,
      color: theme === 'dark' ? 'from-green-500 to-emerald-500' : 'from-[#8fbc8f] to-[#228b22]',
      icon: '🎯',
    },
  ];

  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8">
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
            Skills & Expertise
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
            A comprehensive skill set developed through years of experience in data science, 
            AI, and technology leadership across diverse industries.
          </motion.p>
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
          className="grid lg:grid-cols-3 gap-8 mb-16"
        >
          {skillCategories.map((category, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className={`backdrop-blur-sm rounded-2xl p-8 border hover:border-white/20 transition-all duration-300 ${
                theme === 'dark' 
                  ? 'bg-white/5 border-white/10' 
                  : 'bg-[#faf8f0]/90 border-[#d2b48c] hover:border-[#8fbc8f]/50'
              }`}
            >
              <div className="text-center mb-6">
                <div className="text-4xl mb-4">{category.icon}</div>
                <h3 className={`text-2xl font-bold mb-2 ${
                  theme === 'dark' ? 'text-white' : 'text-[#2d2d2d]'
                }`}>{category.title}</h3>
                <div className={`w-16 h-1 bg-gradient-to-r ${category.color} mx-auto`} />
              </div>

              <div className="space-y-3">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skillIndex}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: skillIndex * 0.1 }}
                    className="flex items-center space-x-3"
                  >
                    <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${category.color}`} />
                    <span className={`${
                      theme === 'dark' ? 'text-white/80' : 'text-[#2d2d2d]/80'
                    }`}>{skill}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Proficiency Levels */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className={`backdrop-blur-sm rounded-2xl p-8 border ${
            theme === 'dark' 
              ? 'bg-white/5 border-white/10' 
              : 'bg-[#faf8f0]/90 border-[#d2b48c]'
          }`}
        >
          <h3 className={`text-2xl font-bold text-center mb-8 ${
            theme === 'dark' ? 'text-white' : 'text-[#2d2d2d]'
          }`}>Proficiency Levels</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className={`text-lg font-semibold mb-4 ${
                theme === 'dark' ? 'text-purple-300' : 'text-[#8fbc8f]'
              }`}>Core Competencies</h4>
              <div className="space-y-4">
                {[
                  { skill: 'Machine Learning', level: 95 },
                  { skill: 'Data Science', level: 90 },
                  { skill: 'AI/ML Architecture', level: 88 },
                  { skill: 'Python Development', level: 92 },
                  { skill: 'Cloud Platforms', level: 85 },
                ].map((item, index) => (
                  <div key={index}>
                    <div className={`flex justify-between text-sm mb-1 ${
                      theme === 'dark' ? 'text-white/70' : 'text-[#6b7280]'
                    }`}>
                      <span>{item.skill}</span>
                      <span>{item.level}%</span>
                    </div>
                    <div className={`w-full rounded-full h-2 ${
                      theme === 'dark' ? 'bg-white/10' : 'bg-[#e8f5e8]'
                    }`}>
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${item.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: index * 0.1 }}
                        className={`h-2 rounded-full ${
                          theme === 'dark' 
                            ? 'bg-gradient-to-r from-purple-500 to-blue-500'
                            : 'bg-gradient-to-r from-[#8fbc8f] to-[#d2b48c]'
                        }`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className={`text-lg font-semibold mb-4 ${
                theme === 'dark' ? 'text-blue-300' : 'text-[#8fbc8f]'
              }`}>Specialized Areas</h4>
              <div className="space-y-4">
                {[
                  { skill: 'GenAI & LLMs', level: 90 },
                  { skill: 'MLOps & CICD', level: 85 },
                  { skill: 'Data Engineering', level: 88 },
                  { skill: 'Business Intelligence', level: 82 },
                  { skill: 'Statistical Modeling', level: 87 },
                ].map((item, index) => (
                  <div key={index}>
                    <div className={`flex justify-between text-sm mb-1 ${
                      theme === 'dark' ? 'text-white/70' : 'text-[#6b7280]'
                    }`}>
                      <span>{item.skill}</span>
                      <span>{item.level}%</span>
                    </div>
                    <div className={`w-full rounded-full h-2 ${
                      theme === 'dark' ? 'bg-white/10' : 'bg-[#e8f5e8]'
                    }`}>
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${item.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: index * 0.1 }}
                        className={`h-2 rounded-full ${
                          theme === 'dark' 
                            ? 'bg-gradient-to-r from-blue-500 to-cyan-500'
                            : 'bg-gradient-to-r from-[#8fbc8f] to-[#d2b48c]'
                        }`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Additional Features */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-12 grid md:grid-cols-3 gap-6"
        >
          {[
            {
              icon: '🚀',
              title: 'AI Innovation',
              description: 'Leading-edge AI solutions and research',
              gradient: 'from-purple-500/10 to-pink-500/10',
              border: theme === 'dark' ? 'border-purple-400/20' : 'border-[#8fbc8f]/20',
            },
            {
              icon: '🌍',
              title: 'Global Scale',
              description: 'Experience across 65+ international markets',
              gradient: 'from-blue-500/10 to-cyan-500/10',
              border: 'border-blue-400/20',
            },
            {
              icon: '⚡',
              title: 'Performance',
              description: 'Optimized solutions for enterprise scale',
              gradient: 'from-green-500/10 to-emerald-500/10',
              border: 'border-green-400/20',
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`bg-gradient-to-r ${feature.gradient} rounded-xl p-6 border ${feature.border} text-center transition-all duration-300 ${
                theme === 'dark' ? 'hover:bg-opacity-20' : 'hover:bg-opacity-30'
              }`}
            >
              <div className="text-3xl mb-3">{feature.icon}</div>
              <h4 className={`text-lg font-semibold mb-2 ${
                theme === 'dark' ? 'text-white' : 'text-[#2d2d2d]'
              }`}>{feature.title}</h4>
              <p className={`text-sm ${
                theme === 'dark' ? 'text-white/70' : 'text-[#6b7280]'
              }`}>{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
} 