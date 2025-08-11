'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Bars3Icon, XMarkIcon, SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useTheme } from '../contexts/ThemeContext';

const navigation = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Experience', href: '#experience' },
  { name: 'Skills', href: '#skills' },
  { name: 'Education', href: '#education' },
  { name: 'Contact', href: '#contact' },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      theme === 'dark' 
        ? 'bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900' 
        : 'bg-gradient-to-br from-[#f5f5dc] via-[#e8f5e8] to-[#f0f0e6]'
    }`}>
      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? theme === 'dark' 
              ? 'bg-white/10 backdrop-blur-md border-b border-white/20'
              : 'bg-[#faf8f0]/90 backdrop-blur-md border-b border-[#d2b48c]'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex-shrink-0"
            >
              <Link href="#home" className={`text-2xl font-bold transition-colors ${
                theme === 'dark' 
                  ? 'text-white hover:text-purple-400' 
                  : 'text-[#2d2d2d] hover:text-[#8fbc8f]'
              }`}>
                <span style={{ display: 'inline-block', borderRadius: '50%', overflow: 'hidden', width: '2.5rem', height: '2.5rem', verticalAlign: 'middle', background: 'white' }}>
                  <img src="/india-flag.svg" alt="Indian Flag" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </span>
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                {navigation.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => scrollToSection(item.href)}
                    className={`transition-colors relative group px-3 py-2 rounded-md text-sm font-medium ${
                      theme === 'dark'
                        ? 'text-white/80 hover:text-white'
                        : 'text-[#2d2d2d]/80 hover:text-[#2d2d2d]'
                    }`}
                  >
                    {item.name}
                    <span className={`absolute inset-x-0 -bottom-px h-px transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ${
                      theme === 'dark'
                        ? 'bg-gradient-to-r from-transparent via-purple-400 to-transparent'
                        : 'bg-gradient-to-r from-transparent via-[#8fbc8f] to-transparent'
                    }`} />
                  </button>
                ))}
              </div>
            </div>

            {/* Theme Toggle and Mobile Menu Button */}
            <div className="flex items-center space-x-4">
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-lg transition-colors ${
                  theme === 'dark'
                    ? 'text-white hover:text-purple-400 hover:bg-white/10'
                    : 'text-[#2d2d2d] hover:text-[#8fbc8f] hover:bg-[#e8f5e8]'
                }`}
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? (
                  <SunIcon className="h-5 w-5" />
                ) : (
                  <MoonIcon className="h-5 w-5" />
                )}
              </button>

              {/* Mobile menu button */}
              <div className="md:hidden">
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className={`transition-colors ${
                    theme === 'dark'
                      ? 'text-white hover:text-purple-400'
                      : 'text-[#2d2d2d] hover:text-[#8fbc8f]'
                  }`}
                >
                  {mobileMenuOpen ? (
                    <XMarkIcon className="h-6 w-6" />
                  ) : (
                    <Bars3Icon className="h-6 w-6" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{
            opacity: mobileMenuOpen ? 1 : 0,
            height: mobileMenuOpen ? 'auto' : 0,
          }}
          transition={{ duration: 0.3 }}
          className={`md:hidden backdrop-blur-md border-b transition-colors duration-300 ${
            theme === 'dark'
              ? 'bg-white/10 border-white/20'
              : 'bg-[#faf8f0]/90 border-[#d2b48c]'
          }`}
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navigation.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className={`transition-colors block px-3 py-2 rounded-md text-base font-medium w-full text-left ${
                  theme === 'dark'
                    ? 'text-white/80 hover:text-white'
                    : 'text-[#2d2d2d]/80 hover:text-[#2d2d2d]'
                }`}
              >
                {item.name}
              </button>
            ))}
          </div>
        </motion.div>
      </motion.nav>

      {/* Main Content */}
      <main className="pt-16">
        {children}
      </main>

      {/* Footer */}
      <footer className={`border-t transition-colors duration-300 mt-20 ${
        theme === 'dark'
          ? 'bg-black/20 border-white/10'
          : 'bg-[#faf8f0]/50 border-[#d2b48c]'
      }`}>
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className={`text-sm transition-colors ${
              theme === 'dark' ? 'text-white/60' : 'text-[#6b7280]'
            }`}>
              © 2024 Aman Mehrotra. All rights reserved.
            </div>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a
                href="https://www.linkedin.com/in/aman-mehrotra-dataislife"
                target="_blank"
                rel="noopener noreferrer"
                className={`transition-colors hover:text-[#8fbc8f] ${
                  theme === 'dark' ? 'text-white/60' : 'text-[#6b7280]'
                }`}
              >
                LinkedIn
              </a>
              <a
                href="mailto:amansammehrotra@gmail.com"
                className={`transition-colors hover:text-[#8fbc8f] ${
                  theme === 'dark' ? 'text-white/60' : 'text-[#6b7280]'
                }`}
              >
                Email
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
} 