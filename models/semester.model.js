const mongoose = require('mongoose');

const semesterSchema = new mongoose.Schema({
  semester_number: { type: Number, required: true, unique: true }
});

module.exports = mongoose.model('Semester', semesterSchema);

