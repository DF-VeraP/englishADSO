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

// Database
const prisma = require('./config/db');

// Basic Route
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'SPEAKSOFT API is running' });
});

// DB Status Route
app.get('/api/db-status', async (req, res) => {
    try {
        // Test connection using Prisma
        await prisma.$queryRaw`SELECT 1`;
        res.json({ status: 'connected', orm: 'Prisma' });
    } catch (err) {
        console.error('Prisma Connection Error:', err);
        res.status(500).json({ status: 'error', message: err.message });
    }
});

// API Routes
app.use('/api/auth', authRoutes);

// Start Server
app.listen(PORT, () => {
    console.log(`\n🚀 SPEAKSOFT server running on: http://localhost:${PORT}`);
    console.log(`📂 Serving static files from: ${path.join(__dirname, '../public')}\n`);
});
