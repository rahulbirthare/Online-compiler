// server/server.js
const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();

// Serve static files from the public folder
app.use(express.static(path.join(__dirname, '..', 'public')));

// Middleware to parse JSON requests
app.use(express.json());

// JDoodle credentials
const JDoodleClientID = '4c82e7a067daef55a5c5a14b1e65d945';
const JDoodleClientSecret = '26fbcb90d36d7c5e9fe3f8e35fe88db77f4e06c7febe738e56e5d12ce6577e8';

// API endpoint to execute code
app.post('/execute', async (req, res) => {
  const { language, code } = req.body;

  const body = {
    clientId: JDoodleClientID,
    clientSecret: JDoodleClientSecret,
    script: code,
    language: language,
    versionIndex: '0',
  };

  try {
    const response = await axios.post('https://api.jdoodle.com/v1/execute', body);
    res.json(response.data);
  } catch (error) {
    console.error('JDoodle API error:', error);
    res.status(500).json({ error: 'JDoodle API error' });
  }
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
