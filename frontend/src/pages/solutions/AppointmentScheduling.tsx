import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const AppointmentScheduling = () => {
  const subdomains = [
    {
      id: 'scheduling-system',
      title: 'Scheduling System',
      description: 'Intelligent appointment management and scheduling optimization.',
      features: [
        'Online booking portal',
        'Real-time availability',
        'Multiple appointment types',
        'Waitlist management'
      ]
    },
    {
      id: 'patient-communication',
      title: 'Patient Communication',
      description: 'Automated patient engagement and reminder system.',
      features: [
        'SMS reminders',
        'Email notifications',
        'Patient confirmations',
        'Rescheduling options'
      ]
    },
    {
      id: 'resource-management',
      title: 'Resource Management',
      description: 'Efficient allocation and management of healthcare resources.',
      features: [
        'Staff scheduling',
        'Room allocation',
        'Equipment tracking',
        'Capacity planning'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50/30 to-amber-50/50">
      <Navbar />
      <main className="container mx-auto px-6 py-32">
        <div className="flex flex-col md:flex-row items-center gap-12 mb-16">
          <div className="flex-1">
            <h1 className="text-4xl font-light mb-8 golden-text">Appointment Scheduling System</h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl">
              Streamline your appointment management with our intelligent scheduling solution.
            </p>
          </div>
          <div className="flex-1">
            <img
              src="/solutions/appointment-scheduling.svg"
              alt="Appointment Scheduling System Illustration"
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
              Our intelligent appointment scheduling system streamlines the booking process, reduces no-shows, 
              and optimizes healthcare provider schedules, delivering a seamless experience for both patients 
              and medical staff.
            </p>

            <h2 className="text-2xl font-light text-gray-900 mb-6">Key Features</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <li className="flex items-start">
                <span className="h-6 w-6 text-amber-600 mr-2">•</span>
                <div>
                  <h3 className="font-medium mb-2">Online Booking Portal</h3>
                  <p className="text-gray-600">User-friendly interface for patients to schedule appointments 24/7.</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="h-6 w-6 text-amber-600 mr-2">•</span>
                <div>
                  <h3 className="font-medium mb-2">Automated Reminders</h3>
                  <p className="text-gray-600">Multi-channel appointment reminders via SMS, email, and push notifications.</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="h-6 w-6 text-amber-600 mr-2">•</span>
                <div>
                  <h3 className="font-medium mb-2">Smart Scheduling</h3>
                  <p className="text-gray-600">AI-powered scheduling optimization and conflict resolution.</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="h-6 w-6 text-amber-600 mr-2">•</span>
                <div>
                  <h3 className="font-medium mb-2">Resource Management</h3>
                  <p className="text-gray-600">Efficient allocation of staff, rooms, and equipment.</p>
                </div>
              </li>
            </ul>

            <h2 className="text-2xl font-light text-gray-900 mb-6">Benefits</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="p-6 bg-gray-50 rounded-xl">
                <h3 className="font-medium mb-3">Reduced No-shows</h3>
                <p className="text-gray-600">Minimize missed appointments through automated reminders.</p>
              </div>
              <div className="p-6 bg-gray-50 rounded-xl">
                <h3 className="font-medium mb-3">Improved Efficiency</h3>
                <p className="text-gray-600">Optimize schedule utilization and staff productivity.</p>
              </div>
              <div className="p-6 bg-gray-50 rounded-xl">
                <h3 className="font-medium mb-3">Enhanced Experience</h3>
                <p className="text-gray-600">Better patient satisfaction through convenient scheduling.</p>
              </div>
            </div>

            <h2 className="text-2xl font-light text-gray-900 mb-6">System Capabilities</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="font-medium mb-3">Scheduling Features</h3>
                <ul className="space-y-2">
                  <li>Real-time availability updates</li>
                  <li>Multiple appointment types</li>
                  <li>Recurring appointment setup</li>
                  <li>Waitlist management</li>
                </ul>
              </div>
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="font-medium mb-3">Integration Options</h3>
                <ul className="space-y-2">
                  <li>EHR/EMR integration</li>
                  <li>Payment processing</li>
                  <li>Calendar synchronization</li>
                  <li>Patient portal integration</li>
                </ul>
              </div>
            </div>

            <h2 className="text-2xl font-light text-gray-900 mb-6">Advanced Features</h2>
            <div className="bg-gray-50 rounded-xl p-6 mb-12">
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="h-6 w-6 text-amber-600 mr-2">•</span>
                  <span>Multi-location support</span>
                </li>
                <li className="flex items-start">
                  <span className="h-6 w-6 text-amber-600 mr-2">•</span>
                  <span>Custom scheduling rules</span>
                </li>
                <li className="flex items-start">
                  <span className="h-6 w-6 text-amber-600 mr-2">•</span>
                  <span>Analytics and reporting</span>
                </li>
                <li className="flex items-start">
                  <span className="h-6 w-6 text-amber-600 mr-2">•</span>
                  <span>Mobile app access</span>
                </li>
              </ul>
            </div>

            <div className="bg-amber-50 rounded-xl p-8">
              <h2 className="text-2xl font-light text-gray-900 mb-4">Get Started</h2>
              <p className="text-gray-600 mb-6">
                Transform your appointment management with our advanced scheduling solution. 
                Contact us to learn how we can optimize your scheduling workflow and improve patient satisfaction.
              </p>
              <button className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-3 rounded-full transition-all duration-300 font-light">
                Schedule Demo
              </button>
            </div>
      </main>
      <Footer />
    </div>
  );
};

export default AppointmentScheduling;