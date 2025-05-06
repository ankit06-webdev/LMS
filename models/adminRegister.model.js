const mongoose = require('mongoose');

const adminRegisterSchema = new mongoose.Schema({
  admin_id: {
    type: mongoose.Schema.Types.ObjectId,
    auto: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  registered_at: {
    type: Date,
    default: Date.now
  },
  registered_ip: {
    type: String
  }
});

module.exports = mongoose.model('adminRegister', adminRegisterSchema);
