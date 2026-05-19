
import React from 'react';
import { Brain, Zap, Target, Globe } from 'lucide-react';

const IntroSection = () => {
  const features = [
    {
      icon: Brain,
      title: 'Advanced AI',
      description: 'Cutting-edge machine learning algorithms'
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Real-time processing and analysis'
    },
    {
      icon: Target,
      title: 'Precision',
      description: 'Accurate predictions and insights'
    },
    {
      icon: Globe,
      title: 'Global Scale',
      description: 'Solutions that scale worldwide'
    }
  ];

  return (

    <section className="py-24 relative overflow-hidden bg-white">
      {/* Decorative Orbs */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-50/50 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2"></div>

      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-32">
            <div className="slide-up">
              <div className="inline-block px-4 py-2 rounded-lg bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-widest mb-8">
                Innovation First
              </div>
              <h2 className="section-heading mb-8 !text-5xl leading-tight">
                Pioneering the Future of <br />
                <span className="text-blue-600">AI-First Healthcare</span>
              </h2>
              <p className="text-xl minimal-text mb-10 leading-relaxed font-light text-gray-600">
                At CuraQuantis Health Clinics, we craft intelligent solutions that transform entire industries. We bridge the gap between cutting-edge AI research and life-changing real-world applications.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  'Industry-leading AI R&D',
                  'Custom Enterprise Solutions',
                  'Trusted Global Partnership',
                  'Next-Gen Data Security'
                ].map((item, i) => (
                  <div key={i} className="flex items-center space-x-3 group">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center group-hover:bg-blue-600 transition-all duration-300">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-600 group-hover:bg-white"></div>
                    </div>
                    <span className="text-sm font-medium text-blue-900/80">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative slide-up stagger-2 flex justify-center">
              {/* AI Core Visualization */}
              <div className="relative w-80 h-80 md:w-96 md:h-96">
                <div className="absolute inset-0 bg-blue-400/20 rounded-full animate-pulse blur-3xl"></div>
                <div className="absolute inset-0 border-2 border-blue-100 rounded-full animate-[spin_10s_linear_infinite]"></div>
                <div className="absolute inset-4 border border-blue-200/50 rounded-full animate-[spin_7s_linear_infinite_reverse]"></div>
                <div className="absolute inset-8 border-2 border-dashed border-blue-300/30 rounded-full animate-[spin_15s_linear_infinite]"></div>

                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-48 h-48 md:w-56 md:h-56 rounded-full bg-white shadow-2xl shadow-blue-200/50 flex items-center justify-center relative group">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-cyan-500 opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-full"></div>
                    <Brain className="w-20 h-20 md:w-24 md:h-24 text-blue-600 animate-pulse" strokeWidth={0.5} />
                  </div>
                </div>

                {/* Floating Tags */}
                <div className="absolute -top-4 -right-4 medical-glass px-4 py-2 text-xs font-bold text-blue-600 animate-bounce">GEN AI</div>
                <div className="absolute top-1/2 -left-12 medical-glass px-4 py-2 text-xs font-bold text-cyan-600 animate-pulse">AGENTIC</div>
                <div className="absolute -bottom-4 right-1/4 medical-glass px-4 py-2 text-xs font-bold text-indigo-600">MED-TECH</div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className={`medical-glass p-8 subtle-hover slide-up stagger-${index + 1} group`}
              >
                <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-all duration-500 shadow-inner">
                  <feature.icon className="w-6 h-6 text-blue-600 group-hover:text-white" strokeWidth={1} />
                </div>
                <h3 className="text-xl font-light mb-3 text-blue-900">{feature.title}</h3>
                <p className="minimal-text text-sm text-gray-500 leading-relaxed font-light">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntroSection;
