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

    saveSession(token, user, refreshToken, remember = false) {
        const storage = remember ? localStorage : sessionStorage;
        storage.setItem('token', token);
        storage.setItem('user', JSON.stringify(user));
        if (refreshToken) storage.setItem('refreshToken', refreshToken);
    }

    getToken() {
        return localStorage.getItem('token') || sessionStorage.getItem('token');
    }

    getRefreshToken() {
        return localStorage.getItem('refreshToken') || sessionStorage.getItem('refreshToken');
    }

    getUser() {
        const raw = localStorage.getItem('user') || sessionStorage.getItem('user');
        try { return raw ? JSON.parse(raw) : null; } catch { return null; }
    }

    async refreshAccessToken() {
        const refreshToken = this.getRefreshToken();
        if (!refreshToken) throw new Error('Sin refresh token');

        const res = await fetch(`${this.baseUrl}/refresh`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ refreshToken }),
        });
        if (!res.ok) throw new Error('Sesión expirada');

        const data = await res.json();
        const storage = localStorage.getItem('token') ? localStorage : sessionStorage;
        storage.setItem('token', data.token);
        storage.setItem('refreshToken', data.refreshToken);
        return data.token;
    }

    // fetch autenticado que renueva el token automáticamente si expira
    async apiFetch(url, options = {}) {
        let token = this.getToken();
        const doRequest = (t) => fetch(url, {
            ...options,
            headers: { ...options.headers, Authorization: `Bearer ${t}` },
        });

        let res = await doRequest(token);
        if (res.status === 401) {
            try {
                token = await this.refreshAccessToken();
                res = await doRequest(token);
            } catch {
                this.logout();
                window.location.href = '/login.html';
                return;
            }
        }
        return res;
    }

    logout() {
        ['token', 'user', 'refreshToken'].forEach(k => {
            localStorage.removeItem(k);
            sessionStorage.removeItem(k);
        });
    }
}

window.AuthService = AuthService;
