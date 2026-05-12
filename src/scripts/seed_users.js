const { PrismaClient } = require('../generated/client');
const bcrypt = require('bcrypt');
const { PrismaPg } = require('@prisma/adapter-pg');
const { Pool } = require('pg');
require('dotenv').config();

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const password = await bcrypt.hash('123456', 10);

  const users = [
    {
      correo_usuario: 'admin@speaksoft.com',
      passw_usuario: password,
      nombre_usuario: 'Admin User',
      estado_usuario: true,
      rol_usuario: 'admin',
    },
    {
      correo_usuario: 'instructor@speaksoft.com',
      passw_usuario: password,
      nombre_usuario: 'Instructor User',
      estado_usuario: true,
      rol_usuario: 'instructor',
    },
    {
      correo_usuario: 'aprendiz@speaksoft.com',
      passw_usuario: password,
      nombre_usuario: 'Aprendiz User',
      estado_usuario: true,
      rol_usuario: 'aprendiz',
    },
  ];

  console.log('Seed: Creating users...');

  for (const user of users) {
    await prisma.user.upsert({
      where: { correo_usuario: user.correo_usuario },
      update: {},
      create: user,
    });
    console.log(`Created user: ${user.correo_usuario} (${user.rol_usuario})`);
  }

  console.log('Seed: Finished!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
