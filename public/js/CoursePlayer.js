// ── Bootstrap ─────────────────────────────────────────────
AuthGuard.requireAuth();

const params  = new URLSearchParams(location.search);
const cursoId = params.get('id');
if (!cursoId) location.replace('/index.html');

const token   = AuthGuard.getToken();
const me      = AuthGuard.getUser();

const API = {
    async get(url)  { return fetch(url, { headers: { Authorization: `Bearer ${token}` } }).then(r => r.json()); },
    async post(url, body) {
        return fetch(url, { method: 'POST', headers: { 'Content-Type':'application/json', Authorization:`Bearer ${token}` }, body: JSON.stringify(body) }).then(r => r.json());
    },
};

// ── State ─────────────────────────────────────────────────
let curso          = null;
let progreso       = null;
let allActividades = [];   // lista plana ordenada
let currentIdx     = 0;
let completadas    = new Set();

// ── Init ──────────────────────────────────────────────────
async function init() {
    try {
        [curso, progreso] = await Promise.all([
            API.get(`/api/courses/${cursoId}/play`),
            API.get(`/api/courses/${cursoId}/mi-progreso`),
        ]);

        // IDs completadas
        (progreso.actividades || []).filter(p => p.completada).forEach(p => completadas.add(p.actividadId));

        document.title = `${curso.titulo} — SPEAKSOFT`;
        document.getElementById('topbar-title').textContent = curso.titulo;

        buildActivitiesList();
        buildSidebar();
        updateTopbarProgress();

        // Determinar actividad inicial (primera no completada)
        const firstPending = allActividades.findIndex(a => !completadas.has(a.id));
        currentIdx = firstPending >= 0 ? firstPending : 0;

        renderActivity(currentIdx);
    } catch (err) {
        document.getElementById('player-main').innerHTML =
            `<div style="text-align:center;padding:4rem;color:var(--danger)">Error al cargar el curso: ${err.message}</div>`;
    }
}

// ── Build flat activities list ────────────────────────────
function buildActivitiesList() {
    allActividades = [];
    (curso.modulos || []).forEach(mod => {
        (mod.momentos || []).forEach(mom => {
            (mom.actividades || []).forEach(act => {
                allActividades.push({ ...act, _moduloTitulo: mod.titulo, _momentoTitulo: mom.nombre, _moduloId: mod.id });
            });
        });
    });
}

// ── Sidebar ───────────────────────────────────────────────
function buildSidebar() {
    const el = document.getElementById('sidebar-modules');
    el.innerHTML = (curso.modulos || []).map(mod => {
        const modActs = allActividades.filter(a => a._moduloId === mod.id);
        const done    = modActs.filter(a => completadas.has(a.id)).length;
        const pct     = modActs.length > 0 ? Math.round((done / modActs.length) * 100) : 0;

        const momentos = (mod.momentos || []).map(mom => {
            const momActs = allActividades.filter(a => a.momentoId === mom.id);
            const allDone = momActs.length > 0 && momActs.every(a => completadas.has(a.id));
            const firstIdx = allActividades.findIndex(a => a.momentoId === mom.id);
            return `<div class="momento-item ${allDone ? 'done' : ''}" data-idx="${firstIdx}">
                        <div class="momento-dot"></div>
                        ${mom.nombre}
                    </div>`;
        }).join('');

        return `
            <div class="module-item" data-modulo="${mod.id}">
                <div class="module-item-number">Módulo ${mod.orden + 1}</div>
                <div class="module-item-title">${mod.titulo}</div>
                <div class="module-item-progress">
                    <div class="module-mini-bar"><div class="module-mini-fill" style="width:${pct}%"></div></div>
                    <span class="module-mini-pct">${pct}%</span>
                </div>
            </div>
            <div class="momento-list">${momentos}</div>`;
    }).join('');

    el.querySelectorAll('.momento-item[data-idx]').forEach(btn => {
        btn.addEventListener('click', () => {
            const idx = parseInt(btn.dataset.idx);
            if (!isNaN(idx) && idx >= 0) { currentIdx = idx; renderActivity(currentIdx); }
        });
    });
}

// ── Render activity ───────────────────────────────────────
function renderActivity(idx) {
    currentIdx = idx;
    const act  = allActividades[idx];
    if (!act) return;

    updateSidebarHighlight(act);
    updateTopbarProgress();

    const main = document.getElementById('player-main');
    main.scrollTop = 0;

    // Mostrar PRE-TEST primero si no está completado
    if (idx === 0 && !progreso.tests?.find(t => t.tipo === 'pretest') && act.tipo !== 'pretest') {
        // Buscar si hay un pretest en la lista
        const pretestIdx = allActividades.findIndex(a => a.tipo === 'pretest');
        if (pretestIdx >= 0 && !completadas.has(allActividades[pretestIdx].id)) {
            renderActivityCard(allActividades[pretestIdx], pretestIdx);
            return;
        }
    }

    renderActivityCard(act, idx);
}

function renderActivityCard(act, idx) {
    const main  = document.getElementById('player-main');
    const label = tipoLabel(act.tipo);
    const isDone = completadas.has(act.id);

    main.innerHTML = `
        <div class="activity-card" id="act-card">
            <div class="activity-label">${label.icon} ${label.name}</div>
            <h2 class="activity-title">${act.titulo}</h2>
            ${act.instrucciones ? `<p class="activity-instructions">${act.instrucciones}</p>` : ''}
            <div id="act-body"></div>
            ${isDone ? '<p style="color:var(--success);font-size:.85rem;margin-top:1rem">✅ Ya completaste esta actividad.</p>' : ''}
            <div class="activity-nav">
                <button class="btn-nav btn-nav-prev" id="btn-prev" ${idx === 0 ? 'disabled' : ''}>
                    <i class="bi bi-chevron-left" style="font-size:16px"></i>
                    Anterior
                </button>
                <button class="btn-nav btn-nav-next" id="btn-next" ${idx === allActividades.length - 1 ? 'disabled' : ''}>
                    Siguiente
                    <i class="bi bi-chevron-right" style="font-size:16px"></i>
                </button>
            </div>
        </div>`;

    document.getElementById('btn-prev').addEventListener('click', () => renderActivity(idx - 1));
    document.getElementById('btn-next').addEventListener('click', () => renderActivity(idx + 1));

    mountComponent(act, document.getElementById('act-body'));
}

// ── Mount component by type ───────────────────────────────
function mountComponent(act, container) {
    const onComplete = (result) => saveProgress(act, result);

    switch (act.tipo) {
        case 'warm_up_drag':
            new WarmUpDrag(container, act.contenido, onComplete);
            break;
        case 'grammar_pill':
            new GrammarPill(container, act.contenido, onComplete);
            break;
        case 'flashcard_vocab':
            new FlashcardVocab(container, act.contenido, onComplete);
            break;
        case 'storybook_chat':
            new StorybookChat(container, act.contenido, onComplete);
            break;
        case 'practica_fill':
            new PracticaFill(container, act.contenido, onComplete);
            break;
        case 'practica_audio_form':
            new PracticaAudioForm(container, act.contenido, onComplete);
            break;
        case 'practica_dropdown':
            new PracticaDropdown(container, act.contenido, onComplete);
            break;
        case 'desafio_audio':
            new DesafioAudio(container, act.contenido, onComplete);
            break;
        case 'cloze':
            new ClozeText(container, act.contenido, onComplete);
            break;
        case 'matching':
            new MatchingPairs(container, act.contenido, onComplete);
            break;
        case 'word_search':
            new WordSearch(container, act.contenido, onComplete);
            break;
        case 'sentence_builder':
            new SentenceBuilder(container, act.contenido, onComplete);
            break;
        case 'crossword':
            new CrosswordPuzzle(container, act.contenido, onComplete);
            break;
        case 'quiz_multiple':
            new QuizMultiple(container, act.contenido, async (result) => {
                await saveProgress(act, result);
                if (result.aprobado && result.insignia) {
                    await API.post(`/api/courses/${cursoId}/insignias`, {
                        tipo:       result.insignia.tipo,
                        nombre:     result.insignia.nombre,
                        descripcion:result.insignia.descripcion,
                        emoji:      result.insignia.emoji,
                        moduloId:   act._moduloId,
                    });
                }
            });
            break;
        case 'pretest':
        case 'postest':
            mountTest(container, act, onComplete);
            break;
        default:
            container.innerHTML = `<div style="color:var(--text-muted);font-size:.9rem">Tipo de actividad no reconocido: ${act.tipo}</div>`;
            onComplete({ completada: true });
    }
}

// ── PRE/POS TEST ──────────────────────────────────────────
function mountTest(container, act, onComplete) {
    const { preguntas } = act.contenido;
    const pretestResult = progreso.tests?.find(t => t.tipo === 'pretest');
    const isPost = act.tipo === 'postest';

    if (act.tipo === 'pretest' && completadas.has(act.id)) {
        container.innerHTML = `<div style="color:var(--success);font-size:.9rem">✅ Ya completaste el diagnóstico inicial. Puntaje: ${pretestResult?.puntaje ?? 0}%</div>`;
        onComplete?.({ completada: true });
        return;
    }

    // Usar QuizMultiple sin insignia para test
    const quizData = {
        preguntas,
        minimo_aprobacion: 0, // siempre pasa
        insignia: null,
    };

    new QuizMultiple(container, quizData, async (result) => {
        await API.post(`/api/courses/${cursoId}/test`, {
            tipo: act.tipo,
            puntaje:   result.puntaje,
            total:     result.total,
            correctas: result.correctas,
            respuestas: [],
        });

        if (isPost && pretestResult) {
            // Mostrar comparación PRE vs POS
            container.innerHTML += `
                <div style="margin-top:1.5rem">
                    <p style="font-weight:700;margin-bottom:1rem">📊 Tu progreso en el curso:</p>
                    <div class="test-result-comparison">
                        <div class="test-result-box">
                            <div class="test-result-box-label">PRE-TEST</div>
                            <div class="test-result-box-score test-result-pre">${pretestResult.puntaje}%</div>
                        </div>
                        <div class="test-result-box">
                            <div class="test-result-box-label">POS-TEST</div>
                            <div class="test-result-box-score test-result-post">${result.puntaje}%</div>
                        </div>
                    </div>
                </div>`;
        }

        onComplete(result);
    });
}

// ── Save progress ─────────────────────────────────────────
async function saveProgress(act, result) {
    try {
        await API.post(`/api/actividades/${act.id}/progreso`, {
            completada: true,
            puntaje: result?.puntaje ?? null,
            respuesta: result ?? null,
        });
        completadas.add(act.id);
        buildSidebar();
        updateTopbarProgress();

        // Recalcular progreso local
        progreso = await API.get(`/api/courses/${cursoId}/mi-progreso`);
    } catch { /* no crítico */ }
}

// ── Progress bar ──────────────────────────────────────────
function updateTopbarProgress() {
    const total = allActividades.filter(a => a.tipo !== 'pretest' && a.tipo !== 'postest').length;
    const done  = allActividades.filter(a => a.tipo !== 'pretest' && a.tipo !== 'postest' && completadas.has(a.id)).length;
    const pct   = total > 0 ? Math.round((done / total) * 100) : 0;
    document.getElementById('topbar-progress-fill').style.width = pct + '%';
    document.getElementById('topbar-pct').textContent = pct + '%';
}

// ── Sidebar highlight ─────────────────────────────────────
function updateSidebarHighlight(act) {
    document.querySelectorAll('.momento-item').forEach(el => el.classList.remove('active'));
    const momId = act.momentoId;
    document.querySelectorAll('.momento-item').forEach(el => {
        const firstAct = allActividades[parseInt(el.dataset.idx)];
        if (firstAct?.momentoId === momId) el.classList.add('active');
    });
}

// ── Label helper ──────────────────────────────────────────
function tipoLabel(tipo) {
    const map = {
        warm_up_drag:       { icon: '🎯', name: 'Warm-Up' },
        grammar_pill:       { icon: '💊', name: 'Grammar Pill' },
        flashcard_vocab:    { icon: '🃏', name: 'Vocabulario' },
        storybook_chat:     { icon: '💬', name: 'Storybook' },
        practica_fill:      { icon: '✏️', name: 'Práctica Guiada' },
        practica_audio_form:{ icon: '🎧', name: 'Listening & Writing' },
        practica_dropdown:  { icon: '📋', name: 'Práctica Guiada' },
        desafio_audio:      { icon: '🎤', name: 'Desafío — Evidencia' },
        quiz_multiple:      { icon: '🧠', name: 'Quiz' },
        cloze:              { icon: '✏️', name: 'Completar texto' },
        matching:           { icon: '🔀', name: 'Emparejar' },
        word_search:        { icon: '🔍', name: 'Sopa de letras' },
        sentence_builder:   { icon: '🧩', name: 'Ordenar oración' },
        crossword:          { icon: '⊞',  name: 'Crucigrama' },
        pretest:            { icon: '📝', name: 'Diagnóstico Inicial' },
        postest:            { icon: '🏁', name: 'Evaluación Final' },
    };
    return map[tipo] || { icon: '📌', name: tipo };
}

// ── Start ─────────────────────────────────────────────────
init();
