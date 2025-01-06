const express = require('express');
const router = express.Router();
const MemberName = require('../models/MemberName'); // Ensure correct path

// Define the route to fetch members
router.get('/', async (req, res) => {
  try {
    console.log("Fetching members...");
    const members = await MemberName.find();
    console.log("Members fetched:", members);
    res.json(members); 
  } catch (error) {
    console.error('Error fetching members:', error);
    res.status(500).json({ error: 'Failed to fetch members' });
  }
});

module.exports = router;
