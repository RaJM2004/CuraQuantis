import { PartnerApplication, InvestorLead, AuditLogEntry } from '@/types/partnerPortal';

const STORAGE_KEY_APPLICATIONS = 'curaquantis_partner_applications_v1';
const STORAGE_KEY_LEADS = 'curaquantis_investor_leads_v1';

const API_BASE_URL = (import.meta as any).env?.VITE_API_URL || 'http://localhost:5000';
const API_URL = `${API_BASE_URL}/api/partner`;

const SEED_APPLICATIONS: PartnerApplication[] = [
  {
    id: 'CQ-2026-904128',
    pathway: 'pan-india',
    createdAt: '2026-09-20T11:30:00Z',
    updatedAt: '2026-09-23T14:45:00Z',
    status: 'interview_scheduled',
    statusTimeline: [
      { status: 'submitted', label: 'Application Submitted', completedAt: '2026-09-20T11:30:00Z' },
      { status: 'screening', label: 'Initial Screening Passed', completedAt: '2026-09-21T10:00:00Z' },
      { status: 'document_verification', label: 'Documents Scrutinized', completedAt: '2026-09-22T16:15:00Z' },
      { status: 'due_diligence', label: 'Commercial Due Diligence', completedAt: '2026-09-23T09:30:00Z' },
      { status: 'interview_scheduled', label: 'Management Interview Scheduled', completedAt: '2026-09-23T14:45:00Z', note: 'Executive Interview scheduled with Dr. Dharani on Sept 25, 2026 at 3:00 PM IST.' }
    ],
    individual: {
      fullName: 'Vikramaditya Sengupta',
      nameAsPerGovtId: 'Vikramaditya Sengupta',
      dob: '1981-06-14',
      gender: 'Male',
      nationality: 'Indian',
      mobile: '+91 98450 12890',
      whatsapp: '+91 98450 12890',
      email: 'vikram.sengupta@apollomediagroup.in',
      residentialAddress: 'Tower B, 1402, Prestige Golfshire, Bangalore North',
      correspondenceAddress: 'Tower B, 1402, Prestige Golfshire, Bangalore North',
      state: 'Karnataka',
      district: 'Bengaluru Urban',
      pincode: '562110',
      educationalQualification: 'B.Tech (IIT Madras), MBA (ISB Hyderabad)',
      professionalQualification: 'Fellow Healthcare Leadership Council, Certified PMP',
      currentOccupation: 'Managing Director, Apex MedTech Ventures',
      totalExperienceYears: 22,
      businessExperienceYears: 16,
      healthcareExperienceYears: 12,
      franchiseExperienceYears: 8,
      channelPartnerExperienceYears: 10,
      existingBusinessInterests: 'Distribution of diagnostic imaging and AI ultrasound consoles in South & West India.',
      linkedinProfile: 'https://linkedin.com/in/vikram-sengupta-medtech',
      reference1Name: 'Dr. R. K. Natarajan',
      reference1Contact: '+91 98400 99881',
      reference1Relation: 'Former Vice President, Manipal Hospitals Group',
      reference2Name: 'Ananya Sharma',
      reference2Contact: '+91 99100 44552'
    },
    business: {
      isApplyingAsEntity: true,
      legalEntityName: 'Apex MedTech Solutions Private Limited',
      tradeBrandName: 'Apex Healthcare Distribution',
      entityType: 'Pvt Ltd',
      dateOfIncorporation: '2014-04-12',
      registeredOffice: '88/4, Outer Ring Road, Bellandur, Bengaluru, Karnataka 560103',
      operatingOffice: 'Bangalore, Mumbai, and Delhi Regional Offices',
      website: 'https://apexmedtechsolutions.in',
      corporateEmail: 'director@apexmedtechsolutions.in',
      telephone: '080-49210088',
      principalActivities: 'Pan-India medical devices, radiology PACS, and diagnostic clinic chains.',
      yearsInOperation: 12,
      promotersDirectors: 'Vikramaditya Sengupta (65%), Sunita Sengupta (35%)',
      keyManagement: 'Chief Operating Officer, Head of Regulatory Affairs, 4 Zonal VPs',
      teamStrength: 85,
      existingLocations: 'Bengaluru, Mumbai, New Delhi, Chennai, Hyderabad',
      healthcareDiagnosticExperience: 'Supplied diagnostics instrumentation to 420+ hospitals across India.',
      franchiseExperience: 'Operated regional diagnostic collection network with 60 centers.',
      channelPartnerExperience: 'Tier-1 master distributor for Philips Healthcare and Roche Diagnostics.',
      geographicPresence: 'Pan-India presence across all 6 geographical zones.',
      existingBusinessNetwork: 'Over 1,200 clinical touchpoints and 85 corporate hospital networks.',
      proposedTeamStrength: 35,
      infrastructureCapability: '4 regional warehousing hubs, temperature-controlled transit, 24/7 technical call center.',
      investmentCapacity: '₹10 Crores - ₹25 Crores',
      authorisedSignatoryName: 'Vikramaditya Sengupta',
      authorisedSignatoryDesignation: 'Managing Director',
      gstin: '29AAACA8821P1Z9',
      cinOrPan: 'U85110KA2014PTC073911'
    },
    territory: {
      isPanIndia: true,
      selectedStates: ['All Indian States & Union Territories'],
      notes: 'Applying for master Pan-India Channel Partnership across all zones.'
    },
    documents: [
      { id: 'doc-1', name: 'PAN Card (Corporate & Individual)', category: 'identity', fileName: 'Apex_PAN_Cards_Merged.pdf', fileSize: '2.1 MB', uploadedAt: '2026-09-20', status: 'verified', isMandatory: true },
      { id: 'doc-2', name: 'Aadhaar / Passport of Signatory', category: 'identity', fileName: 'Vikram_Passport_Copy.pdf', fileSize: '3.4 MB', uploadedAt: '2026-09-20', status: 'verified', isMandatory: true },
      { id: 'doc-3', name: 'Certificate of Incorporation & MOA', category: 'business', fileName: 'Apex_COI_MOA_AOA.pdf', fileSize: '8.2 MB', uploadedAt: '2026-09-20', status: 'verified', isMandatory: true },
      { id: 'doc-4', name: 'Audited Financials (Last 3 FYs)', category: 'business', fileName: 'Apex_Audited_FY23_FY25.pdf', fileSize: '14.5 MB', uploadedAt: '2026-09-20', status: 'verified', isMandatory: true },
      { id: 'doc-5', name: 'GST Registration Certificate', category: 'compliance', fileName: 'GST_Reg_Certificate.pdf', fileSize: '1.2 MB', uploadedAt: '2026-09-20', status: 'verified', isMandatory: true },
      { id: 'doc-6', name: 'Existing Channel Partnership Track Record', category: 'experience', fileName: 'Past_Performance_Accreditation.pdf', fileSize: '4.8 MB', uploadedAt: '2026-09-20', status: 'verified', isMandatory: false }
    ],
    clarifications: [
      {
        id: 'msg-1',
        sender: 'management',
        senderName: 'CuraQuantis™ Scrutiny Board',
        timestamp: '2026-09-22T14:10:00Z',
        message: 'Dear Vikramaditya, please note that our executive interview will focus on your proposed Zonal Regional Channel Partner rollout schedule and the cold-chain logistics readiness for Tier-2 cities.'
      },
      {
        id: 'msg-2',
        sender: 'applicant',
        senderName: 'Vikramaditya Sengupta',
        timestamp: '2026-09-22T15:20:00Z',
        message: 'Understood. We have prepared an executive deck detailing our 18-month rollout roadmap across South and Western corridors. Looking forward to the interview.'
      }
    ],
    auditLogs: [
      { id: 'log-1', timestamp: '2026-09-20T11:30:00Z', action: 'Application Submitted', performedBy: 'Applicant', details: 'Pan-India Channel Partner application initiated with 6 supporting documents.' },
      { id: 'log-2', timestamp: '2026-09-21T10:00:00Z', action: 'Screening Passed', performedBy: 'Dr. Dharani (System)', details: 'Applicant meets Tier-1 eligibility thresholds.' },
      { id: 'log-3', timestamp: '2026-09-22T16:15:00Z', action: 'Documents Verified', performedBy: 'Legal Compliance Team', details: 'All corporate registrations and financial audits verified with MCA & GSTN.' },
      { id: 'log-4', timestamp: '2026-09-23T14:45:00Z', action: 'Interview Scheduled', performedBy: 'Ashwin Kumaar T', details: 'Executive interview calendar invitation dispatched.' }
    ],
    paymentStatus: 'pending',
    paymentDetails: {
      amount: 250000,
      taxes: 45000,
      totalAmount: 295000,
      invoiceNo: 'CQ/INV/2026/0891'
    },
    trainingStatus: 'modules_assigned',
    agreementStatus: 'drafting'
  },
  {
    id: 'CQ-2026-771904',
    pathway: 'regional',
    createdAt: '2026-09-18T09:15:00Z',
    updatedAt: '2026-09-23T16:00:00Z',
    status: 'partner_activated',
    statusTimeline: [
      { status: 'submitted', label: 'Application Submitted', completedAt: '2026-09-18T09:15:00Z' },
      { status: 'screening', label: 'Screening Completed', completedAt: '2026-09-19T11:00:00Z' },
      { status: 'document_verification', label: 'Documents Approved', completedAt: '2026-09-20T14:00:00Z' },
      { status: 'approved', label: 'Appointment Approved by CuraQuantis™', completedAt: '2026-09-21T17:00:00Z' },
      { status: 'payment_completed', label: '₹2.5L Onboarding Fee Settled', completedAt: '2026-09-22T10:30:00Z' },
      { status: 'training_in_progress', label: 'Executive Training Completed', completedAt: '2026-09-23T12:00:00Z' },
      { status: 'partner_activated', label: 'Regional Partner Activated', completedAt: '2026-09-23T16:00:00Z', note: 'Authorized for Tamil Nadu & Puducherry Region.' }
    ],
    individual: {
      fullName: 'Dr. Meenakshi Sundaram',
      nameAsPerGovtId: 'Meenakshi Sundaram S',
      dob: '1984-11-23',
      gender: 'Female',
      nationality: 'Indian',
      mobile: '+91 94440 33819',
      whatsapp: '+91 94440 33819',
      email: 'dr.meenakshi@quantismedical.co.in',
      residentialAddress: '42, Boat Club Road, R.A. Puram, Chennai',
      correspondenceAddress: '42, Boat Club Road, R.A. Puram, Chennai',
      state: 'Tamil Nadu',
      district: 'Chennai',
      pincode: '600028',
      educationalQualification: 'MBBS, MD (Radiology), MBA Hospital Management',
      professionalQualification: 'Member Indian Radiological & Imaging Association',
      currentOccupation: 'Director, Sundaram Diagnostic Network',
      totalExperienceYears: 18,
      businessExperienceYears: 12,
      healthcareExperienceYears: 18,
      franchiseExperienceYears: 5,
      channelPartnerExperienceYears: 6,
      existingBusinessInterests: 'Chain of 8 automated pathology and ultrasound centers in Southern Tamil Nadu.',
      linkedinProfile: 'https://linkedin.com/in/dr-meenakshi-sundaram',
      reference1Name: 'Prof. K. Chandrasekhar',
      reference1Contact: '+91 98410 11223',
      reference1Relation: 'Head of Radiology, Madras Medical College'
    },
    business: {
      isApplyingAsEntity: true,
      legalEntityName: 'Sundaram Health Diagnostics LLP',
      tradeBrandName: 'Sundaram Quantis Diagnostics',
      entityType: 'LLP',
      dateOfIncorporation: '2018-02-14',
      registeredOffice: 'Plot 18, Old Mahabalipuram Road, Perungudi, Chennai 600096',
      operatingOffice: 'Chennai & Coimbatore',
      website: 'https://sundaramdiagnostics.com',
      corporateEmail: 'partner@sundaramdiagnostics.com',
      telephone: '044-24567890',
      principalActivities: 'Diagnostic imaging, molecular pathology, and preventive health screenings.',
      yearsInOperation: 8,
      teamStrength: 45,
      existingLocations: 'Chennai, Coimbatore, Madurai, Salem',
      healthcareDiagnosticExperience: 'Serving over 20,000 diagnostic patients monthly.',
      infrastructureCapability: 'Complete digital imaging setup with high-speed PACS backbone.',
      investmentCapacity: '₹3 Crores - ₹5 Crores',
      authorisedSignatoryName: 'Dr. Meenakshi Sundaram',
      authorisedSignatoryDesignation: 'Designated Partner',
      gstin: '33AABCS1234F1Z5',
      cinOrPan: 'AABCS1234F'
    },
    territory: {
      isPanIndia: false,
      selectedStates: ['Tamil Nadu', 'Puducherry'],
      notes: 'Regional Channel Partner appointment covering Tamil Nadu and Puducherry UT.'
    },
    documents: [
      { id: 'doc-1', name: 'PAN Card & Aadhaar', category: 'identity', fileName: 'Meenakshi_KYC.pdf', fileSize: '1.8 MB', uploadedAt: '2026-09-18', status: 'verified', isMandatory: true },
      { id: 'doc-2', name: 'LLP Agreement & Incorporation', category: 'business', fileName: 'LLP_Agreement_Incorporation.pdf', fileSize: '4.2 MB', uploadedAt: '2026-09-18', status: 'verified', isMandatory: true },
      { id: 'doc-3', name: 'PCPNDT & AERB Diagnostic Licences', category: 'compliance', fileName: 'Diagnostic_Registrations.pdf', fileSize: '6.5 MB', uploadedAt: '2026-09-18', status: 'verified', isMandatory: true }
    ],
    clarifications: [],
    auditLogs: [
      { id: 'log-10', timestamp: '2026-09-18T09:15:00Z', action: 'Application Filed', performedBy: 'Applicant', details: 'Regional Channel Partner application for Tamil Nadu & Puducherry.' },
      { id: 'log-11', timestamp: '2026-09-21T17:00:00Z', action: 'Appointment Approved', performedBy: 'CuraQuantis™ Executive Board', details: 'Formally appointed as Regional Channel Partner.' },
      { id: 'log-12', timestamp: '2026-09-22T10:30:00Z', action: 'Payment Received', performedBy: 'Payment Gateway', details: '₹2,95,000 (Incl. 18% GST) settled successfully via HDFC PG. TransID: CQPG_9918237.' },
      { id: 'log-13', timestamp: '2026-09-23T16:00:00Z', action: 'Partner Activated', performedBy: 'Ashwin Kumaar T', details: 'Portal onboarding kit and Franchise Investor lead generator unlocked.' }
    ],
    paymentStatus: 'completed',
    paymentDetails: {
      amount: 250000,
      taxes: 45000,
      totalAmount: 295000,
      transactionId: 'CQPG_9918237_HDFC',
      paidAt: '2026-09-22T10:30:00Z',
      invoiceNo: 'CQ/INV/2026/0742'
    },
    trainingStatus: 'certified',
    agreementStatus: 'executed'
  },
  {
    id: 'CQ-2026-620184',
    pathway: 'franchise',
    createdAt: '2026-09-22T14:00:00Z',
    updatedAt: '2026-09-23T17:30:00Z',
    status: 'due_diligence',
    statusTimeline: [
      { status: 'submitted', label: 'Application Submitted', completedAt: '2026-09-22T14:00:00Z' },
      { status: 'screening', label: 'Preliminary Scrutiny Passed', completedAt: '2026-09-23T11:00:00Z' },
      { status: 'due_diligence', label: 'Commercial & Property Due Diligence', completedAt: '2026-09-23T17:30:00Z', note: 'Evaluating 3,200 sq.ft clinic site at Jubilee Hills, Hyderabad.' }
    ],
    individual: {
      fullName: 'Rajeshwar Reddy K',
      nameAsPerGovtId: 'Rajeshwar Reddy K',
      dob: '1978-08-19',
      gender: 'Male',
      nationality: 'Indian',
      mobile: '+91 99890 55412',
      whatsapp: '+91 99890 55412',
      email: 'rreddy@reddyproperties.in',
      residentialAddress: 'Villa 14, Boulder Hills, Gachibowli, Hyderabad',
      correspondenceAddress: 'Villa 14, Boulder Hills, Gachibowli, Hyderabad',
      state: 'Telangana',
      district: 'Hyderabad',
      pincode: '500032',
      educationalQualification: 'MS Computer Science, B.E.',
      professionalQualification: 'Real Estate Developer & Healthcare Angel Investor',
      currentOccupation: 'Chairman, Reddy Infrastructure & Healthcare Assets',
      totalExperienceYears: 24,
      businessExperienceYears: 20,
      healthcareExperienceYears: 7,
      franchiseExperienceYears: 6,
      channelPartnerExperienceYears: 2,
      existingBusinessInterests: 'Owns commercial medical complexes and primary health center leases in Hyderabad.',
      reference1Name: 'Dr. G. Venkat Rao',
      reference1Contact: '+91 98490 66778',
      reference1Relation: 'Chief of Surgical Gastroenterology, AIG Hospitals'
    },
    business: {
      isApplyingAsEntity: true,
      legalEntityName: 'Reddy Medi-Infra Private Limited',
      tradeBrandName: 'CuraQuantis Smart Clinic Hyderabad',
      entityType: 'Pvt Ltd',
      dateOfIncorporation: '2019-09-10',
      registeredOffice: 'Road No 36, Jubilee Hills, Hyderabad 500033',
      operatingOffice: 'Jubilee Hills, Hyderabad',
      teamStrength: 18,
      infrastructureCapability: '3,200 sq.ft ground-floor corner commercial property on main arterial road with 15-car parking.',
      investmentCapacity: '₹1.5 Crores - ₹2.5 Crores',
      authorisedSignatoryName: 'Rajeshwar Reddy K',
      authorisedSignatoryDesignation: 'Director',
      gstin: '36AABCR9912K1Z0'
    },
    territory: {
      isPanIndia: false,
      selectedStates: ['Telangana'],
      notes: 'Targeting CuraQuantis Flagship AI Diagnostic & Smart Clinic Franchise in Jubilee Hills / Banjara Hills cluster.'
    },
    documents: [
      { id: 'doc-1', name: 'PAN & Aadhaar', category: 'identity', fileName: 'Rajeshwar_KYC.pdf', fileSize: '2.0 MB', uploadedAt: '2026-09-22', status: 'verified', isMandatory: true },
      { id: 'doc-2', name: 'Property Ownership / Long Lease Deed', category: 'business', fileName: 'Jubilee_Hills_Lease_Deed.pdf', fileSize: '9.1 MB', uploadedAt: '2026-09-22', status: 'verified', isMandatory: true },
      { id: 'doc-3', name: 'Bank Solvency & Net Worth Certificate', category: 'compliance', fileName: 'Bank_Solvency_Certificate.pdf', fileSize: '1.4 MB', uploadedAt: '2026-09-22', status: 'verified', isMandatory: true }
    ],
    clarifications: [],
    auditLogs: [
      { id: 'log-21', timestamp: '2026-09-22T14:00:00Z', action: 'Franchise Application Received', performedBy: 'Applicant', details: 'Targeting Hyderabad Tier-1 Diagnostic Franchise center.' }
    ],
    paymentStatus: 'exempt', // Franchise investor agreements are handled directly by CuraQuantis corporate
    trainingStatus: 'not_started',
    agreementStatus: 'drafting'
  }
];

const SEED_LEADS: InvestorLead[] = [
  {
    id: 'LEAD-2026-001',
    investorName: 'Kishore Kumar Agarwal',
    entityName: 'Agarwal Diagnostics Care',
    contactNumber: '+91 98310 44521',
    email: 'kishore@agarwalmed.com',
    territory: 'Kolkata Central & Salt Lake',
    dateIntroduced: '2026-09-22T10:00:00Z',
    status: 'screening',
    introducingPartnerId: 'CQ-2026-904128',
    introducingPartnerName: 'Apex MedTech Solutions (Vikramaditya Sengupta)',
    investmentBudget: '₹1.5 Crores',
    notes: 'Existing ultrasound and blood collection chain looking to upgrade to CuraQuantis AI Diagnostics.'
  },
  {
    id: 'LEAD-2026-002',
    investorName: 'Dr. Anand Kumar Swaminathan',
    entityName: 'Swaminathan Healthcare Assets',
    contactNumber: '+91 94432 77810',
    email: 'anand@swaminathanhealth.org',
    territory: 'Coimbatore & Tiruppur',
    dateIntroduced: '2026-09-23T11:30:00Z',
    status: 'due_diligence',
    introducingPartnerId: 'CQ-2026-771904',
    introducingPartnerName: 'Sundaram Health Diagnostics (Dr. Meenakshi)',
    investmentBudget: '₹2.0 Crores',
    notes: 'High net-worth orthopaedic surgical center seeking integrated AI diagnostics wing.'
  }
];

export const PartnerStore = {
  getApplications: (): PartnerApplication[] => {
    try {
      const data = localStorage.getItem(STORAGE_KEY_APPLICATIONS);
      if (data) {
        return JSON.parse(data);
      }
    } catch (e) {
      console.error('Error reading applications from localStorage', e);
    }
    // Seed if empty
    localStorage.setItem(STORAGE_KEY_APPLICATIONS, JSON.stringify(SEED_APPLICATIONS));
    return SEED_APPLICATIONS;
  },

  getApplicationById: (id: string): PartnerApplication | undefined => {
    const list = PartnerStore.getApplications();
    return list.find(app => app.id.toUpperCase() === id.toUpperCase());
  },

  saveApplication: (app: PartnerApplication): void => {
    const list = PartnerStore.getApplications();
    const index = list.findIndex(item => item.id === app.id);
    if (index >= 0) {
      list[index] = { ...app, updatedAt: new Date().toISOString() };
    } else {
      list.unshift(app);
    }
    localStorage.setItem(STORAGE_KEY_APPLICATIONS, JSON.stringify(list));

    // Asynchronously synchronize with MongoDB
    fetch(`${API_URL}/applications`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(app)
    }).catch(err => console.warn('[MongoDB Sync]', err.message));
  },

  fetchFromMongoDB: async (): Promise<PartnerApplication[]> => {
    try {
      const res = await fetch(`${API_URL}/applications`);
      if (res.ok) {
        const data = await res.json();
        if (data.applications && Array.isArray(data.applications) && data.applications.length > 0) {
          const localList = PartnerStore.getApplications();
          const mergedMap = new Map<string, PartnerApplication>();
          localList.forEach(a => mergedMap.set(a.id, a));
          data.applications.forEach((a: PartnerApplication) => mergedMap.set(a.id, a));
          const merged = Array.from(mergedMap.values());
          localStorage.setItem(STORAGE_KEY_APPLICATIONS, JSON.stringify(merged));
          return merged;
        }
      }
    } catch (e) {
      console.warn('[MongoDB Sync Warning]', e);
    }
    return PartnerStore.getApplications();
  },

  updateStatus: (appId: string, status: PartnerApplication['status'], label: string, note?: string, performedBy = 'CuraQuantis Management'): PartnerApplication | null => {
    const app = PartnerStore.getApplicationById(appId);
    if (!app) return null;

    const timestamp = new Date().toISOString();
    app.status = status;
    app.updatedAt = timestamp;
    app.statusTimeline.push({
      status,
      label,
      completedAt: timestamp,
      note
    });

    app.auditLogs.unshift({
      id: `log-${Date.now()}`,
      timestamp,
      action: `Status Updated to ${label}`,
      performedBy,
      details: note || `Application advanced to status: ${status}`
    });

    PartnerStore.saveApplication(app);

    // Push update to MongoDB
    fetch(`${API_URL}/applications/${appId}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status, label, note, performedBy })
    }).catch(err => console.warn('[MongoDB Status Sync]', err.message));

    return app;
  },

  addClarification: (appId: string, sender: 'management' | 'applicant', senderName: string, message: string): PartnerApplication | null => {
    const app = PartnerStore.getApplicationById(appId);
    if (!app) return null;

    const timestamp = new Date().toISOString();
    app.clarifications.push({
      id: `msg-${Date.now()}`,
      sender,
      senderName,
      timestamp,
      message
    });

    app.auditLogs.unshift({
      id: `log-${Date.now()}`,
      timestamp,
      action: sender === 'management' ? 'Clarification Requested' : 'Applicant Responded',
      performedBy: senderName,
      details: message.substring(0, 100) + (message.length > 100 ? '...' : '')
    });

    PartnerStore.saveApplication(app);

    // Push clarification to MongoDB
    fetch(`${API_URL}/applications/${appId}/clarifications`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sender, senderName, message })
    }).catch(err => console.warn('[MongoDB Clarification Sync]', err.message));

    return app;
  },

  completePayment: (appId: string, transactionId: string): PartnerApplication | null => {
    const app = PartnerStore.getApplicationById(appId);
    if (!app) return null;

    const timestamp = new Date().toISOString();
    app.paymentStatus = 'completed';
    app.paymentDetails = {
      amount: 250000,
      taxes: 45000,
      totalAmount: 295000,
      transactionId,
      paidAt: timestamp,
      invoiceNo: `CQ/INV/${new Date().getFullYear()}/${Math.floor(1000 + Math.random() * 9000)}`
    };

    app.status = 'payment_completed';
    app.statusTimeline.push({
      status: 'payment_completed',
      label: '₹2.5L Onboarding Fee Settled',
      completedAt: timestamp,
      note: `Transaction ID: ${transactionId}. Onboarding materials and partner training curriculum unlocked.`
    });

    app.auditLogs.unshift({
      id: `log-${Date.now()}`,
      timestamp,
      action: 'Onboarding Fee Paid',
      performedBy: 'Secure Payment Gateway (HDFC PG)',
      details: `Settlement of ₹2,95,000 (Incl. 18% GST). Txn: ${transactionId}`
    });

    PartnerStore.saveApplication(app);
    return app;
  },

  // Leads
  getLeads: (): InvestorLead[] => {
    try {
      const data = localStorage.getItem(STORAGE_KEY_LEADS);
      if (data) {
        return JSON.parse(data);
      }
    } catch (e) {
      console.error('Error reading leads from localStorage', e);
    }
    localStorage.setItem(STORAGE_KEY_LEADS, JSON.stringify(SEED_LEADS));
    return SEED_LEADS;
  },

  registerLead: (lead: Omit<InvestorLead, 'id' | 'dateIntroduced' | 'status'>): { success: boolean; message: string; lead?: InvestorLead } => {
    const leads = PartnerStore.getLeads();
    
    // Anti-duplication check by phone or email
    const duplicate = leads.find(l => 
      l.contactNumber.replace(/\D/g, '') === lead.contactNumber.replace(/\D/g, '') ||
      l.email.toLowerCase() === lead.email.toLowerCase()
    );

    if (duplicate) {
      return {
        success: false,
        message: `Lead conflict detected: This investor was already registered by ${duplicate.introducingPartnerName} on ${new Date(duplicate.dateIntroduced).toLocaleDateString()}. Under CuraQuantis lead protection rules, duplicate registrations are protected for 180 days.`
      };
    }

    const newLead: InvestorLead = {
      ...lead,
      id: `LEAD-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
      dateIntroduced: new Date().toISOString(),
      status: 'introduced'
    };

    leads.unshift(newLead);
    localStorage.setItem(STORAGE_KEY_LEADS, JSON.stringify(leads));

    // Push to MongoDB
    fetch(`${API_URL}/leads`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newLead)
    }).catch(err => console.warn('[MongoDB Lead Sync]', err.message));

    return {
      success: true,
      message: `Franchise Investor Lead successfully registered with Reference ${newLead.id}. Priority territory rights logged for CuraQuantis review.`,
      lead: newLead
    };
  },

  updateLeadStatus: (
    leadId: string, 
    status: InvestorLead['status'], 
    notes?: string
  ): InvestorLead | null => {
    const leads = PartnerStore.getLeads();
    const idx = leads.findIndex(l => l.id.toUpperCase() === leadId.toUpperCase());
    if (idx === -1) return null;

    leads[idx].status = status;
    if (notes !== undefined) {
      leads[idx].notes = notes;
    }

    localStorage.setItem(STORAGE_KEY_LEADS, JSON.stringify(leads));
    return leads[idx];
  }
};
