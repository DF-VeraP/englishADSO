const bcrypt = require('bcrypt');
const { prisma } = require('../config/db');
const transporter = require('../config/mailer');

// { email -> { code, expiresAt, verified, attempts } }
const codeStore = new Map();

const CODE_TTL     = 15 * 60 * 1000; // 15 minutos
const MAX_ATTEMPTS = 5;

function generateCode() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

function emailTemplate(code) {
    return `
    <!DOCTYPE html>
    <html lang="es">
    <head><meta charset="UTF-8"></head>
    <body style="margin:0;padding:0;background:#f1f5f9;font-family:'Outfit',Arial,sans-serif;">
      <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 20px;">
        <tr><td align="center">
          <table width="520" cellpadding="0" cellspacing="0" style="background:#0f172a;border-radius:16px;overflow:hidden;">
            <tr>
              <td style="padding:32px 40px;text-align:center;">
                <p style="margin:0 0 4px;font-size:13px;letter-spacing:4px;color:#94a3b8;text-transform:uppercase;">SPEAKSOFT</p>
                <h1 style="margin:0 0 24px;font-size:20px;font-weight:700;color:#ffffff;">Recuperación de contraseña</h1>
                <p style="margin:0 0 28px;font-size:15px;color:#94a3b8;line-height:1.6;">
                  Usa el siguiente código para restablecer tu contraseña.<br>
                  Expira en <strong style="color:#22d3ee;">15 minutos</strong>.
                </p>
                <div style="background:#1e293b;border:1px solid #334155;border-radius:12px;padding:24px 32px;display:inline-block;margin-bottom:28px;">
                  <span style="font-size:40px;font-weight:800;letter-spacing:14px;color:#ffffff;font-family:monospace;">${code}</span>
                </div>
                <p style="margin:0;font-size:13px;color:#475569;">
                  Si no solicitaste este código, ignora este mensaje.
                </p>
              </td>
            </tr>
            <tr>
              <td style="padding:16px 40px;background:#0e2a50;text-align:center;">
                <p style="margin:0;font-size:12px;color:#475569;">© ${new Date().getFullYear()} SPEAKSOFT — Plataforma de inglés para el sector salud</p>
              </td>
            </tr>
          </table>
        </td></tr>
      </table>
    </body>
    </html>`;
}

/* ── Paso 1: verificar email y enviar código ─────────────── */
const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) return res.status(400).json({ message: 'El correo es obligatorio' });

        const usuario = await prisma.user.findUnique({ where: { correo_usuario: email } });

        if (!usuario || !usuario.estado_usuario) {
            // Respuesta genérica para no revelar si el email existe
            return res.json({ message: 'Si el correo está registrado, recibirás un código' });
        }

        const code = generateCode();
        codeStore.set(email, { code, expiresAt: Date.now() + CODE_TTL, verified: false, attempts: 0 });

        await transporter.sendMail({
            from: `"SPEAKSOFT" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: `${code} es tu código de recuperación — SPEAKSOFT`,
            html: emailTemplate(code),
        });

        res.json({ message: 'Código enviado al correo' });
    } catch (err) {
        console.error('Error en forgotPassword:', err);
        res.status(500).json({ message: 'Error al enviar el correo. Intenta de nuevo.' });
    }
};

/* ── Paso 2: verificar código ────────────────────────────── */
const verifyCode = async (req, res) => {
    try {
        const { email, code } = req.body;
        if (!email || !code) return res.status(400).json({ message: 'Correo y código son obligatorios' });

        const stored = codeStore.get(email);
        if (!stored) return res.status(400).json({ message: 'No hay un código activo para este correo' });

        if (Date.now() > stored.expiresAt) {
            codeStore.delete(email);
            return res.status(400).json({ message: 'El código ha expirado. Solicita uno nuevo.' });
        }

        if (stored.attempts >= MAX_ATTEMPTS) {
            codeStore.delete(email);
            return res.status(429).json({ message: 'Demasiados intentos. Solicita un nuevo código.' });
        }

        if (stored.code !== code.trim()) {
            stored.attempts++;
            const restantes = MAX_ATTEMPTS - stored.attempts;
            return res.status(400).json({
                message: `Código incorrecto. ${restantes} intento${restantes !== 1 ? 's' : ''} restante${restantes !== 1 ? 's' : ''}.`
            });
        }

        stored.verified = true;
        codeStore.set(email, stored);

        res.json({ message: 'Código verificado' });
    } catch (err) {
        console.error('Error en verifyCode:', err);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

/* ── Paso 3: cambiar contraseña ──────────────────────────── */
const resetPassword = async (req, res) => {
    try {
        const { email, code, password } = req.body;
        if (!email || !code || !password) {
            return res.status(400).json({ message: 'Todos los campos son obligatorios' });
        }
        if (password.length < 6) {
            return res.status(400).json({ message: 'La contraseña debe tener al menos 6 caracteres' });
        }

        const stored = codeStore.get(email);
        if (!stored || !stored.verified || stored.code !== code) {
            return res.status(400).json({ message: 'Sesión inválida. Vuelve a verificar el código.' });
        }
        if (Date.now() > stored.expiresAt) {
            codeStore.delete(email);
            return res.status(400).json({ message: 'La sesión ha expirado. Solicita un nuevo código.' });
        }

        await prisma.user.update({
            where: { correo_usuario: email },
            data: { passw_usuario: await bcrypt.hash(password, 10) },
        });

        codeStore.delete(email);
        res.json({ message: 'Contraseña actualizada correctamente' });
    } catch (err) {
        console.error('Error en resetPassword:', err);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

module.exports = { forgotPassword, verifyCode, resetPassword };
