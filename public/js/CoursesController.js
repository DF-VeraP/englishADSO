AuthGuard.requireAuth(['admin', 'instructor']);

const svc    = new CoursesService();
const user   = AuthGuard.getUser();
const isAdmin = user?.rol === 'admin';

// ── DOM refs ──────────────────────────────────────────────────────────────────
const tbody       = document.getElementById('courses-tbody');
const tableState  = document.getElementById('table-state');
const searchInput = document.getElementById('search');
const filterNivel = document.getElementById('filter-nivel');
const filterState = document.getElementById('filter-estado');
const btnNew      = document.getElementById('btn-new-course');

// Header user info
document.getElementById('user-email').textContent = user?.nombre || user?.email || '';
document.getElementById('btn-logout').addEventListener('click', () => AuthGuard.logout());

// Hide create button for non-admins
if (!isAdmin && btnNew) btnNew.style.display = 'none';

// ── State ─────────────────────────────────────────────────────────────────────
let allCourses = [];
let instructors = [];

// ── Load ──────────────────────────────────────────────────────────────────────
async function loadCourses() {
    tableState.style.display = 'flex';
    tbody.innerHTML = '';
    try {
        allCourses = await svc.list();
        if (isAdmin) instructors = await svc.getInstructors();
        render(allCourses);
    } catch (err) {
        tableState.innerHTML = `<p style="color:var(--danger)">Error: ${err.message}</p>`;
    }
}

function render(list) {
    tableState.style.display = list.length ? 'none' : 'flex';
    if (!list.length) { tableState.innerHTML = '<p>No hay cursos registrados.</p>'; return; }

    tbody.innerHTML = list.map(c => `
        <tr>
            <td><strong>#${c.id}</strong></td>
            <td>
                <div style="font-weight:600">${esc(c.titulo)}</div>
                ${c.descripcion ? `<div style="font-size:.8rem;color:var(--text-muted);margin-top:2px">${esc(c.descripcion.slice(0, 60))}${c.descripcion.length > 60 ? '…' : ''}</div>` : ''}
            </td>
            <td><span class="nivel-badge nivel-${c.nivel}">${c.nivel}</span></td>
            <td>${c.instructor ? `<div style="font-size:.85rem">${esc(c.instructor.nombre_usuario || c.instructor.correo_usuario)}</div>` : '<span style="color:var(--text-muted)">—</span>'}</td>
            <td>
                <span class="status-dot ${c.estado ? 'active' : 'inactive'}"></span>
                ${c.estado ? 'Activo' : 'Inactivo'}
            </td>
            <td>
                <span style="font-size:.82rem;color:var(--text-muted)">${c._count?.modulos ?? 0} módulos · ${c._count?.inscripciones ?? 0} inscritos</span>
            </td>
            <td class="actions-cell">
                <button class="btn-action btn-edit" data-id="${c.id}" title="Editar">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                </button>
                ${isAdmin ? `
                <button class="btn-action btn-delete" data-id="${c.id}" data-name="${esc(c.titulo)}" title="Eliminar">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2"/></svg>
                </button>` : ''}
            </td>
        </tr>`).join('');

    tbody.querySelectorAll('.btn-edit').forEach(b =>
        b.addEventListener('click', () => openEdit(Number(b.dataset.id))));
    if (isAdmin) tbody.querySelectorAll('.btn-delete').forEach(b =>
        b.addEventListener('click', () => openDelete(Number(b.dataset.id), b.dataset.name)));
}

// ── Filters ───────────────────────────────────────────────────────────────────
function applyFilters() {
    const q  = searchInput.value.toLowerCase();
    const nv = filterNivel.value;
    const st = filterState.value;
    render(allCourses.filter(c => {
        const matchQ = !q || c.titulo.toLowerCase().includes(q) || (c.descripcion || '').toLowerCase().includes(q);
        const matchN = !nv || c.nivel === nv;
        const matchS = st === '' || String(c.estado) === st;
        return matchQ && matchN && matchS;
    }));
}

searchInput.addEventListener('input', applyFilters);
filterNivel.addEventListener('change', applyFilters);
filterState.addEventListener('change', applyFilters);

// ── Modal crear/editar ────────────────────────────────────────────────────────
const modal        = document.getElementById('modal-course');
const modalTitle   = document.getElementById('modal-title');
const form         = document.getElementById('form-course');
const inputTitulo  = document.getElementById('input-titulo');
const inputDesc    = document.getElementById('input-desc');
const inputNivel   = document.getElementById('input-nivel');
const instrSelect  = document.getElementById('input-instructor');
const instrGroup   = document.getElementById('instructor-group');
const statusGroup  = document.getElementById('status-group');
const inputStatus  = document.getElementById('input-status');
const btnSave      = document.getElementById('btn-save');

let editingId = null;

function openModal() { modal.classList.add('open'); inputTitulo.focus(); }
function closeModal() {
    modal.classList.remove('open');
    form.reset(); editingId = null;
    statusGroup.style.display = 'none';
    document.getElementById('error-titulo').textContent = '';
}

if (btnNew) btnNew.addEventListener('click', () => {
    modalTitle.textContent = 'Nuevo Curso';
    btnSave.textContent = 'Crear Curso';
    statusGroup.style.display = 'none';
    populateInstructors();
    openModal();
});

document.getElementById('btn-close-modal').addEventListener('click', closeModal);
document.getElementById('btn-cancel-modal').addEventListener('click', closeModal);
modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });

function populateInstructors(selectedId = null) {
    instrGroup.style.display = isAdmin ? '' : 'none';
    if (!isAdmin) return;
    instrSelect.innerHTML = '<option value="">Seleccionar instructor…</option>' +
        instructors.map(i =>
            `<option value="${i.id}" ${i.id === selectedId ? 'selected' : ''}>${esc(i.nombre_usuario || i.correo_usuario)}</option>`
        ).join('');
}

async function openEdit(id) {
    editingId = id;
    modalTitle.textContent = 'Editar Curso';
    btnSave.textContent = 'Guardar Cambios';
    statusGroup.style.display = '';
    try {
        const c = await svc.getById(id);
        inputTitulo.value = c.titulo;
        inputDesc.value   = c.descripcion || '';
        inputNivel.value  = c.nivel;
        inputStatus.checked = c.estado;
        populateInstructors(c.instructorId);
        openModal();
    } catch (err) { showToast(err.message, 'error'); }
}

form.addEventListener('submit', async e => {
    e.preventDefault();
    const titulo = inputTitulo.value.trim();
    const errTitulo = document.getElementById('error-titulo');
    errTitulo.textContent = '';

    if (!titulo) { errTitulo.textContent = 'El título es obligatorio'; inputTitulo.focus(); return; }

    const data = {
        titulo,
        descripcion: inputDesc.value.trim() || undefined,
        nivel:       inputNivel.value,
    };
    if (isAdmin && instrSelect.value) data.instructorId = Number(instrSelect.value);
    if (editingId) data.estado = inputStatus.checked;

    btnSave.disabled = true;
    btnSave.textContent = 'Guardando…';
    try {
        if (editingId) await svc.update(editingId, data);
        else           await svc.create(data);
        closeModal();
        showToast(editingId ? 'Curso actualizado' : 'Curso creado', 'success');
        loadCourses();
    } catch (err) {
        showToast(err.message, 'error');
    } finally {
        btnSave.disabled = false;
        btnSave.textContent = editingId ? 'Guardar Cambios' : 'Crear Curso';
    }
});

// ── Modal eliminar ────────────────────────────────────────────────────────────
const modalDelete     = document.getElementById('modal-delete');
const deleteCourseName = document.getElementById('delete-course-name');
let deletingId = null;

function openDelete(id, name) {
    deletingId = id;
    deleteCourseName.textContent = name;
    modalDelete.classList.add('open');
}

document.querySelectorAll('#btn-cancel-delete').forEach(b =>
    b.addEventListener('click', () => { modalDelete.classList.remove('open'); deletingId = null; }));

document.getElementById('btn-confirm-delete').addEventListener('click', async () => {
    if (!deletingId) return;
    try {
        await svc.remove(deletingId);
        modalDelete.classList.remove('active');
        showToast('Curso eliminado', 'success');
        loadCourses();
    } catch (err) { showToast(err.message, 'error'); }
    deletingId = null;
});

// ── Toast ─────────────────────────────────────────────────────────────────────
function showToast(msg, type = 'info') {
    const tc = document.getElementById('toast-container');
    const t  = document.createElement('div');
    t.className = `toast toast-${type}`;
    t.textContent = msg;
    tc.appendChild(t);
    setTimeout(() => t.classList.add('show'), 10);
    setTimeout(() => { t.classList.remove('show'); setTimeout(() => t.remove(), 300); }, 3500);
}

// ── Helpers ───────────────────────────────────────────────────────────────────
function esc(str) {
    return String(str ?? '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

// ── Init ──────────────────────────────────────────────────────────────────────
loadCourses();
