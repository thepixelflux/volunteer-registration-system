const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); // Loads our private keys from the .env file

// Load our Volunteer data structure model
require('./models/Volunteer');

const app = express();

// Middleware tools
app.use(cors());          // Gives our frontend permission to pass data across ports
app.use(express.json());  // Allows our server to read incoming JSON form data

// Connect our server to the MongoDB Atlas Cloud Cluster
mongoose.connect(process.env.MONGODB_URI, {
  family: 4
})
.then(() => {
  console.log("MongoDB Connected");
})
.catch(err => {
  console.error(err);
});

// --- BACKEND API ROUTES ---

// Route 1: POST route matching your frontend App.jsx form submission
app.post('/api/volunteers', async (req, res) => {
    try {
        // Destructure the exact field keys coming from your React frontend form
        const { fullName, email, phone, role, skills } = req.body;
        const Volunteer = mongoose.model('Volunteer');

        // Create the new document block using your model blueprint
        const newVolunteer = new Volunteer({ 
            fullName, 
            email, 
            phone, 
            role, 
            skills 
        });
        
        await newVolunteer.save(); // Pushes data up to your cloud cluster database

        res.status(201).json({ message: "Registration successful!", data: newVolunteer });
    } catch (error) {
        console.error("Database Save Error:", error);
        res.status(400).json({ message: "Registration failed. Email might already be registered." });
    }
});

// Route 2: GET route to fetch all records for our Admin Dashboard table
app.get('/api/volunteers', async (req, res) => {
    try {
        const Volunteer = mongoose.model('Volunteer');
        const volunteers = await Volunteer.find().sort({ registrationDate: -1 }); // Newest entries first
        res.status(200).json(volunteers);
    } catch (error) {
        res.status(500).json({ error: "Server error while fetching database records." });
    }
});

// Start listening on Port 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is actively running on http://localhost:${PORT}`);
});