const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  action: { type: String, required: true },
  entityType: { type: String, enum: ['PROJECT', 'TASK'], required: true },
  entityId: { type: mongoose.Schema.Types.ObjectId, required: true },
  message: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Log', logSchema);