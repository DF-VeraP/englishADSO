(function () {
    const KEY = 'speaksoft-theme';

    const sunSVG  = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`;
    const moonSVG = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>`;

    function pageDefault() {
        return (document.body && document.body.dataset.themeDefault) || 'dark';
    }

    // Si la página pide dark por defecto, ignoramos cualquier preferencia 'light' guardada
    // para garantizar que el dashboard siempre se vea bien
    function resolveTheme() {
        const stored = localStorage.getItem(KEY);
        const defaultTheme = pageDefault();
        if (defaultTheme === 'dark' && stored === 'light') return 'dark';
        return stored || defaultTheme;
    }

    // Aplicar inmediatamente para evitar flash
    document.documentElement.dataset.theme = resolveTheme();

    function applyTheme(theme) {
        document.documentElement.dataset.theme = theme;
        const btn = document.getElementById('theme-toggle-btn');
        if (!btn) return;
        if (theme === 'dark') {
            btn.innerHTML = sunSVG;
            btn.title = 'Modo día';
            btn.setAttribute('aria-label', 'Cambiar a modo día');
        } else {
            btn.innerHTML = moonSVG;
            btn.title = 'Modo noche';
            btn.setAttribute('aria-label', 'Cambiar a modo noche');
        }
    }

    function toggle() {
        const current = document.documentElement.dataset.theme || resolveTheme();
        const next    = current === 'dark' ? 'light' : 'dark';
        localStorage.setItem(KEY, next);
        applyTheme(next);
    }

    function initButton() {
        const style = document.createElement('style');
        style.textContent = `
            #theme-toggle-btn {
                display: flex; align-items: center; justify-content: center;
                width: 34px; height: 34px;
                background: transparent; border: none; border-radius: 8px;
                cursor: pointer; opacity: .65; flex-shrink: 0;
                transition: opacity .2s, background .2s;
                color: rgba(255,255,255,.85);
            }
            #theme-toggle-btn:hover { opacity: 1; background: rgba(128,128,128,.15); }
        `;
        document.head.appendChild(style);

        const btn = document.createElement('button');
        btn.id = 'theme-toggle-btn';
        btn.addEventListener('click', toggle);

        const logout = document.getElementById('btn-logout');
        if (logout && logout.parentNode) {
            logout.parentNode.insertBefore(btn, logout);
        }

        applyTheme(resolveTheme());
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initButton);
    } else {
        initButton();
    }
})();
