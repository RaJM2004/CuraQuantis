import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const AIChatbot = () => {
  const subdomains = [
    {
      id: 'patient-support',
      title: 'Patient Support',
      description: 'Intelligent patient assistance and query handling.',
      features: [
        'Appointment scheduling',
        'Medical information queries',
        'Prescription refills',
        'Insurance inquiries'
      ]
    },
    {
      id: 'ai-capabilities',
      title: 'AI Capabilities',
      description: 'Advanced artificial intelligence features for enhanced interaction.',
      features: [
        'Natural language processing',
        'Contextual understanding',
        'Multi-language support',
        'Sentiment analysis'
      ]
    },
    {
      id: 'integration-analytics',
      title: 'Integration & Analytics',
      description: 'Seamless system integration and performance tracking.',
      features: [
        'EHR integration',
        'Usage analytics',
        'Performance metrics',
        'Continuous learning'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50/30 to-amber-50/50">
      <Navbar />
      <main className="container mx-auto px-6 py-32">
        <div className="flex flex-col md:flex-row items-center gap-12 mb-16">
          <div className="flex-1">
            <h1 className="text-4xl font-light mb-8 golden-text">AI Chatbot for Patient Queries</h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl">
              Provide instant, intelligent responses to patient inquiries 24/7.
            </p>
          </div>
          <div className="flex-1">
            <img
              src="/solutions/ai-chatbot.svg"
              alt="AI Chatbot Illustration"
              className="w-full max-w-lg mx-auto"
            />
          </div>
        </div>

        {subdomains.map((subdomain) => (
          <section 
            key={subdomain.title} 
            id={subdomain.id}
            className="mb-20 scroll-mt-24"
          >
            <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
              <h2 className="text-3xl font-light mb-6 text-gray-900">{subdomain.title}</h2>
              <p className="text-lg text-gray-600 mb-8">{subdomain.description}</p>
              
              <div className="grid md:grid-cols-2 gap-6">
                {subdomain.features.map((feature, index) => (
                  <div 
                    key={index}
                    className="p-6 bg-gray-50 rounded-xl border border-gray-100 hover:border-amber-400 transition-colors duration-300"
                  >
                    <p className="text-gray-800">{feature}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        ))}
            <p className="text-gray-600 text-lg mb-8">
              Our advanced AI-powered chatbot provides instant, accurate responses to patient queries, 
              offering 24/7 support while reducing the workload on healthcare staff and improving 
              patient engagement and satisfaction.
            </p>

            <h2 className="text-2xl font-light text-gray-900 mb-6">Key Features</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <li className="flex items-start">
                <span className="h-6 w-6 text-amber-600 mr-2">•</span>
                <div>
                  <h3 className="font-medium mb-2">Natural Language Processing</h3>
                  <p className="text-gray-600">Advanced NLP for understanding and responding to patient queries naturally.</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="h-6 w-6 text-amber-600 mr-2">•</span>
                <div>
                  <h3 className="font-medium mb-2">Multi-language Support</h3>
                  <p className="text-gray-600">Communication in multiple languages for diverse patient populations.</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="h-6 w-6 text-amber-600 mr-2">•</span>
                <div>
                  <h3 className="font-medium mb-2">Contextual Understanding</h3>
                  <p className="text-gray-600">Maintains conversation context for more relevant responses.</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="h-6 w-6 text-amber-600 mr-2">•</span>
                <div>
                  <h3 className="font-medium mb-2">Smart Escalation</h3>
                  <p className="text-gray-600">Intelligent routing to human staff when needed.</p>
                </div>
              </li>
            </ul>

            <h2 className="text-2xl font-light text-gray-900 mb-6">Benefits</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="p-6 bg-gray-50 rounded-xl">
                <h3 className="font-medium mb-3">24/7 Availability</h3>
                <p className="text-gray-600">Round-the-clock patient support and assistance.</p>
              </div>
              <div className="p-6 bg-gray-50 rounded-xl">
                <h3 className="font-medium mb-3">Reduced Workload</h3>
                <p className="text-gray-600">Minimize routine queries handled by staff.</p>
              </div>
              <div className="p-6 bg-gray-50 rounded-xl">
                <h3 className="font-medium mb-3">Improved Engagement</h3>
                <p className="text-gray-600">Enhanced patient communication and satisfaction.</p>
              </div>
            </div>

            <h2 className="text-2xl font-light text-gray-900 mb-6">Chatbot Capabilities</h2>
            <div className="bg-gray-50 rounded-xl p-6 mb-12">
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="h-6 w-6 text-amber-600 mr-2">•</span>
                  <span>Appointment scheduling assistance</span>
                </li>
                <li className="flex items-start">
                  <span className="h-6 w-6 text-amber-600 mr-2">•</span>
                  <span>Medical information queries</span>
                </li>
                <li className="flex items-start">
                  <span className="h-6 w-6 text-amber-600 mr-2">•</span>
                  <span>Prescription refill requests</span>
                </li>
                <li className="flex items-start">
                  <span className="h-6 w-6 text-amber-600 mr-2">•</span>
                  <span>Insurance and billing inquiries</span>
                </li>
              </ul>
            </div>

            <h2 className="text-2xl font-light text-gray-900 mb-6">Technical Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="font-medium mb-3">AI & ML Capabilities</h3>
                <ul className="space-y-2">
                  <li>Machine learning algorithms</li>
                  <li>Pattern recognition</li>
                  <li>Continuous learning</li>
                  <li>Sentiment analysis</li>
                </ul>
              </div>
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="font-medium mb-3">Integration Features</h3>
                <ul className="space-y-2">
                  <li>EHR/EMR integration</li>
                  <li>API connectivity</li>
                  <li>Custom workflow support</li>
                  <li>Analytics dashboard</li>
                </ul>
              </div>
            </div>

            <div className="bg-amber-50 rounded-xl p-8">
              <h2 className="text-2xl font-light text-gray-900 mb-4">Get Started</h2>
              <p className="text-gray-600 mb-6">
                Enhance your patient support with our intelligent AI chatbot solution. 
                Contact us to learn how we can help improve your patient communication and staff efficiency.
              </p>
              <button className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-3 rounded-full transition-all duration-300 font-light">
                Request Demo
              </button>
            </div>
      </main>
      <Footer />
    </div>
  );
};

export default AIChatbot;