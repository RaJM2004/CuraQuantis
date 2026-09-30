const mongoose = require('mongoose');

const InvestorLeadSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true, index: true },
  investorName: { type: String, required: true },
  entityName: { type: String },
  contactNumber: { type: String, required: true, index: true },
  email: { type: String, required: true, index: true },
  territory: { type: String, required: true },
  dateIntroduced: { type: String, default: () => new Date().toISOString() },
  status: { 
    type: String, 
    enum: ['introduced', 'screening', 'due_diligence', 'curaquantis_review', 'approved', 'rejected', 'agreement_signed'],
    default: 'introduced' 
  },
  introducingPartnerId: { type: String, required: true, index: true },
  introducingPartnerName: { type: String, required: true },
  investmentBudget: { type: String },
  notes: { type: String }
}, {
  timestamps: true,
  collection: 'investor_leads'
});

module.exports = mongoose.model('InvestorLead', InvestorLeadSchema);
