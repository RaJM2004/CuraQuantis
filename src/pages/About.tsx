import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Mail, Sparkles } from 'lucide-react';

const About: React.FC = () => {
  const teamMembers = [
    {
      name: 'Mrs. Ananya Thirukkovaluri',
      role: 'Director | AI HealthCare & Digital Health Innovation',
      image: '/Ananya.png',
      email: 'mailto:support@curaquantis.com',
      badge: 'Healthcare AI & Digital Health Innovation',
      description: [
        'Driving healthcare AI strategy, clinical technology innovation, Pharma Operational Excellence, AI-powered healthcare solutions and operational excellence.',
        'Building intelligent, patient-centric healthcare ecosystems through AI, automation, digital transformation and technology-led care delivery.'
      ]
    },
    {
      name: 'Mrs. Dharani N. Viswanath',
      role: 'Director | Entrepreneur | AI Healthcare Strategist | Animal Welfare Advocate',
      image: '/Dharni.jpeg',
      email: 'mailto:support@curaquantis.com',
      badge: 'Strategy, Innovation & Social Advocacy',
      description: [
        'Mrs. Dharani N. Viswanath began her entrepreneurial journey in the traditional silk saree industry, gaining valuable experience in business development and enterprise management. She has since expanded her focus to AI-driven healthcare innovation, leading initiatives to build scalable and technology-enabled healthcare ecosystems.',
        'Alongside her entrepreneurial work, she is a dedicated animal welfare advocate, actively supporting the care, rescue, and well-being of stray and abandoned animals.'
      ]
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
          <div className="text-center mb-20">
            <div className="inline-block px-4 py-2 rounded-full bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-widest mb-6 border border-blue-100 shadow-xs">
              The Journey
            </div>
            <h1 className="section-heading mb-6 !text-5xl sm:!text-6xl font-extrabold text-slate-900">
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
                className="medical-glass rounded-3xl p-8 text-center hover:shadow-2xl hover:shadow-blue-200/50 transition-all duration-500 group bg-white border border-blue-100"
              >
                <div className="text-4xl font-extralight text-blue-900 mb-2">{stat.number}</div>
                <div className="text-xs font-bold text-blue-500 uppercase tracking-widest">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Mission & Vision */}
          <div className="grid lg:grid-cols-2 gap-12 mb-24">
            <div className="medical-glass rounded-[40px] p-12 hover:shadow-2xl hover:shadow-blue-100 transition-all duration-700 relative overflow-hidden group bg-white border border-blue-100">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-blue-200 transition-colors"></div>
              <h3 className="text-3xl font-light mb-8 text-blue-900">Our <span className="text-blue-600 font-semibold">Mission</span></h3>
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

            <div className="medical-glass rounded-[40px] p-12 hover:shadow-2xl hover:shadow-blue-100 transition-all duration-700 relative overflow-hidden group bg-white border border-blue-100">
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-cyan-200 transition-colors"></div>
              <h3 className="text-3xl font-light mb-8 text-blue-900">Our <span className="text-blue-600 font-semibold">Vision</span></h3>
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

          {/* Executive Leadership Section */}
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-widest mb-4 border border-blue-100 shadow-xs">
              Executive Leadership
            </div>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
              Our Visionary <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Directors</span>
            </h2>
            <div className="w-24 h-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto rounded-full mb-6"></div>
            <p className="text-slate-600 max-w-2xl mx-auto text-sm sm:text-base font-light">
              Guiding CuraQuantis™ with clinical precision, artificial intelligence excellence, and compassionate enterprise leadership.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 max-w-6xl mx-auto mb-24">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="bg-white rounded-3xl border border-slate-200/90 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col group hover:-translate-y-1.5"
              >
                {/* Top Header Card Info */}
                <div className="p-6 sm:p-8 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white flex flex-col sm:flex-row items-center sm:items-start gap-6">
                  <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-2xl overflow-hidden shrink-0 border-4 border-white/20 shadow-lg bg-white/10 relative">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        const target = e.currentTarget;
                        target.style.display = 'none';
                      }}
                    />
                  </div>
                  <div className="text-center sm:text-left flex-grow">
                    <span className="inline-block px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-[10px] font-semibold uppercase tracking-wider mb-2 border border-cyan-400/30">
                      {member.badge}
                    </span>
                    <h3 className="text-2xl font-bold text-white mb-2 tracking-tight">
                      {member.name}
                    </h3>
                    <p className="text-cyan-300 text-xs sm:text-sm font-medium leading-relaxed">
                      {member.role}
                    </p>
                  </div>
                </div>

                {/* Bio & Description */}
                <div className="p-6 sm:p-8 flex-grow flex flex-col justify-between bg-white space-y-4">
                  <div className="space-y-3 text-slate-600 text-xs sm:text-sm leading-relaxed text-justify">
                    {member.description.map((paragraph, i) => (
                      <p key={i}>{paragraph}</p>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-slate-400 font-medium">CuraQuantis™ Board of Directors</span>
                    <a
                      href={member.email}
                      className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 hover:bg-blue-600 text-blue-700 hover:text-white transition-colors font-medium shadow-xs"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>Contact Office</span>
                    </a>
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
