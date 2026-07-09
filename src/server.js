require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const helmet = require('helmet');
const { apiLimiter } = require('./middleware/rateLimit');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(helmet({ contentSecurityPolicy: false }));
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use('/api', apiLimiter);
app.use(express.static(path.join(__dirname, '../public')));

const authRoutes           = require('./routes/auth.routes');
const usersRoutes          = require('./routes/users.routes');
const coursesRoutes        = require('./routes/courses.routes');
const inscripcionesRoutes  = require('./routes/inscripciones.routes');
const auditRoutes          = require('./routes/audit.routes');
const notificationsRoutes  = require('./routes/notifications.routes');
const actividadesRoutes    = require('./routes/actividades.routes');
const fichasRoutes         = require('./routes/fichas.routes');
const programasRoutes      = require('./routes/programas.routes');
const instructorRoutes     = require('./routes/instructor.routes');
const dashboardRoutes      = require('./routes/dashboard.routes');
const reportsRoutes        = require('./routes/reports.routes');
const certificateRoutes    = require('./routes/certificate.routes');
const { prisma } = require('./config/db');

app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'SPEAKSOFT API is running' });
});

// DB Status Route
app.get('/api/db-status', async (req, res) => {
    try {
        await prisma.$queryRaw`SELECT 1`;
        res.json({ status: 'connected', orm: 'Prisma' });
    } catch (err) {
        console.error('Prisma Connection Error:', err);
        res.status(500).json({ status: 'error', message: err.message });
    }
});

// API Routes
app.use('/api/auth',           authRoutes);
app.use('/api/users',          usersRoutes);
app.use('/api/courses',        coursesRoutes);
app.use('/api/inscripciones',  inscripcionesRoutes);
app.use('/api/audit',          auditRoutes);
app.use('/api/notifications',  notificationsRoutes);
app.use('/api',                actividadesRoutes);
app.use('/api/fichas',         fichasRoutes);
app.use('/api/programas',      programasRoutes);
app.use('/api/instructor',     instructorRoutes);
app.use('/api/dashboard',      dashboardRoutes);
app.use('/api/reports',        reportsRoutes);
app.use('/api/certificates',   certificateRoutes);

// Start Server
const startServer = async () => {
    try {
        console.log('⏳ Conectando a la base de datos...');
        await prisma.$connect();
        console.log('✅ Base de datos conectada exitosamente.');

        app.listen(PORT, () => {
            console.log(`\n🚀 SPEAKSOFT server running on: http://localhost:${PORT}`);
            console.log(`📂 Serving static files from: ${path.join(__dirname, '../public')}\n`);
        });

        setInterval(() => {}, 1000 * 60 * 60);

    } catch (err) {
        console.error('❌ Error fatal al iniciar el servidor:', err);
        process.exit(1);
    }
};

startServer();
