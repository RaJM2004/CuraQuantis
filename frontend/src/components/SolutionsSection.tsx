
import React, { useState } from 'react';
import {
  Brain, Database, Eye, Cpu, Network, Lightbulb,
  Video, Mic, Navigation, Languages, Smile, Activity,
  ShieldCheck, Code, AlertTriangle, Scan, Pill, Workflow,
  FileText, MessageSquare, Map, HeartPulse, Stethoscope
} from 'lucide-react';
import { Link } from 'react-router-dom';

const SolutionsSection = () => {
  const [activeCard, setActiveCard] = useState(0);

  const solutions = [
    {
      icon: Video,
      title: 'Digital OPD & Teleconsultation',
      subtitle: 'MediConnect',
      description: 'A complete outpatient digitization system that intelligently manages bookings and secure consultations.',
      features: ['Secure Video Consultation', 'AI-Assisted Report Summaries', 'Multilingual Support', 'Seamless Payments'],
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Mic,
      title: 'Voice-Driven Prescription Intelligence',
      subtitle: 'Structured Records',
      description: 'Converts doctor-patient conversations into structured prescriptions in real-time, reducing documentation load.',
      features: ['Real-time Voice-to-Text', 'Structured Medical Records', 'Natural Flow Preservation', 'Error Minimization'],
      color: 'from-indigo-500 to-blue-500'
    },
    {
      icon: Navigation,
      title: 'Real-Time Patient Navigation System',
      subtitle: 'Indoor Guidance',
      description: 'Step-by-step guidance inside large hospitals for rooms, departments, and doctor availability.',
      features: ['Indoor Wayfinding', 'Doctor Availability Tracking', 'Reduced Staff Dependency', 'Enhanced Experience'],
      color: 'from-emerald-500 to-teal-500'
    },
    {
      icon: Languages,
      title: 'Multilingual Communication Engine',
      subtitle: 'ZerolangT',
      description: 'Enables real-time, two-way communication across languages without human translators.',
      features: ['Real-time Translation', '2-Way Medical Dialogue', 'Invisible Language Barrier', 'Accurate Consultations'],
      color: 'from-blue-400 to-cyan-500'
    },
    {
      icon: Smile,
      title: 'Treatment Outcome Visualization',
      subtitle: 'HappyFace – Dental AI',
      description: 'Provides realistic previews of dental treatment outcomes to build patient confidence.',
      features: ['Predictive Visualization', 'Outcome Previews', 'Confidence Building', 'Higher Acceptance Rates'],
      color: 'from-pink-500 to-rose-500'
    },
    {
      icon: Activity,
      title: 'Passive Movement Analysis',
      subtitle: 'Orthoscopic AI',
      description: 'Detects abnormalities in movement, posture, and gait from the moment a patient enters.',
      features: ['Gait Analysis', 'Posture Detection', 'Early Clinical Insights', 'Passive Monitoring'],
      color: 'from-violet-500 to-purple-500'
    },
    {
      icon: ShieldCheck,
      title: 'Insurance & Billing Intelligence',
      subtitle: 'FinTech Health',
      description: 'Automated insurance verification, eligibility checks, and approval prediction in minutes.',
      features: ['Automated Verification', 'Eligibility Checks', 'Cost Estimation', 'Instant Approvals'],
      color: 'from-sky-500 to-indigo-500'
    },
    {
      icon: Code,
      title: 'Smart Medical Coding',
      subtitle: 'CPT Assistance',
      description: 'Context-aware code suggestions during billing to reduce claim rejections and delays.',
      features: ['Auto CPT Suggestions', 'Reduced Claim Rejections', 'Administrative Efficiency', 'Accurate Billing'],
      color: 'from-slate-500 to-gray-500'
    },
    {
      icon: Database,
      title: 'Unified Clinical Data Engine',
      subtitle: 'Core AI Layer',
      description: 'Brings all hospital data—EMR, labs, vitals—into a single structured intelligence layer.',
      features: ['Structured Data Layer', 'EMR & Lab Integration', 'Real-time Intelligence', 'Consistent Insights'],
      color: 'from-cyan-500 to-blue-500'
    },
    {
      icon: AlertTriangle,
      title: 'Predictive ICU Monitoring',
      subtitle: 'Early Warning System',
      description: 'Continuous risk prediction for critical conditions like sepsis or cardiac events.',
      features: ['Early Warning Alerts', 'Sepsis Prediction', 'Continuous Monitoring', 'Proactive Intervention'],
      color: 'from-red-500 to-rose-500'
    },
    {
      icon: Scan,
      title: 'Surgical AI Assistance',
      subtitle: 'OT Vision',
      description: 'Real-time support inside operation theatres through voice and vision-based procedure tracking.',
      features: ['Procedure Tracking', 'Voice-Vision Support', 'Automated OT Documentation', 'Real-time Assistance'],
      color: 'from-blue-600 to-indigo-600'
    },
    {
      icon: Pill,
      title: 'Pharmacy Intelligence System',
      subtitle: 'PharmaTech',
      description: 'Drug interaction checks, adherence prediction, and smart inventory optimization.',
      features: ['Interaction Safety Checks', 'Adherence Prediction', 'Inventory Optimization', 'Wastage Reduction'],
      color: 'from-emerald-600 to-green-600'
    },
    {
      icon: Workflow,
      title: 'AI Orchestration Layer',
      subtitle: 'Hospital Intelligence Brain',
      description: 'Centralized integration of all AI systems into a single, cohesive hospital brain.',
      features: ['Central Orchestration', 'System Integration', 'Unified Management', 'Intelligent Workflow'],
      color: 'from-purple-600 to-fuchsia-600'
    }

  ];

  return (
    <section id="solutions" className="py-20 relative particle-bg">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="section-heading mb-6 animate-fade-in-up">
            Our AI Solutions
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Comprehensive AI solutions designed to solve complex business challenges and drive innovation across industries.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {solutions.map((solution, index) => (
            <div
              key={solution.title}
              className={`group relative glass-effect rounded-lg overflow-hidden transition-all duration-500 cursor-pointer animate-fade-in-up ${activeCard === index ? 'ai-glow scale-105' : 'hover:ai-glow'
                }`}
              style={{ animationDelay: `${index * 0.1}s` }}
              onMouseEnter={() => setActiveCard(index)}
            >
              {/* Gradient Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${solution.color} opacity-10 group-hover:opacity-20 transition-opacity duration-300`}></div>

              {/* Card Content */}
              <div className="relative z-10 p-8">
                {/* Header */}
                <div className="mb-6">
                  <solution.icon className="w-12 h-12 text-primary mb-4 group-hover:scale-110 transition-transform duration-300 ai-glow" />
                  <h3 className="text-2xl font-semibold mb-2 text-foreground">{solution.title}</h3>
                  <p className="text-primary font-medium">{solution.subtitle}</p>
                </div>

                {/* Description */}
                <p className="text-muted-foreground mb-6 leading-relaxed">{solution.description}</p>

                {/* Features */}
                <div className="space-y-2 mb-6">
                  {solution.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary ai-glow"></div>
                      <span className="text-sm text-foreground">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <button className="w-full bg-primary/10 hover:bg-primary hover:text-primary-foreground text-primary border border-primary/30 px-6 py-3 rounded-lg transition-all duration-300 font-semibold">
                  Learn More
                </button>
              </div>

              {/* Flip Effect Back */}
              <div className="absolute inset-0 bg-black/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 z-20">
                <div className="text-center p-6">
                  <solution.icon className="w-16 h-16 text-primary mx-auto mb-4 ai-glow" />
                  <h4 className="text-xl font-semibold text-white mb-4 neon-text">{solution.title}</h4>
                  <p className="text-gray-300 mb-6">Ready to implement this solution?</p>
                  <Link to="/solutions" className="bg-primary hover:bg-primary/80 text-primary-foreground px-6 py-3 rounded-lg transition-all duration-300 ai-glow">
                    Get Started</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SolutionsSection;
