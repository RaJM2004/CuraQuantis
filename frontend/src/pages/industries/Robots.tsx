import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const Robots = () => {
  const subdomains = [
    {
      id: 'ai-robotics',
      title: 'AI Robotics',
      description: 'AI-driven robotics for automation, manufacturing, and service industries.',
      features: [
        'Autonomous navigation',
        'Object recognition',
        'Collaborative robots (cobots)',
        'Predictive maintenance'
      ],
      image: 'https://d36ae2cxtn9mcr.cloudfront.net/wp-content/uploads/2020/12/16024303/Humanoid.png' // Robot arm in factory
    },
    {
      id: 'ai-robot-control',
      title: 'AI Robot Control',
      description: 'Advanced control systems for intelligent robots using AI.',
      features: [
        'Motion planning',
        'Sensor fusion',
        'Human-robot interaction',
        'Real-time decision making'
      ],
      image: 'https://techtutorialz.com/wp-content/uploads/2018/07/ArtificialIntelligence_Robotics1.jpg?x83607' // Humanoid robot with control panel
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Navbar />
      <div 
        className="relative h-[500px] bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: 'url(https://static.vecteezy.com/system/resources/previews/024/570/142/large_2x/3d-rendering-robot-working-in-the-laboratory-artificial-intelligence-and-machine-learning-concept-an-ai-robot-scientist-doing-experiments-in-the-laboratory-ai-generated-free-photo.jpg)', // Robot arm in factory
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 to-transparent">
          <div className="container mx-auto px-6 h-full flex items-center">
            <div className="max-w-2xl text-white">
              <h1 className="text-5xl font-light mb-6">Robots & AI</h1>
              <p className="text-xl opacity-90">
                Empower robotics with AI for smarter automation and interaction.
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

export default Robots;
