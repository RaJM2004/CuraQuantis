import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { PartnerStore } from '@/lib/partnerStore';
import { AuthStore, AuthUser } from '@/lib/authStore';
import { PartnerApplication, InvestorLead, OFFICIAL_BANK_DETAILS } from '@/types/partnerPortal';
import { DocumentVault } from '@/lib/documentStorage';
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
  Lock,
  Eye,
  UploadCloud,
  AlertTriangle,
  ZoomIn,
  ZoomOut,
  RotateCw,
  Maximize2,
  ExternalLink,
  Check,
  RefreshCw,
  Loader2,
  Copy,
  Landmark,
  PhoneCall
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

  // Official Bank Details & Manual Payment Submission State
  const [utrNumber, setUtrNumber] = useState('');
  const [paymentMode, setPaymentMode] = useState('NEFT');
  const [payerName, setPayerName] = useState('');
  const [payerBank, setPayerBank] = useState('');
  const [paymentProofFile, setPaymentProofFile] = useState<{ name: string; dataUrl: string } | null>(null);
  const [isSubmittingPayment, setIsSubmittingPayment] = useState(false);
  const [paymentSubmitSuccess, setPaymentSubmitSuccess] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [isEditingPayment, setIsEditingPayment] = useState(false);

  // Document Inspection & Re-upload State
  const [previewDoc, setPreviewDoc] = useState<{
    id: string;
    name: string;
    fileName: string;
    fileSize?: string;
    uploadedAt?: string;
    fileDataUrl?: string;
    mimeType?: string;
    status: string;
    rejectionReason?: string;
  } | null>(null);
  const [loadingDocId, setLoadingDocId] = useState<string | null>(null);
  const [imgZoom, setImgZoom] = useState<number>(1);
  const [imgRotation, setImgRotation] = useState<number>(0);
  const [reuploadingDocId, setReuploadingDocId] = useState<string | null>(null);
  const [docFeedback, setDocFeedback] = useState<string>('');

  const handlePreviewDocument = async (doc: any) => {
    setLoadingDocId(doc.id);
    setImgZoom(1);
    setImgRotation(0);

    let dataUrl = doc.fileDataUrl;
    let mime = doc.mimeType;

    // Fetch from MongoDB if not in memory
    if (!dataUrl && selectedApp) {
      try {
        const fullApp = await PartnerStore.fetchApplicationByIdFromMongoDB(selectedApp.id);
        if (fullApp) {
          const remoteDoc = (fullApp.documents || []).find(d => d.id === doc.id);
          if (remoteDoc?.fileDataUrl) {
            dataUrl = remoteDoc.fileDataUrl;
            mime = remoteDoc.mimeType || mime;
          }
        }
      } catch (e) {
        console.warn('Could not read from MongoDB endpoint', e);
      }
    }

    // Check DocumentVault
    if (!dataUrl && selectedApp) {
      try {
        const cached = await DocumentVault.findDocument([
          `${selectedApp.id}_${doc.id}`,
          doc.id,
          doc.fileName,
          doc.name
        ]);
        if (cached?.fileDataUrl) {
          dataUrl = cached.fileDataUrl;
          mime = cached.mimeType || mime;
        }
      } catch (e) {
        console.warn('Could not read from vault', e);
      }
    }

    setLoadingDocId(null);
    setPreviewDoc({
      id: doc.id,
      name: doc.name,
      fileName: doc.fileName || `${doc.name.replace(/[^a-zA-Z0-9]/g, '_')}.pdf`,
      fileSize: doc.fileSize || 'Attached File',
      uploadedAt: doc.uploadedAt || new Date().toISOString().split('T')[0],
      fileDataUrl: dataUrl,
      mimeType: mime,
      status: doc.status || 'pending',
      rejectionReason: doc.rejectionReason
    });
  };

  const handleReuploadFile = (docId: string, file: File) => {
    if (!selectedApp) return;

    // 1. Strict File Type Restriction: ONLY PDF or Images allowed
    const isImage = file.type.startsWith('image/') || /\.(png|jpe?g|webp)$/i.test(file.name);
    const isPdf = file.type === 'application/pdf' || /\.pdf$/i.test(file.name);

    if (!isImage && !isPdf) {
      alert(`Invalid file format: "${file.name}".\n\nOnly official PDF documents and images (PNG, JPG, JPEG, WEBP) are accepted for regulatory verification. Word, PowerPoint, or other formats are not permitted.`);
      return;
    }

    // 2. File size limit: 12MB max
    if (file.size > 12 * 1024 * 1024) {
      alert(`File "${file.name}" is too large (${(file.size / (1024 * 1024)).toFixed(1)} MB).\n\nPlease upload a file under 12MB.`);
      return;
    }

    setReuploadingDocId(docId);
    const sizeInMB = file.size / (1024 * 1024);
    const formattedSize = sizeInMB >= 1 
      ? `${sizeInMB.toFixed(1)} MB` 
      : `${Math.max(1, Math.round(file.size / 1024))} KB`;

    const reader = new FileReader();
    reader.onload = async () => {
      const dataUrl = reader.result as string;

      // Save to DocumentVault
      await DocumentVault.saveDocument(`${selectedApp.id}_${docId}`, { fileName: file.name, fileDataUrl: dataUrl, mimeType: file.type });
      await DocumentVault.saveDocument(docId, { fileName: file.name, fileDataUrl: dataUrl, mimeType: file.type });
      await DocumentVault.saveDocument(file.name, { fileName: file.name, fileDataUrl: dataUrl, mimeType: file.type });

      // Update document list
      const targetDoc = selectedApp.documents.find(d => d.id === docId);
      const docName = targetDoc?.name || 'Document';

      const updatedDocs = selectedApp.documents.map(d => {
        if (d.id === docId) {
          return {
            ...d,
            fileName: file.name,
            fileSize: formattedSize,
            uploadedAt: new Date().toISOString().split('T')[0],
            status: 'pending' as const,
            fileDataUrl: dataUrl,
            mimeType: file.type,
            rejectionReason: undefined // Clear previous rejection
          };
        }
        return d;
      });

      const newAudit = {
        id: `log-${Date.now()}`,
        timestamp: new Date().toISOString(),
        action: 'Document Re-uploaded',
        performedBy: selectedApp.individual.fullName || 'Applicant',
        details: `Replaced document for "${docName}" with new file: ${file.name} (${formattedSize}). Status reset to pending for re-scrutiny.`
      };

      const updatedApp: PartnerApplication = {
        ...selectedApp,
        documents: updatedDocs,
        auditLogs: [newAudit, ...(selectedApp.auditLogs || [])],
        updatedAt: new Date().toISOString()
      };

      setSelectedApp(updatedApp);
      setApplications(prev => prev.map(a => a.id === updatedApp.id ? updatedApp : a));

      // Asynchronously persist to MongoDB Atlas & LocalStore
      await PartnerStore.saveApplicationAsync(updatedApp);

      setReuploadingDocId(null);
      setDocFeedback(`Document "${file.name}" uploaded successfully! Sent for compliance re-scrutiny.`);
      setTimeout(() => setDocFeedback(''), 5000);
    };

    reader.readAsDataURL(file);
  };

  useEffect(() => {
    const user = AuthStore.getCurrentUser();
    setCurrentUser(user);

    if (!user) {
      // If user provided appId in URL or landed directly, redirect to login
      navigate(`/portal/login?appId=${urlAppId || ''}&returnUrl=${encodeURIComponent(window.location.pathname + window.location.search)}`);
      return;
    }

    loadData(user);

    // Asynchronously synchronize with MongoDB Atlas
    PartnerStore.fetchFromMongoDB().then(() => loadData(user));
    PartnerStore.fetchLeadsFromMongoDB().then((remoteLeads) => {
      if (remoteLeads && remoteLeads.length > 0) {
        setLeads(remoteLeads);
      }
    });
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

  useEffect(() => {
    if (selectedApp) {
      if (!payerName) {
        setPayerName(selectedApp.individual.fullName || selectedApp.business.legalEntityName || '');
      }
      if (selectedApp.paymentDetails?.utrNumber) {
        setUtrNumber(selectedApp.paymentDetails.utrNumber);
      }
      if (selectedApp.paymentDetails?.paymentMode) {
        setPaymentMode(selectedApp.paymentDetails.paymentMode);
      }
    }
  }, [selectedApp]);

  const handleCopyText = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handlePaymentProofFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      alert('File size exceeds 10MB limit. Please upload a smaller receipt image or PDF.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setPaymentProofFile({
        name: file.name,
        dataUrl: reader.result as string
      });
    };
    reader.readAsDataURL(file);
  };

  const handleSubmitPaymentProof = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedApp) return;

    if (!utrNumber.trim()) {
      alert('Please enter your Bank Transfer Reference / UTR Number.');
      return;
    }

    setIsSubmittingPayment(true);
    setTimeout(() => {
      const updated = PartnerStore.submitPaymentProof(selectedApp.id, {
        utrNumber: utrNumber.trim(),
        paymentMode,
        payerName: payerName.trim() || selectedApp.individual.fullName || selectedApp.business.legalEntityName || 'Applicant',
        payerBank: payerBank.trim(),
        paymentProofUrl: paymentProofFile?.dataUrl,
        paymentProofName: paymentProofFile?.name
      });

      if (updated) {
        setSelectedApp({ ...updated });
        setIsEditingPayment(false);
        setPaymentSubmitSuccess(true);
        loadData();
      }
      setIsSubmittingPayment(false);
    }, 600);
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
                { 
                  id: 'payment', 
                  label: selectedApp.paymentStatus === 'submitted' 
                    ? 'Payment (Verifying...)' 
                    : selectedApp.paymentStatus === 'completed' 
                      ? 'Payment (Settled ✓)' 
                      : selectedApp.paymentStatus === 'rejected'
                        ? 'Payment (Flagged !)'
                        : '₹2.5L Onboarding Fee', 
                  icon: CreditCard 
                },
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
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Submitted Credential Documents</h3>
                  <p className="text-xs text-slate-500">Official onboarding dossier under regulatory scrutiny (PDF and Images only)</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full border border-emerald-200">
                    {selectedApp.documents.filter(d => d.status === 'verified').length} / {selectedApp.documents.length} Verified
                  </span>
                  {selectedApp.documents.some(d => d.status === 'rejected') && (
                    <span className="text-xs font-bold bg-rose-50 text-rose-700 px-3 py-1 rounded-full border border-rose-200 flex items-center gap-1">
                      <AlertTriangle className="w-3.5 h-3.5" /> Action Required
                    </span>
                  )}
                </div>
              </div>

              {docFeedback && (
                <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 font-semibold flex items-center gap-2 animate-fade-in">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>{docFeedback}</span>
                </div>
              )}

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {selectedApp.documents.map(doc => {
                  const isRejected = doc.status === 'rejected';
                  const isVerified = doc.status === 'verified';
                  const isPending = doc.status === 'pending';
                  const isReuploading = reuploadingDocId === doc.id;

                  return (
                    <div 
                      key={doc.id} 
                      className={`p-5 rounded-2xl border transition-all flex flex-col justify-between ${
                        isRejected 
                          ? 'border-rose-300 bg-rose-50/40 ring-1 ring-rose-200' 
                          : isVerified
                          ? 'border-emerald-200 bg-emerald-50/20'
                          : 'border-slate-200 bg-slate-50'
                      }`}
                    >
                      <div className="space-y-3">
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-start gap-3">
                            <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5 ${
                              isRejected 
                                ? 'bg-rose-100 text-rose-700' 
                                : isVerified 
                                ? 'bg-emerald-100 text-emerald-700' 
                                : 'bg-blue-100 text-blue-700'
                            }`}>
                              <FileText className="w-5 h-5" />
                            </div>
                            <div>
                              <h4 className="font-bold text-xs text-slate-900">{doc.name}</h4>
                              <p className="text-[11px] text-slate-500 font-mono mt-0.5">
                                {doc.fileName || 'Not uploaded yet'} {doc.fileSize && `• ${doc.fileSize}`}
                              </p>
                              {doc.uploadedAt && (
                                <p className="text-[10px] text-slate-400 mt-0.5">
                                  Uploaded: {doc.uploadedAt}
                                </p>
                              )}
                            </div>
                          </div>

                          <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider flex-shrink-0 ${
                            isVerified 
                              ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' 
                              : isRejected
                              ? 'bg-rose-100 text-rose-800 border border-rose-300 font-extrabold'
                              : 'bg-amber-100 text-amber-800 border border-amber-200'
                          }`}>
                            {doc.status}
                          </span>
                        </div>

                        {/* Rejection Feedback Banner */}
                        {isRejected && (
                          <div className="p-3 rounded-xl bg-rose-100/70 border border-rose-200 text-xs text-rose-900 space-y-1">
                            <div className="flex items-center gap-1.5 font-bold text-rose-800 text-[11px] uppercase tracking-wider">
                              <AlertTriangle className="w-3.5 h-3.5 text-rose-600 flex-shrink-0" />
                              <span>Rejection Feedback from Compliance Directorate:</span>
                            </div>
                            <p className="text-[11px] text-rose-800 leading-relaxed font-medium pl-5">
                              {doc.rejectionReason || 'Document could not be verified. Please re-upload a clear and valid copy.'}
                            </p>
                          </div>
                        )}
                      </div>

                      {/* Action Bar */}
                      <div className="flex flex-wrap items-center justify-between gap-2 pt-4 mt-3 border-t border-slate-200/60">
                        {/* View & Download buttons */}
                        <div className="flex items-center gap-1.5">
                          {doc.fileName && (
                            <button
                              type="button"
                              onClick={() => handlePreviewDocument(doc)}
                              disabled={loadingDocId === doc.id}
                              className="px-3 py-1.5 rounded-xl bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-colors"
                              title="Inspect uploaded document in high-res viewer"
                            >
                              {loadingDocId === doc.id ? (
                                <Loader2 className="w-3.5 h-3.5 animate-spin text-blue-600" />
                              ) : (
                                <Eye className="w-3.5 h-3.5 text-blue-600" />
                              )}
                              <span>View Document</span>
                            </button>
                          )}

                          {doc.fileDataUrl && (
                            <a
                              href={doc.fileDataUrl}
                              download={doc.fileName}
                              className="p-1.5 rounded-xl bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 shadow-sm transition-colors"
                              title="Download original file"
                            >
                              <Download className="w-3.5 h-3.5" />
                            </a>
                          )}
                        </div>

                        {/* Re-upload File Button */}
                        <div>
                          <label className={`cursor-pointer px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all inline-flex items-center gap-1.5 shadow-sm ${
                            isRejected
                              ? 'bg-rose-600 hover:bg-rose-700 text-white shadow-rose-500/20'
                              : isPending
                              ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/20'
                              : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
                          }`}>
                            {isReuploading ? (
                              <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            ) : (
                              <UploadCloud className="w-3.5 h-3.5" />
                            )}
                            <span>{isRejected ? 'Re-upload Corrected File' : doc.fileName ? 'Replace File' : 'Upload File'}</span>
                            <input
                              type="file"
                              accept=".pdf,.png,.jpg,.jpeg,.webp,application/pdf,image/png,image/jpeg,image/webp"
                              disabled={isReuploading}
                              className="hidden"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  handleReuploadFile(doc.id, file);
                                }
                                e.target.value = '';
                              }}
                            />
                          </label>
                        </div>
                      </div>
                    </div>
                  );
                })}
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

          {/* TAB 4: ₹2.5L ONBOARDING FEE DIRECT BANK TRANSFER & VERIFICATION */}
          {activeTab === 'payment' && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6 animate-fade-in-up">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Partner Onboarding Fee Settlement</h3>
                  <p className="text-xs text-slate-500">Official ₹2,50,000 + 18% GST (Total: ₹2,95,000.00) via Direct SBI Bank Transfer</p>
                </div>

                <div className="text-right">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold inline-flex items-center gap-1.5 ${
                    selectedApp.paymentStatus === 'completed'
                      ? 'bg-emerald-100 text-emerald-800'
                      : selectedApp.paymentStatus === 'submitted'
                        ? 'bg-blue-100 text-blue-800'
                        : selectedApp.paymentStatus === 'rejected'
                          ? 'bg-rose-100 text-rose-800'
                          : 'bg-amber-100 text-amber-800'
                  }`}>
                    {selectedApp.paymentStatus === 'completed' && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
                    {selectedApp.paymentStatus === 'submitted' && <Clock className="w-3.5 h-3.5 text-blue-600" />}
                    {selectedApp.paymentStatus === 'rejected' && <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />}
                    {selectedApp.paymentStatus === 'completed' 
                      ? 'Settled & Verified' 
                      : selectedApp.paymentStatus === 'submitted'
                        ? 'Verification in Progress'
                        : selectedApp.paymentStatus === 'rejected'
                          ? 'Discrepancy Flagged'
                          : 'Payment Pending'}
                  </span>
                </div>
              </div>

              {/* Success Notification */}
              {paymentSubmitSuccess && (
                <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center gap-3 text-emerald-800 text-xs">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                  <div>
                    <p className="font-bold">Payment Reference Submitted Successfully!</p>
                    <p className="text-emerald-700 mt-0.5">Our Finance Directorate has been notified to manually reconcile this UTR against our SBI account statements.</p>
                  </div>
                </div>
              )}

              {/* Discrepancy Alert when rejected */}
              {selectedApp.paymentStatus === 'rejected' && (
                <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl flex items-start gap-3 text-rose-900 text-xs">
                  <AlertCircle className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <p className="font-bold text-rose-800">Payment Reference Discrepancy Flagged by Finance Admin</p>
                    <p className="text-rose-700">
                      <strong>Admin Note:</strong> {selectedApp.paymentDetails?.adminNote || 'The submitted transaction reference could not be verified in our State Bank of India account records.'}
                    </p>
                    <p className="text-slate-600">Please review the official bank credentials below and re-submit your correct UTR reference and receipt.</p>
                  </div>
                </div>
              )}

              {/* Invoice Breakdown Table */}
              <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-3">
                <div className="flex justify-between text-xs text-slate-600">
                  <span>Channel Partner Onboarding & Induction Package</span>
                  <span className="font-semibold text-slate-900">₹2,50,000.00</span>
                </div>
                <div className="flex justify-between text-xs text-slate-600">
                  <span>Applicable Goods and Services Tax (GST @ 18%)</span>
                  <span className="font-semibold text-slate-900">₹45,000.00</span>
                </div>
                <div className="flex justify-between text-sm font-extrabold text-blue-950 pt-2 border-t border-slate-200">
                  <span>Total Amount Payable</span>
                  <span className="text-lg text-blue-600">₹2,95,000.00</span>
                </div>
              </div>

              {/* CASE 1: PAYMENT SETTLED & VERIFIED */}
              {selectedApp.paymentStatus === 'completed' && selectedApp.paymentDetails ? (
                <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-200 space-y-4">
                  <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    <span>Payment Received & Manually Verified by Finance Directorate</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-emerald-950 bg-white/70 p-4 rounded-xl border border-emerald-100">
                    <p><strong>UTR / Transaction Ref:</strong> {selectedApp.paymentDetails.utrNumber || selectedApp.paymentDetails.transactionId}</p>
                    <p><strong>Tax Invoice No:</strong> {selectedApp.paymentDetails.invoiceNo}</p>
                    <p><strong>Verified Date:</strong> {new Date(selectedApp.paymentDetails.verifiedAt || selectedApp.paymentDetails.paidAt || '').toLocaleString('en-IN')}</p>
                    <p><strong>Verified By:</strong> {selectedApp.paymentDetails.verifiedBy || 'Executive Finance Directorate'}</p>
                    <p><strong>Remitter Name:</strong> {selectedApp.paymentDetails.payerName || selectedApp.individual.fullName}</p>
                    <p><strong>Beneficiary Bank:</strong> State Bank of India (A/C: 45216693371)</p>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => window.print()}
                      className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs flex items-center gap-1.5 transition-all shadow-sm"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Print / Download Tax Receipt</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveTab('training')}
                      className="px-4 py-2 rounded-xl bg-white hover:bg-emerald-100 text-emerald-800 border border-emerald-300 font-semibold text-xs flex items-center gap-1.5 transition-all"
                    >
                      <GraduationCap className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Proceed to Induction Curriculum →</span>
                    </button>
                  </div>
                </div>
              ) : selectedApp.paymentStatus === 'submitted' && !isEditingPayment ? (
                /* CASE 2: PAYMENT SUBMITTED — AWAITING MANUAL RECONCILIATION */
                <div className="space-y-6">
                  <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50/50 rounded-2xl border border-blue-200 space-y-4">
                    <div className="flex items-center gap-2 text-blue-950 font-bold text-sm">
                      <Clock className="w-5 h-5 text-blue-600" />
                      <span>Bank Transfer Submitted — Manual Verification in Progress</span>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      Your transfer reference has been recorded and submitted to the <strong>CuraQuantis™ Finance Directorate</strong>. As third-party payment gateways (Cashfree / Razorpay) are not utilized, our accounts team manually reconciles incoming credits against our <strong>State Bank of India</strong> corporate account statements.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-white p-4 rounded-xl border border-blue-100 text-slate-800">
                      <div>
                        <span className="text-slate-400 block text-[10px] uppercase font-bold">Submitted UTR / Ref No</span>
                        <span className="font-mono font-bold text-blue-900">{selectedApp.paymentDetails?.utrNumber}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px] uppercase font-bold">Transfer Mode</span>
                        <span className="font-semibold text-slate-900">{selectedApp.paymentDetails?.paymentMode || 'NEFT'}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px] uppercase font-bold">Depositor / Payer</span>
                        <span className="font-semibold text-slate-900">{selectedApp.paymentDetails?.payerName || selectedApp.individual.fullName}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px] uppercase font-bold">Submission Timestamp</span>
                        <span className="text-slate-600">{new Date(selectedApp.paymentDetails?.submittedAt || '').toLocaleString('en-IN')}</span>
                      </div>
                      <div className="sm:col-span-2 pt-2 border-t border-slate-100 flex items-center justify-between">
                        <span className="text-slate-500">Credited To Beneficiary:</span>
                        <span className="font-semibold text-slate-900">SBI A/C 45216693371 (GENQUANTIS PVT LTD)</span>
                      </div>
                    </div>

                    {/* Support Helpdesk for Immediate Verification */}
                    <div className="p-4 bg-white/80 rounded-xl border border-blue-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                      <div className="flex items-center gap-2 text-slate-700">
                        <PhoneCall className="w-4 h-4 text-blue-600" />
                        <span>Need urgent reconciliation assistance? Call Finance Desk: <strong>+91 7036951155</strong></span>
                      </div>
                      <a
                        href="tel:7036951155"
                        className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-[11px] inline-flex items-center gap-1 self-start sm:self-auto"
                      >
                        <PhoneCall className="w-3 h-3" />
                        <span>Call Desk</span>
                      </a>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <span className="text-[11px] text-slate-400">Average Turnaround: 2–4 Business Hours</span>
                      <button
                        type="button"
                        onClick={() => setIsEditingPayment(true)}
                        className="text-xs text-blue-600 hover:text-blue-800 font-semibold underline"
                      >
                        Need to edit or correct UTR details?
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                /* CASE 3: PENDING PAYMENT / FORM TO SUBMIT UTR */
                <div className="space-y-6">
                  {/* Official Corporate Bank Account Card */}
                  <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 rounded-2xl p-6 text-white shadow-lg space-y-4">
                    <div className="flex items-center justify-between border-b border-white/10 pb-3">
                      <div className="flex items-center gap-2">
                        <Landmark className="w-5 h-5 text-cyan-400" />
                        <h4 className="font-extrabold text-sm sm:text-base tracking-wide text-white">
                          Official Corporate Bank Account Details
                        </h4>
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-300 bg-cyan-950/60 px-2.5 py-1 rounded-full border border-cyan-500/30">
                        Direct Wire / RTGS / NEFT / IMPS
                      </span>
                    </div>

                    <p className="text-xs text-slate-300 font-light">
                      Please transfer the onboarding fee of <strong>₹2,95,000.00</strong> (₹2,50,000 + 18% GST) directly to the following official corporate account of CuraQuantis / GENQUANTIS PRIVATE LIMITED:
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-1">
                      {/* Account Number */}
                      <div className="bg-white/10 p-3.5 rounded-xl border border-white/15">
                        <span className="text-[10px] text-slate-400 uppercase font-bold block">Account Number</span>
                        <div className="flex items-center justify-between gap-2 mt-1">
                          <span className="font-mono text-base font-bold text-cyan-300 tracking-wider">
                            {OFFICIAL_BANK_DETAILS.accountNumber}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleCopyText(OFFICIAL_BANK_DETAILS.accountNumber, 'acc')}
                            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
                            title="Copy Account Number"
                          >
                            {copiedKey === 'acc' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                          </button>
                        </div>
                      </div>

                      {/* IFSC Code */}
                      <div className="bg-white/10 p-3.5 rounded-xl border border-white/15">
                        <span className="text-[10px] text-slate-400 uppercase font-bold block">IFSC Code</span>
                        <div className="flex items-center justify-between gap-2 mt-1">
                          <span className="font-mono text-base font-bold text-cyan-300 tracking-wider">
                            {OFFICIAL_BANK_DETAILS.ifscCode}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleCopyText(OFFICIAL_BANK_DETAILS.ifscCode, 'ifsc')}
                            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
                            title="Copy IFSC Code"
                          >
                            {copiedKey === 'ifsc' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                          </button>
                        </div>
                      </div>

                      {/* Account Holder */}
                      <div className="bg-white/10 p-3.5 rounded-xl border border-white/15">
                        <span className="text-[10px] text-slate-400 uppercase font-bold block">Beneficiary Name</span>
                        <div className="flex items-center justify-between gap-2 mt-1">
                          <span className="text-xs font-bold text-white truncate">
                            {OFFICIAL_BANK_DETAILS.holderName}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleCopyText(OFFICIAL_BANK_DETAILS.holderName, 'holder')}
                            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
                            title="Copy Holder Name"
                          >
                            {copiedKey === 'holder' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                          </button>
                        </div>
                      </div>

                      {/* Bank Name */}
                      <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                        <span className="text-[10px] text-slate-400 uppercase font-bold block">Bank</span>
                        <span className="text-xs font-semibold text-slate-200 mt-0.5 block">
                          {OFFICIAL_BANK_DETAILS.bankName}
                        </span>
                      </div>

                      {/* Branch */}
                      <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                        <span className="text-[10px] text-slate-400 uppercase font-bold block">Branch & PIN</span>
                        <span className="text-xs font-semibold text-slate-200 mt-0.5 block truncate">
                          {OFFICIAL_BANK_DETAILS.branch}
                        </span>
                      </div>

                      {/* Account Type & Phone */}
                      <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                        <span className="text-[10px] text-slate-400 uppercase font-bold block">Account Type / Phone</span>
                        <div className="flex items-center justify-between mt-0.5">
                          <span className="text-xs font-semibold text-slate-200">
                            {OFFICIAL_BANK_DETAILS.accountType}
                          </span>
                          <span className="text-[11px] font-mono font-bold text-cyan-300">
                            {OFFICIAL_BANK_DETAILS.contactNumber}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Submission Form */}
                  <form onSubmit={handleSubmitPaymentProof} className="bg-slate-50 rounded-2xl p-6 border border-slate-200 space-y-4">
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">
                        {isEditingPayment ? 'Update Bank Transfer Reference (UTR)' : 'Submit Transfer Details for Admin Verification'}
                      </h4>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Enter the transaction reference from your bank receipt/SMS so our finance team can reconcile your payment.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* UTR / Reference */}
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-700">
                          UTR / Transaction Reference Number <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={utrNumber}
                          onChange={(e) => setUtrNumber(e.target.value)}
                          placeholder="e.g. SBIN26034189218 or 12-digit UTR"
                          className="w-full px-3.5 py-2.5 text-xs font-mono rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                        />
                      </div>

                      {/* Payment Mode */}
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-700">
                          Payment Mode <span className="text-rose-500">*</span>
                        </label>
                        <select
                          value={paymentMode}
                          onChange={(e) => setPaymentMode(e.target.value)}
                          className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                        >
                          <option value="NEFT">NEFT (National Electronic Funds Transfer)</option>
                          <option value="RTGS">RTGS (Real Time Gross Settlement)</option>
                          <option value="IMPS">IMPS (Immediate Payment Service)</option>
                          <option value="Net Banking">SBI / Corporate Net Banking</option>
                          <option value="UPI">UPI / Corporate QR</option>
                        </select>
                      </div>

                      {/* Payer Name */}
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-700">
                          Depositor / Account Holder Name <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={payerName}
                          onChange={(e) => setPayerName(e.target.value)}
                          placeholder="Name appearing on remitting bank account"
                          className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                        />
                      </div>

                      {/* Remitting Bank */}
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-700">
                          Remitting Bank Name <span className="text-slate-400 font-normal">(Optional)</span>
                        </label>
                        <input
                          type="text"
                          value={payerBank}
                          onChange={(e) => setPayerBank(e.target.value)}
                          placeholder="e.g. State Bank of India, HDFC, ICICI"
                          className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                        />
                      </div>

                      {/* Upload Proof */}
                      <div className="sm:col-span-2 space-y-1">
                        <label className="text-xs font-bold text-slate-700">
                          Payment Proof / Bank Receipt / Screenshot <span className="text-slate-400 font-normal">(Optional but recommended)</span>
                        </label>
                        <div className="flex items-center gap-3">
                          <input
                            type="file"
                            accept="image/*,application/pdf"
                            onChange={handlePaymentProofFileChange}
                            className="text-xs text-slate-500 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
                          />
                          {paymentProofFile && (
                            <span className="text-xs font-medium text-emerald-600 flex items-center gap-1">
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              {paymentProofFile.name}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-[11px] text-amber-900 leading-relaxed">
                      <strong>Mandatory Compliance Notice:</strong> As third-party automated gateways are intentionally not utilized, each incoming wire is manually verified and reconciled by our Finance Directorate against SBI corporate bank records. Please allow 2–4 business hours for administrative verification.
                    </div>

                    <div className="flex flex-wrap items-center gap-3 pt-2">
                      <button
                        type="submit"
                        disabled={isSubmittingPayment}
                        className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition-all shadow-md flex items-center gap-2 disabled:opacity-50"
                      >
                        {isSubmittingPayment ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span>Recording Payment Reference...</span>
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4" />
                            <span>{isEditingPayment ? 'Update & Re-submit Reference' : 'Submit Payment Reference for Admin Verification'}</span>
                          </>
                        )}
                      </button>

                      {isEditingPayment && (
                        <button
                          type="button"
                          onClick={() => setIsEditingPayment(false)}
                          className="px-4 py-3 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold text-xs transition-all"
                        >
                          Cancel
                        </button>
                      )}
                    </div>
                  </form>
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

      {/* DOCUMENT HIGH-RESOLUTION INSPECTION MODAL */}
      {previewDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl w-full max-w-4xl max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden p-5 sm:p-6 space-y-4">
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                    <FileText className="w-4 h-4" />
                  </span>
                  <h3 className="font-extrabold text-base sm:text-lg text-slate-900">
                    {previewDoc.name}
                  </h3>
                  <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                    previewDoc.status === 'verified'
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                      : previewDoc.status === 'rejected'
                      ? 'bg-rose-100 text-rose-800 border border-rose-200'
                      : 'bg-amber-100 text-amber-800 border border-amber-200'
                  }`}>
                    {previewDoc.status}
                  </span>
                </div>
                <p className="text-xs text-slate-500 font-mono mt-1">
                  Filename: <span className="font-semibold text-slate-800">{previewDoc.fileName}</span> • {previewDoc.fileSize || 'Attached'} • Date: {previewDoc.uploadedAt}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setPreviewDoc(null)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors flex-shrink-0"
              >
                ✕
              </button>
            </div>

            {/* Rejection notice inside modal if rejected */}
            {previewDoc.status === 'rejected' && (
              <div className="p-3 rounded-2xl bg-rose-50 border border-rose-200 text-xs text-rose-900 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-rose-600 flex-shrink-0" />
                <span>
                  <strong>Scrutiny Notice:</strong> {previewDoc.rejectionReason || 'Document was rejected during compliance audit. Please use the re-upload button on your dashboard to upload a clearer document.'}
                </span>
              </div>
            )}

            {/* Document Body Preview Area */}
            <div className="flex-grow overflow-auto p-4 bg-slate-100/70 rounded-2xl flex flex-col items-center justify-center min-h-[380px] max-h-[60vh] border border-slate-200/80 relative">
              {previewDoc.fileDataUrl ? (
                previewDoc.fileDataUrl.startsWith('data:image/') || /\.(png|jpe?g|gif|webp|svg)$/i.test(previewDoc.fileName) ? (
                  <div className="flex flex-col items-center w-full h-full">
                    {/* Image Inspection Toolbar */}
                    <div className="w-full flex flex-wrap items-center justify-between gap-2 pb-2 mb-2 border-b border-slate-200 text-xs">
                      <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-slate-200 shadow-sm">
                        <button
                          type="button"
                          onClick={() => setImgZoom(z => Math.max(0.5, z - 0.25))}
                          className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-700 transition-colors"
                          title="Zoom Out (-)"
                        >
                          <ZoomOut className="w-4 h-4" />
                        </button>
                        <span className="font-mono text-[11px] font-bold px-2 text-slate-700 min-w-[42px] text-center">
                          {Math.round(imgZoom * 100)}%
                        </span>
                        <button
                          type="button"
                          onClick={() => setImgZoom(z => Math.min(3, z + 0.25))}
                          className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-700 transition-colors"
                          title="Zoom In (+)"
                        >
                          <ZoomIn className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => { setImgZoom(1); setImgRotation(0); }}
                          className="px-2 py-1 text-[10px] font-bold text-slate-600 hover:text-slate-900 border-l border-slate-200"
                          title="Reset View"
                        >
                          Reset
                        </button>
                        <button
                          type="button"
                          onClick={() => setImgRotation(r => (r + 90) % 360)}
                          className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-700 border-l border-slate-200 transition-colors flex items-center gap-1"
                          title="Rotate 90 degrees"
                        >
                          <RotateCw className="w-3.5 h-3.5" />
                          <span className="text-[10px] font-mono">{imgRotation}°</span>
                        </button>
                      </div>

                      <div className="flex items-center gap-2">
                        <a
                          href={previewDoc.fileDataUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1.5 rounded-xl bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 font-semibold text-xs flex items-center gap-1.5 shadow-sm transition-colors"
                          title="Open full-resolution image in new browser tab"
                        >
                          <Maximize2 className="w-3.5 h-3.5 text-blue-600" />
                          <span>Fullscreen in New Tab</span>
                        </a>
                      </div>
                    </div>

                    {/* Viewport */}
                    <div className="w-full flex-grow overflow-auto flex items-center justify-center p-3 bg-white/60 rounded-2xl min-h-[300px]">
                      <img
                        src={previewDoc.fileDataUrl}
                        alt={previewDoc.fileName}
                        style={{
                          transform: `scale(${imgZoom}) rotate(${imgRotation}deg)`,
                          transition: 'transform 0.15s ease-out'
                        }}
                        className="max-h-[48vh] max-w-full object-contain rounded-xl shadow-lg border border-slate-200 bg-white"
                      />
                    </div>
                  </div>
                ) : previewDoc.fileDataUrl.startsWith('data:application/pdf') || /\.pdf$/i.test(previewDoc.fileName) ? (
                  <div className="flex flex-col w-full h-full">
                    {/* PDF Toolbar */}
                    <div className="w-full flex items-center justify-between pb-2 mb-2 border-b border-slate-200 text-xs">
                      <div className="flex items-center gap-2 text-slate-700">
                        <FileText className="w-4 h-4 text-blue-600" />
                        <span className="font-bold">{previewDoc.fileName}</span>
                        <span className="text-[11px] text-slate-500 font-mono">({previewDoc.fileSize || 'PDF'})</span>
                      </div>
                      <a
                        href={previewDoc.fileDataUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 rounded-xl bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 font-semibold text-xs flex items-center gap-1.5 shadow-sm transition-colors"
                        title="Open PDF in full browser window"
                      >
                        <ExternalLink className="w-3.5 h-3.5 text-blue-600" />
                        <span>Open PDF in Full Window</span>
                      </a>
                    </div>
                    <iframe
                      src={previewDoc.fileDataUrl}
                      title={previewDoc.fileName}
                      className="w-full h-[50vh] rounded-2xl border border-slate-300 shadow-sm bg-white"
                    />
                  </div>
                ) : (
                  <div className="text-center p-8 bg-white rounded-2xl border border-slate-200 max-w-md shadow-sm space-y-4">
                    <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto border border-blue-200">
                      <FileText className="w-8 h-8" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">{previewDoc.fileName}</h4>
                      <p className="text-xs text-slate-500 mt-1">Binary file attached and verified in secure storage</p>
                    </div>
                    <a
                      href={previewDoc.fileDataUrl}
                      download={previewDoc.fileName}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow transition-all"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download Original File</span>
                    </a>
                  </div>
                )
              ) : (
                <div className="flex flex-col items-center justify-center text-center p-8 bg-white rounded-3xl border border-slate-200 max-w-lg shadow-sm space-y-4">
                  <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 border border-blue-200 flex items-center justify-center shadow-inner">
                    <FileText className="w-8 h-8" />
                  </div>
                  <div className="space-y-1.5">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-700 border border-slate-200">
                      <ShieldCheck className="w-3 h-3 text-blue-600" />
                      <span>Document Record</span>
                    </div>
                    <h4 className="font-extrabold text-slate-900 text-base">
                      {previewDoc.fileName}
                    </h4>
                    <p className="text-xs text-slate-500 leading-relaxed max-w-sm mx-auto">
                      Uploaded during initial application onboarding. Use the "Re-upload" button on your dashboard to provide an updated copy if requested.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-200">
              <div className="flex items-center gap-2">
                {previewDoc.fileDataUrl && (
                  <a
                    href={previewDoc.fileDataUrl}
                    download={previewDoc.fileName}
                    className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-blue-500/20 transition-all"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download File</span>
                  </a>
                )}

                {previewDoc.status === 'rejected' && (
                  <label className="cursor-pointer px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs inline-flex items-center gap-1.5 shadow-md shadow-rose-500/20 transition-all">
                    <UploadCloud className="w-3.5 h-3.5" />
                    <span>Re-upload Corrected File</span>
                    <input
                      type="file"
                      accept=".pdf,.png,.jpg,.jpeg,.webp,application/pdf,image/png,image/jpeg,image/webp"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          handleReuploadFile(previewDoc.id, file);
                          setPreviewDoc(null);
                        }
                        e.target.value = '';
                      }}
                    />
                  </label>
                )}
              </div>

              <button
                type="button"
                onClick={() => setPreviewDoc(null)}
                className="px-5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default PartnerDashboard;
