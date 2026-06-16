class CoursesService {
    constructor() {
        this.base = '/api/courses';
    }

    _token() {
        return localStorage.getItem('token') || sessionStorage.getItem('token');
    }

    _headers() {
        return { 'Content-Type': 'application/json', 'Authorization': `Bearer ${this._token()}` };
    }

    async _req(url, opts = {}) {
        const res = await fetch(url, { headers: this._headers(), ...opts });
        const data = await res.json().catch(() => ({}));
        if (!res.ok) throw new Error(data.message || `Error ${res.status}`);
        return data;
    }

    list(params = {}) {
        const qs = new URLSearchParams(params).toString();
        return this._req(`${this.base}${qs ? '?' + qs : ''}`);
    }

    getById(id) { return this._req(`${this.base}/${id}`); }

    create(data) {
        return this._req(this.base, { method: 'POST', body: JSON.stringify(data) });
    }

    update(id, data) {
        return this._req(`${this.base}/${id}`, { method: 'PUT', body: JSON.stringify(data) });
    }

    remove(id) {
        return this._req(`${this.base}/${id}`, { method: 'DELETE' });
    }

    getInstructors() { return this._req(`${this.base}/instructors`); }

    // Módulos
    listModulos(cursoId) { return this._req(`${this.base}/${cursoId}/modules`); }

    createModulo(cursoId, data) {
        return this._req(`${this.base}/${cursoId}/modules`, { method: 'POST', body: JSON.stringify(data) });
    }

    updateModulo(cursoId, id, data) {
        return this._req(`${this.base}/${cursoId}/modules/${id}`, { method: 'PUT', body: JSON.stringify(data) });
    }

    removeModulo(cursoId, id) {
        return this._req(`${this.base}/${cursoId}/modules/${id}`, { method: 'DELETE' });
    }

    // Inscripciones
    listInscripciones(params = {}) {
        const qs = new URLSearchParams(params).toString();
        return this._req(`/api/inscripciones${qs ? '?' + qs : ''}`);
    }

    inscribir(aprendizId, cursoId) {
        return this._req('/api/inscripciones', { method: 'POST', body: JSON.stringify({ aprendizId, cursoId }) });
    }

    updateInscripcion(id, data) {
        return this._req(`/api/inscripciones/${id}`, { method: 'PUT', body: JSON.stringify(data) });
    }

    deleteInscripcion(id) {
        return this._req(`/api/inscripciones/${id}`, { method: 'DELETE' });
    }

    // Aprendices disponibles para inscribir
    listAprendices() {
        return fetch('/api/users?rol=aprendiz', { headers: this._headers() })
            .then(r => r.json());
    }
}
