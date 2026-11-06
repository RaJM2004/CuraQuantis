import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const Law = () => {
  const subdomains = [
    {
      id: 'ai-law-research',
      title: 'AI Legal Research',
      description: 'AI-powered tools for legal research and case analysis.',
      features: [
        'Automated case law search',
        'Contract analysis',
        'Legal document summarization',
        'Predictive analytics for case outcomes'
      ],
      image: 'https://www.lexisnexis.com/community/cfs-file/__key/communityserver-blogs-components-weblogfiles/00-00-00-00-16/Artificial_2D00_Intelligence_2D00_Lawyer_2D00_Robot_2D00_AI_2D00_Judge.jpg'
    },
    {
      id: 'ai-compliance',
      title: 'AI Compliance Monitoring',
      description: 'AI systems for regulatory compliance and risk management.',
      features: [
        'Real-time compliance tracking',
        'Risk assessment',
        'Automated reporting',
        'Fraud detection'
      ],
      image: 'https://northridgegroup.com/wp-content/uploads/2024/08/reg-compliance.jpg'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Navbar />
      <div 
        className="relative h-[500px] bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: 'url(https://www.biicl.org/images/user/13970_ai20in20legal20practice.jpg)',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 to-transparent">
          <div className="container mx-auto px-6 h-full flex items-center">
            <div className="max-w-2xl text-white">
              <h1 className="text-5xl font-light mb-6">Law & AI</h1>
              <p className="text-xl opacity-90">
                Transform legal practice with AI-driven research, compliance, and analytics solutions.
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

export default Law;
