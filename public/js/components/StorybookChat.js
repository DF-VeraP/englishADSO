class StorybookChat {
    constructor(container, data, onComplete) {
        this.container  = container;
        this.data       = data;  // { escena, personajes:{A:{nombre,color},B:...}, mensajes:[{personaje,texto}] }
        this.onComplete = onComplete;
        this.current    = 0;
        this.render();
    }

    render() {
        const { escena, personajes, mensajes } = this.data;

        this.container.innerHTML = `
            <div class="storybook-escena">📖 ${escena}</div>
            <div class="chat-messages" id="sb-messages"></div>
            <div style="margin-top:1rem;display:flex;justify-content:center">
                <button id="sb-next" class="quiz-btn" style="display:${mensajes.length > 0 ? 'inline-flex' : 'none'}">
                    ▶ Siguiente línea
                </button>
            </div>`;

        this.messagesEl = this.container.querySelector('#sb-messages');
        this.nextBtn    = this.container.querySelector('#sb-next');
        this.mensajes   = mensajes;
        this.personajes = personajes;

        this.nextBtn.addEventListener('click', () => this._showNext());
        // Mostrar primer mensaje automáticamente
        this._showNext();
    }

    _showNext() {
        if (this.current >= this.mensajes.length) return;

        const msg  = this.mensajes[this.current];
        const key  = msg.personaje;  // "A" | "B"
        const info = this.personajes[key] || { nombre: key, color: '#3b82f6' };
        const side = this.current % 2 === 0 ? 'left' : 'right';

        const initials = info.nombre.slice(0, 2).toUpperCase();

        const el = document.createElement('div');
        el.className = `chat-msg ${side}`;
        el.innerHTML = `
            <div class="chat-avatar" style="background:${info.color}">${initials}</div>
            <div class="chat-bubble-wrap">
                <div class="chat-name">${info.nombre}</div>
                <div class="chat-bubble" style="${side === 'right' ? `background:${info.color}` : ''}">${msg.texto}</div>
            </div>`;
        this.messagesEl.appendChild(el);
        this.messagesEl.scrollTop = this.messagesEl.scrollHeight;

        this.current++;

        if (this.current >= this.mensajes.length) {
            this.nextBtn.textContent = '✅ Listo';
            this.nextBtn.style.background = 'var(--success)';
            this.nextBtn.addEventListener('click', () => {
                this.onComplete?.({ completada: true });
            }, { once: true });
        }
    }
}
