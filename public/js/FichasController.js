class FichasController {
    constructor() {
        this.fichas       = [];
        this.programas    = [];
        this.instructores = [];
        this.aprendices   = [];
        this.currentFicha = null;
        this._init();
    }

    async _init() {
        const token = AuthGuard.requireAuth(['admin']);
        if (!token) return;

        const payload = AuthGuard.getUser();
        document.getElementById('user-email').textContent = payload?.nombre || '';
        document.getElementById('btn-logout').addEventListener('click', () => AuthGuard.logout());

        this._bindUI();
        await this._loadAll();
    }

    _bindUI() {
        // Búsqueda y filtros fichas
        document.getElementById('search').addEventListener('input',         () => this._renderFichasTable());
        document.getElementById('filter-estado').addEventListener('change', () => this._renderFichasTable());
        document.getElementById('filter-programa').addEventListener('change',() => this._renderFichasTable());

        // Búsqueda y filtros programas
        document.getElementById('search-programas').addEventListener('input',  () => this._renderProgramasTable());
        document.getElementById('filter-nivel').addEventListener('change',     () => this._renderProgramasTable());

        // Tabs principales de la página
        document.querySelectorAll('.page-tab-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.page-tab-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                document.querySelectorAll('.page-tab-pane').forEach(p => p.classList.remove('active'));
                document.getElementById(`page-tab-${btn.dataset.tab}`).classList.add('active');
            });
        });

        // Botones nueva ficha / nuevo programa
        document.getElementById('btn-new-ficha').addEventListener('click',    () => this._openFichaModal());
        document.getElementById('btn-new-programa').addEventListener('click', () => this._openProgramaModal());

        // Formularios
        document.getElementById('ficha-form').addEventListener('submit',    e => this._saveFicha(e));
        document.getElementById('programa-form').addEventListener('submit',  e => this._savePrograma(e));

        // Cancelar modales
        document.getElementById('btn-cancel-ficha').addEventListener('click',    () => this._closeModal('modal-ficha'));
        document.getElementById('btn-cancel-programa').addEventListener('click', () => this._closeModal('modal-programa'));

        // Modal detalle (gestión de miembros)
        document.getElementById('btn-close-detail').addEventListener('click', () => this._closeModal('modal-detail'));

        // Tabs del detalle de ficha
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));
                document.getElementById(`tab-${btn.dataset.tab}`).classList.add('active');
            });
        });

        // Asignaciones
        document.getElementById('btn-asignar-instructor').addEventListener('click', () => this._asignarInstructor());
        document.getElementById('btn-inscribir-aprendiz').addEventListener('click', () => this._inscribirAprendiz());

        // Buscador de miembros en modal detalle
        document.getElementById('members-search').addEventListener('input', () => {
            const q = document.getElementById('members-search').value;
            document.getElementById('btn-clear-search').style.display = q ? '' : 'none';
            this._renderDetail();
        });
        document.getElementById('btn-clear-search').addEventListener('click', () => {
            document.getElementById('members-search').value = '';
            document.getElementById('btn-clear-search').style.display = 'none';
            this._renderDetail();
        });

        // Cerrar con overlay
        document.querySelectorAll('.modal-overlay').forEach(overlay => {
            overlay.addEventListener('click', e => {
                if (e.target === overlay) this._closeModal(overlay.id);
            });
        });
    }

    async _loadAll() {
        this._setLoading(true);
        try {
            [this.fichas, this.programas, this.instructores, this.aprendices] = await Promise.all([
                FichasService.getAll(),
                FichasService.getProgramas(),
                FichasService.getInstructores(),
                FichasService.getAprendices(),
            ]);
            this._renderFichasTable();
            this._renderProgramasTable();
            this._populateSelects();
        } catch (err) {
            this._toast(err.message, 'error');
        } finally {
            this._setLoading(false);
        }
    }

    // ── Tabla Fichas ──────────────────────────────────────
    _renderFichasTable() {
        const search    = document.getElementById('search').value.toLowerCase();
        const estado    = document.getElementById('filter-estado').value;
        const programaF = document.getElementById('filter-programa').value;

        const filtered = this.fichas.filter(f => {
            const matchSearch = !search ||
                f.numero.toLowerCase().includes(search) ||
                f.programa?.nombre.toLowerCase().includes(search);
            const matchEstado   = !estado    || f.estado === estado;
            const matchPrograma = !programaF || String(f.programaId) === programaF;
            return matchSearch && matchEstado && matchPrograma;
        });

        const tbody = document.getElementById('fichas-tbody');
        if (!filtered.length) {
            tbody.innerHTML = `<tr><td colspan="7" class="empty-row">No hay fichas registradas</td></tr>`;
            return;
        }

        tbody.innerHTML = filtered.map(f => `
            <tr>
                <td><strong>${f.numero}</strong></td>
                <td>
                    <div style="font-size:.85rem;font-weight:600">${f.programa?.nombre || '—'}</div>
                    <div style="font-size:.72rem;color:var(--gray-400)">${f.programa?.codigo || ''} · ${f.programa?.nivel || ''}</div>
                </td>
                <td><span class="badge badge-${f.jornada}">${f.jornada === 'manana' ? 'Mañana' : f.jornada.charAt(0).toUpperCase() + f.jornada.slice(1)}</span></td>
                <td><span class="badge badge-${f.modalidad}">${f.modalidad.charAt(0).toUpperCase() + f.modalidad.slice(1)}</span></td>
                <td><span class="estado-badge estado-${f.estado}">${f.estado.charAt(0).toUpperCase() + f.estado.slice(1)}</span></td>
                <td>
                    <span class="count-chip instructores-chip">
                        <i class="bi bi-person-workspace" style="font-size:11px"></i>
                        ${f._count.instructores} instructor${f._count.instructores !== 1 ? 'es' : ''}
                    </span><br style="margin:.2rem 0">
                    <span class="count-chip aprendices-chip">
                        <i class="bi bi-mortarboard" style="font-size:11px"></i>
                        ${f._count.aprendices} aprendiz/ces
                    </span>
                </td>
                <td class="actions-cell" style="gap:.5rem">
                    <button class="btn btn-members-row" onclick="app._openDetail(${f.id})">
                        <i class="bi bi-people-fill" style="font-size:13px"></i>
                        <span style="font-size:.75rem;font-weight:700;color:var(--gray-400)">${f._count.instructores + f._count.aprendices}</span>
                        Miembros
                    </button>
                    <button class="btn-action btn-edit" title="Editar ficha" onclick="app._openFichaModal(${f.id})">
                        <i class="bi bi-pencil" style="font-size:14px"></i>
                    </button>
                    <button class="btn-action btn-delete" title="Eliminar ficha" onclick="app._deleteFicha(${f.id})">
                        <i class="bi bi-trash" style="font-size:14px"></i>
                    </button>
                </td>
            </tr>`).join('');
    }

    // ── Tabla Programas ───────────────────────────────────
    _renderProgramasTable() {
        const q     = (document.getElementById('search-programas')?.value || '').toLowerCase().trim();
        const nivel = document.getElementById('filter-nivel')?.value || '';

        const filtered = this.programas.filter(p => {
            const matchQ = !q ||
                p.nombre.toLowerCase().includes(q) ||
                p.codigo.toLowerCase().includes(q);
            const matchNivel = !nivel || p.nivel === nivel;
            return matchQ && matchNivel;
        });

        const tbody = document.getElementById('programas-tbody');
        if (!filtered.length) {
            tbody.innerHTML = `<tr><td colspan="6" class="empty-row">${q || nivel ? 'Sin resultados para esa búsqueda' : 'No hay programas registrados'}</td></tr>`;
            return;
        }
        tbody.innerHTML = filtered.map(p => `
            <tr>
                <td><strong>${p.codigo}</strong></td>
                <td>${p.nombre}</td>
                <td><span class="badge badge-nivel-${p.nivel}">${p.nivel}</span></td>
                <td>${p.duracion ? p.duracion + ' meses' : '—'}</td>
                <td>
                    <span class="count-chip aprendices-chip">
                        <i class="bi bi-calendar3" style="font-size:11px"></i>
                        ${p._count?.fichas ?? 0} ficha(s)
                    </span>
                </td>
                <td class="actions-cell">
                    <button class="btn-action btn-edit" title="Editar" onclick="app._openProgramaModal(${p.id})">
                        <i class="bi bi-pencil" style="font-size:14px"></i>
                    </button>
                    <button class="btn-action btn-delete" title="Eliminar" onclick="app._deletePrograma(${p.id})">
                        <i class="bi bi-trash" style="font-size:14px"></i>
                    </button>
                </td>
            </tr>`)
        .join('');
    }

    _populateSelects() {
        // Filtro de programa en la tabla de fichas
        const filterProg = document.getElementById('filter-programa');
        filterProg.innerHTML = `<option value="">Todos los programas</option>` +
            this.programas.map(p => `<option value="${p.id}">${p.nombre}</option>`).join('');

        // Dropdown de programa en el formulario de ficha
        const selPrograma = document.getElementById('ficha-programa');
        selPrograma.innerHTML = `<option value="">Seleccionar programa...</option>` +
            this.programas.map(p => `<option value="${p.id}">${p.codigo} — ${p.nombre}</option>`).join('');

        // Instructores y aprendices para el modal de detalle
        document.getElementById('select-instructor').innerHTML =
            `<option value="">Seleccionar instructor...</option>` +
            this.instructores.map(u => `<option value="${u.id}">${u.nombre_usuario || u.correo_usuario}</option>`).join('');

        document.getElementById('select-aprendiz').innerHTML =
            `<option value="">Seleccionar aprendiz...</option>` +
            this.aprendices.map(u => `<option value="${u.id}">${u.nombre_usuario || u.correo_usuario}</option>`).join('');
    }

    // ── Modal Ficha ───────────────────────────────────────
    _openFichaModal(id = null) {
        const ficha = id ? this.fichas.find(f => f.id === id) : null;
        document.getElementById('modal-ficha-title').textContent = ficha ? 'Editar Ficha' : 'Nueva Ficha';
        document.getElementById('ficha-id').value       = ficha?.id ?? '';
        document.getElementById('ficha-numero').value   = ficha?.numero ?? '';
        document.getElementById('ficha-programa').value = ficha?.programaId ?? '';
        document.getElementById('ficha-jornada').value  = ficha?.jornada ?? 'diurna';
        document.getElementById('ficha-modalidad').value= ficha?.modalidad ?? 'presencial';
        document.getElementById('ficha-estado').value   = ficha?.estado ?? 'activa';
        document.getElementById('ficha-inicio').value   = ficha?.fecha_inicio ? ficha.fecha_inicio.slice(0, 10) : '';
        document.getElementById('ficha-fin').value      = ficha?.fecha_fin    ? ficha.fecha_fin.slice(0, 10)    : '';
        this._openModal('modal-ficha');
    }

    async _saveFicha(e) {
        e.preventDefault();
        const id = document.getElementById('ficha-id').value;
        const payload = {
            numero:      document.getElementById('ficha-numero').value.trim(),
            programaId:  document.getElementById('ficha-programa').value,
            jornada:     document.getElementById('ficha-jornada').value,
            modalidad:   document.getElementById('ficha-modalidad').value,
            estado:      document.getElementById('ficha-estado').value,
            fecha_inicio: document.getElementById('ficha-inicio').value || null,
            fecha_fin:    document.getElementById('ficha-fin').value    || null,
        };
        if (!payload.programaId) return this._toast('Selecciona un programa', 'error');

        try {
            let ficha;
            if (id) {
                ficha = await FichasService.update(id, payload);
                const idx = this.fichas.findIndex(f => f.id === ficha.id);
                if (idx !== -1) this.fichas[idx] = ficha;
            } else {
                ficha = await FichasService.create(payload);
                this.fichas.unshift(ficha);
            }
            this._renderFichasTable();
            this._closeModal('modal-ficha');
            this._toast(id ? 'Ficha actualizada' : 'Ficha creada', 'success');
        } catch (err) {
            this._toast(err.message, 'error');
        }
    }

    async _deleteFicha(id) {
        if (!confirm('¿Eliminar esta ficha? Se perderán todas las asignaciones.')) return;
        try {
            await FichasService.remove(id);
            this.fichas = this.fichas.filter(f => f.id !== id);
            this._renderFichasTable();
            this._toast('Ficha eliminada', 'success');
        } catch (err) {
            this._toast(err.message, 'error');
        }
    }

    // ── Modal Programa ────────────────────────────────────
    _openProgramaModal(id = null) {
        const p = id ? this.programas.find(p => p.id === id) : null;
        document.getElementById('modal-programa-title').textContent = p ? 'Editar Programa' : 'Nuevo Programa';
        document.getElementById('programa-id').value       = p?.id ?? '';
        document.getElementById('programa-codigo').value   = p?.codigo ?? '';
        document.getElementById('programa-nombre').value   = p?.nombre ?? '';
        document.getElementById('programa-nivel').value    = p?.nivel ?? 'tecnologo';
        document.getElementById('programa-duracion').value = p?.duracion ?? '';
        this._openModal('modal-programa');
    }

    async _savePrograma(e) {
        e.preventDefault();
        const id = document.getElementById('programa-id').value;
        const payload = {
            codigo:   document.getElementById('programa-codigo').value.trim(),
            nombre:   document.getElementById('programa-nombre').value.trim(),
            nivel:    document.getElementById('programa-nivel').value,
            duracion: document.getElementById('programa-duracion').value || null,
        };
        try {
            let prog;
            if (id) {
                prog = await FichasService.updatePrograma(id, payload);
                const idx = this.programas.findIndex(p => p.id === prog.id);
                if (idx !== -1) this.programas[idx] = prog;
            } else {
                prog = await FichasService.createPrograma(payload);
                this.programas.push(prog);
                this.programas.sort((a, b) => a.nombre.localeCompare(b.nombre));
            }
            this._renderProgramasTable();
            this._populateSelects();
            this._closeModal('modal-programa');
            this._toast(id ? 'Programa actualizado' : 'Programa creado', 'success');
        } catch (err) {
            this._toast(err.message, 'error');
        }
    }

    async _deletePrograma(id) {
        if (!confirm('¿Eliminar este programa?')) return;
        try {
            await FichasService.removePrograma(id);
            this.programas = this.programas.filter(p => p.id !== id);
            this._renderProgramasTable();
            this._populateSelects();
            this._toast('Programa eliminado', 'success');
        } catch (err) {
            this._toast(err.message, 'error');
        }
    }

    // ── Modal Detalle / Miembros ──────────────────────────
    async _openDetail(id) {
        try {
            this.currentFicha = await FichasService.getById(id);
            // Reset search
            document.getElementById('members-search').value = '';
            document.getElementById('btn-clear-search').style.display = 'none';
            // Reset to first tab
            document.querySelectorAll('.tab-btn').forEach((b, i) => b.classList.toggle('active', i === 0));
            document.querySelectorAll('.tab-pane').forEach((p, i) => p.classList.toggle('active', i === 0));
            this._renderDetail();
            this._openModal('modal-detail');
        } catch (err) {
            this._toast(err.message, 'error');
        }
    }

    _renderDetail() {
        const f = this.currentFicha;
        const q = (document.getElementById('members-search')?.value || '').toLowerCase().trim();

        document.getElementById('detail-title').textContent    = `Ficha ${f.numero}`;
        document.getElementById('detail-programa').textContent =
            `${f.programa?.nombre || '—'} · ${f.programa?.codigo || ''} · ${f.jornada} · ${f.modalidad}`;
        document.getElementById('stat-instructores').textContent = f.instructores.length;
        document.getElementById('stat-aprendices').textContent   = f.aprendices.length;

        // Filtrar por búsqueda
        const filtInst = f.instructores.filter(fi =>
            !q ||
            (fi.instructor.nombre_usuario || '').toLowerCase().includes(q) ||
            fi.instructor.correo_usuario.toLowerCase().includes(q)
        );
        const filtApr = f.aprendices.filter(fa =>
            !q ||
            (fa.aprendiz.nombre_usuario || '').toLowerCase().includes(q) ||
            fa.aprendiz.correo_usuario.toLowerCase().includes(q)
        );

        // Actualizar contadores en las tabs
        document.getElementById('detail-count-inst').textContent = filtInst.length;
        document.getElementById('detail-count-apr').textContent  = filtApr.length;

        // Renderizar instructores
        const listInst = document.getElementById('list-instructores');
        if (!filtInst.length) {
            listInst.innerHTML = `<p class="empty-list">${q ? `Sin resultados para "<em>${q}</em>"` : 'Sin instructores asignados'}</p>`;
        } else {
            listInst.innerHTML = filtInst.map(fi => `
                <div class="member-row">
                    <div class="member-avatar inst-avatar">${this._initials(fi.instructor.nombre_usuario || fi.instructor.correo_usuario)}</div>
                    <div class="member-info">
                        <div class="member-name">${this._highlight(fi.instructor.nombre_usuario || '—', q)}</div>
                        <div class="member-email">${this._highlight(fi.instructor.correo_usuario, q)}</div>
                    </div>
                    <button class="btn-action btn-delete" title="Quitar" onclick="app._quitarInstructor(${fi.instructor.id})">
                        <i class="bi bi-x-lg" style="font-size:13px"></i>
                    </button>
                </div>`).join('');
        }

        // Renderizar aprendices
        const listApr = document.getElementById('list-aprendices');
        if (!filtApr.length) {
            listApr.innerHTML = `<p class="empty-list">${q ? `Sin resultados para "<em>${q}</em>"` : 'Sin aprendices inscritos'}</p>`;
        } else {
            listApr.innerHTML = filtApr.map(fa => `
                <div class="member-row">
                    <div class="member-avatar apr-avatar">${this._initials(fa.aprendiz.nombre_usuario || fa.aprendiz.correo_usuario)}</div>
                    <div class="member-info">
                        <div class="member-name">${this._highlight(fa.aprendiz.nombre_usuario || '—', q)}</div>
                        <div class="member-email">${this._highlight(fa.aprendiz.correo_usuario, q)}</div>
                    </div>
                    <span class="estado-badge estado-${fa.estado}" style="font-size:.7rem">${fa.estado}</span>
                    <select class="select-estado-inline" onchange="app._cambiarEstadoAprendiz(${fa.aprendiz.id}, this.value)">
                        <option value="activo"      ${fa.estado==='activo'      ?'selected':''}>Activo</option>
                        <option value="retirado"    ${fa.estado==='retirado'    ?'selected':''}>Retirado</option>
                        <option value="certificado" ${fa.estado==='certificado' ?'selected':''}>Certificado</option>
                    </select>
                    <button class="btn-action btn-delete" title="Retirar" onclick="app._retirarAprendiz(${fa.aprendiz.id})">
                        <i class="bi bi-x-lg" style="font-size:13px"></i>
                    </button>
                </div>`).join('');
        }

        // Deshabilitar ya asignados en los selects
        const asignadosIds = f.instructores.map(fi => fi.instructorId);
        const inscritosIds  = f.aprendices.map(fa => fa.aprendizId);
        Array.from(document.getElementById('select-instructor').options).forEach(opt => {
            if (opt.value) opt.disabled = asignadosIds.includes(parseInt(opt.value));
        });
        Array.from(document.getElementById('select-aprendiz').options).forEach(opt => {
            if (opt.value) opt.disabled = inscritosIds.includes(parseInt(opt.value));
        });
    }

    _highlight(text, q) {
        if (!q || !text) return text;
        const escaped = q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        return text.replace(new RegExp(`(${escaped})`, 'gi'),
            `<mark style="background:#fef08a;border-radius:2px;padding:0 1px">$1</mark>`);
    }

    // ── Acciones miembros ─────────────────────────────────
    async _asignarInstructor() {
        const id = parseInt(document.getElementById('select-instructor').value);
        if (!id) return this._toast('Selecciona un instructor', 'error');
        try {
            this.currentFicha = await FichasService.asignarInstructor(this.currentFicha.id, id);
            this._updateFichaInList(this.currentFicha);
            this._renderDetail();
            document.getElementById('select-instructor').value = '';
            this._toast('Instructor asignado', 'success');
        } catch (err) { this._toast(err.message, 'error'); }
    }

    async _quitarInstructor(instructorId) {
        if (!confirm('¿Quitar este instructor de la ficha?')) return;
        try {
            this.currentFicha = await FichasService.quitarInstructor(this.currentFicha.id, instructorId);
            this._updateFichaInList(this.currentFicha);
            this._renderDetail();
            this._toast('Instructor removido', 'success');
        } catch (err) { this._toast(err.message, 'error'); }
    }

    async _inscribirAprendiz() {
        const id = parseInt(document.getElementById('select-aprendiz').value);
        if (!id) return this._toast('Selecciona un aprendiz', 'error');
        try {
            this.currentFicha = await FichasService.inscribirAprendiz(this.currentFicha.id, id);
            this._updateFichaInList(this.currentFicha);
            this._renderDetail();
            document.getElementById('select-aprendiz').value = '';
            this._toast('Aprendiz inscrito', 'success');
        } catch (err) { this._toast(err.message, 'error'); }
    }

    async _cambiarEstadoAprendiz(aprendizId, estado) {
        try {
            this.currentFicha = await FichasService.actualizarEstadoAprendiz(this.currentFicha.id, aprendizId, estado);
            this._updateFichaInList(this.currentFicha);
            this._renderDetail();
        } catch (err) { this._toast(err.message, 'error'); }
    }

    async _retirarAprendiz(aprendizId) {
        if (!confirm('¿Retirar este aprendiz de la ficha?')) return;
        try {
            this.currentFicha = await FichasService.retirarAprendiz(this.currentFicha.id, aprendizId);
            this._updateFichaInList(this.currentFicha);
            this._renderDetail();
            this._toast('Aprendiz retirado', 'success');
        } catch (err) { this._toast(err.message, 'error'); }
    }

    _updateFichaInList(ficha) {
        const idx = this.fichas.findIndex(f => f.id === ficha.id);
        if (idx !== -1) this.fichas[idx] = ficha;
        this._renderFichasTable();
    }

    // ── Utilidades ────────────────────────────────────────
    _openModal(id)  { document.getElementById(id).classList.add('open'); }
    _closeModal(id) { document.getElementById(id).classList.remove('open'); }

    _setLoading(on) {
        document.getElementById('loading').style.display    = on ? 'flex' : 'none';
        document.getElementById('table-wrap').style.display = on ? 'none' : '';
    }

    _initials(str = '') {
        return str.split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase() || '?';
    }

    _toast(msg, type = 'success') {
        const t = document.getElementById('toast');
        t.textContent = msg;
        t.className = `toast toast-${type} show`;
        setTimeout(() => t.classList.remove('show'), 3500);
    }
}

const app = new FichasController();
