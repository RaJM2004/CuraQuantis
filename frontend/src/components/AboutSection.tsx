
import React from 'react';
import { Zap, Clock, Globe, Building2 } from 'lucide-react';

const AboutSection = () => {
  const timeline = [
    {
      year: '2020',
      title: 'Foundation',
      description: 'CuraQuantis Health Clinics was founded with a vision to integrate AI deeply into medical practices.'
    },
    {
      year: '2021',
      title: 'Clinical Diagnostics',
      description: 'Launched our first AI-powered diagnostic tools, assisting hospitals in early disease detection.'
    },
    {
      year: '2022',
      title: 'Ecosystem Expansion',
      description: 'Extended our focus to specialized clinics and diagnostics networks across major cities.'
    },
    {
      year: '2023',
      title: 'Specialized Modules',
      description: 'Introduced MediConnect and ZerolangT, bridging the gap in OPD and multilingual care.'
    },
    {
      year: '2024',
      title: 'Next-Gen Robotics',
      description: 'Pioneering surgical assistance and autonomous robotics for advanced healthcare delivery.'
    }
  ];

  const stats = [
    { icon: Zap, value: '14+', label: 'AI Solutions Ready' },
    { icon: Clock, value: '5 Mins', label: 'Deployment Time' },
    { icon: Globe, value: '28+', label: 'States Across India' },
    { icon: Building2, value: 'Tier 1 & 2', label: 'Cities Focused' }
  ];

  return (
    <section id="about" className="py-24 relative overflow-hidden bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          {/* <div className="inline-block px-4 py-2 rounded-full bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-widest mb-6">
            The Journey
          </div> */}
          <h2 className="section-heading mb-6 !text-5xl">
            About <span className="text-blue-600">CuraQuantis Health Clinics</span>
          </h2>
          <p className="text-xl minimal-text max-w-3xl mx-auto font-light text-gray-500">
            Pioneering the AI revolution with specialized clinical intelligence that transforms delivery and empowers caregivers worldwide.
          </p>
        </div>

        {/* Company Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-24">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="medical-glass rounded-3xl p-8 text-center hover:shadow-2xl hover:shadow-blue-200/50 transition-all duration-500 animate-fade-in-up group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-600 transition-colors duration-500">
                <stat.icon className="w-8 h-8 text-blue-600 group-hover:text-white" />
              </div>
              <div className="text-4xl font-extralight text-blue-900 mb-2">{stat.value}</div>
              <div className="text-xs font-bold text-blue-500 uppercase tracking-widest">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Mission & Vision */}
        <div className="grid lg:grid-cols-2 gap-12">
          <div className="medical-glass rounded-[40px] p-12 hover:shadow-2xl hover:shadow-blue-100 transition-all duration-700 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-blue-200 transition-colors"></div>
            <h3 className="text-3xl font-light mb-8 text-blue-900">Our <span className="text-blue-600">Mission</span></h3>
            <p className="text-lg minimal-text leading-relaxed mb-8 text-gray-600 font-light">
              To revolutionize global healthcare by integrating advanced AI into every clinical touchpoint—making care more accurate, accessible, and patient-centric. We empower healthcare providers with real-time intelligence to improve patient outcomes and operational excellence.
            </p>
            <div className="space-y-4">
              {[
                { label: 'Ethical AI Practice', color: 'bg-blue-500' },
                { label: 'Patient-Centric Innovation', color: 'bg-cyan-500' },
                { label: 'Data-Driven Care', color: 'bg-indigo-500' }
              ].map((item, i) => (
                <div key={i} className="flex items-center space-x-4 group/item">
                  <div className={`w-2 h-2 rounded-full ${item.color} group-hover/item:scale-150 transition-transform`}></div>
                  <span className="text-sm font-medium text-blue-900/80">{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="medical-glass rounded-[40px] p-12 hover:shadow-2xl hover:shadow-blue-100 transition-all duration-700 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-cyan-200 transition-colors"></div>
            <h3 className="text-3xl font-light mb-8 text-blue-900">Our <span className="text-blue-600">Vision</span></h3>
            <p className="text-lg minimal-text leading-relaxed mb-8 text-gray-600 font-light">
              To become the world's most trusted AI-driven healthcare ecosystem, where technology and human expertise merge perfectly to eliminate medical errors, bridge the care delivery gap, and ensure quality treatment for everyone.
            </p>
            <div className="space-y-4">
              {[
                { label: 'Zero Medical Errors', color: 'bg-blue-500' },
                { label: 'Global Healthcare Equity', color: 'bg-cyan-500' },
                { label: 'Seamless AI Integration', color: 'bg-indigo-500' }
              ].map((item, i) => (
                <div key={i} className="flex items-center space-x-4 group/item">
                  <div className={`w-2 h-2 rounded-full ${item.color} group-hover/item:scale-150 transition-transform`}></div>
                  <span className="text-sm font-medium text-blue-900/80">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
