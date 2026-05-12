require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// Routes
const authRoutes = require('./routes/auth.routes');

// Basic Route
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'SPEAKSOFT API is running' });
});

// API Routes
app.use('/api/auth', authRoutes);

// Start Server
app.listen(PORT, () => {
    console.log(`\n🚀 SPEAKSOFT server running on: http://localhost:${PORT}`);
    console.log(`📂 Serving static files from: ${path.join(__dirname, '../public')}\n`);
});
