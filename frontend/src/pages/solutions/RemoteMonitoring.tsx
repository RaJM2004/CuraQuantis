import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const RemoteMonitoring = () => {
  const subdomains = [
    {
      id: 'vital-monitoring',
      title: 'Vital Signs Monitoring',
      description: 'Continuous tracking and analysis of patient vital signs in real-time.',
      features: [
        'Heart rate monitoring',
        'Blood pressure tracking',
        'Temperature monitoring',
        'Oxygen level measurement'
      ]
    },
    {
      id: 'patient-engagement',
      title: 'Patient Engagement',
      description: 'Interactive tools and platforms for enhanced patient participation in care.',
      features: [
        'Mobile health apps',
        'Patient portals',
        'Medication reminders',
        'Health tracking tools'
      ]
    },
    {
      id: 'analytics-alerts',
      title: 'Analytics & Alerts',
      description: 'Advanced analytics and alert systems for proactive healthcare.',
      features: [
        'Trend analysis',
        'Early warning systems',
        'Automated notifications',
        'Risk prediction'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50/30 to-amber-50/50">
      <Navbar />
      <main className="container mx-auto px-6 py-32">
        <div className="flex flex-col md:flex-row items-center gap-12 mb-16">
          <div className="flex-1">
            <h1 className="text-4xl font-light mb-8 golden-text">Remote Patient Monitoring</h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl">
              Transform patient care with real-time monitoring and data-driven insights.
            </p>
          </div>
          <div className="flex-1">
            <img
              src="/solutions/remote-monitoring.svg"
              alt="Remote Patient Monitoring Illustration"
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
              Our comprehensive remote monitoring solution enables healthcare providers to track patient vital signs, 
              symptoms, and health metrics in real-time from any location, ensuring continuous care and early intervention.
            </p>

            <h2 className="text-2xl font-light text-gray-900 mb-6">Key Features</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <li className="flex items-start">
                <span className="h-6 w-6 text-amber-600 mr-2">•</span>
                <div>
                  <h3 className="font-medium mb-2">Real-time Vital Monitoring</h3>
                  <p className="text-gray-600">Continuous tracking of vital signs including heart rate, blood pressure, temperature, and oxygen levels.</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="h-6 w-6 text-amber-600 mr-2">•</span>
                <div>
                  <h3 className="font-medium mb-2">Automated Alert System</h3>
                  <p className="text-gray-600">Intelligent alerts for healthcare providers when patient metrics fall outside normal ranges.</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="h-6 w-6 text-amber-600 mr-2">•</span>
                <div>
                  <h3 className="font-medium mb-2">Trend Analysis</h3>
                  <p className="text-gray-600">Advanced analytics to identify patterns and predict potential health issues.</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="h-6 w-6 text-amber-600 mr-2">•</span>
                <div>
                  <h3 className="font-medium mb-2">Patient Engagement Tools</h3>
                  <p className="text-gray-600">Mobile app and web portal for patients to track their health metrics and communicate with providers.</p>
                </div>
              </li>
            </ul>

            <h2 className="text-2xl font-light text-gray-900 mb-6">Benefits</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="p-6 bg-gray-50 rounded-xl">
                <h3 className="font-medium mb-3">Early Intervention</h3>
                <p className="text-gray-600">Detect and address health issues before they become critical.</p>
              </div>
              <div className="p-6 bg-gray-50 rounded-xl">
                <h3 className="font-medium mb-3">Reduced Hospitalizations</h3>
                <p className="text-gray-600">Prevent unnecessary hospital visits through proactive monitoring.</p>
              </div>
              <div className="p-6 bg-gray-50 rounded-xl">
                <h3 className="font-medium mb-3">Improved Patient Compliance</h3>
                <p className="text-gray-600">Better adherence to treatment plans through continuous monitoring.</p>
              </div>
            </div>

            <h2 className="text-2xl font-light text-gray-900 mb-6">Monitoring Capabilities</h2>
            <div className="bg-gray-50 rounded-xl p-6 mb-12">
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="h-6 w-6 text-amber-600 mr-2">•</span>
                  <span>Vital signs monitoring (heart rate, blood pressure, SpO2)</span>
                </li>
                <li className="flex items-start">
                  <span className="h-6 w-6 text-amber-600 mr-2">•</span>
                  <span>Blood glucose monitoring</span>
                </li>
                <li className="flex items-start">
                  <span className="h-6 w-6 text-amber-600 mr-2">•</span>
                  <span>Activity and sleep tracking</span>
                </li>
                <li className="flex items-start">
                  <span className="h-6 w-6 text-amber-600 mr-2">•</span>
                  <span>Medication adherence monitoring</span>
                </li>
                <li className="flex items-start">
                  <span className="h-6 w-6 text-amber-600 mr-2">•</span>
                  <span>Weight and nutrition tracking</span>
                </li>
              </ul>
            </div>

            <h2 className="text-2xl font-light text-gray-900 mb-6">Technical Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="font-medium mb-3">Device Integration</h3>
                <ul className="space-y-2">
                  <li>Compatible with major medical devices</li>
                  <li>Bluetooth and WiFi connectivity</li>
                  <li>Automatic data synchronization</li>
                </ul>
              </div>
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="font-medium mb-3">Data Security</h3>
                <ul className="space-y-2">
                  <li>HIPAA compliant</li>
                  <li>End-to-end encryption</li>
                  <li>Secure data storage</li>
                </ul>
              </div>
            </div>

            <div className="bg-amber-50 rounded-xl p-8">
              <h2 className="text-2xl font-light text-gray-900 mb-4">Get Started</h2>
              <p className="text-gray-600 mb-6">
                Enhance your patient care with our advanced remote monitoring solution. 
                Schedule a demo to see how we can help you improve patient outcomes and reduce healthcare costs.
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

export default RemoteMonitoring;