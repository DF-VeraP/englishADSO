class GrammarPill {
    constructor(container, data, onComplete) {
        this.container  = container;
        this.data       = data;
        this.onComplete = onComplete;
        this.render();
        // Grammar pill es informativo, se completa al renderizar
        setTimeout(() => onComplete?.({ completada: true }), 1500);
    }

    render() {
        const { titulo, columnas, colores, filas, nota, columnas2, filas2 } = this.data;
        const colorClasses = ['gp-col-subject', 'gp-col-verb', 'gp-col-complement'];
        const colorNames   = ['#3b82f6', '#f59e0b', '#10b981'];

        const buildTable = (cols, rows) => `
            <table class="grammar-pill-table">
                <thead>
                    <tr>${cols.map((c, i) => `
                        <th class="${colorClasses[i % 3]}" style="color:${colorNames[i % 3]}">${c}</th>`).join('')}
                    </tr>
                </thead>
                <tbody>
                    ${rows.map(row => `
                        <tr>${row.map((cell, i) => `
                            <td class="${colorClasses[i % 3]}">${cell}</td>`).join('')}
                        </tr>`).join('')}
                </tbody>
            </table>`;

        let html = `
            <div class="gp-legend">
                ${columnas.map((c, i) => `
                    <div class="gp-legend-item">
                        <div class="gp-legend-dot" style="background:${colorNames[i % 3]}"></div>
                        <span style="color:${colorNames[i % 3]}">${c}</span>
                    </div>`).join('')}
            </div>
            ${buildTable(columnas, filas)}`;

        // Segunda tabla si existe (para módulos con 2 columnas)
        if (columnas2 && filas2) {
            html += `<div style="margin-top:1.25rem">${buildTable(columnas2, filas2)}</div>`;
        }

        if (nota) {
            html += `<div class="gp-note">💡 ${nota}</div>`;
        }

        this.container.innerHTML = html;
    }
}
