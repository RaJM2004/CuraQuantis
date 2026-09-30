import emailjs from '@emailjs/browser';
import { PartnerApplication } from '@/types/partnerPortal';

// Official destination email
export const CURAQUANTIS_SUPPORT_EMAIL = 'support@curaquantis.com';

// EmailJS credentials configured in the project
const EMAILJS_SERVICE_ID = 'service_t6ssh7g';
const EMAILJS_TEMPLATE_ID = 'template_3tqp1nf';
const EMAILJS_PUBLIC_KEY = 'CG70ICmTB8Mb4O6gi';

export interface EmailDispatchResult {
  sent: boolean;
  channel: 'formsubmit' | 'emailjs' | 'mailto_ready' | 'failed';
  message: string;
  mailtoUrl: string;
}

/**
 * Formats a comprehensive text summary of the partner application
 */
export function formatApplicationDossier(app: PartnerApplication): { subject: string; body: string } {
  const pathwayLabel = 
    app.pathway === 'pan-india' ? 'Pan-India Channel Partner' :
    app.pathway === 'regional' ? 'Regional Channel Partner' :
    'CuraQuantis™ Franchise Investor';

  const territorySummary = app.territory.isPanIndia 
    ? 'Pan-India (All 36 States & UTs)' 
    : app.territory.selectedStates.join(', ') || 'Not specified';

  const verifiedDocs = app.documents
    .filter(d => d.status === 'verified' && d.fileName)
    .map(d => `${d.name} (${d.fileName})`)
    .join(', ') || 'Stored in portal';

  const subject = `[PARTNER APPLICATION - ${app.id}] ${pathwayLabel} - ${app.business.legalEntityName || app.individual.fullName}`;

  const body = `
=====================================================
CURAQUANTIS™ OFFICIAL PARTNER DOCKET
Destination: ${CURAQUANTIS_SUPPORT_EMAIL}
=====================================================

DOCKET REFERENCE NO: ${app.id}
PATHWAY: ${pathwayLabel}
SUBMISSION DATE: ${new Date(app.createdAt).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST

--- APPLICANT PROFILE ---
Full Legal Name: ${app.individual.fullName}
Name as per Govt ID: ${app.individual.nameAsPerGovtId}
DOB & Gender: ${app.individual.dob} (${app.individual.gender}, ${app.individual.nationality})
Mobile: ${app.individual.mobile}
WhatsApp: ${app.individual.whatsapp}
Email: ${app.individual.email}
Address: ${app.individual.residentialAddress}, ${app.individual.district}, ${app.individual.state} - ${app.individual.pincode}
Current Occupation: ${app.individual.currentOccupation}
Total Experience: ${app.individual.totalExperienceYears} Years (Healthcare: ${app.individual.healthcareExperienceYears} Years)
Franchise Exp: ${app.individual.franchiseExperienceYears} Yrs | Channel Exp: ${app.individual.channelPartnerExperienceYears} Yrs
Primary Reference: ${app.individual.reference1Name} (${app.individual.reference1Contact})

--- CORPORATE ENTITY ---
Legal Entity Name: ${app.business.legalEntityName || 'Individual Application'}
Brand Name: ${app.business.tradeBrandName || 'N/A'}
Constitution: ${app.business.entityType || 'N/A'}
GSTIN: ${app.business.gstin || 'N/A'}
CIN / PAN: ${app.business.cinOrPan || 'N/A'}
Registered Office: ${app.business.registeredOffice || 'N/A'}
Infrastructure: ${app.business.infrastructureCapability || 'N/A'}
Investment Commitment: ${app.business.investmentCapacity || 'N/A'}
Current Team: ${app.business.teamStrength} | Dedicated Team: ${app.business.proposedTeamStrength}

--- PROPOSED TERRITORY ---
Scope: ${territorySummary}
Notes: ${app.territory.notes || 'None'}

--- ATTACHED DOCUMENTS ---
${verifiedDocs}

--- LEGAL DECLARATIONS CERTIFIED ---
[x] Truthful Disclosure & Due Diligence Consent
[x] No-ROI & No Revenue Guarantee Covenant
[x] CuraQuantis Sole Appointment Authority
[x] Anti-Fraud & Conflict-of-Interest Declaration
[x] IP Non-Disclosure Agreement

Access this docket in the Scrutiny Console:
${window.location.origin}/portal/admin
=====================================================
`.trim();

  return { subject, body };
}

/**
 * Builds a direct mailto URI for manual or 1-click email client dispatch
 */
export function buildMailtoUrl(app: PartnerApplication): string {
  const { subject, body } = formatApplicationDossier(app);
  return `mailto:${CURAQUANTIS_SUPPORT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

/**
 * Multi-channel email dispatcher:
 * 1. FormSubmit direct API to support@curaquantis.com
 * 2. EmailJS backup
 * 3. Prepares 1-click mailto fallback
 */
export async function sendPartnerApplicationEmail(
  app: PartnerApplication
): Promise<EmailDispatchResult> {
  const { subject, body } = formatApplicationDossier(app);
  const mailtoUrl = buildMailtoUrl(app);

  let formSubmitSuccess = false;
  let formSubmitMsg = '';

  // Channel 1: FormSubmit Direct POST
  try {
    const response = await fetch(`https://formsubmit.co/ajax/${CURAQUANTIS_SUPPORT_EMAIL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        _subject: subject,
        _template: 'table',
        _captcha: 'false',
        docket_id: app.id,
        pathway: app.pathway,
        applicant_name: app.individual.fullName,
        applicant_email: app.individual.email,
        applicant_phone: app.individual.mobile,
        applicant_whatsapp: app.individual.whatsapp,
        territory: app.territory.isPanIndia ? 'Pan-India' : app.territory.selectedStates.join(', '),
        company_name: app.business.legalEntityName || 'Individual',
        investment_capacity: app.business.investmentCapacity,
        dossier_text: body
      })
    });

    const data = await response.json();
    if (response.ok && (data.success === 'true' || data.success === true)) {
      formSubmitSuccess = true;
      formSubmitMsg = 'Dispatched directly to support@curaquantis.com';
    } else {
      formSubmitMsg = data.message || 'FormSubmit pending activation';
    }
  } catch (err) {
    console.warn('[FormSubmit Dispatch Warning]', err);
  }

  if (formSubmitSuccess) {
    return {
      sent: true,
      channel: 'formsubmit',
      message: `Docket dispatched to ${CURAQUANTIS_SUPPORT_EMAIL} via secure transmission.`,
      mailtoUrl
    };
  }

  // Channel 2: EmailJS attempt
  try {
    const res = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      {
        from_name: `${app.individual.fullName} [${app.id}]`,
        from_email: app.individual.email,
        to_email: CURAQUANTIS_SUPPORT_EMAIL,
        subject: subject,
        message: body,
        location: app.territory.selectedStates.join(', ') || 'Pan-India'
      },
      EMAILJS_PUBLIC_KEY
    );

    if (res.status === 200) {
      return {
        sent: true,
        channel: 'emailjs',
        message: `Docket delivered to ${CURAQUANTIS_SUPPORT_EMAIL} via EmailJS.`,
        mailtoUrl
      };
    }
  } catch (emailJsErr: any) {
    console.warn('[EmailJS Error]', emailJsErr);
  }

  // Channel 3: Return ready mailto URL with clear status
  return {
    sent: false,
    channel: 'mailto_ready',
    message: `Docket recorded in portal database. Click 'Send Copy via Email Client' to dispatch directly to ${CURAQUANTIS_SUPPORT_EMAIL}.`,
    mailtoUrl
  };
}
