import { Suspense } from 'react';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Experience from '@/components/Experience';
import Skills from '@/components/Skills';
import Education from '@/components/Education';
import Contact from '@/components/Contact';
import Layout from '@/components/Layout';
import Chatbot from '@/components/Chatbot';
import portfolioData from '@/data/portfolio.json';

function LoadingFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-2xl font-semibold animate-pulse">
        <span className="bg-gradient-to-r from-[#8fbc8f] via-[#d2b48c] to-[#6b7280] bg-clip-text text-transparent">
          Loading...
        </span>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <Layout>
      <Suspense fallback={<LoadingFallback />}>
        <Hero personalInfo={portfolioData.personal_info} />
        <About personalInfo={portfolioData.personal_info} />
        <Experience experience={portfolioData.experience} />
        <Skills skills={portfolioData.skills} />
        <Education education={portfolioData.education} />
        <Contact personalInfo={portfolioData.personal_info} />
        <Chatbot />
      </Suspense>
    </Layout>
  );
}
