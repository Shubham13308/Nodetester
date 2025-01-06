const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const MemberName = require('./models/MemberName');

const app = express();
const port = process.env.PORT ;
const MONGO_URI = process.env.MONGO_DB_URI;
const cors = require('cors');
app.use(cors());

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));


app.get('/', async (req, res) => {
    try {
        const members = await MemberName.find(); 
        console.log(members)
        res.json(members); 
    } catch (error) {
        console.error('Error fetching members:', error);
        res.status(500).json({ error: 'Failed to fetch members' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
