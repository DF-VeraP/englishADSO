class InstructorController {
    constructor() {
        this.fichas          = [];
        this.cursos          = [];
        this.progresoMap     = {};   // fichaId → avgProgreso
        this.activeFicha     = null;
        this.editingCursoId  = null;
        this.deletingCursoId = null;
        this.activeInnerTab  = 'aprendices';

        this._checkAuth();
        this._bindEvents();
        this._loadAll();
    }

    /* ── Auth ────────────────────────────────────────────── */
    _checkAuth() {
        const payload = AuthGuard.requireAuth(['instructor', 'admin']);
        if (!payload) return;
        const user   = AuthGuard.getUser() || {};
        const nombre = user.nombre || payload.nombre || payload.email || '';
        document.getElementById('user-name').textContent = nombre;
        const avatarEl = document.getElementById('user-avatar');
        if (avatarEl) avatarEl.textContent = nombre.slice(0, 2).toUpperCase();
    }

    /* ── Events ──────────────────────────────────────────── */
    _bindEvents() {
        document.getElementById('btn-logout').addEventListener('click', () => AuthGuard.logout());
        document.getElementById('btn-nuevo-curso').addEventListener('click', () => this._openCursoModal());

        // Tabs
        document.querySelectorAll('.inst-tab-btn').forEach(btn =>
            btn.addEventListener('click', () => this._switchTab(btn.dataset.tab))
        );

        // Inner tabs (ficha modal)
        document.querySelectorAll('.inst-inner-tab').forEach(btn =>
            btn.addEventListener('click', () => this._switchInnerTab(btn.dataset.inner))
        );

        // Ficha modal
        document.getElementById('btn-close-ficha').addEventListener('click', () => this._closeFichaModal());
        document.getElementById('modal-ficha').addEventListener('click', e => {
            if (e.target === document.getElementById('modal-ficha')) this._closeFichaModal();
        });
        document.getElementById('btn-asignar-curso').addEventListener('click', () => this._doAsignarCurso());

        // Curso modal
        document.getElementById('btn-close-curso').addEventListener('click',  () => this._closeCursoModal());
        document.getElementById('btn-cancel-curso').addEventListener('click', () => this._closeCursoModal());
        document.getElementById('modal-curso').addEventListener('click', e => {
            if (e.target === document.getElementById('modal-curso')) this._closeCursoModal();
        });
        document.getElementById('form-curso').addEventListener('submit', e => {
            e.preventDefault();
            this._saveCurso();
        });

        // Progreso tab — volver
        document.getElementById('btn-volver-progreso').addEventListener('click', () => {
            document.getElementById('progreso-detalle').style.display = 'none';
            document.getElementById('progreso-resumen').style.display = '';
        });

        // Delete modal
        document.getElementById('btn-cancel-del').addEventListener('click',  () => this._closeDelModal());
        document.getElementById('btn-cancel-del-2').addEventListener('click', () => this._closeDelModal());
        document.getElementById('btn-confirm-del').addEventListener('click', () => this._confirmDeleteCurso());
        document.getElementById('modal-del-curso').addEventListener('click', e => {
            if (e.target === document.getElementById('modal-del-curso')) this._closeDelModal();
        });
    }

    /* ── Load ────────────────────────────────────────────── */
    async _loadAll() {
        try {
            const [fichas, cursos, resumen] = await Promise.all([
                InstructorService.getMisFichas(),
                InstructorService.getMisCursos(),
                InstructorService.getProgresoResumen().catch(() => []),
            ]);
            this.fichas  = fichas;
            this.cursos  = cursos;
            this.progresoMap = {};
            for (const r of resumen) this.progresoMap[r.fichaId] = r.avgProgreso;
            this._renderStats();
            this._renderFichas();
            this._renderCursos();
        } catch (err) {
            this._toast(err.message, 'error');
        }
    }

    _renderStats() {
        const totalAprendices = this.fichas.reduce((s, f) => s + (f._count?.aprendices ?? 0), 0);
        document.getElementById('stat-fichas').textContent     = this.fichas.length;
        document.getElementById('stat-aprendices').textContent = totalAprendices;
        document.getElementById('stat-cursos').textContent     = this.cursos.length;
    }

    /* ── Fichas tab ──────────────────────────────────────── */
    _renderFichas() {
        const grid  = document.getElementById('fichas-grid');
        const empty = document.getElementById('fichas-empty');

        if (!this.fichas.length) {
            grid.innerHTML = '';
            empty.style.display = '';
            return;
        }
        empty.style.display = 'none';
        grid.innerHTML = this.fichas.map(f => this._fichaCard(f)).join('');
        grid.querySelectorAll('.inst-ficha-card').forEach(card =>
            card.addEventListener('click', () => this._openFichaModal(Number(card.dataset.id)))
        );
    }

    _fichaCard(f) {
        const prog    = f.programa?.nombre || '—';
        const jornada = this._jornadaLabel(f.jornada);
        const nApr    = f._count?.aprendices ?? 0;
        const nCur    = f.cursos?.length ?? 0;
        const pct     = this.progresoMap[f.id] ?? null;
        const hasProg = nApr > 0 && nCur > 0;
        const pctVal  = pct ?? 0;
        const barCls  = pctVal >= 80 ? 'high' : pctVal >= 40 ? 'mid' : 'low';

        const progresoHtml = hasProg ? `
            <div class="ficha-prog-row">
                <div class="ficha-prog-bar-wrap">
                    <div class="ficha-prog-bar ficha-prog-bar--${barCls}" style="width:${pctVal}%"></div>
                </div>
                <span class="ficha-prog-pct">${pctVal}%</span>
            </div>` : '';

        return `
        <div class="inst-ficha-card" data-id="${f.id}">
            <div class="inst-ficha-top">
                <span class="inst-ficha-numero">Ficha ${f.numero}</span>
                <span class="inst-ficha-estado est-${f.estado}">${f.estado}</span>
            </div>
            <div class="inst-ficha-prog">${prog}</div>
            <div class="inst-ficha-meta">${jornada} · ${f.modalidad}</div>
            <div class="inst-ficha-footer">
                <span class="inst-ficha-chip">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c0 1.1 2.686 2 6 2s6-.9 6-2v-5"/></svg>
                    ${nApr} aprendices
                </span>
                <span class="inst-ficha-chip">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/></svg>
                    ${nCur} cursos
                </span>
            </div>
            ${progresoHtml}
        </div>`;
    }

    /* ── Ficha modal ─────────────────────────────────────── */
    _openFichaModal(fichaId) {
        const ficha = this.fichas.find(f => f.id === fichaId);
        if (!ficha) return;
        this.activeFicha = ficha;

        document.getElementById('ficha-modal-title').textContent =
            `Ficha ${ficha.numero}`;
        document.getElementById('ficha-modal-sub').textContent =
            `${ficha.programa?.nombre || ''} · ${this._jornadaLabel(ficha.jornada)}`;

        this._switchInnerTab('aprendices');
        this._renderAprendices(ficha);
        this._renderFichaCursos(ficha);
        this._populateSelectCurso(ficha);

        document.getElementById('modal-ficha').classList.add('open');
    }

    _closeFichaModal() {
        document.getElementById('modal-ficha').classList.remove('open');
        this.activeFicha = null;
    }

    _renderAprendices(ficha) {
        const list = document.getElementById('aprendices-list');
        const apr  = ficha.aprendices || [];
        document.getElementById('pill-aprendices').textContent = apr.length;

        if (!apr.length) {
            list.innerHTML = '<p class="inst-empty-list">Sin aprendices inscritos</p>';
            return;
        }
        list.innerHTML = apr.map(a => {
            const u      = a.aprendiz;
            const initials = (u.nombre_usuario || u.correo_usuario).slice(0, 2).toUpperCase();
            const isOn   = u.estado_usuario;
            return `
            <div class="inst-member-row">
                <div class="inst-avatar" style="background:#e0f2fe;color:#0369a1">${initials}</div>
                <div class="inst-member-info">
                    <div class="inst-member-name">${u.nombre_usuario || '—'}</div>
                    <div class="inst-member-email">${u.correo_usuario}</div>
                </div>
                <span class="inst-status-dot ${isOn ? 'on' : 'off'}">${isOn ? 'Activo' : 'Inactivo'}</span>
            </div>`;
        }).join('');
    }

    _renderFichaCursos(ficha) {
        const list   = document.getElementById('ficha-cursos-list');
        const cursos = ficha.cursos || [];
        document.getElementById('pill-ficha-cursos').textContent = cursos.length;

        if (!cursos.length) {
            list.innerHTML = '<p class="inst-empty-list">Sin cursos asignados a esta ficha</p>';
            return;
        }
        list.innerHTML = cursos.map(fc => {
            const c         = fc.curso;
            const fechaISO  = fc.fechaLimite ? this._toDateInput(fc.fechaLimite) : '';
            const fechaLabel = fc.fechaLimite ? this._formatFecha(fc.fechaLimite) : null;
            const vencido    = fc.fechaLimite && new Date(fc.fechaLimite) < new Date();

            return `
            <div class="inst-curso-row" data-curso-id="${c.id}">
                <div class="inst-curso-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/>
                    </svg>
                </div>
                <div class="inst-member-info">
                    <div class="inst-member-name">${this._esc(c.titulo)}</div>
                    <div class="inst-member-email">${this._nivelLabel(c.nivel)}</div>
                </div>
                <div class="fc-deadline-wrap">
                    <div class="fc-deadline-display">
                        ${fechaLabel
                            ? `<span class="fc-deadline-date${vencido ? ' fc-deadline-vencido' : ''}">
                                   <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                                   ${fechaLabel}${vencido ? ' · Vencido' : ''}
                               </span>`
                            : `<span class="fc-deadline-none">Sin plazo</span>`
                        }
                        <button class="fc-edit-btn" data-curso-id="${c.id}" title="Editar fecha límite">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/>
                                <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
                            </svg>
                        </button>
                    </div>
                    <div class="fc-deadline-form" style="display:none">
                        <input type="datetime-local" class="inst-fecha-input fc-date-input" value="${fechaISO}">
                        <button class="fc-save-btn inst-btn inst-btn-primary" style="padding:.25rem .55rem;font-size:.75rem">✓</button>
                        <button class="fc-cancel-btn inst-btn inst-btn-ghost" style="padding:.25rem .55rem;font-size:.75rem">✕</button>
                    </div>
                </div>
                <button class="inst-btn-icon unlink" data-curso-id="${c.id}" title="Quitar de la ficha">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                    </svg>
                </button>
            </div>`;
        }).join('');

        list.querySelectorAll('.unlink').forEach(btn =>
            btn.addEventListener('click', () => this._quitarCurso(Number(btn.dataset.cursoId)))
        );

        list.querySelectorAll('.fc-edit-btn').forEach(btn => {
            btn.addEventListener('click', e => {
                const row = e.currentTarget.closest('.inst-curso-row');
                row.querySelector('.fc-deadline-display').style.display = 'none';
                row.querySelector('.fc-deadline-form').style.display    = '';
                row.querySelector('.fc-date-input').focus();
            });
        });

        list.querySelectorAll('.fc-cancel-btn').forEach(btn => {
            btn.addEventListener('click', e => {
                const row = e.currentTarget.closest('.inst-curso-row');
                row.querySelector('.fc-deadline-display').style.display = '';
                row.querySelector('.fc-deadline-form').style.display    = 'none';
            });
        });

        list.querySelectorAll('.fc-save-btn').forEach(btn => {
            btn.addEventListener('click', async e => {
                const row      = e.currentTarget.closest('.inst-curso-row');
                const cursoId  = Number(row.dataset.cursoId);
                const newFecha = row.querySelector('.fc-date-input').value || null;
                btn.disabled = true; btn.textContent = '…';
                try {
                    await InstructorService.actualizarFechaCurso(this.activeFicha.id, cursoId, newFecha);
                    this._toast('Fecha límite actualizada', 'success');
                    await this._loadAll();
                    const updated = this.fichas.find(f => f.id === this.activeFicha.id);
                    if (updated) { this.activeFicha = updated; this._renderFichaCursos(updated); this._populateSelectCurso(updated); }
                } catch (err) {
                    this._toast(err.message, 'error');
                    btn.disabled = false; btn.textContent = '✓';
                }
            });
        });
    }

    _populateSelectCurso(ficha) {
        const assignedIds = new Set((ficha.cursos || []).map(fc => fc.curso.id));
        const disponibles = this.cursos.filter(c => !assignedIds.has(c.id) && c.estado);
        const sel = document.getElementById('select-curso-asignar');
        sel.innerHTML = disponibles.length
            ? '<option value="">— Selecciona un curso —</option>' +
              disponibles.map(c => `<option value="${c.id}">${c.titulo}</option>`).join('')
            : '<option value="">Sin cursos disponibles</option>';
    }

    async _doAsignarCurso() {
        const cursoId     = Number(document.getElementById('select-curso-asignar').value);
        const fechaLimite = document.getElementById('input-fecha-limite').value || null;
        if (!cursoId || !this.activeFicha) return this._toast('Selecciona un curso', 'error');

        const btn = document.getElementById('btn-asignar-curso');
        btn.disabled = true; btn.textContent = 'Asignando...';
        try {
            const res = await InstructorService.asignarCursoAFicha(this.activeFicha.id, cursoId, fechaLimite);
            this._toast(res.message, 'success');
            document.getElementById('input-fecha-limite').value = '';
            await this._loadAll();
            const updated = this.fichas.find(f => f.id === this.activeFicha.id);
            if (updated) {
                this.activeFicha = updated;
                this._renderFichaCursos(updated);
                this._renderAprendices(updated);
                this._populateSelectCurso(updated);
            }
        } catch (err) {
            this._toast(err.message, 'error');
        } finally {
            btn.disabled = false; btn.textContent = 'Asignar';
        }
    }

    async _quitarCurso(cursoId) {
        if (!this.activeFicha) return;
        try {
            await InstructorService.quitarCursoDeFicha(this.activeFicha.id, cursoId);
            this._toast('Curso removido de la ficha', 'success');
            await this._loadAll();
            const updated = this.fichas.find(f => f.id === this.activeFicha.id);
            if (updated) {
                this.activeFicha = updated;
                this._renderFichaCursos(updated);
                this._populateSelectCurso(updated);
            }
        } catch (err) {
            this._toast(err.message, 'error');
        }
    }

    /* ── Cursos tab ──────────────────────────────────────── */
    _renderCursos() {
        const tbody = document.getElementById('cursos-tbody');
        if (!this.cursos.length) {
            tbody.innerHTML = '<tr><td colspan="6" class="inst-loading-row" style="color:#94a3b8">Aún no has creado cursos</td></tr>';
            return;
        }
        tbody.innerHTML = this.cursos.map(c => {
            const fichasChips = (c.fichas || []).map(fc =>
                `<span class="inst-ficha-tag">${fc.ficha.numero}</span>`
            ).join('');
            const estadoDot = c.estado
                ? '<span class="inst-estado-dot active">Activo</span>'
                : '<span class="inst-estado-dot inactive">Inactivo</span>';
            return `
            <tr>
                <td>
                    <div class="inst-curso-title">${c.titulo}</div>
                    ${c.descripcion ? `<div class="inst-curso-desc">${c.descripcion}</div>` : ''}
                </td>
                <td><span class="inst-nivel-badge nivel-${c.nivel}">${this._nivelLabel(c.nivel)}</span></td>
                <td>
                    <div class="inst-fichas-chips">
                        ${fichasChips || '<span style="color:#94a3b8;font-size:.78rem">Sin asignar</span>'}
                    </div>
                </td>
                <td>${c._count?.inscripciones ?? 0}</td>
                <td>${estadoDot}</td>
                <td>
                    <div style="display:flex;gap:.3rem;justify-content:flex-end">
                        <button class="inst-btn-icon btn-mod-curso" data-id="${c.id}" data-titulo="${c.titulo}" title="Gestionar módulos">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/>
                            </svg>
                        </button>
                        <button class="inst-btn-icon edit btn-edit-curso" data-id="${c.id}" title="Editar">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/>
                                <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
                            </svg>
                        </button>
                        <button class="inst-btn-icon delete btn-del-curso" data-id="${c.id}" data-titulo="${c.titulo}" title="Eliminar">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/>
                                <path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2"/>
                            </svg>
                        </button>
                    </div>
                </td>
            </tr>`;
        }).join('');

        tbody.querySelectorAll('.btn-mod-curso').forEach(btn =>
            btn.addEventListener('click', () => ModulesModal.open(Number(btn.dataset.id), btn.dataset.titulo))
        );
        tbody.querySelectorAll('.btn-edit-curso').forEach(btn =>
            btn.addEventListener('click', () => this._openCursoModal(Number(btn.dataset.id)))
        );
        tbody.querySelectorAll('.btn-del-curso').forEach(btn =>
            btn.addEventListener('click', () => this._openDelModal(Number(btn.dataset.id), btn.dataset.titulo))
        );
    }

    /* ── Curso modal (create/edit) ───────────────────────── */
    _openCursoModal(cursoId = null) {
        this.editingCursoId = cursoId;
        const isEdit = cursoId !== null;
        document.getElementById('curso-modal-title').textContent = isEdit ? 'Editar Curso' : 'Nuevo Curso';
        document.getElementById('estado-group').style.display = isEdit ? '' : 'none';
        document.getElementById('error-titulo').style.display = 'none';
        document.getElementById('input-titulo').classList.remove('is-invalid');

        if (isEdit) {
            const c = this.cursos.find(x => x.id === cursoId);
            if (!c) return;
            document.getElementById('input-titulo').value       = c.titulo;
            document.getElementById('input-descripcion').value  = c.descripcion || '';
            document.getElementById('input-nivel').value        = c.nivel;
            document.getElementById('input-estado').checked     = c.estado;
        } else {
            document.getElementById('form-curso').reset();
        }
        document.getElementById('modal-curso').classList.add('open');
    }

    _closeCursoModal() {
        document.getElementById('modal-curso').classList.remove('open');
        this.editingCursoId = null;
    }

    async _saveCurso() {
        const titulo = document.getElementById('input-titulo').value.trim();
        if (!titulo) {
            document.getElementById('input-titulo').classList.add('is-invalid');
            const err = document.getElementById('error-titulo');
            err.textContent = 'El título es obligatorio';
            err.style.display = 'block';
            return;
        }

        const payload = {
            titulo,
            descripcion: document.getElementById('input-descripcion').value.trim() || null,
            nivel:       document.getElementById('input-nivel').value,
        };
        if (this.editingCursoId !== null) {
            payload.estado = document.getElementById('input-estado').checked;
        }

        const btn = document.getElementById('btn-save-curso');
        btn.disabled = true; btn.textContent = 'Guardando...';
        try {
            if (this.editingCursoId !== null) {
                await InstructorService.actualizarCurso(this.editingCursoId, payload);
                this._toast('Curso actualizado', 'success');
            } else {
                await InstructorService.crearCurso(payload);
                this._toast('Curso creado', 'success');
            }
            this._closeCursoModal();
            await this._loadAll();
        } catch (err) {
            this._toast(err.message, 'error');
        } finally {
            btn.disabled = false; btn.textContent = 'Guardar';
        }
    }

    /* ── Delete modal ────────────────────────────────────── */
    _openDelModal(cursoId, titulo) {
        this.deletingCursoId = cursoId;
        document.getElementById('del-curso-name').textContent = titulo;
        document.getElementById('modal-del-curso').classList.add('open');
    }

    _closeDelModal() {
        document.getElementById('modal-del-curso').classList.remove('open');
        this.deletingCursoId = null;
    }

    async _confirmDeleteCurso() {
        if (!this.deletingCursoId) return;
        const btn = document.getElementById('btn-confirm-del');
        btn.disabled = true; btn.textContent = 'Eliminando...';
        try {
            await InstructorService.eliminarCurso(this.deletingCursoId);
            this._toast('Curso eliminado', 'success');
            this._closeDelModal();
            await this._loadAll();
        } catch (err) {
            this._toast(err.message, 'error');
        } finally {
            btn.disabled = false; btn.textContent = 'Eliminar';
        }
    }

    /* ── Progreso tab ────────────────────────────────────── */
    _renderProgresoResumen() {
        const grid  = document.getElementById('prog-fichas-grid');
        const empty = document.getElementById('prog-empty');
        const fichasConCursos = this.fichas.filter(f => (f.cursos?.length ?? 0) > 0);

        if (!fichasConCursos.length) {
            grid.innerHTML = '';
            empty.style.display = '';
            return;
        }
        empty.style.display = 'none';
        grid.innerHTML = fichasConCursos.map(f => `
        <div class="prog-ficha-card" data-id="${f.id}">
            <div class="prog-ficha-top">
                <span class="prog-ficha-num">Ficha ${f.numero}</span>
                <span class="inst-ficha-estado est-${f.estado}">${f.estado}</span>
            </div>
            <div class="prog-ficha-prog">${f.programa?.nombre || '—'}</div>
            <div class="prog-ficha-meta">
                <span>${f._count?.aprendices ?? 0} aprendices</span>
                <span>${f.cursos?.length ?? 0} cursos</span>
            </div>
            <button class="prog-ver-btn">Ver progreso →</button>
        </div>`).join('');

        grid.querySelectorAll('.prog-ficha-card').forEach(card =>
            card.addEventListener('click', () => this._openProgresoDetalle(Number(card.dataset.id)))
        );
    }

    async _openProgresoDetalle(fichaId) {
        document.getElementById('progreso-resumen').style.display = 'none';
        const detalleEl = document.getElementById('progreso-detalle');
        detalleEl.style.display = '';
        document.getElementById('prog-detalle-body').innerHTML = '<div class="prog-loading"><div class="spinner"></div><span>Cargando progreso…</span></div>';

        try {
            const data = await InstructorService.getProgresoFicha(fichaId);
            document.getElementById('prog-ficha-title').textContent = `Ficha ${data.ficha.numero}`;
            document.getElementById('prog-ficha-sub').textContent   = `${data.ficha.programa} · ${data.aprendices.length} aprendices · Promedio general: ${data.avgProgreso}%`;
            document.getElementById('prog-detalle-body').innerHTML  = this._buildProgresoTable(data);
        } catch (err) {
            document.getElementById('prog-detalle-body').innerHTML = `<p class="prog-error">${err.message}</p>`;
        }
    }

    _buildProgresoTable(data) {
        if (!data.aprendices.length || !data.cursos.length) {
            return '<p class="inst-empty-list">Esta ficha no tiene aprendices o cursos asignados.</p>';
        }

        const cursoCols = data.cursos.map(c =>
            `<th class="prog-th-curso"><span class="prog-curso-lbl">${this._esc(c.titulo)}</span><br><span class="inst-nivel-badge nivel-${c.nivel}">${this._nivelLabel(c.nivel)}</span></th>`
        ).join('');

        const rows = data.aprendices.map(apr => {
            const initials = (apr.nombre || apr.correo || '?').slice(0, 2).toUpperCase();
            const celdas = apr.cursos.map(cp => {
                if (cp.progreso === null) {
                    return `<td class="prog-td"><span class="prog-na">—</span></td>`;
                }
                const pct = Math.round(cp.progreso);
                const cls = pct >= 80 ? 'high' : pct >= 40 ? 'mid' : 'low';
                return `<td class="prog-td">
                    <div class="prog-bar-wrap">
                        <div class="prog-bar prog-bar-${cls}" style="width:${pct}%"></div>
                    </div>
                    <span class="prog-pct">${pct}%</span>
                </td>`;
            }).join('');

            const gp   = apr.progresoGeneral;
            const gcls = gp >= 80 ? 'high' : gp >= 40 ? 'mid' : 'low';

            return `<tr>
                <td class="prog-td-apr-cell">
                    <div class="prog-td-apr">
                        <div class="inst-avatar" style="background:#ede9fe;color:#5b21b6;width:30px;height:30px;font-size:.7rem;flex-shrink:0">${initials}</div>
                        <div>
                            <div class="prog-apr-name">${this._esc(apr.nombre || '—')}</div>
                            <div class="prog-apr-email">${this._esc(apr.correo)}</div>
                        </div>
                    </div>
                </td>
                ${celdas}
                <td class="prog-td prog-td-general">
                    <div class="prog-bar-wrap">
                        <div class="prog-bar prog-bar-${gcls}" style="width:${gp}%"></div>
                    </div>
                    <span class="prog-pct prog-pct-bold">${gp}%</span>
                </td>
            </tr>`;
        }).join('');

        const scrollHint = data.cursos.length > 3
            ? `<p class="prog-scroll-hint">← Desplázate horizontalmente para ver todos los cursos →</p>`
            : '';

        return `
        <div class="prog-table-wrap">
            <table class="prog-table">
                <thead>
                    <tr>
                        <th class="prog-th-apr">Aprendiz</th>
                        ${cursoCols}
                        <th class="prog-th-general">General</th>
                    </tr>
                </thead>
                <tbody>${rows}</tbody>
            </table>
        </div>
        ${scrollHint}`;
    }

    _esc(s) {
        return String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    }

    /* ── Tab helpers ─────────────────────────────────────── */
    _switchTab(tab) {
        document.querySelectorAll('.inst-tab-btn').forEach(b =>
            b.classList.toggle('active', b.dataset.tab === tab)
        );
        document.querySelectorAll('.inst-tab-pane').forEach(p =>
            p.classList.toggle('active', p.id === `pane-${tab}`)
        );
        if (tab === 'progreso') {
            document.getElementById('progreso-resumen').style.display = '';
            document.getElementById('progreso-detalle').style.display = 'none';
            this._renderProgresoResumen();
        }
    }

    _switchInnerTab(tab) {
        this.activeInnerTab = tab;
        document.querySelectorAll('.inst-inner-tab').forEach(b =>
            b.classList.toggle('active', b.dataset.inner === tab)
        );
        document.getElementById('inner-aprendices').style.display  = tab === 'aprendices'   ? '' : 'none';
        document.getElementById('inner-ficha-cursos').style.display = tab === 'ficha-cursos' ? '' : 'none';
    }

    /* ── Helpers ─────────────────────────────────────────── */
    _toDateInput(iso) {
        const d = new Date(iso);
        const pad = n => String(n).padStart(2, '0');
        return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
    }
    _formatFecha(iso) {
        const d = new Date(iso);
        const fecha = d.toLocaleDateString('es-CO', { day: '2-digit', month: 'short', year: 'numeric' });
        const hora  = d.toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit', hour12: false });
        return `${fecha}, ${hora}`;
    }
    _jornadaLabel(j) {
        return { manana: 'Mañana', diurna: 'Diurna', nocturna: 'Nocturna', mixta: 'Mixta', madrugada: 'Madrugada' }[j] || j;
    }
    _nivelLabel(n) {
        return { basico: 'Básico', intermedio: 'Intermedio', avanzado: 'Avanzado' }[n] || n;
    }

    _toast(msg, type = 'success') {
        const c = document.getElementById('toast-container');
        const t = document.createElement('div');
        t.className = `inst-toast ${type}`;
        t.textContent = msg;
        c.appendChild(t);
        requestAnimationFrame(() => t.classList.add('show'));
        setTimeout(() => { t.classList.remove('show'); setTimeout(() => t.remove(), 300); }, 3500);
    }
}

document.addEventListener('DOMContentLoaded', () => new InstructorController());
