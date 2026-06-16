class FlashcardVocab {
    constructor(container, data, onComplete) {
        this.container  = container;
        this.data       = data;  // { instrucciones, cards:[{frente,reverso,emoji,audio}] }
        this.onComplete = onComplete;
        this.flipped    = new Set();
        this.render();
    }

    render() {
        const { cards } = this.data;

        this.container.innerHTML = `
            <div class="flashcard-grid" id="fc-grid">
                ${cards.map((c, i) => `
                    <div class="flashcard-wrap" data-idx="${i}">
                        <div class="flashcard-inner">
                            <div class="flashcard-front">
                                <span style="font-size:2.2rem">${c.emoji || '📝'}</span>
                                <div class="flashcard-front-label">${c.frente}</div>
                            </div>
                            <div class="flashcard-back">
                                <div class="flashcard-back-word">${c.frente}</div>
                                <div class="flashcard-back-trans">${c.reverso}</div>
                                ${c.audio ? `
                                    <button class="flashcard-audio-btn" data-audio="${c.audio}" title="Escuchar pronunciación">
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                                            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
                                            <path d="M15.54 8.46a5 5 0 010 7.07"/><path d="M19.07 4.93a10 10 0 010 14.14"/>
                                        </svg>
                                    </button>` : ''}
                            </div>
                        </div>
                    </div>`).join('')}
            </div>
            <p class="flashcard-hint">👆 Haz clic en cada tarjeta para voltearla y ver la traducción</p>
            <div id="fc-counter" style="text-align:center;font-size:.82rem;color:var(--text-muted);margin-top:.75rem">
                0 / ${cards.length} tarjetas exploradas
            </div>`;

        this._bindEvents(cards);
    }

    _bindEvents(cards) {
        const grid    = this.container.querySelector('#fc-grid');
        const counter = this.container.querySelector('#fc-counter');

        grid.querySelectorAll('.flashcard-wrap').forEach(card => {
            card.addEventListener('click', e => {
                // No propagar al botón de audio
                if (e.target.closest('.flashcard-audio-btn')) return;
                card.classList.toggle('flipped');
                this.flipped.add(card.dataset.idx);
                counter.textContent = `${this.flipped.size} / ${cards.length} tarjetas exploradas`;

                if (this.flipped.size === cards.length) {
                    counter.innerHTML = '<span style="color:var(--success)">✅ ¡Completaste todas las tarjetas!</span>';
                    this.onComplete?.({ completada: true });
                }
            });
        });

        // Botones de audio
        grid.querySelectorAll('.flashcard-audio-btn').forEach(btn => {
            btn.addEventListener('click', e => {
                e.stopPropagation();
                const audio = new Audio(btn.dataset.audio);
                audio.play().catch(() => {});
            });
        });
    }
}
