import React from 'react';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';

const AgenticAI = () => {
  const categories = [
    {
      title: 'Clinical Decision Support',
      items: [
        'AI-based CDI tool for documentation improvement and compliance',
        'AI-powered speech recognition & CDI analytics',
        'Uses natural language processing (NLP) to enhance documentation',
        'Ensures accurate clinical documentation for optimized billing',
        'Provides evidence-based recommendations for diagnosis and treatment',
        'AI-powered analytics for precision medicine',
        'Decision support tool for personalized treatment recommendations'
      ]
    },
    {
      title: 'Telemedicine & Analytics',
      items: [
        'Secure, HIPAA-compliant telehealth platform',
        'Integrated telemedicine with documentation',
        'HIPAA-compliant video conferencing with EHR integration',
        'Data visualization for patient outcomes',
        'Advanced analytics for EHR data',
        'AI-based analytics for hospital management'
      ]
    },
    {
      title: 'Compliance & Security',
      items: [
        'Ensures HIPAA compliance for clinical documentation',
        'Automates security & compliance monitoring',
        'HIPAA compliance & risk assessment tool',
        'AI-based contactless fingerprint recognition for hospitals',
        'AI-driven biometric system for patient identification and fraud prevention',
        'Uses biometrics for secure patient check-in and medical record access'
      ]
    },
    {
      title: 'Automated Alerts & Notifications',
      items: [
        'AI-powered real-time nurse alerts via voice & messages',
        'Sends real-time alerts from biometric systems to nurses',
        'Automates patient alerts and critical nurse notifications',
        'AI-driven nurse call system with biometric authentication'
      ]
    },
    {
      title: 'Claims & Billing Automation',
      items: [
        'Automates claim processing & eligibility checks',
        'AI-driven claims processing & fraud detection',
        'AI for claims validation, billing & coding',
        'AI-based automated medical billing & payments',
        'AI for revenue cycle management & claims',
        'AI-driven insurance claims analytics',
        'AI for medical coding & claims automation',
        'AI for fraud detection & compliance in claims',
        'AI verifies patient eligibility instantly',
        'AI extracts data from EHR & auto-submits claims',
        'AI checks for missing codes & errors',
        'AI detects duplicate, fraudulent, or exaggerated claims',
        'AI predicts claim approvals & fast-tracks payments'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50/30 to-amber-50/50">
      <Navbar />
      <main className="container mx-auto px-6 py-32">
        <div className="mb-16">
          <h1 className="text-4xl font-light mb-8 golden-text">Agentic AI in Healthcare</h1>
          <p className="text-xl text-gray-600 max-w-3xl">
            Our autonomous AI agents streamline healthcare operations through intelligent automation,
            enhanced decision support, and secure compliance management.
          </p>
        </div>

        <div className="space-y-16">
          {categories.map((category, index) => (
            <section key={index} className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
              <h2 className="text-3xl font-light mb-8 text-gray-900">{category.title}</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {category.items.map((item, itemIndex) => (
                  <div
                    key={itemIndex}
                    className="p-6 bg-gray-50 rounded-xl border border-gray-100 hover:border-amber-400 transition-colors duration-300"
                  >
                    <p className="text-gray-800">{item}</p>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AgenticAI;