import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const Meat = () => {
  const subdomains = [
    {
      id: 'ai-meat-quality',
      title: 'AI Meat Quality',
      description: 'AI-powered quality assessment and grading for meat products.',
      features: [
        'Automated grading',
        'Contaminant detection',
        'Supply chain monitoring',
        'Shelf-life prediction'
      ],
      image: 'http://aihub.today/wp-content/uploads/2023/08/7th-june-Blog.webp'
    },
    {
      id: 'ai-meat-production',
      title: 'AI Meat Production',
      description: 'AI systems for optimizing meat production and processing.',
      features: [
        'Process automation',
        'Yield optimization',
        'Predictive maintenance',
        'Traceability solutions'
      ],
      image: 'https://cdn.geekboots.com/geek/ai-ml-transform-future-meta-1699105370270.jpg'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Navbar />
      <div 
        className="relative h-[500px] bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: 'url(https://www.letsnurture.com/wp-content/uploads/2020/02/ai-for-food-detection-blog-banner.jpg)',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 to-transparent">
          <div className="container mx-auto px-6 h-full flex items-center">
            <div className="max-w-2xl text-white">
              <h1 className="text-5xl font-light mb-6">Meat & AI</h1>
              <p className="text-xl opacity-90">
                Ensure quality, safety, and efficiency in meat production with AI-powered solutions.
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

export default Meat;
