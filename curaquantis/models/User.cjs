const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true, index: true },
  email: { type: String, required: true, unique: true, index: true, lowercase: true, trim: true },
  passwordHash: { type: String, required: true },
  fullName: { type: String, required: true },
  role: { 
    type: String, 
    enum: ['admin', 'partner', 'applicant'], 
    default: 'applicant',
    index: true 
  },
  associatedAppId: { 
    type: String, 
    index: true // Links strictly to their CQ-2026-XXXXXX docket
  },
  mobile: { type: String },
  department: { type: String }, // For admin: 'Executive Board', 'Scrutiny Team', 'Legal'
  isActive: { type: Boolean, default: true },
  lastLoginAt: { type: String }
}, {
  timestamps: true,
  collection: 'users'
});

module.exports = mongoose.model('User', UserSchema);
