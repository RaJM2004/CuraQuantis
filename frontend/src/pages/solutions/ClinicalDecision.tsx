import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const ClinicalDecision = () => {
  const subdomains = [
    {
      id: 'diagnostic-support',
      title: 'Diagnostic Support',
      description: 'Advanced AI algorithms for accurate diagnosis and risk assessment.',
      features: [
        'Pattern recognition in medical data',
        'Risk stratification models',
        'Diagnostic accuracy improvement',
        'Early disease detection'
      ]
    },
    {
      id: 'treatment-planning',
      title: 'Treatment Planning',
      description: 'Evidence-based treatment recommendations and clinical pathway guidance.',
      features: [
        'Personalized treatment protocols',
        'Drug interaction analysis',
        'Clinical pathway optimization',
        'Outcome prediction models'
      ]
    },
    {
      id: 'clinical-analytics',
      title: 'Clinical Analytics',
      description: 'Comprehensive analytics for improved clinical decision making.',
      features: [
        'Population health insights',
        'Treatment effectiveness analysis',
        'Clinical quality metrics',
        'Predictive analytics'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50/30 to-amber-50/50">
      <Navbar />
      <main className="container mx-auto px-6 py-32">
        <div className="flex flex-col md:flex-row items-center gap-12 mb-16">
          <div className="flex-1">
            <h1 className="text-4xl font-light mb-8 golden-text">Clinical Decision Support</h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl">
              Empower healthcare providers with AI-driven insights for better clinical decisions.
            </p>
          </div>
          <div className="flex-1">
            <img
              src="/solutions/clinical-decision.svg"
              alt="Clinical Decision Support Illustration"
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
              Our advanced AI-powered Clinical Decision Support system assists healthcare providers in making informed clinical decisions 
              by analyzing patient data, medical literature, and best practices in real-time.
            </p>

            <h2 className="text-2xl font-light text-gray-900 mb-6">Key Features</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <li className="flex items-start">
                <span className="h-6 w-6 text-amber-600 mr-2">•</span>
                <div>
                  <h3 className="font-medium mb-2">Evidence-based Recommendations</h3>
                  <p className="text-gray-600">Real-time clinical recommendations based on current medical evidence and guidelines.</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="h-6 w-6 text-amber-600 mr-2">•</span>
                <div>
                  <h3 className="font-medium mb-2">Drug Interaction Alerts</h3>
                  <p className="text-gray-600">Comprehensive medication interaction checking and alerting system.</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="h-6 w-6 text-amber-600 mr-2">•</span>
                <div>
                  <h3 className="font-medium mb-2">Clinical Pathway Guidance</h3>
                  <p className="text-gray-600">Step-by-step guidance through evidence-based clinical pathways.</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="h-6 w-6 text-amber-600 mr-2">•</span>
                <div>
                  <h3 className="font-medium mb-2">Risk Stratification</h3>
                  <p className="text-gray-600">Advanced analytics for patient risk assessment and stratification.</p>
                </div>
              </li>
            </ul>

            <h2 className="text-2xl font-light text-gray-900 mb-6">Benefits</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="p-6 bg-gray-50 rounded-xl">
                <h3 className="font-medium mb-3">Improved Patient Outcomes</h3>
                <p className="text-gray-600">Evidence-based decisions lead to better treatment outcomes and patient satisfaction.</p>
              </div>
              <div className="p-6 bg-gray-50 rounded-xl">
                <h3 className="font-medium mb-3">Reduced Medical Errors</h3>
                <p className="text-gray-600">AI-powered checks and alerts help prevent medication errors and adverse events.</p>
              </div>
              <div className="p-6 bg-gray-50 rounded-xl">
                <h3 className="font-medium mb-3">Enhanced Efficiency</h3>
                <p className="text-gray-600">Streamlined decision-making process saves time and reduces cognitive load.</p>
              </div>
            </div>

            <h2 className="text-2xl font-light text-gray-900 mb-6">Technical Specifications</h2>
            <div className="bg-gray-50 rounded-xl p-6 mb-12">
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="h-6 w-6 text-amber-600 mr-2">•</span>
                  <span>Integration with major EHR systems</span>
                </li>
                <li className="flex items-start">
                  <span className="h-6 w-6 text-amber-600 mr-2">•</span>
                  <span>HL7 FHIR compliant</span>
                </li>
                <li className="flex items-start">
                  <span className="h-6 w-6 text-amber-600 mr-2">•</span>
                  <span>Real-time data processing</span>
                </li>
                <li className="flex items-start">
                  <span className="h-6 w-6 text-amber-600 mr-2">•</span>
                  <span>HIPAA compliant secure data handling</span>
                </li>
              </ul>
            </div>

            <div className="bg-amber-50 rounded-xl p-8">
              <h2 className="text-2xl font-light text-gray-900 mb-4">Get Started</h2>
              <p className="text-gray-600 mb-6">
                Transform your clinical decision-making process with our advanced AI-powered support system. 
                Contact us to schedule a demo and learn how we can help improve patient outcomes in your practice.
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

export default ClinicalDecision;