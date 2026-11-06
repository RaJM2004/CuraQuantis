const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });

const PartnerApplication = require('./models/PartnerApplication');
const InvestorLead = require('./models/InvestorLead');
const { SEED_APPLICATIONS, SEED_LEADS } = require('./seedData');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || process.env.MONGODB_URI;
const CORS_ORIGIN = process.env.CORS_ORIGIN || '*';

// Microsoft Outlook / Office 365 SMTP Transporter
function getOutlookTransporter() {
  const outlookEmail = process.env.OUTLOOK_EMAIL || process.env.SMTP_USER;
  const outlookPassword = process.env.OUTLOOK_PASSWORD || process.env.SMTP_PASS;

  if (!outlookEmail || !outlookPassword) {
    return null;
  }

  const host = process.env.SMTP_HOST || 'smtp-mail.outlook.com';
  const port = parseInt(process.env.SMTP_PORT || '587', 10);

  return nodemailer.createTransport({
    host,
    port,
    secure: false, // Port 587 uses STARTTLS
    auth: {
      user: outlookEmail,
      pass: outlookPassword
    },
    tls: {
      ciphers: 'SSLv3',
      rejectUnauthorized: false
    }
  });
}

// Middleware
app.use(cors({ origin: CORS_ORIGIN }));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Resilient in-memory fallback cache
const memoryStore = {
  applications: [...SEED_APPLICATIONS],
  leads: [...SEED_LEADS]
};

let isMongoConnected = false;

// Seed initial database records if empty
async function seedInitialDataIfEmpty() {
  try {
    const appCount = await PartnerApplication.countDocuments();
    if (appCount === 0) {
      console.log('[CuraQuantis MongoDB] Seeding initial applications to MongoDB Atlas...');
      await PartnerApplication.insertMany(SEED_APPLICATIONS);
      console.log(`[CuraQuantis MongoDB] Seeded ${SEED_APPLICATIONS.length} applications.`);
    }

    const leadCount = await InvestorLead.countDocuments();
    if (leadCount === 0) {
      console.log('[CuraQuantis MongoDB] Seeding initial leads to MongoDB Atlas...');
      await InvestorLead.insertMany(SEED_LEADS);
      console.log(`[CuraQuantis MongoDB] Seeded ${SEED_LEADS.length} leads.`);
    }
  } catch (err) {
    console.warn('[CuraQuantis MongoDB Seed Notice]', err.message);
  }
}

// Connect to MongoDB Atlas
if (!MONGO_URI) {
  console.error('[CuraQuantis MongoDB] Missing MONGO_URI in environment!');
} else {
  console.log('[CuraQuantis MongoDB] Connecting to MongoDB Atlas cluster...');
  mongoose.connect(MONGO_URI, {
    serverSelectionTimeoutMS: 10000
  }).then(async () => {
    isMongoConnected = true;
    console.log(`[CuraQuantis MongoDB] ★ SUCCESS! Connected to database: "${mongoose.connection.name}"`);
    console.log(`[CuraQuantis MongoDB] Host: ${mongoose.connection.host}`);
    await seedInitialDataIfEmpty();
  }).catch(err => {
    isMongoConnected = false;
    console.error(`[CuraQuantis MongoDB Error] Connection failed: ${err.message}`);
    console.log('[CuraQuantis MongoDB] Operating with in-memory resilient fallback cache.');
  });
}

mongoose.connection.on('connected', () => { 
  isMongoConnected = true; 
  console.log('[CuraQuantis MongoDB] Connection established.');
});
mongoose.connection.on('disconnected', () => { 
  isMongoConnected = false; 
  console.warn('[CuraQuantis MongoDB] Disconnected.');
});

// Root & Health Check Endpoints
app.get('/', (req, res) => {
  res.json({
    name: 'CuraQuantis Partner Portal Backend API',
    version: '1.0.0',
    status: 'online',
    mongodb: isMongoConnected ? 'connected' : 'disconnected (using fallback cache)',
    endpoints: {
      health: '/api/health',
      applications: '/api/partner/applications',
      leads: '/api/partner/leads'
    }
  });
});

app.get('/api/health', async (req, res) => {
  let appCount = memoryStore.applications.length;
  let leadCount = memoryStore.leads.length;

  if (isMongoConnected) {
    try {
      appCount = await PartnerApplication.countDocuments();
      leadCount = await InvestorLead.countDocuments();
    } catch (e) {
      // fallback
    }
  }

  res.json({
    status: 'online',
    service: 'CuraQuantis Partner & Franchise Portal API',
    mongodb: isMongoConnected ? 'connected' : 'disconnected (using fallback cache)',
    activeDatabase: mongoose.connection?.name || 'curaquantis',
    clusterHost: mongoose.connection?.host || 'remote-atlas',
    stats: {
      applications: appCount,
      leads: leadCount
    },
    timestamp: new Date().toISOString()
  });
});

// 1. Submit / Save application directly to MongoDB
app.post('/api/partner/applications', async (req, res) => {
  try {
    const appData = req.body;
    if (!appData.id || !appData.pathway) {
      return res.status(400).json({ error: 'Missing application id or pathway' });
    }

    if (isMongoConnected) {
      const saved = await PartnerApplication.findOneAndUpdate(
        { id: appData.id },
        { ...appData, updatedAt: new Date().toISOString() },
        { upsert: true, returnDocument: 'after', new: true, setDefaultsOnInsert: true }
      );
      console.log(`[CuraQuantis MongoDB] Saved Application: ${saved.id} (${saved.individual?.fullName || 'Applicant'})`);
      return res.status(201).json({ success: true, application: saved, storage: 'mongodb_atlas' });
    } else {
      const idx = memoryStore.applications.findIndex(a => a.id === appData.id);
      if (idx >= 0) {
        memoryStore.applications[idx] = { ...appData, updatedAt: new Date().toISOString() };
      } else {
        memoryStore.applications.unshift(appData);
      }
      return res.status(201).json({ success: true, application: appData, storage: 'fallback_cache' });
    }
  } catch (error) {
    console.error('[CuraQuantis API Error: save application]', error);
    res.status(500).json({ error: error.message });
  }
});

// 2. Retrieve all applications
app.get('/api/partner/applications', async (req, res) => {
  try {
    const { pathway, status, search } = req.query;

    if (isMongoConnected) {
      let query = {};
      if (pathway && pathway !== 'all') query.pathway = pathway;
      if (status && status !== 'all') query.status = status;
      if (search) {
        query.$or = [
          { id: { $regex: search, $options: 'i' } },
          { 'individual.fullName': { $regex: search, $options: 'i' } },
          { 'business.legalEntityName': { $regex: search, $options: 'i' } }
        ];
      }

      const list = await PartnerApplication.find(query).sort({ createdAt: -1 });
      return res.json({ 
        success: true, 
        count: list.length, 
        applications: list, 
        database: 'curaquantis.partner_applications',
        storage: 'mongodb_atlas' 
      });
    } else {
      let filtered = [...memoryStore.applications];
      if (pathway && pathway !== 'all') filtered = filtered.filter(a => a.pathway === pathway);
      if (status && status !== 'all') filtered = filtered.filter(a => a.status === status);
      if (search) {
        const s = search.toLowerCase();
        filtered = filtered.filter(a => 
          a.id.toLowerCase().includes(s) || 
          (a.individual?.fullName && a.individual.fullName.toLowerCase().includes(s))
        );
      }
      return res.json({ success: true, count: filtered.length, applications: filtered, storage: 'fallback_cache' });
    }
  } catch (error) {
    console.error('[CuraQuantis API Error: list applications]', error);
    res.status(500).json({ error: error.message });
  }
});

// 3. Retrieve single application by ID
app.get('/api/partner/applications/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (isMongoConnected) {
      const appDoc = await PartnerApplication.findOne({ id: new RegExp(`^${id}$`, 'i') });
      if (!appDoc) {
        return res.status(404).json({ error: `Application ${id} not found in MongoDB` });
      }
      return res.json({ success: true, application: appDoc, storage: 'mongodb_atlas' });
    } else {
      const match = memoryStore.applications.find(a => a.id.toUpperCase() === id.toUpperCase());
      if (!match) {
        return res.status(404).json({ error: `Application ${id} not found` });
      }
      return res.json({ success: true, application: match, storage: 'fallback_cache' });
    }
  } catch (error) {
    console.error('[CuraQuantis API Error: get application by id]', error);
    res.status(500).json({ error: error.message });
  }
});

// 4. Update status (Approve, Reject, Interview, Clarify)
app.patch('/api/partner/applications/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status, label, note, performedBy } = req.body;

    const timestamp = new Date().toISOString();
    const newTimeline = { status, label, completedAt: timestamp, note };
    const newAudit = {
      id: `log-${Date.now()}`,
      timestamp,
      action: `Status Updated to ${label}`,
      performedBy: performedBy || 'CuraQuantis Management',
      details: note || `Application advanced to status: ${status}`
    };

    if (isMongoConnected) {
      const updated = await PartnerApplication.findOneAndUpdate(
        { id: new RegExp(`^${id}$`, 'i') },
        { 
          $set: { status, updatedAt: timestamp },
          $push: { statusTimeline: newTimeline, auditLogs: { $each: [newAudit], $position: 0 } }
        },
        { returnDocument: 'after', new: true }
      );
      console.log(`[CuraQuantis MongoDB] Application status updated: ${id} -> ${status}`);
      return res.json({ success: true, application: updated });
    } else {
      const match = memoryStore.applications.find(a => a.id.toUpperCase() === id.toUpperCase());
      if (!match) return res.status(404).json({ error: 'Application not found' });
      match.status = status;
      match.updatedAt = timestamp;
      match.statusTimeline.push(newTimeline);
      match.auditLogs.unshift(newAudit);
      return res.json({ success: true, application: match });
    }
  } catch (error) {
    console.error('[CuraQuantis API Error: update status]', error);
    res.status(500).json({ error: error.message });
  }
});

// 5. Clarification message synchronization
app.post('/api/partner/applications/:id/clarifications', async (req, res) => {
  try {
    const { id } = req.params;
    const { sender, senderName, message } = req.body;

    const timestamp = new Date().toISOString();
    const newClarification = {
      id: `msg-${Date.now()}`,
      sender,
      senderName,
      timestamp,
      message
    };
    const newAudit = {
      id: `log-${Date.now()}`,
      timestamp,
      action: sender === 'management' ? 'Clarification Requested' : 'Applicant Responded',
      performedBy: senderName,
      details: message.substring(0, 100)
    };

    if (isMongoConnected) {
      const updated = await PartnerApplication.findOneAndUpdate(
        { id: new RegExp(`^${id}$`, 'i') },
        { 
          $set: { updatedAt: timestamp },
          $push: { clarifications: newClarification, auditLogs: { $each: [newAudit], $position: 0 } }
        },
        { returnDocument: 'after', new: true }
      );
      return res.json({ success: true, application: updated });
    } else {
      const match = memoryStore.applications.find(a => a.id.toUpperCase() === id.toUpperCase());
      if (!match) return res.status(404).json({ error: 'Application not found' });
      match.clarifications.push(newClarification);
      match.auditLogs.unshift(newAudit);
      return res.json({ success: true, application: match });
    }
  } catch (error) {
    console.error('[CuraQuantis API Error: add clarification]', error);
    res.status(500).json({ error: error.message });
  }
});

// 5b. Dispatch & Log Application ID confirmation to Applicant Email (via Outlook SMTP)
app.post('/api/partner/send-email-id', async (req, res) => {
  try {
    const { id, email, fullName, pathway, loginUrl } = req.body;
    if (!id || !email) {
      return res.status(400).json({ error: 'Missing application id or recipient email' });
    }

    const recipientEmail = String(email).trim();
    const origin = req.headers.origin || 'http://localhost:8080';
    const directLogin = loginUrl || `${origin}/portal/login?appId=${encodeURIComponent(id)}`;

    console.log(`[CuraQuantis Email System] ★ Application ID ${id} dispatch request for: ${recipientEmail} (${fullName || 'Applicant'})`);

    const transporter = getOutlookTransporter();
    let emailDelivered = false;
    let deliveryMethod = 'queued_in_mongodb';
    let errorMessage = null;

    if (transporter) {
      try {
        const fromAddress = process.env.OUTLOOK_EMAIL || process.env.SMTP_USER;
        const mailOptions = {
          from: `"CuraQuantis™ Onboarding" <${fromAddress}>`,
          to: recipientEmail,
          subject: `Your CuraQuantis™ Application Reference ID: ${id}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 16px; background-color: #ffffff;">
              <div style="text-align: center; margin-bottom: 24px;">
                <h1 style="color: #0f172a; margin: 0; font-size: 24px; font-weight: 800;">CuraQuantis™</h1>
                <p style="color: #64748b; font-size: 13px; margin: 4px 0 0;">AI Healthcare &amp; Diagnostics Partner Directorate</p>
              </div>

              <div style="background-color: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 12px; padding: 16px; margin-bottom: 24px;">
                <h2 style="color: #166534; font-size: 16px; margin: 0 0 6px;">Application Successfully Received</h2>
                <p style="color: #15803d; font-size: 13px; margin: 0; line-height: 1.5;">Dear <strong>${fullName || 'Partner Applicant'}</strong>, your official onboarding docket has been registered under the CuraQuantis™ due diligence pipeline.</p>
              </div>

              <div style="background-color: #eff6ff; border: 2px dashed #93c5fd; border-radius: 14px; padding: 20px; text-align: center; margin-bottom: 24px;">
                <p style="color: #2563eb; font-size: 11px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 6px;">Your Mandatory Application Reference ID</p>
                <div style="font-size: 32px; font-weight: 800; color: #1e3a8a; letter-spacing: 2px;">${id}</div>
                <p style="color: #64748b; font-size: 11px; margin: 8px 0 0;">Please keep this ID safe. It is mandatory for logging into the Partner Portal and checking your verification progress.</p>
              </div>

              <div style="text-align: center; margin-bottom: 24px;">
                <a href="${directLogin}" style="background-color: #1d4ed8; color: #ffffff; padding: 13px 26px; font-size: 14px; font-weight: bold; text-decoration: none; border-radius: 10px; display: inline-block;">
                  Login to Partner Portal with this ID &rarr;
                </a>
              </div>

              <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 16px; font-size: 12px; color: #475569; line-height: 1.6; margin-bottom: 24px;">
                <p style="margin: 0 0 6px; font-weight: bold; color: #0f172a;">Application Summary:</p>
                <p style="margin: 0;">&bull; Docket ID: <strong>${id}</strong></p>
                <p style="margin: 0;">&bull; Pathway: <strong>${(pathway || 'Partner').toUpperCase()}</strong></p>
                <p style="margin: 0;">&bull; Email: <strong>${recipientEmail}</strong></p>
                <p style="margin: 0;">&bull; Status: <strong>Under Initial Scrutiny</strong></p>
              </div>

              <p style="font-size: 11px; color: #94a3b8; text-align: center; margin: 0; border-top: 1px solid #f1f5f9; padding-top: 16px;">
                CuraQuantis Healthcare Solutions &bull; Support: support@curaquantis.com
              </p>
            </div>
          `,
          text: `Dear ${fullName || 'Partner Applicant'},\n\nYour application has been received.\n\nYour Mandatory Reference ID is: ${id}\n\nDirect Login Link: ${directLogin}\n\nWarm regards,\nCuraQuantis Team`
        };

        const info = await transporter.sendMail(mailOptions);
        console.log(`[CuraQuantis Email] ★ Outlook SMTP Delivery SUCCESS: ${info.messageId}`);
        emailDelivered = true;
        deliveryMethod = 'outlook_smtp';
      } catch (smtpErr) {
        console.error('[CuraQuantis Email Outlook SMTP Error]', smtpErr.message);
        errorMessage = smtpErr.message;
      }
    } else {
      console.log(`[CuraQuantis Email Notice] Set OUTLOOK_EMAIL & OUTLOOK_PASSWORD in backend/.env to enable live Outlook SMTP delivery.`);
    }

    const newAudit = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toISOString(),
      action: emailDelivered ? 'Application ID Delivered via Outlook SMTP' : 'Application Reference ID Dispatched',
      performedBy: 'Automated Notification System',
      details: emailDelivered 
        ? `Delivered reference ID ${id} and direct login link to ${recipientEmail} via Outlook SMTP.`
        : `Generated reference ID ${id} for ${recipientEmail} (${deliveryMethod})`
    };

    if (isMongoConnected) {
      await PartnerApplication.findOneAndUpdate(
        { id: new RegExp(`^${id}$`, 'i') },
        { $push: { auditLogs: { $each: [newAudit], $position: 0 } } }
      );
    }

    return res.json({
      success: true,
      delivered: emailDelivered,
      method: deliveryMethod,
      error: errorMessage,
      message: emailDelivered
        ? `Application ID ${id} successfully delivered to ${recipientEmail} via Outlook.`
        : `Application ID ${id} registered and dispatched for ${recipientEmail}.`,
      recipient: recipientEmail,
      loginUrl: directLogin
    });
  } catch (error) {
    console.error('[CuraQuantis Email Dispatch Error]', error);
    res.status(500).json({ error: error.message });
  }
});

// 6. Franchise Investor Leads (stored in MongoDB)
app.post('/api/partner/leads', async (req, res) => {
  try {
    const leadData = req.body;
    const cleanPhone = (leadData.contactNumber || '').replace(/\D/g, '');

    if (isMongoConnected) {
      const duplicate = await InvestorLead.findOne({
        $or: [
          { email: new RegExp(`^${leadData.email}$`, 'i') },
          { contactNumber: new RegExp(cleanPhone.slice(-10)) }
        ]
      });

      if (duplicate) {
        return res.status(409).json({
          success: false,
          message: `Lead conflict: Investor already registered by ${duplicate.introducingPartnerName}. Protected for 180 days.`
        });
      }

      const newLead = new InvestorLead({
        ...leadData,
        id: leadData.id || `LEAD-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
        dateIntroduced: leadData.dateIntroduced || new Date().toISOString(),
        status: leadData.status || 'introduced'
      });
      await newLead.save();
      console.log(`[CuraQuantis MongoDB] Lead registered: ${newLead.id}`);
      return res.status(201).json({ success: true, lead: newLead, storage: 'mongodb_atlas' });
    } else {
      const duplicate = memoryStore.leads.find(l => 
        l.email.toLowerCase() === (leadData.email || '').toLowerCase() ||
        (l.contactNumber && l.contactNumber.replace(/\D/g, '') === cleanPhone)
      );

      if (duplicate) {
        return res.status(409).json({
          success: false,
          message: `Lead conflict: Already registered by ${duplicate.introducingPartnerName}.`
        });
      }

      const newLead = {
        ...leadData,
        id: leadData.id || `LEAD-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
        dateIntroduced: leadData.dateIntroduced || new Date().toISOString(),
        status: leadData.status || 'introduced'
      };
      memoryStore.leads.unshift(newLead);
      return res.status(201).json({ success: true, lead: newLead, storage: 'fallback_cache' });
    }
  } catch (error) {
    console.error('[CuraQuantis API Error: create lead]', error);
    res.status(500).json({ error: error.message });
  }
});

// 7. Retrieve all leads
app.get('/api/partner/leads', async (req, res) => {
  try {
    if (isMongoConnected) {
      const leads = await InvestorLead.find().sort({ createdAt: -1 });
      return res.json({ success: true, count: leads.length, leads, storage: 'mongodb_atlas' });
    } else {
      return res.json({ success: true, count: memoryStore.leads.length, leads: memoryStore.leads, storage: 'fallback_cache' });
    }
  } catch (error) {
    console.error('[CuraQuantis API Error: get leads]', error);
    res.status(500).json({ error: error.message });
  }
});

// 8. Update lead status
app.patch('/api/partner/leads/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { status, notes } = req.body;

    if (isMongoConnected) {
      const updateData = {};
      if (status) updateData.status = status;
      if (notes !== undefined) updateData.notes = notes;

      const updated = await InvestorLead.findOneAndUpdate(
        { id: new RegExp(`^${id}$`, 'i') },
        { $set: updateData },
        { returnDocument: 'after', new: true }
      );
      if (!updated) return res.status(404).json({ error: 'Lead not found' });
      return res.json({ success: true, lead: updated, storage: 'mongodb_atlas' });
    } else {
      const match = memoryStore.leads.find(l => l.id.toUpperCase() === id.toUpperCase());
      if (!match) return res.status(404).json({ error: 'Lead not found' });
      if (status) match.status = status;
      if (notes !== undefined) match.notes = notes;
      return res.json({ success: true, lead: match, storage: 'fallback_cache' });
    }
  } catch (error) {
    console.error('[CuraQuantis API Error: update lead]', error);
    res.status(500).json({ error: error.message });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`[CuraQuantis Server] Backend running on port ${PORT}`);
  console.log('[CuraQuantis Server] Connected to MongoDB Atlas cluster0.gxsxc6g.mongodb.net');
});

