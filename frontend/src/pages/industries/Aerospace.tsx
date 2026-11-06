import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const Aerospace = () => {
  const subdomains = [
    {
      id: 'ai-aerospace-design',
      title: 'AI Aerospace Design',
      description: 'AI-driven design and simulation for aerospace engineering.',
      features: [
        'Flight simulation',
        'Predictive maintenance',
        'Autonomous navigation',
        'Material optimization'
      ],
      image: 'https://www.aerotime.aero/images/Aircraft-render-representing-artifical-intelligence-1600x1000.jpeg'
    },
    {
      id: 'ai-space-exploration',
      title: 'AI Space Exploration',
      description: 'AI systems for mission planning and data analysis in space exploration.',
      features: [
        'Mission planning',
        'Satellite data analysis',
        'Autonomous spacecraft',
        'Anomaly detection'
      ],
      image: 'https://futuretech.media/wp-content/uploads/2022/09/1623152479150.jpg'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Navbar />
      <div 
        className="relative h-[500px] bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: 'url(https://julienflorkin.com/wp-content/uploads/2024/02/AI-in-Aerospace_2-1024x585.webp)',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 to-transparent">
          <div className="container mx-auto px-6 h-full flex items-center">
            <div className="max-w-2xl text-white">
              <h1 className="text-5xl font-light mb-6">Aerospace & AI</h1>
              <p className="text-xl opacity-90">
                Revolutionize aerospace engineering and space exploration with AI-powered solutions.
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
                  className="h-64 bg-cover bg-center"
                  style={{ backgroundImage: `url(${subdomain.image})` }}
                />
                <div className="p-8">
                  <h2 className="text-2xl font-light mb-4 text-gray-900">
                    {subdomain.title}
                  </h2>
                  <p className="text-gray-600 mb-6">{subdomain.description}</p>
                  <div className="space-y-3">
                    {subdomain.features.map((feature, index) => (
                      <div 
                        key={index}
                        className="p-4 bg-gray-50 rounded-xl border border-gray-100 hover:border-blue-300 transition-colors duration-300"
                      >
                        <p className="text-gray-900">{feature}</p>
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

export default Aerospace;
