class ClozeText {
    constructor(container, data, onComplete) {
        this.container  = container;
        this.data       = data;       // { texto: "My name {{is}} John..." }
        this.onComplete = onComplete;
        this.total      = 0;
        this.render();
    }

    render() {
        const { texto } = this.data;
        const parts  = texto.split(/(\{\{[^}]+\}\})/g);
        this.total   = parts.filter(p => /^\{\{.+\}\}$/.test(p)).length;

        let bi = 0;
        const textHtml = parts.map(part => {
            const m = part.match(/^\{\{(.+)\}\}$/);
            if (m) {
                const answer = m[1];
                const idx    = bi++;
                const len    = Math.max(answer.length + 2, 6);
                return `<input type="text" class="cloze-blank"
                    data-answer="${this._esc(answer.toLowerCase())}"
                    data-idx="${idx}"
                    size="${len}"
                    style="width:${len * 11}px"
                    autocomplete="off" spellcheck="false">`;
            }
            return `<span>${part.replace(/\n/g, '<br>')}</span>`;
        }).join('');

        this.container.innerHTML = `
            <div class="act-shell">
                <div class="act-shell-title">Completar el texto</div>
                <div class="act-progress-bar">
                    <div class="act-progress-fill" id="cloze-bar" style="width:0%"></div>
                </div>
                <div class="cloze-text">${textHtml}</div>
                <div class="cloze-stats">
                    <span class="cloze-count" id="cloze-ok">0</span>
                    <span>/ ${this.total} completos</span>
                </div>
            </div>`;

        this._bind();
    }

    _bind() {
        this.container.querySelectorAll('.cloze-blank').forEach(inp => {
            inp.addEventListener('input', () => this._check(inp));
            inp.addEventListener('keydown', e => {
                if (e.key === 'Enter') this._nextBlank(inp);
            });
        });
    }

    _check(inp) {
        const answer = inp.dataset.answer;
        const value  = inp.value.toLowerCase().trim();

        if (value === answer) {
            inp.classList.remove('cloze-blank--wrong');
            inp.classList.add('cloze-blank--correct');
            inp.disabled = true;
            inp.value    = inp.dataset.answer; // normalize casing display
            this._nextBlank(inp);
        } else if (value.length >= answer.length) {
            inp.classList.add('cloze-blank--wrong');
            inp.classList.remove('cloze-blank--correct');
        } else {
            inp.classList.remove('cloze-blank--wrong', 'cloze-blank--correct');
        }

        const ok  = this.container.querySelectorAll('.cloze-blank--correct').length;
        const pct = Math.round((ok / this.total) * 100);
        const bar = this.container.querySelector('#cloze-bar');
        const ctr = this.container.querySelector('#cloze-ok');
        if (bar) bar.style.width = pct + '%';
        if (ctr) ctr.textContent = ok;

        if (ok === this.total) {
            setTimeout(() => {
                const shell = this.container.querySelector('.act-shell');
                if (shell) shell.insertAdjacentHTML('beforeend',
                    `<div class="act-complete-banner">✅ ¡Completaste todos los blancos!</div>`);
                this.onComplete?.({ completada: true, puntaje: 100 });
            }, 400);
        }
    }

    _nextBlank(current) {
        const blanks = [...this.container.querySelectorAll('.cloze-blank:not(:disabled)')];
        if (blanks.length) blanks[0].focus();
    }

    _esc(s) {
        return String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    }
}
