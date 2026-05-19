
import React from 'react';
import { Mail, Phone, MapPin, ArrowUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const footerLinks = {
    'Solutions': [
      { name: 'Digital OPD & Teleconsultation', path: '/solutions#mediconnect' },
      { name: 'Voice-Driven Prescriptions', path: '/solutions#prescription-ai' },
      { name: 'Real-Time Navigation', path: '/solutions#patient-navigation' },
      { name: 'ZerolangT (Multilingual)', path: '/solutions#zerolangt' },
      { name: 'HappyFace (Dental AI)', path: '/solutions#happyface' },
      { name: 'Orthoscopic AI', path: '/solutions#orthoscopic-ai' },
      { name: 'Smart Medical Coding', path: '/solutions#smart-coding' },
      { name: 'Predictive ICU Monitoring', path: '/solutions#icu-monitoring' },
      { name: 'Surgical AI Assistance', path: '/solutions#surgical-ai' }
    ],
    'Industries': [
      { name: 'Healthcare', path: '/industries/healthcare' },
      { name: 'Robots', path: 'https://zerokostrobo.netlify.app/', isExternal: true }
    ],
    'Company': [
      { name: 'About Us', path: '/about' },
      { name: 'Insights', path: '/insights' },
      { name: 'Contact', path: '/contact' }
    ]
    // 'Resources': [
    //   { name: 'Documentation', path: '#' },
    //   { name: 'Case Studies', path: '#' },
    //   { name: 'White Papers', path: '#' },
    //   { name: 'Blog', path: '#' },
    //   { name: 'Support', path: '#' }
    // ]
  };

  return (
    <footer className="bg-blue-50/30 border-t border-blue-100/50">
      <div className="container mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-5 gap-16 mb-16">
          <div className="lg:col-span-2">
            <div className="mb-8">
              <Link to="/" className="text-2xl font-light text-blue-900 hover:text-blue-700 transition-colors duration-300">
                CuraQuantis Health Clinics Private Limited
              </Link>
            </div>
            <p className="minimal-text mb-8 leading-relaxed max-w-md">
              Cura is an AI-driven, fully integrated healthcare ecosystem—connecting patients from first consultation to advanced treatment, powered by data, intelligence, and seamless care delivery.
            </p>

            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-blue-600" strokeWidth={1} />
                <a href="mailto:ashwin@curaquantis.com" className="minimal-text hover:text-blue-900 transition-colors duration-300">
                  ashwin@curaquantis.com
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-blue-600" strokeWidth={1} />
                <a href="tel:+917036955133" className="minimal-text hover:text-blue-900 transition-colors duration-300">
                  +91 7036955133
                </a>
              </div>
              <div className="flex items-center space-x-5">
                <MapPin className="w-4 h-4 text-blue-600" strokeWidth={1} />
                <span className="minimal-text"><h1 className="text-blue-900 font-medium">Registered Office</h1>Unit G3, Plot No:39.40 & 41,
                  Sree Sai Hills, Gokul Plots,
                  Hafeezpet, KPHB Phase 13 road, KPHB Colony,
                  Hyderabad- 500085, Telangana State.
                </span>
                <span className="minimal-text"><h1 className="text-blue-900 font-medium">Corporate Office</h1>T-Hub's main facility (Phase 2), Plot No 1/C, Sy No 83/1, Raidurgam Panmaktha, Hyderabad Knowledge City, Serilingampally, Hyderabad, Telangana 500081
                </span>
              </div>
            </div>
            {/* <span className="minimal-text"><h1 className="text-blue-900 font-medium">We are turning <span className="text-blue-900">3 years.</span></h1>
            </span> */}
          </div>


          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-lg font-light text-blue-900 mb-6">{category}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    {link.isExternal ? (
                      <a
                        href={link.path}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="minimal-text hover:text-blue-600 transition-colors duration-300 text-sm"
                      >
                        {link.name}
                      </a>
                    ) : (
                      <Link
                        to={link.path}
                        className="minimal-text hover:text-blue-600 transition-colors duration-300 text-sm"
                      >
                        {link.name}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-blue-100">
          <div className="minimal-text mb-4 md:mb-0 text-sm">
            ©2026 CuraQuantis Health Clinics Pvt Ltd. All rights reserved. | A Subsidiary of GENQUANTIS PVT. LTD. (Holding Company)
          </div>

          <div className="flex items-center space-x-8">
            <button
              onClick={scrollToTop}
              className="border border-blue-200 p-2 rounded-full hover:bg-blue-50 transition-all duration-300"
            >
              <ArrowUp className="w-4 h-4 text-blue-600" strokeWidth={1} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
