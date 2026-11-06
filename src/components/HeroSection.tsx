
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Building2, LogIn, ArrowRight } from 'lucide-react';

const HeroSection = () => {
  const [text, setText] = useState('');
  const fullText = 'Artificial Intelligence Powered Healthcare Ecosystem';

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i < fullText.length) {
        setText(fullText.slice(0, i + 1));
        i++;
      } else {
        clearInterval(timer);
      }
    }, 80);

    return () => clearInterval(timer);
  }, []);

  return (


    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background Image Layer */}
      <div className="absolute inset-0 z-0">
        <img
          src="/hero-bg.png"
          alt="AI Healthcare Background"
          className="w-full h-full object-cover opacity-45"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-white/90 via-white/40 to-blue-50/80"></div>
        {/* Animated Orbs for depth */}
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-blue-100/50 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-cyan-100/40 rounded-full blur-[100px] animate-pulse delay-700"></div>
      </div>

      <div className="container mx-auto px-6 text-center relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="mb-6 fade-in flex flex-col items-center">
            <Link
              to="/partner-portal"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50/90 hover:bg-blue-100 border border-blue-200/80 text-blue-800 text-xs sm:text-sm font-semibold transition-all shadow-sm group mb-6"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>National Partner & Franchise Opportunities Live</span>
              <span className="text-blue-300">|</span>
              <span className="text-blue-600 font-bold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                Apply Now <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </Link>
            <div className="w-1.5 h-12 bg-gradient-to-b from-blue-600 to-cyan-400 mx-auto rounded-full shadow-lg shadow-blue-300/50"></div>
          </div>

          <h1 className="hero-text mb-6 fade-in stagger-1 !text-5xl md:!text-7xl leading-tight text-blue-900">
            {text}
            <span className="animate-pulse text-blue-600">|</span>
          </h1>

          <p className="text-lg md:text-2xl minimal-text mb-10 max-w-4xl mx-auto fade-in stagger-2 font-light text-blue-900/70 leading-relaxed italic">
            13 Integrated AI Powered Solutions Transforming the Clinical Continuum.
          </p>

          <div className="flex flex-wrap gap-4 justify-center items-center mb-6 fade-in stagger-3">
            <Link
              to="/solutions"
              className="bg-gradient-to-r from-blue-600 to-blue-500 hover:shadow-xl hover:shadow-blue-300/50 text-white px-8 py-4 rounded-full text-base font-bold transition-all duration-300 transform hover:-translate-y-0.5"
            >
              Explore Solutions
            </Link>
            <Link
              to="/partner-portal"
              className="bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-600 hover:shadow-xl hover:shadow-indigo-300/50 text-white px-8 py-4 rounded-full text-base font-bold transition-all duration-300 transform hover:-translate-y-0.5 flex items-center gap-2"
            >
              <Building2 className="w-5 h-5 text-cyan-200" />
              <span>Partner & Franchise Portal</span>
            </Link>
            <Link
              to="/portal/login"
              className="medical-glass border-2 border-blue-200 text-blue-800 hover:bg-blue-50/80 px-7 py-4 rounded-full text-base font-semibold transition-all duration-300 flex items-center gap-2 hover:-translate-y-0.5"
            >
              <LogIn className="w-5 h-5 text-blue-600" />
              <span>Portal Sign In</span>
            </Link>
          </div>

          {/* Quick Direct Application Pathways */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-14 fade-in stagger-3 text-xs">
            <span className="text-blue-900/60 font-semibold uppercase tracking-wider text-[11px]">Direct Apply:</span>
            <Link
              to="/apply/pan-india"
              className="px-3.5 py-1.5 rounded-full bg-white/90 hover:bg-blue-50 border border-blue-200 text-blue-900 font-medium shadow-xs transition-colors"
            >
              Pan-India Master Partner →
            </Link>
            <Link
              to="/apply/regional"
              className="px-3.5 py-1.5 rounded-full bg-white/90 hover:bg-blue-50 border border-blue-200 text-blue-900 font-medium shadow-xs transition-colors"
            >
              Regional State Partner →
            </Link>
            <Link
              to="/apply/franchise"
              className="px-3.5 py-1.5 rounded-full bg-white/90 hover:bg-blue-50 border border-blue-200 text-blue-900 font-medium shadow-xs transition-colors"
            >
              Smart Clinic Franchise →
            </Link>
          </div>

          <div className="fade-in stagger-4">
            <div className="flex flex-col items-center">
              {/* <span className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-4">Discover More</span> */}
              <div className="w-px h-16 bg-gradient-to-b from-blue-400 to-transparent animate-bounce"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
