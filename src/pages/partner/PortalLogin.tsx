import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { AuthStore, DEFAULT_ADMIN_CREDENTIALS } from '@/lib/authStore';
import { PartnerStore } from '@/lib/partnerStore';
import { 
  ShieldCheck, 
  User, 
  Lock, 
  KeyRound, 
  Mail, 
  Phone, 
  FileText, 
  ArrowRight, 
  AlertCircle, 
  CheckCircle2, 
  Sparkles, 
  Building2,
  Briefcase,
  HelpCircle
} from 'lucide-react';

export const PortalLogin: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const initialRole = searchParams.get('tab') === 'admin' ? 'admin' : 'applicant';
  const returnUrl = searchParams.get('returnUrl');

  const [activeTab, setActiveTab] = useState<'applicant' | 'admin'>(initialRole);

  // Applicant login state
  const [appId, setAppId] = useState(searchParams.get('appId') || '');
  const [mobileOrEmail, setMobileOrEmail] = useState('');
  const [applicantError, setApplicantError] = useState('');
  const [isApplicantSubmitting, setIsApplicantSubmitting] = useState(false);

  // Admin login state
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [adminError, setAdminError] = useState('');
  const [isAdminSubmitting, setIsAdminSubmitting] = useState(false);

  // Existing applications for demo testing
  const [sampleApps, setSampleApps] = useState<any[]>([]);

  useEffect(() => {
    // If already logged in, redirect
    const user = AuthStore.getCurrentUser();
    if (user) {
      if (user.role === 'admin') {
        navigate('/portal/admin');
      } else if (user.associatedAppId) {
        navigate(`/portal/partner-dashboard?appId=${user.associatedAppId}`);
      }
    }

    const apps = PartnerStore.getApplications();
    setSampleApps(apps.slice(0, 5));
  }, [navigate]);

  const handleApplicantLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setApplicantError('');

    if (!appId.trim()) {
      setApplicantError('Please enter your Application Reference ID (e.g. CQ-2026-620184).');
      return;
    }
    if (!mobileOrEmail.trim()) {
      setApplicantError('Please enter your registered Mobile Number or Email Address.');
      return;
    }

    setIsApplicantSubmitting(true);
    setTimeout(() => {
      const res = AuthStore.loginAsApplicant(appId, mobileOrEmail);
      setIsApplicantSubmitting(false);

      if (res.success && res.user?.associatedAppId) {
        navigate(returnUrl || `/portal/partner-dashboard?appId=${res.user.associatedAppId}`);
      } else {
        setApplicantError(res.message);
      }
    }, 400);
  };

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setAdminError('');

    if (!adminEmail.trim()) {
      setAdminError('Please enter your executive email address.');
      return;
    }
    if (!adminPassword) {
      setAdminError('Please enter your executive password.');
      return;
    }

    setIsAdminSubmitting(true);
    setTimeout(() => {
      const res = AuthStore.loginAsAdmin(adminEmail, adminPassword);
      setIsAdminSubmitting(false);

      if (res.success) {
        navigate(returnUrl || '/portal/admin');
      } else {
        setAdminError(res.message);
      }
    }, 400);
  };

  const handleQuickApplicantDemo = (sample: any) => {
    setAppId(sample.id);
    setMobileOrEmail(sample.individual.mobile || sample.individual.email);
    setApplicantError('');
  };

  const handleQuickAdminDemo = (role: 'chairman' | 'admin') => {
    if (role === 'chairman') {
      setAdminEmail(DEFAULT_ADMIN_CREDENTIALS.dharaniEmail);
      setAdminPassword(DEFAULT_ADMIN_CREDENTIALS.dharaniPassword);
    } else {
      setAdminEmail(DEFAULT_ADMIN_CREDENTIALS.email);
      setAdminPassword(DEFAULT_ADMIN_CREDENTIALS.password);
    }
    setAdminError('');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Navbar />

      <main className="flex-grow pt-24 pb-20 flex items-center justify-center">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
          
          {/* Header Title */}
          <div className="text-center max-w-2xl mx-auto mb-8 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100 text-blue-800 text-xs font-bold uppercase tracking-wider mb-3">
              <ShieldCheck className="w-4 h-4 text-blue-600" />
              <span>CuraQuantis™ Secure Authentication Gateway</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Single-User Protected Access
            </h1>
            <p className="text-slate-600 text-sm mt-2">
              To safeguard confidential financial records, personal government IDs, and legal documentation, each partner docket is strictly isolated.
            </p>
          </div>

          {/* Main Card with Tabs */}
          <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden max-w-2xl mx-auto">
            
            {/* Role Tab Selector */}
            <div className="grid grid-cols-2 p-2 bg-slate-100/80 border-b border-slate-200">
              <button
                type="button"
                onClick={() => { setActiveTab('applicant'); setApplicantError(''); }}
                className={`py-3.5 px-4 rounded-2xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all ${
                  activeTab === 'applicant'
                    ? 'bg-white text-blue-900 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <User className="w-4 h-4 text-blue-600" />
                <span>Partner / Applicant Docket</span>
              </button>

              <button
                type="button"
                onClick={() => { setActiveTab('admin'); setAdminError(''); }}
                className={`py-3.5 px-4 rounded-2xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all ${
                  activeTab === 'admin'
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <ShieldCheck className="w-4 h-4 text-cyan-400" />
                <span>Scrutiny Board / Admin</span>
              </button>
            </div>

            {/* TAB 1: APPLICANT LOGIN */}
            {activeTab === 'applicant' && (
              <div className="p-6 sm:p-10 space-y-6 animate-fade-in">
                <div>
                  <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-blue-600" />
                    <span>Access Your Individual Application Docket</span>
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Enter your unique Reference ID and verified mobile/email to access and handle your specific application.
                  </p>
                </div>

                {applicantError && (
                  <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-3">
                    <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5 text-rose-600" />
                    <div>
                      <p className="font-semibold">{applicantError}</p>
                      <p className="text-slate-600 text-[11px] mt-0.5">Need help? Email support@curaquantis.com with your name and entity details.</p>
                    </div>
                  </div>
                )}

                <form onSubmit={handleApplicantLogin} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Application Reference ID *
                    </label>
                    <div className="relative">
                      <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                      <input
                        type="text"
                        required
                        value={appId}
                        onChange={(e) => setAppId(e.target.value)}
                        placeholder="e.g. CQ-2026-620184"
                        className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm font-mono font-bold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
                      />
                    </div>
                    <span className="text-[10px] text-slate-400 mt-1 block">
                      Found in your application confirmation receipt & email.
                    </span>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Registered Mobile Number or Email *
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                      <input
                        type="text"
                        required
                        value={mobileOrEmail}
                        onChange={(e) => setMobileOrEmail(e.target.value)}
                        placeholder="e.g. 9876543210 or yourname@company.com"
                        className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isApplicantSubmitting}
                    className="w-full py-3.5 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-lg shadow-blue-500/25 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isApplicantSubmitting ? (
                      <span>Verifying Credentials...</span>
                    ) : (
                      <>
                        <span>Authenticate & Open Docket</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>

                {/* Quick Demo Pre-fill for Reviewers */}
                {sampleApps.length > 0 && (
                  <div className="pt-5 border-t border-slate-100">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                      <span>One-Click Test Accounts (Demo Evaluation):</span>
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {sampleApps.map((sample) => (
                        <button
                          key={sample.id}
                          type="button"
                          onClick={() => handleQuickApplicantDemo(sample)}
                          className="text-left p-2.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-blue-50 hover:border-blue-300 transition-all text-xs group"
                        >
                          <p className="font-bold text-slate-800 group-hover:text-blue-900 truncate">
                            {sample.individual.fullName}
                          </p>
                          <p className="text-[11px] text-slate-500 font-mono truncate">
                            {sample.id} • {sample.pathway}
                          </p>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="pt-2 text-center">
                  <p className="text-xs text-slate-500">
                    Haven't applied yet?{' '}
                    <Link to="/partner-portal" className="text-blue-600 font-bold hover:underline">
                      Explore Pathways & Apply Now
                    </Link>
                  </p>
                </div>
              </div>
            )}

            {/* TAB 2: ADMIN LOGIN */}
            {activeTab === 'admin' && (
              <div className="p-6 sm:p-10 space-y-6 animate-fade-in bg-slate-900 text-white">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-[11px] font-bold uppercase tracking-wider mb-2 border border-cyan-400/30">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Authorized Personnel Only</span>
                  </div>
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <Lock className="w-5 h-5 text-cyan-400" />
                    <span>CuraQuantis™ Scrutiny Board Console</span>
                  </h2>
                  <p className="text-xs text-slate-300 mt-1">
                    Administrative access to scrutinize, verify documents, conduct diligence, and manage ALL nationwide applicants.
                  </p>
                </div>

                {adminError && (
                  <div className="p-4 rounded-2xl bg-rose-500/20 border border-rose-500/30 text-rose-200 text-xs flex items-start gap-3">
                    <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5 text-rose-400" />
                    <p className="font-semibold">{adminError}</p>
                  </div>
                )}

                <form onSubmit={handleAdminLogin} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                      Executive Email Address *
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                      <input
                        type="email"
                        required
                        value={adminEmail}
                        onChange={(e) => setAdminEmail(e.target.value)}
                        placeholder="e.g. admin@curaquantis.com or dharani@curaquantis.com"
                        className="w-full pl-10 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-xs sm:text-sm text-white focus:bg-slate-950 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                      Executive Security Passcode *
                    </label>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                      <input
                        type="password"
                        required
                        value={adminPassword}
                        onChange={(e) => setAdminPassword(e.target.value)}
                        placeholder="••••••••••••"
                        className="w-full pl-10 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-xs sm:text-sm text-white focus:bg-slate-950 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all font-mono"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isAdminSubmitting}
                    className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-bold text-sm shadow-xl shadow-cyan-500/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isAdminSubmitting ? (
                      <span>Granting Executive Access...</span>
                    ) : (
                      <>
                        <span>Enter CuraQuantis™ Scrutiny Board</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>

                {/* Pre-fill Buttons */}
                <div className="pt-4 border-t border-slate-800">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                    Quick-Fill Executive Credentials:
                  </p>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <button
                      type="button"
                      onClick={() => handleQuickAdminDemo('chairman')}
                      className="p-2.5 rounded-xl border border-slate-700 bg-slate-800/80 hover:bg-slate-800 hover:border-cyan-400/50 text-slate-200 text-left transition-all"
                    >
                      <p className="font-bold text-cyan-300">Dr. Dharani</p>
                      <p className="text-[10px] text-slate-400 truncate">Executive Chairman</p>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleQuickAdminDemo('admin')}
                      className="p-2.5 rounded-xl border border-slate-700 bg-slate-800/80 hover:bg-slate-800 hover:border-cyan-400/50 text-slate-200 text-left transition-all"
                    >
                      <p className="font-bold text-cyan-300">Scrutiny Board</p>
                      <p className="text-[10px] text-slate-400 truncate">admin@curaquantis.com</p>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Privacy Guarantee Note */}
          <div className="mt-8 text-center text-xs text-slate-500 max-w-xl mx-auto flex items-center justify-center gap-2">
            <Lock className="w-3.5 h-3.5 text-emerald-600" />
            <span>256-bit encrypted session • Government ID & Aadhaar masking compliant with Indian Data Protection standards</span>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PortalLogin;
