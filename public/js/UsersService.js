class UsersService {
    constructor() {
        this.baseUrl = '/api/users';
    }

    getToken() {
        return localStorage.getItem('token') || sessionStorage.getItem('token');
    }

    getHeaders() {
        return {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.getToken()}`,
        };
    }

    async request(path, options = {}) {
        const res = await fetch(this.baseUrl + path, {
            ...options,
            headers: this.getHeaders(),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || 'Error en la solicitud');
        return data;
    }

    getAll()          { return this.request('/'); }
    getById(id)       { return this.request(`/${id}`); }
    create(payload)   { return this.request('/', { method: 'POST', body: JSON.stringify(payload) }); }
    update(id, payload) { return this.request(`/${id}`, { method: 'PUT', body: JSON.stringify(payload) }); }
    remove(id)        { return this.request(`/${id}`, { method: 'DELETE' }); }
}
