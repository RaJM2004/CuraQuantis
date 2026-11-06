import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const Semiconductor = () => {
  const subdomains = [
    {
      id: 'ai-chip-design',
      title: 'AI Chip Design',
      description: 'Accelerate semiconductor innovation with AI-driven chip design and verification.',
      features: [
        'Automated layout optimization',
        'Defect detection',
        'Yield prediction',
        'EDA tool enhancement'
      ],
      image: 'https://images.anandtech.com/doci/18798/synopsys-ai_chip_design-678_678x452.png'
    },
    {
      id: 'ai-manufacturing',
      title: 'AI in Manufacturing',
      description: 'AI-powered process control and predictive maintenance for semiconductor fabs.',
      features: [
        'Process anomaly detection',
        'Equipment health monitoring',
        'Supply chain optimization',
        'Quality assurance'
      ],
      image: 'https://www.mindinventory.com/blog/wp-content/uploads/2024/07/AI-in-Manufacturing.webp'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Navbar />
      <div 
        className="relative h-[500px] bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: 'url(https://www.semiconductor-digest.com/wp-content/uploads/2022/10/October-cover-photo-scaled.jpg)',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 to-transparent">
          <div className="container mx-auto px-6 h-full flex items-center">
            <div className="max-w-2xl text-white">
              <h1 className="text-5xl font-light mb-6">Semiconductor & AI</h1>
              <p className="text-xl opacity-90">
                Drive the future of electronics with AI-powered semiconductor solutions.
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

export default Semiconductor;
