import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Solutions = () => {
  const location = useLocation();

  const solutions = [
    {
      id: 'mediconnect',
      title: 'Digital OPD & Teleconsultation (MediConnect)',
      description: 'A complete outpatient digitization system that intelligently manages bookings, secure consultations, and seamless payments.',
      features: [
        'Secure Video Consultations',
        'AI-Assisted Report Summaries',
        'Multilingual Support',
        'Intelligent Booking System'
      ],
      image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80'
    },
    {
      id: 'prescription-ai',
      title: 'Voice-Driven Prescription Intelligence',
      description: 'Converts doctor-patient conversations into structured prescriptions in real time, reducing documentation time and errors.',
      features: [
        'Real-time Transcription',
        'Structured Medical Records',
        'Natural Consultation Flow',
        'Error Minimization'
      ],
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80'
    },
    {
      id: 'patient-navigation',
      title: 'Real-Time Patient Navigation System',
      description: 'Guides patients step-by-step through large hospital facilities, directing them to rooms, departments, and doctor locations.',
      features: [
        'Indoor Wayfinding',
        'Real-time Availability Tracking',
        'Reduced Staff Dependency',
        'Enhanced Visitor Experience'
      ],
      image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80'
    },
    {
      id: 'zerolangt',
      title: 'Multilingual Communication Engine (ZerolangT)',
      description: 'Enables seamless, two-way medical communication across languages without the need for human translators.',
      features: [
        'Real-time Language Translation',
        'Medical Terminology Context',
        'Two-way Dialogue Support',
        'Accurate Multi-language Consultations'
      ],
      image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80'
    },
    {
      id: 'happyface',
      title: 'Treatment Outcome Visualization (HappyFace – Dental AI)',
      description: 'Provides realistic previews of dental treatment outcomes before procedures begin to build patient confidence.',
      features: [
        'Realistic Outcome Previews',
        'Predictive Visualization',
        'Improved Treatment Acceptance',
        'Interactive Patient Consultation'
      ],
      image: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80'
    },
    {
      id: 'orthoscopic-ai',
      title: 'Passive Movement Analysis (Orthoscopic AI)',
      description: 'Detects abnormalities in movement, posture, and gait as patients walk into the clinic for early clinical insights.',
      features: [
        'Passive Gait Analysis',
        'Posture Pattern Recognition',
        'Abnormality Detection',
        'Early Warning Indicators'
      ],
      image: 'https://images.unsplash.com/photo-1576671081837-49000212a370?auto=format&fit=crop&q=80'
    },
    {
      id: 'insurance-intelligence',
      title: 'Insurance & Billing Intelligence',
      description: 'Automates insurance verification, eligibility checks, and cost estimation, completing tasks in minutes.',
      features: [
        'Automated Eligibility Checks',
        'Cost Estimation Engines',
        'Approval Prediction',
        'Reduced Manual Coordination'
      ],
      image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80'
    },
    {
      id: 'smart-coding',
      title: 'Smart Medical Coding (CPT Assistance)',
      description: 'Context-aware code suggestions provide accurate CPT codes during consultation to minimize claim rejections.',
      features: [
        'Context-Aware AI Suggestions',
        'Reduced Claim Rejections',
        'Faster Administrative Processing',
        'Contextual Billing Accuracy'
      ],
      image: 'https://images.unsplash.com/photo-1551288049-bbbda536339a?auto=format&fit=crop&q=80'
    },
    {
      id: 'core-ai-layer',
      title: 'Unified Clinical Data Engine (Core AI Layer)',
      description: 'Centralizes all hospital data — EMR, labs, and vitals — into a single structured layer for real-time intelligence.',
      features: [
        'Centralized Data Structuring',
        'EMR & Lab Data Integration',
        'Real-time Intelligence Feed',
        'Cross-Module Consistency'
      ],
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc4b?auto=format&fit=crop&q=80'
    },
    {
      id: 'icu-monitoring',
      title: 'Predictive ICU Monitoring (Early Warning System)',
      description: 'Continuous risk prediction for critical conditions like sepsis or cardiac events for proactive intervention.',
      features: [
        'Sepsis Risk Prediction',
        'Cardiac Event Warning',
        'Continuous Vital Monitoring',
        'Proactive Clinical Alerts'
      ],
      image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80'
    },
    {
      id: 'surgical-ai',
      title: 'Surgical AI Assistance',
      description: 'Real-time support inside operation theatres through voice and vision tracking for procedure documentation.',
      features: [
        'Real-time OT Procedure Support',
        'Vision-Based Tracking',
        'Automated Surgical Documentation',
        'Voice-Guided Assistance'
      ],
      image: 'https://images.unsplash.com/photo-1579154236594-e178f46a482b?auto=format&fit=crop&q=80'
    },
    {
      id: 'pharmacy-intelligence',
      title: 'Pharmacy Intelligence System',
      description: 'Analyzes drug interactions, predicts adherence, and optimizes inventory to improve safety and efficiency.',
      features: [
        'Drug Interaction Safety Analysis',
        'Adherence Pattern Prediction',
        'Smart Inventory Optimization',
        'Prescription Fulfillment Efficiency'
      ],
      image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbbb88?auto=format&fit=crop&q=80'
    },
    {
      id: 'orchestration-layer',
      title: 'AI Orchestration Layer (Hospital Intelligence Brain)',
      description: 'Seamlessly integrates all specialized AI modules into a centralized hospital intelligence framework.',
      features: [
        'Centralized AI Integration',
        'Unified System Management',
        'Intelligent Workflow Orchestration',
        'Ecosystem-wide Visibility'
      ],
      image: 'https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&q=80'
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <Navbar />
      <div
        className="relative h-[500px] bg-cover bg-center"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80)'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-transparent">
          <div className="container mx-auto px-6 h-full flex items-center">
            <div className="max-w-2xl text-white">
              <h1 className="text-5xl font-light mb-6">Our Solutions</h1>
              <p className="text-xl opacity-90">
                Explore our cutting-edge technology solutions designed to drive innovation and transform healthcare delivery.
              </p>
            </div>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-8">
          {solutions.map((solution) => (
            <section
              key={solution.id}
              id={solution.id}
              className="scroll-mt-24"
            >
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]">
                <div
                  className="h-48 bg-cover bg-center"
                  style={{ backgroundImage: `url(${solution.image})` }}
                />
                <div className="p-8">
                  <h2 className="text-2xl font-light mb-4 text-blue-900">
                    {solution.title}
                  </h2>
                  <p className="text-gray-600 mb-6">{solution.description}</p>

                  <div className="space-y-3">
                    {solution.features.map((feature, index) => (
                      <div
                        key={index}
                        className="p-4 bg-blue-50 rounded-xl border border-blue-100 hover:border-blue-300 transition-colors duration-300"
                      >
                        <p className="text-blue-900">{feature}</p>
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

export default Solutions;