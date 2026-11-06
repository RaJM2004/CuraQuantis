import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, ArrowRight, Globe, Building2, MapPin, Sparkles, Award } from 'lucide-react';

export const PartnerEcosystemTeaser: React.FC = () => {
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
            <Link
              to="/partner-portal"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              <span>Explore Portal Hub & Track Applications</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* 3 Pathway Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="bg-white/5 border border-white/10 hover:border-cyan-400/40 rounded-3xl p-6 transition-all duration-300 hover:-translate-y-1 hover:bg-white/10 flex flex-col justify-between group">
            <div>
              <div className="w-10 h-10 rounded-2xl bg-indigo-500/20 text-indigo-300 flex items-center justify-center font-bold text-xs mb-4 border border-indigo-500/30">
                01
              </div>
              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                Pan-India Channel Partner
              </h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed mb-4">
                Master national distribution across multiple zones. Orchestrate enterprise healthcare integration and regional partner networks.
              </p>
            </div>
            <Link
              to="/apply/pan-india"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-300 hover:text-white transition-colors pt-4 border-t border-white/10"
            >
              <span>Apply Pan-India Tier</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Card 2 */}
          <div className="bg-white/5 border border-white/10 hover:border-cyan-400/40 rounded-3xl p-6 transition-all duration-300 hover:-translate-y-1 hover:bg-white/10 flex flex-col justify-between group">
            <div>
              <div className="w-10 h-10 rounded-2xl bg-cyan-500/20 text-cyan-300 flex items-center justify-center font-bold text-xs mb-4 border border-cyan-500/30">
                02
              </div>
              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                Regional Channel Partner
              </h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed mb-4">
                Lead clinical diagnostics deployment across specific States or UTs. Build local doctor networks and forward qualified franchise leads.
              </p>
            </div>
            <Link
              to="/apply/regional"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-300 hover:text-white transition-colors pt-4 border-t border-white/10"
            >
              <span>Apply Regional Tier</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Card 3 */}
          <div className="bg-white/5 border border-white/10 hover:border-cyan-400/40 rounded-3xl p-6 transition-all duration-300 hover:-translate-y-1 hover:bg-white/10 flex flex-col justify-between group">
            <div>
              <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-300 flex items-center justify-center font-bold text-xs mb-4 border border-amber-500/30">
                03
              </div>
              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                Franchise Investor
              </h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed mb-4">
                Own and operate a cutting-edge CuraQuantis™ AI Diagnostic & Smart Clinic center equipped with automated preventive screening.
              </p>
            </div>
            <Link
              to="/apply/franchise"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-300 hover:text-white transition-colors pt-4 border-t border-white/10"
            >
              <span>Apply Franchise Center</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Territory & Field Assist Bar */}
        <div className="mt-8 bg-slate-800/60 backdrop-blur-md rounded-2xl p-4 sm:p-6 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-3">
            <Globe className="w-5 h-5 text-cyan-400 flex-shrink-0" />
            <span className="text-slate-300">
              Interactive India Territory Selector: Covering all <strong>28 States & 8 Union Territories</strong> with real-time zone mapping.
            </span>
          </div>

          <Link
            to="/partner-portal"
            className="px-5 py-2 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold whitespace-nowrap shadow-md transition-colors"
          >
            Open National Portal
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PartnerEcosystemTeaser;
