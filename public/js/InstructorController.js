class InstructorController {
    constructor() {
        this.fichas          = [];
        this.cursos          = [];
        this.catalogo        = [];
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

        // Modal fichas de un curso
        document.getElementById('btn-close-fichas-curso').addEventListener('click', () =>
            document.getElementById('modal-fichas-curso').classList.remove('open')
        );
        document.getElementById('modal-fichas-curso').addEventListener('click', e => {
            if (e.target === document.getElementById('modal-fichas-curso'))
                document.getElementById('modal-fichas-curso').classList.remove('open');
        });

        // Progreso tab — volver
        document.getElementById('btn-volver-progreso').addEventListener('click', () => {
            document.getElementById('progreso-detalle').style.display = 'none';
            document.getElementById('progreso-resumen').style.display = '';
            // Resetear buscador
            const si = document.getElementById('prog-search');
            if (si) si.value = '';
            document.getElementById('prog-search-bar').style.display   = 'none';
            document.getElementById('prog-search-clear').style.display = 'none';
            document.getElementById('prog-no-results').style.display   = 'none';
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
            const [fichas, cursos, resumen, catalogo] = await Promise.all([
                InstructorService.getMisFichas(),
                InstructorService.getMisCursos(),
                InstructorService.getProgresoResumen().catch(() => []),
                InstructorService.getCatalogo().catch(() => []),
            ]);
            this.fichas    = fichas;
            this.cursos    = cursos;
            this.catalogo  = catalogo;
            this.progresoMap = {};
            for (const r of resumen) this.progresoMap[r.fichaId] = r.avgProgreso;
            this._renderStats();
            this._renderFichas();
            this._renderCursos();
            this._renderCatalogo();
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
                    <i class="bi bi-mortarboard" style="font-size:13px"></i>
                    ${nApr} aprendices
                </span>
                <span class="inst-ficha-chip">
                    <i class="bi bi-book-fill" style="font-size:13px"></i>
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

        // Limpiar búsqueda previa al abrir otra ficha
        const searchInput = document.getElementById('apr-search');
        if (searchInput) { searchInput.value = ''; }
        document.getElementById('apr-search-clear').style.display = 'none';
        document.getElementById('apr-no-results').style.display   = 'none';

        this._updateAprCount(apr.length, apr.length);

        if (!apr.length) {
            list.innerHTML = '<p class="inst-empty-list">Sin aprendices inscritos</p>';
            document.getElementById('apr-count-badge').style.display = 'none';
            return;
        }

        list.innerHTML = apr.map(a => {
            const u        = a.aprendiz;
            const initials = (u.nombre_usuario || u.correo_usuario || '?').slice(0, 2).toUpperCase();
            const isOn     = u.estado_usuario;
            const searchKey = `${u.nombre_usuario || ''} ${u.correo_usuario || ''}`.toLowerCase();
            return `
            <div class="inst-member-row apr-row" data-search="${this._esc(searchKey)}">
                <div class="inst-avatar" style="background:#e0f2fe;color:#0369a1">${initials}</div>
                <div class="inst-member-info">
                    <div class="inst-member-name">${this._esc(u.nombre_usuario || '—')}</div>
                    <div class="inst-member-email">${this._esc(u.correo_usuario)}</div>
                </div>
                <span class="inst-status-dot ${isOn ? 'on' : 'off'}">${isOn ? 'Activo' : 'Inactivo'}</span>
            </div>`;
        }).join('');

        // Bind filtro (se rebindea cada vez que se abre la ficha)
        this._bindAprSearch(apr.length);
    }

    _bindAprSearch(total) {
        const input    = document.getElementById('apr-search');
        const clearBtn = document.getElementById('apr-search-clear');
        const noResult = document.getElementById('apr-no-results');
        const term     = document.getElementById('apr-no-results-term');

        // Remover listeners previos clonando el nodo
        const newInput = input.cloneNode(true);
        input.parentNode.replaceChild(newInput, input);

        newInput.addEventListener('input', () => {
            const q     = newInput.value.trim().toLowerCase();
            clearBtn.style.display = q ? '' : 'none';

            const rows  = document.querySelectorAll('#aprendices-list .apr-row');
            let visible = 0;
            rows.forEach(row => {
                const match = !q || row.dataset.search.includes(q);
                row.style.display = match ? '' : 'none';
                if (match) visible++;
            });

            noResult.style.display = (q && visible === 0) ? '' : 'none';
            if (term) term.textContent = newInput.value.trim();
            this._updateAprCount(visible, total);
        });

        clearBtn.addEventListener('click', () => {
            newInput.value = '';
            clearBtn.style.display = 'none';
            document.querySelectorAll('#aprendices-list .apr-row').forEach(r => r.style.display = '');
            noResult.style.display = 'none';
            this._updateAprCount(total, total);
            newInput.focus();
        });
    }

    _bindProgresoSearch(total) {
        const input    = document.getElementById('prog-search');
        const clearBtn = document.getElementById('prog-search-clear');
        const noResult = document.getElementById('prog-no-results');
        const termEl   = document.getElementById('prog-no-results-term');
        const badge    = document.getElementById('prog-count-badge');

        // Inicializar badge
        if (badge) { badge.textContent = total; badge.classList.remove('apr-count-filtered'); }

        // Remover listeners previos clonando el nodo
        const newInput = input.cloneNode(true);
        input.parentNode.replaceChild(newInput, input);

        newInput.addEventListener('input', () => {
            const q = newInput.value.trim().toLowerCase();
            clearBtn.style.display = q ? '' : 'none';

            const rows = document.querySelectorAll('#prog-detalle-body .prog-apr-row');
            let visible = 0;
            rows.forEach(row => {
                const match = !q || row.dataset.search.includes(q);
                row.style.display = match ? '' : 'none';
                if (match) visible++;
            });

            noResult.style.display = (q && visible === 0) ? '' : 'none';
            if (termEl) termEl.textContent = newInput.value.trim();
            if (badge) {
                badge.textContent = visible < total ? `${visible} de ${total}` : `${total}`;
                badge.classList.toggle('apr-count-filtered', visible < total);
            }
        });

        clearBtn.addEventListener('click', () => {
            newInput.value = '';
            clearBtn.style.display = 'none';
            document.querySelectorAll('#prog-detalle-body .prog-apr-row').forEach(r => r.style.display = '');
            noResult.style.display = 'none';
            if (badge) { badge.textContent = total; badge.classList.remove('apr-count-filtered'); }
            newInput.focus();
        });
    }

    _updateAprCount(visible, total) {
        const pill  = document.getElementById('pill-aprendices');
        const badge = document.getElementById('apr-count-badge');
        if (pill)  pill.textContent  = visible;
        if (badge) {
            badge.textContent    = visible < total ? `${visible} de ${total}` : `${total}`;
            badge.style.display  = total ? '' : 'none';
            badge.classList.toggle('apr-count-filtered', visible < total);
        }
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
                    <i class="bi bi-book-fill" style="font-size:16px"></i>
                </div>
                <div class="inst-member-info">
                    <div class="inst-member-name">${this._esc(c.titulo)}</div>
                    <div class="inst-member-email">${this._nivelLabel(c.nivel)}</div>
                </div>
                <div class="fc-deadline-wrap">
                    <div class="fc-deadline-display">
                        ${fechaLabel
                            ? `<span class="fc-deadline-date${vencido ? ' fc-deadline-vencido' : ''}">
                                   <i class="bi bi-calendar3" style="font-size:11px"></i>
                                   ${fechaLabel}${vencido ? ' · Vencido' : ''}
                               </span>`
                            : `<span class="fc-deadline-none">Sin plazo</span>`
                        }
                        <button class="fc-edit-btn" data-curso-id="${c.id}" title="Editar fecha límite">
                            <i class="bi bi-pencil" style="font-size:12px"></i>
                        </button>
                    </div>
                    <div class="fc-deadline-form" style="display:none">
                        <input type="datetime-local" class="inst-fecha-input fc-date-input" value="${fechaISO}">
                        <button class="fc-save-btn inst-btn inst-btn-primary" style="padding:.25rem .55rem;font-size:.75rem">✓</button>
                        <button class="fc-cancel-btn inst-btn inst-btn-ghost" style="padding:.25rem .55rem;font-size:.75rem">✕</button>
                    </div>
                </div>
                <button class="inst-btn-icon unlink" data-curso-id="${c.id}" title="Quitar de la ficha">
                    <i class="bi bi-x-lg" style="font-size:14px"></i>
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
            tbody.innerHTML = '<tr><td colspan="7" class="inst-loading-row" style="color:#94a3b8">Aún no has creado cursos</td></tr>';
            return;
        }
        tbody.innerHTML = this.cursos.map(c => {
            const nFichas   = (c.fichas || []).length;
            const fichaCell = nFichas > 0
                ? `<button class="btn-ver-fichas" data-id="${c.id}">
                       <i class="bi bi-calendar3" style="font-size:12px"></i>
                       ${nFichas} ${nFichas === 1 ? 'ficha' : 'fichas'}
                   </button>`
                : `<span class="fichas-sin-asignar">Sin asignar</span>`;

            const estadoDot = c.estado
                ? '<span class="inst-estado-dot active">Activo</span>'
                : '<span class="inst-estado-dot inactive">Inactivo</span>';

            const isPublic = c.visibilidad === 'publico';
            const visiBadge = isPublic
                ? `<span class="inst-visi-badge publico"><i class="bi bi-globe" style="font-size:11px"></i> Público</span>`
                : `<span class="inst-visi-badge privado"><i class="bi bi-lock-fill" style="font-size:11px"></i> Privado</span>`;
            const visiToggleTitle = isPublic ? 'Hacer privado' : 'Hacer público';
            const visiToggleIcon  = isPublic ? 'bi-lock-fill'  : 'bi-globe';

            return `
            <tr>
                <td>
                    <div class="inst-curso-title">${this._esc(c.titulo)}</div>
                    ${c.descripcion ? `<div class="inst-curso-desc">${this._esc(c.descripcion)}</div>` : ''}
                </td>
                <td><span class="inst-nivel-badge nivel-${c.nivel}">${this._nivelLabel(c.nivel)}</span></td>
                <td>${fichaCell}</td>
                <td>${c._count?.inscripciones ?? 0}</td>
                <td>${estadoDot}</td>
                <td>
                    <div style="display:flex;align-items:center;gap:.4rem">
                        ${visiBadge}
                        <button class="inst-btn-icon btn-toggle-visi" data-id="${c.id}" data-visi="${c.visibilidad}" title="${visiToggleTitle}" style="padding:.25rem .35rem">
                            <i class="bi ${visiToggleIcon}" style="font-size:13px"></i>
                        </button>
                    </div>
                </td>
                <td>
                    <div style="display:flex;gap:.3rem;justify-content:flex-end">
                        <button class="inst-btn-icon btn-mod-curso" data-id="${c.id}" data-titulo="${this._esc(c.titulo)}" title="Gestionar módulos">
                            <i class="bi bi-book-fill" style="font-size:14px"></i>
                        </button>
                        <button class="inst-btn-icon edit btn-edit-curso" data-id="${c.id}" title="Editar">
                            <i class="bi bi-pencil" style="font-size:14px"></i>
                        </button>
                        <button class="inst-btn-icon delete btn-del-curso" data-id="${c.id}" data-titulo="${this._esc(c.titulo)}" title="Eliminar">
                            <i class="bi bi-trash" style="font-size:14px"></i>
                        </button>
                    </div>
                </td>
            </tr>`;
        }).join('');

        tbody.querySelectorAll('.btn-ver-fichas').forEach(btn =>
            btn.addEventListener('click', () => this._openFichasCursoModal(Number(btn.dataset.id)))
        );
        tbody.querySelectorAll('.btn-toggle-visi').forEach(btn =>
            btn.addEventListener('click', () => this._toggleVisibilidad(Number(btn.dataset.id), btn.dataset.visi))
        );
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

    /* ── Visibilidad toggle ──────────────────────────────── */
    async _toggleVisibilidad(cursoId, currentVisi) {
        const nueva = currentVisi === 'publico' ? 'privado' : 'publico';
        try {
            await InstructorService.toggleVisibilidad(cursoId, nueva);
            this._toast(`Curso ${nueva === 'publico' ? 'publicado' : 'marcado como privado'}`, 'success');
            await this._loadAll();
        } catch (err) {
            this._toast(err.message, 'error');
        }
    }

    /* ── Catálogo tab ────────────────────────────────────── */
    _renderCatalogo() {
        const tbody = document.getElementById('catalogo-tbody');
        const empty = document.getElementById('catalogo-empty');
        if (!tbody) return;

        if (!this.catalogo.length) {
            tbody.innerHTML = '';
            if (empty) empty.style.display = '';
            return;
        }
        if (empty) empty.style.display = 'none';

        tbody.innerHTML = this.catalogo.map(c => {
            const autor   = c.instructor?.nombre_usuario || '—';
            const nMod    = c._count?.modulos     ?? 0;
            const nInscr  = c._count?.inscripciones ?? 0;
            return `
            <tr>
                <td>
                    <div class="inst-curso-title">${this._esc(c.titulo)}</div>
                    ${c.descripcion ? `<div class="inst-curso-desc">${this._esc(c.descripcion)}</div>` : ''}
                </td>
                <td><span class="inst-nivel-badge nivel-${c.nivel}">${this._nivelLabel(c.nivel)}</span></td>
                <td><span style="font-size:.82rem;color:#475569">${this._esc(autor)}</span></td>
                <td>${nMod}</td>
                <td>${nInscr}</td>
                <td>
                    <div style="display:flex;justify-content:flex-end">
                        <button class="inst-btn inst-btn-primary btn-duplicar-curso" data-id="${c.id}" style="font-size:.78rem;padding:.3rem .75rem;gap:.35rem">
                            <i class="bi bi-files" style="font-size:13px"></i>
                            Duplicar como plantilla
                        </button>
                    </div>
                </td>
            </tr>`;
        }).join('');

        tbody.querySelectorAll('.btn-duplicar-curso').forEach(btn =>
            btn.addEventListener('click', () => this._duplicarCurso(Number(btn.dataset.id), btn))
        );
    }

    async _duplicarCurso(cursoId, btn) {
        if (btn) { btn.disabled = true; btn.textContent = 'Duplicando…'; }
        try {
            const res = await InstructorService.duplicarCurso(cursoId);
            this._toast(`Curso "${res.curso.titulo}" creado en Mis Cursos`, 'success');
            await this._loadAll();
            this._switchTab('cursos');
        } catch (err) {
            this._toast(err.message, 'error');
            if (btn) { btn.disabled = false; btn.innerHTML = '<i class="bi bi-files" style="font-size:13px"></i> Duplicar como plantilla'; }
        }
    }

    /* ── Modal fichas de un curso ───────────────────────── */
    _openFichasCursoModal(cursoId) {
        const curso = this.cursos.find(c => c.id === cursoId);
        if (!curso) return;

        document.getElementById('fichas-curso-modal-title').textContent = curso.titulo;

        const body = document.getElementById('fichas-curso-modal-body');

        if (!(curso.fichas || []).length) {
            body.innerHTML = '<p class="inst-empty-list">Este curso no está asignado a ninguna ficha.</p>';
        } else {
            body.innerHTML = curso.fichas.map(fc => {
                // Enriquecer con datos completos de this.fichas
                const full = this.fichas.find(f => f.id === fc.ficha.id) || {};
                const num      = fc.ficha.numero;
                const prog     = fc.ficha.programa?.nombre || full.programa?.nombre || '—';
                const jornada  = full.jornada  ? this._jornadaLabel(full.jornada) : null;
                const modalidad = full.modalidad || null;
                const estado   = full.estado   || 'activo';
                const nApr     = full._count?.aprendices ?? full.aprendices?.length ?? '—';
                const nCur     = full.cursos?.length ?? '—';
                const meta     = [jornada, modalidad].filter(Boolean).join(' · ');

                return `
                <div class="fc-modal-card">
                    <div class="fc-modal-card-top">
                        <span class="fc-modal-num">Ficha ${num}</span>
                        <span class="inst-ficha-estado est-${estado}">${estado}</span>
                    </div>
                    <div class="fc-modal-prog">${this._esc(prog)}</div>
                    ${meta ? `<div class="fc-modal-meta">${this._esc(meta)}</div>` : ''}
                    <div class="fc-modal-stats">
                        <span class="fc-modal-stat">
                            <i class="bi bi-mortarboard" style="font-size:11px"></i>
                            ${nApr} aprendices
                        </span>
                        <span class="fc-modal-stat">
                            <i class="bi bi-book-fill" style="font-size:11px"></i>
                            ${nCur} cursos asignados
                        </span>
                    </div>
                </div>`;
            }).join('');
        }

        document.getElementById('modal-fichas-curso').classList.add('open');
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
        document.getElementById('progreso-detalle').style.display = '';
        document.getElementById('prog-search-bar').style.display  = 'none';
        document.getElementById('prog-no-results').style.display  = 'none';
        document.getElementById('prog-detalle-body').innerHTML =
            '<div class="prog-loading"><div class="spinner"></div><span>Cargando progreso…</span></div>';

        try {
            const data = await InstructorService.getProgresoFicha(fichaId);
            document.getElementById('prog-ficha-title').textContent = `Ficha ${data.ficha.numero}`;
            document.getElementById('prog-ficha-sub').textContent   =
                `${data.ficha.programa} · ${data.aprendices.length} aprendices · Promedio general: ${data.avgProgreso}%`;
            document.getElementById('prog-detalle-body').innerHTML  = this._buildProgresoTable(data);

            if (data.aprendices.length > 1) {
                document.getElementById('prog-search-bar').style.display = '';
                this._bindProgresoSearch(data.aprendices.length);
            }
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

            const searchKey = `${apr.nombre || ''} ${apr.correo || ''}`.toLowerCase();
            return `<tr class="prog-apr-row" data-search="${this._esc(searchKey)}">
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
        if (tab === 'catalogo') {
            this._renderCatalogo();
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
