document.addEventListener('DOMContentLoaded', async () => {
    const payload = AuthGuard.requireAuth();
    if (!payload) return;

    const auth   = new AuthService();
    const user   = AuthGuard.getUser() || {};
    const nombre = user.nombre || payload.nombre || payload.email;
    const rol    = user.rol    || payload.rol;

    // Header
    document.getElementById('user-avatar').textContent = nombre.slice(0, 2).toUpperCase();
    document.getElementById('user-name').textContent   = nombre;
    const badge = document.getElementById('role-badge');
    badge.className = `role-badge badge-${rol}`;
    badge.textContent = rol;

    document.getElementById('btn-logout').addEventListener('click', () => AuthGuard.logout());

    // Toggle contraseña
    document.querySelectorAll('.ptoggle-pass').forEach(btn => {
        btn.addEventListener('click', () => {
            const input = document.getElementById(btn.dataset.target);
            input.type = input.type === 'password' ? 'text' : 'password';
        });
    });

    // Cargar perfil
    await loadProfile(auth);

    // Formulario
    document.getElementById('profileForm').addEventListener('submit', e => handleSave(e, auth));
    document.getElementById('btn-cancel').addEventListener('click', () => loadProfile(auth));
});

async function loadProfile(auth) {
    try {
        const res  = await auth.apiFetch('/api/users/me');
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || 'Error del servidor');

        // rol obtenido del storage (AuthGuard) o del propio response
        const userRol = (AuthGuard.getUser() || {}).rol || data.rol_usuario || '';

        const nombreInput = document.getElementById('nombre_usuario');
        nombreInput.value = data.nombre_usuario || '';
        nombreInput.removeAttribute('readonly');
        // Quitar lock previo si se recarga
        const lbl = nombreInput.closest('.pform-group')?.querySelector('.pform-label');
        lbl?.querySelector('.nombre-lock')?.remove();

        if (userRol !== 'admin') {
            nombreInput.setAttribute('readonly', true);
            nombreInput.setAttribute('autocomplete', 'off');
            nombreInput.title = 'Solo un administrador puede modificar el nombre';
            if (lbl) {
                lbl.insertAdjacentHTML('beforeend', ' <span class="nombre-lock" style="font-size:.7rem;color:#94a3b8;font-weight:400">&#128274; Solo admin</span>');
            }
        }

        document.getElementById('correo_usuario').value = data.correo_usuario || '';
        document.getElementById('rol_usuario').value    = data.rol_usuario    || '';

        // Tarjeta lateral
        const initials = (data.nombre_usuario || data.correo_usuario || '?').slice(0, 2).toUpperCase();
        document.getElementById('avatar-big').textContent          = initials;
        document.getElementById('profile-display-name').textContent = data.nombre_usuario || data.correo_usuario || '—';
        document.getElementById('profile-email').textContent       = data.correo_usuario || '—';

        const rolBadge = document.getElementById('profile-role-badge');
        if (rolBadge) rolBadge.textContent = data.rol_usuario || '—';

        document.getElementById('pstat-cursos').textContent    = data._count?.inscripciones ?? '—';
        document.getElementById('pstat-insignias').textContent = data._count?.insignias     ?? '—';
        document.getElementById('pstat-desde').textContent     = data.createdAt
            ? new Date(data.createdAt).toLocaleDateString('es-CO', { month: 'short', year: 'numeric' })
            : '—';

        // Limpiar contraseña
        document.getElementById('passw_actual').value = '';
        document.getElementById('passw_nueva').value  = '';

        // Actualizar avatar del header con datos reales
        const headerAvatar = document.getElementById('user-avatar');
        const headerName   = document.getElementById('user-name');
        if (headerAvatar) headerAvatar.textContent = initials;
        if (headerName)   headerName.textContent   = data.nombre_usuario || data.correo_usuario || '';

    } catch (err) {
        showAlert(err.message || 'No se pudo cargar el perfil.', 'error');
    }
}

async function handleSave(e, auth) {
    e.preventDefault();
    const btn = document.getElementById('btn-save');
    btn.classList.add('is-loading');
    btn.disabled = true;

    const userRol = (AuthGuard.getUser() || {}).rol || '';

    const body = {
        correo_usuario: document.getElementById('correo_usuario').value.trim(),
    };
    if (userRol === 'admin') {
        body.nombre_usuario = document.getElementById('nombre_usuario').value.trim();
    }

    const passwActual = document.getElementById('passw_actual').value;
    const passwNueva  = document.getElementById('passw_nueva').value;
    if (passwNueva) {
        body.passw_actual = passwActual;
        body.passw_nueva  = passwNueva;
    }

    try {
        const res  = await auth.apiFetch('/api/users/me', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        });
        const data = await res.json();

        if (!res.ok) {
            showAlert(data.message || 'Error al guardar.', 'error');
            return;
        }

        showAlert('Perfil actualizado correctamente.', 'success');
        await loadProfile(auth);

        // Sincronizar storage con nombre nuevo
        const stored = AuthGuard.getUser() || {};
        stored.nombre = data.usuario.nombre_usuario;
        const storage = localStorage.getItem('user') ? localStorage : sessionStorage;
        storage.setItem('user', JSON.stringify(stored));

    } catch {
        showAlert('Error de conexión.', 'error');
    } finally {
        btn.classList.remove('is-loading');
        btn.disabled = false;
    }
}

function showAlert(msg, type) {
    const el = document.getElementById('form-alert');
    el.textContent = msg;
    el.className   = `form-alert ${type}`;
    el.style.display = 'block';
    setTimeout(() => { el.style.display = 'none'; }, 4500);
}
