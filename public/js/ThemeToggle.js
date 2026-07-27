(function () {
    const KEY = 'speaksoft-theme';

    const sunSVG  = `<i class="bi bi-sun-fill" style="font-size:18px"></i>`;
    const moonSVG = `<i class="bi bi-moon-fill" style="font-size:18px"></i>`;

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
