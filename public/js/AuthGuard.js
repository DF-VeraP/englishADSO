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
        ['token', 'user'].forEach(k => {
            localStorage.removeItem(k);
            sessionStorage.removeItem(k);
        });
    }

    static logout() {
        this.clear();
        window.location.replace('/login.html');
    }
}
