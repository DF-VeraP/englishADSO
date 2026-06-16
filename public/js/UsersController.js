class UsersController {
    constructor() {
        this.service = new UsersService();
        this.users = [];
        this.filtered = [];
        this.editingId = null;
        this.deletingId = null;

        this.checkAuth();
        this.cacheElements();
        this.bindEvents();
        this.loadUsers();
    }

    /* ── Auth guard ──────────────────────────────────────── */
    checkAuth() {
        const token = this.service.getToken();
        if (!token) return this.redirect('/login.html');

        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            if (payload.exp && payload.exp * 1000 < Date.now()) return this.redirect('/login.html');
            if (payload.rol !== 'admin') return this.redirect('/index.html');
            document.getElementById('user-email').textContent = payload.email;
        } catch {
            this.redirect('/login.html');
        }
    }

    redirect(url) { window.location.href = url; }

    /* ── DOM references ──────────────────────────────────── */
    cacheElements() {
        this.tbody       = document.getElementById('users-tbody');
        this.tableState  = document.getElementById('table-state');
        this.searchInput = document.getElementById('search');
        this.roleFilter  = document.getElementById('filter-role');
        this.statusFilter = document.getElementById('filter-status');
        this.modalUser   = document.getElementById('modal-user');
        this.modalDelete = document.getElementById('modal-delete');
        this.formUser    = document.getElementById('form-user');
        this.modalTitle  = document.getElementById('modal-title');
        this.deleteUserName = document.getElementById('delete-user-name');
    }

    /* ── Events ──────────────────────────────────────────── */
    bindEvents() {
        document.getElementById('btn-logout').addEventListener('click', () => {
            localStorage.removeItem('token');
            sessionStorage.removeItem('token');
            window.location.href = '/login.html';
        });

        document.getElementById('btn-new-user').addEventListener('click', () => this.openCreate());
        document.getElementById('btn-close-modal').addEventListener('click', () => this.closeModal());
        document.getElementById('btn-cancel-delete').addEventListener('click', () => this.closeDeleteModal());
        document.getElementById('btn-confirm-delete').addEventListener('click', () => this.confirmDelete());
        document.getElementById('btn-cancel-modal').addEventListener('click', () => this.closeModal());

        this.formUser.addEventListener('submit', e => { e.preventDefault(); this.handleSubmit(); });

        this.searchInput.addEventListener('input', () => this.applyFilters());
        this.roleFilter.addEventListener('change', () => this.applyFilters());
        this.statusFilter.addEventListener('change', () => this.applyFilters());

        document.getElementById('btn-toggle-pass').addEventListener('click', () => this.togglePassword());

        this.modalUser.addEventListener('click', e => { if (e.target === this.modalUser) this.closeModal(); });
        this.modalDelete.addEventListener('click', e => { if (e.target === this.modalDelete) this.closeDeleteModal(); });
    }

    togglePassword() {
        const input = document.getElementById('input-password');
        const btn   = document.getElementById('btn-toggle-pass');
        const isText = input.type === 'text';
        input.type = isText ? 'password' : 'text';
        btn.innerHTML = isText ? this.eyeIcon() : this.eyeOffIcon();
    }

    /* ── Load & render ───────────────────────────────────── */
    async loadUsers() {
        this.showLoading();
        try {
            this.users = await this.service.getAll();
            this.filtered = [...this.users];
            this.renderTable();
        } catch (err) {
            this.showEmpty('Error al cargar usuarios: ' + err.message);
            this.showToast(err.message, 'error');
        }
    }

    applyFilters() {
        const q      = this.searchInput.value.toLowerCase().trim();
        const role   = this.roleFilter.value;
        const status = this.statusFilter.value;

        this.filtered = this.users.filter(u => {
            const matchesSearch = !q ||
                (u.nombre_usuario || '').toLowerCase().includes(q) ||
                u.correo_usuario.toLowerCase().includes(q);
            const matchesRole   = !role   || u.rol_usuario    === role;
            const matchesStatus = !status || String(u.estado_usuario) === status;
            return matchesSearch && matchesRole && matchesStatus;
        });

        this.renderTable();
    }

    renderTable() {
        if (this.filtered.length === 0) {
            this.showEmpty('No se encontraron usuarios');
            return;
        }

        this.tableState.style.display = 'none';
        this.tbody.innerHTML = this.filtered.map(u => this.rowTemplate(u)).join('');

        this.tbody.querySelectorAll('.btn-edit-row').forEach(btn =>
            btn.addEventListener('click', () => this.openEdit(Number(btn.dataset.id)))
        );
        this.tbody.querySelectorAll('.btn-delete-row').forEach(btn =>
            btn.addEventListener('click', () => this.openDelete(Number(btn.dataset.id), btn.dataset.name))
        );
    }

    rowTemplate(u) {
        const fecha  = new Date(u.createdAt).toLocaleDateString('es-CO', { day: '2-digit', month: 'short', year: 'numeric' });
        const status = u.estado_usuario
            ? '<span class="status-dot active">Activo</span>'
            : '<span class="status-dot inactive">Inactivo</span>';

        return `
        <tr>
            <td>${u.id}</td>
            <td>
                <div class="user-name">${u.nombre_usuario || '—'}</div>
                <div class="user-email">${u.correo_usuario}</div>
            </td>
            <td>${this.roleBadge(u.rol_usuario)}</td>
            <td>${status}</td>
            <td>${fecha}</td>
            <td>
                <div class="actions-cell">
                    <button class="btn btn-icon btn-edit btn-edit-row" data-id="${u.id}" title="Editar">
                        ${this.editIcon()}
                    </button>
                    <button class="btn btn-icon btn-delete btn-delete-row" data-id="${u.id}" data-name="${u.nombre_usuario || u.correo_usuario}" title="Eliminar">
                        ${this.deleteIcon()}
                    </button>
                </div>
            </td>
        </tr>`;
    }

    roleBadge(rol) {
        const map = { admin: 'badge-admin', instructor: 'badge-instructor', aprendiz: 'badge-aprendiz' };
        return `<span class="badge ${map[rol] || ''}">${rol}</span>`;
    }

    showLoading() {
        this.tbody.innerHTML = '';
        this.tableState.style.display = 'block';
        this.tableState.innerHTML = `<div class="spinner"></div><p>Cargando usuarios...</p>`;
    }

    showEmpty(msg) {
        this.tbody.innerHTML = '';
        this.tableState.style.display = 'block';
        this.tableState.innerHTML = `
            <svg width="40" height="40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/>
            </svg>
            <p>${msg}</p>`;
    }

    /* ── Create modal ────────────────────────────────────── */
    openCreate() {
        this.editingId = null;
        this.modalTitle.textContent = 'Nuevo Usuario';
        this.formUser.reset();
        this.clearErrors();

        document.getElementById('pass-hint').textContent = 'Mínimo 6 caracteres.';
        document.getElementById('status-group').style.display = 'none';
        this.openModal();
    }

    /* ── Edit modal ──────────────────────────────────────── */
    openEdit(id) {
        const u = this.users.find(x => x.id === id);
        if (!u) return;

        this.editingId = id;
        this.modalTitle.textContent = 'Editar Usuario';
        this.clearErrors();

        document.getElementById('input-nombre').value  = u.nombre_usuario || '';
        document.getElementById('input-email').value   = u.correo_usuario;
        document.getElementById('input-password').value = '';
        document.getElementById('pass-hint').textContent = 'Dejar en blanco para no cambiar la contraseña.';

        const roleInput = document.querySelector(`input[name="rol"][value="${u.rol_usuario}"]`);
        if (roleInput) roleInput.checked = true;

        document.getElementById('status-group').style.display = 'block';
        document.getElementById('input-status').checked = u.estado_usuario;

        this.openModal();
    }

    /* ── Delete modal ────────────────────────────────────── */
    openDelete(id, name) {
        this.deletingId = id;
        this.deleteUserName.textContent = name;
        this.modalDelete.classList.add('open');
    }

    closeDeleteModal() {
        this.deletingId = null;
        this.modalDelete.classList.remove('open');
    }

    async confirmDelete() {
        if (!this.deletingId) return;
        const btn = document.getElementById('btn-confirm-delete');
        btn.disabled = true;
        btn.textContent = 'Eliminando...';

        try {
            await this.service.remove(this.deletingId);
            this.showToast('Usuario eliminado', 'success');
            this.closeDeleteModal();
            await this.loadUsers();
        } catch (err) {
            this.showToast(err.message, 'error');
        } finally {
            btn.disabled = false;
            btn.textContent = 'Eliminar';
        }
    }

    /* ── Form submit ─────────────────────────────────────── */
    async handleSubmit() {
        if (!this.validateForm()) return;

        const payload = {
            nombre_usuario: document.getElementById('input-nombre').value.trim() || undefined,
            correo_usuario: document.getElementById('input-email').value.trim(),
            passw_usuario:  document.getElementById('input-password').value || undefined,
            rol_usuario:    document.querySelector('input[name="rol"]:checked')?.value,
        };

        if (this.editingId) {
            payload.estado_usuario = document.getElementById('input-status').checked;
        }

        const btn = document.getElementById('btn-save');
        btn.disabled = true;
        btn.textContent = 'Guardando...';

        try {
            if (this.editingId) {
                await this.service.update(this.editingId, payload);
                this.showToast('Usuario actualizado', 'success');
            } else {
                await this.service.create(payload);
                this.showToast('Usuario creado', 'success');
            }
            this.closeModal();
            await this.loadUsers();
        } catch (err) {
            this.showToast(err.message, 'error');
        } finally {
            btn.disabled = false;
            btn.textContent = 'Guardar';
        }
    }

    /* ── Validation ──────────────────────────────────────── */
    validateForm() {
        this.clearErrors();
        let valid = true;

        const email = document.getElementById('input-email').value.trim();
        const password = document.getElementById('input-password').value;
        const rol = document.querySelector('input[name="rol"]:checked');

        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            this.setError('input-email', 'error-email', 'Ingresa un correo válido');
            valid = false;
        }

        if (!this.editingId && !password) {
            this.setError('input-password', 'error-password', 'La contraseña es obligatoria');
            valid = false;
        } else if (password && password.length < 6) {
            this.setError('input-password', 'error-password', 'Mínimo 6 caracteres');
            valid = false;
        }

        if (!rol) {
            document.getElementById('error-rol').style.display = 'block';
            valid = false;
        }

        return valid;
    }

    setError(inputId, errorId, msg) {
        document.getElementById(inputId).classList.add('is-invalid');
        document.getElementById(errorId).textContent = msg;
        document.getElementById(errorId).style.display = 'block';
        document.getElementById(inputId).closest('.form-group')?.classList.add('has-error');
    }

    clearErrors() {
        this.formUser.querySelectorAll('.is-invalid').forEach(el => el.classList.remove('is-invalid'));
        this.formUser.querySelectorAll('.form-error').forEach(el => { el.style.display = 'none'; el.textContent = ''; });
        this.formUser.querySelectorAll('.has-error').forEach(el => el.classList.remove('has-error'));
    }

    /* ── Modal helpers ───────────────────────────────────── */
    openModal()  { this.modalUser.classList.add('open'); }
    closeModal() {
        this.modalUser.classList.remove('open');
        this.editingId = null;
    }

    /* ── Toast ───────────────────────────────────────────── */
    showToast(msg, type = 'success') {
        const container = document.getElementById('toast-container');
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.textContent = msg;
        container.appendChild(toast);
        requestAnimationFrame(() => toast.classList.add('show'));
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 400);
        }, 3500);
    }

    /* ── SVG icons ───────────────────────────────────────── */
    editIcon() {
        return `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>`;
    }

    deleteIcon() {
        return `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2"/></svg>`;
    }

    eyeIcon() {
        return `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`;
    }

    eyeOffIcon() {
        return `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>`;
    }
}

document.addEventListener('DOMContentLoaded', () => new UsersController());
