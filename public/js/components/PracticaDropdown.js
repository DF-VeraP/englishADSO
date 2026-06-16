class PracticaDropdown {
    constructor(container, data, onComplete) {
        this.container  = container;
        this.data       = data;  // { items:[{prefijo, opciones:[], correcta:idx}] }
        this.onComplete = onComplete;
        this.render();
    }

    render() {
        const { items } = this.data;

        this.container.innerHTML = `
            <div id="pd-items">
                ${items.map((item, i) => `
                    <div class="dropdown-practica-item">
                        <span class="dropdown-prefix">${item.prefijo}</span>
                        <select class="practica-select" id="pd-sel-${i}" data-correcta="${item.correcta}">
                            <option value="">— seleccionar —</option>
                            ${item.opciones.map((o, j) => `<option value="${j}">${o}</option>`).join('')}
                        </select>
                    </div>`).join('')}
            </div>
            <div id="pd-feedback" style="font-size:.85rem;min-height:22px;margin-top:.5rem"></div>
            <button class="practica-check-btn" id="pd-check" style="margin-top:.75rem">Verificar</button>`;

        this.container.querySelector('#pd-check').addEventListener('click', () => this._check(items));
    }

    _check(items) {
        let correctas = 0;
        items.forEach((item, i) => {
            const sel = this.container.querySelector(`#pd-sel-${i}`);
            if (!sel) return;
            const ok = parseInt(sel.value) === item.correcta;
            sel.classList.toggle('correct',   ok);
            sel.classList.toggle('incorrect', !ok);
            if (ok) correctas++;
        });
        const fb = this.container.querySelector('#pd-feedback');
        if (correctas === items.length) {
            fb.innerHTML = '<span style="color:var(--success);font-weight:600">✅ ¡Todo correcto!</span>';
            this.onComplete?.({ correctas, total: items.length, puntaje: 100 });
        } else {
            fb.innerHTML = `<span style="color:var(--warning)">⚠️ ${correctas}/${items.length} correctas.</span>`;
        }
    }
}
