'use client';

import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';

const brandsData = [
  {
    name: 'PepsiCo',
    logo: '/PepsiCo_Icon.png',
    alt: 'PepsiCo Logo'
  },
  {
    name: 'State Street',
    logo: '/State-street_icon.svg',
    alt: 'State Street Logo'
  },
  {
    name: 'Microsoft',
    logo: '/Microsoft_icon.png',
    alt: 'Microsoft Logo'
  },
  {
    name: 'Walmart',
    logo: '/Walmart_Icon.png',
    alt: 'Walmart Logo'
  },
  {
    name: 'Genpact',
    logo: '/Genpact_Icon.png',
    alt: 'Genpact Logo'
  },
  {
    name: 'EXL Service',
    logo: '/EXL_Service_icon.png',
    alt: 'EXL Service Logo'
  },
  {
    name: 'ZS Associates',
    logo: '/ZS_Associates_icon.png',
    alt: 'ZS Associates Logo'
  },
  {
    name: 'Pfizer',
    logo: '/Pfizer.png',
    alt: 'Pfizer Logo'
  },
  {
    name: 'Takeda',
    logo: '/Takeda.png',
    alt: 'Takeda Logo'
  },
  {
    name: 'Astellas',
    logo: '/Astellas.png',
    alt: 'Astellas Logo'
  },
  {
    name: 'Alcon',
    logo: '/Alcon.png',
    alt: 'Alcon Logo'
  },
  {
    name: 'Breville',
    logo: '/Breville_logo.png',
    alt: 'Breville Logo'
  },
  {
    name: 'Isuzu',
    logo: '/Isuzu.png',
    alt: 'Isuzu Logo'
  },
  {
    name: 'BSWH',
    logo: '/bswh.png',
    alt: 'BSWH Logo'
  },
  {
    name: 'Greenstone',
    logo: '/Greenstone.webp',
    alt: 'Greenstone Logo'
  },
  {
    name: 'TV360',
    logo: '/TV360.webp',
    alt: 'TV360 Logo'
  }
];

export default function BrandsClients() {
  const { theme } = useTheme();

  // Function to get logo size based on brand name
  const getLogoSize = (brandName: string) => {
    const largerLogos = ['PepsiCo', 'Microsoft', 'Walmart', 'Genpact', 'Astellas', 'BSWH', 'ZS Associates', 'EXL Service'];
    return largerLogos.includes(brandName) 
      ? { width: '110px', height: '110px', containerSize: 'w-28 h-28' } 
      : { width: '90px', height: '90px', containerSize: 'w-24 h-24' };
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05, // Reduced for smoother animation with more items
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.8 },
    visible: { opacity: 1, y: 0, scale: 1 },
  };

  return (
    <section id="brands-clients" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
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
            Brands & Clients
          </motion.h2>
          <motion.div
            variants={itemVariants}
            className={`w-24 h-1 mx-auto mb-6 ${
              theme === 'dark' 
                ? 'bg-gradient-to-r from-purple-400 to-blue-400' 
                : 'bg-gradient-to-r from-[#8fbc8f] to-[#d2b48c]'
            }`}
          />
          <motion.p
            variants={itemVariants}
            className={`text-lg max-w-3xl mx-auto ${
              theme === 'dark' ? 'text-white/80' : 'text-[#2d2d2d]/80'
            }`}
          >
            Trusted by leading organizations across various industries to deliver innovative AI and data science solutions
          </motion.p>
        </motion.div>

        {/* Brands Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
          className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-8 items-center justify-items-center"
        >
          {brandsData.map((brand, index) => {
            const logoSize = getLogoSize(brand.name);
            return (
              <motion.div
                key={brand.name}
                variants={itemVariants}
                whileHover={{ 
                  scale: 1.1, 
                  transition: { duration: 0.2 } 
                }}
                className="group relative flex items-center justify-center"
              >
                {/* Logo - Dynamic dimensions based on brand */}
                <div className={`${logoSize.containerSize} flex items-center justify-center`}>
                  <img
                    src={brand.logo}
                    alt={brand.alt}
                    className="max-w-full max-h-full object-contain transition-all duration-300 group-hover:brightness-110"
                    style={{
                      filter: theme === 'dark' ? 'brightness(0.9)' : 'brightness(1)',
                      width: logoSize.width,
                      height: logoSize.height,
                      objectFit: 'contain'
                    }}
                  />
                </div>

                {/* Tooltip on hover */}
                <div className={`absolute -top-12 left-1/2 transform -translate-x-1/2 px-3 py-1 rounded-lg text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10 ${
                  theme === 'dark'
                    ? 'bg-gray-800 text-white border border-gray-600'
                    : 'bg-white text-gray-800 border border-gray-300 shadow-md'
                }`}>
                  {brand.name}
                  <div className={`absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent ${
                    theme === 'dark' ? 'border-t-gray-800' : 'border-t-white'
                  }`} />
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom Stats */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="mt-16 text-center"
        >
          <div className={`rounded-2xl p-8 border transition-colors duration-300 ${
            theme === 'dark'
              ? 'bg-gradient-to-r from-purple-500/10 to-blue-500/10 border-purple-400/20'
              : 'bg-gradient-to-r from-[#8fbc8f]/10 to-[#d2b48c]/10 border-[#8fbc8f]/20'
          }`}>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              <div>
                <div className={`text-3xl font-bold mb-2 ${
                  theme === 'dark' ? 'text-purple-300' : 'text-[#8fbc8f]'
                }`}>
                  16+
                </div>
                <div className={`text-sm ${
                  theme === 'dark' ? 'text-white/70' : 'text-[#2d2d2d]/70'
                }`}>
                  Global Organizations
                </div>
              </div>
              <div>
                <div className={`text-3xl font-bold mb-2 ${
                  theme === 'dark' ? 'text-purple-300' : 'text-[#8fbc8f]'
                }`}>
                  75+
                </div>
                <div className={`text-sm ${
                  theme === 'dark' ? 'text-white/70' : 'text-[#2d2d2d]/70'
                }`}>
                  International Markets
                </div>
              </div>
              <div>
                <div className={`text-3xl font-bold mb-2 ${
                  theme === 'dark' ? 'text-purple-300' : 'text-[#8fbc8f]'
                }`}>
                  Multiple
                </div>
                <div className={`text-sm ${
                  theme === 'dark' ? 'text-white/70' : 'text-[#2d2d2d]/70'
                }`}>
                  Industry Domains
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
