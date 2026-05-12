/**
 * AuthService
 * 
 * Principio de Responsabilidad Única (SRP):
 * Esta clase se encarga ÚNICAMENTE de la comunicación con la API para todo lo relacionado con autenticación.
 * No interactúa con el DOM.
 */
class AuthService {
    constructor(baseUrl = '/api/auth') {
        this.baseUrl = baseUrl;
    }

    /**
     * Intenta iniciar sesión con el backend
     * @param {string} email 
     * @param {string} password 
     * @param {string} role
     * @returns {Promise<Object>} Respuesta del servidor
     */
    async login(email, password, role) {
        try {
            const response = await fetch(`${this.baseUrl}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password, role })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Error al iniciar sesión');
            }

            return data;
        } catch (error) {
            // Se propaga el error para que el Controller lo maneje visualmente
            throw error;
        }
    }

    /**
     * Guarda el token en el almacenamiento local
     * @param {string} token 
     * @param {boolean} remember 
     */
    saveSession(token, remember = false) {
        if (remember) {
            localStorage.setItem('speaksoft_token', token);
        } else {
            sessionStorage.setItem('speaksoft_token', token);
        }
    }

    /**
     * Cierra la sesión eliminando los tokens
     */
    logout() {
        localStorage.removeItem('speaksoft_token');
        sessionStorage.removeItem('speaksoft_token');
    }
}

// Exportamos globalmente para uso en módulos estándar o scripts directos
window.AuthService = AuthService;
