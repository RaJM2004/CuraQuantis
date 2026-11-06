import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const Nutrition = () => {
  const subdomains = [
    {
      id: 'ai-nutrition-analysis',
      title: 'AI Nutrition Analysis',
      description: 'AI-powered dietary analysis and personalized nutrition plans.',
      features: [
        'Diet tracking',
        'Personalized meal recommendations',
        'Nutrient deficiency detection',
        'Food image recognition'
      ],
      image: 'https://images.unsplash.com/photo-1494390248081-4e521a5940db?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    {
      id: 'ai-food-safety',
      title: 'AI Food Safety',
      description: 'AI systems for food safety monitoring and quality assurance.',
      features: [
        'Contaminant detection',
        'Supply chain monitoring',
        'Shelf-life prediction',
        'Quality control automation'
      ],
      image: 'https://www.azorobotics.com/images/Article_Images/ImageForArticle_507_16500166697834546.jpg'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Navbar />
      <div 
        className="relative h-[500px] bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80)',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 to-transparent">
          <div className="container mx-auto px-6 h-full flex items-center">
            <div className="max-w-2xl text-white">
              <h1 className="text-5xl font-light mb-6">Nutrition & AI</h1>
              <p className="text-xl opacity-90">
                Enhance health and wellness with AI-driven nutrition and food safety solutions.
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

export default Nutrition;
