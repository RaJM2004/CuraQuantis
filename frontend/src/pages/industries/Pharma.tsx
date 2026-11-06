import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const Pharma = () => {
  const subdomains = [
    {
      id: 'quality-assurance',
      title: 'Quality Assurance (QA)',
      description: 'AI-powered quality control and assurance systems for pharmaceutical manufacturing.',
      features: [
        'Automated quality testing',
        'Batch analysis and verification',
        'Compliance documentation',
        'Process optimization'
      ],
      image: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&q=80'
    },
    {
      id: 'regulatory-affairs',
      title: 'Regulatory Affairs (RA)',
      description: 'Intelligent regulatory compliance and documentation management solutions.',
      features: [
        'Regulatory submission automation',
        'Compliance monitoring',
        'Documentation management',
        'Regulatory intelligence'
      ],
      image: 'https://images.unsplash.com/photo-1579165466991-467135ad3110?auto=format&fit=crop&q=80'
    },
    {
      id: 'crm',
      title: 'CRM',
      description: 'Advanced customer relationship management systems for pharmaceutical companies.',
      features: [
        'Healthcare provider engagement',
        'Sales force automation',
        'Market access management',
        'Patient support programs'
      ],
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80'
    },
    {
      id: 'training',
      title: 'Training',
      description: 'Comprehensive training solutions for pharmaceutical professionals using AI.',
      features: [
        'Interactive learning modules',
        'Compliance training',
        'Skill assessment',
        'Performance tracking'
      ],
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50">
      <Navbar />
      <div 
        className="relative h-[500px] bg-cover bg-center"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1631549916768-4119b2e5f926?auto=format&fit=crop&q=80)'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/80 to-transparent">
          <div className="container mx-auto px-6 h-full flex items-center">
            <div className="max-w-2xl text-white">
              <h1 className="text-5xl font-light mb-6">Biotech & Pharma Solutions</h1>
              <p className="text-xl opacity-90">
                Enhance pharmaceutical operations with our AI-driven solutions, designed to improve quality, compliance, and efficiency.
              </p>
            </div>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-8">
          {subdomains.map((subdomain) => (
            <section 
              key={subdomain.title} 
              id={subdomain.id}
              className="scroll-mt-24"
            >
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]">
                <div 
                  className="h-48 bg-cover bg-center"
                  style={{ backgroundImage: `url(${subdomain.image})` }}
                />
                <div className="p-8">
                  <h2 className="text-2xl font-light mb-4 text-purple-900">
                    {subdomain.title}
                  </h2>
                  <p className="text-gray-600 mb-6">{subdomain.description}</p>
                  
                  <div className="space-y-3">
                    {subdomain.features.map((feature, index) => (
                      <div 
                        key={index}
                        className="p-4 bg-purple-50 rounded-xl border border-purple-100 hover:border-purple-300 transition-colors duration-300"
                      >
                        <p className="text-purple-900">{feature}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Pharma;