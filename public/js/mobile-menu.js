/* ============================================================
   SpeakSoft — Menú móvil compartido
   Inyecta una hamburguesa en el header que exista y togglea el
   nav como desplegable. En el reproductor de curso convierte el
   sidebar de módulos en un drawer deslizable.
   Sólo tiene efecto visible en móvil (la hamburguesa se muestra
   vía CSS con la media query de responsive.css).
   ============================================================ */
(function () {
    'use strict';

    function makeToggle(label) {
        var btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'nav-toggle has-nav';
        btn.setAttribute('aria-label', label || 'Menú');
        btn.setAttribute('aria-expanded', 'false');
        btn.innerHTML = '<i class="bi bi-list"></i>';
        return btn;
    }

    /* Header con nav desplegable (dashboard / admin) */
    function setupHeaderMenu(header, nav, mountPoint) {
        if (!header || !nav || header.querySelector('.nav-toggle')) return;
        var btn = makeToggle('Abrir menú de navegación');
        (mountPoint || header).insertBefore(btn, (mountPoint || header).firstChild);

        function close() {
            header.classList.remove('nav-open');
            btn.setAttribute('aria-expanded', 'false');
        }
        btn.addEventListener('click', function (e) {
            e.stopPropagation();
            var open = header.classList.toggle('nav-open');
            btn.setAttribute('aria-expanded', open ? 'true' : 'false');
        });
        /* cerrar al tocar un enlace del menú */
        nav.addEventListener('click', function (e) {
            if (e.target.closest('a')) close();
        });
        /* cerrar al tocar fuera del header */
        document.addEventListener('click', function (e) {
            if (header.classList.contains('nav-open') && !header.contains(e.target)) close();
        });
    }

    /* Reproductor de curso: sidebar como drawer */
    function setupPlayerDrawer() {
        var layout = document.querySelector('.player-layout');
        var topbarLeft = document.querySelector('.player-topbar .topbar-left');
        var sidebar = document.querySelector('.player-sidebar');
        if (!layout || !topbarLeft || !sidebar || topbarLeft.querySelector('.nav-toggle')) return;

        var btn = makeToggle('Abrir lista de módulos');
        topbarLeft.insertBefore(btn, topbarLeft.firstChild);

        var backdrop = document.createElement('div');
        backdrop.className = 'player-sidebar-backdrop';
        layout.appendChild(backdrop);

        function close() {
            layout.classList.remove('sidebar-open');
            btn.setAttribute('aria-expanded', 'false');
        }
        btn.addEventListener('click', function (e) {
            e.stopPropagation();
            var open = layout.classList.toggle('sidebar-open');
            btn.setAttribute('aria-expanded', open ? 'true' : 'false');
        });
        backdrop.addEventListener('click', close);
        /* cerrar al elegir una lección */
        sidebar.addEventListener('click', function (e) {
            if (e.target.closest('a, button, .lesson-item, [data-lesson], li')) close();
        });
    }

    function init() {
        /* Dashboard */
        var app = document.querySelector('.app-header');
        if (app) setupHeaderMenu(app, app.querySelector('.header-nav'), app.querySelector('.header-left'));

        /* Admin (nav inline dentro de .header-brand) */
        var adm = document.querySelector('.admin-header');
        if (adm) setupHeaderMenu(adm, adm.querySelector('.header-brand nav'), adm.querySelector('.header-brand'));

        /* Curso */
        setupPlayerDrawer();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
