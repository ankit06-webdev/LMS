const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
  subject_name: { type: String, required: true },
  subject_code: { type: String, required: true, unique: true },
  semester_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Semester' },
  branch_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Branch' }
});

module.exports = mongoose.model('Subject', subjectSchema);


