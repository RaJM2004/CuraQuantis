import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { PartnerStore } from '@/lib/partnerStore';
import { 
  Building2, 
  MapPin, 
  ShieldCheck, 
  Search, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  Globe2, 
  Activity, 
  TrendingUp, 
  AlertTriangle,
  Award,
  Users,
  Smartphone,
  CreditCard,
  FileCheck2,
  HelpCircle,
  Stethoscope
} from 'lucide-react';

export const PartnerPortalHub: React.FC = () => {
  const [trackRef, setTrackRef] = useState('');
  const [trackError, setTrackError] = useState('');
  const navigate = useNavigate();

  const handleTrackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackRef.trim()) return;

    const app = PartnerStore.getApplicationById(trackRef.trim());
    if (app) {
      navigate(`/portal/login?appId=${app.id}`);
    } else {
      setTrackError(`Application with reference number "${trackRef}" was not found. Please verify your reference number (e.g., CQ-2026-904128) or submit a new application.`);
    }
  };

  const pathways = [
    {
      id: 'pan-india',
      title: 'Pan-India Channel Partner',
      badge: 'National Master Network',
      badgeColor: 'bg-indigo-500/20 text-indigo-300 border-indigo-400/30',
      description: 'Nationwide institutional leadership. Identify, coordinate, and develop Regional Channel Partners while orchestrating large-scale corporate healthcare and hospital integration.',
      eligibility: [
        'National presence across multiple Indian zones',
        'Proven track record in medical device/diagnostics distribution',
        'Corporate entity with audited financials (min 5 years)',
        'Logistical cold-chain capability and dedicated zonal field teams',
        'Investment commitment ₹5 Cr - ₹15 Cr+'
      ],
      authorityScope: 'Authorized to identify and recommend Regional Channel Partners. Cannot sign binding contracts or guarantee ROI on behalf of CuraQuantis™.',
      accentGradient: 'from-blue-600 via-indigo-600 to-indigo-800',
      cta: 'Apply for Pan-India Partnership'
    },
    {
      id: 'regional',
      title: 'Regional Channel Partner',
      badge: 'State & Zonal Lead',
      badgeColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-400/30',
      description: 'Drive high-impact regional penetration across designated States or UTs. Build doctor networks, healthcare centers, and introduce vetted prospective Franchise Investors.',
      eligibility: [
        'Strong local commercial relationships in target State/UT',
        'Experience in pathology, imaging, or healthcare franchise networks',
        'Operational office and local technical support readiness',
        '₹2,50,000 + GST Onboarding package upon CuraQuantis™ screening approval',
        'Investment capability ₹50 Lakhs - ₹3 Crores'
      ],
      authorityScope: 'Authorized to introduce and forward prospective Franchise Investors. Formally appointed ONLY by CuraQuantis™.',
      accentGradient: 'from-teal-600 via-cyan-600 to-blue-700',
      cta: 'Apply for Regional Partnership'
    },
    {
      id: 'franchise',
      title: 'CuraQuantis™ Franchise Investor',
      badge: 'Smart Diagnostic Center',
      badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-400/30',
      description: 'Own and operate a cutting-edge CuraQuantis™ AI Diagnostic & Smart Clinic hub. Equipped with real-time biometric analysis, digital pathology, and non-invasive screening technologies.',
      eligibility: [
        '1,200 - 3,500 sq.ft prime commercial property on ground/first floor',
        'Passionate about democratizing AI preventive diagnostics',
        'Financial capability of ₹1.5 Cr - ₹3 Cr per diagnostic center',
        'Adherence to strict NABL & AERB diagnostic protocols',
        'Approved solely by CuraQuantis™ Corporate Scrutiny Board'
      ],
      authorityScope: 'Direct Franchise Agreement executed solely by CuraQuantis™. Channel Partners cannot sign or commit terms.',
      accentGradient: 'from-amber-600 via-orange-600 to-rose-700',
      cta: 'Apply for Franchise Center'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />

      <main className="flex-grow pt-24 pb-20">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-blue-950 to-slate-900 text-white py-16 sm:py-24">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:20px_20px]" />
          
          <div className="container mx-auto px-4 sm:px-6 relative z-10 max-w-6xl">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 text-xs font-semibold uppercase tracking-wider mb-6">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Next-Gen Healthcare Partnership Ecosystem</span>
              </div>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight">
                AI + Diagnostics + National Network
              </h1>
              <p className="text-slate-300 text-base sm:text-lg font-light leading-relaxed mb-8">
                Welcome to the official <strong>CuraQuantis™ Partner & Franchise Investor Portal</strong>. 
                Our field work is actively underway nationwide. We are onboarding visionary Channel Partners 
                and Franchise Investors to scale India's most advanced AI-enabled preventive diagnostics network.
              </p>

              {/* Fast Action Buttons */}
              <div className="flex flex-wrap items-center gap-4">
                <a
                  href="#pathways"
                  className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-bold text-sm shadow-xl shadow-cyan-500/25 transition-all flex items-center gap-2"
                >
                  <span>Select Application Pathway</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
                <Link
                  to="/portal/login"
                  className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm border border-white/20 transition-colors flex items-center gap-2"
                >
                  <Users className="w-4 h-4 text-cyan-300" />
                  <span>Partner Portal Login</span>
                </Link>
                <Link
                  to="/portal/login?tab=admin"
                  className="px-5 py-3.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white font-medium text-xs border border-slate-700 transition-colors flex items-center gap-2"
                >
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>CuraQuantis™ Scrutiny Board</span>
                </Link>
              </div>
            </div>

            {/* Quick Status Tracker Search Box */}
            <div className="mt-14 bg-white/10 backdrop-blur-md border border-white/15 rounded-3xl p-6 sm:p-8 max-w-2xl shadow-2xl">
              <h3 className="text-sm font-bold uppercase tracking-wider text-cyan-300 flex items-center gap-2 mb-2">
                <Search className="w-4 h-4" />
                <span>Track Application Due Diligence Status</span>
              </h3>
              <p className="text-xs text-slate-300 font-light mb-4">
                Already filed an application? Enter your unique Reference Number (e.g. <code>CQ-2026-904128</code>) for real-time screening updates.
              </p>
              
              <form onSubmit={handleTrackSubmit} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  value={trackRef}
                  onChange={(e) => {
                    setTrackRef(e.target.value);
                    setTrackError('');
                  }}
                  placeholder="Enter CQ-2026-XXXXXX"
                  className="flex-grow px-4 py-3 rounded-xl bg-slate-900/80 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400 font-mono"
                />
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <span>Track Status</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>

              {trackError && (
                <p className="text-xs text-rose-400 mt-3 bg-rose-500/10 p-3 rounded-xl border border-rose-500/20">
                  {trackError}
                </p>
              )}
            </div>
          </div>
        </section>

        {/* 3 Application Pathways Section */}
        <section id="pathways" className="py-20 container mx-auto px-4 sm:px-6 max-w-6xl">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-4 py-1.5 rounded-full">
              Structured Due Diligence Gateways
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-4 mb-3">
              Three Distinct Application Pathways
            </h2>
            <p className="text-slate-600 text-sm sm:text-base font-light">
              Each category maintains its own eligibility requirements, screening pipeline, legal authority boundaries, and appointment covenants.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {pathways.map((p) => (
              <div
                key={p.id}
                className="bg-white rounded-3xl border border-slate-200/90 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col overflow-hidden group hover:-translate-y-1"
              >
                {/* Card Top Banner */}
                <div className={`p-6 sm:p-7 bg-gradient-to-r ${p.accentGradient} text-white`}>
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border ${p.badgeColor}`}>
                    {p.badge}
                  </span>
                  <h3 className="text-xl font-bold mt-4 mb-2 text-white">
                    {p.title}
                  </h3>
                  <p className="text-xs text-white/80 font-light leading-relaxed">
                    {p.description}
                  </p>
                </div>

                {/* Eligibility checklist */}
                <div className="p-6 sm:p-7 flex-grow space-y-6">
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Key Eligibility Criteria</span>
                    </h4>
                    <ul className="space-y-2 text-xs text-slate-600">
                      {p.eligibility.map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 text-[11px] text-slate-500 space-y-1">
                    <span className="font-semibold text-slate-800 uppercase tracking-wider text-[10px] block">
                      Authority Boundary:
                    </span>
                    <p className="leading-relaxed">{p.authorityScope}</p>
                  </div>
                </div>

                {/* CTA Button */}
                <div className="p-6 pt-0">
                  <Link
                    to={`/apply/${p.id}`}
                    className="w-full py-3.5 px-4 rounded-xl bg-slate-900 hover:bg-blue-600 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-2 shadow-md group-hover:bg-blue-600"
                  >
                    <span>{p.cta}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Governance & Authority Matrix Section (as emphasized in Dharani's email #8) */}
        <section className="py-16 bg-white border-y border-slate-200">
          <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
            <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 rounded-3xl p-8 sm:p-12 text-white shadow-xl">
              <div className="max-w-3xl mb-8">
                <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
                  <AlertTriangle className="w-4 h-4" />
                  <span>Enforced Software Governance</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
                  Clear CuraQuantis™ Authority Matrix
                </h3>
                <p className="text-slate-300 text-xs sm:text-sm font-light leading-relaxed">
                  The CuraQuantis™ portal strictly enforces company governance. Nothing is contractually committed without executive CuraQuantis™ approval.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-slate-300 font-light">
                <div className="p-5 bg-white/5 rounded-2xl border border-white/10 space-y-2">
                  <h4 className="text-sm font-bold text-cyan-300">Channel Partners May:</h4>
                  <ul className="space-y-1.5 text-slate-300 list-disc pl-4">
                    <li>Identify prospective Franchise Investors and diagnostic site locations.</li>
                    <li>Develop local healthcare awareness and clinical practitioner relationships.</li>
                    <li>Introduce and forward prospective investors into the CuraQuantis™ portal.</li>
                    <li>Conduct territory feasibility surveys within proposed zones.</li>
                  </ul>
                </div>

                <div className="p-5 bg-rose-950/30 rounded-2xl border border-rose-500/20 space-y-2">
                  <h4 className="text-sm font-bold text-rose-300">Channel Partners CANNOT:</h4>
                  <ul className="space-y-1.5 text-rose-200/90 list-disc pl-4">
                    <li>Appoint or approve any Franchise Investor.</li>
                    <li>Sign a Franchise or Distributor Agreement on behalf of CuraQuantis™.</li>
                    <li>Promise ROI, guarantee revenues, or project minimum business volume.</li>
                    <li>Grant territorial exclusivity or rights to any applicant.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ₹2.5 Lakh Onboarding Fee Disclosure Section (#9 in directive) */}
        <section className="py-16 container mx-auto px-4 sm:px-6 max-w-6xl">
          <div className="bg-slate-100/80 rounded-3xl p-8 sm:p-10 border border-slate-200">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-200">
              <div>
                <div className="flex items-center gap-2 text-blue-600 text-xs font-bold uppercase tracking-wider mb-1">
                  <CreditCard className="w-4 h-4" />
                  <span>Channel Partner Onboarding Architecture</span>
                </div>
                <h3 className="text-2xl font-bold text-slate-900">
                  ₹2,50,000 + 18% GST Partner Onboarding Package
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Structured workflow: Screening → Approval → Onboarding Terms → Payment → Training → Partner Activation
                </p>
              </div>
              <div className="text-left md:text-right">
                <span className="text-3xl font-extrabold text-blue-950">₹2,95,000</span>
                <span className="text-xs text-slate-500 block">Total Inclusive of GST</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6">
              <div className="p-4 bg-white rounded-2xl border border-slate-200">
                <FileCheck2 className="w-5 h-5 text-blue-600 mb-2" />
                <h4 className="font-semibold text-xs text-slate-900 mb-1">What the Package Covers</h4>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  Comprehensive executive orientation, AI clinical diagnostic training manuals, partner development collateral, regulatory compliance kit, and portal access.
                </p>
              </div>

              <div className="p-4 bg-white rounded-2xl border border-slate-200">
                <ShieldCheck className="w-5 h-5 text-emerald-600 mb-2" />
                <h4 className="font-semibold text-xs text-slate-900 mb-1">Approval Prerequisite</h4>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  Payment is requested <strong>ONLY AFTER</strong> passing CuraQuantis™ due diligence and formal appointment clearance. Payment itself does not constitute automatic approval.
                </p>
              </div>

              <div className="p-4 bg-white rounded-2xl border border-slate-200">
                <AlertTriangle className="w-5 h-5 text-amber-600 mb-2" />
                <h4 className="font-semibold text-xs text-slate-900 mb-1">Zero Commercial Guarantee</h4>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  The onboarding fee does not imply or guarantee any ROI, revenue volumes, or minimum turnover. Payments are processed via PCI-DSS compliant payment gateways.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Field Representative Mobile-First Banner (#19 in directive) */}
        <section className="py-8 container mx-auto px-4 sm:px-6 max-w-6xl">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-6 sm:p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center flex-shrink-0">
                <Smartphone className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="text-lg font-bold">On-Ground Field Representative Quick Assist</h4>
                <p className="text-xs text-blue-100 font-light max-w-xl">
                  Field teams can open this portal directly on iPhone, Android, or Tablet devices to onboard prospective partners and investors immediately on the spot.
                </p>
              </div>
            </div>
            <Link
              to="/apply/regional"
              className="px-6 py-3 rounded-xl bg-white text-blue-900 hover:bg-blue-50 font-bold text-xs whitespace-nowrap shadow-md transition-colors"
            >
              Launch Field Application Mode
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default PartnerPortalHub;
