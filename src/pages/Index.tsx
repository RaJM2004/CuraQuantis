import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import IntroSection from '../components/IntroSection';
import HealthcareEcosystemSection from '../components/HealthcareEcosystemSection';
import CuraVoiceAISection from '../components/CuraVoiceAISection';
import IndustriesSection from '../components/IndustriesSection';
import WhyAISection from '../components/WhyAISection';
import SolutionsSection from '../components/SolutionsSection';
import AboutSection from '../components/AboutSection';
import ContactSection from '../components/ContactSection';
import PartnerEcosystemTeaser from '../components/PartnerEcosystemTeaser';
import Footer from '../components/Footer';

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Add smooth scrolling for anchor links
    const handleSmoothScroll = (e: Event) => {
      const target = e.target as HTMLAnchorElement;
      if (target.hash) {
        e.preventDefault();
        const element = document.querySelector(target.hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => link.addEventListener('click', handleSmoothScroll));

    return () => {
      links.forEach(link => link.removeEventListener('click', handleSmoothScroll));
    };
  }, []);

  const handleIndustryClick = (path: string) => {
    navigate(path);
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <IntroSection />
      <HealthcareEcosystemSection />
      <PartnerEcosystemTeaser />
      <CuraVoiceAISection />
      {/* <IndustriesSection onIndustryClick={handleIndustryClick} /> */}
      <WhyAISection />
      <SolutionsSection />
      <AboutSection />

      {/* Facility Frontview Section - positioned right after About and before Contact */}
      <section id="facility" className="py-24 bg-gradient-to-b from-white via-slate-50 to-white relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 rounded-full bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-widest mb-6 border border-blue-100 shadow-xs">
              Our Facility
            </div>
            <h2 className="section-heading mb-6 !text-4xl sm:!text-5xl font-extrabold text-slate-900">
              CuraQuantis <span className="text-blue-600">Frontview</span>
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-sm sm:text-base font-light">
              State-of-the-art clinical and diagnostic intelligence hub designed for precision, comfort, and advanced patient care.
            </p>
          </div>
          
          <div className="max-w-6xl mx-auto">
            <div className="medical-glass rounded-[40px] p-4 shadow-2xl hover:shadow-blue-200/50 transition-all duration-700 bg-white/80 border border-blue-100">
              <div className="rounded-[30px] overflow-hidden relative group min-h-[300px] sm:min-h-[500px] bg-slate-100 flex items-center justify-center">
                <img 
                  src="/CuraQuantis.jpeg" 
                  alt="CuraQuantis Frontview" 
                  className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-1000 block"
                  loading="eager"
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (!target.src.endsWith('/curaquantis.png')) {
                      target.src = '/curaquantis.png';
                    }
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end justify-center p-8 sm:p-12">
                  <p className="text-white text-xl sm:text-2xl font-light tracking-[0.25em] uppercase drop-shadow-md">Architecture of Excellence</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
