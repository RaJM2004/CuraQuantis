import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const Agriculture = () => {
  const subdomains = [
    {
      id: 'plant-disease',
      title: 'Plant Disease Prediction',
      description: 'Advanced AI systems for early detection and prediction of plant diseases.',
      features: [
        'Image-based disease detection',
        'Predictive disease modeling',
        'Treatment recommendations',
        'Crop health monitoring'
      ],
      image: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&q=80'
    },
    {
      id: 'crop-yield',
      title: 'Crop Yield Optimization',
      description: 'AI-driven solutions for maximizing crop yields through data analysis and predictions.',
      features: [
        'Yield forecasting',
        'Growth optimization',
        'Resource allocation',
        'Weather impact analysis'
      ],
      image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&q=80'
    },
    {
      id: 'smart-irrigation',
      title: 'Smart Irrigation',
      description: 'Intelligent irrigation systems for optimal water usage and crop health.',
      features: [
        'Automated watering schedules',
        'Soil moisture monitoring',
        'Weather-based adjustments',
        'Water usage optimization'
      ],
      image: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&q=80'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
      <Navbar />
      <div 
        className="relative h-[500px] bg-cover bg-center"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&q=80)'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-green-900/80 to-transparent">
          <div className="container mx-auto px-6 h-full flex items-center">
            <div className="max-w-2xl text-white">
              <h1 className="text-5xl font-light mb-6">Agricultural Solutions</h1>
              <p className="text-xl opacity-90">
                Transform farming practices with our AI-powered solutions, designed to optimize crop yields and resource management.
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
                  <h2 className="text-2xl font-light mb-4 text-green-900">
                    {subdomain.title}
                  </h2>
                  <p className="text-gray-600 mb-6">{subdomain.description}</p>
                  
                  <div className="space-y-3">
                    {subdomain.features.map((feature, index) => (
                      <div 
                        key={index}
                        className="p-4 bg-green-50 rounded-xl border border-green-100 hover:border-green-300 transition-colors duration-300"
                      >
                        <p className="text-green-900">{feature}</p>
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

export default Agriculture;