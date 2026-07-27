document.addEventListener('DOMContentLoaded', async () => {
    // Logout se enlaza PRIMERO — antes de cualquier await
    document.getElementById('btn-logout')?.addEventListener('click', () => AuthGuard.logout());

    const payload = AuthGuard.requireAuth();
    if (!payload) return;

    const auth   = new AuthService();
    const user   = AuthGuard.getUser() || { nombre: payload.email, email: payload.email, rol: payload.rol };
    const rol    = user.rol    || payload.rol;
    const nombre = user.nombre || user.email  || payload.email;

    document.body.classList.add(`role-${rol}`);

    const initials = nombre.slice(0, 2).toUpperCase();
    document.getElementById('user-avatar').textContent = initials;
    document.getElementById('user-name').textContent   = nombre;

    const badge    = document.getElementById('role-badge');
    const badgeMap = { admin: 'badge-admin', instructor: 'badge-instructor', aprendiz: 'badge-aprendiz' };
    badge.className  = `role-badge ${badgeMap[rol] || ''}`;
    badge.textContent = rol;

    if (rol === 'admin') {
        document.querySelectorAll('.admin-only').forEach(el => el.style.display = 'flex');
    }

    const firstName = nombre.split(' ')[0];
    document.getElementById('welcome-title').textContent = `Hola, ${firstName} 👋`;
    const subtitles = {
        admin:      'Tienes acceso completo a la administración de la plataforma.',
        instructor: 'Gestiona tus clases y aprendices desde aquí.',
        aprendiz:   'Continúa tu camino hacia el dominio del inglés médico.',
    };
    document.getElementById('welcome-sub').textContent = subtitles[rol] || '';

    await renderDashboard(auth, rol);
});

async function renderDashboard(auth, rol) {
    const container = document.getElementById('stats-row');
    if (rol === 'admin')       await renderAdminDashboard(auth, container);
    else if (rol === 'instructor') await renderInstructorDashboard(auth, container);
    else if (rol === 'aprendiz')   await renderAprendizDashboard(auth, container);
}

/* ══════════════════════════════════════════════════════
   ADMIN
══════════════════════════════════════════════════════ */
async function renderAdminDashboard(auth, container) {
    container.innerHTML = [
        { icon: usersIcon(),  label: 'Total usuarios',   key: 'total',          color: 'blue'  },
        { icon: activeIcon(), label: 'Activos',          key: 'active',         color: 'green' },
        { icon: instrIcon(),  label: 'Cursos activos',   key: 'courses',        color: 'cyan'  },
        { icon: studIcon(),   label: 'Inscripciones',    key: 'inscripciones',  color: 'amber' },
        { icon: progressIcon(), label: 'Progreso prom.', key: 'progreso',       color: 'purple'},
    ].map(s => `
        <div class="stat-card">
            <div class="stat-icon ${s.color}">${s.icon}</div>
            <div>
                <div class="stat-value" data-key="${s.key}">—</div>
                <div class="stat-label">${s.label}</div>
            </div>
        </div>`).join('');

    try {
        const res  = await auth.apiFetch('/api/dashboard/admin');
        const data = await res.json();
        const s    = data.stats;
        const set  = (k, v) => { const el = document.querySelector(`[data-key="${k}"]`); if (el) el.textContent = v; };
        set('total',         s.totalUsuarios);
        set('active',        s.usuariosActivos);
        set('courses',       s.totalCursos);
        set('inscripciones', s.totalInscripciones);
        set('progreso',      s.progresoPromedio + '%');

        const adminExtra = document.getElementById('admin-extra');
        if (adminExtra && data.ultimosUsuarios?.length) {
            adminExtra.innerHTML = `
                <div style="margin-top:1.5rem">
                    <p class="section-title" style="margin-bottom:.75rem">Últimos registros</p>
                    <div style="display:flex;flex-direction:column;gap:.5rem">
                        ${data.ultimosUsuarios.map(u => `
                        <div style="display:flex;align-items:center;gap:1rem;background:var(--surface);border:1px solid var(--border);border-radius:12px;padding:.85rem 1.25rem">
                            <div style="width:36px;height:36px;border-radius:50%;background:rgba(26,86,219,.2);display:flex;align-items:center;justify-content:center;font-weight:700;font-size:.85rem;color:#60a5fa;flex-shrink:0">${(u.nombre_usuario||u.correo_usuario||'?').slice(0,2).toUpperCase()}</div>
                            <div style="flex:1;min-width:0">
                                <div style="font-weight:600;font-size:.9rem;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${u.nombre_usuario || '—'}</div>
                                <div style="font-size:.78rem;color:var(--text-muted)">${u.correo_usuario}</div>
                            </div>
                            <span style="font-size:.72rem;font-weight:600;padding:.2rem .6rem;border-radius:20px;background:rgba(26,86,219,.15);color:#60a5fa;text-transform:uppercase;letter-spacing:.04em">${u.rol_usuario}</span>
                        </div>`).join('')}
                    </div>
                </div>`;
            adminExtra.style.display = '';
        }
    } catch { /* stats no críticas */ }
}

/* ══════════════════════════════════════════════════════
   INSTRUCTOR
══════════════════════════════════════════════════════ */
async function renderInstructorDashboard(auth, container) {
    container.innerHTML = [
        { icon: classIcon(),  label: 'Mis fichas',    key: 'fichas',     color: 'blue'  },
        { icon: studIcon(),   label: 'Aprendices',    key: 'aprendices', color: 'cyan'  },
        { icon: bookIcon(),   label: 'Mis cursos',    key: 'cursos',     color: 'green' },
    ].map(s => `
        <div class="stat-card">
            <div class="stat-icon ${s.color}">${s.icon}</div>
            <div>
                <div class="stat-value" data-key="${s.key}">—</div>
                <div class="stat-label">${s.label}</div>
            </div>
        </div>`).join('');

    try {
        const res  = await auth.apiFetch('/api/dashboard/instructor');
        const data = await res.json();
        const s    = data.stats;
        const set  = (k, v) => { const el = document.querySelector(`[data-key="${k}"]`); if (el) el.textContent = v; };
        set('fichas',     s.totalFichas);
        set('aprendices', s.totalAprendices);
        set('cursos',     s.totalCursos);

        const instrExtra = document.getElementById('instructor-extra');
        if (instrExtra && data.fichas?.length) {
            instrExtra.innerHTML = `
                <p class="section-title" style="margin-bottom:.75rem">Mis Fichas</p>
                <div style="display:flex;flex-direction:column;gap:.65rem">
                    ${data.fichas.map(f => `
                    <div style="display:flex;align-items:center;gap:1rem;background:var(--surface);border:1px solid var(--border);border-radius:12px;padding:.85rem 1.25rem">
                        <div style="flex:1;min-width:0">
                            <div style="font-weight:700;font-size:.9rem">Ficha ${f.numero}</div>
                            <div style="font-size:.78rem;color:var(--text-muted);margin-top:.15rem">${f.cursos.join(', ') || 'Sin cursos asignados'}</div>
                        </div>
                        <div style="text-align:right;flex-shrink:0">
                            <div style="font-size:.82rem;font-weight:600;color:#22d3ee">${f.aprendices} aprendices</div>
                            <div style="font-size:.72rem;color:var(--text-muted);text-transform:capitalize">${f.jornada}</div>
                        </div>
                    </div>`).join('')}
                </div>`;
            instrExtra.style.display = '';
        }
    } catch { /* stats no críticas */ }
}

/* ══════════════════════════════════════════════════════
   APRENDIZ
══════════════════════════════════════════════════════ */
async function renderAprendizDashboard(auth, container) {
    container.innerHTML = [
        { icon: bookIcon(),     label: 'Cursos activos', key: 'apr-cursos',   color: 'blue'  },
        { icon: progressIcon(), label: 'Progreso prom.', key: 'apr-progreso', color: 'cyan'  },
        { icon: checkIcon(),    label: 'Completados',    key: 'apr-comp',     color: 'green' },
        { icon: starIcon(),     label: 'Insignias',      key: 'apr-logros',   color: 'amber' },
    ].map(s => `
        <div class="stat-card">
            <div class="stat-icon ${s.color}">${s.icon}</div>
            <div>
                <div class="stat-value" data-key="${s.key}">—</div>
                <div class="stat-label">${s.label}</div>
            </div>
        </div>`).join('');

    try {
        // Ambas peticiones en paralelo
        const [dashRes, fichasRes] = await Promise.all([
            auth.apiFetch('/api/dashboard/aprendiz'),
            auth.apiFetch('/api/fichas/mis-fichas'),
        ]);

        if (!dashRes.ok) throw new Error('Error al cargar el dashboard');
        const data   = await dashRes.json();
        const fichas = fichasRes.ok ? await fichasRes.json() : [];

        const s = data.stats;
        const set = (k, v) => { const el = document.querySelector(`[data-key="${k}"]`); if (el) el.textContent = v; };
        set('apr-cursos',   s.cursosActivos);
        set('apr-progreso', s.promedioProgreso + '%');
        set('apr-comp',     s.cursosCompletos);
        set('apr-logros',   s.totalInsignias);

        // Mapa de progreso cursoId → { progreso, estado, fechaLimite }
        const progresoMap = {};
        for (const c of data.cursos) progresoMap[c.cursoId] = c;

        // ── Próxima actividad ────────────────────────────────
        const nextWrap = document.getElementById('proxima-actividad');
        if (nextWrap && data.proximaActividad) {
            const act = data.proximaActividad;
            nextWrap.innerHTML = `
                <div style="background:linear-gradient(135deg,rgba(26,86,219,.15),rgba(8,145,178,.1));border:1px solid rgba(26,86,219,.25);border-radius:16px;padding:1.25rem 1.5rem;display:flex;align-items:center;gap:1.25rem;margin-bottom:1.25rem">
                    <div style="width:48px;height:48px;border-radius:14px;background:rgba(26,86,219,.25);display:flex;align-items:center;justify-content:center;flex-shrink:0">
                        <i class="bi bi-play-fill" style="font-size:22px;color:#60a5fa"></i>
                    </div>
                    <div style="flex:1;min-width:0">
                        <div style="font-size:.72rem;font-weight:600;color:#60a5fa;text-transform:uppercase;letter-spacing:.06em;margin-bottom:.2rem">Continuar aprendiendo</div>
                        <div style="font-weight:700;font-size:.95rem;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${_esc(act.titulo)}</div>
                        <div style="font-size:.78rem;color:var(--text-muted);margin-top:.15rem">${_esc(act.momento?.modulo?.titulo || '')}</div>
                    </div>
                    <a href="/curso.html?id=${act.momento?.modulo?.cursoId || ''}" style="padding:.6rem 1.2rem;border-radius:10px;background:#1a56db;color:#fff;font-size:.82rem;font-weight:700;text-decoration:none;white-space:nowrap">Ir al curso</a>
                </div>`;
            nextWrap.style.display = '';
        }

        // ── Fichas con cursos ────────────────────────────────
        const fichasBanner = document.getElementById('aprendiz-ficha-banner');
        if (fichasBanner) {
            if (!fichas.length) {
                fichasBanner.innerHTML = `
                    <div style="background:var(--surface);border:1px solid var(--border);border-radius:16px;padding:2rem;text-align:center;color:var(--text-muted)">
                        <i class="bi bi-calendar3" style="font-size:36px;display:block;margin-bottom:.75rem"></i>
                        <p style="font-size:.9rem">No estás asignado a ninguna ficha todavía.<br>Contacta a un administrador o instructor.</p>
                    </div>`;
            } else {
                fichasBanner.innerHTML = `
                    <p class="section-title" style="margin-bottom:.75rem">Mis Fichas y Cursos</p>
                    ${fichas.map(f => _renderFichaCard(f, progresoMap)).join('')}`;
                // Enlazar buscadores
                fichas.forEach(f => _bindFichaSearch(f.id));
            }
            fichasBanner.style.display = '';
        }

        // ── Cursos directos (sin ficha) ──────────────────────
        const cursosWrap = document.getElementById('aprendiz-cursos');
        if (cursosWrap) {
            const fichasCursoIds = new Set(fichas.flatMap(f => f.cursos.map(c => c.cursoId)));
            const cursosDirectos  = data.cursos.filter(c => !fichasCursoIds.has(c.cursoId));
            if (!cursosDirectos.length) {
                cursosWrap.innerHTML = '';
            } else {
                cursosWrap.innerHTML = `
                    <p class="section-title" style="margin-bottom:.75rem">Otros cursos inscritos</p>
                    <div style="display:flex;flex-direction:column;gap:.75rem">
                        ${cursosDirectos.map(c => _renderCursoRow(c)).join('')}
                    </div>`;
            }
        }

        // ── Insignias ────────────────────────────────────────
        if (s.totalInsignias > 0 && data.insignias?.length) {
            const card = document.getElementById('insignias-card');
            if (card) {
                card.style.display = '';
                card.querySelector('.insignias-desc').innerHTML =
                    data.insignias.map(i => `<span title="${_esc(i.nombre)}">${i.emoji || '🏅'}</span>`).join(' ') +
                    (s.totalInsignias > data.insignias.length ? ` +${s.totalInsignias - data.insignias.length} más` : '');
            }
        }

        // ── Tests ────────────────────────────────────────────
        const testsWrap = document.getElementById('aprendiz-tests');
        if (testsWrap && data.testResultados?.length) {
            testsWrap.innerHTML = `
                <p class="section-title" style="margin-bottom:.75rem">Resultados de evaluaciones</p>
                <div style="display:flex;flex-direction:column;gap:.5rem">
                    ${data.testResultados.map(t => {
                        const pct   = Math.round(t.puntaje);
                        const color = pct >= 70 ? '#10b981' : pct >= 50 ? '#f59e0b' : '#ef4444';
                        return `
                        <div style="display:flex;align-items:center;gap:1rem;background:var(--surface);border:1px solid var(--border);border-radius:12px;padding:.85rem 1.25rem">
                            <div style="width:40px;height:40px;border-radius:10px;background:${color}22;display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:1.1rem">${t.tipo==='pretest'?'📋':'🏆'}</div>
                            <div style="flex:1;min-width:0">
                                <div style="font-weight:600;font-size:.88rem;text-transform:capitalize">${t.tipo}</div>
                                <div style="font-size:.75rem;color:var(--text-muted)">${new Date(t.fecha).toLocaleDateString('es-CO')}</div>
                            </div>
                            <div style="font-size:1.1rem;font-weight:800;color:${color}">${pct}%</div>
                        </div>`;
                    }).join('')}
                </div>`;
            testsWrap.style.display = '';
        }

    } catch (err) {
        console.error('[dashboard aprendiz]', err);
    }
}

/* ── Renderiza una ficha con sus cursos ─────────────────────── */
function _renderFichaCard(f, progresoMap) {
    const jornada   = { manana:'Mañana', diurna:'Diurna', nocturna:'Nocturna', mixta:'Mixta', madrugada:'Madrugada' }[f.jornada] || f.jornada || '';
    const instrText = (f.instructores || []).map(i => _esc(i.nombre || i.correo || '—')).join(' · ');
    const nCursos   = f.cursos.length;

    const cursosHtml = nCursos === 0
        ? `<p style="font-size:.84rem;color:var(--text-muted);padding:.5rem 0;text-align:center">Sin cursos asignados aún</p>`
        : f.cursos.map(c => _renderFichaCursoRow(c, progresoMap[c.cursoId])).join('');

    const searchHtml = nCursos > 3 ? `
        <div class="apr-ficha-search-wrap">
            <i class="bi bi-search" style="font-size:12px;color:var(--text-muted);flex-shrink:0"></i>
            <input type="text" class="apr-ficha-search" data-ficha-id="${f.id}"
                placeholder="Buscar curso en esta ficha…" autocomplete="off">
            <button class="apr-ficha-search-clear" data-ficha-id="${f.id}" style="display:none" title="Limpiar">
                <i class="bi bi-x-lg" style="font-size:11px"></i>
            </button>
        </div>` : '';

    return `
    <div class="apr-ficha-section" id="ficha-section-${f.id}">
        <div class="apr-ficha-header">
            <div style="flex:1;min-width:0">
                <div class="apr-ficha-num">Ficha ${_esc(f.numero)}</div>
                <div class="apr-ficha-prog">${_esc(f.programa?.nombre || 'Sin programa')}</div>
                ${instrText ? `<div class="apr-ficha-inst"><i class="bi bi-person-workspace" style="font-size:11px"></i> ${instrText}</div>` : ''}
            </div>
            <div style="display:flex;flex-direction:column;align-items:flex-end;gap:.3rem;flex-shrink:0">
                <span class="apr-ficha-estado ${f.estado === 'activa' ? 'activa' : 'inactiva'}">${f.estado}</span>
                ${jornada ? `<span class="apr-ficha-jornada">${jornada}</span>` : ''}
                <span style="font-size:.72rem;color:var(--text-muted)">${nCursos} ${nCursos===1?'curso':'cursos'}</span>
            </div>
        </div>
        ${searchHtml}
        <div class="apr-ficha-cursos" id="ficha-cursos-${f.id}">
            ${cursosHtml}
        </div>
        <div class="apr-no-results" id="ficha-no-results-${f.id}" style="display:none">
            <i class="bi bi-search" style="font-size:22px"></i>
            <p>Sin resultados para tu búsqueda</p>
        </div>
    </div>`;
}

function _renderFichaCursoRow(c, progInfo) {
    const p         = progInfo || null;
    const isDisp    = !p || p.estado === 'disponible';
    const progreso  = p?.progreso ?? 0;
    const barColor  = progreso === 100 ? '#10b981' : '#06b6d4';
    const nivel     = { basico:'Básico', intermedio:'Intermedio', avanzado:'Avanzado' }[c.nivel] || c.nivel || '';
    const searchTxt = `${c.titulo} ${nivel} ${c.instructor}`.toLowerCase();

    // Fecha límite badge
    let deadlineHtml = '';
    if (c.fechaLimite) {
        const dl      = new Date(c.fechaLimite);
        const diffMs  = dl - Date.now();
        const vencido = diffMs < 0;
        const urgente = !vencido && diffMs < 48 * 36e5;
        const color   = vencido ? '#ef4444' : urgente ? '#f59e0b' : '#6366f1';
        const bg      = vencido ? 'rgba(239,68,68,.12)' : urgente ? 'rgba(245,158,11,.12)' : 'rgba(99,102,241,.12)';
        const icono   = vencido ? '⚠️' : urgente ? '⏰' : '📅';
        const label   = vencido ? 'Plazo vencido' : 'Plazo hasta';
        const fecha   = dl.toLocaleDateString('es-CO', { day:'2-digit', month:'short', year:'numeric' });
        const hora    = dl.toLocaleTimeString('es-CO', { hour:'2-digit', minute:'2-digit', hour12:false });
        deadlineHtml  = `<span style="font-size:.7rem;font-weight:600;padding:.18rem .5rem;border-radius:5px;background:${bg};color:${color};margin-left:.4rem">${icono} ${label}: ${fecha} ${hora}</span>`;
    }

    return `
    <a href="/curso.html?id=${c.cursoId}" class="apr-ficha-curso-row" data-search-text="${_esc(searchTxt)}">
        <div class="apr-curso-icon" style="background:rgba(${isDisp?'139,92,246':'6,182,212'},.12);border-color:rgba(${isDisp?'139,92,246':'6,182,212'},.2)">
            <i class="bi bi-mortarboard-fill" style="font-size:18px;color:${isDisp?'#a78bfa':'#06b6d4'}"></i>
        </div>
        <div class="apr-curso-body">
            <div class="apr-curso-titulo">${_esc(c.titulo)}</div>
            <div class="apr-curso-meta">
                <span>${nivel}</span>
                <span>·</span>
                <span>${c.totalModulos} módulos</span>
                <span>·</span>
                <span>${_esc(c.instructor)}</span>
                ${deadlineHtml}
            </div>
            ${isDisp
                ? `<span class="apr-curso-disp">Disponible — haz clic para comenzar</span>`
                : `<div class="apr-curso-progress-wrap">
                       <div class="apr-curso-progress-bar" style="width:${progreso}%;background:${barColor}"></div>
                   </div>
                   <span class="apr-curso-pct">${progreso === 100 ? '✅ Completado' : progreso + '% completado'}</span>`
            }
        </div>
        <i class="bi bi-arrow-right-circle" style="font-size:20px;color:var(--text-muted);flex-shrink:0"></i>
    </a>`;
}

function _renderCursoRow(c) {
    const barColor   = c.progreso === 100 ? '#10b981' : '#06b6d4';
    const nivel      = { basico:'Básico', intermedio:'Intermedio', avanzado:'Avanzado' }[c.nivel] || c.nivel || '';
    return `
    <a href="/curso.html?id=${c.cursoId}" style="display:flex;align-items:center;gap:1.25rem;background:var(--surface);border:1px solid var(--border);border-radius:14px;padding:1rem 1.25rem;text-decoration:none;color:var(--text)">
        <div style="width:44px;height:44px;border-radius:12px;background:rgba(6,182,212,.12);border:1px solid rgba(6,182,212,.2);display:flex;align-items:center;justify-content:center;flex-shrink:0">
            <i class="bi bi-mortarboard-fill" style="font-size:20px;color:#06b6d4"></i>
        </div>
        <div style="flex:1;min-width:0">
            <div style="font-weight:700;font-size:.9rem;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${_esc(c.titulo)}</div>
            <div style="font-size:.76rem;color:#06b6d4;font-weight:600;margin:.1rem 0">${nivel} · ${c.totalModulos} módulos · ${_esc(c.instructor)}</div>
            <div style="height:4px;background:rgba(255,255,255,.08);border-radius:2px;overflow:hidden;margin-top:.35rem">
                <div style="height:100%;width:${c.progreso}%;background:${barColor};border-radius:2px;transition:width .5s"></div>
            </div>
            <span style="font-size:.72rem;color:var(--text-muted)">${c.progreso === 100 ? '✅ Completado' : c.progreso + '% completado'}</span>
        </div>
        <i class="bi bi-arrow-right" style="font-size:18px;color:var(--text-muted);flex-shrink:0"></i>
    </a>`;
}

/* ── Buscador por ficha ──────────────────────────────────────── */
function _bindFichaSearch(fichaId) {
    const input     = document.querySelector(`.apr-ficha-search[data-ficha-id="${fichaId}"]`);
    const clearBtn  = document.querySelector(`.apr-ficha-search-clear[data-ficha-id="${fichaId}"]`);
    const noResults = document.getElementById(`ficha-no-results-${fichaId}`);
    if (!input) return;

    const filter = () => {
        const q = input.value.trim().toLowerCase();
        if (clearBtn) clearBtn.style.display = q ? '' : 'none';
        const rows = document.querySelectorAll(`#ficha-cursos-${fichaId} .apr-ficha-curso-row`);
        let visible = 0;
        rows.forEach(row => {
            const match = !q || row.dataset.searchText.includes(q);
            row.style.display = match ? '' : 'none';
            if (match) visible++;
        });
        if (noResults) noResults.style.display = (q && visible === 0) ? '' : 'none';
    };

    input.addEventListener('input', filter);
    clearBtn?.addEventListener('click', () => { input.value = ''; filter(); input.focus(); });
}

/* ── Helpers ─────────────────────────────────────────────────── */
function _esc(s) {
    return String(s ?? '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

/* ── Iconos ── */
const usersIcon    = () => `<i class="bi bi-people-fill" style="font-size:22px"></i>`;
const activeIcon   = () => `<i class="bi bi-check2" style="font-size:22px"></i>`;
const instrIcon    = () => `<i class="bi bi-person-workspace" style="font-size:22px"></i>`;
const studIcon     = () => `<i class="bi bi-mortarboard-fill" style="font-size:22px"></i>`;
const classIcon    = () => `<i class="bi bi-calendar3" style="font-size:22px"></i>`;
const bookIcon     = () => `<i class="bi bi-book-fill" style="font-size:22px"></i>`;
const progressIcon = () => `<i class="bi bi-bar-chart-line-fill" style="font-size:22px"></i>`;
const starIcon     = () => `<i class="bi bi-star-fill" style="font-size:22px"></i>`;
const checkIcon    = () => `<i class="bi bi-check-circle-fill" style="font-size:22px"></i>`;
