const express = require('express')
const mongoose = require('mongoose');
const db = require('./db/db');
require('dotenv').config();
const storeSubject = require('./db/storeSubjects');
const storeMaterial = require('./db/storeMaterials');
const Branch = require('./models/branch.model');
const Semester = require('./models/semester.model');
const Subject = require('./models/subject.model');
const Material = require('./models/material.model');
const connectDB = require('./conn');

connectDB();

const app = express()

app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.render('index');
})
app.get('/signup', (req, res) => {
    res.send('<h1>signUp</h1>');
})

app.get('/notes', async (req, res) => {
    const branchName = req.query.branch;
    const semesterNumber = parseInt(req.query.semester);
    const subjectName = req.query.subject;

    if (!branchName || isNaN(semesterNumber)) {
        return res.render('notesForm', { subjects: [], materials: [], selectedSubject: null });
    }

    try {
        const branch = await Branch.findOne({ branch_name: branchName });
        const semester = await Semester.findOne({ semester_number: semesterNumber });

        if (!branch || !semester) {
            return res.render('notesForm', { subjects: [], materials: [], selectedSubject: null });
        }

        const subjects = await Subject.find({
            branch_id: branch._id,
            semester_id: semester._id
        });

        let materials = [];

        if (subjectName) {
            const subject = await Subject.findOne({
                subject_name: subjectName,
                branch_id: branch._id,
                semester_id: semester._id
            });

            if (subject) {
                materials = await Material.find({ subject_id: subject._id });
            }
        }

        res.render('notesForm', { subjects, materials, selectedSubject: subjectName });
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
});



app.get('/get-subjects', async (req, res) => {
    const branchName = req.query.branch;
    const semesterNumber = parseInt(req.query.semester);

    if (!branchName || isNaN(semesterNumber)) {
        return res.json([]);
    }

    try {
        const branch = await Branch.findOne({ branch_name: branchName });
        const semester = await Semester.findOne({ semester_number: semesterNumber });

        if (!branch || !semester) {
            return res.json([]);
        }

        const subjects = await Subject.find({
            branch_id: branch._id,
            semester_id: semester._id
        });

        res.json(subjects);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
    // db.db();
    // storeSubject.storeSubject();
    // storeMaterial.storeMaterial();
    
})