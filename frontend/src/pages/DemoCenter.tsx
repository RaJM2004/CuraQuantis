
import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './DemoCenter.css';

const projectsData = [
  {
    id: 1,
    title: "MediConnect",
    subtitle: "Teleconsulting Platform",
    icon: "🏥",
    iconBg: "c-blue",
    catClass: "cat-blue",
    category: "Platform",
    filter: "platform",
    desc: "A complete digital healthcare system — not just a video consultation tool. Patients can book appointments, attend secure video consultations, make payments, receive multi-channel notifications, get AI-powered report analysis in 30 languages, and access a smart chatbot.",
    features: [
      "Instant appointment booking by specialty",
      "Unique Patient ID verified consultations",
      "UPI / Net Banking / QR payment gateway",
      "WhatsApp, SMS & Email notifications",
      "AI report analysis in 30 languages",
      "Voice & text chatbot assistant",
      "Separate patient & doctor dashboards",
      "Full medical history tracking"
    ],
    tags: ["React", "Node.js", "WebRTC", "AI", "Payment Gateway", "WhatsApp API", "NLP"],
    link: "#"
  },
  {
    id: 2,
    title: "Voice Prescription",
    subtitle: "AI-Based Prescription Generation",
    icon: "🎙️",
    iconBg: "c-green",
    catClass: "cat-green",
    category: "AI Model",
    filter: "ai-model",
    desc: "Instead of manual typing, this system listens to doctor-patient conversations, extracts medical details in real-time using UMLS library, and automatically generates structured, print-ready prescriptions with high noise cancellation.",
    features: [
      "Real-time speech-to-prescription",
      "UMLS medical terminology validation",
      "Auto-fills all prescription fields",
      "High noise cancellation",
      "Secure patient data handling",
      "Print/send-ready documents",
      "50 language support (v2.0)",
      "Department-based login profiles"
    ],
    tags: ["Speech Recognition", "UMLS", "NLP", "Python", "ML", "Healthcare AI"],
    link: "#"
  },
  {
    id: 3,
    title: "HospitalNav",
    subtitle: "Hospital Patient Guidance System",
    icon: "🗺️",
    iconBg: "c-orange",
    catClass: "cat-orange",
    category: "Platform",
    filter: "platform",
    desc: "Helps patients navigate inside large hospitals via digital kiosks or tablets. Guides them to specific departments, rooms, and services with floor numbers, room numbers, available doctors, and their availability timings.",
    features: [
      "Indoor navigation for hospitals",
      "Department & room-level guidance",
      "Doctor availability display",
      "Works on kiosks or tablets",
      "Multi-floor support",
      "Reduces staff dependency",
      "First-timer & elderly friendly",
      "Multi-specialty hospital support"
    ],
    tags: ["React", "Indoor Maps", "Kiosk", "UX Design", "Real-time Data"],
    link: "#"
  },
  {
    id: 4,
    title: "ZerolangT",
    subtitle: "Multilingual Communication System",
    icon: "🌐",
    iconBg: "c-purple",
    catClass: "cat-purple",
    category: "AI Model",
    filter: "ai-model",
    desc: "A real-time communication bridge between patients and healthcare providers across language barriers. Supports 800+ languages with bidirectional, context-aware medical translation — live during consultation.",
    features: [
      "800+ language support",
      "Real-time bidirectional translation",
      "Medical context-aware (not literal)",
      "Voice + text input",
      "Live during consultation",
      "Integrates with teleconsultation",
      "Chatbot & prescription ready",
      "Rural & cross-region support"
    ],
    tags: ["NLP", "Translation AI", "800+ Languages", "WebSockets", "Speech", "India-first"],
    link: "#"
  },
  {
    id: 5,
    title: "HappyFace",
    subtitle: "Dental Visualization Model",
    icon: "😁",
    iconBg: "c-yellow",
    catClass: "cat-yellow",
    category: "AI Model",
    filter: "ai-model",
    desc: "Gives patients a visual preview of their post-treatment dental appearance before the procedure begins. An instant AI-powered before-and-after simulation for whitening, alignment, implants, and more.",
    features: [
      "AI before-and-after simulation",
      "Multiple treatment previews",
      "Whitening, veneers, alignment",
      "Maintains facial proportions",
      "Instant output during consultation",
      "Compare different options",
      "Clinics & teleconsult integration",
      "Improves treatment acceptance"
    ],
    tags: ["Computer Vision", "GAN", "Image Processing", "React", "Python", "Dental AI"],
    link: "#"
  },
  {
    id: 6,
    title: "Orthoscopic",
    subtitle: "Movement Analysis & Early Disorder Detection",
    icon: "🦿",
    iconBg: "c-teal",
    catClass: "cat-teal",
    category: "AI Model",
    filter: "ai-model",
    desc: "Uses cameras to passively capture and analyze patient movement as they enter the hospital. Detects gait irregularities, posture issues, and limb motion anomalies linked to orthopedic or neurological conditions — before consultation begins.",
    features: [
      "Passive camera-based gait analysis",
      "Real-time body point tracking",
      "Joint, posture & limb analysis",
      "Pre-consultation screening report",
      "Detects stiffness & imbalance",
      "Non-invasive, fully automated",
      "No patient interaction needed",
      "Structured doctor insights"
    ],
    tags: ["Computer Vision", "Pose Estimation", "OpenCV", "ML", "Python", "Biomechanics"],
    link: "#"
  },
  {
    id: 7,
    title: "AI CRM Agent",
    subtitle: "Intelligent Calling & CRM Automation",
    icon: "📞",
    iconBg: "c-pink",
    catClass: "cat-pink",
    category: "Clinical Ops",
    filter: "clinical",
    desc: "An AI-powered CRM calling agent that automates patient outreach, follow-ups, appointment reminders, and hospital communication workflows — reducing manual effort for front-desk teams.",
    features: [
      "Automated patient call workflows",
      "AI-driven conversation handling",
      "Appointment reminders & follow-ups",
      "CRM pipeline integration",
      "Multi-channel outreach",
      "Call analytics & reporting",
      "Natural voice interaction",
      "Escalation to human agents"
    ],
    tags: ["Voice AI", "CRM", "Telephony API", "Automation", "LLM", "Node.js"],
    link: "#"
  },
  {
    id: 8,
    title: "InsureVerify",
    subtitle: "Insurance Verification & Authorization Platform",
    icon: "🛡️",
    iconBg: "c-blue",
    catClass: "cat-blue",
    category: "Clinical Ops",
    filter: "clinical",
    desc: "Automates the most time-consuming hospital process — insurance verification. Uses OCR to extract card details, checks eligibility in real-time, estimates patient costs, predicts authorization outcomes, and generates a complete report in minutes.",
    features: [
      "OCR insurance card extraction",
      "Real-time eligibility verification",
      "Benefits analysis (copay, deductible)",
      "Patient cost estimation",
      "AI authorization prediction",
      "Denial risk assessment",
      "CPT & diagnosis matching",
      "Instant downloadable report"
    ],
    tags: ["OCR", "Insurance APIs", "AI Rules Engine", "Python", "PDF Reports", "HL7"],
    link: "#"
  },
  {
    id: 9,
    title: "CPT Assist",
    subtitle: "CPT Code Assistance Model",
    icon: "🔢",
    iconBg: "c-green",
    catClass: "cat-green",
    category: "Clinical Ops",
    filter: "clinical",
    desc: "Simplifies and improves accuracy of medical coding during consultations and billing. Analyzes doctor notes, symptoms, and diagnosis to instantly suggest the most relevant CPT codes with confidence scores.",
    features: [
      "Context-aware CPT code suggestion",
      "Analyzes notes & symptoms",
      "Multiple code recommendations",
      "Confidence scoring per code",
      "Validates code correctness",
      "Real-time during consultation",
      "Reduces claim rejections",
      "Insurance system integration"
    ],
    tags: ["NLP", "Medical Coding", "CPT Database", "ML", "Python", "Billing AI"],
    link: "#"
  },
  {
    id: 10,
    title: "Clinical Data Fusion",
    subtitle: "Real-Time Clinical Data Fusion Engine (CNS Layer)",
    icon: "⚡",
    iconBg: "c-orange",
    catClass: "cat-orange",
    category: "Infrastructure",
    filter: "infrastructure",
    desc: "The central brain layer powering the entire AI ecosystem. Integrates EMR, vitals, lab reports, and imaging data into one unified real-time patient profile that all downstream AI models consume.",
    features: [
      "Multi-source real-time data ingestion",
      "EMR, vitals & imaging integration",
      "Low-latency stream processing",
      "Standardized patient data model",
      "Standard API connectivity",
      "Unified patient state creation",
      "Powers all AI downstream models",
      "Clinical feature extraction"
    ],
    tags: ["Apache Kafka", "FHIR", "ETL", "Python", "Real-time", "HL7", "Data Pipeline"],
    link: "#"
  },
  {
    id: 11,
    title: "ICU AI (EWS 2.0)",
    subtitle: "Predictive ICU Early Warning System",
    icon: "❤️",
    iconBg: "c-red",
    catClass: "cat-red",
    category: "AI Model",
    filter: "ai-model",
    desc: "Continuously monitors ICU patient vitals using time-series analysis to predict life-threatening events like cardiac arrest, sepsis, and respiratory failure — alerting doctors before complications occur.",
    features: [
      "Continuous vitals monitoring",
      "Cardiac arrest risk prediction",
      "Sepsis & respiratory failure alerts",
      "Rolling time-window analysis",
      "Continuous risk score generation",
      "Threshold-based alert triggers",
      "Reduced false positives",
      "Real-time doctor notifications"
    ],
    tags: ["Time Series ML", "LSTM", "ICU Data", "Alerting", "Python", "Critical Care AI"],
    link: "#"
  },
  {
    id: 12,
    title: "Surgical AI Assist",
    subtitle: "Voice + Computer Vision Surgical Assistant",
    icon: "🔬",
    iconBg: "c-purple",
    catClass: "cat-purple",
    category: "AI Model",
    filter: "ai-model",
    desc: "A real-time assistant inside the operation theater. Listens to surgical conversations, tracks instruments and anatomy visually, and generates automated surgical notes — turning operations into data-driven procedures.",
    features: [
      "Real-time speech processing",
      "Surgical instrument tracking",
      "Anatomical structure identification",
      "Automated surgical notes",
      "Camera + microphone integration",
      "Low-latency processing",
      "Structured medical data output",
      "Supports surgical documentation"
    ],
    tags: ["Computer Vision", "ASR", "YOLO", "NLP", "Python", "OT Integration", "Edge AI"],
    link: "#"
  },
  {
    id: 13,
    title: "Pharmacy Intelligence",
    subtitle: "AI Pharmacy Intelligence Engine",
    icon: "💊",
    iconBg: "c-teal",
    catClass: "cat-teal",
    category: "Clinical Ops",
    filter: "clinical",
    desc: "A smart pharmacy management and safety system that analyzes drug interactions, predicts patient medication adherence, forecasts inventory demand, and provides conversational support for pharmacists.",
    features: [
      "Drug interaction detection",
      "Unsafe combination alerts",
      "Patient adherence prediction",
      "Inventory demand forecasting",
      "Prescription data analysis",
      "Drug relationship intelligence",
      "Pharmacist conversational support",
      "Integration with prescriptions"
    ],
    tags: ["Drug Database", "ML", "NLP", "Python", "Pharmacy APIs", "Safety AI"],
    link: "#"
  },
  {
    id: 14,
    title: "Hospital AI Brain",
    subtitle: "Multi-Agent Orchestration System",
    icon: "🧠",
    iconBg: "c-pink",
    catClass: "cat-pink",
    category: "Infrastructure",
    filter: "infrastructure",
    desc: "The top-level intelligence system that connects and coordinates all AI modules in the hospital ecosystem. Multiple AI agents collaborate, tasks are automatically assigned and prioritized, with human oversight always available.",
    features: [
      "Multi-agent coordination layer",
      "Task scheduling & prioritization",
      "Cross-system communication",
      "Human-in-the-loop control",
      "Event-driven architecture",
      "Human override capability",
      "Conflict resolution logic",
      "End-to-end hospital workflow"
    ],
    tags: ["Multi-Agent AI", "Orchestration", "LLM", "Event Bus", "Python", "Hospital OS"],
    link: "#"
  }
];

const DemoCenter = () => {
  const [filter, setFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (project: any) => {
    setSelectedProject(project);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = '';
  };

  const filteredProjects = filter === 'all'
    ? projectsData
    : projectsData.filter(p => p.filter === filter);

  return (
    <div className="demo-center-container">
      <Navbar />

      <div className="bg-orbs"></div>
      <div className="bg-grid"></div>

      {/* Internal Bar for Demo Center specific status */}
      {/* <div className="pt-24 px-12 flex items-center justify-between relative z-[10]">
         <div className="nav-badge">
            <div className="nav-badge-dot"></div>
            <span>Demo Center — Live</span>
          </div>
      </div> */}

      <section className="hero">
        <div></div>
        <h1>AI-Powered<br /><span className="serif-italic">Healthcare Systems</span></h1>
        <p>A comprehensive suite of intelligent healthcare solutions — from teleconsultation to surgical assist — engineered to transform modern clinical workflows.</p>
        <div className="hero-stats">
          <div className="stat"><div className="stat-num">14</div><div className="stat-label">Projects</div></div>
          <div className="stat"><div className="stat-num">800+</div><div className="stat-label">Languages</div></div>
          <div className="stat"><div className="stat-num">AI</div><div className="stat-label">Powered</div></div>
        </div>
      </section>

      <div className="section-heading">
        <h2>Browse Solutions</h2>
        <div className="section-divider"></div>
      </div>

      <div className="filters">
        {['all', 'platform', 'ai-model', 'clinical', 'infrastructure'].map((f) => (
          <button
            key={f}
            className={`filter-btn ${filter === f ? 'active' : ''}`}
            onClick={() => setFilter(f)}
          >
            {f === 'all' ? 'All Projects' : f.charAt(0).toUpperCase() + f.slice(1).replace('-', ' ')}
          </button>
        ))}
      </div>

      <div className="grid">
        {filteredProjects.map((p, i) => (
          <div
            key={p.id}
            className="card"
            style={{ animationDelay: `${i * 0.045 + 0.04}s` }}
            onClick={() => openModal(p)}
          >
            <div className="card-header">
              <div className={`card-icon ${p.iconBg}`}>{p.icon}</div>
              <span className="card-num">#{String(p.id).padStart(2, '0')}</span>
            </div>
            <div className={`card-category ${p.catClass}`}>{p.category}</div>
            <div className="card-title">{p.title}</div>
            <div className="card-subtitle">{p.subtitle}</div>
            <div className="card-desc">{p.desc.substring(0, 138)}…</div>
            <div className="card-tags">
              {p.tags.slice(0, 4).map(t => <span key={t} className="tag">{t}</span>)}
            </div>
            <div className="card-footer">
              <div className="status-dot">Deployed</div>
              <button className="details-btn" onClick={(e) => { e.stopPropagation(); openModal(p); }}>Details →</button>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && selectedProject && (
        <div className={`modal-overlay open`} onClick={(e) => e.target === e.currentTarget && closeModal()}>
          <div className="modal">
            <div className="modal-top">
              <button className="modal-close" onClick={closeModal}>✕</button>
              <div className="modal-header-row">
                <div className={`modal-icon ${selectedProject.iconBg}`}>{selectedProject.icon}</div>
                <div className="modal-title-block">
                  <div className={`modal-category ${selectedProject.catClass}`}>{selectedProject.category}</div>
                  <div className="modal-title">{selectedProject.title}</div>
                  <div className="modal-subtitle">{selectedProject.subtitle}</div>
                </div>
              </div>
            </div>
            <div className="modal-body">
              <div className="modal-section">
                <div className="modal-section-label">Overview</div>
                <div className="modal-desc">{selectedProject.desc}</div>
              </div>
              <div className="modal-section">
                <div className="modal-section-label">Key Features</div>
                <ul className="feature-list">
                  {selectedProject.features.map((f: string, idx: number) => <li key={idx}>{f}</li>)}
                </ul>
              </div>
              <div className="modal-section">
                <div className="modal-section-label">Tech Stack</div>
                <div className="modal-tags">
                  {selectedProject.tags.map((t: string) => <span key={t} className="modal-tag">{t}</span>)}
                </div>
              </div>
            </div>
            <div className="modal-actions">
              <a className="btn-visit" href={selectedProject.link} target="_blank" rel="noopener noreferrer">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg>
                Visit Application
              </a>
              <button className="btn-close-modal" onClick={closeModal}>Close</button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default DemoCenter;
