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
        this._btnAdd   = document.getElementById('btn-add-modulo');

        document.getElementById('btn-close-modulos')?.addEventListener('click',  () => this.close());
        document.getElementById('btn-close-modulos-footer')?.addEventListener('click', () => this.close());
        this._overlay?.addEventListener('click', e => { if (e.target === this._overlay) this.close(); });
        this._btnAdd?.addEventListener('click',                                   () => this._openForm());
        document.getElementById('btn-cancel-modulo')?.addEventListener('click',   () => this._cancelForm());
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
                if      (action === 'edit')       this._openForm(this._modulos.find(x => x.id === id));
                else if (action === 'delete')     this._delete(id);
                else if (action === 'up')         this._move(id, -1);
                else if (action === 'down')       this._move(id,  1);
                else if (action === 'toggle')     this._toggleEstado(id);
                else if (action === 'activities') ActivitiesModal.open(this._cursoId, id, this._modulos.find(x => x.id === id)?.titulo || '');
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
                <button class="modulo-btn-icon activities" data-action="activities" data-id="${m.id}" title="Gestionar actividades">
                    <i class="bi bi-grid-3x3-gap-fill" style="font-size:14px"></i>
                </button>
                <button class="modulo-btn-icon edit"   data-action="edit"   data-id="${m.id}" title="Editar">
                    <i class="bi bi-pencil" style="font-size:14px"></i>
                </button>
                <button class="modulo-btn-icon delete" data-action="delete" data-id="${m.id}" title="Eliminar">
                    <i class="bi bi-trash" style="font-size:14px"></i>
                </button>
            </div>
        </div>`;
    }

    _openForm(m = null) {
        this._editId = m?.id ?? null;
        this._inputTit.value = m ? m.titulo               : '';
        this._inputDes.value = m ? (m.descripcion || '')  : '';
        this._formLbl.textContent = m ? 'Editar módulo'   : 'Nuevo módulo';
        this._btnSave.textContent = m ? 'Guardar cambios' : 'Guardar módulo';
        this._formArea.style.display = '';
        if (this._btnAdd) this._btnAdd.style.display = 'none';
        this._inputTit.focus();
        this._formArea.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    _cancelForm() {
        this._editId = null;
        this._formArea.style.display = 'none';
        if (this._btnAdd) this._btnAdd.style.display = '';
        if (this._form)    this._form.reset();
        if (this._formLbl) this._formLbl.textContent = 'Nuevo módulo';
        if (this._btnSave) this._btnSave.textContent = 'Guardar módulo';
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
