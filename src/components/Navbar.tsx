import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<'solutions' | 'workflows' | null>(null);
  const [mobileDropdown, setMobileDropdown] = useState<'solutions' | 'workflows' | null>(null);

  useEffect(() => {
    setActiveDropdown(null);
    setIsMobileMenuOpen(false);
    setMobileDropdown(null);
  }, [location.pathname, location.hash]);

  const quickWorkflows = [
    { id: 'ecosystem', title: 'CuraQuantis Ecosystem', subtitle: 'Connected pan-India healthcare architecture' },
    { id: 'patient-journey', title: 'Patient Care Continuum', subtitle: '8-stage journey with clinical oversight' },
    { id: 'diagnostics', title: 'Diagnostic Lab Pipeline', subtitle: '11-stage automated sample testing' },
    { id: 'ai-architecture', title: 'Clinical AI Inference', subtitle: '8-stage multi-modal AI workflow' },
    { id: 'curavoice', title: 'CuraVoice™ Speech AI', subtitle: 'Ambient consultation in 22 languages' },
    { id: 'rural-hub-spoke', title: 'Rural Hub & Spoke', subtitle: '5-tier rural telemedicine delivery' },
    { id: 'quality-governance', title: 'Quality & SOP Cycle', subtitle: '7-stage continuous excellence wheel' },
    { id: 'command-center', title: 'National Command Center', subtitle: '16 desks monitoring network 24/7' },
    { id: 'franchise-lifecycle', title: 'Franchise Launch Lifecycle', subtitle: '19-stage center opening milestones' },
    { id: 'strategy-52-phase', title: '52-Phase Strategy Explorer', subtitle: '12 functional ecosystem clusters' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  const products = [
    { name: 'Non Invasive Ventilator', id: 'ventilator', path: '/products/ventilator' },
    { name: 'Electronic Health Records (EHR)', id: 'ehr' },
    { name: 'Telemedicine Platform', id: 'telemedicine' },
    { name: 'Health Monitoring App', id: 'health-monitoring' },
    { name: 'Hospital Management System (HMS)', id: 'hms' },
    { name: 'AI Diagnosis Assistant', id: 'ai-diagnosis' },
    { name: 'Patient Portal', id: 'patient-portal' }
  ];

  const solutions = [
    { name: 'Digital OPD & Teleconsultation', id: 'mediconnect' },
    { name: 'Voice-Driven Prescription Intelligence', id: 'prescription-ai' },
    { name: 'Real-Time Patient Navigation', id: 'patient-navigation' },
    { name: 'ZerolangT (Multilingual)', id: 'zerolangt' },
    { name: 'HappyFace (Dental AI)', id: 'happyface' },
    { name: 'Orthoscopic AI', id: 'orthoscopic-ai' },
    { name: 'Insurance & Billing Intelligence', id: 'insurance-intelligence' },
    { name: 'Smart Medical Coding', id: 'smart-coding' },
    { name: 'Core AI Layer', id: 'core-ai-layer' },
    { name: 'Predictive ICU Monitoring', id: 'icu-monitoring' },
    { name: 'Surgical AI Assistance', id: 'surgical-ai' },
    { name: 'Pharmacy Intelligence System', id: 'pharmacy-intelligence' },
    { name: 'AI Orchestration Layer', id: 'orchestration-layer' }
  ];

  const navItems = [
    { name: 'CuraVoice AI', href: '/insights' },
    { name: 'Demo Center', href: '/demo-center' },
    { name: 'About', href: '/about' }
  ];

  const isSolidNavbar = isScrolled || location.pathname.startsWith('/portal') || location.pathname.startsWith('/partner-portal');

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isSolidNavbar ? 'bg-white shadow-md' : 'bg-white/80 backdrop-blur-md'}`}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20 max-w-7xl mx-auto">
          <div className="flex items-center flex-shrink-0 mr-3 xl:mr-6">
            <Link to="/" className="flex items-center gap-2 sm:gap-2.5 group py-1">
              <img
                src="/graphics-clean.png"
                alt="CuraQuantis Emblem"
                className="h-9 sm:h-10 md:h-11 w-auto object-contain flex-shrink-0 transition-transform duration-300 group-hover:scale-105"
              />
              <img
                src="/text-clean.png"
                alt="CuraQuantis Health Clinics"
                className="h-6 sm:h-7 md:h-8 w-auto object-contain flex-shrink-0"
              />
            </Link>
          </div>

          <div className="hidden lg:flex items-center gap-2 xl:gap-3.5 2xl:gap-5 text-xs xl:text-sm flex-nowrap">
            {/* Solutions Dropdown */}
            <div
              className="relative group flex-shrink-0"
              onMouseEnter={() => setActiveDropdown('solutions')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                type="button"
                className="flex items-center text-gray-900 hover:text-blue-600 transition-colors duration-300 font-light whitespace-nowrap py-2"
                onClick={() => setActiveDropdown(activeDropdown === 'solutions' ? null : 'solutions')}
                aria-expanded={activeDropdown === 'solutions'}
              >
                <span>HealthTech AI</span>
                <ChevronDown className={`ml-1 w-3.5 h-3.5 transition-transform duration-300 ${activeDropdown === 'solutions' ? 'rotate-180' : ''}`} />
              </button>
              {activeDropdown === 'solutions' && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-[900px] pt-2 z-50">
                  <div className="bg-white rounded-[40px] shadow-2xl border border-blue-50 p-12 animate-fade-in-up">
                    <div className="grid grid-cols-2 gap-x-12 gap-y-6">
                      {solutions.map((solution) => (
                        <Link
                          key={solution.id}
                          to={`/solutions#${solution.id}`}
                          className="group/item flex items-center space-x-4 p-4 rounded-2xl hover:bg-blue-50 transition-all duration-300"
                          onClick={() => setActiveDropdown(null)}
                        >
                          <div className="w-2 h-2 rounded-full bg-blue-200 group-hover/item:bg-blue-600 transition-colors"></div>
                          <span className="text-gray-700 font-light group-hover/item:text-blue-900 group-hover/item:translate-x-1 transition-all">{solution.name}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>


            {/* Workflows Dropdown */}
            <div
              className="relative group flex-shrink-0"
              onMouseEnter={() => setActiveDropdown('workflows')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link
                to="/workflows"
                className="flex items-center text-gray-900 hover:text-blue-600 transition-colors duration-300 font-normal whitespace-nowrap py-2"
                onClick={() => setActiveDropdown(null)}
              >
                <span className="text-blue-700 hover:text-blue-600 font-medium">Workflows</span>
                <ChevronDown className={`ml-1 w-3.5 h-3.5 transition-transform duration-300 ${activeDropdown === 'workflows' ? 'rotate-180' : ''}`} />
              </Link>
              {activeDropdown === 'workflows' && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-[720px] pt-2 z-50">
                  <div className="bg-white rounded-[32px] shadow-2xl border border-blue-50 p-8 animate-fade-in-up">
                    <div className="flex items-center justify-between pb-3 mb-4 border-b border-blue-100">
                      <div>
                        <h4 className="text-sm font-bold text-blue-950">CuraQuantis™ Workflow Registry</h4>
                        <p className="text-xs text-gray-500">20 interactive process workflows spanning the Pan-India healthcare ecosystem</p>
                      </div>
                      <Link
                        to="/workflows"
                        className="text-xs font-semibold text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-full transition-colors"
                        onClick={() => setActiveDropdown(null)}
                      >
                        All 20 Workflows →
                      </Link>
                    </div>
                    <div className="grid grid-cols-2 gap-x-6 gap-y-2.5">
                      {quickWorkflows.map((item) => (
                        <Link
                          key={item.id}
                          to={`/workflows?workflow=${item.id}`}
                          className="group/wf flex items-start space-x-3 p-2.5 rounded-xl hover:bg-blue-50 transition-all duration-200"
                          onClick={() => setActiveDropdown(null)}
                        >
                          <div className="w-2 h-2 rounded-full bg-blue-400 group-hover/wf:bg-blue-600 mt-1.5 transition-colors" />
                          <div>
                            <span className="text-xs font-semibold text-gray-800 group-hover/wf:text-blue-900 block">
                              {item.title}
                            </span>
                            <span className="text-[11px] text-gray-500 block truncate max-w-[270px]">
                              {item.subtitle}
                            </span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-gray-900 hover:text-blue-600 transition-colors duration-300 font-light whitespace-nowrap flex-shrink-0"
              >
                <span>{item.name}</span>
              </Link>
            ))}
            <a
              href="/360deg.html"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-900 hover:text-blue-600 transition-colors duration-300 font-light whitespace-nowrap flex-shrink-0"
            >
              Virtual Clinic Tour
            </a>
            <Link
              to="/partner-portal"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-medium text-xs shadow-sm whitespace-nowrap flex-shrink-0 transition-all transform hover:-translate-y-0.5"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse flex-shrink-0" />
              <span>Partner & Investor Portal</span>
            </Link>
            <Link 
              to="/portal/login" 
              className={`font-semibold text-xs px-3.5 py-1.5 rounded-full border whitespace-nowrap flex-shrink-0 transition-all ${
                location.pathname === '/portal/login'
                  ? 'bg-orange-500 text-white border-orange-500 shadow-sm'
                  : 'text-orange-600 hover:text-white border-orange-400 hover:bg-orange-500 hover:border-orange-500'
              }`}
            >
              Portal Sign In
            </Link>
            <Link to="/contact" className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full transition-all duration-300 text-xs xl:text-sm font-medium whitespace-nowrap flex-shrink-0 shadow-sm">
              Contact Us
            </Link>
          </div>

          <button
            className="lg:hidden text-gray-900 p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white shadow-xl rounded-2xl mt-2 p-6 max-h-[80vh] overflow-y-auto border border-slate-100 animate-fade-in-up">
            {/* Mobile Solutions */}
            <div className="py-3">
              <button
                className="flex items-center text-gray-900 hover:text-blue-600 transition-colors duration-300 font-light"
                onClick={() => setMobileDropdown(mobileDropdown === 'solutions' ? null : 'solutions')}
              >
                HealthTech AI
                <ChevronDown className={`ml-1 w-4 h-4 transition-transform duration-300 ${mobileDropdown === 'solutions' ? 'rotate-180' : ''}`} />
              </button>
              {mobileDropdown === 'solutions' && (
                <div className="pl-4 mt-2 space-y-2">
                  {solutions.map((solution) => (
                    <Link
                      key={solution.id}
                      to={`/solutions#${solution.id}`}
                      className="block text-sm text-gray-900 hover:text-blue-600 transition-colors duration-300 border-l-2 border-transparent hover:border-blue-400 pl-4"
                      onClick={() => {
                        setMobileDropdown(null);
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      {solution.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>


            {/* Mobile Workflows */}
            <div className="py-3">
              <button
                className="flex items-center text-gray-900 hover:text-blue-600 transition-colors duration-300 font-medium"
                onClick={() => setMobileDropdown(mobileDropdown === 'workflows' ? null : 'workflows')}
              >
                <span className="text-blue-700 font-medium">Workflows</span>
                <ChevronDown className={`ml-1 w-4 h-4 transition-transform duration-300 ${mobileDropdown === 'workflows' ? 'rotate-180' : ''}`} />
              </button>
              {mobileDropdown === 'workflows' && (
                <div className="pl-4 mt-2 space-y-2">
                  <Link
                    to="/workflows"
                    className="block text-sm font-bold text-blue-600 hover:text-blue-700 py-1"
                    onClick={() => {
                      setMobileDropdown(null);
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    Open All 20 Workflows →
                  </Link>
                  {quickWorkflows.map((item) => (
                    <Link
                      key={item.id}
                      to={`/workflows?workflow=${item.id}`}
                      className="block text-sm text-gray-700 hover:text-blue-600 transition-colors py-1 pl-2 border-l-2 border-slate-200 hover:border-blue-500"
                      onClick={() => {
                        setMobileDropdown(null);
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      {item.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="block py-3 text-gray-900 hover:text-blue-600 transition-colors duration-300 font-light"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <a
              href="/360deg.html"
              target="_blank"
              rel="noopener noreferrer"
              className="block py-3 text-gray-900 hover:text-blue-600 transition-colors duration-300 font-light"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Virtual Clinic Tour (360°)
            </a>
            <Link
              to="/partner-portal"
              className="block py-3 px-4 my-2 text-center rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold text-sm shadow-md"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Partner & Investor Portal
            </Link>
            <Link 
              to="/portal/login" 
              className="block py-3 px-4 my-2 text-center rounded-xl border border-orange-400 text-orange-600 hover:bg-orange-500 hover:text-white font-semibold text-sm transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Partner & Admin Portal Sign In
            </Link>
            <Link to="/contact" className="w-full bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full mt-2 transition-all duration-300 font-medium block text-center" onClick={() => setIsMobileMenuOpen(false)}>
              Contact Us
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
