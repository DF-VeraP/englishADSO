const { prisma } = require('../config/db');
const transporter = require('../config/mailer');

async function send({ tipo, asunto, mensaje, destinatarioId, enviarEmail = false }) {
    const notif = await prisma.notificacion.create({
        data: { tipo, asunto, mensaje, destinatarioId, enviadoPorEmail: enviarEmail },
    });

    if (enviarEmail) {
        try {
            const usuario = await prisma.user.findUnique({ where: { id: destinatarioId } });
            if (usuario) {
                await transporter.sendMail({
                    from: `"SPEAKSOFT" <${process.env.EMAIL_USER}>`,
                    to:   usuario.correo_usuario,
                    subject: asunto,
                    html: emailTemplate(asunto, mensaje, usuario.nombre_usuario),
                });
            }
        } catch (err) {
            console.error('[notification] Error al enviar email:', err.message);
        }
    }

    return notif;
}

async function sendToRole({ tipo, asunto, mensaje, rol, enviarEmail = false }) {
    const usuarios = await prisma.user.findMany({
        where: { rol_usuario: rol, estado_usuario: true },
    });
    return Promise.all(usuarios.map(u =>
        send({ tipo, asunto, mensaje, destinatarioId: u.id, enviarEmail })
    ));
}

function emailTemplate(asunto, mensaje, nombre) {
    return `<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8"></head>
    <body style="margin:0;padding:0;background:#f1f5f9;font-family:Arial,sans-serif;">
      <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 20px;">
        <tr><td align="center">
          <table width="520" cellpadding="0" cellspacing="0" style="background:#0f172a;border-radius:16px;">
            <tr><td style="padding:32px 40px;text-align:center;">
              <p style="margin:0 0 4px;font-size:12px;letter-spacing:4px;color:#94a3b8;text-transform:uppercase;">SPEAKSOFT</p>
              <h2 style="margin:0 0 16px;color:#fff;font-size:18px;">${asunto}</h2>
              ${nombre ? `<p style="color:#94a3b8;margin:0 0 20px">Hola, <strong style="color:#fff">${nombre}</strong></p>` : ''}
              <div style="background:#1e293b;border-radius:10px;padding:20px;text-align:left;color:#cbd5e1;font-size:14px;line-height:1.6">${mensaje}</div>
            </td></tr>
            <tr><td style="padding:16px 40px;background:#0e2a50;text-align:center;">
              <p style="margin:0;font-size:12px;color:#475569;">© ${new Date().getFullYear()} SPEAKSOFT — SENA</p>
            </td></tr>
          </table>
        </td></tr>
      </table></body></html>`;
}

module.exports = { send, sendToRole };
