import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const Defence = () => {
  const subdomains = [
    {
      id: 'ai-driven-defence',
      title: 'AI Driven Defence',
      description: 'Advanced AI systems for military and defense applications.',
      features: [
        'Threat detection',
        'Strategic planning',
        'Autonomous systems',
        'Defense analytics'
      ],
      image: 'https://as2.ftcdn.net/v2/jpg/08/81/63/37/1000_F_881633751_L67MxhHEpdWCwGlLNs621ZEoVbDELCa4.jpg'
    },
    {
      id: 'drones',
      title: 'Military Drones',
      description: 'AI-powered drone systems for surveillance and reconnaissance.',
      features: [
        'Autonomous navigation',
        'Real-time monitoring',
        'Mission planning',
        'Data analysis'
      ],
      image: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&q=80'
    },
    {
      id: 'cyber-security-defence',
      title: 'Cyber Security Defence',
      description: 'Advanced cybersecurity solutions for military networks.',
      features: [
        'Network protection',
        'Threat intelligence',
        'Incident response',
        'Security monitoring'
      ],
      image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Navbar />
      <div 
        className="relative h-[500px] bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: 'url(https://images.pexels.com/photos/76971/fighter-jet-fighter-aircraft-f-16-falcon-aircraft-76971.jpeg)',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 to-transparent">
          <div className="container mx-auto px-6 h-full flex items-center">
            <div className="max-w-2xl text-white">
              <h1 className="text-5xl font-light mb-6">Defence Solutions</h1>
              <p className="text-xl opacity-90">
                Enhance military capabilities with our AI-powered defense solutions for improved security and strategic advantage.
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

export default Defence;