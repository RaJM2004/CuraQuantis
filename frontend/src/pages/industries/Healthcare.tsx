import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const Healthcare = () => {
  const subdomains = [
    {
      id: 'gen-ai',
      title: 'Gen AI',
      description: 'Leveraging generative AI for advanced healthcare solutions and medical imaging analysis.',
      features: [
        'Medical image synthesis and analysis',
        'Patient data generation for research',
        'Personalized treatment planning',
        'Drug discovery and development'
      ],
      path: '/industries/healthcare/gen-ai',
      image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80'
    },
    {
      id: 'agentic-ai',
      title: 'Agentic AI',
      description: 'Autonomous AI agents for personalized patient care and medical decision support.',
      features: [
        'Automated patient monitoring',
        'Intelligent diagnosis assistance',
        'Treatment recommendation systems',
        'Healthcare workflow optimization'
      ],
      path: '/industries/healthcare/agentic-ai',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50">
      <Navbar />
      <div 
        className="relative h-[500px] bg-cover bg-center"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1504813184591-01572f98c85f?auto=format&fit=crop&q=80)'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-transparent">
          <div className="container mx-auto px-6 h-full flex items-center">
            <div className="max-w-2xl text-white">
              <h1 className="text-5xl font-light mb-6">Healthcare Solutions</h1>
              <p className="text-xl opacity-90">
                Transform healthcare delivery with our cutting-edge AI solutions, designed to enhance patient care and streamline medical operations.
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
              <Link to={subdomain.path} className="block group">
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform group-hover:scale-[1.02]">
                  <div 
                    className="h-48 bg-cover bg-center"
                    style={{ backgroundImage: `url(${subdomain.image})` }}
                  />
                  <div className="p-8">
                    <h2 className="text-3xl font-light mb-4 text-blue-900 group-hover:text-blue-700 transition-colors">
                      {subdomain.title}
                    </h2>
                    <p className="text-lg text-gray-600 mb-6">{subdomain.description}</p>
                    
                    <div className="grid gap-4">
                      {subdomain.features.map((feature, index) => (
                        <div 
                          key={index}
                          className="p-4 bg-blue-50 rounded-xl border border-blue-100 group-hover:border-blue-300 transition-colors duration-300"
                        >
                          <p className="text-blue-900">{feature}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            </section>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Healthcare;