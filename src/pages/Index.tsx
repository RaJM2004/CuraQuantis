
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
      <CuraVoiceAISection />
      {/* <IndustriesSection onIndustryClick={handleIndustryClick} /> */}
      <WhyAISection />
      <SolutionsSection />
      <AboutSection />
      <ContactSection />
      
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 animate-fade-in-up">
            <div className="inline-block px-4 py-2 rounded-full bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-widest mb-6">
              Our Facility
            </div>
            <h2 className="section-heading mb-6 !text-5xl">
              CuraQuantis <span className="text-blue-600">Frontview</span>
            </h2>
          </div>
          
          <div className="max-w-6xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <div className="medical-glass rounded-[40px] p-4 shadow-2xl hover:shadow-blue-200/50 transition-all duration-700">
              <div className="rounded-[30px] overflow-hidden relative group">
                <img 
                  src="/CuraQuantis.jpeg" 
                  alt="CuraQuantis Frontview" 
                  className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end justify-center p-12">
                  <p className="text-white text-2xl font-extralight tracking-[0.3em] uppercase">Architecture of Excellence</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
