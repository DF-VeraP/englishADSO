class PracticaAudioForm {
    constructor(container, data, onComplete) {
        this.container  = container;
        this.data       = data;  // { audio_url, transcripcion, campos:[{id,label,respuesta}] }
        this.onComplete = onComplete;
        this.audio      = null;
        this.playing    = false;
        this.render();
    }

    render() {
        const { audio_url, campos, transcripcion } = this.data;

        this.container.innerHTML = `
            ${audio_url ? `
            <div class="audio-player-card">
                <button class="audio-play-btn" id="paf-play">
                    <i class="bi bi-play-fill" id="paf-icon" style="font-size:20px"></i>
                </button>
                <div class="audio-info">
                    <div class="audio-title">Escuchar el audio</div>
                    <div class="audio-progress-bar" id="paf-bar">
                        <div class="audio-progress-fill" id="paf-fill" style="width:0%"></div>
                    </div>
                    <div class="audio-time" id="paf-time">0:00 / 0:00</div>
                </div>
                <button style="background:none;border:none;color:var(--text-muted);cursor:pointer;font-size:.8rem;white-space:nowrap" id="paf-restart">↩ Reiniciar</button>
            </div>` : `
            <div style="background:rgba(245,158,11,.1);border:1px solid rgba(245,158,11,.2);border-radius:12px;padding:.85rem 1rem;margin-bottom:1rem;font-size:.85rem;color:#fbbf24">
                ℹ️ Audio pendiente de configuración. Lee la transcripción:
                <br><em style="color:var(--text-muted)">${transcripcion || ''}</em>
            </div>`}

            <div class="practica-form-card">
                <div class="practica-form-title">📝 Completar con lo que escuchas</div>
                ${campos.map(f => `
                    <div class="practica-field">
                        <label class="practica-field-label">${f.label}</label>
                        <input type="text" class="practica-input" id="paf-inp-${f.id}"
                               placeholder="${f.placeholder || 'Escribe lo que escuchas...'}"
                               data-respuesta="${f.respuesta?.toLowerCase?.() || ''}"
                               autocomplete="off">
                    </div>`).join('')}
                <div id="paf-feedback" style="font-size:.85rem;min-height:22px"></div>
                <button class="practica-check-btn" id="paf-check">Verificar respuestas</button>
            </div>`;

        if (audio_url) this._initAudio(audio_url);
        this.container.querySelector('#paf-check').addEventListener('click', () => this._check(campos));
    }

    _initAudio(url) {
        this.audio = new Audio(url);
        const playBtn = this.container.querySelector('#paf-play');
        const fill    = this.container.querySelector('#paf-fill');
        const timeEl  = this.container.querySelector('#paf-time');
        const icon    = this.container.querySelector('#paf-icon');
        const restart = this.container.querySelector('#paf-restart');

        const fmt = s => `${Math.floor(s/60)}:${String(Math.floor(s%60)).padStart(2,'0')}`;

        this.audio.addEventListener('timeupdate', () => {
            const pct = (this.audio.currentTime / (this.audio.duration || 1)) * 100;
            fill.style.width = pct + '%';
            timeEl.textContent = `${fmt(this.audio.currentTime)} / ${fmt(this.audio.duration || 0)}`;
        });

        this.audio.addEventListener('ended', () => {
            this.playing = false;
            icon.innerHTML = '<polygon points="5 3 19 12 5 21 5 3"/>';
        });

        playBtn.addEventListener('click', () => {
            if (this.playing) {
                this.audio.pause();
                icon.innerHTML = '<polygon points="5 3 19 12 5 21 5 3"/>';
            } else {
                this.audio.play();
                icon.innerHTML = '<rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/>';
            }
            this.playing = !this.playing;
        });

        restart.addEventListener('click', () => {
            this.audio.currentTime = 0;
            this.audio.play();
            this.playing = true;
            icon.innerHTML = '<rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/>';
        });
    }

    _check(campos) {
        let correctas = 0;
        campos.forEach(f => {
            const inp = this.container.querySelector(`#paf-inp-${f.id}`);
            if (!inp) return;
            const val = inp.value.trim().toLowerCase().replace(/[^a-z0-9@.\-_ ]/g, '');
            const exp = (f.respuesta || '').toLowerCase().replace(/[^a-z0-9@.\-_ ]/g, '');
            const ok  = val === exp || val.includes(exp) || exp.includes(val);
            inp.classList.toggle('correct',   ok);
            inp.classList.toggle('incorrect', !ok);
            if (ok) correctas++;
        });
        const fb = this.container.querySelector('#paf-feedback');
        if (correctas === campos.length) {
            fb.innerHTML = '<span style="color:var(--success);font-weight:600">✅ ¡Correcto!</span>';
            this.onComplete?.({ correctas, total: campos.length, puntaje: 100 });
        } else {
            fb.innerHTML = `<span style="color:var(--warning)">⚠️ ${correctas}/${campos.length} correctas.</span>`;
        }
    }
}
