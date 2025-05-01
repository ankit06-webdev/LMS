const mongoose = require('mongoose');
require('dotenv').config();

const mongoURL = process.env.DB_URL;
const connectDB = async () => {
  try {
    // await mongoose.connect('mongodb://localhost:27017/LMS');
    // await mongoose.connect('mongodb+srv://webdeveloperr06:webDev2005@cluster0.rndtz9m.mongodb.net/');
    await mongoose.connect(mongoURL);
    console.log("MongoDB connected.");
  } catch (err) {
    console.error("MongoDB connection error:", err);
  }
};

module.exports = connectDB;