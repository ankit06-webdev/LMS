const mongoose = require('mongoose');

const materialSchema = new mongoose.Schema({
  title: String,
  description: String,
  file_url: { type: String, required: true },
  material_type: { type: String, enum: ['notes', 'pyq', 'book'], required: true },
  upload_date: { type: Date, default: Date.now },
  admin_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin' },
  subject_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject' }
});

module.exports = mongoose.model('Material', materialSchema);



