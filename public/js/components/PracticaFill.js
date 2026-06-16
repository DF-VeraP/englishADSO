class PracticaFill {
    constructor(container, data, onComplete) {
        this.container  = container;
        this.data       = data;  // { tipo, campos:[{id,label,placeholder,respuesta}] }
        this.onComplete = onComplete;
        this.render();
    }

    render() {
        const { tipo, campos, formTitle } = this.data;

        const title = formTitle || (tipo === 'id_card' ? '🪪 Patient ID Card' :
                      tipo === 'nursing_notes' ? '📋 Nursing Notes' :
                      tipo === 'discharge'      ? '📄 Discharge Summary' : '📝 Formulario');

        this.container.innerHTML = `
            <div class="practica-form-card">
                <div class="practica-form-title">${title}</div>
                ${campos.map(f => `
                    <div class="practica-field" id="field-${f.id}">
                        <label class="practica-field-label">${f.label}</label>
                        <input type="text" class="practica-input" id="inp-${f.id}"
                               placeholder="${f.placeholder}" autocomplete="off"
                               data-respuesta="${f.respuesta?.toLowerCase?.() || ''}">
                    </div>`).join('')}
                <div id="pf-feedback" style="font-size:.85rem;min-height:22px"></div>
                <button class="practica-check-btn" id="pf-check">Verificar</button>
            </div>`;

        this.container.querySelector('#pf-check').addEventListener('click', () => this._check(campos));
    }

    _check(campos) {
        let correctas = 0;
        campos.forEach(f => {
            const inp = this.container.querySelector(`#inp-${f.id}`);
            if (!inp) return;
            const val = inp.value.trim().toLowerCase();
            const ok  = val === f.respuesta?.toLowerCase?.();
            inp.classList.toggle('correct',   ok);
            inp.classList.toggle('incorrect', !ok);
            if (ok) correctas++;
        });

        const fb = this.container.querySelector('#pf-feedback');
        if (correctas === campos.length) {
            fb.innerHTML = '<span style="color:var(--success);font-weight:600">✅ ¡Excelente! Todas las respuestas son correctas.</span>';
            this.onComplete?.({ correctas, total: campos.length, puntaje: 100 });
        } else {
            fb.innerHTML = `<span style="color:var(--warning)">⚠️ ${correctas}/${campos.length} correctas. Revisa los campos resaltados en rojo.</span>`;
        }
    }
}
