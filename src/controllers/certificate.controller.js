const PDFDocument = require('pdfkit');
const { prisma }  = require('../config/db');

const generate = async (req, res) => {
    const aprendizId = req.user.id;
    const cursoId    = Number(req.params.cursoId);

    try {
        const inscripcion = await prisma.inscripcion.findUnique({
            where: { aprendizId_cursoId: { aprendizId, cursoId } },
            include: {
                aprendiz: { select: { nombre_usuario: true, correo_usuario: true } },
                curso:    { select: { titulo: true, nivel: true, instructor: { select: { nombre_usuario: true } } } },
            },
        });

        if (!inscripcion) {
            return res.status(404).json({ message: 'No estás inscrito en este curso.' });
        }

        if (inscripcion.progreso < 80) {
            return res.status(403).json({
                message: `Debes completar al menos el 80% del curso para obtener el certificado. Progreso actual: ${Math.round(inscripcion.progreso)}%.`,
            });
        }

        const nombre   = inscripcion.aprendiz.nombre_usuario || inscripcion.aprendiz.correo_usuario;
        const curso    = inscripcion.curso.titulo;
        const nivel    = inscripcion.curso.nivel || '';
        const instructor = inscripcion.curso.instructor?.nombre_usuario || 'SPEAKSOFT';
        const fecha    = new Date().toLocaleDateString('es-CO', { year: 'numeric', month: 'long', day: 'numeric' });
        const progreso = Math.round(inscripcion.progreso);

        const doc = new PDFDocument({ size: 'A4', layout: 'landscape', margin: 0 });

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename="certificado_${cursoId}.pdf"`);
        doc.pipe(res);

        // Fondo
        doc.rect(0, 0, doc.page.width, doc.page.height).fill('#0f172a');

        // Borde decorativo
        doc.rect(20, 20, doc.page.width - 40, doc.page.height - 40)
           .lineWidth(2).stroke('#1a56db');
        doc.rect(25, 25, doc.page.width - 50, doc.page.height - 50)
           .lineWidth(0.5).stroke('#0891b2');

        // Encabezado
        doc.fillColor('#1a56db')
           .fontSize(11).font('Helvetica-Bold')
           .text('SPEAKSOFT', 0, 55, { align: 'center', characterSpacing: 8 });

        doc.fillColor('#94a3b8')
           .fontSize(9).font('Helvetica')
           .text('Plataforma de inglés para el sector salud — SENA', 0, 75, { align: 'center' });

        // Línea decorativa
        doc.moveTo(180, 100).lineTo(doc.page.width - 180, 100)
           .lineWidth(1).stroke('#1a56db');

        // Título certificado
        doc.fillColor('#ffffff')
           .fontSize(28).font('Helvetica-Bold')
           .text('CERTIFICADO DE', 0, 125, { align: 'center' });

        doc.fillColor('#22d3ee')
           .fontSize(32).font('Helvetica-Bold')
           .text('LOGRO ACADÉMICO', 0, 158, { align: 'center', characterSpacing: 2 });

        // Cuerpo
        doc.fillColor('#94a3b8')
           .fontSize(12).font('Helvetica')
           .text('Se certifica que', 0, 215, { align: 'center' });

        doc.fillColor('#ffffff')
           .fontSize(26).font('Helvetica-Bold')
           .text(nombre, 0, 235, { align: 'center' });

        doc.fillColor('#94a3b8')
           .fontSize(12).font('Helvetica')
           .text('completó satisfactoriamente el curso', 0, 275, { align: 'center' });

        doc.fillColor('#22d3ee')
           .fontSize(18).font('Helvetica-Bold')
           .text(`"${curso}"`, 0, 295, { align: 'center' });

        if (nivel) {
            doc.fillColor('#60a5fa')
               .fontSize(10).font('Helvetica')
               .text(`Nivel: ${nivel.charAt(0).toUpperCase() + nivel.slice(1)}  ·  Progreso: ${progreso}%`, 0, 325, { align: 'center' });
        }

        // Línea
        doc.moveTo(180, 360).lineTo(doc.page.width - 180, 360)
           .lineWidth(0.5).stroke('#334155');

        // Firmas
        const col1 = 150, col2 = doc.page.width - 150;
        const yFirma = 385;

        doc.fillColor('#ffffff').fontSize(10).font('Helvetica-Bold')
           .text(instructor, col1 - 80, yFirma, { width: 160, align: 'center' });
        doc.fillColor('#94a3b8').fontSize(8).font('Helvetica')
           .text('Instructor del curso', col1 - 80, yFirma + 16, { width: 160, align: 'center' });

        doc.fillColor('#ffffff').fontSize(10).font('Helvetica-Bold')
           .text('SPEAKSOFT SENA', col2 - 80, yFirma, { width: 160, align: 'center' });
        doc.fillColor('#94a3b8').fontSize(8).font('Helvetica')
           .text('Plataforma certificadora', col2 - 80, yFirma + 16, { width: 160, align: 'center' });

        // Fecha
        doc.fillColor('#475569').fontSize(8).font('Helvetica')
           .text(`Emitido el ${fecha}`, 0, doc.page.height - 45, { align: 'center' });

        // Cruz médica decorativa (esquinas)
        const crossColor = '#1e3a5f';
        [[ 50, 50 ], [ doc.page.width - 70, 50 ], [ 50, doc.page.height - 70 ], [ doc.page.width - 70, doc.page.height - 70 ]].forEach(([x, y]) => {
            doc.rect(x - 3, y - 10, 6, 20).fill(crossColor);
            doc.rect(x - 10, y - 3, 20, 6).fill(crossColor);
        });

        doc.end();
    } catch (err) {
        console.error(err);
        if (!res.headersSent) {
            res.status(500).json({ message: 'Error al generar certificado.' });
        }
    }
};

module.exports = { generate };
