require('dotenv').config();
const bcrypt = require('bcrypt');
const { prisma } = require('../config/db');

async function seed() {
    try {
        console.log('Sembrando usuarios...\n');

        const usuarios = [
            { nombre_usuario: 'Administrador',               correo_usuario: 'admin@sena.edu.co',       passw_usuario: 'admin123',  rol_usuario: 'admin'      },
            { nombre_usuario: 'Instructor Demo',             correo_usuario: 'instructor@sena.edu.co',  passw_usuario: 'inst123',   rol_usuario: 'instructor' },
            { nombre_usuario: 'Aprendiz Demo',               correo_usuario: 'aprendiz@sena.edu.co',    passw_usuario: 'aprend123', rol_usuario: 'aprendiz'   },
            { nombre_usuario: 'Ibsen Alexis Soto Artunduaga', correo_usuario: 'ibsensotart23@gmail.com', passw_usuario: 'admin123',  rol_usuario: 'admin'      },
        ];

        for (const u of usuarios) {
            const hash = await bcrypt.hash(u.passw_usuario, 10);
            await prisma.user.upsert({
                where:  { correo_usuario: u.correo_usuario },
                update: { nombre_usuario: u.nombre_usuario, passw_usuario: hash, rol_usuario: u.rol_usuario, estado_usuario: true },
                create: { nombre_usuario: u.nombre_usuario, correo_usuario: u.correo_usuario, passw_usuario: hash, rol_usuario: u.rol_usuario },
            });
            console.log(`✅ ${u.rol_usuario.padEnd(12)} | ${u.correo_usuario.padEnd(30)} | contraseña: ${u.passw_usuario}`);
        }

        console.log('\nBase de datos lista.\n');
        process.exit(0);
    } catch (err) {
        console.error('❌ Error en seed:', err.message);
        process.exit(1);
    }
}

seed();
