require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

const authRoutes = require('./routes/auth.routes');

app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'SPEAKSOFT API is running' });
});

app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
    console.log(`\n🚀 SPEAKSOFT server running on: http://localhost:${PORT}`);
    console.log(`📂 Serving static files from: ${path.join(__dirname, '../public')}\n`);
});
