class FichasService {
    static get _headers() {
        const token = AuthGuard.getToken();
        return {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        };
    }

    static async _req(method, url, body) {
        const opts = { method, headers: this._headers };
        if (body) opts.body = JSON.stringify(body);
        const res = await fetch(url, opts);
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || 'Error en la solicitud');
        return data;
    }

    // ── CRUD Fichas ───────────────────────────────────────
    static getAll(params = {}) {
        const qs = new URLSearchParams(params).toString();
        return this._req('GET', `/api/fichas${qs ? '?' + qs : ''}`);
    }
    static getById(id)       { return this._req('GET',    `/api/fichas/${id}`); }
    static create(data)      { return this._req('POST',   '/api/fichas', data); }
    static update(id, data)  { return this._req('PUT',    `/api/fichas/${id}`, data); }
    static remove(id)        { return this._req('DELETE', `/api/fichas/${id}`); }

    // ── Instructores ──────────────────────────────────────
    static asignarInstructor(fichaId, instructorId) {
        return this._req('POST', `/api/fichas/${fichaId}/instructores`, { instructorId });
    }
    static quitarInstructor(fichaId, instructorId) {
        return this._req('DELETE', `/api/fichas/${fichaId}/instructores/${instructorId}`);
    }

    // ── Aprendices ────────────────────────────────────────
    static inscribirAprendiz(fichaId, aprendizId) {
        return this._req('POST', `/api/fichas/${fichaId}/aprendices`, { aprendizId });
    }
    static actualizarEstadoAprendiz(fichaId, aprendizId, estado) {
        return this._req('PATCH', `/api/fichas/${fichaId}/aprendices/${aprendizId}`, { estado });
    }
    static retirarAprendiz(fichaId, aprendizId) {
        return this._req('DELETE', `/api/fichas/${fichaId}/aprendices/${aprendizId}`);
    }

    // ── Programas ─────────────────────────────────────────
    static getProgramas(params = {}) {
        const qs = new URLSearchParams(params).toString();
        return this._req('GET', `/api/programas${qs ? '?' + qs : ''}`);
    }
    static createPrograma(data)     { return this._req('POST',   '/api/programas', data); }
    static updatePrograma(id, data) { return this._req('PUT',    `/api/programas/${id}`, data); }
    static removePrograma(id)       { return this._req('DELETE', `/api/programas/${id}`); }

    // ── Fichas por usuario ────────────────────────────────
    static getFichasDeInstructor(instructorId) {
        return this._req('GET', `/api/fichas/instructor/${instructorId}`);
    }
    static getFichasDeAprendiz(aprendizId) {
        return this._req('GET', `/api/fichas/aprendiz/${aprendizId}`);
    }

    // ── Usuarios (para selectores) ────────────────────────
    static async getInstructores() {
        const token = AuthGuard.getToken();
        const res   = await fetch('/api/users', { headers: { Authorization: `Bearer ${token}` } });
        const users = await res.json();
        return users.filter(u => u.rol_usuario === 'instructor');
    }
    static async getAprendices() {
        const token = AuthGuard.getToken();
        const res   = await fetch('/api/users', { headers: { Authorization: `Bearer ${token}` } });
        const users = await res.json();
        return users.filter(u => u.rol_usuario === 'aprendiz');
    }
}
