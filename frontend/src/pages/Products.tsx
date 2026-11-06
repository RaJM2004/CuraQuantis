import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Products = () => {
  const location = useLocation();

  const products = [
    {
      id: 'ehr',
      title: 'Electronic Health Records (EHR)',
      description: 'A comprehensive digital solution for managing patient records, medical history, and clinical documentation.',
      features: [
        'Secure patient data management',
        'Real-time clinical documentation',
        'Integrated lab results and imaging',
        'Customizable templates and workflows'
      ],
      image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&q=80'
    },
    {
      id: 'telemedicine',
      title: 'Telemedicine Platform',
      description: 'A secure and reliable platform for virtual consultations and remote healthcare delivery.',
      features: [
        'HD video consultations',
        'Secure messaging system',
        'Digital prescription management',
        'Appointment scheduling'
      ],
      image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80'
    },
    {
      id: 'health-monitoring',
      title: 'Health Monitoring App',
      description: 'A mobile application for continuous health monitoring and patient engagement.',
      features: [
        'Real-time vital sign tracking',
        'Medication reminders',
        'Activity and nutrition logging',
        'Health trend analytics'
      ],
      image: 'https://images.unsplash.com/photo-1576089172869-4f5f6f315620?auto=format&fit=crop&q=80'
    },
    {
      id: 'hms',
      title: 'Hospital Management System (HMS)',
      description: 'A comprehensive solution for hospital operations and resource management.',
      features: [
        'Resource management',
        'Staff scheduling',
        'Inventory control',
        'Financial management'
      ],
      image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80'
    },
    {
      id: 'ai-diagnosis',
      title: 'AI Diagnosis Assistant',
      description: 'An advanced AI-powered system for clinical decision support and diagnosis.',
      features: [
        'Symptom analysis',
        'Treatment recommendations',
        'Risk assessment',
        'Clinical decision support'
      ],
      image: 'https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?auto=format&fit=crop&q=80'
    },
    {
      id: 'patient-portal',
      title: 'Patient Portal',
      description: 'A secure online platform for patient engagement and healthcare management.',
      features: [
        'Health record access',
        'Secure messaging',
        'Appointment management',
        'Bill payment'
      ],
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80'
    }
  ];

  useEffect(() => {
    const hash = location.hash;
    if (hash) {
      const element = document.getElementById(hash.slice(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
      <Navbar />
      <div 
        className="relative h-[500px] bg-cover bg-center"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1576670759164-6fe3edd36022?auto=format&fit=crop&q=80)'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-amber-900/80 to-transparent">
          <div className="container mx-auto px-6 h-full flex items-center">
            <div className="max-w-2xl text-white">
              <h1 className="text-5xl font-light mb-6">Our Products</h1>
              <p className="text-xl opacity-90">
                Discover our comprehensive suite of healthcare technology solutions designed to transform patient care and clinical operations.
              </p>
            </div>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-8">
          {products.map((product) => (
            <section 
              key={product.id} 
              id={product.id}
              className="scroll-mt-24"
            >
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]">
                <div 
                  className="h-48 bg-cover bg-center"
                  style={{ backgroundImage: `url(${product.image})` }}
                />
                <div className="p-8">
                  <h2 className="text-2xl font-light mb-4 text-amber-900">
                    {product.title}
                  </h2>
                  <p className="text-gray-600 mb-6">{product.description}</p>
                  
                  <div className="space-y-3">
                    {product.features.map((feature, index) => (
                      <div 
                        key={index}
                        className="p-4 bg-amber-50 rounded-xl border border-amber-100 hover:border-amber-300 transition-colors duration-300"
                      >
                        <p className="text-amber-900">{feature}</p>
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

export default Products;