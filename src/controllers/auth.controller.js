/**
 * Auth Controller
 * 
 * Maneja la lógica de autenticación en el servidor.
 */

const login = async (req, res) => {
    try {
        const { email, password, role } = req.body;

        // Validaciones básicas de backend
        if (!email || !password || !role) {
            return res.status(400).json({ message: 'El correo, la contraseña y el rol son obligatorios.' });
        }

        // TODO: Conectar con la base de datos (PostgreSQL) usando src/config/db.js
        // Por ahora simularemos una respuesta para validar el Frontend
        
        if (email === 'admin@sena.edu.co' && password === 'admin123') {
            // Login exitoso mock
            return res.status(200).json({
                message: `Login exitoso como ${role}`,
                user: {
                    id: 1,
                    email: email,
                    role: role // Devolvemos el rol seleccionado
                },
                token: 'mock_jwt_token_12345'
            });
        } else {
            // Credenciales incorrectas mock
            return res.status(401).json({ message: 'Credenciales incorrectas. (Pista: admin@sena.edu.co / admin123)' });
        }

    } catch (error) {
        console.error('Error en el login:', error);
        res.status(500).json({ message: 'Error interno del servidor.' });
    }
};

module.exports = {
    login
};
