const express = require('express');
const adminRegister = require('../models/adminRegister.model'); // Your model
const router = express.Router();

// POST route for registration
router.post('/signup', async (req, res) => {
    const { name, email, password, confirmPassword } = req.body;

    if (!name || !email || !password || !confirmPassword) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    if (password !== confirmPassword) {
        return res.status(400).json({ error: 'Passwords do not match' });
    }

    const existingUser = await adminRegister.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ error: 'Email is already taken' });
    }

    const newUser = new adminRegister({
        name,
        email,
        password // Plain text password (not recommended for production)
    });

    try {
        await newUser.save();
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error saving user' });
    }
});

module.exports = router;
