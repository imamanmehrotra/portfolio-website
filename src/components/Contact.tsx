'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { PersonalInfo } from '@/types/portfolio';
import { EnvelopeIcon, PhoneIcon, MapPinIcon, GlobeAltIcon } from '@heroicons/react/24/outline';
import { useTheme } from '../contexts/ThemeContext';

interface ContactProps {
  personalInfo: PersonalInfo;
}

export default function Contact({ personalInfo }: ContactProps) {
  const { theme } = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      // Reset success message after 3 seconds
      setTimeout(() => setSubmitStatus('idle'), 3000);
    }, 1000);
  };

  const contactInfo = [
    {
      icon: EnvelopeIcon,
      label: 'Email',
      value: personalInfo.email,
      href: `mailto:${personalInfo.email}`,
      color: 'text-purple-400',
    },
    {
      icon: PhoneIcon,
      label: 'Phone',
      value: personalInfo.phone,
      href: `tel:${personalInfo.phone}`,
      color: 'text-blue-400',
    },
    {
      icon: MapPinIcon,
      label: 'Location',
      value: personalInfo.location,
      href: '#',
      color: 'text-green-400',
    },
    {
      icon: GlobeAltIcon,
      label: 'LinkedIn',
      value: 'View Profile',
      href: personalInfo.linkedin,
      color: 'text-pink-400',
    },
  ];

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className={`text-4xl sm:text-5xl font-bold mb-6 ${
            theme === 'dark' ? 'text-white' : 'text-[#2d2d2d]'
          }`}>
            Get In Touch
          </h2>
          <div className={`w-24 h-1 mx-auto mb-6 ${
            theme === 'dark' 
              ? 'bg-gradient-to-r from-purple-400 to-blue-400' 
              : 'bg-gradient-to-r from-[#8fbc8f] to-[#d2b48c]'
          }`} />
          <p className={`text-xl max-w-3xl mx-auto ${
            theme === 'dark' ? 'text-white/70' : 'text-[#6b7280]'
          }`}>
            I&apos;m always interested in hearing about new opportunities, 
            interesting projects, or just having a chat about AI and technology.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div>
              <h3 className={`text-2xl font-bold mb-6 ${
                theme === 'dark' ? 'text-white' : 'text-[#2d2d2d]'
              }`}>Let&apos;s Connect</h3>
              <p className={`text-lg leading-relaxed mb-8 ${
                theme === 'dark' ? 'text-white/80' : 'text-[#2d2d2d]/80'
              }`}>
                Whether you have a question about my work, want to discuss potential collaborations, 
                or just want to say hello, I&apos;d love to hear from you.
              </p>
            </div>

            <div className="space-y-6">
              {contactInfo.map((contact, index) => (
                <motion.a
                  key={index}
                  href={contact.href}
                  target={contact.label === 'LinkedIn' ? '_blank' : '_self'}
                  rel={contact.label === 'LinkedIn' ? 'noopener noreferrer' : ''}
                  className={`flex items-center space-x-4 p-4 backdrop-blur-sm rounded-xl border hover:border-white/20 transition-all duration-300 group ${
                    theme === 'dark' 
                      ? 'bg-white/5 border-white/10' 
                      : 'bg-[#faf8f0]/90 border-[#d2b48c]'
                  }`}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className={`p-3 rounded-lg group-hover:bg-white/20 transition-colors ${
                    theme === 'dark' 
                      ? 'bg-white/10' 
                      : 'bg-[#faf8f0]/80'
                  }`}>
                    <contact.icon className={`w-6 h-6 ${contact.color}`} />
                  </div>
                  <div>
                    <p className={`text-sm ${
                      theme === 'dark' ? 'text-white/60' : 'text-[#6b7280]'
                    }`}>{contact.label}</p>
                    <p className={`font-medium ${
                      theme === 'dark' ? 'text-white' : 'text-[#2d2d2d]'
                    }`}>{contact.value}</p>
                  </div>
                </motion.a>
              ))}
            </div>

            <div className={`rounded-2xl p-6 border transition-colors duration-300 ${
              theme === 'dark'
                ? 'bg-gradient-to-r from-purple-500/10 to-blue-500/10 border-purple-400/20'
                : 'bg-gradient-to-r from-[#8fbc8f]/10 to-[#d2b48c]/10 border-[#8fbc8f]/20'
            }`}>
              <h4 className={`text-lg font-semibold mb-3 ${
                theme === 'dark' ? 'text-white' : 'text-[#2d2d2d]'
              }`}>What I&apos;m Looking For</h4>
              <ul className={`space-y-2 text-sm ${
                theme === 'dark' ? 'text-white/80' : 'text-[#2d2d2d]/80'
              }`}>
                <li>• AI/ML project collaborations</li>
                <li>• Data science consulting opportunities</li>
                <li>• Speaking engagements and tech talks</li>
                <li>• Mentoring and knowledge sharing</li>
              </ul>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className={`backdrop-blur-sm rounded-2xl p-8 border ${
              theme === 'dark' 
                ? 'bg-white/5 border-white/10' 
                : 'bg-[#faf8f0]/90 border-[#d2b48c]'
            }`}
          >
            <h3 className={`text-2xl font-bold mb-6 ${
              theme === 'dark' ? 'text-white' : 'text-[#2d2d2d]'
            }`}>Send a Message</h3>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className={`block text-sm font-medium mb-2 ${
                    theme === 'dark' ? 'text-white/80' : 'text-[#2d2d2d]/80'
                  }`}>Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300 ${
                      theme === 'dark'
                        ? 'bg-white/10 border-white/20 text-white placeholder-white/50'
                        : 'bg-[#faf8f0]/80 border-[#d2b48c] text-[#2d2d2d] placeholder-[#6b7280]'
                    }`}
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className={`block text-sm font-medium mb-2 ${
                    theme === 'dark' ? 'text-white/80' : 'text-[#2d2d2d]/80'
                  }`}>Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300 ${
                      theme === 'dark'
                        ? 'bg-white/10 border-white/20 text-white placeholder-white/50'
                        : 'bg-[#faf8f0]/80 border-[#d2b48c] text-[#2d2d2d] placeholder-[#6b7280]'
                    }`}
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="subject" className={`block text-sm font-medium mb-2 ${
                  theme === 'dark' ? 'text-white/80' : 'text-[#2d2d2d]/80'
                }`}>Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300 ${
                    theme === 'dark'
                      ? 'bg-white/10 border-white/20 text-white placeholder-white/50'
                      : 'bg-[#faf8f0]/80 border-[#d2b48c] text-[#2d2d2d] placeholder-[#6b7280]'
                  }`}
                  placeholder="What&apos;s this about?"
                />
              </div>
              <div>
                <label htmlFor="message" className={`block text-sm font-medium mb-2 ${
                  theme === 'dark' ? 'text-white/80' : 'text-[#2d2d2d]/80'
                }`}>Message</label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300 resize-none ${
                    theme === 'dark'
                      ? 'bg-white/10 border-white/20 text-white placeholder-white/50'
                      : 'bg-[#faf8f0]/80 border-[#d2b48c] text-[#2d2d2d] placeholder-[#6b7280]'
                  }`}
                  placeholder="Tell me more about your inquiry..."
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full px-8 py-4 text-white font-semibold rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${
                  theme === 'dark'
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700'
                    : 'bg-gradient-to-r from-[#8fbc8f] to-[#d2b48c] hover:from-[#7aac7a] hover:to-[#c2a47c]'
                }`}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>

            {/* Submit Status */}
            {submitStatus === 'success' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-4 bg-green-500/20 border border-green-400/30 rounded-lg text-green-600 text-center"
              >
                Message sent successfully! I&apos;ll get back to you soon.
              </motion.div>
            )}
            {submitStatus === 'error' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-4 bg-red-500/20 border border-red-400/30 rounded-lg text-red-600 text-center"
              >
                Something went wrong. Please try again.
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-20 text-center"
        >
          <div className={`rounded-2xl p-8 border transition-colors duration-300 ${
            theme === 'dark'
              ? 'bg-gradient-to-r from-purple-500/10 to-blue-500/10 border-purple-400/20'
              : 'bg-gradient-to-r from-[#8fbc8f]/10 to-[#d2b48c]/10 border-[#8fbc8f]/20'
          }`}>
            <h3 className={`text-2xl font-bold mb-4 ${
              theme === 'dark' ? 'text-white' : 'text-[#2d2d2d]'
            }`}>Ready to Start a Conversation?</h3>
            <p className={`text-lg mb-6 max-w-2xl mx-auto ${
              theme === 'dark' ? 'text-white/80' : 'text-[#2d2d2d]/80'
            }`}>
              I&apos;m passionate about AI, data science, and technology innovation. 
              Let&apos;s discuss how we can work together to create something amazing.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className={`px-8 py-3 text-white font-semibold rounded-lg transition-all duration-300 ${
                  theme === 'dark'
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700'
                    : 'bg-gradient-to-r from-[#8fbc8f] to-[#d2b48c] hover:from-[#7aac7a] hover:to-[#c2a47c]'
                }`}
              >
                Connect on LinkedIn
              </a>
              <a
                href={`mailto:${personalInfo.email}`}
                className={`px-8 py-3 border-2 font-semibold rounded-lg transition-all duration-300 ${
                  theme === 'dark'
                    ? 'border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white'
                    : 'border-[#8fbc8f] text-[#8fbc8f] hover:bg-[#8fbc8f] hover:text-white'
                }`}
              >
                Send Email
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 