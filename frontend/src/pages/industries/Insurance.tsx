import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const Insurance = () => {
  const subdomains = [
    {
      id: 'ai-risk-assessment',
      title: 'AI Risk Assessment',
      description: 'AI-powered risk analysis and fraud detection for insurance.',
      features: [
        'Automated underwriting',
        'Fraud detection',
        'Claims prediction',
        'Customer segmentation'
      ],
      image: 'https://www.jonesday.com/-/media/images/publications/2023/02/nist-releases-ai-risk-management-framework/imageoverrideforopengraph/ai_standards_risk_management_social.jpeg?rev=92b5bb73a1124da2975087cd0e95bdac&hash=3CDBCB8A2B03790881611DBE150AABD7'
    },
    {
      id: 'ai-claims-processing',
      title: 'AI Claims Processing',
      description: 'Streamline insurance claims with AI-driven automation and analytics.',
      features: [
        'Claims automation',
        'Document analysis',
        'Chatbots for support',
        'Anomaly detection'
      ],
      image: 'https://tse3.mm.bing.net/th/id/OIP._k50i2-kY7SmW2wN-1a_hAHaE7?pid=Api&P=0&h=220'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Navbar />
      <div 
        className="relative h-[500px] bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: 'url(https://stories.simplyioa.com/hubfs/AI-Insurance-Blog.jpg)',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 to-transparent">
          <div className="container mx-auto px-6 h-full flex items-center">
            <div className="max-w-2xl text-white">
              <h1 className="text-5xl font-light mb-6">Insurance & AI</h1>
              <p className="text-xl opacity-90">
                Transform insurance operations and customer experience with AI-powered solutions.
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

export default Insurance;
