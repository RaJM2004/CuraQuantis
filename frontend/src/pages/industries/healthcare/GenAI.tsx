import React from 'react';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';

const GenAI = () => {
  const categories = [
    {
      title: 'Medical Imaging Analysis',
      items: [
        'AI-powered image analysis for detecting diseases (cancer, fractures, tumors)',
        'AI for diagnosing Alzheimer\'s, Parkinson\'s, and brain tumors via MRI scans',
        'AI for detecting brain atrophy (linked to dementia and MS)',
        'AI-powered tool for detecting pneumonia, tuberculosis, and COVID-19 in chest X-rays',
        'AI-assisted lung disease detection',
        'AI-powered ECG interpretation software for heart disease detection',
        'AI-assisted echocardiography interpretation',
        'AI-driven cardiac imaging analysis for early heart detection',
        'AI-powered pathology tool for detecting cancer in biopsy samples'
      ]
    },
    {
      title: 'Genomic Analysis',
      items: [
        'AI-driven genomic data analysis for personalized cancer treatment',
        'AI-based software for early-stage breast cancer detection',
        'AI-based DNA analysis for disease risk prediction',
        'AI-driven drug discovery and genetic disorder detection',
        'AI-powered genomic data analysis platform'
      ]
    },
    {
      title: 'Disease Prediction & Management',
      items: [
        'Uses machine learning for early disease prediction in hospitals',
        'AI-powered risk prediction and patient management platform',
        'AI for population health and disease outbreak forecasting',
        'AI for predicting disease outbreaks (e.g., COVID-19, Ebola)',
        'AI-powered disease surveillance for global epidemiology tracking'
      ]
    },
    {
      title: 'Virtual Healthcare',
      items: [
        'AI chatbot for preliminary disease diagnosis based on symptoms',
        'AI-powered virtual doctor for diagnosis and telemedicine',
        'AI symptom checker for disease prediction',
        'AI for automated detection of abnormalities in radiology images',
        'AI for early stroke detection using CT scans',
        'AI for early-stage disease detection from medical images'
      ]
    },
    {
      title: 'Clinical Documentation',
      items: [
        'Used by large hospitals for advanced clinical documentation & interoperability',
        'Cloud-based system with analytics, patient engagement, and billing features',
        'Offers customizable EHR solutions for small and large practices',
        'Well-suited for hospitals with integrated clinical, financial, and patient engagement tools',
        'Cloud-based EHR with AI-driven automation for efficiency',
        'Cost-effective, used by private practices and clinics'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50/30 to-amber-50/50">
      <Navbar />
      <main className="container mx-auto px-6 py-32">
        <div className="mb-16">
          <h1 className="text-4xl font-light mb-8 golden-text">Generative AI in Healthcare</h1>
          <p className="text-xl text-gray-600 max-w-3xl">
            Our cutting-edge generative AI solutions revolutionize healthcare through advanced medical imaging analysis,
            genomic research, and predictive healthcare analytics.
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

export default GenAI;