const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const MemberName = require('./models/MemberName');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_DB_URI;

let isConnected = false;

app.use(cors());

// MongoDB connection
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  isConnected = true;
  console.log('MongoDB connected');
}).catch(err => {
  console.error('MongoDB connection error:', err.message);
  process.exit(1);
});

app.get('/', async (req, res) => {
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

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
