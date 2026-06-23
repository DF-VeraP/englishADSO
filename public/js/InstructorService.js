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
    static getMisCursos()                          { return this._req('GET',    '/api/instructor/cursos'); }
    static crearCurso(data)                        { return this._req('POST',   '/api/instructor/cursos', data); }
    static actualizarCurso(id, data)               { return this._req('PUT',    `/api/instructor/cursos/${id}`, data); }
    static eliminarCurso(id)                       { return this._req('DELETE', `/api/instructor/cursos/${id}`); }
    static asignarCursoAFicha(fichaId, cursoId)    { return this._req('POST',   `/api/instructor/fichas/${fichaId}/cursos`, { cursoId }); }
    static quitarCursoDeFicha(fichaId, cursoId)    { return this._req('DELETE', `/api/instructor/fichas/${fichaId}/cursos/${cursoId}`); }
}
