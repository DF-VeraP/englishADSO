class WarmUpDrag {
    constructor(container, data, onComplete) {
        this.container  = container;
        this.data       = data;       // { instrucciones, items: [{id,emoji,texto}] }
        this.onComplete = onComplete;
        this.placed     = {};         // dropTargetId → sourceId
        this.draggedId  = null;
        this.completed  = false;
        this.render();
    }

    render() {
        const { items } = this.data;

        // Mezclar ítems para los targets (sin mostrar la respuesta en orden)
        const shuffledItems = [...items].sort(() => Math.random() - .5);

        this.container.innerHTML = `
            <div class="warmup-grid" id="wud-sources">
                ${shuffledItems.map(item => `
                    <div class="drag-source" draggable="true" data-id="${item.id}">
                        <span class="drag-emoji">${item.emoji}</span>
                        <span class="drag-label">Arrastra aquí</span>
                    </div>`).join('')}
            </div>
            <div class="drop-targets" id="wud-targets">
                ${items.map(item => `
                    <div class="drop-target" data-target="${item.id}">
                        <div class="dropped-item" id="dropped-${item.id}"></div>
                        <div class="drop-target-label">${item.texto}</div>
                    </div>`).join('')}
            </div>
            <div id="wud-feedback" style="margin-top:1rem;font-size:.88rem;color:var(--text-muted);min-height:24px"></div>
            <button id="wud-check" class="practica-check-btn" style="margin-top:1rem" disabled>
                Verificar respuestas
            </button>`;

        this._bindEvents();
    }

    _bindEvents() {
        const sources = this.container.querySelectorAll('.drag-source');
        const targets = this.container.querySelectorAll('.drop-target');
        const checkBtn = this.container.querySelector('#wud-check');

        sources.forEach(src => {
            src.addEventListener('dragstart', e => {
                this.draggedId = src.dataset.id;
                src.classList.add('dragging');
                e.dataTransfer.effectAllowed = 'move';
            });
            src.addEventListener('dragend', () => src.classList.remove('dragging'));
        });

        targets.forEach(tgt => {
            tgt.addEventListener('dragover', e => { e.preventDefault(); tgt.classList.add('drag-over'); });
            tgt.addEventListener('dragleave', () => tgt.classList.remove('drag-over'));
            tgt.addEventListener('drop', e => {
                e.preventDefault();
                tgt.classList.remove('drag-over');
                if (!this.draggedId) return;

                const targetId = tgt.dataset.target;
                const src = this.container.querySelector(`[data-id="${this.draggedId}"]`);
                const dropEl = tgt.querySelector('.dropped-item');
                const emojiEl = src?.querySelector('.drag-emoji');

                // Si ya hay algo en el target, devolver al origen
                if (this.placed[targetId]) {
                    const prevId = this.placed[targetId];
                    const prevSrc = this.container.querySelector(`[data-id="${prevId}"]`);
                    if (prevSrc) prevSrc.style.visibility = 'visible';
                    delete this.placed[targetId];
                }

                dropEl.textContent = emojiEl?.textContent || '';
                if (src) src.style.visibility = 'hidden';
                this.placed[targetId] = this.draggedId;
                this.draggedId = null;

                // Habilitar check si todos colocados
                const totalTargets = this.container.querySelectorAll('.drop-target').length;
                checkBtn.disabled = Object.keys(this.placed).length < totalTargets;
            });
        });

        checkBtn.addEventListener('click', () => this._check());
    }

    _check() {
        const { items } = this.data;
        let allCorrect = true;

        items.forEach(item => {
            const tgt = this.container.querySelector(`[data-target="${item.id}"]`);
            const placed = this.placed[item.id];
            if (placed === item.id) {
                tgt.classList.add('correct');
                tgt.classList.remove('incorrect');
            } else {
                tgt.classList.add('incorrect');
                tgt.classList.remove('correct');
                allCorrect = false;
            }
        });

        const fb = this.container.querySelector('#wud-feedback');
        if (allCorrect) {
            fb.innerHTML = '<span style="color:var(--success);font-weight:600">✅ ¡Perfecto! Todas las respuestas son correctas.</span>';
            this.completed = true;
            this.onComplete?.({ correctas: items.length, total: items.length });
        } else {
            fb.innerHTML = '<span style="color:var(--warning)">⚠️ Algunas respuestas no son correctas. Inténtalo de nuevo.</span>';
            // Devolver incorrectos
            items.forEach(item => {
                const tgt = this.container.querySelector(`[data-target="${item.id}"]`);
                if (tgt.classList.contains('incorrect')) {
                    const placedId = this.placed[item.id];
                    const src = this.container.querySelector(`[data-id="${placedId}"]`);
                    if (src) src.style.visibility = 'visible';
                    tgt.querySelector('.dropped-item').textContent = '';
                    delete this.placed[item.id];
                    tgt.classList.remove('incorrect');
                }
            });
            this.container.querySelector('#wud-check').disabled = true;
        }
    }
}
