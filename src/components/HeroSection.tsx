
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

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
          <div className="mb-12 fade-in">
            {/* <div className="inline-block px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-bold uppercase tracking-[0.3em] mb-8 shadow-sm">
              Next-Gen Medical Intelligence
            </div> */}
            <div className="w-1.5 h-16 bg-gradient-to-b from-blue-600 to-cyan-400 mx-auto rounded-full shadow-lg shadow-blue-300/50"></div>
          </div>

          <h1 className="hero-text mb-8 fade-in stagger-1 !text-6xl md:!text-7xl leading-tight text-blue-900">
            {text}
            <span className="animate-pulse text-blue-600">|</span>
          </h1>

          <p className="text-xl md:text-3xl minimal-text mb-12 max-w-4xl mx-auto fade-in stagger-2 font-light text-blue-900/60 leading-relaxed italic">
            13 Integrated AI Powered Solutions Transforming the Clinical Continuum.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16 fade-in stagger-3">
            <Link to="/solutions" className="bg-gradient-to-r from-blue-600 to-blue-400 hover:shadow-2xl hover:shadow-blue-300/50 text-white px-12 py-5 rounded-full text-lg font-bold transition-all duration-300 transform hover:-translate-y-1">
              Explore Solutions
            </Link>
            <Link to="/products" className="medical-glass border-2 border-blue-100 text-blue-600 hover:bg-blue-50/50 px-12 py-5 rounded-full text-lg font-light transition-all duration-300">
              Learn More
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
