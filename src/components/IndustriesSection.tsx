
import React, { useState } from 'react';
import { Heart, DollarSign, Dna, Shield, Lock, Pill, Wheat, ShoppingCart, ChevronDown, Building, Bot, Navigation } from 'lucide-react';

interface IndustriesSectionProps {
  onIndustryClick: (path: string) => void;
}

const IndustriesSection: React.FC<IndustriesSectionProps> = ({ onIndustryClick }) => {
  const [expandedIndustry, setExpandedIndustry] = useState<string | null>(null);

  const industries = [
    { 
      icon: Heart, 
      title: 'Healthcare', 
      description: 'Transforming patient care with AI-powered diagnostics and treatment optimization.',
      subdomains: ['Gen AI', 'Agentic AI'],
      path: '/industries/healthcare'
    },
    { 
      icon: Bot, 
      title: 'Robots', 
      description: 'Advanced AI control systems for next-generation robotics and automation.',
      subdomains: ['AI Robotics', 'AI Robot Control'],
      path: 'https://zerokostrobo.netlify.app/',
      isExternal: true
    },
    // { 
    //   icon: Building, 
    //   title: 'Real Estate', 
    //   description: 'Revolutionizing real estate with autonomous AI calling agents for lead conversion.',
    //   subdomains: ['AI Calling Agent'],
    //   path: '/industries/real-estate'
    // },
    // { 
    //   icon: Navigation, 
    //   title: 'Drones', 
    //   description: 'Autonomous drone navigation and real-time analytics for aerial intelligence.',
    //   subdomains: ['AI Drone Navigation', 'AI Drone Analytics'],
    //   path: '/industries/drones'
    // },
  ];

  const handleIndustryClick = (industry: any) => {
    if (industry.isExternal) {
      window.open(industry.path, '_blank', 'noopener,noreferrer');
      return;
    }
    if (industry.path) {
      onIndustryClick(industry.path);
    } else {
      setExpandedIndustry(expandedIndustry === industry.title ? null : industry.title);
    }
  };

  return (
    <section id="industries" className="py-32 bg-gradient-to-br from-blue-50/30 to-cyan-50/50 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="section-heading mb-6 slide-up">
            AI Solutions Across Industries
          </h2>
          <p className="text-xl minimal-text max-w-3xl mx-auto slide-up stagger-1 font-light">
            Our cutting-edge AI technologies are transforming businesses across multiple sectors, delivering unprecedented value and innovation.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {industries.map((industry, index) => (
            <div 
              key={industry.title}
              className={`silent-card p-8 subtle-hover slide-up stagger-${(index % 4) + 1} group cursor-pointer border-l-4 border-l-transparent hover:border-l-blue-600 transition-all duration-300`}
              onClick={() => handleIndustryClick(industry)}
            >
              <div className="flex justify-between items-start mb-6">
                <industry.icon className="w-8 h-8 text-blue-600 group-hover:text-blue-500 transition-colors duration-300" strokeWidth={1} />
                {industry.subdomains && (
                  <ChevronDown 
                    className={`w-5 h-5 transition-transform duration-300 ${expandedIndustry === industry.title ? 'rotate-180' : ''}`} 
                    strokeWidth={1.5} 
                  />
                )}
              </div>
              <h3 className="text-xl font-light mb-4 healthcare-text">{industry.title}</h3>
              <p className="minimal-text text-sm leading-relaxed mb-4">{industry.description}</p>
              
              {expandedIndustry === industry.title && industry.subdomains && (
                <div className="mt-4 space-y-2 border-t pt-4 border-gray-100">
                  {industry.subdomains.map((subdomain) => (
                    <div 
                      key={subdomain}
                      className="text-sm text-gray-600 hover:text-blue-600 transition-colors duration-300 pl-4 border-l-2 border-transparent hover:border-blue-400"
                    >
                      {subdomain}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IndustriesSection;
