class UsersController {
    constructor() {
        this.service = new UsersService();
        this.users   = [];
        this.activeTab = 'instructores';
        this.selectedIds = new Set();

        this.editingId   = null;
        this.deletingId  = null;
        this.fichasUserId  = null;
        this.fichasUserRol = null;

        this.checkAuth();
        this.cacheElements();
        this.bindEvents();
        this.loadUsers();
    }

    /* ── Auth ────────────────────────────────────────────── */
    checkAuth() {
        const token = this.service.getToken();
        if (!token) return this.redirect('/login.html');
        try {
            const p = JSON.parse(atob(token.split('.')[1]));
            if (p.exp && p.exp * 1000 < Date.now()) return this.redirect('/login.html');
            if (p.rol !== 'admin') return this.redirect('/index.html');
            document.getElementById('user-email').textContent = p.nombre || '';
        } catch { this.redirect('/login.html'); }
    }

    redirect(url) { window.location.href = url; }

    /* ── DOM refs ────────────────────────────────────────── */
    cacheElements() {
        this.statEls = {
            instructores: document.getElementById('stat-instructores'),
            aprendices:   document.getElementById('stat-aprendices'),
            admins:       document.getElementById('stat-admins'),
            total:        document.getElementById('stat-total'),
        };
        this.tabCountEls = {
            instructores: document.getElementById('tab-count-instructores'),
            aprendices:   document.getElementById('tab-count-aprendices'),
            admins:       document.getElementById('tab-count-admins'),
        };

        this.roles = ['instructores', 'aprendices', 'admins'];
        this.tbodyEls  = {};
        this.stateEls  = {};
        this.searchEls = {};
        this.statusEls = {};
        this.checkAllEls = {};

        for (const r of this.roles) {
            this.tbodyEls[r]    = document.getElementById(`tbody-${r}`);
            this.stateEls[r]    = document.getElementById(`state-${r}`);
            this.searchEls[r]   = document.getElementById(`search-${r}`);
            this.statusEls[r]   = document.getElementById(`filter-status-${r}`);
            this.checkAllEls[r] = document.getElementById(`check-all-${r}`);
        }

        this.tabBtns  = document.querySelectorAll('.page-tab-btn');
        this.tabPanes = document.querySelectorAll('.page-tab-pane');

        this.modalUser      = document.getElementById('modal-user');
        this.modalDelete    = document.getElementById('modal-delete');
        this.formUser       = document.getElementById('form-user');
        this.modalTitle     = document.getElementById('modal-title');
        this.deleteUserName = document.getElementById('delete-user-name');
        this.modalFichas    = document.getElementById('modal-fichas');
        this.modalWarnDelete = document.getElementById('modal-warn-delete');
        this.fichasSelect   = document.getElementById('fichas-select');
        this.fichasUserList = document.getElementById('fichas-user-list');
        this.bulkBar        = document.getElementById('bulk-action-bar');
        this.bulkCount      = document.getElementById('bulk-count');
    }

    /* ── Events ──────────────────────────────────────────── */
    bindEvents() {
        document.getElementById('btn-logout').addEventListener('click', () => {
            localStorage.removeItem('token');
            sessionStorage.removeItem('token');
            window.location.href = '/login.html';
        });

        document.getElementById('btn-new-user').addEventListener('click', () => this.openCreate());

        // Modal user
        document.getElementById('btn-close-modal').addEventListener('click',  () => this.closeModal());
        document.getElementById('btn-cancel-modal').addEventListener('click', () => this.closeModal());
        this.formUser.addEventListener('submit', e => { e.preventDefault(); this.handleSubmit(); });
        document.getElementById('btn-toggle-pass').addEventListener('click', () => this.togglePassword());
        this.modalUser.addEventListener('click', e => { if (e.target === this.modalUser) this.closeModal(); });

        // Modal delete (individual)
        document.getElementById('btn-cancel-delete').addEventListener('click',  () => this.closeDeleteModal());
        document.getElementById('btn-cancel-delete-2').addEventListener('click', () => this.closeDeleteModal());
        document.getElementById('btn-confirm-delete').addEventListener('click', () => this.confirmDelete());
        this.modalDelete.addEventListener('click', e => { if (e.target === this.modalDelete) this.closeDeleteModal(); });

        // Modal warn delete (aprendiz activo)
        document.getElementById('btn-close-warn').addEventListener('click',       () => this.closeWarnDelete());
        document.getElementById('btn-cancel-warn').addEventListener('click',      () => this.closeWarnDelete());
        document.getElementById('btn-confirm-deactivate').addEventListener('click', () => this.confirmDeactivate());
        this.modalWarnDelete.addEventListener('click', e => { if (e.target === this.modalWarnDelete) this.closeWarnDelete(); });

        // Modal fichas
        document.getElementById('btn-close-fichas').addEventListener('click',  () => this.closeFichasModal());
        document.getElementById('btn-asignar-ficha').addEventListener('click', () => this.doAsignarFicha());
        this.modalFichas.addEventListener('click', e => { if (e.target === this.modalFichas) this.closeFichasModal(); });

        // Tab switching
        this.tabBtns.forEach(btn =>
            btn.addEventListener('click', () => this.switchTab(btn.dataset.tab))
        );

        // Rol radio → mostrar/ocultar selector de ficha
        document.querySelectorAll('input[name="rol"]').forEach(radio =>
            radio.addEventListener('change', () => this._onRolChange())
        );

        // Per-tab search + filter
        for (const r of this.roles) {
            this.searchEls[r].addEventListener('input',  () => this.renderRoleTable(r));
            this.statusEls[r].addEventListener('change', () => this.renderRoleTable(r));

            // "Select all" header checkbox
            this.checkAllEls[r].addEventListener('change', e => {
                const checked = e.target.checked;
                const visibleIds = [...this.tbodyEls[r].querySelectorAll('.row-check')]
                    .map(c => Number(c.dataset.id));
                visibleIds.forEach(id => checked ? this.selectedIds.add(id) : this.selectedIds.delete(id));
                this.renderRoleTable(r);
                this.updateBulkBar();
            });
        }

        // Bulk actions
        document.getElementById('btn-bulk-delete').addEventListener('click', () => this.bulkDelete());
        document.getElementById('btn-deselect-all').addEventListener('click', () => this.deselectAll());

        // Import
        document.getElementById('btn-open-import').addEventListener('click', () => this.openImport());
        document.getElementById('btn-close-import').addEventListener('click', () => this.closeImport());
        document.getElementById('modal-import').addEventListener('click', e => {
            if (e.target === document.getElementById('modal-import')) this.closeImport();
        });
        document.getElementById('btn-download-template').addEventListener('click', () => this._downloadTemplate());
        document.getElementById('btn-import-back').addEventListener('click', () => this._importStep(1));
        document.getElementById('btn-do-import').addEventListener('click', () => this.doImport());
        document.getElementById('btn-import-done').addEventListener('click', () => this.closeImport());

        const dropArea = document.getElementById('import-drop');
        const fileInput = document.getElementById('import-file');
        dropArea.addEventListener('click', () => fileInput.click());
        fileInput.addEventListener('change', e => this._handleFile(e.target.files[0]));
        dropArea.addEventListener('dragover', e => { e.preventDefault(); dropArea.classList.add('drag-over'); });
        dropArea.addEventListener('dragleave', () => dropArea.classList.remove('drag-over'));
        dropArea.addEventListener('drop', e => {
            e.preventDefault();
            dropArea.classList.remove('drag-over');
            this._handleFile(e.dataTransfer.files[0]);
        });
    }

    switchTab(tab) {
        this.activeTab = tab;
        this.tabBtns.forEach(b => b.classList.toggle('active', b.dataset.tab === tab));
        this.tabPanes.forEach(p => p.classList.toggle('active', p.id === `tab-${tab}`));
    }

    togglePassword() {
        const input  = document.getElementById('input-password');
        const isText = input.type === 'text';
        input.type   = isText ? 'password' : 'text';
        document.getElementById('btn-toggle-pass').innerHTML = isText ? this.eyeIcon() : this.eyeOffIcon();
    }

    /* ── Load & render ───────────────────────────────────── */
    async loadUsers() {
        this.selectedIds.clear();
        this.updateBulkBar();
        this.showLoadingAll();
        try {
            this.users = await this.service.getAll();
            this.renderAll();
        } catch (err) {
            this.roles.forEach(r => this.showEmpty(r, 'Error al cargar: ' + err.message));
            this.showToast(err.message, 'error');
        }
    }

    showLoadingAll() {
        this.roles.forEach(r => {
            this.tbodyEls[r].innerHTML = '';
            this.stateEls[r].style.display = 'block';
            this.stateEls[r].innerHTML = `<div class="spinner"></div><p>Cargando...</p>`;
            this.checkAllEls[r].checked       = false;
            this.checkAllEls[r].indeterminate = false;
        });
    }

    renderAll() {
        const byRole = {
            instructores: this.users.filter(u => u.rol_usuario === 'instructor'),
            aprendices:   this.users.filter(u => u.rol_usuario === 'aprendiz'),
            admins:       this.users.filter(u => u.rol_usuario === 'admin'),
        };

        this.statEls.instructores.textContent = byRole.instructores.length;
        this.statEls.aprendices.textContent   = byRole.aprendices.length;
        this.statEls.admins.textContent       = byRole.admins.length;
        this.statEls.total.textContent        = this.users.length;

        this.tabCountEls.instructores.textContent = byRole.instructores.length;
        this.tabCountEls.aprendices.textContent   = byRole.aprendices.length;
        this.tabCountEls.admins.textContent       = byRole.admins.length;

        this.roles.forEach(r => this.renderRoleTable(r));
    }

    renderRoleTable(role) {
        const rolMap  = { instructores: 'instructor', aprendices: 'aprendiz', admins: 'admin' };
        const q       = this.searchEls[role].value.toLowerCase().trim();
        const status  = this.statusEls[role].value;

        const filtered = this.users
            .filter(u => u.rol_usuario === rolMap[role])
            .filter(u => {
                const matchSearch = !q ||
                    (u.nombre_usuario || '').toLowerCase().includes(q) ||
                    u.correo_usuario.toLowerCase().includes(q);
                const matchStatus = !status || String(u.estado_usuario) === status;
                return matchSearch && matchStatus;
            });

        const tbody    = this.tbodyEls[role];
        const state    = this.stateEls[role];
        const hasFichas = role !== 'admins';

        if (filtered.length === 0) {
            tbody.innerHTML = '';
            state.style.display = 'block';
            state.innerHTML = `
                <i class="bi bi-people-fill" style="font-size:40px;opacity:.4"></i>
                <p>No se encontraron resultados</p>`;
            this._syncCheckAll(role, []);
            return;
        }

        state.style.display = 'none';
        tbody.innerHTML = filtered.map(u => this.rowTemplate(u, hasFichas)).join('');

        // Bind row checkboxes
        tbody.querySelectorAll('.row-check').forEach(chk => {
            chk.addEventListener('change', e => {
                const id = Number(e.target.dataset.id);
                e.target.checked ? this.selectedIds.add(id) : this.selectedIds.delete(id);
                this._syncCheckAll(role, filtered);
                this.updateBulkBar();
            });
        });

        // Bind action buttons
        tbody.querySelectorAll('.btn-edit-row').forEach(btn =>
            btn.addEventListener('click', () => this.openEdit(Number(btn.dataset.id)))
        );
        tbody.querySelectorAll('.btn-delete-row').forEach(btn =>
            btn.addEventListener('click', () => this.openDelete(Number(btn.dataset.id), btn.dataset.name))
        );
        tbody.querySelectorAll('.btn-fichas-row').forEach(btn =>
            btn.addEventListener('click', () => this.openFichas(Number(btn.dataset.id)))
        );

        this._syncCheckAll(role, filtered);
    }

    _syncCheckAll(role, filtered) {
        const el = this.checkAllEls[role];
        if (!filtered.length) {
            el.checked = false;
            el.indeterminate = false;
            return;
        }
        const allChecked  = filtered.every(u => this.selectedIds.has(u.id));
        const someChecked = filtered.some(u => this.selectedIds.has(u.id));
        el.checked       = allChecked;
        el.indeterminate = someChecked && !allChecked;
    }

    rowTemplate(u, showFichas) {
        const fecha  = new Date(u.createdAt).toLocaleDateString('es-CO', { day: '2-digit', month: 'short', year: 'numeric' });
        const status = u.estado_usuario
            ? '<span class="status-dot active">Activo</span>'
            : '<span class="status-dot inactive">Inactivo</span>';
        const isSelected = this.selectedIds.has(u.id);

        const sinFichaBadge = (u.rol_usuario === 'aprendiz' && (u._count?.fichasComoAprendiz ?? 0) === 0)
            ? '<span class="badge-sin-ficha" title="No está inscrito en ninguna ficha">Sin ficha</span>'
            : '';

        return `
        <tr class="${isSelected ? 'row-selected' : ''}">
            <td class="td-check">
                <input type="checkbox" class="row-check" data-id="${u.id}" ${isSelected ? 'checked' : ''}>
            </td>
            <td>${u.id}</td>
            <td>
                <div class="user-name">${u.nombre_usuario || '—'} ${sinFichaBadge}</div>
                <div class="user-email">${u.correo_usuario}</div>
            </td>
            <td>${status}</td>
            <td>${fecha}</td>
            <td>
                <div class="actions-cell">
                    ${showFichas ? `
                    <button class="btn btn-icon btn-fichas btn-fichas-row" data-id="${u.id}" title="Gestionar Fichas">
                        ${this.fichasIcon()}
                    </button>` : ''}
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

    showEmpty(role, msg) {
        this.tbodyEls[role].innerHTML = '';
        this.stateEls[role].style.display = 'block';
        this.stateEls[role].innerHTML = `
            <i class="bi bi-people-fill" style="font-size:40px;opacity:.4"></i>
            <p>${msg}</p>`;
    }

    /* ── Bulk selection ──────────────────────────────────── */
    updateBulkBar() {
        const n = this.selectedIds.size;
        if (n > 0) {
            this.bulkBar.classList.add('visible');
            this.bulkCount.textContent = `${n} usuario${n !== 1 ? 's' : ''} seleccionado${n !== 1 ? 's' : ''}`;
        } else {
            this.bulkBar.classList.remove('visible');
        }
    }

    deselectAll() {
        this.selectedIds.clear();
        this.roles.forEach(r => {
            this.tbodyEls[r].querySelectorAll('.row-check').forEach(c => { c.checked = false; });
            const rows = [...this.tbodyEls[r].querySelectorAll('tr')];
            rows.forEach(row => row.classList.remove('row-selected'));
            this.checkAllEls[r].checked = false;
            this.checkAllEls[r].indeterminate = false;
        });
        this.updateBulkBar();
    }

    async bulkDelete() {
        const n = this.selectedIds.size;
        if (!n) return;

        const confirmed = confirm(
            `¿Eliminar ${n} usuario${n !== 1 ? 's' : ''} seleccionado${n !== 1 ? 's' : ''}?\n\nEsta acción no se puede deshacer.`
        );
        if (!confirmed) return;

        const btn = document.getElementById('btn-bulk-delete');
        btn.disabled = true;
        btn.innerHTML = `<i class="bi bi-arrow-repeat" style="font-size:14px;animation:spin 1s linear infinite"></i> Eliminando...`;

        const ids = [...this.selectedIds];
        const results = await Promise.allSettled(ids.map(id => this.service.remove(id)));
        const errors  = results.filter(r => r.status === 'rejected').length;
        const success = ids.length - errors;

        this.selectedIds.clear();
        this.updateBulkBar();

        if (errors === 0) {
            this.showToast(`${success} usuario${success !== 1 ? 's' : ''} eliminado${success !== 1 ? 's' : ''}`, 'success');
        } else {
            this.showToast(`${success} eliminado${success !== 1 ? 's' : ''}, ${errors} con error`, 'error');
        }

        btn.disabled = false;
        btn.innerHTML = `<i class="bi bi-trash" style="font-size:14px"></i> Eliminar seleccionados`;

        await this.loadUsers();
    }

    /* ── Create modal ────────────────────────────────────── */
    async openCreate() {
        this.editingId = null;
        this.modalTitle.textContent = 'Nuevo Usuario';
        this.formUser.reset();
        this.clearErrors();
        document.getElementById('pass-hint').textContent = 'Mínimo 6 caracteres.';
        document.getElementById('status-group').style.display = 'none';
        document.getElementById('ficha-assign-group').style.display = 'none';

        const rolMap = { instructores: 'instructor', aprendices: 'aprendiz', admins: 'admin' };
        const preRol = rolMap[this.activeTab];
        if (preRol) {
            const radio = document.querySelector(`input[name="rol"][value="${preRol}"]`);
            if (radio) radio.checked = true;
        }

        // Cargar fichas activas para el selector
        await this._loadFichasSelect();
        this._onRolChange();

        this.openModal();
    }

    async _loadFichasSelect() {
        const sel = document.getElementById('input-ficha');
        sel.innerHTML = '<option value="">Cargando fichas...</option>';
        try {
            const fichas = await FichasService.getAll();
            const activas = fichas.filter(f => f.estado === 'activa');
            sel.innerHTML = '<option value="">— Sin asignar por ahora —</option>' +
                activas.map(f =>
                    `<option value="${f.id}">${f.numero} — ${f.programa?.nombre || ''} (${this._jornadaLabel(f.jornada)})</option>`
                ).join('');
        } catch {
            sel.innerHTML = '<option value="">No se pudieron cargar las fichas</option>';
        }
    }

    _onRolChange() {
        const rol   = document.querySelector('input[name="rol"]:checked')?.value;
        const group = document.getElementById('ficha-assign-group');
        group.style.display = (!this.editingId && (rol === 'instructor' || rol === 'aprendiz'))
            ? 'block' : 'none';
    }

    /* ── Edit modal ──────────────────────────────────────── */
    openEdit(id) {
        const u = this.users.find(x => x.id === id);
        if (!u) return;

        this.editingId = id;
        this.modalTitle.textContent = 'Editar Usuario';
        this.clearErrors();

        document.getElementById('input-nombre').value   = u.nombre_usuario || '';
        document.getElementById('input-email').value    = u.correo_usuario;
        document.getElementById('input-password').value = '';
        document.getElementById('pass-hint').textContent = 'Dejar en blanco para no cambiar la contraseña.';

        const roleInput = document.querySelector(`input[name="rol"][value="${u.rol_usuario}"]`);
        if (roleInput) roleInput.checked = true;

        document.getElementById('ficha-assign-group').style.display = 'none';

        // El estado del aprendiz lo gestiona el sistema de fichas automáticamente
        const showStatus = u.rol_usuario !== 'aprendiz';
        document.getElementById('status-group').style.display = showStatus ? 'block' : 'none';
        if (showStatus) document.getElementById('input-status').checked = u.estado_usuario;

        this.openModal();
    }

    /* ── Delete modal (individual) ───────────────────────── */
    openDelete(id, name) {
        const u = this.users.find(x => x.id === id);
        const fichas        = u?._count?.fichasComoAprendiz ?? 0;
        const inscripciones = u?._count?.inscripciones      ?? 0;

        if (u?.rol_usuario === 'aprendiz' && (fichas > 0 || inscripciones > 0)) {
            this.openWarnDelete(u, fichas, inscripciones);
            return;
        }

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
        btn.disabled = true; btn.textContent = 'Eliminando...';

        try {
            await this.service.remove(this.deletingId);
            this.selectedIds.delete(this.deletingId);
            this.updateBulkBar();
            this.showToast('Usuario eliminado', 'success');
            this.closeDeleteModal();
            await this.loadUsers();
        } catch (err) {
            this.showToast(err.message, 'error');
        } finally {
            btn.disabled = false; btn.textContent = 'Eliminar';
        }
    }

    /* ── Warn delete: aprendiz con fichas ────────────────── */
    openWarnDelete(u, fichas, inscripciones) {
        this.deletingId = u.id;
        document.getElementById('warn-user-name').textContent    = u.nombre_usuario || u.correo_usuario;
        document.getElementById('warn-fichas-count').textContent = fichas;
        document.getElementById('warn-inscr-count').textContent  = inscripciones;
        this.modalWarnDelete.classList.add('open');
    }

    closeWarnDelete() {
        this.deletingId = null;
        this.modalWarnDelete.classList.remove('open');
    }

    async confirmDeactivate() {
        if (!this.deletingId) return;
        const btn = document.getElementById('btn-confirm-deactivate');
        btn.disabled = true; btn.textContent = 'Desactivando...';
        try {
            await this.service.update(this.deletingId, { estado_usuario: false });
            this.showToast('Aprendiz desactivado correctamente', 'success');
            this.closeWarnDelete();
            await this.loadUsers();
        } catch (err) {
            this.showToast(err.message, 'error');
        } finally {
            btn.disabled = false; btn.textContent = 'Desactivar aprendiz';
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
        if (this.editingId) payload.estado_usuario = document.getElementById('input-status').checked;

        const btn = document.getElementById('btn-save');
        btn.disabled = true; btn.textContent = 'Guardando...';

        try {
            if (this.editingId) {
                await this.service.update(this.editingId, payload);
                this.showToast('Usuario actualizado', 'success');
            } else {
                const result  = await this.service.create(payload);
                const newUser = result.usuario;
                const fichaId = Number(document.getElementById('input-ficha')?.value);

                if (fichaId && newUser?.id) {
                    try {
                        if (payload.rol_usuario === 'instructor') {
                            await FichasService.asignarInstructor(fichaId, newUser.id);
                        } else if (payload.rol_usuario === 'aprendiz') {
                            await FichasService.inscribirAprendiz(fichaId, newUser.id);
                        }
                        this.showToast('Usuario creado y asignado a la ficha', 'success');
                    } catch (err) {
                        this.showToast('Usuario creado, pero no se pudo asignar la ficha: ' + err.message, 'error');
                    }
                } else {
                    this.showToast('Usuario creado', 'success');
                }
            }
            this.closeModal();
            await this.loadUsers();
        } catch (err) {
            this.showToast(err.message, 'error');
        } finally {
            btn.disabled = false; btn.textContent = 'Guardar';
        }
    }

    /* ── Validation ──────────────────────────────────────── */
    validateForm() {
        this.clearErrors();
        let valid = true;
        const email    = document.getElementById('input-email').value.trim();
        const password = document.getElementById('input-password').value;
        const rol      = document.querySelector('input[name="rol"]:checked');

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
        const err = document.getElementById(errorId);
        err.textContent = msg;
        err.style.display = 'block';
        document.getElementById(inputId).closest('.form-group')?.classList.add('has-error');
    }

    clearErrors() {
        this.formUser.querySelectorAll('.is-invalid').forEach(el => el.classList.remove('is-invalid'));
        this.formUser.querySelectorAll('.form-error').forEach(el => { el.style.display = 'none'; el.textContent = ''; });
        this.formUser.querySelectorAll('.has-error').forEach(el => el.classList.remove('has-error'));
    }

    /* ── Modal helpers ───────────────────────────────────── */
    openModal()  { this.modalUser.classList.add('open'); }
    closeModal() { this.modalUser.classList.remove('open'); this.editingId = null; }

    /* ── Fichas del usuario ───────────────────────────────── */
    async openFichas(id) {
        const u = this.users.find(x => x.id === id);
        if (!u) return;

        this.fichasUserId  = id;
        this.fichasUserRol = u.rol_usuario;

        document.getElementById('fichas-modal-title').textContent =
            `Fichas de ${u.nombre_usuario || u.correo_usuario}`;
        document.getElementById('fichas-modal-subtitle').textContent =
            u.rol_usuario === 'instructor'
                ? 'Instructor — fichas que dicta'
                : 'Aprendiz — fichas en las que está inscrito';

        this.fichasUserList.innerHTML = '<p class="empty-list">Cargando...</p>';
        this.fichasSelect.innerHTML   = '<option value="">Cargando...</option>';
        this.modalFichas.classList.add('open');

        await this._refreshFichasModal();
    }

    closeFichasModal() {
        this.modalFichas.classList.remove('open');
        this.fichasUserId  = null;
        this.fichasUserRol = null;
    }

    async _refreshFichasModal() {
        try {
            const [userFichas, allFichas] = await Promise.all([
                this.fichasUserRol === 'instructor'
                    ? FichasService.getFichasDeInstructor(this.fichasUserId)
                    : FichasService.getFichasDeAprendiz(this.fichasUserId),
                FichasService.getAll()
            ]);
            this._renderFichasSelect(allFichas, userFichas);
            this._renderFichasUserList(userFichas);
        } catch (err) {
            this.fichasUserList.innerHTML = `<p class="empty-list" style="color:#ef4444">Error: ${err.message}</p>`;
        }
    }

    _renderFichasSelect(allFichas, userFichas) {
        const assignedIds = new Set(userFichas.map(f => f.id));
        const available   = allFichas.filter(f => !assignedIds.has(f.id) && f.estado === 'activa');
        this.fichasSelect.innerHTML = available.length === 0
            ? '<option value="">Sin fichas disponibles para asignar</option>'
            : '<option value="">— Selecciona una ficha —</option>' +
              available.map(f =>
                  `<option value="${f.id}">${f.numero} — ${f.programa?.nombre || ''} (${this._jornadaLabel(f.jornada)})</option>`
              ).join('');
    }

    _renderFichasUserList(fichas) {
        if (!fichas.length) {
            this.fichasUserList.innerHTML = '<p class="empty-list">Sin fichas asignadas aún.</p>';
            return;
        }
        this.fichasUserList.innerHTML = fichas.map(f => `
            <div class="member-row">
                <div class="member-avatar" style="background:#e0f2fe;color:#0369a1;font-size:.75rem;font-weight:700">
                    #${String(f.numero).slice(-3)}
                </div>
                <div class="member-info">
                    <div class="member-name">Ficha ${f.numero}</div>
                    <div class="member-email">${f.programa?.nombre || ''} · ${this._jornadaLabel(f.jornada)}</div>
                </div>
                <span class="estado-badge estado-${f.estado}">${f.estado}</span>
                <button class="btn btn-icon btn-delete" data-ficha-id="${f.id}" title="Quitar ficha" style="margin-left:.5rem">
                    <i class="bi bi-x-lg" style="font-size:14px"></i>
                </button>
            </div>`).join('');

        this.fichasUserList.querySelectorAll('[data-ficha-id]').forEach(btn =>
            btn.addEventListener('click', () => this._quitarFicha(Number(btn.dataset.fichaId)))
        );
    }

    async doAsignarFicha() {
        const fichaId = Number(this.fichasSelect.value);
        if (!fichaId) return this.showToast('Selecciona una ficha', 'error');

        const btn = document.getElementById('btn-asignar-ficha');
        btn.disabled = true; btn.textContent = 'Asignando...';

        try {
            if (this.fichasUserRol === 'instructor') {
                await FichasService.asignarInstructor(fichaId, this.fichasUserId);
            } else {
                await FichasService.inscribirAprendiz(fichaId, this.fichasUserId);
            }
            this.showToast('Ficha asignada', 'success');
            await this._refreshFichasModal();
        } catch (err) {
            this.showToast(err.message, 'error');
        } finally {
            btn.disabled = false; btn.textContent = 'Asignar';
        }
    }

    async _quitarFicha(fichaId) {
        try {
            if (this.fichasUserRol === 'instructor') {
                await FichasService.quitarInstructor(fichaId, this.fichasUserId);
            } else {
                await FichasService.retirarAprendiz(fichaId, this.fichasUserId);
            }
            this.showToast('Ficha removida', 'success');
            await this._refreshFichasModal();
        } catch (err) {
            this.showToast(err.message, 'error');
        }
    }

    /* ── Import ──────────────────────────────────────────── */
    openImport() {
        this.importRows = [];
        this._importStep(1);
        document.getElementById('import-file').value = '';
        document.getElementById('import-drop').classList.remove('drag-over');
        document.getElementById('modal-import').classList.add('open');
    }

    closeImport() {
        document.getElementById('modal-import').classList.remove('open');
    }

    _importStep(n) {
        [1, 2, 3].forEach(i => {
            document.getElementById(`import-step-${i}`).style.display = i === n ? '' : 'none';
        });
        const labels = {
            1: 'Paso 1 — Sube el archivo',
            2: 'Paso 2 — Vista previa',
            3: 'Paso 3 — Resultado',
        };
        document.getElementById('import-step-label').textContent = labels[n];
    }

    _downloadTemplate() {
        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.aoa_to_sheet([
            ['nombre_usuario', 'correo_usuario', 'contraseña', 'numero_ficha'],
            ['María García',   'mgarcia@sena.edu.co',  'Sena2025', ''],
            ['Carlos López',   'clopez@sena.edu.co',   '',         '2550123'],
        ]);
        ws['!cols'] = [{ wch: 25 }, { wch: 30 }, { wch: 15 }, { wch: 14 }];
        XLSX.utils.book_append_sheet(wb, ws, 'Aprendices');
        XLSX.writeFile(wb, 'plantilla_aprendices.xlsx');
    }

    _handleFile(file) {
        if (!file) return;
        if (!file.name.endsWith('.xlsx')) {
            this.showToast('Solo se aceptan archivos .xlsx', 'error');
            return;
        }
        const reader = new FileReader();
        reader.onload = e => {
            const data = new Uint8Array(e.target.result);
            const wb   = XLSX.read(data, { type: 'array' });
            const ws   = wb.Sheets[wb.SheetNames[0]];
            const rows = XLSX.utils.sheet_to_json(ws, { defval: '' });
            this.importRows = rows;
            this._renderPreview(rows);
            this._importStep(2);
        };
        reader.readAsArrayBuffer(file);
    }

    _renderPreview(rows) {
        const DEFAULT_PASS = 'Sena2025';
        const info  = document.getElementById('import-preview-info');
        const tbody = document.getElementById('import-preview-tbody');
        const btn   = document.getElementById('btn-do-import');

        if (rows.length === 0) {
            info.innerHTML = `<span class="import-badge import-badge--warn">El archivo está vacío o no tiene filas de datos</span>`;
            tbody.innerHTML = '';
            btn.disabled = true;
            return;
        }

        const validCount = rows.filter(r => {
            const c = (r.correo_usuario || r.correo || '').toString().trim();
            return c && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(c);
        }).length;

        info.innerHTML = `
            <span class="import-badge import-badge--info">${rows.length} fila${rows.length !== 1 ? 's' : ''} detectada${rows.length !== 1 ? 's' : ''}</span>
            ${validCount < rows.length ? `<span class="import-badge import-badge--warn">${rows.length - validCount} con errores</span>` : ''}
        `;
        document.getElementById('import-count').textContent = validCount;
        btn.disabled = validCount === 0;

        tbody.innerHTML = rows.map((row, i) => {
            const correo = (row.correo_usuario || row.correo || '').toString().trim();
            const nombre = (row.nombre_usuario || row.nombre || '').toString().trim();
            const pass   = (row['contraseña']   || row.password || '').toString().trim();
            const ficha  = (row.numero_ficha || row.numero || '').toString().trim();
            const valid  = correo && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo);

            return `<tr>
                <td style="color:var(--gray-400)">${i + 2}</td>
                <td>${nombre || '<em style="color:var(--gray-300)">—</em>'}</td>
                <td>${correo || '<em style="color:#ef4444">vacío</em>'}</td>
                <td style="color:var(--gray-400)">${pass || DEFAULT_PASS + ' (defecto)'}</td>
                <td style="color:var(--gray-400)">${ficha || '—'}</td>
                <td>${valid
                    ? '<span class="import-badge import-badge--ok">OK</span>'
                    : '<span class="import-badge import-badge--err">Error</span>'
                }</td>
            </tr>`;
        }).join('');
    }

    async doImport() {
        if (!this.importRows?.length) return;
        const btn = document.getElementById('btn-do-import');
        btn.disabled = true;
        btn.innerHTML = '<i class="bi bi-arrow-repeat" style="font-size:14px;animation:spin 1s linear infinite"></i> Importando...';

        try {
            const token = this.service.getToken();
            const res   = await fetch('/api/users/import', {
                method:  'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                body:    JSON.stringify({ rows: this.importRows }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.message || 'Error en la importación');
            this._renderReport(data);
            this._importStep(3);
            await this.loadUsers();
        } catch (err) {
            this.showToast(err.message, 'error');
            btn.disabled = false;
            btn.innerHTML = `Importar <span id="import-count">${this.importRows.length}</span> aprendices`;
        }
    }

    _renderReport({ created, failed, total }) {
        document.getElementById('import-report-summary').innerHTML = `
            <div class="import-report-cards">
                <div class="import-report-card import-report-card--ok">
                    <span class="import-report-num">${created.length}</span>
                    <span class="import-report-lbl">Creados</span>
                </div>
                <div class="import-report-card import-report-card--err">
                    <span class="import-report-num">${failed.length}</span>
                    <span class="import-report-lbl">Con error</span>
                </div>
                <div class="import-report-card import-report-card--total">
                    <span class="import-report-num">${total}</span>
                    <span class="import-report-lbl">Total filas</span>
                </div>
            </div>
            ${created.some(c => c.contraseña_usada)
                ? `<p style="margin-top:.75rem;font-size:.82rem;color:var(--gray-500)"><strong>Nota:</strong> Las filas sin contraseña recibieron la contraseña por defecto: <code style="background:var(--gray-100);padding:0 .3rem;border-radius:3px">Sena2025</code></p>`
                : ''
            }
        `;

        const failWrap = document.getElementById('import-report-failures');
        if (failed.length > 0) {
            failWrap.style.display = '';
            document.getElementById('import-report-tbody').innerHTML = failed.map(f =>
                `<tr>
                    <td style="color:var(--gray-400)">${f.fila}</td>
                    <td>${f.correo}</td>
                    <td style="color:#ef4444">${f.error}</td>
                </tr>`
            ).join('');
        } else {
            failWrap.style.display = 'none';
        }
    }

    _jornadaLabel(j) {
        return j === 'manana' ? 'Mañana' : j === 'mixta' ? 'Mixta' : j === 'nocturna' ? 'Nocturna' : j;
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

    /* ── Icons ───────────────────────────────────────────── */
    editIcon()    { return `<i class="bi bi-pencil" style="font-size:15px"></i>`; }
    deleteIcon()  { return `<i class="bi bi-trash" style="font-size:15px"></i>`; }
    fichasIcon()  { return `<i class="bi bi-calendar3" style="font-size:15px"></i>`; }
    eyeIcon()     { return `<i class="bi bi-eye" style="font-size:16px"></i>`; }
    eyeOffIcon()  { return `<i class="bi bi-eye-slash" style="font-size:16px"></i>`; }
}

document.addEventListener('DOMContentLoaded', () => new UsersController());
