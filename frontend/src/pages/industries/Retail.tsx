import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const Retail = () => {
  const subdomains = [
    {
      id: 'inventory-management',
      title: 'Inventory Management',
      description: 'AI-powered inventory optimization and management systems.',
      features: [
        'Stock level optimization',
        'Demand forecasting',
        'Automated reordering',
        'Inventory tracking'
      ],
      image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80'
    },
    {
      id: 'customer-analytics',
      title: 'Customer Analytics',
      description: 'Advanced customer behavior analysis and personalization solutions.',
      features: [
        'Shopping pattern analysis',
        'Customer segmentation',
        'Personalized recommendations',
        'Loyalty programs'
      ],
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80'
    },
    {
      id: 'store-optimization',
      title: 'Store Optimization',
      description: 'Smart solutions for improving in-store operations and customer experience.',
      features: [
        'Layout optimization',
        'Traffic flow analysis',
        'Staff scheduling',
        'Queue management'
      ],
      image: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?auto=format&fit=crop&q=80'
    },
    {
      id: 'price-optimization',
      title: 'Price Optimization',
      description: 'Dynamic pricing and promotion management systems.',
      features: [
        'Dynamic pricing',
        'Competitor analysis',
        'Promotion planning',
        'Revenue optimization'
      ],
      image: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&q=80'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-orange-50">
      <Navbar />
      <div 
        className="relative h-[500px] bg-cover bg-center"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?auto=format&fit=crop&q=80)'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-rose-900/80 to-transparent">
          <div className="container mx-auto px-6 h-full flex items-center">
            <div className="max-w-2xl text-white">
              <h1 className="text-5xl font-light mb-6">Retail Solutions</h1>
              <p className="text-xl opacity-90">
                Transform your retail business with our AI-powered solutions for improved operations and customer experience.
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
                  <h2 className="text-2xl font-light mb-4 text-rose-900">
                    {subdomain.title}
                  </h2>
                  <p className="text-gray-600 mb-6">{subdomain.description}</p>
                  
                  <div className="space-y-3">
                    {subdomain.features.map((feature, index) => (
                      <div 
                        key={index}
                        className="p-4 bg-rose-50 rounded-xl border border-rose-100 hover:border-rose-300 transition-colors duration-300"
                      >
                        <p className="text-rose-900">{feature}</p>
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

export default Retail;