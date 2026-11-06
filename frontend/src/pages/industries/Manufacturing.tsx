import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const Manufacturing = () => {
  const subdomains = [
    {
      id: 'predictive-maintenance',
      title: 'Predictive Maintenance',
      description: 'AI-powered systems for predicting equipment maintenance needs and preventing downtime.',
      features: [
        'Equipment health monitoring',
        'Failure prediction',
        'Maintenance scheduling',
        'Performance optimization'
      ],
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80'
    },
    {
      id: 'quality-control',
      title: 'Quality Control',
      description: 'Advanced quality inspection and control systems using computer vision and AI.',
      features: [
        'Automated inspection',
        'Defect detection',
        'Quality analytics',
        'Process optimization'
      ],
      image: 'https://images.unsplash.com/photo-1565361849959-526378c19711?auto=format&fit=crop&q=80'
    },
    {
      id: 'supply-chain',
      title: 'Supply Chain Optimization',
      description: 'Intelligent supply chain management solutions for improved efficiency.',
      features: [
        'Inventory optimization',
        'Demand forecasting',
        'Logistics planning',
        'Supplier management'
      ],
      image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80'
    },
    {
      id: 'automation',
      title: 'Industrial Automation',
      description: 'Smart automation solutions for manufacturing processes and operations.',
      features: [
        'Process automation',
        'Robotic integration',
        'Production planning',
        'Energy optimization'
      ],
      image: 'https://images.unsplash.com/photo-1563203369-26f2e4a5ccf7?auto=format&fit=crop&q=80'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Navbar />
      <div 
        className="relative h-[500px] bg-cover bg-center"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1416397202228-6b2eb5b3c02d?auto=format&fit=crop&q=80)'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 to-transparent">
          <div className="container mx-auto px-6 h-full flex items-center">
            <div className="max-w-2xl text-white">
              <h1 className="text-5xl font-light mb-6">Manufacturing Solutions</h1>
              <p className="text-xl opacity-90">
                Transform your manufacturing operations with our AI-powered solutions for improved efficiency and quality.
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
                  <h2 className="text-2xl font-light mb-4 text-slate-900">
                    {subdomain.title}
                  </h2>
                  <p className="text-gray-600 mb-6">{subdomain.description}</p>
                  
                  <div className="space-y-3">
                    {subdomain.features.map((feature, index) => (
                      <div 
                        key={index}
                        className="p-4 bg-slate-50 rounded-xl border border-slate-100 hover:border-blue-300 transition-colors duration-300"
                      >
                        <p className="text-slate-900">{feature}</p>
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

export default Manufacturing;