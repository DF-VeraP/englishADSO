document.addEventListener('DOMContentLoaded', async () => {
    // ── Guard: redirige al login si no hay sesión válida ──
    const payload = AuthGuard.requireAuth();
    if (!payload) return;

    const user = AuthGuard.getUser() || { nombre: payload.email, email: payload.email, rol: payload.rol };
    const rol  = user.rol || payload.rol;
    const nombre = user.nombre || user.email || payload.email;

    // ── Aplicar clase de rol al body ──────────────────────
    document.body.classList.add(`role-${rol}`);

    // ── Header: nombre, avatar, badge ────────────────────
    const initials = nombre.slice(0, 2).toUpperCase();
    document.getElementById('user-avatar').textContent = initials;
    document.getElementById('user-name').textContent   = nombre;

    const badge = document.getElementById('role-badge');
    const badgeMap = { admin: 'badge-admin', instructor: 'badge-instructor', aprendiz: 'badge-aprendiz' };
    badge.className = `role-badge ${badgeMap[rol] || ''}`;
    badge.textContent = rol;

    // ── Mostrar enlaces de admin en nav ───────────────────
    if (rol === 'admin') {
        document.querySelectorAll('.admin-only').forEach(el => el.style.display = 'flex');
    }

    // ── Welcome banner ────────────────────────────────────
    const firstName = nombre.split(' ')[0];
    document.getElementById('welcome-title').textContent = `Hola, ${firstName} 👋`;
    const subtitles = {
        admin:       'Tienes acceso completo a la administración de la plataforma.',
        instructor:  'Gestiona tus clases y aprendices desde aquí.',
        aprendiz:    'Continúa tu camino hacia el dominio del inglés médico.',
    };
    document.getElementById('welcome-sub').textContent = subtitles[rol] || '';

    // ── Stats ─────────────────────────────────────────────
    await renderStats(rol);

    // ── Logout ────────────────────────────────────────────
    document.getElementById('btn-logout').addEventListener('click', () => {
        AuthGuard.logout();
    });
});

async function renderStats(rol) {
    const container = document.getElementById('stats-row');

    const adminStats = [
        { icon: usersIcon(),  label: 'Total usuarios',     value: '—', color: 'blue',  key: 'total' },
        { icon: activeIcon(), label: 'Usuarios activos',   value: '—', color: 'green', key: 'active' },
        { icon: instrIcon(),  label: 'Cursos activos',     value: '—', color: 'cyan',  key: 'courses' },
        { icon: studIcon(),   label: 'Inscripciones',      value: '—', color: 'amber', key: 'inscripciones' },
    ];

    const roleStats = {
        instructor: [
            { icon: classIcon(), label: 'Mis clases',    value: '—', color: 'blue' },
            { icon: studIcon(),  label: 'Aprendices',    value: '—', color: 'cyan' },
            { icon: bookIcon(),  label: 'Módulos',       value: '—', color: 'green' },
        ],
        aprendiz: [
            { icon: bookIcon(),     label: 'Cursos activos', value: '—', color: 'blue',  key: 'apr-cursos'   },
            { icon: progressIcon(), label: 'Mi progreso',    value: '—', color: 'cyan',  key: 'apr-progreso' },
            { icon: starIcon(),     label: 'Logros',         value: '—', color: 'amber', key: 'apr-logros'   },
        ],
    };

    const stats = rol === 'admin' ? adminStats : (roleStats[rol] || []);
    container.innerHTML = stats.map(s => `
        <div class="stat-card">
            <div class="stat-icon ${s.color}">${s.icon}</div>
            <div>
                <div class="stat-value" data-key="${s.key || ''}">${s.value}</div>
                <div class="stat-label">${s.label}</div>
            </div>
        </div>`).join('');

    if (rol === 'admin')    await loadAdminStats();
    if (rol === 'aprendiz') { await loadAprendizFichas(); await loadAprendizCursos(); }
}

async function loadAdminStats() {
    try {
        const token   = AuthGuard.getToken();
        const headers = { Authorization: `Bearer ${token}` };

        const [usersRes, coursesRes, inscRes] = await Promise.all([
            fetch('/api/users',          { headers }),
            fetch('/api/courses',        { headers }),
            fetch('/api/inscripciones',  { headers }),
        ]);

        const users        = usersRes.ok   ? await usersRes.json()   : [];
        const courses      = coursesRes.ok ? await coursesRes.json() : [];
        const inscripciones = inscRes.ok   ? await inscRes.json()    : [];

        document.querySelector('[data-key="total"]').textContent        = users.length;
        document.querySelector('[data-key="active"]').textContent       = users.filter(u => u.estado_usuario).length;
        document.querySelector('[data-key="courses"]').textContent      = courses.filter(c => c.estado).length;
        document.querySelector('[data-key="inscripciones"]').textContent = inscripciones.length;
    } catch { /* stats no críticas, falla silenciosa */ }
}

async function loadAprendizFichas() {
    try {
        const token   = AuthGuard.getToken();
        const headers = { Authorization: `Bearer ${token}` };

        const fichas = await fetch('/api/fichas/mis-fichas', { headers })
            .then(r => r.ok ? r.json() : [])
            .catch(() => []);

        const container = document.getElementById('aprendiz-ficha-banner');
        if (!container || !fichas.length) return;

        const jornadaLabel = j => ({ manana: 'Mañana', tarde: 'Tarde', noche: 'Noche' }[j] || j);

        container.innerHTML = fichas.map(f => `
            <div class="ficha-banner">
                <div class="ficha-banner-programa">${f.programa?.nombre || 'Sin programa'}</div>
                <div class="ficha-banner-meta">
                    <span class="ficha-banner-num">Ficha <strong>${f.numero}</strong></span>
                    ${f.jornada ? `<span class="ficha-banner-jornada">${jornadaLabel(f.jornada)}</span>` : ''}
                    <span class="ficha-banner-estado ${f.estado === 'activa' ? 'activa' : 'inactiva'}">${f.estado}</span>
                </div>
                ${f.programa?.codigo ? `<div class="ficha-banner-codigo">Código: ${f.programa.codigo}</div>` : ''}
            </div>
        `).join('');

        container.style.display = '';
    } catch (err) {
        console.error('[aprendiz] Error cargando fichas:', err);
    }
}

async function loadAprendizCursos() {
    try {
        const token   = AuthGuard.getToken();
        const headers = { Authorization: `Bearer ${token}` };

        const inscripciones = await fetch('/api/inscripciones', { headers }).then(r => r.json());
        const container     = document.getElementById('aprendiz-cursos');
        if (!container) return;

        if (!Array.isArray(inscripciones) || !inscripciones.length) {
            container.innerHTML = `
                <div style="background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);border-radius:16px;padding:1.5rem;margin-bottom:.5rem;text-align:center;color:var(--text-muted)">
                    <p style="font-size:.9rem">Aún no estás inscrito en ningún curso. Contacta a un administrador.</p>
                </div>`;
            _setAprStats(0, 0, 0);
            return;
        }

        container.innerHTML = `
            <p class="section-title" style="margin-bottom:.75rem">Mis Cursos</p>
            <div style="display:flex;flex-direction:column;gap:.75rem">
                ${inscripciones.map(i => {
                    const pct      = Math.round(i.progreso || 0);
                    const nivel    = i.curso?.nivel || '';
                    const programa = i.curso?.fichas?.[0]?.ficha?.programa?.nombre || '';
                    const meta     = [programa, nivel ? nivel.charAt(0).toUpperCase() + nivel.slice(1) : '']
                                        .filter(Boolean).join(' · ');
                    return `
                        <a href="/curso.html?id=${i.curso.id}" style="
                            display:flex;align-items:center;gap:1.25rem;
                            background:var(--surface);border:1px solid var(--border);
                            border-radius:16px;padding:1.25rem 1.5rem;text-decoration:none;
                            transition:all .2s;cursor:pointer;color:var(--text)
                        " onmouseover="this.style.borderColor='var(--accent)';this.style.transform='translateY(-2px)'"
                           onmouseout="this.style.borderColor='var(--border)';this.style.transform=''">
                            <div style="width:52px;height:52px;border-radius:14px;background:rgba(6,182,212,.15);border:1px solid rgba(6,182,212,.2);display:flex;align-items:center;justify-content:center;flex-shrink:0">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#06b6d4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
                            </div>
                            <div style="flex:1;min-width:0">
                                <div style="font-weight:700;font-size:.95rem;margin-bottom:.1rem;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${i.curso.titulo}</div>
                                ${meta ? `<div style="font-size:.75rem;color:#06b6d4;font-weight:600;margin-bottom:.15rem;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${meta}</div>` : ''}
                                <div style="font-size:.78rem;color:var(--text-muted);margin-bottom:.5rem">${pct === 100 ? '✅ Completado' : `${pct}% completado`}</div>
                                <div style="height:5px;background:rgba(255,255,255,.08);border-radius:3px;overflow:hidden">
                                    <div style="height:100%;width:${pct}%;background:${pct===100?'#10b981':'#06b6d4'};border-radius:3px;transition:width .5s"></div>
                                </div>
                            </div>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                        </a>`;
                }).join('')}
            </div>`;

        // Cargar progreso detallado de cada curso
        const progresos = await Promise.all(
            inscripciones.map(i =>
                fetch(`/api/courses/${i.curso.id}/mi-progreso`, { headers })
                    .then(r => r.ok ? r.json() : { insignias: [], tests: [] })
                    .catch(() => ({ insignias: [], tests: [] }))
            )
        );

        // Stats: cursos activos, progreso promedio, logros totales
        const cursosActivos = inscripciones.filter(i => i.estado !== 'completado').length;
        const promedioProgreso = inscripciones.length
            ? Math.round(inscripciones.reduce((s, i) => s + (i.progreso || 0), 0) / inscripciones.length)
            : 0;
        const totalInsignias = progresos.reduce((s, p) => s + (p.insignias?.length || 0), 0);
        _setAprStats(cursosActivos, promedioProgreso, totalInsignias);

        // Mostrar insignias si hay
        if (totalInsignias) {
            const todasInsignias = progresos.flatMap(p => p.insignias || []);
            const card = document.getElementById('insignias-card');
            if (card) {
                card.style.display = '';
                card.querySelector('.insignias-desc').textContent =
                    `Tienes ${totalInsignias} insignia${totalInsignias > 1 ? 's' : ''}: ${todasInsignias.map(i => i.emoji).filter(Boolean).join(' ')}`;
            }
        }
    } catch (err) {
        console.error('[aprendiz] Error cargando cursos:', err);
    }
}

function _setAprStats(cursos, progreso, logros) {
    const k = (key, val) => {
        const el = document.querySelector(`[data-key="${key}"]`);
        if (el) el.textContent = val;
    };
    k('apr-cursos',   cursos);
    k('apr-progreso', `${progreso}%`);
    k('apr-logros',   logros);
}

/* ── Iconos inline ───────────────────────────────────────── */
const svg = (d, w = 22) =>
    `<svg width="${w}" height="${w}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${d}</svg>`;

const usersIcon    = () => svg('<path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>');
const activeIcon   = () => svg('<polyline points="20 6 9 17 4 12"/>');
const instrIcon    = () => svg('<rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>');
const studIcon     = () => svg('<path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>');
const classIcon    = () => svg('<rect x="2" y="3" width="20" height="14" rx="2"/>');
const bookIcon     = () => svg('<path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/>');
const progressIcon = () => svg('<line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>');
const starIcon     = () => svg('<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>');
