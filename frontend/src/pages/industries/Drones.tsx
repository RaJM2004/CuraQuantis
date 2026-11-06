import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const Drones = () => {
  const subdomains = [
    {
      id: 'ai-drone-navigation',
      title: 'AI Drone Navigation',
      description: 'AI-powered autonomous navigation and control for drones.',
      features: [
        'Obstacle avoidance',
        'Real-time path planning',
        'Sensor fusion',
        'Swarm intelligence'
      ],
      image: 'https://scitechdaily.com/images/Drone-Over-City-New-Chip-Art-Concept.jpg'
    },
    {
      id: 'ai-drone-analytics',
      title: 'AI Drone Analytics',
      description: 'AI systems for aerial data analysis and mission automation.',
      features: [
        'Image/video analysis',
        'Crop health monitoring',
        'Infrastructure inspection',
        'Disaster response'
      ],
      image: 'https://tse4.mm.bing.net/th/id/OIP.peCavJ9FwMKOtpQSJAqh7gHaDj?pid=Api&P=0&h=220'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Navbar />
      <div 
        className="relative h-[500px] bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: 'url(https://img.freepik.com/premium-photo/visualize-surveillance-state-with-drones-patrolling-ai-generated_1030530-442.jpg)',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 to-transparent">
          <div className="container mx-auto px-6 h-full flex items-center">
            <div className="max-w-2xl text-white">
              <h1 className="text-5xl font-light mb-6">Drones & AI</h1>
              <p className="text-xl opacity-90">
                Unlock new possibilities in aerial automation and analytics with AI-powered drones.
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

export default Drones;
