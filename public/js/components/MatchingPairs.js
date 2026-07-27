class MatchingPairs {
    constructor(container, data, onComplete) {
        this.container  = container;
        this.data       = data;       // { pares: [{izquierda, derecha}] }
        this.onComplete = onComplete;
        this.selected   = null;       // idx of selected left item
        this.matched    = new Set();
        this.render();
    }

    render() {
        const { pares } = this.data;
        const left  = this._shuffle(pares.map((p, i) => ({ ...p, idx: i })));
        const right = this._shuffle(pares.map((p, i) => ({ ...p, idx: i })));

        this.container.innerHTML = `
            <div class="act-shell">
                <div class="act-shell-title">Emparejar</div>
                <div class="act-progress-bar">
                    <div class="act-progress-fill" id="mp-bar" style="width:0%"></div>
                </div>
                <div class="matching-grid">
                    <div class="matching-col" id="mp-left">
                        ${left.map(p => `
                            <div class="matching-item" data-idx="${p.idx}" data-side="left">
                                ${this._esc(p.izquierda)}
                            </div>`).join('')}
                    </div>
                    <div class="matching-divider">
                        ${pares.map(() => '<span>·</span>').join('')}
                    </div>
                    <div class="matching-col" id="mp-right">
                        ${right.map(p => `
                            <div class="matching-item" data-idx="${p.idx}" data-side="right">
                                ${this._esc(p.derecha)}
                            </div>`).join('')}
                    </div>
                </div>
                <div class="matching-progress" id="mp-progress">
                    0 / ${pares.length} pares encontrados
                </div>
            </div>`;

        this._bind(pares.length);
    }

    _bind(total) {
        const leftItems  = this.container.querySelectorAll('[data-side="left"]');
        const rightItems = this.container.querySelectorAll('[data-side="right"]');

        leftItems.forEach(item => {
            item.addEventListener('click', () => {
                if (item.classList.contains('matching-matched')) return;
                this.container.querySelectorAll('[data-side="left"].matching-item--selected')
                    .forEach(el => el.classList.remove('matching-item--selected'));
                item.classList.add('matching-item--selected');
                this.selected = Number(item.dataset.idx);
            });
        });

        rightItems.forEach(item => {
            item.addEventListener('click', () => {
                if (item.classList.contains('matching-matched')) return;
                if (this.selected === null) return;

                const rightIdx = Number(item.dataset.idx);
                const leftEl   = this.container.querySelector(`[data-side="left"][data-idx="${this.selected}"]`);

                if (this.selected === rightIdx) {
                    // ✓ Correct
                    leftEl?.classList.add('matching-matched');
                    leftEl?.classList.remove('matching-item--selected');
                    item.classList.add('matching-matched');
                    this.matched.add(this.selected);
                    this.selected = null;

                    const pct = Math.round((this.matched.size / total) * 100);
                    const bar = this.container.querySelector('#mp-bar');
                    const prg = this.container.querySelector('#mp-progress');
                    if (bar) bar.style.width = pct + '%';
                    if (prg) prg.textContent = `${this.matched.size} / ${total} pares encontrados`;

                    if (this.matched.size === total) {
                        if (prg) prg.innerHTML = '<span style="color:var(--success)">✅ ¡Todos los pares encontrados!</span>';
                        const shell = this.container.querySelector('.act-shell');
                        if (shell) shell.insertAdjacentHTML('beforeend',
                            `<div class="act-complete-banner">🎉 ¡Actividad completada!</div>`);
                        setTimeout(() => this.onComplete?.({ completada: true, puntaje: 100 }), 600);
                    }
                } else {
                    // ✗ Wrong
                    const flash = (el) => {
                        el?.classList.add('matching-item--wrong');
                        setTimeout(() => el?.classList.remove('matching-item--wrong', 'matching-item--selected'), 550);
                    };
                    flash(item);
                    flash(leftEl);
                    this.selected = null;
                }
            });
        });
    }

    _shuffle(arr) {
        const a = [...arr];
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    }

    _esc(s) {
        return String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    }
}
