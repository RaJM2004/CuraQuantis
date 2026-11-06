const SEED_APPLICATIONS = [
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
      email: 'meenakshi.s@sundaramhealth.com',
      residentialAddress: 'No 45, Boat Club Road, R.A. Puram, Chennai',
      correspondenceAddress: 'No 45, Boat Club Road, R.A. Puram, Chennai',
      state: 'Tamil Nadu',
      district: 'Chennai',
      pincode: '600028',
      educationalQualification: 'MBBS, MD (Pathology) - MMC Chennai',
      professionalQualification: 'Ex-Professor Pathology, Certified Lead Auditor ISO 15189',
      currentOccupation: 'Director, Sundaram Health Diagnostics LLP',
      totalExperienceYears: 18,
      businessExperienceYears: 10,
      healthcareExperienceYears: 18,
      franchiseExperienceYears: 5,
      channelPartnerExperienceYears: 6,
      existingBusinessInterests: 'Owns 4 NABL accredited clinical pathology labs in Chennai, Madurai, and Coimbatore.',
      linkedinProfile: 'https://linkedin.com/in/drmeenakshisundaram',
      reference1Name: 'Prof. Dr. K. E. Anand',
      reference1Contact: '+91 98401 22334',
      reference1Relation: 'Dean of Research, Apollo Hospitals Chennai'
    },
    business: {
      isApplyingAsEntity: true,
      legalEntityName: 'Sundaram Health Diagnostics LLP',
      tradeBrandName: 'Sundaram Clinical Labs',
      entityType: 'LLP',
      dateOfIncorporation: '2016-08-19',
      registeredOffice: '122, TTK Road, Alwarpet, Chennai, Tamil Nadu 600018',
      operatingOffice: 'Chennai & Coimbatore',
      website: 'https://sundaramhealth.com',
      corporateEmail: 'info@sundaramhealth.com',
      telephone: '044-24991122',
      principalActivities: 'Diagnostic pathology, genomic testing, and clinical trial sample coordination.',
      yearsInOperation: 10,
      promotersDirectors: 'Dr. Meenakshi Sundaram (51%), Dr. S. Sundaram (49%)',
      keyManagement: 'Operations Head, Quality Manager, 8 Regional Phlebotomy Coordinators',
      teamStrength: 42,
      existingLocations: 'Chennai, Madurai, Trichy, Coimbatore, Salem',
      healthcareDiagnosticExperience: '20+ years clinical pathology and molecular diagnostics leadership.',
      franchiseExperience: 'Setup 18 franchisee collection points across South Tamil Nadu.',
      channelPartnerExperience: 'Regional distributor for automated hematology counters.',
      geographicPresence: 'Statewide network across Tamil Nadu and Puducherry UT.',
      existingBusinessNetwork: 'Tie-ups with 280+ practicing physicians and 14 nursing homes.',
      proposedTeamStrength: 12,
      infrastructureCapability: 'Centrally air-conditioned training facility, calibration lab, dedicated field CRM team.',
      investmentCapacity: '₹1 Crore - ₹3 Crores',
      authorisedSignatoryName: 'Dr. Meenakshi Sundaram',
      authorisedSignatoryDesignation: 'Designated Partner',
      gstin: '33AABFS1029D1Z4'
    },
    territory: {
      isPanIndia: false,
      selectedStates: ['Tamil Nadu', 'Puducherry'],
      notes: 'Territory coverage focused on Tamil Nadu and UT of Puducherry.'
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
    paymentStatus: 'exempt',
    trainingStatus: 'not_started',
    agreementStatus: 'drafting'
  }
];

const SEED_LEADS = [
  {
    id: 'LEAD-2026-001',
    investorName: 'Kishore Kumar Agarwal',
    entityName: 'Agarwal Diagnostics Care',
    contactNumber: '+91 98300 77112',
    email: 'k.agarwal@agarwaldiagnostics.com',
    territory: 'Kolkata Central & Salt Lake, West Bengal',
    dateIntroduced: '2026-09-21T11:00:00Z',
    status: 'screening',
    introducingPartnerId: 'CQ-2026-771904',
    introducingPartnerName: 'Sundaram Health Diagnostics (Dr. Meenakshi)',
    investmentBudget: '₹2.0 Crores',
    notes: 'High net-worth orthopaedic surgical center seeking integrated AI diagnostics wing.'
  }
];

module.exports = {
  SEED_APPLICATIONS,
  SEED_LEADS
};

