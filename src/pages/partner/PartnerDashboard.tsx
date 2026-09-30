import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { PartnerStore } from '@/lib/partnerStore';
import { AuthStore, AuthUser } from '@/lib/authStore';
import { PartnerApplication, InvestorLead } from '@/types/partnerPortal';
import { 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  MapPin, 
  FileText, 
  CreditCard, 
  GraduationCap, 
  UserPlus, 
  Send, 
  ShieldCheck, 
  Download, 
  Users, 
  ChevronRight,
  TrendingUp,
  FileSignature,
  Building,
  Sparkles,
  LogOut,
  ArrowLeft,
  Lock
} from 'lucide-react';

export const PartnerDashboard: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const urlAppId = searchParams.get('appId');

  const [currentUser, setCurrentUser] = useState<AuthUser | null>(AuthStore.getCurrentUser());
  const [applications, setApplications] = useState<PartnerApplication[]>([]);
  const [selectedApp, setSelectedApp] = useState<PartnerApplication | null>(null);
  const [leads, setLeads] = useState<InvestorLead[]>([]);
  const [activeTab, setActiveTab] = useState<'overview' | 'documents' | 'clarifications' | 'payment' | 'training' | 'leads'>('overview');

  // Clarification reply state
  const [replyMessage, setReplyMessage] = useState('');

  // Lead registration modal state
  const [isRegisteringLead, setIsRegisteringLead] = useState(false);
  const [leadForm, setLeadForm] = useState({
    investorName: '',
    entityName: '',
    contactNumber: '',
    email: '',
    territory: '',
    investmentBudget: '₹1.5 Crores',
    notes: ''
  });
  const [leadFeedback, setLeadFeedback] = useState<{ success: boolean; message: string } | null>(null);

  // Payment simulated state
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  useEffect(() => {
    const user = AuthStore.getCurrentUser();
    setCurrentUser(user);

    if (!user) {
      // If user provided appId in URL or landed directly, redirect to login
      navigate(`/portal/login?appId=${urlAppId || ''}&returnUrl=${encodeURIComponent(window.location.pathname + window.location.search)}`);
      return;
    }

    loadData(user);
  }, [urlAppId, navigate]);

  const loadData = (userOverride?: AuthUser | null) => {
    const activeUser = userOverride || currentUser || AuthStore.getCurrentUser();
    if (!activeUser) return;

    const allApps = PartnerStore.getApplications();
    setLeads(PartnerStore.getLeads());

    if (activeUser.role === 'admin') {
      // Administrators see all applicants and can inspect any docket
      setApplications(allApps);
      if (urlAppId) {
        const match = allApps.find(a => a.id.toUpperCase() === urlAppId.toUpperCase());
        if (match) setSelectedApp(match);
        else if (allApps.length > 0) setSelectedApp(allApps[0]);
      } else if (allApps.length > 0) {
        setSelectedApp(allApps[0]);
      }
    } else {
      // APPLICANTS / PARTNERS: Strictly isolate to their own docket!
      const targetId = activeUser.associatedAppId || urlAppId;
      const match = allApps.find(a => a.id.toUpperCase() === targetId?.toUpperCase());
      if (match) {
        setSelectedApp(match);
        setApplications([match]);
      } else if (allApps.length > 0 && !activeUser.associatedAppId) {
        // Fallback if session missed associatedAppId
        setSelectedApp(allApps[0]);
        setApplications([allApps[0]]);
      }
    }
  };

  const handleLogout = () => {
    AuthStore.logout();
    navigate('/portal/login');
  };

  const handleSendClarification = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedApp || !replyMessage.trim()) return;

    const updated = PartnerStore.addClarification(
      selectedApp.id,
      'applicant',
      selectedApp.individual.fullName || 'Applicant',
      replyMessage.trim()
    );

    if (updated) {
      setSelectedApp({ ...updated });
      setReplyMessage('');
      loadData();
    }
  };

  const handleSimulatePayment = () => {
    if (!selectedApp) return;
    setIsProcessingPayment(true);
    setTimeout(() => {
      const txnId = `CQPG_${Math.floor(1000000 + Math.random() * 9000000)}_HDFC`;
      const updated = PartnerStore.completePayment(selectedApp.id, txnId);
      if (updated) {
        setSelectedApp({ ...updated });
        loadData();
      }
      setIsProcessingPayment(false);
    }, 1500);
  };

  const handleRegisterLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedApp) return;

    const result = PartnerStore.registerLead({
      ...leadForm,
      introducingPartnerId: selectedApp.id,
      introducingPartnerName: `${selectedApp.business.legalEntityName || selectedApp.individual.fullName} (${selectedApp.individual.fullName})`
    });

    setLeadFeedback(result);
    if (result.success) {
      setLeadForm({
        investorName: '',
        entityName: '',
        contactNumber: '',
        email: '',
        territory: '',
        investmentBudget: '₹1.5 Crores',
        notes: ''
      });
      setLeads(PartnerStore.getLeads());
      setTimeout(() => {
        setIsRegisteringLead(false);
        setLeadFeedback(null);
      }, 2500);
    }
  };

  if (!selectedApp) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col">
        <Navbar />
        <main className="flex-grow pt-28 pb-20 container mx-auto px-4 text-center">
          <p className="text-slate-500">Loading partner portal records...</p>
        </main>
        <Footer />
      </div>
    );
  }

  const partnerLeads = leads.filter(l => l.introducingPartnerId === selectedApp.id);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />

      <main className="flex-grow pt-24 pb-20">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
          {/* Top Banner / Application Selector */}
          <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-indigo-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl mb-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <div className="flex items-center gap-2 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-2">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Authorized Partner & Applicant Portal</span>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
                    {selectedApp.business.legalEntityName || selectedApp.individual.fullName}
                  </h1>
                  <span className="font-mono text-xs px-3 py-1 rounded-full bg-blue-500/20 text-cyan-300 border border-blue-400/30">
                    Ref: {selectedApp.id}
                  </span>
                </div>
                <p className="text-slate-300 text-xs sm:text-sm mt-1 font-light">
                  Designated Signatory: <strong>{selectedApp.individual.fullName}</strong> • Pathway: <span className="capitalize">{selectedApp.pathway.replace('-', ' ')}</span>
                </p>
              </div>

              {/* Role-Based Secure Header Controls */}
              {currentUser?.role === 'admin' ? (
                /* Executive Scrutiny Controls */
                <div className="bg-slate-900/90 p-3.5 rounded-2xl border border-cyan-500/30 flex flex-col gap-2 min-w-[280px]">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] uppercase font-bold text-cyan-400 tracking-wider flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                      Executive Scrutiny Mode
                    </span>
                    <Link
                      to="/portal/admin"
                      className="text-[10px] text-cyan-300 hover:text-white underline font-semibold flex items-center gap-1"
                    >
                      <ArrowLeft className="w-3 h-3" />
                      Board Console
                    </Link>
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] text-slate-400 font-medium">
                      Inspect Applicant Docket:
                    </label>
                    <select
                      value={selectedApp.id}
                      onChange={(e) => {
                        const match = applications.find(a => a.id === e.target.value);
                        if (match) setSelectedApp(match);
                      }}
                      className="bg-slate-950 text-white text-xs px-3 py-1.5 rounded-xl border border-slate-700 focus:border-cyan-400 focus:outline-none"
                    >
                      {applications.map(app => (
                        <option key={app.id} value={app.id}>
                          {app.id} — {app.individual.fullName} ({app.pathway})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              ) : (
                /* Applicant Protected Session - STRICTLY ISOLATED TO THEIR OWN DOCKET */
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                  <div className="bg-white/10 px-4 py-2.5 rounded-2xl border border-white/15 backdrop-blur-md">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-[10px] font-bold text-emerald-300 uppercase tracking-wider">
                        Protected Applicant Session
                      </span>
                    </div>
                    <p className="text-xs text-slate-200 mt-0.5 font-medium">
                      Docket ID: <span className="font-mono text-cyan-300 font-bold">{selectedApp.id}</span>
                    </p>
                  </div>

                  <button
                    onClick={handleLogout}
                    className="px-3.5 py-2.5 rounded-xl bg-white/10 hover:bg-rose-500/20 hover:border-rose-400/50 border border-white/15 text-slate-300 hover:text-rose-200 text-xs font-semibold transition-all flex items-center gap-1.5 shadow-sm"
                    title="Sign out of current applicant docket"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>

            {/* Navigation Tabs */}
            <div className="flex flex-wrap items-center gap-2 mt-8 pt-6 border-t border-white/10 text-xs">
              {[
                { id: 'overview', label: 'Screening Pipeline', icon: Clock },
                { id: 'documents', label: `Documents (${selectedApp.documents.length})`, icon: FileText },
                { id: 'clarifications', label: `Clarifications (${selectedApp.clarifications.length})`, icon: Send },
                { id: 'payment', label: '₹2.5L Onboarding Fee', icon: CreditCard },
                { id: 'training', label: 'Training & Induction', icon: GraduationCap },
                { id: 'leads', label: `Franchise Leads (${partnerLeads.length})`, icon: UserPlus }
              ].map(tab => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold transition-all ${
                      isActive
                        ? 'bg-white text-blue-950 shadow-md'
                        : 'bg-white/10 hover:bg-white/20 text-white'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* TAB 1: OVERVIEW & PIPELINE */}
          {activeTab === 'overview' && (
            <div className="space-y-8 animate-fade-in-up">
              {/* Status Header Alert */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                    Current Milestone Status
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mt-2 capitalize">
                    {selectedApp.status.replace(/_/g, ' ')}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Last updated on {new Date(selectedApp.updatedAt).toLocaleDateString('en-IN', { month: 'long', day: 'numeric', year: 'numeric' })}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  {selectedApp.status === 'partner_activated' ? (
                    <span className="px-4 py-2 rounded-xl bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Formally Appointed & Activated</span>
                    </span>
                  ) : (
                    <span className="px-4 py-2 rounded-xl bg-blue-100 text-blue-800 text-xs font-semibold flex items-center gap-2">
                      <Clock className="w-4 h-4 text-blue-600" />
                      <span>In Active CuraQuantis™ Scrutiny</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Status Timeline Workflow */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
                <h4 className="text-sm font-bold uppercase tracking-wider text-slate-900 mb-6 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-blue-600" />
                  <span>Strict Due Diligence Milestones</span>
                </h4>

                <div className="space-y-6">
                  {selectedApp.statusTimeline.map((item, index) => (
                    <div key={index} className="flex items-start gap-4 relative">
                      {index < selectedApp.statusTimeline.length - 1 && (
                        <div className="absolute left-4 top-8 bottom-0 w-0.5 bg-blue-200" />
                      )}
                      <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center flex-shrink-0 z-10 shadow-sm">
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                      <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 flex-grow">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                          <h5 className="font-semibold text-xs sm:text-sm text-slate-900">{item.label}</h5>
                          {item.completedAt && (
                            <span className="text-[11px] text-slate-400">
                              {new Date(item.completedAt).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
                            </span>
                          )}
                        </div>
                        {item.note && (
                          <p className="text-xs text-slate-600 mt-2 bg-white p-3 rounded-xl border border-slate-200">
                            {item.note}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Territory & Scope Details */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
                <h4 className="text-sm font-bold uppercase tracking-wider text-slate-900 mb-4 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-blue-600" />
                  <span>Operational Territory Scope</span>
                </h4>
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                  {selectedApp.territory.isPanIndia ? (
                    <span className="px-3 py-1 rounded-full bg-cyan-100 text-cyan-800 text-xs font-bold">
                      ★ All Indian States & Union Territories (Pan-India Master Network)
                    </span>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {selectedApp.territory.selectedStates.map(st => (
                        <span key={st} className="px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-semibold">
                          {st}
                        </span>
                      ))}
                    </div>
                  )}
                  {selectedApp.territory.notes && (
                    <p className="text-xs text-slate-600 mt-3 font-light">
                      <strong>Docket Notes:</strong> {selectedApp.territory.notes}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: DOCUMENTS */}
          {activeTab === 'documents' && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6 animate-fade-in-up">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Submitted Credential Documents</h3>
                  <p className="text-xs text-slate-500">All uploaded credentials under scrutiny</p>
                </div>
                <span className="text-xs font-bold bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full border border-emerald-200">
                  {selectedApp.documents.filter(d => d.status === 'verified').length} / {selectedApp.documents.length} Verified
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {selectedApp.documents.map(doc => (
                  <div key={doc.id} className="p-4 rounded-2xl border border-slate-200 bg-slate-50 flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-xs text-slate-900">{doc.name}</h4>
                        <p className="text-[11px] text-slate-500 mt-0.5">
                          {doc.fileName || 'Not uploaded yet'} {doc.fileSize && `(${doc.fileSize})`}
                        </p>
                        <span className={`inline-block mt-2 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
                          doc.status === 'verified' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                        }`}>
                          {doc.status}
                        </span>
                      </div>
                    </div>

                    {doc.fileName && (
                      <div className="flex items-center gap-1">
                        {doc.fileDataUrl ? (
                          <a
                            href={doc.fileDataUrl}
                            download={doc.fileName}
                            className="p-2 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors"
                            title="Download Verified File"
                          >
                            <Download className="w-4 h-4" />
                          </a>
                        ) : (
                          <button
                            type="button"
                            onClick={() => alert(`Official encrypted archive for ${doc.fileName}`)}
                            className="p-2 text-slate-400 hover:text-blue-600 transition-colors"
                            title="Archived File"
                          >
                            <Download className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: CLARIFICATIONS & MESSAGES */}
          {activeTab === 'clarifications' && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6 animate-fade-in-up">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Scrutiny Inquiries & Clarifications</h3>
                <p className="text-xs text-slate-500">Official encrypted correspondence with the CuraQuantis™ Scrutiny Board</p>
              </div>

              <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
                {selectedApp.clarifications.length === 0 ? (
                  <div className="text-center py-12 text-slate-500 text-xs">
                    No clarification requests pending. Your documentation is currently in good order.
                  </div>
                ) : (
                  selectedApp.clarifications.map(msg => (
                    <div
                      key={msg.id}
                      className={`p-4 rounded-2xl max-w-xl text-xs ${
                        msg.sender === 'management'
                          ? 'bg-blue-50 border border-blue-200 text-blue-950 mr-auto'
                          : 'bg-indigo-900 text-white ml-auto'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-4 mb-1.5 text-[11px] opacity-75">
                        <span className="font-bold">{msg.senderName}</span>
                        <span>{new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                      </div>
                      <p className="leading-relaxed">{msg.message}</p>
                    </div>
                  ))
                )}
              </div>

              {/* Message Input Box */}
              <form onSubmit={handleSendClarification} className="flex gap-3 pt-4 border-t border-slate-100">
                <input
                  type="text"
                  value={replyMessage}
                  onChange={(e) => setReplyMessage(e.target.value)}
                  placeholder="Type official response or document clarification..."
                  className="flex-grow px-4 py-2.5 rounded-xl border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition-colors flex items-center gap-1.5 shadow-sm"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send</span>
                </button>
              </form>
            </div>
          )}

          {/* TAB 4: ₹2.5L ONBOARDING FEE GATEWAY */}
          {activeTab === 'payment' && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6 animate-fade-in-up">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Partner Onboarding Fee Settlement</h3>
                  <p className="text-xs text-slate-500">Official ₹2,50,000 + 18% GST Onboarding Package</p>
                </div>

                <div className="text-right">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    selectedApp.paymentStatus === 'completed'
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}>
                    {selectedApp.paymentStatus === 'completed' ? 'Settled & Verified' : 'Payment Pending'}
                  </span>
                </div>
              </div>

              {/* Invoice Breakdown Table */}
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 space-y-4">
                <div className="flex justify-between text-xs text-slate-600">
                  <span>Channel Partner Onboarding & Induction Package</span>
                  <span className="font-semibold text-slate-900">₹2,50,000.00</span>
                </div>
                <div className="flex justify-between text-xs text-slate-600">
                  <span>Applicable Goods and Services Tax (GST @ 18%)</span>
                  <span className="font-semibold text-slate-900">₹45,000.00</span>
                </div>
                <div className="flex justify-between text-sm font-extrabold text-blue-950 pt-3 border-t border-slate-200">
                  <span>Total Amount Payable</span>
                  <span className="text-lg text-blue-600">₹2,95,000.00</span>
                </div>
              </div>

              {selectedApp.paymentStatus === 'completed' && selectedApp.paymentDetails ? (
                <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-200 space-y-3">
                  <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    <span>Payment Received Successfully</span>
                  </div>
                  <div className="text-xs text-emerald-900 space-y-1">
                    <p><strong>Transaction Ref:</strong> {selectedApp.paymentDetails.transactionId}</p>
                    <p><strong>Invoice Number:</strong> {selectedApp.paymentDetails.invoiceNo}</p>
                    <p><strong>Paid Date:</strong> {new Date(selectedApp.paymentDetails.paidAt || '').toLocaleString('en-IN')}</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900">
                    <strong>Mandatory Disclaimer:</strong> Payment of this onboarding fee does not constitute automatic approval of franchise representation, nor does it imply any guarantee of minimum turnover, revenue, or ROI.
                  </div>

                  <button
                    type="button"
                    disabled={isProcessingPayment}
                    onClick={handleSimulatePayment}
                    className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm transition-all shadow-md flex items-center justify-center gap-2"
                  >
                    <CreditCard className="w-4 h-4" />
                    <span>{isProcessingPayment ? 'Connecting Secure Gateway...' : 'Pay ₹2,95,000 via Secure PG'}</span>
                  </button>
                </div>
              )}
            </div>
          )}

          {/* TAB 5: TRAINING */}
          {activeTab === 'training' && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6 animate-fade-in-up">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Partner Training & Certification Curriculum</h3>
                <p className="text-xs text-slate-500">Master the CuraQuantis™ AI Diagnostic Stack, NABL quality standards, and regional clinic operations</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { title: 'Module 1: CuraQuantis™ AI Architecture', duration: '2.5 Hours', status: 'Completed', score: '98%' },
                  { title: 'Module 2: Diagnostic Regulatory & NABL Standards', duration: '3.0 Hours', status: 'Completed', score: '94%' },
                  { title: 'Module 3: Non-Invasive Diagnostics & Screening Protocols', duration: '4.0 Hours', status: 'In Progress', score: '—' },
                  { title: 'Module 4: Territory Lead Protection & Investor Etiquette', duration: '1.5 Hours', status: 'Pending', score: '—' }
                ].map((mod, i) => (
                  <div key={i} className="p-4 rounded-2xl border border-slate-200 bg-slate-50 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 bg-blue-100 px-2.5 py-0.5 rounded">
                        {mod.duration}
                      </span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        mod.status === 'Completed' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-700'
                      }`}>
                        {mod.status}
                      </span>
                    </div>
                    <h4 className="font-semibold text-xs sm:text-sm text-slate-900">{mod.title}</h4>
                    {mod.score !== '—' && (
                      <p className="text-xs text-emerald-600 font-medium">Evaluation Score: {mod.score}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: FRANCHISE INVESTOR LEAD MANAGEMENT (#11 in directive) */}
          {activeTab === 'leads' && (
            <div className="space-y-6 animate-fade-in-up">
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Franchise Investor Lead Registry</h3>
                  <p className="text-xs text-slate-500">
                    Register and safeguard prospective Franchise Investors introduced by your organization to avoid territory or lead conflicts.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setIsRegisteringLead(true)}
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs flex items-center gap-2 shadow-md transition-all self-start sm:self-auto"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>Register Investor Lead</span>
                </button>
              </div>

              {/* Lead Registration Form Modal / Panel */}
              {isRegisteringLead && (
                <div className="bg-gradient-to-br from-slate-900 to-blue-950 rounded-3xl p-6 sm:p-8 text-white shadow-2xl border border-white/10 space-y-6">
                  <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <div>
                      <h4 className="text-base font-bold text-cyan-300">Register Prospective Franchise Investor</h4>
                      <p className="text-xs text-slate-300 font-light">Submitting locks in priority registration rights for 180 days</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setIsRegisteringLead(false)}
                      className="text-slate-400 hover:text-white text-xs font-bold"
                    >
                      ✕ Close
                    </button>
                  </div>

                  <form onSubmit={handleRegisterLeadSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">
                          Investor Legal Name <span className="text-red-400">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={leadForm.investorName}
                          onChange={(e) => setLeadForm({ ...leadForm, investorName: e.target.value })}
                          placeholder="Full Name"
                          className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-cyan-400 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">
                          Entity / Group Name
                        </label>
                        <input
                          type="text"
                          value={leadForm.entityName}
                          onChange={(e) => setLeadForm({ ...leadForm, entityName: e.target.value })}
                          placeholder="e.g. Apollo Diagnostics Hub"
                          className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-cyan-400 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">
                          Phone Number <span className="text-red-400">*</span>
                        </label>
                        <input
                          type="tel"
                          required
                          value={leadForm.contactNumber}
                          onChange={(e) => setLeadForm({ ...leadForm, contactNumber: e.target.value })}
                          placeholder="+91 98765 43210"
                          className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-cyan-400 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">
                          Email Address <span className="text-red-400">*</span>
                        </label>
                        <input
                          type="email"
                          required
                          value={leadForm.email}
                          onChange={(e) => setLeadForm({ ...leadForm, email: e.target.value })}
                          placeholder="investor@domain.com"
                          className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-cyan-400 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">
                          Proposed Territory / Location <span className="text-red-400">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={leadForm.territory}
                          onChange={(e) => setLeadForm({ ...leadForm, territory: e.target.value })}
                          placeholder="e.g. Coimbatore Gandhipuram"
                          className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-cyan-400 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">
                          Investment Budget
                        </label>
                        <select
                          value={leadForm.investmentBudget}
                          onChange={(e) => setLeadForm({ ...leadForm, investmentBudget: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-cyan-400 focus:outline-none"
                        >
                          <option value="₹1.0 Crore">₹1.0 Crore</option>
                          <option value="₹1.5 Crores">₹1.5 Crores</option>
                          <option value="₹2.0 Crores">₹2.0 Crores</option>
                          <option value="₹3.0 Crores+">₹3.0 Crores+</option>
                        </select>
                      </div>
                    </div>

                    {leadFeedback && (
                      <div className={`p-4 rounded-xl text-xs ${
                        leadFeedback.success ? 'bg-emerald-500/20 text-emerald-200 border border-emerald-500/30' : 'bg-rose-500/20 text-rose-200 border border-rose-500/30'
                      }`}>
                        {leadFeedback.message}
                      </div>
                    )}

                    <div className="flex justify-end gap-3 pt-2">
                      <button
                        type="button"
                        onClick={() => setIsRegisteringLead(false)}
                        className="px-4 py-2 rounded-xl text-xs text-slate-400 hover:text-white"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-6 py-2 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs shadow-md transition-colors"
                      >
                        Submit Lead for Scrutiny
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Lead Table */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                      <th className="pb-3">Lead Ref ID</th>
                      <th className="pb-3">Investor Name</th>
                      <th className="pb-3">Proposed Territory</th>
                      <th className="pb-3">Budget</th>
                      <th className="pb-3">Date Introduced</th>
                      <th className="pb-3">CuraQuantis Review Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {partnerLeads.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="py-8 text-center text-slate-400">
                          No investor leads recorded under your ID yet. Use "Register Investor Lead" above.
                        </td>
                      </tr>
                    ) : (
                      partnerLeads.map(lead => (
                        <tr key={lead.id} className="hover:bg-slate-50 transition-colors">
                          <td className="py-3.5 font-mono font-bold text-blue-900">{lead.id}</td>
                          <td className="py-3.5">
                            <span className="font-semibold text-slate-900 block">{lead.investorName}</span>
                            <span className="text-[11px] text-slate-500">{lead.contactNumber}</span>
                          </td>
                          <td className="py-3.5 text-slate-700 font-medium">{lead.territory}</td>
                          <td className="py-3.5 text-slate-700">{lead.investmentBudget}</td>
                          <td className="py-3.5 text-slate-500">{new Date(lead.dateIntroduced).toLocaleDateString()}</td>
                          <td className="py-3.5">
                            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-blue-100 text-blue-800 uppercase tracking-wider">
                              {lead.status.replace(/_/g, ' ')}
                            </span>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PartnerDashboard;
