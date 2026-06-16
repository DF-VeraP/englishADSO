class AuthService {
    constructor(baseUrl = '/api/auth') {
        this.baseUrl = baseUrl;
    }

    async login(email, password, role) {
        const response = await fetch(`${this.baseUrl}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password, role }),
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || 'Error al iniciar sesión');
        return data;
    }

    saveSession(token, user, remember = false) {
        const storage = remember ? localStorage : sessionStorage;
        storage.setItem('token', token);
        storage.setItem('user', JSON.stringify(user));
    }

    logout() {
        ['token', 'user'].forEach(k => {
            localStorage.removeItem(k);
            sessionStorage.removeItem(k);
        });
    }
}

window.AuthService = AuthService;
