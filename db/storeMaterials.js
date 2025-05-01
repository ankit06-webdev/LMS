function storeMaterial(){
    const connectDB = require('../conn');
const mongoose = require('mongoose');
const Material = require('../models/material.model');
const Subject = require('../models/subject.model');
const Branch = require('../models/branch.model');
const Semester = require('../models/semester.model');

connectDB().then(async () => {

    // Helper to get subject, branch, and semester IDs
    const getRefs = async (subjectName, branchName, semesterNumber) => {
      const branch = await Branch.findOne({ branch_name: branchName });
      const semester = await Semester.findOne({ semester_number: semesterNumber });
      const subject = await Subject.findOne({ subject_name: subjectName });

      if (!branch || !semester || !subject) throw new Error("One or more references not found");

      return {
        branch_id: branch._id,
        semester_id: semester._id,
        subject_id: subject._id
      };
    };

    // Materials to insert
    const materials = [
      {
        title: "DSA Notes PDF",
        type: "notes",
        file_url: "https://example.com/dsa-notes.pdf",
        subject: "Data Structures",
        branch: "Computer Science and Engineering",
        semester: 3
      },
      {
        title: "OS PYQs 2023",
        type: "pyq",
        file_url: "https://example.com/os-pyq-2023.pdf",
        subject: "Operating Systems",
        branch: "Computer Science and Engineering",
        semester: 4
      },
      {
        title: "Digital Circuits Book",
        type: "book",
        file_url: "https://example.com/dc-book.pdf",
        subject: "Digital Circuits",
        branch: "Electrical Engineering",
        semester: 3
      }
    ];

    const materialDocs = [];
    for (const mat of materials) {
      const refs = await getRefs(mat.subject, mat.branch, mat.semester);
      materialDocs.push({
        title: mat.title,
        material_type: mat.type,
        file_url: mat.file_url,
        subject_id: refs.subject_id,
        branch_id: refs.branch_id,
        semester_id: refs.semester_id
      });
    }

    await Material.insertMany(materialDocs);
    console.log("Materials inserted successfully.");
    process.exit();
  })
  .catch(err => console.error("Material insert error:", err));
}

module.exports = {storeMaterial};