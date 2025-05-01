const mongoose = require('mongoose');

function db(){
    const connectDB = require('../conn');

// Branch

const Branch = require('../models/branch.model'); // Adjust path as needed

connectDB().then(async () => {
    await Branch.insertMany([
      { branch_name: "Computer Science and Engineering" },
      { branch_name: "Electrical Engineering" },
      { branch_name: "Mechanical Engineering" },
      { branch_name: "Metalurgical Engineering" }
    ]);
    console.log("Branches inserted!");
    process.exit();
  })
  .catch(err => console.error("Insertion error:", err));


// Semester

const Semester = require('../models/semester.model'); // Adjust path

connectDB().then(async () => {
    await Semester.insertMany([
      { semester_number: 1 },
      { semester_number: 2 },
      { semester_number: 3 },
      { semester_number: 4 },
      { semester_number: 5 },
      { semester_number: 6 }
    ]);
    console.log("Semesters inserted!");
    process.exit();
  })
  .catch(err => console.error("Insertion error:", err));
}
module.exports = { db };