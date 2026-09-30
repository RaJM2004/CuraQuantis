import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { PartnerStore } from '@/lib/partnerStore';
import { AuthStore } from '@/lib/authStore';
import { IndiaTerritoryMap } from '@/components/territory/IndiaTerritoryMap';
import { PartnerApplication, ApplicationStatus, InvestorLead } from '@/types/partnerPortal';
import { buildMailtoUrl, CURAQUANTIS_SUPPORT_EMAIL } from '@/lib/emailNotification';
import { 
  ShieldCheck, 
  Users, 
  MapPin, 
  FileText, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  AlertCircle, 
  Search, 
  Filter, 
  Send, 
  Layers, 
  Calendar,
  CreditCard,
  Building,
  TrendingUp,
  FileSignature,
  Download,
  AlertTriangle,
  Mail,
  LogOut,
  Phone,
  Check,
  X,
  UserCheck
} from 'lucide-react';

export const ManagementDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [applications, setApplications] = useState<PartnerApplication[]>([]);
  const [selectedApp, setSelectedApp] = useState<PartnerApplication | null>(null);
  const [leads, setLeads] = useState<InvestorLead[]>([]);
  
  // Filters
  const [filterPathway, setFilterPathway] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Active view tab
  const [activeTab, setActiveTab] = useState<'applications' | 'territory-map' | 'leads' | 'audit-log'>('applications');

  // Action Drawer State
  const [isActionModalOpen, setIsActionModalOpen] = useState(false);
  const [actionType, setActionType] = useState<'approve' | 'reject' | 'interview' | 'clarify'>('approve');
  const [actionNote, setActionNote] = useState('');
  const [adminName, setAdminName] = useState('Dr. Dharani (Executive Board)');

  // Lead Review Modal state
  const [selectedLeadForReview, setSelectedLeadForReview] = useState<InvestorLead | null>(null);
  const [leadReviewStatus, setLeadReviewStatus] = useState<InvestorLead['status']>('introduced');
  const [leadReviewNotes, setLeadReviewNotes] = useState<string>('');
  const [leadUpdateFeedback, setLeadUpdateFeedback] = useState<string>('');

  useEffect(() => {
    // Executive authentication guard
    const user = AuthStore.getCurrentUser();
    if (!user || user.role !== 'admin') {
      navigate('/portal/login?tab=admin&returnUrl=/portal/admin');
      return;
    }
    if (user.fullName) {
      setAdminName(user.fullName);
    }

    loadData();
    // Asynchronously pull latest from MongoDB
    PartnerStore.fetchFromMongoDB().then((remoteApps) => {
      if (remoteApps && remoteApps.length > 0) {
        setApplications([...remoteApps]);
        if (!selectedApp) {
          setSelectedApp(remoteApps[0]);
        }
      }
    });
  }, []);

  const loadData = () => {
    const apps = PartnerStore.getApplications();
    setApplications(apps);
    if (!selectedApp && apps.length > 0) {
      setSelectedApp(apps[0]);
    } else if (selectedApp) {
      const refreshed = apps.find(a => a.id === selectedApp.id);
      if (refreshed) setSelectedApp(refreshed);
    }
    setLeads(PartnerStore.getLeads());
  };

  const handleExecuteAction = () => {
    if (!selectedApp) return;

    if (actionType === 'approve') {
      PartnerStore.updateStatus(
        selectedApp.id, 
        'approved', 
        'Appointment Approved by CuraQuantis™', 
        actionNote || 'Full due diligence completed and approved by Executive Scrutiny Board.',
        adminName
      );
    } else if (actionType === 'reject') {
      PartnerStore.updateStatus(
        selectedApp.id, 
        'rejected', 
        'Application Not Approved', 
        actionNote || 'Does not meet current clinical infrastructure or demographic thresholds.',
        adminName
      );
    } else if (actionType === 'interview') {
      PartnerStore.updateStatus(
        selectedApp.id, 
        'interview_scheduled', 
        'Executive Due Diligence Interview Scheduled', 
        actionNote || 'Executive Board interview scheduled via Video Conference.',
        adminName
      );
    } else if (actionType === 'clarify') {
      PartnerStore.addClarification(
        selectedApp.id,
        'management',
        adminName,
        actionNote
      );
      PartnerStore.updateStatus(
        selectedApp.id,
        'clarification_requested',
        'Official Clarification Requested',
        actionNote,
        adminName
      );
    }

    setIsActionModalOpen(false);
    setActionNote('');
    loadData();
  };

  const handleOpenLeadReview = (lead: InvestorLead) => {
    setSelectedLeadForReview(lead);
    setLeadReviewStatus(lead.status);
    setLeadReviewNotes(lead.notes || '');
    setLeadUpdateFeedback('');
  };

  const handleSaveLeadReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedLeadForReview) return;

    const updated = PartnerStore.updateLeadStatus(
      selectedLeadForReview.id,
      leadReviewStatus,
      leadReviewNotes
    );

    if (updated) {
      setSelectedLeadForReview({ ...updated });
      setLeads(PartnerStore.getLeads());
      setLeadUpdateFeedback('Lead review dossier and stage updated successfully.');
      setTimeout(() => setLeadUpdateFeedback(''), 3000);
    }
  };

  const filteredApps = applications.filter(app => {
    const matchesPathway = filterPathway === 'all' || app.pathway === filterPathway;
    const matchesStatus = filterStatus === 'all' || app.status === filterStatus;
    const matchesSearch = app.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          app.individual.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (app.business.legalEntityName && app.business.legalEntityName.toLowerCase().includes(searchQuery.toLowerCase())) ||
                          app.territory.selectedStates.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesPathway && matchesStatus && matchesSearch;
  });

  // Calculate stats
  const stats = {
    total: applications.length,
    panIndia: applications.filter(a => a.pathway === 'pan-india').length,
    regional: applications.filter(a => a.pathway === 'regional').length,
    franchise: applications.filter(a => a.pathway === 'franchise').length,
    pendingScrutiny: applications.filter(a => ['submitted', 'screening', 'due_diligence'].includes(a.status)).length,
    approved: applications.filter(a => ['approved', 'partner_activated', 'payment_completed'].includes(a.status)).length
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />

      <main className="flex-grow pt-24 pb-20">
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
          {/* Header Banner */}
          <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-indigo-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl mb-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <div className="flex items-center gap-2 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-2">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Confidential Management Scrutiny Board</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
                  CuraQuantis™ National Command Center
                </h1>
                <p className="text-slate-300 text-xs sm:text-sm mt-1 font-light">
                  Strict due diligence, document verification, authority matrix enforcement, and territory allocation.
                </p>
              </div>

              {/* Authorized Personnel Badge & Sign Out */}
              <div className="flex items-center gap-3">
                <div className="bg-white/10 px-4 py-2.5 rounded-2xl border border-white/10 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 flex items-center justify-center font-bold text-xs">
                    HQ
                  </div>
                  <div className="text-xs">
                    <span className="text-slate-400 block text-[10px]">Logged in as:</span>
                    <span className="font-semibold text-white">{adminName}</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    AuthStore.logout();
                    navigate('/portal/login?tab=admin');
                  }}
                  className="px-3.5 py-2.5 rounded-2xl bg-white/10 hover:bg-rose-500/20 hover:border-rose-400/50 border border-white/15 text-slate-300 hover:text-rose-200 text-xs font-semibold transition-all flex items-center gap-1.5 shadow-sm"
                  title="Sign out of Scrutiny Board"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mt-8 pt-6 border-t border-white/10 text-xs">
              <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Total Dockets</span>
                <span className="text-xl font-extrabold text-white">{stats.total}</span>
              </div>
              <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Pan-India</span>
                <span className="text-xl font-extrabold text-indigo-300">{stats.panIndia}</span>
              </div>
              <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Regional</span>
                <span className="text-xl font-extrabold text-cyan-300">{stats.regional}</span>
              </div>
              <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Franchise Investors</span>
                <span className="text-xl font-extrabold text-amber-300">{stats.franchise}</span>
              </div>
              <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Pending Scrutiny</span>
                <span className="text-xl font-extrabold text-amber-400">{stats.pendingScrutiny}</span>
              </div>
              <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Approved Partners</span>
                <span className="text-xl font-extrabold text-emerald-400">{stats.approved}</span>
              </div>
            </div>

            {/* Top Navigation Tabs */}
            <div className="flex flex-wrap items-center gap-2 mt-6 text-xs">
              {[
                { id: 'applications', label: `Application Dockets (${filteredApps.length})`, icon: FileText },
                { id: 'territory-map', label: 'National Territory Density', icon: MapPin },
                { id: 'leads', label: `Investor Lead Registry (${leads.length})`, icon: Users },
                { id: 'audit-log', label: 'Compliance Audit Trail', icon: ShieldCheck }
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

          {/* TAB 1: APPLICATIONS & SCRUTINY WORKFLOW */}
          {activeTab === 'applications' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Applications List (Left 5 Cols) */}
              <div className="lg:col-span-5 space-y-4">
                {/* Search & Filter Bar */}
                <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm space-y-3">
                  <div className="relative">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search ref ID, name, territory..."
                      className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <select
                      value={filterPathway}
                      onChange={(e) => setFilterPathway(e.target.value)}
                      className="w-1/2 text-xs py-1.5 px-2 rounded-xl border border-slate-300 bg-white"
                    >
                      <option value="all">All Pathways</option>
                      <option value="pan-india">Pan-India</option>
                      <option value="regional">Regional</option>
                      <option value="franchise">Franchise Investor</option>
                    </select>

                    <select
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                      className="w-1/2 text-xs py-1.5 px-2 rounded-xl border border-slate-300 bg-white"
                    >
                      <option value="all">All Statuses</option>
                      <option value="submitted">Submitted</option>
                      <option value="screening">Screening</option>
                      <option value="due_diligence">Due Diligence</option>
                      <option value="interview_scheduled">Interview</option>
                      <option value="approved">Approved</option>
                      <option value="partner_activated">Activated</option>
                    </select>
                  </div>
                </div>

                {/* List Cards */}
                <div className="space-y-3 max-h-[750px] overflow-y-auto pr-1">
                  {filteredApps.map(app => {
                    const isSelected = selectedApp?.id === app.id;
                    return (
                      <div
                        key={app.id}
                        onClick={() => setSelectedApp(app)}
                        className={`p-4 rounded-2xl border transition-all cursor-pointer text-left ${
                          isSelected
                            ? 'bg-blue-50/80 border-blue-400 ring-2 ring-blue-500/20 shadow-md'
                            : 'bg-white hover:bg-slate-50 border-slate-200'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <span className="font-mono text-[10px] font-bold text-blue-900 bg-blue-100 px-2 py-0.5 rounded">
                              {app.id}
                            </span>
                            <h4 className="font-bold text-sm text-slate-900 mt-1">
                              {app.individual.fullName}
                            </h4>
                            <p className="text-xs text-slate-500 truncate max-w-[220px]">
                              {app.business.legalEntityName || app.individual.currentOccupation}
                            </p>
                          </div>

                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                            ['approved', 'partner_activated'].includes(app.status)
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}>
                            {app.status.replace(/_/g, ' ')}
                          </span>
                        </div>

                        <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                          <span className="capitalize">{app.pathway.replace('-', ' ')}</span>
                          <span className="truncate max-w-[150px]">
                            {app.territory.isPanIndia ? 'Pan-India' : app.territory.selectedStates.join(', ')}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Scrutiny Detail Inspector (Right 7 Cols) */}
              <div className="lg:col-span-7">
                {selectedApp ? (
                  <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
                    {/* Top Scrutiny Action Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded">
                            {selectedApp.id}
                          </span>
                          <span className="text-xs text-slate-400 capitalize">
                            Pathway: <strong>{selectedApp.pathway.replace('-', ' ')}</strong>
                          </span>
                        </div>
                        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
                          {selectedApp.business.legalEntityName || selectedApp.individual.fullName}
                        </h2>
                      </div>

                      {/* Administrative Action Trigger */}
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            setActionType('approve');
                            setActionNote('');
                            setIsActionModalOpen(true);
                          }}
                          className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md transition-colors"
                        >
                          Approve Partner
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setActionType('clarify');
                            setActionNote('');
                            setIsActionModalOpen(true);
                          }}
                          className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-sm transition-colors"
                        >
                          Request Clarification
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setActionType('interview');
                            setActionNote('Executive Interview scheduled with Dr. Dharani on Sept 28, 2026 at 4:00 PM IST.');
                            setIsActionModalOpen(true);
                          }}
                          className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-900 text-white text-xs font-semibold transition-colors"
                        >
                          Schedule Interview
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setActionType('reject');
                            setActionNote('');
                            setIsActionModalOpen(true);
                          }}
                          className="px-3.5 py-2 rounded-xl bg-rose-100 hover:bg-rose-200 text-rose-800 text-xs font-semibold transition-colors"
                        >
                          Reject
                        </button>
                        <a
                          href={buildMailtoUrl(selectedApp)}
                          className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold transition-colors flex items-center gap-1.5"
                          title={`Email complete application docket to ${CURAQUANTIS_SUPPORT_EMAIL}`}
                        >
                          <Mail className="w-3.5 h-3.5 text-blue-600" />
                          <span>Email Docket</span>
                        </a>
                      </div>
                    </div>

                    {/* Applicant & Entity Due Diligence Tabs */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                      {/* Personal Box */}
                      <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                        <h4 className="font-bold text-slate-800 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                          <Users className="w-3.5 h-3.5 text-blue-600" />
                          <span>Individual Due Diligence</span>
                        </h4>
                        <p><strong>Legal Name:</strong> {selectedApp.individual.fullName}</p>
                        <p><strong>Govt ID Match:</strong> {selectedApp.individual.nameAsPerGovtId}</p>
                        <p><strong>DOB / Gender:</strong> {selectedApp.individual.dob} ({selectedApp.individual.gender})</p>
                        <p><strong>Phone / WhatsApp:</strong> {selectedApp.individual.mobile}</p>
                        <p><strong>Email:</strong> {selectedApp.individual.email}</p>
                        <p><strong>Residence:</strong> {selectedApp.individual.residentialAddress}</p>
                        <p><strong>Total Exp:</strong> {selectedApp.individual.totalExperienceYears} Yrs (Healthcare: {selectedApp.individual.healthcareExperienceYears} Yrs)</p>
                      </div>

                      {/* Business Box */}
                      <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                        <h4 className="font-bold text-slate-800 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                          <Building className="w-3.5 h-3.5 text-blue-600" />
                          <span>Corporate Entity Scrutiny</span>
                        </h4>
                        <p><strong>Entity Name:</strong> {selectedApp.business.legalEntityName || 'Individual'}</p>
                        <p><strong>Constitution:</strong> {selectedApp.business.entityType || '—'}</p>
                        <p><strong>GSTIN:</strong> {selectedApp.business.gstin || '—'}</p>
                        <p><strong>CIN / PAN:</strong> {selectedApp.business.cinOrPan || '—'}</p>
                        <p><strong>Investment Commitment:</strong> {selectedApp.business.investmentCapacity || '—'}</p>
                        <p><strong>Team Strength:</strong> {selectedApp.business.teamStrength} existing ({selectedApp.business.proposedTeamStrength} dedicated)</p>
                      </div>
                    </div>

                    {/* Infrastructure & Capability */}
                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-1">
                      <span className="font-bold text-slate-800 uppercase tracking-wider text-[11px] block">
                        Infrastructure & Clinical Footprint:
                      </span>
                      <p className="text-slate-600 leading-relaxed">
                        {selectedApp.business.infrastructureCapability || 'No infrastructure notes supplied.'}
                      </p>
                    </div>

                    {/* Documents Scrutinized */}
                    <div className="space-y-3">
                      <h4 className="font-bold text-slate-800 uppercase tracking-wider text-xs flex items-center justify-between">
                        <span>Document Scrutiny ({selectedApp.documents.length})</span>
                        <span className="text-[11px] font-normal text-slate-500">Encrypted MCA & UIDAI verification</span>
                      </h4>

                      <div className="space-y-2">
                        {selectedApp.documents.map(doc => (
                          <div key={doc.id} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                            <div className="flex items-center gap-2.5">
                              <FileText className="w-4 h-4 text-blue-600" />
                              <div>
                                <span className="font-semibold text-slate-900 block">{doc.name}</span>
                                <span className="text-[11px] text-slate-500">{doc.fileName || 'Pending upload'}</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                                doc.status === 'verified' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                              }`}>
                                {doc.status}
                              </span>
                              {doc.fileName && (
                                doc.fileDataUrl ? (
                                  <a
                                    href={doc.fileDataUrl}
                                    download={doc.fileName}
                                    className="px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 font-semibold text-[11px] flex items-center gap-1 transition-colors"
                                  >
                                    <Download className="w-3 h-3" />
                                    <span>Download</span>
                                  </a>
                                ) : (
                                  <span className="text-slate-400 font-medium text-[11px]">
                                    Attached
                                  </span>
                                )
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* ₹2.5L Fee & Agreement Summary */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-4 border-t border-slate-100">
                      <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-200">
                        <span className="font-bold text-blue-950 uppercase tracking-wider text-[10px] block mb-1">
                          ₹2.5L Onboarding Status
                        </span>
                        <p className="text-sm font-extrabold text-blue-950 capitalize">
                          {selectedApp.paymentStatus}
                        </p>
                        {selectedApp.paymentDetails && (
                          <p className="text-[11px] text-slate-600 mt-1">
                            Txn: {selectedApp.paymentDetails.transactionId}
                          </p>
                        )}
                      </div>

                      <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                        <span className="font-bold text-slate-700 uppercase tracking-wider text-[10px] block mb-1">
                          Agreement & Training
                        </span>
                        <p className="text-sm font-extrabold text-slate-900 capitalize">
                          {selectedApp.trainingStatus?.replace(/_/g, ' ') || 'Pending'}
                        </p>
                        <p className="text-[11px] text-slate-500 mt-1">
                          Contract: {selectedApp.agreementStatus || 'Drafting'}
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-white rounded-3xl p-12 text-center text-slate-400 border border-slate-200">
                    Select an application from the list to inspect credentials.
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: TERRITORY DENSITY MAP */}
          {activeTab === 'territory-map' && (
            <div className="space-y-6 animate-fade-in-up">
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
                <h3 className="text-lg font-bold text-slate-900">National Healthcare Territory Allocation</h3>
                <p className="text-xs text-slate-500 mb-6">
                  Inspect proposed vs approved regional coverage across all 28 states and 8 union territories.
                </p>

                <IndiaTerritoryMap
                  selectedStates={Array.from(new Set(applications.flatMap(a => a.territory.selectedStates)))}
                  isPanIndia={false}
                  onSelectionChange={() => {}}
                  readOnly={true}
                  territoryType="approved"
                />
              </div>
            </div>
          )}

          {/* TAB 3: INVESTOR LEAD REGISTRY */}
          {activeTab === 'leads' && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6 animate-fade-in-up">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Central Franchise Investor Lead Registry</h3>
                <p className="text-xs text-slate-500">
                  Screen all prospective investors introduced by Pan-India & Regional Channel Partners. Prevents duplicate lead disputes and unauthorized ROI promises.
                </p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                      <th className="pb-3">Lead Ref</th>
                      <th className="pb-3">Investor Profile</th>
                      <th className="pb-3">Introducing Channel Partner</th>
                      <th className="pb-3">Proposed Territory</th>
                      <th className="pb-3">Budget</th>
                      <th className="pb-3">Date Registered</th>
                      <th className="pb-3">Management Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {leads.map(lead => (
                      <tr key={lead.id} className="hover:bg-slate-50 transition-colors">
                        <td className="py-3.5 font-mono font-bold text-blue-900">{lead.id}</td>
                        <td className="py-3.5">
                          <span className="font-semibold text-slate-900 block">{lead.investorName}</span>
                          <span className="text-[11px] text-slate-500">{lead.contactNumber} • {lead.email}</span>
                        </td>
                        <td className="py-3.5 text-slate-700 font-medium">{lead.introducingPartnerName}</td>
                        <td className="py-3.5 text-slate-700">{lead.territory}</td>
                        <td className="py-3.5 text-slate-700 font-semibold">{lead.investmentBudget}</td>
                        <td className="py-3.5 text-slate-500">{new Date(lead.dateIntroduced).toLocaleDateString()}</td>
                        <td className="py-3.5">
                          <button
                            type="button"
                            onClick={() => handleOpenLeadReview(lead)}
                            className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-[11px] transition-all flex items-center gap-1.5 shadow-sm"
                          >
                            <FileText className="w-3.5 h-3.5" />
                            <span>Review Lead</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 4: AUDIT LOG */}
          {activeTab === 'audit-log' && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6 animate-fade-in-up">
              <div>
                <h3 className="text-lg font-bold text-slate-900">National Compliance & Decision Audit Trail</h3>
                <p className="text-xs text-slate-500">
                  Cryptographically timestamped record of all administrative evaluations, status transitions, and payments.
                </p>
              </div>

              <div className="space-y-3">
                {applications.flatMap(a => a.auditLogs.map(l => ({ ...l, docketId: a.id }))).sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()).map(log => (
                  <div key={log.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[10px] font-bold text-blue-900 bg-blue-100 px-2 py-0.5 rounded">
                          {log.docketId}
                        </span>
                        <span className="font-bold text-slate-900">{log.action}</span>
                      </div>
                      <p className="text-slate-600 text-xs mt-1">{log.details}</p>
                    </div>

                    <div className="text-left sm:text-right flex-shrink-0 text-[11px] text-slate-400">
                      <span className="font-medium text-slate-700 block">{log.performedBy}</span>
                      <span>{new Date(log.timestamp).toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Action Drawer / Modal */}
      {isActionModalOpen && selectedApp && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 animate-fade-in-up space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                Action Scrutiny Order
              </span>
              <h3 className="text-xl font-bold text-slate-900 capitalize mt-1">
                {actionType === 'approve' ? 'Approve Appointment' : actionType === 'reject' ? 'Disapprove Application' : actionType === 'interview' ? 'Schedule Executive Interview' : 'Issue Official Clarification'}
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Target: <strong>{selectedApp.individual.fullName}</strong> ({selectedApp.id})
              </p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-2">
                Executive Notes & Official Justification <span className="text-red-500">*</span>
              </label>
              <textarea
                rows={4}
                required
                value={actionNote}
                onChange={(e) => setActionNote(e.target.value)}
                placeholder="Enter detailed directives, interview calendar details, or required clarification points..."
                className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setIsActionModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-500 hover:text-slate-800"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleExecuteAction}
                className={`px-6 py-2 rounded-xl text-xs font-bold text-white shadow-md transition-colors ${
                  actionType === 'approve' ? 'bg-emerald-600 hover:bg-emerald-700' :
                  actionType === 'reject' ? 'bg-rose-600 hover:bg-rose-700' :
                  'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                Commit & Log Audit Trail
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Lead Review & Due Diligence Modal */}
      {selectedLeadForReview && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 animate-fade-in-up space-y-6 my-8">
            {/* Header */}
            <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-blue-900 bg-blue-100 px-2.5 py-1 rounded-full border border-blue-200">
                    {selectedLeadForReview.id}
                  </span>
                  <span className={`text-[10px] uppercase font-bold px-2.5 py-0.5 rounded-full ${
                    selectedLeadForReview.status === 'approved' || selectedLeadForReview.status === 'agreement_signed'
                      ? 'bg-emerald-100 text-emerald-800'
                      : selectedLeadForReview.status === 'rejected'
                      ? 'bg-rose-100 text-rose-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}>
                    {selectedLeadForReview.status.replace(/_/g, ' ')}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mt-2">
                  {selectedLeadForReview.investorName}
                </h3>
                {selectedLeadForReview.entityName && (
                  <p className="text-xs text-slate-500 font-medium">
                    Legal Entity: {selectedLeadForReview.entityName}
                  </p>
                )}
              </div>

              <button
                type="button"
                onClick={() => setSelectedLeadForReview(null)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Investor Key Facts Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Contact Phone</span>
                <span className="font-semibold text-slate-900 flex items-center gap-1.5 mt-0.5">
                  <Phone className="w-3.5 h-3.5 text-blue-600" />
                  <a href={`tel:${selectedLeadForReview.contactNumber}`} className="hover:underline text-blue-600">
                    {selectedLeadForReview.contactNumber}
                  </a>
                </span>
              </div>

              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Email Address</span>
                <span className="font-semibold text-slate-900 flex items-center gap-1.5 mt-0.5 truncate">
                  <Mail className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
                  <a href={`mailto:${selectedLeadForReview.email}`} className="hover:underline text-blue-600 truncate">
                    {selectedLeadForReview.email}
                  </a>
                </span>
              </div>

              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Proposed Territory</span>
                <span className="font-semibold text-slate-900 flex items-center gap-1.5 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-indigo-600" />
                  {selectedLeadForReview.territory}
                </span>
              </div>

              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Investment Budget</span>
                <span className="font-bold text-emerald-700 flex items-center gap-1.5 mt-0.5">
                  <CreditCard className="w-3.5 h-3.5 text-emerald-600" />
                  {selectedLeadForReview.investmentBudget}
                </span>
              </div>
            </div>

            {/* Introducing Partner Attribution & Exclusivity Notice */}
            <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200 text-xs space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-blue-900 flex items-center gap-1.5">
                  <UserCheck className="w-3.5 h-3.5 text-blue-700" />
                  Introducing Partner Attribution:
                </span>
                <span className="text-[10px] text-blue-600 font-mono">
                  Introduced: {new Date(selectedLeadForReview.dateIntroduced).toLocaleDateString()}
                </span>
              </div>
              <p className="text-slate-700 font-medium">
                {selectedLeadForReview.introducingPartnerName}
              </p>
              <p className="text-[11px] text-blue-700/90 pt-1">
                ★ Protected under CuraQuantis 180-day Anti-Duplicate Lead Exclusivity. Other partners cannot claim commissions on this prospective investor.
              </p>
            </div>

            {/* Update Status Form */}
            <form onSubmit={handleSaveLeadReview} className="space-y-4">
              {leadUpdateFeedback && (
                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>{leadUpdateFeedback}</span>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                  Update Lead Due Diligence Status
                </label>
                <select
                  value={leadReviewStatus}
                  onChange={(e) => setLeadReviewStatus(e.target.value as any)}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-600 focus:outline-none"
                >
                  <option value="introduced">Introduced — Initial Registration Recorded</option>
                  <option value="screening">Screening — Background & Identity Check</option>
                  <option value="due_diligence">Due Diligence — Land/Site Feasibility Analysis</option>
                  <option value="curaquantis_review">CuraQuantis Review — Board Committee Evaluation</option>
                  <option value="approved">Approved — Cleared for Direct Franchise Negotiation</option>
                  <option value="agreement_signed">Agreement Signed — Smart Diagnostic Center Finalized</option>
                  <option value="rejected">Rejected — Territory Conflict / Budget Inadequate</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                  Executive Notes & Site Assessment
                </label>
                <textarea
                  rows={3}
                  value={leadReviewNotes}
                  onChange={(e) => setLeadReviewNotes(e.target.value)}
                  placeholder="Record site visit feedback, demographic feasibility, or conversation notes with investor..."
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-blue-600 focus:outline-none"
                />
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100">
                <div className="flex items-center gap-2">
                  <a
                    href={`tel:${selectedLeadForReview.contactNumber}`}
                    className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-slate-600" />
                    <span>Call</span>
                  </a>
                  <a
                    href={`mailto:${selectedLeadForReview.email}?subject=CuraQuantis%20Franchise%20Investor%20Due%20Diligence%20-%20${selectedLeadForReview.id}`}
                    className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5 text-slate-600" />
                    <span>Email</span>
                  </a>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedLeadForReview(null)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-500 hover:text-slate-800"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-500/20 transition-all flex items-center gap-1.5"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Save & Update Lead Dossier</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default ManagementDashboard;
