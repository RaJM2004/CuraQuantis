import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const CyberSecurity = () => {
  const subdomains = [
    {
      id: 'ai-driven-defence',
      title: 'AI-Driven Cyber Defence',
      description: 'Advanced AI systems for proactive cyber threat detection and response.',
      features: [
        'Real-time threat detection',
        'Automated response systems',
        'Behavioral analytics',
        'Zero-day vulnerability protection'
      ],
      image: 'https://images.pexels.com/photos/5380664/pexels-photo-5380664.jpeg'
    },
    {
      id: 'network-security',
      title: 'Network Security',
      description: 'Comprehensive network protection and monitoring solutions.',
      features: [
        'Network monitoring',
        'Intrusion detection',
        'Traffic analysis',
        'Access control'
      ],
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80'
    },
    {
      id: 'endpoint-security',
      title: 'Endpoint Security',
      description: 'Advanced endpoint protection with AI-powered threat detection.',
      features: [
        'Device protection',
        'Malware prevention',
        'Data encryption',
        'Remote management'
      ],
      image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80'
    },
    {
      id: 'security-analytics',
      title: 'Security Analytics',
      description: 'Advanced analytics and reporting for security insights.',
      features: [
        'Security metrics',
        'Risk assessment',
        'Compliance reporting',
        'Incident analysis'
      ],
      image: 'https://images.unsplash.com/photo-1516321165247-4aa89a48be28?auto=format&fit=crop&q=80'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 to-slate-50">
      <Navbar />
      <div 
        className="relative h-[500px] bg-cover bg-center"
        style={{
          backgroundImage: 'url(https://images.pexels.com/photos/5380649/pexels-photo-5380649.jpeg)'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-900/80 to-transparent">
          <div className="container mx-auto px-6 h-full flex items-center">
            <div className="max-w-2xl text-white">
              <h1 className="text-5xl font-light mb-6">Cyber Security Solutions</h1>
              <p className="text-xl opacity-90">
                Protect your digital assets with our AI-powered cybersecurity solutions for comprehensive threat defense.
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
                  <h2 className="text-2xl font-light mb-4 text-zinc-900">
                    {subdomain.title}
                  </h2>
                  <p className="text-gray-600 mb-6">{subdomain.description}</p>
                  
                  <div className="space-y-3">
                    {subdomain.features.map((feature, index) => (
                      <div 
                        key={index}
                        className="p-4 bg-zinc-50 rounded-xl border border-zinc-100 hover:border-slate-300 transition-colors duration-300"
                      >
                        <p className="text-zinc-900">{feature}</p>
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

export default CyberSecurity;