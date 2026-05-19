import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCapabilitiesOpen, setIsCapabilitiesOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [isSolutionsOpen, setIsSolutionsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const capabilities = [
    { name: 'Healthcare', href: '/industries/healthcare', subdomains: [{ name: 'Gen AI', id: 'gen-ai' }, { name: 'Agentic AI', id: 'agentic-ai' }] },
    { name: 'Robots', href: 'https://zerokostrobo.netlify.app/', subdomains: [{ name: 'AI Robotics', id: 'ai-robotics' }, { name: 'AI Robot Control', id: 'ai-robot-control' }], isExternal: true }
  ];

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

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md' : 'bg-white/80 backdrop-blur-md'}`}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <Link to="/">
              <img src="/curaquantis.png" alt="Logo" className="h-16 w-auto object-contain" />
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-12">
            {/* Solutions Dropdown */}
            <div className="relative group">
              <button
                className="flex items-center text-gray-900 hover:text-blue-600 transition-colors duration-300 font-light"
                onClick={() => setIsSolutionsOpen(!isSolutionsOpen)}
                onMouseEnter={() => setIsSolutionsOpen(true)}
              >
                HealthTech AI
                <ChevronDown className={`ml-1 w-4 h-4 transition-transform duration-300 ${isSolutionsOpen ? 'rotate-180' : ''}`} />
              </button>
              {isSolutionsOpen && (
                <div
                  className="absolute top-full left-1/2 -translate-x-1/2 w-[900px] mt-4"
                  onMouseLeave={() => setIsSolutionsOpen(false)}
                >
                  <div className="bg-white rounded-[40px] shadow-2xl border border-blue-50 p-12 animate-fade-in-up">
                    <div className="grid grid-cols-2 gap-x-12 gap-y-6">
                      {solutions.map((solution) => (
                        <Link
                          key={solution.id}
                          to={`/solutions#${solution.id}`}
                          className="group/item flex items-center space-x-4 p-4 rounded-2xl hover:bg-blue-50 transition-all duration-300"
                          onClick={() => setIsSolutionsOpen(false)}
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

            {/* Products Dropdown
            <div className="relative group">
              <button
                className="flex items-center text-gray-900 hover:text-blue-600 transition-colors duration-300 font-light"
                onClick={() => setIsProductsOpen(!isProductsOpen)}
                onMouseEnter={() => setIsProductsOpen(true)}
              >
                AI Products
                <ChevronDown className={`ml-1 w-4 h-4 transition-transform duration-300 ${isProductsOpen ? 'rotate-180' : ''}`} />
              </button>
              {isProductsOpen && (
                <div
                  className="absolute top-full left-1/2 -translate-x-1/2 w-[600px] mt-4"
                  onMouseLeave={() => setIsProductsOpen(false)}
                >
                  <div className="bg-white rounded-[40px] shadow-2xl border border-blue-50 p-10 animate-fade-in-up">
                    <div className="grid grid-cols-1 gap-4">
                      {products.map((product) => (
                        <Link
                          key={product.id}
                          to={product.path ? product.path : `/products#${product.id}`}
                          className="group/item flex items-center justify-between p-4 rounded-2xl hover:bg-blue-50 transition-all duration-300"
                          onClick={() => setIsProductsOpen(false)}
                        >
                          <span className="text-gray-700 font-light group-hover/item:text-blue-900">{product.name}</span>
                          <div className="w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center opacity-0 group-hover/item:opacity-100 transition-all">
                            <ChevronDown className="-rotate-90 w-3 h-3 text-blue-600" />
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
            */}

            {/* Capabilities Dropdown */}
            <div className="relative group">
              <button
                className="flex items-center text-gray-900 hover:text-blue-600 transition-colors duration-300 font-light"
                onClick={() => setIsCapabilitiesOpen(!isCapabilitiesOpen)}
                onMouseEnter={() => setIsCapabilitiesOpen(true)}
              >
                Capabilities
                <ChevronDown className={`ml-1 w-4 h-4 transition-transform duration-300 ${isCapabilitiesOpen ? 'rotate-180' : ''}`} />
              </button>
              {isCapabilitiesOpen && (
                <div
                  className="absolute top-full left-1/2 -translate-x-1/2 w-[700px] mt-4"
                  onMouseLeave={() => setIsCapabilitiesOpen(false)}
                >
                  <div className="bg-white rounded-[40px] shadow-2xl border border-blue-50 p-12 animate-fade-in-up">
                    <div className="grid grid-cols-2 gap-12">
                      {capabilities.map((industry) => (
                        <div key={industry.name} className="space-y-6">
                          <div className="pb-3 border-b border-blue-100">
                            {industry.isExternal ? (
                              <a href={industry.href} target="_blank" rel="noopener noreferrer" className="text-xl font-light text-blue-900 hover:text-blue-600 transition-colors">
                                {industry.name}
                              </a>
                            ) : (
                              <Link to={industry.href} className="text-xl font-light text-blue-900 hover:text-blue-600 transition-colors">
                                {industry.name}
                              </Link>
                            )}
                          </div>
                          <div className="space-y-3">
                            {industry.subdomains.map((subdomain) => (
                              <Link
                                key={subdomain.id}
                                to={`${industry.href}#${subdomain.id}`}
                                className="block text-sm text-gray-500 hover:text-blue-600 transition-all hover:translate-x-2"
                                onClick={() => setIsCapabilitiesOpen(false)}
                              >
                                {subdomain.name}
                              </Link>
                            ))}
                          </div>
                        </div>
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
                className="text-gray-900 hover:text-blue-600 transition-colors duration-300 font-light"
              >
                {item.name}
              </Link>
            ))}
            <a
              href="/360deg.html"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-900 hover:text-blue-600 transition-colors duration-300 font-light"
            >
              Virtual Clinic Tour
            </a>
            <Link to="/contact" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full transition-all duration-300 font-light">
              Get Started
            </Link>
          </div>

          <button
            className="md:hidden text-gray-900"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden bg-white shadow-lg rounded-lg mt-2 p-6 max-h-[80vh] overflow-y-auto">
            {/* Mobile Solutions */}
            <div className="py-3">
              <button
                className="flex items-center text-gray-900 hover:text-blue-600 transition-colors duration-300 font-light"
                onClick={() => setIsSolutionsOpen(!isSolutionsOpen)}
              >
                HealthTech AI
                <ChevronDown className={`ml-1 w-4 h-4 transition-transform duration-300 ${isSolutionsOpen ? 'rotate-180' : ''}`} />
              </button>
              {isSolutionsOpen && (
                <div className="pl-4 mt-2 space-y-2">
                  {solutions.map((solution) => (
                    <Link
                      key={solution.id}
                      to={`/solutions#${solution.id}`}
                      className="block text-sm text-gray-900 hover:text-blue-600 transition-colors duration-300 border-l-2 border-transparent hover:border-blue-400 pl-4"
                      onClick={() => {
                        setIsSolutionsOpen(false);
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      {solution.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile Products
            <div className="py-3">
              <button
                className="flex items-center text-gray-900 hover:text-blue-600 transition-colors duration-300 font-light"
                onClick={() => setIsProductsOpen(!isProductsOpen)}
              >
                AI Products
                <ChevronDown className={`ml-1 w-4 h-4 transition-transform duration-300 ${isProductsOpen ? 'rotate-180' : ''}`} />
              </button>
              {isProductsOpen && (
                <div className="pl-4 mt-2 space-y-2">
                  {products.map((product) => (
                    <Link
                      key={product.id}
                      to={product.path ? product.path : `/products#${product.id}`}
                      className="block text-sm text-gray-900 hover:text-blue-600 transition-colors duration-300 border-l-2 border-transparent hover:border-blue-400 pl-4"
                      onClick={() => {
                        setIsProductsOpen(false);
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      {product.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            */}

            {/* Mobile Capabilities */}
            <div className="py-3">
              <button
                className="flex items-center text-gray-900 hover:text-blue-600 transition-colors duration-300 font-light"
                onClick={() => setIsCapabilitiesOpen(!isCapabilitiesOpen)}
              >
                Capabilities
                <ChevronDown className={`ml-1 w-4 h-4 transition-transform duration-300 ${isCapabilitiesOpen ? 'rotate-180' : ''}`} />
              </button>
              {isCapabilitiesOpen && (
                <div className="pl-4 mt-2 space-y-4">
                  {capabilities.map((industry) => (
                    <div key={industry.name} className="space-y-2">
                      {industry.isExternal ? (
                        <a
                          href={industry.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block text-gray-900 hover:text-blue-600 transition-colors duration-300 font-light"
                          onClick={() => {
                            setIsCapabilitiesOpen(false);
                            setIsMobileMenuOpen(false);
                          }}
                        >
                          {industry.name}
                        </a>
                      ) : (
                        <Link
                          to={industry.href}
                          className="block text-gray-900 hover:text-blue-600 transition-colors duration-300 font-light"
                          onClick={() => {
                            setIsCapabilitiesOpen(false);
                            setIsMobileMenuOpen(false);
                          }}
                        >
                          {industry.name}
                        </Link>
                      )}
                      <div className="pl-4 space-y-2">
                        {industry.subdomains.map((subdomain) => (
                          <Link
                            key={subdomain.id}
                            to={`${industry.href}#${subdomain.id}`}
                            className="block text-sm text-gray-900 hover:text-blue-600 transition-colors duration-300 border-l-2 border-transparent hover:border-blue-400 pl-4"
                            onClick={() => {
                              setIsCapabilitiesOpen(false);
                              setIsMobileMenuOpen(false);
                            }}
                          >
                            {subdomain.name}
                          </Link>
                        ))}
                      </div>
                    </div>
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
              360deg View
            </a>
            <Link to="/contact" className="w-full bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full mt-4 transition-all duration-300 font-light">
              Get Started
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
