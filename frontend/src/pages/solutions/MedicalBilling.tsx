import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const MedicalBilling = () => {
  const subdomains = [
    {
      id: 'claims-management',
      title: 'Claims Management',
      description: 'Streamlined claims processing and management system.',
      features: [
        'Automated claims submission',
        'Real-time claim tracking',
        'Denial management',
        'Payment reconciliation'
      ]
    },
    {
      id: 'revenue-cycle',
      title: 'Revenue Cycle Management',
      description: 'Comprehensive revenue cycle optimization solutions.',
      features: [
        'Patient eligibility verification',
        'Payment collection',
        'AR management',
        'Financial analytics'
      ]
    },
    {
      id: 'compliance',
      title: 'Compliance & Security',
      description: 'Ensuring regulatory compliance and data security.',
      features: [
        'HIPAA compliance',
        'Secure data transmission',
        'Audit trail logging',
        'Regulatory updates'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50/30 to-amber-50/50">
      <Navbar />
      <main className="container mx-auto px-6 py-32">
        <div className="flex flex-col md:flex-row items-center gap-12 mb-16">
          <div className="flex-1">
            <h1 className="text-4xl font-light mb-8 golden-text">Medical Billing & Claims</h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl">
              Streamline your medical billing process with automated solutions and real-time tracking.
            </p>
          </div>
          <div className="flex-1">
            <img
              src="/solutions/medical-billing.svg"
              alt="Medical Billing & Claims Illustration"
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
              Our streamlined billing and claims management solution automates insurance processing, 
              reduces errors, and accelerates reimbursement cycles, helping healthcare providers 
              optimize their revenue cycle management.
            </p>

            <h2 className="text-2xl font-light text-gray-900 mb-6">Key Features</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <li className="flex items-start">
                <span className="h-6 w-6 text-amber-600 mr-2">•</span>
                <div>
                  <h3 className="font-medium mb-2">Automated Claims Processing</h3>
                  <p className="text-gray-600">Intelligent system for automated claims submission, tracking, and processing.</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="h-6 w-6 text-amber-600 mr-2">•</span>
                <div>
                  <h3 className="font-medium mb-2">Payment Tracking</h3>
                  <p className="text-gray-600">Comprehensive payment monitoring and reconciliation system.</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="h-6 w-6 text-amber-600 mr-2">•</span>
                <div>
                  <h3 className="font-medium mb-2">Denial Management</h3>
                  <p className="text-gray-600">Advanced tools for managing and reducing claim denials.</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="h-6 w-6 text-amber-600 mr-2">•</span>
                <div>
                  <h3 className="font-medium mb-2">Compliance Monitoring</h3>
                  <p className="text-gray-600">Real-time compliance checking and regulatory updates.</p>
                </div>
              </li>
            </ul>

            <h2 className="text-2xl font-light text-gray-900 mb-6">Benefits</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="p-6 bg-gray-50 rounded-xl">
                <h3 className="font-medium mb-3">Increased Revenue</h3>
                <p className="text-gray-600">Optimize revenue cycle and reduce payment delays.</p>
              </div>
              <div className="p-6 bg-gray-50 rounded-xl">
                <h3 className="font-medium mb-3">Reduced Errors</h3>
                <p className="text-gray-600">Minimize billing errors and claim rejections.</p>
              </div>
              <div className="p-6 bg-gray-50 rounded-xl">
                <h3 className="font-medium mb-3">Better Efficiency</h3>
                <p className="text-gray-600">Streamline billing processes and reduce manual work.</p>
              </div>
            </div>

            <h2 className="text-2xl font-light text-gray-900 mb-6">System Capabilities</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="font-medium mb-3">Claims Management</h3>
                <ul className="space-y-2">
                  <li>Automated claim submission</li>
                  <li>Real-time claim status tracking</li>
                  <li>Denial analysis and management</li>
                  <li>Payment posting and reconciliation</li>
                </ul>
              </div>
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="font-medium mb-3">Revenue Cycle Management</h3>
                <ul className="space-y-2">
                  <li>Patient eligibility verification</li>
                  <li>Payment collection optimization</li>
                  <li>Analytics and reporting</li>
                  <li>AR management</li>
                </ul>
              </div>
            </div>

            <h2 className="text-2xl font-light text-gray-900 mb-6">Compliance & Security</h2>
            <div className="bg-gray-50 rounded-xl p-6 mb-12">
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="h-6 w-6 text-amber-600 mr-2">•</span>
                  <span>HIPAA compliance</span>
                </li>
                <li className="flex items-start">
                  <span className="h-6 w-6 text-amber-600 mr-2">•</span>
                  <span>ICD-10 coding validation</span>
                </li>
                <li className="flex items-start">
                  <span className="h-6 w-6 text-amber-600 mr-2">•</span>
                  <span>Secure data transmission</span>
                </li>
                <li className="flex items-start">
                  <span className="h-6 w-6 text-amber-600 mr-2">•</span>
                  <span>Regular compliance updates</span>
                </li>
              </ul>
            </div>

            <div className="bg-amber-50 rounded-xl p-8">
              <h2 className="text-2xl font-light text-gray-900 mb-4">Get Started</h2>
              <p className="text-gray-600 mb-6">
                Optimize your revenue cycle management with our advanced billing and claims solution. 
                Contact us to learn how we can help improve your financial performance.
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

export default MedicalBilling;