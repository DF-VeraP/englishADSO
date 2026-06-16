class QuizMultiple {
    constructor(container, data, onComplete) {
        this.container    = container;
        this.data         = data;  // { preguntas:[{pregunta,opciones,correcta,explicacion}], minimo_aprobacion, insignia:{tipo,nombre,descripcion,emoji} }
        this.onComplete   = onComplete;
        this.current      = 0;
        this.correctas    = 0;
        this.answered     = false;
        this.render();
    }

    render() {
        this.container.innerHTML = `
            <div class="quiz-progress-bar">
                <div class="quiz-progress-fill" id="qm-bar" style="width:0%"></div>
            </div>
            <div class="quiz-counter" id="qm-counter"></div>
            <div id="qm-body"></div>`;

        this._showQuestion();
    }

    _showQuestion() {
        const { preguntas } = this.data;
        if (this.current >= preguntas.length) { this._showResult(); return; }

        const q   = preguntas[this.current];
        const pct = (this.current / preguntas.length) * 100;
        this.answered = false;

        this.container.querySelector('#qm-bar').style.width = pct + '%';
        this.container.querySelector('#qm-counter').textContent =
            `Pregunta ${this.current + 1} de ${preguntas.length}`;

        const letters = ['A', 'B', 'C', 'D'];
        this.container.querySelector('#qm-body').innerHTML = `
            <p class="quiz-question">${q.pregunta}</p>
            <div class="quiz-options">
                ${q.opciones.map((o, i) => `
                    <button class="quiz-option" data-idx="${i}">
                        <span class="quiz-option-letter">${letters[i]}</span>
                        ${o}
                    </button>`).join('')}
            </div>
            <div id="qm-explanation" style="display:none" class="quiz-explanation"></div>
            <button id="qm-next" class="quiz-btn" style="display:none">
                ${this.current + 1 < preguntas.length ? 'Siguiente →' : 'Ver resultados'}
            </button>`;

        this.container.querySelectorAll('.quiz-option').forEach(btn => {
            btn.addEventListener('click', () => this._selectAnswer(btn, q));
        });
    }

    _selectAnswer(btn, q) {
        if (this.answered) return;
        this.answered = true;
        const selected = parseInt(btn.dataset.idx);
        const correct  = q.correcta;

        this.container.querySelectorAll('.quiz-option').forEach((b, i) => {
            b.disabled = true;
            if (i === correct) b.classList.add('correct');
            else if (i === selected && selected !== correct) b.classList.add('incorrect');
        });

        if (selected === correct) this.correctas++;

        if (q.explicacion) {
            const expl = this.container.querySelector('#qm-explanation');
            expl.style.display = 'block';
            expl.textContent = '💡 ' + q.explicacion;
        }

        this.container.querySelector('#qm-next').style.display = 'inline-flex';
        this.container.querySelector('#qm-next').addEventListener('click', () => {
            this.current++;
            this._showQuestion();
        }, { once: true });
    }

    _showResult() {
        const { preguntas, minimo_aprobacion = 70, insignia } = this.data;
        const total   = preguntas.length;
        const puntaje = Math.round((this.correctas / total) * 100);
        const aprobado = puntaje >= minimo_aprobacion;

        this.container.querySelector('#qm-bar').style.width = '100%';

        this.container.querySelector('#qm-body').innerHTML = `
            <div class="quiz-result">
                <div class="quiz-score-circle" style="${aprobado ? '' : 'border-color:var(--danger);background:rgba(239,68,68,.1)'}">
                    <div class="quiz-score-num" style="${aprobado ? '' : 'color:var(--danger)'}">${puntaje}%</div>
                    <div class="quiz-score-label">${this.correctas}/${total}</div>
                </div>
                <div class="quiz-result-title">${aprobado ? '🎉 ¡Aprobado!' : '😕 Inténtalo de nuevo'}</div>
                <div class="quiz-result-sub">${aprobado
                    ? `¡Excelente! Respondiste correctamente ${this.correctas} de ${total} preguntas.`
                    : `Necesitas al menos ${minimo_aprobacion}% para aprobar. Revisa el material y vuelve a intentarlo.`}</div>
                ${aprobado && insignia ? `
                    <div class="badge-awarded">
                        <div class="badge-emoji">${insignia.emoji || '🏅'}</div>
                        <div class="badge-name">${insignia.nombre}</div>
                        <div class="badge-desc">${insignia.descripcion || ''}</div>
                    </div>` : ''}
                ${!aprobado ? `
                    <button class="quiz-btn" id="qm-retry">🔄 Intentar de nuevo</button>` : ''}
            </div>`;

        if (aprobado) {
            this._lanzarConfeti();
            this.onComplete?.({ puntaje, correctas: this.correctas, total, aprobado: true, insignia });
        } else {
            this.container.querySelector('#qm-retry')?.addEventListener('click', () => {
                this.current  = 0;
                this.correctas = 0;
                this.render();
            });
            this.onComplete?.({ puntaje, correctas: this.correctas, total, aprobado: false });
        }
    }

    _lanzarConfeti() {
        const canvas = document.getElementById('confetti-canvas');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        canvas.width  = window.innerWidth;
        canvas.height = window.innerHeight;

        const colors = ['#06b6d4','#3b82f6','#10b981','#f59e0b','#ec4899','#a855f7'];
        const pieces = Array.from({ length: 120 }, () => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height - canvas.height,
            r: Math.random() * 7 + 4,
            d: Math.random() * 80 + 30,
            color: colors[Math.floor(Math.random() * colors.length)],
            tilt: Math.floor(Math.random() * 10) - 10,
            tiltAngleIncremental: (Math.random() * 0.07) + .05,
            tiltAngle: 0,
        }));

        let angle = 0;
        let frame;
        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            angle += 0.01;
            pieces.forEach(p => {
                p.tiltAngle += p.tiltAngleIncremental;
                p.y += (Math.cos(angle + p.d) + 1 + p.r / 2) * 1.2;
                p.x += Math.sin(angle) * 2;
                p.tilt = Math.sin(p.tiltAngle) * 12;
                ctx.beginPath();
                ctx.lineWidth = p.r / 2;
                ctx.strokeStyle = p.color;
                ctx.moveTo(p.x + p.tilt + p.r / 4, p.y);
                ctx.lineTo(p.x + p.tilt, p.y + p.tilt + p.r / 4);
                ctx.stroke();
            });
            if (pieces.some(p => p.y < canvas.height + 20)) {
                frame = requestAnimationFrame(draw);
            } else {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
            }
        };
        draw();
        setTimeout(() => { cancelAnimationFrame(frame); ctx.clearRect(0, 0, canvas.width, canvas.height); }, 5000);
    }
}
