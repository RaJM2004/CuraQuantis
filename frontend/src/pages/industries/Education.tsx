import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const Education = () => {
  const subdomains = [
    {
      id: 'ai-edtech',
      title: 'AI in EdTech',
      description: 'Personalized learning and smart content delivery powered by AI.',
      features: [
        'Adaptive learning platforms',
        'Automated grading',
        'Intelligent tutoring systems',
        'Content recommendation'
      ],
      image: 'https://www.appdevelopmentcompanies.net/wp-content/uploads/AI-in-EdTech.jpg'
    },
    {
      id: 'ai-education-analytics',
      title: 'AI Education Analytics',
      description: 'AI-driven analytics for student performance and engagement.',
      features: [
        'Student performance prediction',
        'Dropout risk analysis',
        'Engagement tracking',
        'Curriculum optimization'
      ],
      image: 'https://www.aiplusinfo.com/wp-content/uploads/2024/12/Learning-analytics-and-insights-from-AI-1208x690.jpeg'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Navbar />
      <div 
        className="relative h-[500px] bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: 'url(https://geniusee.com/storage/app/media/blog/blog251_ai_in_edtech/ai_in_edtech_pv.png)',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 to-transparent">
          <div className="container mx-auto px-6 h-full flex items-center">
            <div className="max-w-2xl text-white">
              <h1 className="text-5xl font-light mb-6">Education & AI</h1>
              <p className="text-xl opacity-90">
                Transform learning experiences and educational outcomes with AI-powered solutions.
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

export default Education;
