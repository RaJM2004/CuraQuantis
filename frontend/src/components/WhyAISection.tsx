
import React from 'react';
import { Zap, Target, TrendingUp, Clock, Shield, DollarSign } from 'lucide-react';

const WhyAISection = () => {
  const benefits = [
    { icon: Zap, title: 'Enhanced Efficiency', description: 'Automate complex processes and reduce operational overhead', stat: '80%' },
    { icon: Target, title: 'Unmatched Accuracy', description: 'Achieve precision levels that surpass human capabilities', stat: '99.9%' },
    { icon: TrendingUp, title: 'Predictive Insights', description: 'Forecast trends and patterns with advanced algorithms', stat: '95%' },
    { icon: Clock, title: 'Real-time Processing', description: 'Process millions of data points instantaneously', stat: '<1ms' },
    { icon: Shield, title: 'Enhanced Security', description: 'Proactive threat detection and automated response', stat: '24/7' },
    { icon: DollarSign, title: 'Cost Optimization', description: 'Reduce operational costs while maximizing ROI', stat: '60%' }
  ];

  return (

    <section id="why-ai" className="py-24 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-100/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 -z-10"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cyan-100/30 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 -z-10"></div>

      <div className="container mx-auto px-6">
        <div className="text-center mb-24">
          <h2 className="section-heading mb-6 slide-up">
            The Science of <span className="text-blue-600">AI Efficiency</span>
          </h2>
          <p className="text-xl minimal-text max-w-3xl mx-auto slide-up stagger-1 font-light">
            Empowering the future of care with intelligent automation, predictive diagnostics, and data-driven precision.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24 max-w-7xl mx-auto">
          {benefits.map((benefit, index) => (
            <div 
              key={benefit.title}
              className={`medical-glass p-8 subtle-hover slide-up stagger-${(index % 3) + 1} group hover:-translate-y-2 transition-all duration-500`}
            >
              <div className="flex flex-col h-full">
                <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center mb-8 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
                  <benefit.icon className="w-7 h-7" strokeWidth={1} />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-light mb-4 text-blue-900">{benefit.title}</h3>
                  <p className="minimal-text mb-6 text-sm leading-relaxed text-gray-600">{benefit.description}</p>
                  <div className="flex items-end justify-between mt-auto">
                    <span className="text-4xl font-extralight text-blue-600">{benefit.stat}</span>
                    <div className="w-12 h-1 bg-blue-100 rounded-full overflow-hidden">
                      <div className="w-3/4 h-full bg-blue-500 group-hover:w-full transition-all duration-700"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* The AI Advantage Dashboard */}
        <div className="relative max-w-5xl mx-auto">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-3xl blur opacity-20 group-hover:opacity-30 transition duration-1000"></div>
          <div className="relative medical-glass p-12 overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Zap className="w-32 h-32 text-blue-600" />
            </div>
            
            <div className="text-center mb-16 relative z-10">
              <h3 className="text-3xl font-light mb-4 text-blue-900">The AI Advantage</h3>
              <div className="w-24 h-1 bg-blue-600 mx-auto mb-6 rounded-full"></div>
              <p className="minimal-text text-lg">Systematic transformation across clinical and operational workflows</p>
            </div>
            
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">
              {[
                { stat: '10x', label: 'Faster Processing', sub: 'Clinical Documentation', color: 'blue' },
                { stat: '50%', label: 'Error Reduction', sub: 'Diagnostic Accuracy', color: 'cyan' },
                { stat: '24/7', label: 'Availability', sub: 'Patient Concierge', color: 'indigo' },
                { stat: '∞', label: 'Scalability', sub: 'Digital Workforce', color: 'sky' }
              ].map((item, i) => (
                <div key={i} className="text-center group">
                  <div className={`w-24 h-24 rounded-full border border-blue-100 mx-auto mb-6 flex items-center justify-center bg-white shadow-sm group-hover:shadow-md group-hover:border-blue-400 transition-all duration-500 relative`}>
                    <div className="absolute inset-0 rounded-full border-t-2 border-blue-500 animate-[spin_3s_linear_infinite] opacity-0 group-hover:opacity-100"></div>
                    <span className="text-3xl font-extralight text-blue-600">{item.stat}</span>
                  </div>
                  <h4 className="font-medium text-blue-900 mb-2">{item.label}</h4>
                  <p className="text-xs minimal-text uppercase tracking-widest text-blue-500">{item.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyAISection;
