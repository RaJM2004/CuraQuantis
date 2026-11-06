import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const LabIntegration = () => {
  const subdomains = [
    {
      id: 'data-exchange',
      title: 'Data Exchange',
      description: 'Seamless integration with laboratory information systems.',
      features: [
        'HL7/FHIR protocol support',
        'Real-time data synchronization',
        'Automated result delivery',
        'Custom API development'
      ]
    },
    {
      id: 'workflow-automation',
      title: 'Workflow Automation',
      description: 'Streamlined laboratory processes and operations.',
      features: [
        'Test ordering system',
        'Result validation rules',
        'Sample tracking',
        'Inventory management'
      ]
    },
    {
      id: 'analytics-reporting',
      title: 'Analytics & Reporting',
      description: 'Comprehensive analytics for laboratory operations.',
      features: [
        'Performance metrics',
        'Quality control tracking',
        'Turnaround time analysis',
        'Custom report generation'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50/30 to-amber-50/50">
      <Navbar />
      <main className="container mx-auto px-6 py-32">
        <div className="flex flex-col md:flex-row items-center gap-12 mb-16">
          <div className="flex-1">
            <h1 className="text-4xl font-light mb-8 golden-text">Lab Integration Services</h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl">
              Seamlessly connect laboratory systems with healthcare providers for efficient test management.
            </p>
          </div>
          <div className="flex-1">
            <img
              src="/solutions/lab-integration.svg"
              alt="Lab Integration Services Illustration"
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
              Our comprehensive lab integration solution seamlessly connects healthcare providers with 
              laboratory information systems, enabling efficient test ordering, result management, and 
              automated workflows for improved patient care.
            </p>

            <h2 className="text-2xl font-light text-gray-900 mb-6">Key Features</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <li className="flex items-start">
                <span className="h-6 w-6 text-amber-600 mr-2">•</span>
                <div>
                  <h3 className="font-medium mb-2">Seamless LIS Integration</h3>
                  <p className="text-gray-600">Direct connection with laboratory information systems for real-time data exchange.</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="h-6 w-6 text-amber-600 mr-2">•</span>
                <div>
                  <h3 className="font-medium mb-2">Electronic Test Ordering</h3>
                  <p className="text-gray-600">Streamlined digital ordering system with customizable test panels.</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="h-6 w-6 text-amber-600 mr-2">•</span>
                <div>
                  <h3 className="font-medium mb-2">Results Management</h3>
                  <p className="text-gray-600">Automated result delivery and integration with patient records.</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="h-6 w-6 text-amber-600 mr-2">•</span>
                <div>
                  <h3 className="font-medium mb-2">Analytics Dashboard</h3>
                  <p className="text-gray-600">Comprehensive reporting and analytics for lab operations.</p>
                </div>
              </li>
            </ul>

            <h2 className="text-2xl font-light text-gray-900 mb-6">Benefits</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="p-6 bg-gray-50 rounded-xl">
                <h3 className="font-medium mb-3">Improved Efficiency</h3>
                <p className="text-gray-600">Reduce manual data entry and streamline workflows.</p>
              </div>
              <div className="p-6 bg-gray-50 rounded-xl">
                <h3 className="font-medium mb-3">Enhanced Accuracy</h3>
                <p className="text-gray-600">Minimize errors in test ordering and result reporting.</p>
              </div>
              <div className="p-6 bg-gray-50 rounded-xl">
                <h3 className="font-medium mb-3">Faster Turnaround</h3>
                <p className="text-gray-600">Accelerate test processing and result delivery.</p>
              </div>
            </div>

            <h2 className="text-2xl font-light text-gray-900 mb-6">Integration Capabilities</h2>
            <div className="bg-gray-50 rounded-xl p-6 mb-12">
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="h-6 w-6 text-amber-600 mr-2">•</span>
                  <span>HL7 and FHIR protocol support</span>
                </li>
                <li className="flex items-start">
                  <span className="h-6 w-6 text-amber-600 mr-2">•</span>
                  <span>Major LIS/LIMS system compatibility</span>
                </li>
                <li className="flex items-start">
                  <span className="h-6 w-6 text-amber-600 mr-2">•</span>
                  <span>EHR/EMR integration</span>
                </li>
                <li className="flex items-start">
                  <span className="h-6 w-6 text-amber-600 mr-2">•</span>
                  <span>Custom API development</span>
                </li>
              </ul>
            </div>

            <h2 className="text-2xl font-light text-gray-900 mb-6">Technical Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="font-medium mb-3">Data Management</h3>
                <ul className="space-y-2">
                  <li>Automated data synchronization</li>
                  <li>Result validation rules</li>
                  <li>Historical data access</li>
                  <li>Customizable data mapping</li>
                </ul>
              </div>
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="font-medium mb-3">Security & Compliance</h3>
                <ul className="space-y-2">
                  <li>HIPAA compliance</li>
                  <li>Data encryption</li>
                  <li>Audit trail logging</li>
                  <li>Role-based access control</li>
                </ul>
              </div>
            </div>

            <div className="bg-amber-50 rounded-xl p-8">
              <h2 className="text-2xl font-light text-gray-900 mb-4">Get Started</h2>
              <p className="text-gray-600 mb-6">
                Transform your laboratory operations with our advanced integration solution. 
                Contact us to discuss how we can streamline your lab workflows and improve efficiency.
              </p>
              <button className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-3 rounded-full transition-all duration-300 font-light">
                Schedule Consultation
              </button>
            </div>
      </main>
      <Footer />
    </div>
  );
};

export default LabIntegration;