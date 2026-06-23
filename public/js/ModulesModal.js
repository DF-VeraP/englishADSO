// ModulesModal.js — requires CoursesService.js loaded first

class _ModulesModal {
    constructor() {
        this._svc     = null;
        this._cursoId = null;
        this._modulos = [];
        this._editId  = null;
        this._ready   = false;
    }

    _init() {
        if (this._ready) return;
        this._svc      = new CoursesService();
        this._overlay  = document.getElementById('modal-modulos');
        this._listEl   = document.getElementById('modulos-list');
        this._formArea = document.getElementById('modulos-form-area');
        this._form     = document.getElementById('form-modulo');
        this._inputTit = document.getElementById('modulo-titulo');
        this._inputDes = document.getElementById('modulo-desc');
        this._formLbl  = document.getElementById('modulos-form-title');
        this._btnSave  = document.getElementById('btn-save-modulo');

        document.getElementById('btn-close-modulos')?.addEventListener('click',  () => this.close());
        document.getElementById('btn-close-modulos-footer')?.addEventListener('click', () => this.close());
        this._overlay?.addEventListener('click', e => { if (e.target === this._overlay) this.close(); });
        document.getElementById('btn-add-modulo')?.addEventListener('click',    () => this._openForm());
        document.getElementById('btn-cancel-modulo')?.addEventListener('click', () => this._cancelForm());
        this._form?.addEventListener('submit', e => { e.preventDefault(); this._submit(); });
        this._ready = true;
    }

    async open(cursoId, titulo) {
        this._init();
        this._cursoId = cursoId;
        this._editId  = null;
        document.getElementById('modulos-modal-title').textContent = titulo;
        this._cancelForm();
        this._overlay.classList.add('open');
        await this._load();
    }

    close() {
        this._overlay?.classList.remove('open');
        this._cursoId = null;
        this._editId  = null;
    }

    async _load() {
        this._listEl.innerHTML = '<div class="modulos-loading"><div class="spinner"></div><span>Cargando módulos…</span></div>';
        try {
            this._modulos = await this._svc.listModulos(this._cursoId);
            this._render();
        } catch (err) {
            this._listEl.innerHTML = `<p class="modulos-error">${err.message}</p>`;
        }
    }

    _render() {
        document.getElementById('modulos-count-badge').textContent = this._modulos.length;
        if (!this._modulos.length) {
            this._listEl.innerHTML = '<p class="modulos-empty">Este curso aún no tiene módulos. Agrega el primero.</p>';
            return;
        }
        this._listEl.innerHTML = this._modulos.map((m, i) => this._rowHtml(m, i)).join('');
        this._listEl.querySelectorAll('[data-action]').forEach(btn => {
            const id     = Number(btn.dataset.id);
            const action = btn.dataset.action;
            btn.addEventListener('click', () => {
                if      (action === 'edit')   this._openForm(this._modulos.find(x => x.id === id));
                else if (action === 'delete') this._delete(id);
                else if (action === 'up')     this._move(id, -1);
                else if (action === 'down')   this._move(id,  1);
                else if (action === 'toggle') this._toggleEstado(id);
            });
        });
    }

    _rowHtml(m, i) {
        const isFirst = i === 0;
        const isLast  = i === this._modulos.length - 1;
        return `
        <div class="modulo-row${!m.estado ? ' modulo-row--inactive' : ''}">
            <div class="modulo-row-order">
                <button class="modulo-btn-order" data-action="up"   data-id="${m.id}" ${isFirst ? 'disabled' : ''}>▲</button>
                <span class="modulo-num">${i + 1}</span>
                <button class="modulo-btn-order" data-action="down" data-id="${m.id}" ${isLast  ? 'disabled' : ''}>▼</button>
            </div>
            <div class="modulo-row-info">
                <div class="modulo-row-title">${this._esc(m.titulo)}</div>
                ${m.descripcion ? `<div class="modulo-row-desc">${this._esc(m.descripcion)}</div>` : ''}
            </div>
            <div class="modulo-row-actions">
                <button class="modulo-status-pill ${m.estado ? 'active' : ''}" data-action="toggle" data-id="${m.id}">
                    ${m.estado ? 'Activo' : 'Inactivo'}
                </button>
                <button class="modulo-btn-icon edit"   data-action="edit"   data-id="${m.id}" title="Editar">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/>
                        <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
                    </svg>
                </button>
                <button class="modulo-btn-icon delete" data-action="delete" data-id="${m.id}" title="Eliminar">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="3 6 5 6 21 6"/>
                        <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/>
                        <path d="M10 11v6"/><path d="M14 11v6"/>
                        <path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2"/>
                    </svg>
                </button>
            </div>
        </div>`;
    }

    _openForm(m = null) {
        this._editId = m?.id ?? null;
        this._inputTit.value = m ? m.titulo          : '';
        this._inputDes.value = m ? (m.descripcion || '') : '';
        this._formLbl.textContent  = m ? 'Editar módulo'   : 'Agregar módulo';
        this._btnSave.textContent  = m ? 'Guardar cambios' : 'Agregar módulo';
        this._formArea.style.display = '';
        this._inputTit.focus();
        this._formArea.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    _cancelForm() {
        this._editId = null;
        this._formArea.style.display = 'none';
        if (this._form) this._form.reset();
        if (this._formLbl) this._formLbl.textContent = 'Agregar módulo';
        if (this._btnSave) this._btnSave.textContent = 'Agregar módulo';
    }

    async _submit() {
        const titulo = this._inputTit.value.trim();
        if (!titulo) { this._inputTit.focus(); return; }
        const data = { titulo, descripcion: this._inputDes.value.trim() || undefined };
        this._btnSave.disabled = true;
        try {
            if (this._editId) {
                await this._svc.updateModulo(this._cursoId, this._editId, data);
                this._toast('Módulo actualizado', 'success');
            } else {
                await this._svc.createModulo(this._cursoId, data);
                this._toast('Módulo agregado', 'success');
            }
            this._cancelForm();
            await this._load();
        } catch (err) {
            this._toast(err.message, 'error');
        } finally {
            this._btnSave.disabled = false;
        }
    }

    async _delete(id) {
        const m = this._modulos.find(x => x.id === id);
        if (!confirm(`¿Eliminar "${m?.titulo}"? Esta acción no se puede deshacer.`)) return;
        try {
            await this._svc.removeModulo(this._cursoId, id);
            this._toast('Módulo eliminado', 'success');
            await this._load();
        } catch (err) {
            this._toast(err.message, 'error');
        }
    }

    async _move(id, dir) {
        const idx  = this._modulos.findIndex(m => m.id === id);
        const swap = this._modulos[idx + dir];
        if (!swap) return;
        try {
            await Promise.all([
                this._svc.updateModulo(this._cursoId, id,      { orden: swap.orden }),
                this._svc.updateModulo(this._cursoId, swap.id, { orden: this._modulos[idx].orden }),
            ]);
            await this._load();
        } catch (err) {
            this._toast(err.message, 'error');
        }
    }

    async _toggleEstado(id) {
        const m = this._modulos.find(x => x.id === id);
        if (!m) return;
        try {
            await this._svc.updateModulo(this._cursoId, id, { estado: !m.estado });
            await this._load();
        } catch (err) {
            this._toast(err.message, 'error');
        }
    }

    _toast(msg, type = 'info') {
        const tc = document.getElementById('toast-container');
        if (!tc) return;
        const t = document.createElement('div');
        t.className = `toast toast-${type}`;
        t.textContent = msg;
        tc.appendChild(t);
        setTimeout(() => t.classList.add('show'), 10);
        setTimeout(() => { t.classList.remove('show'); setTimeout(() => t.remove(), 300); }, 3500);
    }

    _esc(s) {
        return String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    }
}

const ModulesModal = new _ModulesModal();
