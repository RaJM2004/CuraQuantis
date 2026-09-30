import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail } from 'lucide-react';


const About: React.FC = () => {
  const teamMembers = [
    {
      name: 'Dharani N Viswanath',
      role: 'Chairman and Managing Director of CuraQuantis Health Clinics Pvt Ltd',
      image: '/Dharni.jpeg',
      email: 'mailto:dv_nalli@curaquantis.com'
    },
    {
      name: 'Ananya Parikibandla',
      role: 'Co Founder and Executive Director of CuraQuantis Health Clinics Pvt Ltd',
      image: '/Ananya.png',
      email: 'mailto:ananya@curaquantis.com'
    }
  ];

  const stats = [
    { label: 'AI Solutions Ready', number: '14+' },
    { label: 'Deployment Time', number: '5 Mins' },
    { label: 'States Across India', number: '28+' },
    { label: 'Cities Focused', number: 'Tier 1 & 2' }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <section className="py-24 relative overflow-hidden pt-32">
        <div className="container mx-auto px-6">
          {/* Header Section */}
          <div className="text-center mb-20 animate-fade-in-up">
            <div className="inline-block px-4 py-2 rounded-full bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-widest mb-6">
              The Journey
            </div>
            <h1 className="section-heading mb-6 !text-6xl">
              About <span className="text-blue-600">CuraQuantis Health Clinics</span>
            </h1>
            <p className="text-xl minimal-text max-w-3xl mx-auto font-light text-gray-500">
              Pioneering the AI revolution with specialized clinical intelligence that transforms delivery and empowers caregivers worldwide.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-24">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className="medical-glass rounded-3xl p-8 text-center hover:shadow-2xl hover:shadow-blue-200/50 transition-all duration-500 animate-fade-in-up group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-4xl font-extralight text-blue-900 mb-2">{stat.number}</div>
                <div className="text-xs font-bold text-blue-500 uppercase tracking-widest">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Mission & Vision */}
          <div className="grid lg:grid-cols-2 gap-12 mb-24">
            <div className="medical-glass rounded-[40px] p-12 hover:shadow-2xl hover:shadow-blue-100 transition-all duration-700 relative overflow-hidden group animate-fade-in-up">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-blue-200 transition-colors"></div>
              <h3 className="text-3xl font-light mb-8 text-blue-900">Our <span className="text-blue-600">Mission</span></h3>
              <p className="text-lg minimal-text leading-relaxed mb-8 text-gray-600 font-light text-justify">
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

            <div className="medical-glass rounded-[40px] p-12 hover:shadow-2xl hover:shadow-blue-100 transition-all duration-700 relative overflow-hidden group animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-cyan-200 transition-colors"></div>
              <h3 className="text-3xl font-light mb-8 text-blue-900">Our <span className="text-blue-600">Vision</span></h3>
              <p className="text-lg minimal-text leading-relaxed mb-8 text-gray-600 font-light text-justify">
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

          {/* Leadership Section */}
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl font-light text-blue-900 mb-4">Our Leadership Team</h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full"></div>
          </div>

          <div className="flex justify-center gap-12 flex-wrap mb-24">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="relative bg-white rounded-[40px] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(37,99,235,0.15)] hover:-translate-y-2 transition-all duration-500 w-[400px] group animate-fade-in-up border border-gray-100"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="h-[340px] w-full overflow-hidden relative bg-blue-50/50">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  {member.image ? (
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-700 ease-out"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-blue-200/50 italic bg-gradient-to-br from-blue-50 to-indigo-50/50">
                      Leadership Portrait
                    </div>
                  )}
                  {/* Decorative Elements */}
                  <div className="absolute top-4 right-4 w-12 h-12 bg-white/10 backdrop-blur-md rounded-full border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 z-20"></div>
                  <div className="absolute top-8 right-8 w-4 h-4 bg-white/20 backdrop-blur-md rounded-full border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200 z-20"></div>
                </div>

                <div className="p-10 bg-gradient-to-b from-white to-blue-50/20 relative z-20">
                  <div className="absolute -top-10 right-10 bg-blue-600 text-white w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-600/30 rotate-12 group-hover:rotate-0 group-hover:bg-blue-700 transition-all duration-500 z-30">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">{member.name}</h3>
                  <div className="h-1 w-12 bg-blue-600 rounded-full mb-6 group-hover:w-24 transition-all duration-500"></div>
                  <p className="text-blue-600 font-semibold text-xs uppercase tracking-[0.2em] mb-6 leading-relaxed">{member.role}</p>

                  <div className="flex items-center gap-4 mt-auto">
                    {member.email && (
                      <a href={member.email} className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300 shadow-sm">
                        <Mail size={18} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;