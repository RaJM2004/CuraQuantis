import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, ArrowRight, Globe, Building2, MapPin, Sparkles, Award, LogIn, CheckCircle2 } from 'lucide-react';

export const PartnerEcosystemTeaser: React.FC = () => {
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
      accentGradient: 'from-blue-700 via-indigo-600 to-indigo-900',
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
    <section className="py-20 bg-gradient-to-b from-slate-900 via-blue-950 to-slate-950 text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10 max-w-6xl">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 text-xs font-semibold uppercase tracking-wider mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>National Commercial Expansion</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
              CuraQuantis™ Partner & <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                Franchise Investor Portal
              </span>
            </h2>
          </div>

          <div className="lg:max-w-md">
            <p className="text-slate-300 text-sm font-light leading-relaxed mb-4">
              Our field work has started nationwide. We invite visionary Channel Partners, Regional Leaders, and Franchise Investors to build India’s premier AI-powered clinical diagnostics network.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <a
                href="https://partner.genquantis.com/"
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                <span>Explore Portal Hub & Track</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <span className="text-slate-500">•</span>
              <a
                href="https://partner.genquantis.com/portal/login"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-300 hover:text-cyan-300 transition-colors"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Portal Sign In</span>
              </a>
            </div>
          </div>
        </div>

        {/* 3 Pathway Cards Grid Matching Screenshot */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {pathways.map((p) => (
            <div
              key={p.id}
              className="bg-white rounded-3xl border border-slate-200/90 shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col overflow-hidden group hover:-translate-y-1.5 text-slate-800"
            >
              {/* Card Top Banner */}
              <div className={`p-6 sm:p-7 bg-gradient-to-r ${p.accentGradient} text-white`}>
                <span className={`text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border ${p.badgeColor}`}>
                  {p.badge}
                </span>
                <h3 className="text-xl font-bold mt-4 mb-2 text-white">
                  {p.title}
                </h3>
                <p className="text-xs text-white/90 font-light leading-relaxed">
                  {p.description}
                </p>
              </div>

              {/* Eligibility checklist */}
              <div className="p-6 sm:p-7 flex-grow space-y-6 bg-white">
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
              <div className="p-6 pt-0 bg-white">
                <a
                  href={`https://partner.genquantis.com/apply/${p.id}`}
                  className="w-full py-3.5 px-4 rounded-xl bg-slate-900 hover:bg-blue-600 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-2 shadow-md group-hover:bg-blue-600"
                >
                  <span>{p.cta}</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Territory & Field Assist Bar */}
        <div className="mt-8 bg-slate-800/60 backdrop-blur-md rounded-2xl p-4 sm:p-6 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-3">
            <Globe className="w-5 h-5 text-cyan-400 flex-shrink-0" />
            <span className="text-slate-300">
              Interactive India Territory Selector: Covering all <strong>28 States & 8 Union Territories</strong> with real-time zone mapping.
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="https://partner.genquantis.com/portal/login"
              className="px-4 py-2 rounded-xl border border-white/20 hover:border-cyan-400 text-white font-medium whitespace-nowrap hover:bg-white/10 transition-colors flex items-center gap-2"
            >
              <LogIn className="w-3.5 h-3.5 text-cyan-300" />
              <span>Portal Sign In</span>
            </a>
            <a
              href="https://partner.genquantis.com/"
              className="px-5 py-2 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold whitespace-nowrap shadow-md transition-colors"
            >
              Open National Portal
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnerEcosystemTeaser;
