const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const PartnerApplication = require('./models/PartnerApplication.cjs');
const InvestorLead = require('./models/InvestorLead.cjs');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/curaquantis';

// Middleware
app.use(cors({ origin: '*' }));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// In-memory fallback cache if MongoDB is offline
const memoryStore = {
  applications: [],
  leads: []
};

let isMongoConnected = false;

// Connect to MongoDB
mongoose.connect(MONGODB_URI, {
  serverSelectionTimeoutMS: 5000
}).then(() => {
  isMongoConnected = true;
  console.log(`[MongoDB] Successfully connected to database: ${mongoose.connection.name}`);
}).catch(err => {
  isMongoConnected = false;
  console.warn(`[MongoDB Warning] Could not connect to MongoDB at ${MONGODB_URI}.`);
  console.warn(`[MongoDB Warning] Error: ${err.message}.`);
  console.log(`[MongoDB] Running with in-memory resilient fallback cache.`);
});

mongoose.connection.on('connected', () => { isMongoConnected = true; });
mongoose.connection.on('disconnected', () => { isMongoConnected = false; });

// 1. Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    mongodb: isMongoConnected ? 'connected' : 'disconnected (using fallback cache)',
    databaseUri: MONGODB_URI.replace(/\/\/.*@/, '//***@'),
    timestamp: new Date().toISOString()
  });
});

// 2. Submit / Save application to MongoDB
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
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );
      console.log(`[MongoDB] Application saved successfully: ${saved.id}`);
      return res.status(201).json({ success: true, application: saved, source: 'mongodb' });
    } else {
      const idx = memoryStore.applications.findIndex(a => a.id === appData.id);
      if (idx >= 0) {
        memoryStore.applications[idx] = { ...appData, updatedAt: new Date().toISOString() };
      } else {
        memoryStore.applications.unshift(appData);
      }
      return res.status(201).json({ success: true, application: appData, source: 'fallback_cache' });
    }
  } catch (error) {
    console.error('[API Error: save application]', error);
    res.status(500).json({ error: error.message });
  }
});

// 3. Retrieve all applications for Management Dashboard
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
      return res.json({ success: true, count: list.length, applications: list, source: 'mongodb' });
    } else {
      let filtered = [...memoryStore.applications];
      if (pathway && pathway !== 'all') filtered = filtered.filter(a => a.pathway === pathway);
      if (status && status !== 'all') filtered = filtered.filter(a => a.status === status);
      if (search) {
        const s = search.toLowerCase();
        filtered = filtered.filter(a => 
          a.id.toLowerCase().includes(s) || 
          a.individual.fullName.toLowerCase().includes(s)
        );
      }
      return res.json({ success: true, count: filtered.length, applications: filtered, source: 'fallback_cache' });
    }
  } catch (error) {
    console.error('[API Error: list applications]', error);
    res.status(500).json({ error: error.message });
  }
});

// 4. Retrieve single application by ID
app.get('/api/partner/applications/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (isMongoConnected) {
      const appDoc = await PartnerApplication.findOne({ id: new RegExp(`^${id}$`, 'i') });
      if (!appDoc) {
        return res.status(404).json({ error: `Application ${id} not found` });
      }
      return res.json({ success: true, application: appDoc, source: 'mongodb' });
    } else {
      const match = memoryStore.applications.find(a => a.id.toUpperCase() === id.toUpperCase());
      if (!match) {
        return res.status(404).json({ error: `Application ${id} not found` });
      }
      return res.json({ success: true, application: match, source: 'fallback_cache' });
    }
  } catch (error) {
    console.error('[API Error: get application by id]', error);
    res.status(500).json({ error: error.message });
  }
});

// 5. Update status (Approve, Reject, Interview, Clarify)
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
        { new: true }
      );
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
    console.error('[API Error: update status]', error);
    res.status(500).json({ error: error.message });
  }
});

// 6. Add clarification message
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
        { new: true }
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
    console.error('[API Error: add clarification]', error);
    res.status(500).json({ error: error.message });
  }
});

// 7. Franchise Investor Leads (with duplicate detection)
app.post('/api/partner/leads', async (req, res) => {
  try {
    const leadData = req.body;
    const cleanPhone = leadData.contactNumber.replace(/\D/g, '');

    if (isMongoConnected) {
      // Check for duplicates in MongoDB
      const duplicate = await InvestorLead.findOne({
        $or: [
          { email: new RegExp(`^${leadData.email}$`, 'i') },
          { contactNumber: new RegExp(cleanPhone.slice(-10)) }
        ]
      });

      if (duplicate) {
        return res.status(409).json({
          success: false,
          message: `Lead conflict: This investor was already registered by ${duplicate.introducingPartnerName} on ${new Date(duplicate.dateIntroduced).toLocaleDateString()}. Duplicate claims are locked for 180 days.`
        });
      }

      const newLead = new InvestorLead({
        ...leadData,
        id: `LEAD-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
        dateIntroduced: new Date().toISOString(),
        status: 'introduced'
      });
      await newLead.save();
      return res.status(201).json({ success: true, lead: newLead });
    } else {
      const duplicate = memoryStore.leads.find(l => 
        l.email.toLowerCase() === leadData.email.toLowerCase() ||
        l.contactNumber.replace(/\D/g, '') === cleanPhone
      );

      if (duplicate) {
        return res.status(409).json({
          success: false,
          message: `Lead conflict: Already registered by ${duplicate.introducingPartnerName}.`
        });
      }

      const newLead = {
        ...leadData,
        id: `LEAD-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
        dateIntroduced: new Date().toISOString(),
        status: 'introduced'
      };
      memoryStore.leads.unshift(newLead);
      return res.status(201).json({ success: true, lead: newLead });
    }
  } catch (error) {
    console.error('[API Error: create lead]', error);
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/partner/leads', async (req, res) => {
  try {
    if (isMongoConnected) {
      const leads = await InvestorLead.find().sort({ createdAt: -1 });
      return res.json({ success: true, count: leads.length, leads });
    } else {
      return res.json({ success: true, count: memoryStore.leads.length, leads: memoryStore.leads });
    }
  } catch (error) {
    console.error('[API Error: get leads]', error);
    res.status(500).json({ error: error.message });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`[CuraQuantis Server] Backend API running on port ${PORT}`);
  console.log(`[CuraQuantis Server] MongoDB URI: ${MONGODB_URI}`);
});
