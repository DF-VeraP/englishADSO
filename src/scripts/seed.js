require('dotenv').config();
const bcrypt = require('bcrypt');
const db = require('../config/db');

async function seed() {
    try {
        console.log('Cifrando contraseñas y actualizando usuarios...\n');

        const usuarios = [
            { nombre: 'Administrador',      email: 'admin@sena.edu.co',      password: 'admin123',  rol: 'admin'      },
            { nombre: 'Instructor Demo',    email: 'instructor@sena.edu.co', password: 'inst123',   rol: 'instructor' },
            { nombre: 'Aprendiz Demo',      email: 'aprendiz@sena.edu.co',   password: 'aprend123', rol: 'aprendiz'   },
        ];

        for (const u of usuarios) {
            const hash = await bcrypt.hash(u.password, 10);

            await db.query(
                `INSERT INTO usuarios (nombre, email, password, rol)
                 VALUES ($1, $2, $3, $4)
                 ON CONFLICT (email) DO UPDATE SET password = $3, nombre = $1`,
                [u.nombre, u.email, hash, u.rol]
            );

            console.log(`✅ ${u.rol.padEnd(12)} | ${u.email.padEnd(28)} | contraseña: ${u.password}`);
        }

        console.log('\nBase de datos lista.\n');
        process.exit(0);
    } catch (err) {
        console.error('❌ Error en seed:', err.message);
        process.exit(1);
    }
}

seed();
