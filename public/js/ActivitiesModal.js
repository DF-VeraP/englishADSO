// ActivitiesModal.js — requires CoursesService.js loaded first

const MOMENTO_CONFIG = {
    preparacion: {
        icon: '<i class="bi bi-sunrise" style="font-size:1.4rem"></i>',
        color: '#3b82f6',
        colorLight: '#eff6ff',
        nombre: 'Preparación',
        guia: 'Activa el conocimiento previo del aprendiz. Usa recursos breves y atractivos para despertar el interés.',
        tiposRecomendados: ['video', 'lectura'],
    },
    absorcion: {
        icon: '<i class="bi bi-book-half" style="font-size:1.4rem"></i>',
        color: '#10b981',
        colorLight: '#f0fdf4',
        nombre: 'Absorción',
        guia: 'Presenta el nuevo contenido de aprendizaje de forma clara y estructurada.',
        tiposRecomendados: ['lectura', 'video'],
    },
    practica: {
        icon: '<i class="bi bi-pencil-square" style="font-size:1.4rem"></i>',
        color: '#8b5cf6',
        colorLight: '#faf5ff',
        nombre: 'Práctica',
        guia: 'El aprendiz aplica lo que aprendió a través de ejercicios interactivos.',
        tiposRecomendados: ['quiz_multiple', 'lectura'],
    },
    cierre: {
        icon: '<i class="bi bi-flag-fill" style="font-size:1.4rem"></i>',
        color: '#f59e0b',
        colorLight: '#fffbeb',
        nombre: 'Cierre',
        guia: 'Consolida el aprendizaje y evalúa si el aprendiz logró los objetivos del módulo.',
        tiposRecomendados: ['quiz_multiple'],
    },
};

const TIPO_CONFIG = {
    lectura: {
        label: 'Lectura',
        icon: '<i class="bi bi-file-text" style="font-size:1.2rem"></i>',
        color: '#3b82f6', bg: '#eff6ff', ring: 'rgba(59,130,246,.2)',
        desc: 'Texto formativo o vocabulario',
    },
    video: {
        label: 'Video',
        icon: '<i class="bi bi-camera-video" style="font-size:1.2rem"></i>',
        color: '#ef4444', bg: '#fef2f2', ring: 'rgba(239,68,68,.2)',
        desc: 'YouTube o Vimeo embebido',
    },
    quiz_multiple: {
        label: 'Quiz',
        icon: '<i class="bi bi-patch-question" style="font-size:1.2rem"></i>',
        color: '#8b5cf6', bg: '#faf5ff', ring: 'rgba(139,92,246,.2)',
        desc: 'Preguntas de opción múltiple',
    },
    cloze: {
        label: 'Completar texto',
        icon: '<i class="bi bi-input-cursor-text" style="font-size:1.2rem"></i>',
        color: '#0891b2', bg: '#ecfeff', ring: 'rgba(8,145,178,.2)',
        desc: 'Texto con blancos para completar',
    },
    matching: {
        label: 'Emparejar',
        icon: '<i class="bi bi-shuffle" style="font-size:1.2rem"></i>',
        color: '#d97706', bg: '#fffbeb', ring: 'rgba(217,119,6,.2)',
        desc: 'Conectar palabras con definiciones',
    },
    word_search: {
        label: 'Sopa de letras',
        icon: '<i class="bi bi-grid-3x3" style="font-size:1.2rem"></i>',
        color: '#16a34a', bg: '#f0fdf4', ring: 'rgba(22,163,74,.2)',
        desc: 'Encontrar palabras en la grilla',
    },
    sentence_builder: {
        label: 'Ordenar oración',
        icon: '<i class="bi bi-sort-alpha-down" style="font-size:1.2rem"></i>',
        color: '#7c3aed', bg: '#f5f3ff', ring: 'rgba(124,58,237,.2)',
        desc: 'Armar la oración en orden correcto',
    },
    crossword: {
        label: 'Crucigrama',
        icon: '<i class="bi bi-hash" style="font-size:1.2rem"></i>',
        color: '#be185d', bg: '#fdf2f8', ring: 'rgba(190,24,93,.2)',
        desc: 'Completar el crucigrama con pistas',
    },
};

function extractYoutubeId(url) {
    const m = url.match(/(?:v=|youtu\.be\/|embed\/)([a-zA-Z0-9_-]{11})/);
    return m ? m[1] : null;
}

function extractVimeoId(url) {
    const m = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
    return m ? m[1] : null;
}

class _ActivitiesModal {
    constructor() {
        this._cursoId        = null;
        this._moduloId       = null;
        this._moduloTitulo   = '';
        this._svc            = null;
        this._momentos       = [];
        this._ready          = false;

        // Estado del formulario activo
        this._formMomentoId   = null;
        this._formActividadId = null;
        this._formTipo        = null;
        this._quizPreguntas   = [];
        this._matchingPares   = [];
        this._sbOraciones     = [];
        this._cwClaves        = [];
    }

    // ── Inicialización lazy ────────────────────────────────────────────────
    _init() {
        if (this._ready) return;
        this._svc     = new CoursesService();
        this._overlay = document.getElementById('modal-actividades');
        this._container = document.getElementById('act-momentos-container');
        this._navTitulo = document.getElementById('act-nav-titulo');
        this._modTitle  = document.getElementById('act-module-title');

        document.getElementById('btn-close-actividades')?.addEventListener('click', () => this.close());
        document.getElementById('btn-back-actividades')?.addEventListener('click',  () => this.close());
        this._overlay?.addEventListener('click', e => { if (e.target === this._overlay) this.close(); });

        // Cerrar con Escape
        document.addEventListener('keydown', e => {
            if (e.key === 'Escape' && this._overlay?.classList.contains('open')) this.close();
        });

        this._ready = true;
    }

    // ── Abrir modal ────────────────────────────────────────────────────────
    async open(cursoId, moduloId, titulo) {
        this._init();
        this._cursoId      = cursoId;
        this._moduloId     = moduloId;
        this._moduloTitulo = titulo;
        this._formMomentoId   = null;
        this._formActividadId = null;
        this._formTipo        = null;

        if (this._navTitulo) this._navTitulo.textContent = titulo;
        if (this._modTitle)  this._modTitle.textContent  = titulo;

        this._overlay.classList.add('open');
        document.body.style.overflow = 'hidden';
        await this._load();
    }

    // ── Cerrar modal ───────────────────────────────────────────────────────
    close() {
        this._overlay?.classList.remove('open');
        document.body.style.overflow = '';
        this._cursoId  = null;
        this._moduloId = null;
        this._formMomentoId   = null;
        this._formActividadId = null;
        this._formTipo        = null;
    }

    // ── Cargar momentos desde la API ───────────────────────────────────────
    async _load() {
        this._container.innerHTML = `
            <div class="act-loading">
                <div class="spinner"></div>
                <span>Cargando actividades…</span>
            </div>`;
        try {
            this._momentos = await this._svc.getMomentos(this._cursoId, this._moduloId);
            this._render();
        } catch (err) {
            this._container.innerHTML = `
                <div class="act-loading">
                    <span style="color:#ef4444">⚠ ${this._esc(err.message)}</span>
                </div>`;
        }
    }

    // ── Renderizar los 4 momentos ──────────────────────────────────────────
    _render() {
        if (!this._momentos.length) {
            this._container.innerHTML = '<div class="act-loading"><span>No hay momentos disponibles.</span></div>';
            return;
        }
        this._container.innerHTML = this._momentos.map(m => this._renderMomento(m)).join('');
        this._bindEvents();
    }

    // ── HTML de una sección de momento ─────────────────────────────────────
    _renderMomento(momento) {
        const cfg = MOMENTO_CONFIG[momento.tipo] || {
            icon: '<i class="bi bi-pin-fill" style="font-size:1.2rem"></i>', color: '#64748b', nombre: momento.nombre,
            guia: '', tiposRecomendados: [],
        };
        const chips = cfg.tiposRecomendados.map(t => {
            const tc = TIPO_CONFIG[t];
            return tc ? `<span class="act-tipo-chip">${tc.icon} ${tc.label}</span>` : '';
        }).join('');

        const cards = momento.actividades && momento.actividades.length
            ? `<div class="act-cards-grid">${momento.actividades.map(a => this._renderActividadCard(a, momento.id)).join('')}</div>`
            : `<div style="padding:0 1.25rem"><p class="act-momento-empty">Aún no hay actividades en este momento.</p></div>`;

        return `
        <div class="act-momento act-momento--${this._esc(momento.tipo)}" data-momento-id="${momento.id}">
            <div class="act-momento-header">
                <div class="act-momento-emoji">${cfg.icon}</div>
                <div class="act-momento-meta">
                    <div class="act-momento-nombre">${this._esc(cfg.nombre)}</div>
                    <div class="act-momento-guia">${this._esc(cfg.guia)}</div>
                    ${chips ? `<div class="act-momento-tipos">${chips}</div>` : ''}
                </div>
            </div>
            ${cards}
            <div class="act-momento-footer">
                <button class="act-btn-add" data-action="add-act" data-momento-id="${momento.id}">
                    <i class="bi bi-plus-lg" style="font-size:13px"></i>
                    Agregar actividad
                </button>
            </div>
        </div>`;
    }

    // ── HTML de una tarjeta de actividad ───────────────────────────────────
    _renderActividadCard(act, momentoId) {
        const tc = TIPO_CONFIG[act.tipo] || { icon: '<i class="bi bi-pin-fill" style="font-size:1.2rem"></i>', label: act.tipo };
        const estadoHtml = act.estado
            ? '<span class="act-card-estado act-card-estado--activo">Activo</span>'
            : '<span class="act-card-estado act-card-estado--inactivo">Inactivo</span>';
        return `
        <div class="act-card" data-act-id="${act.id}">
            <div class="act-card-icon">${tc.icon}</div>
            <div class="act-card-body">
                <div class="act-card-titulo" title="${this._esc(act.titulo)}">${this._esc(act.titulo)}</div>
                <div class="act-card-meta">
                    <span class="act-card-tipo">${this._esc(tc.label)}</span>
                    ${estadoHtml}
                </div>
            </div>
            <div class="act-card-actions">
                <button class="act-card-btn" data-action="edit-act" data-momento-id="${momentoId}" data-act-id="${act.id}" title="Editar">
                    <i class="bi bi-pencil" style="font-size:12px"></i>
                </button>
                <button class="act-card-btn act-card-btn--danger" data-action="del-act" data-momento-id="${momentoId}" data-act-id="${act.id}" title="Eliminar">
                    <i class="bi bi-trash" style="font-size:12px"></i>
                </button>
            </div>
        </div>`;
    }

    // ── Bindear eventos del DOM renderizado ────────────────────────────────
    _bindEvents() {
        this._container.querySelectorAll('[data-action]').forEach(btn => {
            const action    = btn.dataset.action;
            const momentoId = Number(btn.dataset.momentoId);
            const actId     = btn.dataset.actId ? Number(btn.dataset.actId) : null;

            btn.addEventListener('click', () => {
                if (action === 'add-act') {
                    this._openForm(momentoId, null);
                } else if (action === 'edit-act') {
                    const momento = this._momentos.find(m => m.id === momentoId);
                    const act = momento?.actividades.find(a => a.id === actId);
                    if (act) this._openForm(momentoId, act);
                } else if (action === 'del-act') {
                    this._deleteActividad(momentoId, actId);
                }
            });
        });
    }

    // ── Abrir formulario inline ────────────────────────────────────────────
    _openForm(momentoId, act = null) {
        // Cerrar form anterior si existe
        this._closeForm();

        this._formMomentoId   = momentoId;
        this._formActividadId = act?.id ?? null;
        this._formTipo        = act?.tipo ?? null;
        this._quizPreguntas   = [];

        const momento = this._momentos.find(m => m.id === momentoId);
        const cfg = MOMENTO_CONFIG[momento?.tipo] || { color: '#4f46e5', colorLight: '#eef2ff', nombre: '' };

        const esEdicion = act !== null;
        const formId    = `act-form-${momentoId}`;

        // Insertar el formulario después del footer del momento
        const momentoEl = this._container.querySelector(`[data-momento-id="${momentoId}"]`);
        if (!momentoEl) return;

        const wrapper = document.createElement('div');
        wrapper.className = 'act-form-wrapper';
        wrapper.id = formId;
        wrapper.style.setProperty('--momento-color', cfg.color);
        wrapper.style.setProperty('--momento-light', cfg.colorLight);
        wrapper.style.setProperty('--momento-border', cfg.colorLight);
        wrapper.innerHTML = `
            <div class="act-form-head">
                <span class="act-form-head-title">${esEdicion ? 'Editar actividad' : 'Nueva actividad'}</span>
                <button class="act-form-close" id="btn-form-close-${momentoId}" title="Cancelar">✕</button>
            </div>
            <div class="act-form-body">
                ${!esEdicion ? this._buildTipoSelector() : ''}
                <div id="act-form-fields-${momentoId}">
                    ${esEdicion ? this._buildFieldsForTipo(act.tipo, act.contenido, act.instrucciones, act.titulo) : ''}
                </div>
                <div class="act-form-actions">
                    <button class="act-btn act-btn-ghost" id="btn-form-cancel-${momentoId}">Cancelar</button>
                    <button class="act-btn act-btn-primary" id="btn-form-save-${momentoId}">
                        ${esEdicion ? 'Guardar cambios' : 'Crear actividad'}
                    </button>
                </div>
            </div>`;

        momentoEl.after(wrapper);

        // Eventos del form
        document.getElementById(`btn-form-close-${momentoId}`)?.addEventListener('click', () => this._closeForm());
        document.getElementById(`btn-form-cancel-${momentoId}`)?.addEventListener('click', () => this._closeForm());
        document.getElementById(`btn-form-save-${momentoId}`)?.addEventListener('click', () => this._saveActividad());

        // Listeners para selector de tipo (solo en creación)
        if (!esEdicion) {
            wrapper.querySelectorAll('.act-tipo-card').forEach(card => {
                card.addEventListener('click', () => {
                    const tipo = card.dataset.tipo;
                    this._selectTipo(momentoId, tipo);
                });
            });

            // Si el momento tiene tipos recomendados, pre-seleccionar el primero
            const cfg2 = MOMENTO_CONFIG[momento?.tipo];
            if (cfg2?.tiposRecomendados?.length) {
                this._selectTipo(momentoId, cfg2.tiposRecomendados[0]);
            }
        } else {
            // Edición: inicializar estado según tipo
            if (act.tipo === 'quiz_multiple') {
                const rawPreguntas = act.contenido?.preguntas || [];
                this._quizPreguntas = rawPreguntas.map(p => ({ ...p }));
                this._renderQuizPreguntas(momentoId);
                this._bindQuizEvents(momentoId);
            } else if (act.tipo === 'matching') {
                this._matchingPares = (act.contenido?.pares || []).map(p => ({ ...p }));
                this._renderMatchingPares(momentoId);
            } else if (act.tipo === 'sentence_builder') {
                this._sbOraciones = [...(act.contenido?.oraciones || [])];
                this._renderSBOraciones(momentoId);
            } else if (act.tipo === 'crossword') {
                this._cwClaves = (act.contenido?.claves || []).map(c => ({ ...c }));
                this._renderCWClaves(momentoId);
            }
        }

        wrapper.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        wrapper.querySelector('.act-form-input')?.focus();
    }

    // ── Cerrar formulario activo ───────────────────────────────────────────
    _closeForm() {
        const old = this._container.querySelector('.act-form-wrapper');
        if (old) old.remove();
        this._formMomentoId   = null;
        this._formActividadId = null;
        this._formTipo        = null;
        this._quizPreguntas   = [];
        this._matchingPares   = [];
        this._sbOraciones     = [];
        this._cwClaves        = [];
    }

    // ── HTML del selector de tipo visual ──────────────────────────────────
    _buildTipoSelector() {
        const cards = Object.entries(TIPO_CONFIG).map(([key, tc]) => `
            <div class="act-tipo-card" data-tipo="${key}"
                style="--tipo-color:${tc.color};--tipo-bg:${tc.bg};--tipo-ring:${tc.ring}">
                <span class="act-tipo-emoji">${tc.icon}</span>
                <span class="act-tipo-label">${tc.label}</span>
                <span class="act-tipo-desc">${tc.desc}</span>
            </div>`).join('');
        return `
            <div class="act-form-group">
                <label class="act-form-label">Tipo de actividad</label>
                <div class="act-tipo-selector">${cards}</div>
            </div>`;
    }

    // ── Seleccionar tipo y actualizar campos ───────────────────────────────
    _selectTipo(momentoId, tipo) {
        this._formTipo = tipo;
        // Marcar visualmente la card seleccionada
        this._container.querySelectorAll('.act-tipo-card').forEach(c => {
            c.classList.toggle('selected', c.dataset.tipo === tipo);
        });

        // Renderizar campos específicos
        const fieldsEl = document.getElementById(`act-form-fields-${momentoId}`);
        if (fieldsEl) {
            fieldsEl.innerHTML = this._buildFieldsForTipo(tipo, null, null, null);
            if (tipo === 'quiz_multiple') {
                this._quizPreguntas = [{ texto: '', opciones: ['', '', '', ''], correcta: 0 }];
                this._renderQuizPreguntas(momentoId);
                this._bindQuizEvents(momentoId);
            }
            if (tipo === 'video') {
                this._bindVideoPreview(momentoId);
            }
            if (tipo === 'matching') {
                this._matchingPares = [{ izquierda: '', derecha: '' }, { izquierda: '', derecha: '' }];
                this._renderMatchingPares(momentoId);
            }
            if (tipo === 'sentence_builder') {
                this._sbOraciones = [''];
                this._renderSBOraciones(momentoId);
            }
            if (tipo === 'crossword') {
                this._cwClaves = [{ palabra: '', pista: '' }, { palabra: '', pista: '' }, { palabra: '', pista: '' }, { palabra: '', pista: '' }];
                this._renderCWClaves(momentoId);
            }
            if (tipo === 'cloze') {
                this._bindClozePreview(momentoId);
            }
        }
        // Foco en el primer campo
        document.getElementById(`act-titulo-${momentoId}`)?.focus();
    }

    // ── Campos según tipo ──────────────────────────────────────────────────
    _buildFieldsForTipo(tipo, contenido, instrucciones, titulo) {
        const mid = this._formMomentoId;
        if (!tipo) return '';

        const tituloPart = `
            <div class="act-form-group">
                <label class="act-form-label" for="act-titulo-${mid}">Título <span style="color:#ef4444">*</span></label>
                <input type="text" id="act-titulo-${mid}" class="act-form-input"
                    placeholder="Ej: Vocabulary — Basic Greetings"
                    value="${this._esc(titulo || '')}" autocomplete="off">
            </div>
            <div class="act-form-group">
                <label class="act-form-label" for="act-instr-${mid}">Instrucciones para el aprendiz</label>
                <textarea id="act-instr-${mid}" class="act-form-textarea"
                    placeholder="Indica al aprendiz qué debe hacer en esta actividad…" rows="2">${this._esc(instrucciones || '')}</textarea>
            </div>`;

        if (tipo === 'lectura')          return tituloPart + this._buildLecturaFields(contenido, mid);
        if (tipo === 'video')            return tituloPart + this._buildVideoFields(contenido, mid);
        if (tipo === 'quiz_multiple')    return tituloPart + this._buildQuizFields(mid);
        if (tipo === 'cloze')            return tituloPart + this._buildClozeFields(contenido, mid);
        if (tipo === 'matching')         return tituloPart + this._buildMatchingFields(mid);
        if (tipo === 'word_search')      return tituloPart + this._buildWordSearchFields(contenido, mid);
        if (tipo === 'sentence_builder') return tituloPart + this._buildSentenceBuilderFields(mid);
        if (tipo === 'crossword')        return tituloPart + this._buildCrosswordFields(mid);
        return tituloPart;
    }

    // ── Cloze ──────────────────────────────────────────────────────────────
    _buildClozeFields(contenido, mid) {
        const texto = contenido?.texto || '';
        return `
            <div class="act-form-group">
                <label class="act-form-label" for="act-cloze-texto-${mid}">
                    Texto con blancos <span style="color:#ef4444">*</span>
                </label>
                <textarea id="act-cloze-texto-${mid}" class="act-form-textarea"
                    placeholder="Ej: My name {{is}} John. I {{work}} as a teacher in {{Bogotá}}."
                    rows="5">${this._esc(texto)}</textarea>
                <p class="act-form-hint">Encierra con <code>{{doble llave}}</code> cada palabra que quieras convertir en blanco.</p>
            </div>
            <div id="act-cloze-preview-${mid}" class="act-cloze-form-preview"></div>`;
    }

    _bindClozePreview(momentoId) {
        const ta = document.getElementById(`act-cloze-texto-${momentoId}`);
        const prev = document.getElementById(`act-cloze-preview-${momentoId}`);
        if (!ta || !prev) return;
        const update = () => {
            const parts = ta.value.split(/(\{\{[^}]+\}\})/g);
            const count = parts.filter(p => /^\{\{.+\}\}$/.test(p)).length;
            if (!count) { prev.innerHTML = ''; return; }
            prev.innerHTML = `<div class="act-form-hint" style="margin-top:.35rem">
                <strong>${count}</strong> blanco${count !== 1 ? 's' : ''} detectado${count !== 1 ? 's' : ''}
            </div>`;
        };
        ta.addEventListener('input', update);
        if (ta.value) update();
    }

    // ── Matching ────────────────────────────────────────────────────────────
    _buildMatchingFields(mid) {
        return `
            <div class="act-form-group">
                <label class="act-form-label">Pares para emparejar <span style="color:#ef4444">*</span></label>
                <div id="act-matching-list-${mid}" class="act-pairs-list"></div>
                <button type="button" class="act-btn-add-pregunta" id="act-matching-add-${mid}">
                    <i class="bi bi-plus-lg" style="font-size:12px"></i> Agregar par
                </button>
                <p class="act-form-hint">Mínimo 2 pares. Máximo 10.</p>
            </div>`;
    }

    _renderMatchingPares(momentoId) {
        const list = document.getElementById(`act-matching-list-${momentoId}`);
        if (!list) return;
        list.innerHTML = this._matchingPares.map((p, i) => `
            <div class="act-pair-row" data-pi="${i}">
                <input type="text" class="act-form-input act-pair-left" data-pi="${i}"
                    placeholder="Inglés / Término" value="${this._esc(p.izquierda)}" style="flex:1">
                <span class="act-pair-arrow">↔</span>
                <input type="text" class="act-form-input act-pair-right" data-pi="${i}"
                    placeholder="Español / Definición" value="${this._esc(p.derecha)}" style="flex:1">
                ${this._matchingPares.length > 2
                    ? `<button type="button" class="act-quiz-del-btn" data-del-pi="${i}" title="Eliminar par">
                           <i class="bi bi-x-lg" style="font-size:11px"></i>
                       </button>`
                    : '<div style="width:22px"></div>'}
            </div>`).join('');
        this._bindMatchingEvents(momentoId);
    }

    _bindMatchingEvents(momentoId) {
        const list   = document.getElementById(`act-matching-list-${momentoId}`);
        const addBtn = document.getElementById(`act-matching-add-${momentoId}`);
        if (!list) return;
        list.querySelectorAll('.act-pair-left').forEach(inp => {
            inp.addEventListener('input', () => {
                const i = Number(inp.dataset.pi);
                if (this._matchingPares[i]) this._matchingPares[i].izquierda = inp.value;
            });
        });
        list.querySelectorAll('.act-pair-right').forEach(inp => {
            inp.addEventListener('input', () => {
                const i = Number(inp.dataset.pi);
                if (this._matchingPares[i]) this._matchingPares[i].derecha = inp.value;
            });
        });
        list.querySelectorAll('[data-del-pi]').forEach(btn => {
            btn.addEventListener('click', () => {
                this._matchingPares.splice(Number(btn.dataset.delPi), 1);
                this._renderMatchingPares(momentoId);
            });
        });
        if (addBtn && !addBtn._bound) {
            addBtn._bound = true;
            addBtn.addEventListener('click', () => {
                if (this._matchingPares.length >= 10) return;
                this._matchingPares.push({ izquierda: '', derecha: '' });
                this._renderMatchingPares(momentoId);
                list.querySelectorAll('.act-pair-left').at(-1)?.focus();
            });
        }
    }

    // ── Word Search ─────────────────────────────────────────────────────────
    _buildWordSearchFields(contenido, mid) {
        const palabras = (contenido?.palabras || []).join(', ');
        const size = contenido?.tamaño || 12;
        return `
            <div class="act-form-group">
                <label class="act-form-label" for="act-ws-palabras-${mid}">
                    Palabras <span style="color:#ef4444">*</span>
                </label>
                <textarea id="act-ws-palabras-${mid}" class="act-form-textarea"
                    placeholder="HELLO, GOODBYE, TEACHER, SCHOOL, ENGLISH, PLEASE"
                    rows="3">${this._esc(palabras)}</textarea>
                <p class="act-form-hint">Palabras separadas por comas. Solo letras (sin espacios ni tildes). Mínimo 3, máximo 15.</p>
            </div>
            <div class="act-form-group">
                <label class="act-form-label" for="act-ws-size-${mid}">Tamaño de la grilla</label>
                <select id="act-ws-size-${mid}" class="act-form-input" style="width:auto">
                    <option value="10" ${size === 10 ? 'selected' : ''}>10 × 10</option>
                    <option value="12" ${size === 12 ? 'selected' : ''}>12 × 12 (recomendado)</option>
                    <option value="15" ${size === 15 ? 'selected' : ''}>15 × 15</option>
                </select>
            </div>`;
    }

    // ── Sentence Builder ────────────────────────────────────────────────────
    _buildSentenceBuilderFields(mid) {
        return `
            <div class="act-form-group">
                <label class="act-form-label">Oraciones <span style="color:#ef4444">*</span></label>
                <div id="act-sb-list-${mid}" class="act-sb-list"></div>
                <button type="button" class="act-btn-add-pregunta" id="act-sb-add-${mid}">
                    <i class="bi bi-plus-lg" style="font-size:12px"></i> Agregar oración
                </button>
                <p class="act-form-hint">Escribe oraciones completas. El sistema desordenará las palabras para el aprendiz.</p>
            </div>`;
    }

    _renderSBOraciones(momentoId) {
        const list = document.getElementById(`act-sb-list-${momentoId}`);
        if (!list) return;
        list.innerHTML = this._sbOraciones.map((o, i) => `
            <div class="act-pair-row" data-si="${i}">
                <span class="act-quiz-num" style="flex-shrink:0">${i + 1}</span>
                <input type="text" class="act-form-input act-sb-input" data-si="${i}"
                    placeholder="Ej: I work in a technology company" value="${this._esc(o)}" style="flex:1">
                ${this._sbOraciones.length > 1
                    ? `<button type="button" class="act-quiz-del-btn" data-del-si="${i}" title="Eliminar">
                           <i class="bi bi-x-lg" style="font-size:11px"></i>
                       </button>`
                    : '<div style="width:22px"></div>'}
            </div>`).join('');
        this._bindSBEvents(momentoId);
    }

    _bindSBEvents(momentoId) {
        const list   = document.getElementById(`act-sb-list-${momentoId}`);
        const addBtn = document.getElementById(`act-sb-add-${momentoId}`);
        if (!list) return;
        list.querySelectorAll('.act-sb-input').forEach(inp => {
            inp.addEventListener('input', () => {
                const i = Number(inp.dataset.si);
                if (i < this._sbOraciones.length) this._sbOraciones[i] = inp.value;
            });
        });
        list.querySelectorAll('[data-del-si]').forEach(btn => {
            btn.addEventListener('click', () => {
                this._sbOraciones.splice(Number(btn.dataset.delSi), 1);
                this._renderSBOraciones(momentoId);
            });
        });
        if (addBtn && !addBtn._bound) {
            addBtn._bound = true;
            addBtn.addEventListener('click', () => {
                this._sbOraciones.push('');
                this._renderSBOraciones(momentoId);
                list.querySelectorAll('.act-sb-input').at(-1)?.focus();
            });
        }
    }

    // ── Crossword ───────────────────────────────────────────────────────────
    _buildCrosswordFields(mid) {
        return `
            <div class="act-form-group">
                <label class="act-form-label">Palabras y pistas <span style="color:#ef4444">*</span></label>
                <div id="act-cw-list-${mid}" class="act-cw-list"></div>
                <button type="button" class="act-btn-add-pregunta" id="act-cw-add-${mid}">
                    <i class="bi bi-plus-lg" style="font-size:12px"></i> Agregar palabra
                </button>
                <p class="act-form-hint">Mínimo 4 palabras. Solo letras, sin espacios. Las palabras deben compartir letras para intersectarse.</p>
            </div>`;
    }

    _renderCWClaves(momentoId) {
        const list = document.getElementById(`act-cw-list-${momentoId}`);
        if (!list) return;
        list.innerHTML = this._cwClaves.map((c, i) => `
            <div class="act-pair-row" data-ci="${i}">
                <input type="text" class="act-form-input act-cw-word" data-ci="${i}"
                    placeholder="PALABRA" value="${this._esc(c.palabra)}" style="width:130px;flex-shrink:0;text-transform:uppercase">
                <input type="text" class="act-form-input act-cw-clue" data-ci="${i}"
                    placeholder="Pista o definición para el aprendiz" value="${this._esc(c.pista)}" style="flex:1">
                ${this._cwClaves.length > 4
                    ? `<button type="button" class="act-quiz-del-btn" data-del-ci="${i}" title="Eliminar">
                           <i class="bi bi-x-lg" style="font-size:11px"></i>
                       </button>`
                    : '<div style="width:22px"></div>'}
            </div>`).join('');
        this._bindCWEvents(momentoId);
    }

    _bindCWEvents(momentoId) {
        const list   = document.getElementById(`act-cw-list-${momentoId}`);
        const addBtn = document.getElementById(`act-cw-add-${momentoId}`);
        if (!list) return;
        list.querySelectorAll('.act-cw-word').forEach(inp => {
            inp.addEventListener('input', () => {
                const i = Number(inp.dataset.ci);
                if (this._cwClaves[i]) this._cwClaves[i].palabra = inp.value.toUpperCase().replace(/[^A-Z]/gi, '').toUpperCase();
                inp.value = this._cwClaves[i]?.palabra || '';
            });
        });
        list.querySelectorAll('.act-cw-clue').forEach(inp => {
            inp.addEventListener('input', () => {
                const i = Number(inp.dataset.ci);
                if (this._cwClaves[i]) this._cwClaves[i].pista = inp.value;
            });
        });
        list.querySelectorAll('[data-del-ci]').forEach(btn => {
            btn.addEventListener('click', () => {
                this._cwClaves.splice(Number(btn.dataset.delCi), 1);
                this._renderCWClaves(momentoId);
            });
        });
        if (addBtn && !addBtn._bound) {
            addBtn._bound = true;
            addBtn.addEventListener('click', () => {
                this._cwClaves.push({ palabra: '', pista: '' });
                this._renderCWClaves(momentoId);
                list.querySelectorAll('.act-cw-word').at(-1)?.focus();
            });
        }
    }

    _buildLecturaFields(contenido, mid) {
        const cuerpo = contenido?.cuerpo || '';
        return `
            <div class="act-form-group">
                <label class="act-form-label" for="act-lectura-cuerpo-${mid}">
                    Contenido <span style="color:#ef4444">*</span>
                </label>
                <textarea id="act-lectura-cuerpo-${mid}" class="act-form-textarea"
                    placeholder="Escribe aquí el texto del recurso de lectura… (puedes usar HTML básico)"
                    rows="6">${this._esc(cuerpo)}</textarea>
                <p class="act-form-hint">Puedes usar HTML básico: &lt;b&gt;, &lt;i&gt;, &lt;ul&gt;, &lt;li&gt;, &lt;p&gt;</p>
            </div>`;
    }

    _buildVideoFields(contenido, mid) {
        const url = contenido?.url || '';
        return `
            <div class="act-form-group">
                <label class="act-form-label" for="act-video-url-${mid}">
                    URL del video <span style="color:#ef4444">*</span>
                </label>
                <input type="url" id="act-video-url-${mid}" class="act-form-input"
                    placeholder="https://www.youtube.com/watch?v=..."
                    value="${this._esc(url)}">
                <p class="act-form-hint">Acepta URLs de YouTube y Vimeo. Se generará un preview automático.</p>
            </div>
            <div class="act-video-preview" id="act-video-preview-${mid}"></div>`;
    }

    _buildQuizFields(mid) {
        return `
            <div class="act-form-group">
                <label class="act-form-label">Preguntas <span style="color:#ef4444">*</span></label>
                <div class="act-quiz-list" id="act-quiz-list-${mid}">
                    <!-- renderizado por _renderQuizPreguntas -->
                </div>
                <button type="button" class="act-btn-add-pregunta" id="act-quiz-add-${mid}">
                    <i class="bi bi-plus-lg" style="font-size:12px"></i>
                    Agregar pregunta
                </button>
            </div>`;
    }

    // ── Renderizar lista de preguntas del quiz ─────────────────────────────
    _renderQuizPreguntas(momentoId) {
        const list = document.getElementById(`act-quiz-list-${momentoId}`);
        if (!list) return;

        list.innerHTML = this._quizPreguntas.map((p, qi) => `
            <div class="act-quiz-pregunta" data-qi="${qi}">
                <div class="act-quiz-pregunta-header">
                    <span class="act-quiz-num">Pregunta ${qi + 1}</span>
                    ${this._quizPreguntas.length > 1
                        ? `<button type="button" class="act-quiz-del-btn" data-del-qi="${qi}" title="Eliminar pregunta">
                                <i class="bi bi-x-lg" style="font-size:12px"></i>
                           </button>`
                        : ''}
                </div>
                <input type="text" class="act-form-input" data-qi="${qi}" data-field="texto"
                    placeholder="Escribe la pregunta…" value="${this._esc(p.texto)}"
                    style="margin-bottom:.4rem">
                <div class="act-quiz-opciones">
                    ${p.opciones.map((op, oi) => `
                        <div class="act-quiz-opcion">
                            <input type="radio" class="act-quiz-opcion-radio"
                                name="quiz-correcta-${momentoId}-${qi}"
                                value="${oi}" ${p.correcta === oi ? 'checked' : ''}
                                data-qi="${qi}" data-oi="${oi}">
                            <span class="act-quiz-opcion-label">${String.fromCharCode(65 + oi)}</span>
                            <input type="text" class="act-quiz-opcion-input"
                                placeholder="Opción ${String.fromCharCode(65 + oi)}…"
                                value="${this._esc(op)}"
                                data-qi="${qi}" data-oi="${oi}" data-field="opcion">
                        </div>`).join('')}
                </div>
            </div>`).join('');

        this._bindQuizEvents(momentoId);
    }

    // ── Bindear eventos del quiz ───────────────────────────────────────────
    _bindQuizEvents(momentoId) {
        const list   = document.getElementById(`act-quiz-list-${momentoId}`);
        const addBtn = document.getElementById(`act-quiz-add-${momentoId}`);
        if (!list) return;

        // Texto de la pregunta
        list.querySelectorAll('input[data-field="texto"]').forEach(inp => {
            inp.addEventListener('input', () => {
                const qi = Number(inp.dataset.qi);
                if (this._quizPreguntas[qi]) this._quizPreguntas[qi].texto = inp.value;
            });
        });

        // Texto de opciones
        list.querySelectorAll('input[data-field="opcion"]').forEach(inp => {
            inp.addEventListener('input', () => {
                const qi = Number(inp.dataset.qi);
                const oi = Number(inp.dataset.oi);
                if (this._quizPreguntas[qi]) this._quizPreguntas[qi].opciones[oi] = inp.value;
            });
        });

        // Radio de correcta
        list.querySelectorAll('input[type="radio"].act-quiz-opcion-radio').forEach(radio => {
            radio.addEventListener('change', () => {
                if (!radio.checked) return;
                const qi = Number(radio.dataset.qi);
                const oi = Number(radio.dataset.oi);
                if (this._quizPreguntas[qi]) this._quizPreguntas[qi].correcta = oi;
            });
        });

        // Eliminar pregunta
        list.querySelectorAll('[data-del-qi]').forEach(btn => {
            btn.addEventListener('click', () => {
                const qi = Number(btn.dataset.delQi);
                this._quizPreguntas.splice(qi, 1);
                this._renderQuizPreguntas(momentoId);
            });
        });

        // Agregar pregunta
        if (addBtn && !addBtn._bound) {
            addBtn._bound = true;
            addBtn.addEventListener('click', () => {
                this._quizPreguntas.push({ texto: '', opciones: ['', '', '', ''], correcta: 0 });
                this._renderQuizPreguntas(momentoId);
                // Foco en la nueva pregunta
                const items = document.querySelectorAll(`#act-quiz-list-${momentoId} .act-quiz-pregunta`);
                items[items.length - 1]?.querySelector('input[data-field="texto"]')?.focus();
            });
        }
    }

    // ── Bindear preview de video ───────────────────────────────────────────
    _bindVideoPreview(momentoId) {
        const urlInput   = document.getElementById(`act-video-url-${momentoId}`);
        const previewDiv = document.getElementById(`act-video-preview-${momentoId}`);
        if (!urlInput || !previewDiv) return;

        const showPreview = () => {
            const url = urlInput.value.trim();
            if (!url) { previewDiv.style.display = 'none'; previewDiv.innerHTML = ''; return; }

            const ytId = extractYoutubeId(url);
            if (ytId) {
                previewDiv.style.display = 'block';
                previewDiv.innerHTML = `<iframe src="https://www.youtube.com/embed/${ytId}" allowfullscreen></iframe>`;
                return;
            }
            const viId = extractVimeoId(url);
            if (viId) {
                previewDiv.style.display = 'block';
                previewDiv.innerHTML = `<iframe src="https://player.vimeo.com/video/${viId}" allowfullscreen></iframe>`;
                return;
            }
            previewDiv.style.display = 'none';
            previewDiv.innerHTML = '';
        };

        urlInput.addEventListener('input', showPreview);
        // Si hay URL ya cargada (edición), mostrar preview
        if (urlInput.value) showPreview();
    }

    // ── Guardar actividad (crear o editar) ────────────────────────────────
    async _saveActividad() {
        const mid    = this._formMomentoId;
        const tipo   = this._formTipo;
        const saveBtn = document.getElementById(`btn-form-save-${mid}`);

        if (!tipo) {
            this._toast('Selecciona un tipo de actividad.', 'error');
            return;
        }

        const titulo       = document.getElementById(`act-titulo-${mid}`)?.value.trim();
        const instrucciones = document.getElementById(`act-instr-${mid}`)?.value.trim() || null;

        if (!titulo) {
            document.getElementById(`act-titulo-${mid}`)?.focus();
            this._toast('El título es obligatorio.', 'error');
            return;
        }

        // Construir contenido según tipo
        let contenido = null;

        if (tipo === 'lectura') {
            const cuerpo = document.getElementById(`act-lectura-cuerpo-${mid}`)?.value.trim();
            if (!cuerpo) { this._toast('El contenido de la lectura es obligatorio.', 'error'); return; }
            contenido = { cuerpo };
        }

        if (tipo === 'video') {
            const url = document.getElementById(`act-video-url-${mid}`)?.value.trim();
            if (!url) { this._toast('La URL del video es obligatoria.', 'error'); return; }
            const ytId = extractYoutubeId(url);
            const viId = extractVimeoId(url);
            if (!ytId && !viId) {
                this._toast('URL no reconocida. Usa YouTube o Vimeo.', 'error');
                return;
            }
            contenido = { url, plataforma: ytId ? 'youtube' : 'vimeo' };
        }

        if (tipo === 'quiz_multiple') {
            // Leer estado actual de los inputs
            this._syncQuizFromDOM(mid);

            if (!this._quizPreguntas.length) {
                this._toast('Agrega al menos una pregunta.', 'error');
                return;
            }
            for (let i = 0; i < this._quizPreguntas.length; i++) {
                const p = this._quizPreguntas[i];
                if (!p.texto.trim()) { this._toast(`La pregunta ${i + 1} no tiene texto.`, 'error'); return; }
                const opcionesVacias = p.opciones.filter(o => !o.trim()).length;
                if (opcionesVacias > 2) { this._toast(`La pregunta ${i + 1} necesita al menos 2 opciones.`, 'error'); return; }
            }
            contenido = {
                preguntas: this._quizPreguntas.map(p => ({
                    texto: p.texto.trim(),
                    opciones: p.opciones.map(o => o.trim()),
                    correcta: p.correcta,
                })),
            };
        }

        if (tipo === 'cloze') {
            const texto = document.getElementById(`act-cloze-texto-${mid}`)?.value.trim();
            if (!texto) { this._toast('El texto del cloze es obligatorio.', 'error'); return; }
            const blancos = texto.match(/\{\{[^}]+\}\}/g);
            if (!blancos || blancos.length < 1) { this._toast('Marca al menos un blanco con {{palabra}}.', 'error'); return; }
            contenido = { texto };
        }

        if (tipo === 'matching') {
            // Sincronizar desde DOM
            const list = document.getElementById(`act-matching-list-${mid}`);
            if (list) {
                list.querySelectorAll('.act-pair-left').forEach(inp => {
                    const i = Number(inp.dataset.pi);
                    if (this._matchingPares[i]) this._matchingPares[i].izquierda = inp.value;
                });
                list.querySelectorAll('.act-pair-right').forEach(inp => {
                    const i = Number(inp.dataset.pi);
                    if (this._matchingPares[i]) this._matchingPares[i].derecha = inp.value;
                });
            }
            if (this._matchingPares.length < 2) { this._toast('Agrega al menos 2 pares.', 'error'); return; }
            const paresValidos = this._matchingPares.filter(p => p.izquierda.trim() && p.derecha.trim());
            if (paresValidos.length < 2) { this._toast('Completa al menos 2 pares con ambos campos.', 'error'); return; }
            contenido = { pares: paresValidos.map(p => ({ izquierda: p.izquierda.trim(), derecha: p.derecha.trim() })) };
        }

        if (tipo === 'word_search') {
            const raw  = document.getElementById(`act-ws-palabras-${mid}`)?.value || '';
            const size = Number(document.getElementById(`act-ws-size-${mid}`)?.value) || 12;
            const palabras = raw.split(',')
                .map(w => w.trim().toUpperCase().replace(/[^A-Z]/g, ''))
                .filter(w => w.length >= 2 && w.length <= size - 1);
            if (palabras.length < 3) { this._toast('Ingresa al menos 3 palabras válidas (solo letras).', 'error'); return; }
            contenido = { palabras, tamaño: size };
        }

        if (tipo === 'sentence_builder') {
            const list = document.getElementById(`act-sb-list-${mid}`);
            if (list) {
                list.querySelectorAll('.act-sb-input').forEach(inp => {
                    const i = Number(inp.dataset.si);
                    if (i < this._sbOraciones.length) this._sbOraciones[i] = inp.value;
                });
            }
            const oraciones = this._sbOraciones.map(o => o.trim()).filter(o => o.length > 0 && o.split(' ').length >= 2);
            if (oraciones.length < 1) { this._toast('Agrega al menos una oración con 2 o más palabras.', 'error'); return; }
            contenido = { oraciones };
        }

        if (tipo === 'crossword') {
            const list = document.getElementById(`act-cw-list-${mid}`);
            if (list) {
                list.querySelectorAll('.act-cw-word').forEach(inp => {
                    const i = Number(inp.dataset.ci);
                    if (this._cwClaves[i]) this._cwClaves[i].palabra = inp.value.toUpperCase().replace(/[^A-Z]/g, '');
                });
                list.querySelectorAll('.act-cw-clue').forEach(inp => {
                    const i = Number(inp.dataset.ci);
                    if (this._cwClaves[i]) this._cwClaves[i].pista = inp.value;
                });
            }
            const claves = this._cwClaves
                .map(c => ({ palabra: c.palabra.trim().toUpperCase().replace(/[^A-Z]/g, ''), pista: c.pista.trim() }))
                .filter(c => c.palabra.length >= 2 && c.pista.length > 0);
            if (claves.length < 4) { this._toast('Completa al menos 4 pares válidos (palabra + pista).', 'error'); return; }
            contenido = { claves };
        }

        if (!contenido) { this._toast('Completa el contenido de la actividad.', 'error'); return; }

        if (saveBtn) { saveBtn.disabled = true; saveBtn.textContent = 'Guardando…'; }

        try {
            const payload = { tipo, titulo, instrucciones, contenido };

            if (this._formActividadId) {
                // Editar
                await this._svc.actualizarActividad(
                    this._cursoId, this._moduloId, mid, this._formActividadId, payload
                );
                this._toast('Actividad actualizada.', 'success');
            } else {
                // Crear
                await this._svc.crearActividad(this._cursoId, this._moduloId, mid, payload);
                this._toast('Actividad creada.', 'success');
            }
            this._closeForm();
            await this._load();
        } catch (err) {
            this._toast(err.message, 'error');
            if (saveBtn) { saveBtn.disabled = false; saveBtn.textContent = this._formActividadId ? 'Guardar cambios' : 'Crear actividad'; }
        }
    }

    // Sincronizar estado del quiz desde los inputs actuales del DOM
    _syncQuizFromDOM(momentoId) {
        const list = document.getElementById(`act-quiz-list-${momentoId}`);
        if (!list) return;
        list.querySelectorAll('input[data-field="texto"]').forEach(inp => {
            const qi = Number(inp.dataset.qi);
            if (this._quizPreguntas[qi]) this._quizPreguntas[qi].texto = inp.value;
        });
        list.querySelectorAll('input[data-field="opcion"]').forEach(inp => {
            const qi = Number(inp.dataset.qi);
            const oi = Number(inp.dataset.oi);
            if (this._quizPreguntas[qi]) this._quizPreguntas[qi].opciones[oi] = inp.value;
        });
        list.querySelectorAll('input[type="radio"].act-quiz-opcion-radio:checked').forEach(r => {
            const qi = Number(r.dataset.qi);
            const oi = Number(r.dataset.oi);
            if (this._quizPreguntas[qi]) this._quizPreguntas[qi].correcta = oi;
        });
    }

    // ── Eliminar actividad ─────────────────────────────────────────────────
    async _deleteActividad(momentoId, actividadId) {
        const momento = this._momentos.find(m => m.id === momentoId);
        const act = momento?.actividades.find(a => a.id === actividadId);
        if (!confirm(`¿Eliminar la actividad "${act?.titulo}"? Esta acción no se puede deshacer.`)) return;
        try {
            await this._svc.eliminarActividad(this._cursoId, this._moduloId, momentoId, actividadId);
            this._toast('Actividad eliminada.', 'success');
            await this._load();
        } catch (err) {
            this._toast(err.message, 'error');
        }
    }

    // ── Toast ──────────────────────────────────────────────────────────────
    _toast(msg, type = 'info') {
        const tc = document.getElementById('toast-container');
        if (!tc) return;
        const t = document.createElement('div');
        // Reuse instructor.css .inst-toast classes
        const typeClass = type === 'success' ? 'success' : type === 'error' ? 'error' : '';
        t.className = `inst-toast${typeClass ? ' ' + typeClass : ''}`;
        t.textContent = msg;
        tc.appendChild(t);
        setTimeout(() => t.classList.add('show'), 10);
        setTimeout(() => { t.classList.remove('show'); setTimeout(() => t.remove(), 300); }, 3500);
    }

    // ── Escape HTML ────────────────────────────────────────────────────────
    _esc(s) {
        return String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    }
}

const ActivitiesModal = new _ActivitiesModal();
