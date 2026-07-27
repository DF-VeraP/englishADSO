class DesafioAudio {
    constructor(container, data, onComplete) {
        this.container    = container;
        this.data         = data;  // { misiones:[], ejemplo, max_seconds:60 }
        this.onComplete   = onComplete;
        this.mediaRecorder = null;
        this.chunks        = [];
        this.recording     = false;
        this.blobURL       = null;
        this.elapsed       = 0;
        this.timerInterval = null;
        this.render();
    }

    render() {
        const { misiones, ejemplo, max_seconds = 60, titulo } = this.data;

        this.container.innerHTML = `
            <div class="desafio-missions">
                ${misiones.map((m, i) => `
                    <div class="desafio-mission">
                        <div class="desafio-mission-num">${i + 1}</div>
                        <div class="desafio-mission-text">${m}</div>
                    </div>`).join('')}
            </div>
            ${ejemplo ? `<div class="desafio-example">💬 Ejemplo: <em>${ejemplo}</em></div>` : ''}

            <div class="recorder-area">
                <button class="btn-record" id="da-btn-rec" title="${titulo || 'Grabar audio'}">
                    <i class="bi bi-mic-fill" style="font-size:28px;color:white"></i>
                </button>
                <div class="recorder-status" id="da-status">Pulsa para grabar tu respuesta</div>
                <div class="recorder-timer" id="da-timer" style="display:none">0:00 / ${this._fmt(max_seconds)}</div>
                <div class="recorder-playback" id="da-playback" style="display:none"></div>
            </div>

            <div id="da-feedback" style="margin-top:1rem;font-size:.88rem;min-height:22px"></div>
            <button class="practica-check-btn" id="da-submit" style="display:none;margin-top:.75rem">
                ✅ Enviar grabación
            </button>`;

        this.container.querySelector('#da-btn-rec').addEventListener('click', () => {
            this.recording ? this._stop() : this._start(max_seconds);
        });

        this.container.querySelector('#da-submit').addEventListener('click', () => {
            this.container.querySelector('#da-feedback').innerHTML =
                '<span style="color:var(--success);font-weight:600">✅ ¡Grabación enviada correctamente!</span>';
            this.onComplete?.({ completada: true, puntaje: 100 });
            this.container.querySelector('#da-submit').disabled = true;
        });
    }

    async _start(maxSeconds) {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            this.mediaRecorder = new MediaRecorder(stream);
            this.chunks = [];

            this.mediaRecorder.ondataavailable = e => this.chunks.push(e.data);
            this.mediaRecorder.onstop = () => this._onStop(stream);

            this.mediaRecorder.start();
            this.recording = true;

            const btn    = this.container.querySelector('#da-btn-rec');
            const status = this.container.querySelector('#da-status');
            const timer  = this.container.querySelector('#da-timer');

            btn.classList.add('recording');
            btn.title = 'Detener grabación';
            status.innerHTML = '<span style="color:var(--danger)">● Grabando...</span>';
            timer.style.display = 'block';

            this.elapsed = 0;
            this.timerInterval = setInterval(() => {
                this.elapsed++;
                timer.textContent = `${this._fmt(this.elapsed)} / ${this._fmt(maxSeconds)}`;
                if (this.elapsed >= maxSeconds) this._stop();
            }, 1000);

        } catch {
            this.container.querySelector('#da-status').innerHTML =
                '<span style="color:var(--danger)">⚠️ No se pudo acceder al micrófono. Permite el permiso en tu navegador.</span>';
        }
    }

    _stop() {
        if (this.mediaRecorder?.state !== 'inactive') this.mediaRecorder?.stop();
        clearInterval(this.timerInterval);
        this.recording = false;
        const btn = this.container.querySelector('#da-btn-rec');
        btn.classList.remove('recording');
    }

    _onStop(stream) {
        stream.getTracks().forEach(t => t.stop());
        const blob = new Blob(this.chunks, { type: 'audio/webm' });
        this.blobURL = URL.createObjectURL(blob);

        const pb = this.container.querySelector('#da-playback');
        pb.style.display = 'flex';
        pb.innerHTML = `
            <audio controls src="${this.blobURL}" style="width:100%;border-radius:8px;margin-top:.5rem"></audio>`;

        this.container.querySelector('#da-status').textContent = 'Reproducción — revisa tu audio';
        this.container.querySelector('#da-submit').style.display = 'inline-flex';
    }

    _fmt(s) {
        return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
    }
}
