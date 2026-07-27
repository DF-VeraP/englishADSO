class InstructorService {
    static getToken() {
        return localStorage.getItem('token') || sessionStorage.getItem('token');
    }

    static _req(method, url, body) {
        return fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.getToken()}`,
            },
            body: body ? JSON.stringify(body) : undefined,
        }).then(async r => {
            const data = await r.json();
            if (!r.ok) throw new Error(data.message || 'Error en la solicitud');
            return data;
        });
    }

    static getMisFichas()                          { return this._req('GET',    '/api/instructor/fichas'); }
    static getProgresoResumen()                    { return this._req('GET',    '/api/instructor/progreso-resumen'); }
    static getMisCursos()                          { return this._req('GET',    '/api/instructor/cursos'); }
    static crearCurso(data)                        { return this._req('POST',   '/api/instructor/cursos', data); }
    static actualizarCurso(id, data)               { return this._req('PUT',    `/api/instructor/cursos/${id}`, data); }
    static eliminarCurso(id)                       { return this._req('DELETE', `/api/instructor/cursos/${id}`); }
    static asignarCursoAFicha(fichaId, cursoId, fechaLimite) { return this._req('POST', `/api/instructor/fichas/${fichaId}/cursos`, { cursoId, fechaLimite: fechaLimite || null }); }
    static actualizarFechaCurso(fichaId, cursoId, fechaLimite) { return this._req('PUT', `/api/instructor/fichas/${fichaId}/cursos/${cursoId}`, { fechaLimite: fechaLimite || null }); }
    static quitarCursoDeFicha(fichaId, cursoId)    { return this._req('DELETE', `/api/instructor/fichas/${fichaId}/cursos/${cursoId}`); }
    static getProgresoFicha(fichaId)               { return this._req('GET',    `/api/instructor/fichas/${fichaId}/progreso`); }
    static getCatalogo()                           { return this._req('GET',    '/api/instructor/catalogo'); }
    static toggleVisibilidad(id, visibilidad)      { return this._req('PATCH',  `/api/instructor/cursos/${id}/visibilidad`, { visibilidad }); }
    static duplicarCurso(id)                       { return this._req('POST',   `/api/instructor/cursos/${id}/duplicar`); }
}
