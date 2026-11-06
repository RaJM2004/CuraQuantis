
import React from 'react';
import { Building2, Stethoscope, Microscope, ShieldCheck, Pill, Plane, CheckCircle2 } from 'lucide-react';

const HealthcareEcosystemSection = () => {
  const segments = [
    {
      icon: Building2,
      name: 'CuraElite Care',
      title: 'Advanced Tertiary Care Hospitals & Specialty Centers',
      description: 'Our network of multi-specialty hospitals focused on complex procedures and high-value inpatient care.',
      features: [
        'Predictive clinical decision support for complex cases (oncology, cardiology, critical care)',
        'AI-assisted surgical planning and outcome prediction',
        'Smart ICU, bed, and operating theatre optimization',
        'Readmission risk prediction and post-discharge monitoring'
      ]
    },
    {
      icon: Stethoscope,
      name: 'CuraClinics',
      title: 'Neighborhood Specialty Clinics & Primary Care Network',
      description: 'The first touchpoint for patients, enabling early diagnosis and long-term engagement.',
      features: [
        'AI-powered symptom checker and triage system',
        'Personalized care pathways and follow-up recommendations',
        'Doctor assist tools (real-time transcription, treatment suggestions)',
        'Patient retention and engagement analytics'
      ]
    },
    {
      icon: Microscope,
      name: 'CuraDiagnostics',
      title: 'Diagnostics, Imaging & Pathology Network',
      description: 'The data backbone, enabling accurate diagnosis and longitudinal patient records.',
      features: [
        'Automated radiology and pathology report analysis',
        'Early disease detection using pattern recognition',
        'Unified patient health records powered by AI',
        'Demand forecasting for lab and imaging services'
      ]
    },
    {
      icon: ShieldCheck,
      name: 'CuraCover',
      title: 'Health Insurance & InsurTech Platform',
      description: 'Ensures affordability and seamless financial access to healthcare services.',
      features: [
        'AI-driven claims automation and instant approvals',
        'Dynamic risk scoring and personalized premium models',
        'EMI-based affordability planning using predictive analytics',
        'Fraud detection through anomaly recognition'
      ]
    },
    {
      icon: Pill,
      name: 'CuraPharma',
      title: 'Pharma Retail & Supply Chain Network',
      description: 'Captures prescription value while optimizing supply chain efficiency.',
      features: [
        'Smart inventory and expiry management using predictive analytics',
        'AI-driven prescription intelligence (generic substitutions, cost optimization)',
        'Demand forecasting across locations',
        'End-to-end supply chain optimization'
      ]
    },
    {
      icon: Plane,
      name: 'CuraBridge Health',
      title: 'Medical Tourism & Global Patient Services',
      description: 'Connects international patients to high-quality, affordable care.',
      features: [
        'AI-powered international patient acquisition and targeting',
        'Virtual pre-diagnosis using uploaded medical records',
        'Cost, outcome, and treatment timeline prediction',
        'AI concierge for travel, stay, and treatment coordination'
      ]
    }
  ];

  return (

    <section id="healthcare-ecosystem" className="py-24 bg-gradient-to-b from-white to-blue-50/30 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-100/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 -z-10 animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-cyan-100/20 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2 -z-10"></div>

      <div className="container mx-auto px-6">
        <div className="text-center mb-20 max-w-4xl mx-auto">
          <div className="inline-block px-4 py-2 rounded-full bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-widest mb-6 animate-fade-in">
            Interconnected Network
          </div>
          <h2 className="section-heading mb-6 slide-up !text-5xl">
            Integrated <span className="text-blue-600">Healthcare Ecosystem</span>
          </h2>
          <div className="relative inline-block max-w-3xl">
            <p className="text-2xl text-blue-900/70 font-light mb-8 italic slide-up stagger-1 leading-relaxed">
              "Cura is an AI-driven, fully integrated healthcare ecosystem—connecting patients from first consultation to advanced treatment, powered by data, intelligence, and seamless care delivery"
            </p>
            <div className="absolute -left-8 -top-4 text-7xl text-blue-100 font-serif">"</div>
            <div className="absolute -right-8 -bottom-4 text-7xl text-blue-100 font-serif rotate-180">"</div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {segments.map((segment, index) => (
            <div 
              key={segment.name}
              className={`medical-glass p-10 subtle-hover slide-up stagger-${(index % 3) + 1} flex flex-col h-full group relative overflow-hidden`}
            >
              {/* Card Accent */}
              <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-blue-400 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="flex items-center space-x-5 mb-8">
                <div className="p-4 bg-white shadow-inner rounded-2xl group-hover:bg-blue-600 transition-colors duration-500 box-shadow-blue">
                  <segment.icon className="w-8 h-8 text-blue-600 group-hover:text-white" strokeWidth={1} />
                </div>
                <div>
                  <h3 className="text-2xl font-light text-blue-900 group-hover:text-blue-600 transition-colors">{segment.name}</h3>
                  <div className="h-0.5 w-12 bg-blue-100 mt-1 group-hover:w-20 transition-all duration-500 rounded-full"></div>
                </div>
              </div>
              
              <h4 className="text-sm font-semibold text-blue-800/80 mb-4 tracking-wide uppercase">{segment.title}</h4>
              <p className="minimal-text text-sm mb-8 leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity">
                {segment.description}
              </p>

              <div className="mt-auto">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold text-blue-500 uppercase tracking-widest">AI Intelligence Layer</span>
                  <div className="w-8 h-px bg-blue-100"></div>
                </div>
                <ul className="space-y-4">
                  {segment.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-start space-x-4 group/item">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 flex-shrink-0 group-hover/item:scale-150 group-hover/item:bg-blue-600 transition-all"></div>
                      <span className="text-sm minimal-text leading-relaxed text-gray-700 font-light">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HealthcareEcosystemSection;
