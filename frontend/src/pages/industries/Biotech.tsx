import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const Biotech = () => {
  const subdomains = [
    {
      id: 'drug-discovery',
      title: 'Drug Discovery',
      description: 'AI-powered drug discovery and development solutions.',
      features: [
        'Molecular modeling',
        'Target identification',
        'Lead optimization',
        'Clinical trial analysis'
      ],
      image: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&q=80'
    },
    {
      id: 'drug-repurposing',
      title: 'Drug Repurposing',
      description: 'Intelligent solutions for identifying new uses for existing drugs.',
      features: [
        'Drug screening',
        'Mechanism prediction',
        'Safety assessment',
        'Efficacy analysis'
      ],
      image: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&q=80'
    },
    {
      id: 'genomics',
      title: 'Genomics Research',
      description: 'Advanced genomics analysis and research tools.',
      features: [
        'Sequence analysis',
        'Variant detection',
        'Gene expression',
        'Pathway analysis'
      ],
      image: 'https://images.unsplash.com/photo-1614935151651-0bea6508db6b?auto=format&fit=crop&q=80'
    },
    {
      id: 'biomarker-discovery',
      title: 'Biomarker Discovery',
      description: 'AI-driven biomarker identification and validation.',
      features: [
        'Data integration',
        'Pattern recognition',
        'Validation studies',
        'Clinical correlation'
      ],
      image: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&q=80'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50">
      <Navbar />
      <div 
        className="relative h-[500px] bg-cover bg-center"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&q=80)'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/80 to-transparent">
          <div className="container mx-auto px-6 h-full flex items-center">
            <div className="max-w-2xl text-white">
              <h1 className="text-5xl font-light mb-6">Biotech Solutions</h1>
              <p className="text-xl opacity-90">
                Accelerate biotech research and development with our AI-powered solutions for drug discovery and genomics.
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
                  <h2 className="text-2xl font-light mb-4 text-indigo-900">
                    {subdomain.title}
                  </h2>
                  <p className="text-gray-600 mb-6">{subdomain.description}</p>
                  
                  <div className="space-y-3">
                    {subdomain.features.map((feature, index) => (
                      <div 
                        key={index}
                        className="p-4 bg-indigo-50 rounded-xl border border-indigo-100 hover:border-indigo-300 transition-colors duration-300"
                      >
                        <p className="text-indigo-900">{feature}</p>
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

export default Biotech;