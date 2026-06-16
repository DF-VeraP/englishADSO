-- CreateTable
CREATE TABLE "usuarios" (
    "id" SERIAL NOT NULL,
    "correo_usuario" VARCHAR(150) NOT NULL,
    "passw_usuario" VARCHAR(255) NOT NULL,
    "nombre_usuario" VARCHAR(100),
    "rol_usuario" VARCHAR(20) NOT NULL,
    "estado_usuario" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "usuarios_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_correo_usuario_key" ON "usuarios"("correo_usuario");
