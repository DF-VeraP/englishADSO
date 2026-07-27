class SentenceBuilder {
    constructor(container, data, onComplete) {
        this.container  = container;
        this.data       = data;    // { oraciones: ["I work in a company", ...] }
        this.onComplete = onComplete;
        this.current    = 0;
        this.correctas  = 0;
        this._show();
    }

    _show() {
        const { oraciones } = this.data;
        if (this.current >= oraciones.length) { this._complete(); return; }

        const sentence  = oraciones[this.current];
        const words     = sentence.trim().split(/\s+/);
        const shuffled  = this._shuffle([...words]);
        const total     = oraciones.length;

        this.container.innerHTML = `
            <div class="act-shell sb-shell">
                <div class="sb-counter">Oración ${this.current + 1} de ${total}</div>
                <div class="act-progress-bar">
                    <div class="act-progress-fill" style="width:${Math.round((this.current / total) * 100)}%"></div>
                </div>
                <div class="sb-instruction">Ordena las palabras para formar la oración correcta.</div>
                <div class="sb-answer-area" id="sb-answer"></div>
                <div class="sb-pool" id="sb-pool">
                    ${shuffled.map((w, i) =>
                        `<div class="sb-chip" data-word="${this._esc(w)}" data-oi="${i}">${this._esc(w)}</div>`
                    ).join('')}
                </div>
                <div class="sb-actions">
                    <button class="sb-btn sb-btn-clear" id="sb-clear">Limpiar</button>
                    <button class="sb-btn sb-btn-check" id="sb-check">Verificar</button>
                </div>
                <div class="sb-feedback" id="sb-feedback"></div>
            </div>`;

        this._bind(sentence, words.length);
    }

    _bind(correctSentence, wordCount) {
        const pool     = this.container.querySelector('#sb-pool');
        const answer   = this.container.querySelector('#sb-answer');
        const feedback = this.container.querySelector('#sb-feedback');

        // Click chip in pool → move to answer
        pool.addEventListener('click', e => {
            const chip = e.target.closest('.sb-chip');
            if (!chip || chip.classList.contains('sb-chip--used')) return;
            chip.classList.add('sb-chip--used');

            const placed = document.createElement('div');
            placed.className = 'sb-chip sb-chip--placed';
            placed.dataset.word = chip.dataset.word;
            placed.dataset.src  = chip.dataset.oi;
            placed.textContent  = chip.dataset.word;
            answer.appendChild(placed);

            // Click placed chip → return to pool
            placed.addEventListener('click', () => {
                const src = pool.querySelector(`[data-oi="${placed.dataset.src}"]`);
                if (src) src.classList.remove('sb-chip--used');
                placed.remove();
                if (feedback) feedback.innerHTML = '';
            });
        });

        // Clear button
        this.container.querySelector('#sb-clear')?.addEventListener('click', () => {
            answer.innerHTML = '';
            pool.querySelectorAll('.sb-chip').forEach(c => c.classList.remove('sb-chip--used'));
            if (feedback) feedback.innerHTML = '';
        });

        // Verify button
        this.container.querySelector('#sb-check')?.addEventListener('click', () => {
            const placed  = [...answer.querySelectorAll('.sb-chip--placed')];
            if (placed.length < wordCount) {
                feedback.innerHTML = '<span class="sb-wrong">Coloca todas las palabras primero.</span>';
                return;
            }
            const attempt = placed.map(c => c.dataset.word).join(' ');

            if (attempt === correctSentence) {
                feedback.innerHTML = '<span class="sb-correct">✅ ¡Correcto!</span>';
                this.correctas++;
                // Disable all chips
                pool.querySelectorAll('.sb-chip').forEach(c => { c.style.pointerEvents = 'none'; });
                answer.querySelectorAll('.sb-chip--placed').forEach(c => { c.style.pointerEvents = 'none'; c.style.borderColor = 'var(--success)'; c.style.color = 'var(--success)'; });
                setTimeout(() => { this.current++; this._show(); }, 1300);
            } else {
                feedback.innerHTML = '<span class="sb-wrong">✗ Ese no es el orden correcto. Intenta de nuevo.</span>';
                answer.classList.add('sb-shake');
                setTimeout(() => answer.classList.remove('sb-shake'), 400);
            }
        });
    }

    _complete() {
        const total = this.data.oraciones.length;
        const pct   = Math.round((this.correctas / total) * 100);
        this.container.innerHTML = `
            <div class="act-shell">
                <div class="sb-complete">
                    <div class="sb-complete-icon">🎉</div>
                    <div class="sb-complete-title">¡Completaste el ejercicio!</div>
                    <div class="sb-complete-score">${this.correctas} / ${total} oraciones correctas</div>
                </div>
            </div>`;
        this.onComplete?.({ completada: true, puntaje: pct });
    }

    _shuffle(arr) {
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        // Re-shuffle if identical to original (for single-word or already ordered)
        return arr;
    }

    _esc(s) {
        return String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    }
}
