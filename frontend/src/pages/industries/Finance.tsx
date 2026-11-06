import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const Finance = () => {
  const subdomains = [
    {
      id: 'stock-market',
      title: 'Stock Market',
      description: 'Advanced AI-driven stock market analysis and trading solutions for optimal investment decisions.',
      features: [
        'Real-time market analysis',
        'Predictive trading algorithms',
        'Risk assessment models',
         'Portfolio optimization'
      ],
      image: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&q=80'
    },
    {
      id: 'risk-management',
      title: 'Risk Management',
      description: 'Comprehensive risk assessment and management solutions powered by machine learning.',
      features: [
        'Credit risk evaluation',
        'Market risk analysis',
        'Fraud detection systems',
        'Compliance monitoring'
      ],
      image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80'
    },
    {
      id: 'fraud-detection',
      title: 'Fraud Detection',
      description: 'Intelligent fraud detection and prevention systems using advanced pattern recognition.',
      features: [
        'Real-time transaction monitoring',
        'Anomaly detection',
        'Behavioral analysis',
        'Anti-money laundering'
      ],
      image: 'https://images.unsplash.com/photo-1616803140344-6682afb13cda?auto=format&fit=crop&q=80'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-slate-50">
      <Navbar />
      <div 
        className="relative h-[500px] bg-cover bg-center"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80)'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/80 to-transparent">
          <div className="container mx-auto px-6 h-full flex items-center">
            <div className="max-w-2xl text-white">
              <h1 className="text-5xl font-light mb-6">Financial Solutions</h1>
              <p className="text-xl opacity-90">
                Revolutionize financial operations with our AI-powered solutions, designed to enhance decision-making and reduce risks.
              </p>
            </div>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-6 py-20">
        <div className="grid md:grid-cols-3 gap-8">
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
                  <h2 className="text-2xl font-light mb-4 text-emerald-900">
                    {subdomain.title}
                  </h2>
                  <p className="text-gray-600 mb-6">{subdomain.description}</p>
                  
                  <div className="space-y-3">
                    {subdomain.features.map((feature, index) => (
                      <div 
                        key={index}
                        className="p-4 bg-emerald-50 rounded-xl border border-emerald-100 hover:border-emerald-300 transition-colors duration-300"
                      >
                        <p className="text-emerald-900">{feature}</p>
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

export default Finance;