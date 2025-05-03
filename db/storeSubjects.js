function storeSubject() {
    const connectDB = require('../conn');
    const mongoose = require('mongoose');
    const Subject = require('../models/subject.model');
    const Branch = require('../models/branch.model');
    const Semester = require('../models/semester.model');

    connectDB().then(async () => {
        // Helper to find IDs by name/number
        const getRefs = async (branchName, semesterNumber) => {
            const branch = await Branch.findOne({ branch_name: branchName });
            const semester = await Semester.findOne({ semester_number: semesterNumber });

            if (!branch || !semester) throw new Error('Invalid branch or semester');

            return {
                branch_id: branch._id,
                semester_id: semester._id
            };
        };

        // Define subjects with readable names
        const subjects = [
            { name: "Data Structures", code: "CS201", branch: "Computer Science and Engineering", sem: 3 },
            { name: "Operating Systems", code: "CS302", branch: "Computer Science and Engineering", sem: 4 },
            { name: "Digital Circuits", code: "EC204", branch: "Electrical Engineering", sem: 3 }
        ];

        // Convert to actual documents
        const subjectDocs = [];
        for (const sub of subjects) {
            const refs = await getRefs(sub.branch, sub.sem);
            subjectDocs.push({
                subject_name: sub.name,
                subject_code: sub.code,
                branch_id: refs.branch_id,
                semester_id: refs.semester_id
            });
        }

        await Subject.insertMany(subjectDocs);
        console.log("Subjects inserted successfully with resolved references.");
        process.exit();
    })
        .catch(err => console.error("Error inserting subjects:", err));

}

module.exports = { storeSubject };