const express = require('express');
const session = require('express-session');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: process.env.SESSION_SECRET || 'default_secret',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Set to true in production with HTTPS
}));

// Serve static files
app.use(express.static('.'));

// Serve index.html at root
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Login endpoint
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  // Simple authentication (replace with real logic)
  if (email === 'user@example.com' && password === 'password') {
    req.session.isLoggedIn = true;
    res.json({ success: true, message: 'Login successful' });
  } else {
    res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
});

// Logout endpoint
app.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ success: false, message: 'Logout failed' });
    }
    res.json({ success: true, message: 'Logout successful' });
  });
});

// Check login status
app.get('/auth/status', (req, res) => {
  res.json({ isLoggedIn: !!req.session.isLoggedIn });
});

// Groq API integration
app.post('/api/groq', async (req, res) => {
  if (!req.session.isLoggedIn) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  try {
    const response = await axios.post('https://api.groq.com/openai/v1/chat/completions', {
      model: 'llama3-8b-8192', // Example model
      messages: req.body.messages || [{ role: 'user', content: 'Hello' }],
      max_tokens: 150
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Groq API error', details: error.message });
  }
});

// Hindsight API integration (assuming a fictional health API)
app.get('/api/hindsight', async (req, res) => {
  if (!req.session.isLoggedIn) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  try {
    // Assuming Hindsight API endpoint (replace with actual)
    const response = await axios.get('https://api.hindsight.com/health-data', {
      headers: {
        'Authorization': `Bearer ${process.env.HINDSIGHT_API_KEY}`,
        'Content-Type': 'application/json'
      },
      params: req.query
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Hindsight API error', details: error.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});