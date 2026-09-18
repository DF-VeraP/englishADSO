class AuthGuard {
    static getToken() {
        return localStorage.getItem('token') || sessionStorage.getItem('token');
    }

    static getUser() {
        try {
            return JSON.parse(localStorage.getItem('user') || sessionStorage.getItem('user') || 'null');
        } catch { return null; }
    }

    static parseToken() {
        const token = this.getToken();
        if (!token) return null;
        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            if (payload.exp && payload.exp * 1000 < Date.now()) {
                this.clear();
                return null;
            }
            return payload;
        } catch { return null; }
    }

    static requireAuth(allowedRoles = null) {
        const payload = this.parseToken();
        if (!payload) {
            window.location.replace('/login.html');
            return null;
        }
        if (allowedRoles && !allowedRoles.includes(payload.rol)) {
            window.location.replace('/index.html');
            return null;
        }
        return payload;
    }

    static redirectIfAuth() {
        const payload = this.parseToken();
        if (payload) window.location.replace('/index.html');
    }

    static clear() {
        ['token', 'user', 'refreshToken'].forEach(k => {
            localStorage.removeItem(k);
            sessionStorage.removeItem(k);
        });
    }

    static logout() {
        this.clear();
        window.location.replace('/login.html');
    }

    // ── Renovación de token ─────────────────────────────────
    static _refreshTokenValue() {
        return localStorage.getItem('refreshToken') || sessionStorage.getItem('refreshToken');
    }

    // Renueva el access token usando el refresh token. Devuelve true si lo logró.
    static async refresh() {
        const refreshToken = this._refreshTokenValue();
        if (!refreshToken) return false;
        try {
            const r = await fetch('/api/auth/refresh', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ refreshToken }),
            });
            if (!r.ok) return false;
            const d = await r.json();
            const storage = localStorage.getItem('token') ? localStorage : sessionStorage;
            storage.setItem('token', d.token);
            if (d.refreshToken) storage.setItem('refreshToken', d.refreshToken);
            return true;
        } catch { return false; }
    }

    // fetch autenticado: si el token expiró (401), lo refresca y reintenta 1 vez.
    static async apiFetch(url, opts = {}) {
        const build = () => ({
            ...opts,
            headers: {
                'Content-Type': 'application/json',
                ...(opts.headers || {}),
                Authorization: `Bearer ${this.getToken()}`,
            },
        });

        let res = await fetch(url, build());
        if (res.status === 401) {
            if (await this.refresh()) {
                res = await fetch(url, build());
            } else {
                this.logout();
                throw new Error('Tu sesión expiró. Vuelve a iniciar sesión.');
            }
        }
        return res;
    }
}
