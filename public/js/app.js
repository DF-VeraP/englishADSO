document.addEventListener('DOMContentLoaded', async () => {
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

    document.getElementById('btn-logout').addEventListener('click', () => AuthGuard.logout());
});

async function renderDashboard(auth, rol) {
    const container = document.getElementById('stats-row');

    if (rol === 'admin') {
        await renderAdminDashboard(auth, container);
    } else if (rol === 'instructor') {
        await renderInstructorDashboard(auth, container);
    } else if (rol === 'aprendiz') {
        await renderAprendizDashboard(auth, container);
    }
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

        // Últimos usuarios registrados
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
        const res  = await auth.apiFetch('/api/dashboard/aprendiz');
        if (!res.ok) throw new Error();
        const data = await res.json();
        const s    = data.stats;
        const set  = (k, v) => { const el = document.querySelector(`[data-key="${k}"]`); if (el) el.textContent = v; };
        set('apr-cursos',   s.cursosActivos);
        set('apr-progreso', s.promedioProgreso + '%');
        set('apr-comp',     s.cursosCompletos);
        set('apr-logros',   s.totalInsignias);

        // Fichas
        const fichasBanner = document.getElementById('aprendiz-ficha-banner');
        if (fichasBanner) {
            try {
                const fichas = await auth.apiFetch('/api/fichas/mis-fichas').then(r => r.ok ? r.json() : []);
                if (fichas.length) {
                    fichasBanner.innerHTML = fichas.map(f => `
                        <div class="ficha-banner">
                            <div class="ficha-banner-programa">${f.programa?.nombre || 'Sin programa'}</div>
                            <div class="ficha-banner-meta">
                                <span class="ficha-banner-num">Ficha <strong>${f.numero}</strong></span>
                                ${f.jornada ? `<span class="ficha-banner-jornada">${f.jornada}</span>` : ''}
                                <span class="ficha-banner-estado ${f.estado === 'activa' ? 'activa' : 'inactiva'}">${f.estado}</span>
                            </div>
                        </div>`).join('');
                    fichasBanner.style.display = '';
                }
            } catch { /* fichas no críticas */ }
        }

        // Instructores
        const instrWrap = document.getElementById('aprendiz-instructores');
        if (instrWrap && data.instructores?.length) {
            instrWrap.innerHTML = `
                <p class="section-title" style="margin-bottom:.75rem">Mis Instructores</p>
                <div style="display:flex;flex-direction:column;gap:.6rem">
                    ${data.instructores.map(inst => {
                        const initials = (inst.nombre || inst.correo || '?').slice(0, 2).toUpperCase();
                        return `
                        <div style="background:var(--surface);border:1px solid var(--border);border-radius:14px;padding:.9rem 1.25rem;display:flex;align-items:center;gap:1rem">
                            <div style="width:44px;height:44px;border-radius:50%;background:rgba(99,102,241,.18);color:#a5b4fc;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:.88rem;flex-shrink:0;letter-spacing:.02em">
                                ${initials}
                            </div>
                            <div style="flex:1;min-width:0">
                                <div style="font-weight:700;font-size:.9rem;margin-bottom:.15rem">${inst.nombre || '—'}</div>
                                ${inst.correo
                                    ? `<a href="mailto:${inst.correo}" style="font-size:.78rem;color:#818cf8;text-decoration:none;display:inline-flex;align-items:center;gap:.3rem" onmouseover="this.style.color='#a5b4fc'" onmouseout="this.style.color='#818cf8'">
                                           <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                                           ${inst.correo}
                                       </a>`
                                    : `<span style="font-size:.78rem;color:var(--text-muted)">Sin correo registrado</span>`
                                }
                            </div>
                            <div style="font-size:.72rem;color:var(--text-muted);text-align:right;flex-shrink:0">
                                <div style="font-weight:600;color:#6366f1;font-size:.8rem">${inst.cursos.length}</div>
                                <div>${inst.cursos.length === 1 ? 'curso' : 'cursos'}</div>
                            </div>
                        </div>`;
                    }).join('')}
                </div>`;
            instrWrap.style.display = '';
        }

        // Próxima actividad
        const nextWrap = document.getElementById('proxima-actividad');
        if (nextWrap && data.proximaActividad) {
            const act = data.proximaActividad;
            nextWrap.innerHTML = `
                <div style="background:linear-gradient(135deg,rgba(26,86,219,.15),rgba(8,145,178,.1));border:1px solid rgba(26,86,219,.25);border-radius:16px;padding:1.25rem 1.5rem;display:flex;align-items:center;gap:1.25rem;margin-bottom:1.25rem">
                    <div style="width:48px;height:48px;border-radius:14px;background:rgba(26,86,219,.25);display:flex;align-items:center;justify-content:center;flex-shrink:0">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                    </div>
                    <div style="flex:1;min-width:0">
                        <div style="font-size:.72rem;font-weight:600;color:#60a5fa;text-transform:uppercase;letter-spacing:.06em;margin-bottom:.2rem">Continuar aprendiendo</div>
                        <div style="font-weight:700;font-size:.95rem;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${act.titulo}</div>
                        <div style="font-size:.78rem;color:var(--text-muted);margin-top:.15rem">${act.momento?.modulo?.titulo || ''}</div>
                    </div>
                    <a href="/curso.html?id=${act.momento?.modulo?.cursoId || ''}" style="padding:.6rem 1.2rem;border-radius:10px;background:#1a56db;color:#fff;font-size:.82rem;font-weight:700;text-decoration:none;white-space:nowrap;transition:all .2s" onmouseover="this.style.background='#1240a0'" onmouseout="this.style.background='#1a56db'">Ir al curso</a>
                </div>`;
            nextWrap.style.display = '';
        }

        // Cursos
        const cursosWrap = document.getElementById('aprendiz-cursos');
        if (cursosWrap) {
            if (!data.cursos.length) {
                cursosWrap.innerHTML = `
                    <div style="background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);border-radius:16px;padding:1.5rem;text-align:center;color:var(--text-muted)">
                        <p style="font-size:.9rem">Aún no estás inscrito en ningún curso. Contacta a un administrador.</p>
                    </div>`;
            } else {
                cursosWrap.innerHTML = `
                    <p class="section-title" style="margin-bottom:.75rem">Mis Cursos</p>
                    <div style="display:flex;flex-direction:column;gap:.75rem">
                        ${data.cursos.map(c => {
                            const disponible  = c.deFicha && c.estado === 'disponible';
                            const barColor    = c.progreso === 100 ? '#10b981' : '#06b6d4';
                            const accentColor = disponible ? '#8b5cf6' : '#06b6d4';

                            // Fecha límite
                            let deadlineBadge = '';
                            if (c.fechaLimite) {
                                const dl      = new Date(c.fechaLimite);
                                const ahora   = new Date();
                                const diffMs  = dl - ahora;
                                const diffH   = diffMs / 36e5;
                                const vencido = diffMs < 0;
                                const urgente = !vencido && diffH < 48;
                                const fecha   = dl.toLocaleDateString('es-CO', { day: '2-digit', month: 'short', year: 'numeric' });
                                const hora    = dl.toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit', hour12: false });
                                const color   = vencido ? '#ef4444' : urgente ? '#f59e0b' : '#6366f1';
                                const bg      = vencido ? 'rgba(239,68,68,.12)' : urgente ? 'rgba(245,158,11,.12)' : 'rgba(99,102,241,.12)';
                                const icono   = vencido ? '⚠️' : urgente ? '⏰' : '📅';
                                const label   = vencido ? 'Plazo vencido' : 'Plazo hasta';
                                deadlineBadge = `<div style="display:inline-flex;align-items:center;gap:.3rem;font-size:.72rem;font-weight:600;padding:.22rem .55rem;border-radius:6px;background:${bg};color:${color};margin-top:.3rem">
                                    ${icono} ${label}: ${fecha}, ${hora}
                                </div>`;
                            }

                            return `
                        <a href="/curso.html?id=${c.cursoId}" style="display:flex;align-items:center;gap:1.25rem;background:var(--surface);border:1px solid var(--border);border-radius:16px;padding:1.25rem 1.5rem;text-decoration:none;color:var(--text);transition:all .2s"
                            onmouseover="this.style.borderColor='${accentColor}';this.style.transform='translateY(-2px)'"
                            onmouseout="this.style.borderColor='';this.style.transform=''">
                            <div style="width:52px;height:52px;border-radius:14px;background:rgba(${disponible?'139,92,246':'6,182,212'},.15);border:1px solid rgba(${disponible?'139,92,246':'6,182,212'},.2);display:flex;align-items:center;justify-content:center;flex-shrink:0">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${accentColor}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
                            </div>
                            <div style="flex:1;min-width:0">
                                <div style="display:flex;align-items:center;gap:.5rem;margin-bottom:.1rem">
                                    <div style="font-weight:700;font-size:.95rem;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${c.titulo}</div>
                                    ${disponible ? `<span style="font-size:.68rem;font-weight:700;padding:.15rem .5rem;border-radius:20px;background:rgba(139,92,246,.18);color:#c4b5fd;white-space:nowrap;flex-shrink:0">Disponible</span>` : ''}
                                </div>
                                <div style="font-size:.75rem;color:${accentColor};font-weight:600;margin-bottom:.15rem">${c.nivel ? c.nivel.charAt(0).toUpperCase()+c.nivel.slice(1) : ''} · ${c.totalModulos} módulos · ${c.instructor}</div>
                                <div style="font-size:.78rem;color:var(--text-muted);margin-bottom:.3rem">
                                    ${disponible ? 'Curso asignado a tu ficha — haz clic para comenzar' : c.progreso === 100 ? '✅ Completado' : c.progreso + '% completado'}
                                </div>
                                ${deadlineBadge}
                                ${!disponible ? `
                                <div style="height:5px;background:rgba(255,255,255,.08);border-radius:3px;overflow:hidden;margin-top:.4rem">
                                    <div style="height:100%;width:${c.progreso}%;background:${barColor};border-radius:3px;transition:width .5s"></div>
                                </div>` : ''}
                            </div>
                            <div style="display:flex;flex-direction:column;align-items:flex-end;gap:.5rem;flex-shrink:0">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                                ${c.progreso >= 80 && !disponible ? `<a href="/api/certificates/${c.cursoId}?token=${AuthGuard.getToken()}" onclick="event.stopPropagation()" style="font-size:.72rem;font-weight:700;padding:.3rem .7rem;border-radius:8px;background:rgba(16,185,129,.2);color:#34d399;border:1px solid rgba(16,185,129,.3);text-decoration:none;white-space:nowrap" title="Descargar certificado">🎓 Certificado</a>` : ''}
                            </div>
                        </a>`;
                        }).join('')}
                    </div>`;
            }
        }

        // Insignias
        if (s.totalInsignias > 0 && data.insignias?.length) {
            const card = document.getElementById('insignias-card');
            if (card) {
                card.style.display = '';
                card.querySelector('.insignias-desc').innerHTML =
                    data.insignias.map(i => `<span title="${i.nombre}">${i.emoji || '🏅'}</span>`).join(' ') +
                    (s.totalInsignias > data.insignias.length ? ` +${s.totalInsignias - data.insignias.length} más` : '');
            }
        }

        // Tests
        const testsWrap = document.getElementById('aprendiz-tests');
        if (testsWrap && data.testResultados?.length) {
            testsWrap.innerHTML = `
                <p class="section-title" style="margin-bottom:.75rem">Resultados de evaluaciones</p>
                <div style="display:flex;flex-direction:column;gap:.5rem">
                    ${data.testResultados.map(t => {
                        const pct = Math.round((t.correctas || (t.puntaje/t.total*100)|| t.puntaje) );
                        const color = pct >= 70 ? '#10b981' : pct >= 50 ? '#f59e0b' : '#ef4444';
                        return `
                        <div style="display:flex;align-items:center;gap:1rem;background:var(--surface);border:1px solid var(--border);border-radius:12px;padding:.85rem 1.25rem">
                            <div style="width:40px;height:40px;border-radius:10px;background:${color}22;display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:1.1rem">${t.tipo==='pretest'?'📋':'🏆'}</div>
                            <div style="flex:1;min-width:0">
                                <div style="font-weight:600;font-size:.88rem;text-transform:capitalize">${t.tipo}</div>
                                <div style="font-size:.75rem;color:var(--text-muted)">${new Date(t.fecha).toLocaleDateString('es-CO')}</div>
                            </div>
                            <div style="font-size:1.1rem;font-weight:800;color:${color}">${Math.round(t.puntaje)}%</div>
                        </div>`;
                    }).join('')}
                </div>`;
            testsWrap.style.display = '';
        }

    } catch (err) {
        console.error('[dashboard]', err);
    }
}

/* ── Iconos ── */
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
const checkIcon    = () => svg('<path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>');
