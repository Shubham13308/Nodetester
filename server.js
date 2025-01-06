const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const fetchdata = require('./routes/userRoutes');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_DB_URI;

app.use(cors());


app.use('/', fetchdata);

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('MongoDB connected');
}).catch(err => {
  console.error('MongoDB connection error:', err.message);
  process.exit(1);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
