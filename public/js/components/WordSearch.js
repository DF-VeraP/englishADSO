class WordSearch {
    constructor(container, data, onComplete) {
        this.container   = container;
        this.data        = data;   // { palabras: ['HELLO',...], tamaño: 12 }
        this.onComplete  = onComplete;
        this.found       = new Set();
        this.placedWords = [];
        this.grid        = [];
        this.selecting   = false;
        this.startCell   = null;
        this.render();
    }

    render() {
        const palabras = this.data.palabras.map(w => w.toUpperCase().replace(/[^A-Z]/g, ''));
        const size     = this.data.tamaño || 12;

        this.grid        = this._buildGrid(palabras, size);
        this.placedWords = this._placedWords;

        const tableRows = this.grid.map((row, r) =>
            `<tr>${row.map((letter, c) =>
                `<td class="ws-cell" data-r="${r}" data-c="${c}">${letter}</td>`
            ).join('')}</tr>`
        ).join('');

        this.container.innerHTML = `
            <div class="act-shell">
                <div class="act-shell-title">Sopa de letras</div>
                <div class="act-progress-bar">
                    <div class="act-progress-fill" id="ws-bar" style="width:0%"></div>
                </div>
                <div class="ws-layout">
                    <div class="ws-grid-wrap">
                        <table class="ws-grid" id="ws-table">${tableRows}</table>
                    </div>
                    <div class="ws-words-panel">
                        <div class="ws-words-title">Encuentra estas palabras</div>
                        ${this.placedWords.map((w, i) =>
                            `<div class="ws-word" id="wsw-${i}">${w.palabra}</div>`
                        ).join('')}
                        <div class="ws-progress" id="ws-progress">
                            0 / ${this.placedWords.length} encontradas
                        </div>
                    </div>
                </div>
            </div>`;

        this._bind();
    }

    // ── Grid generation ───────────────────────────────────────────────────
    _buildGrid(palabras, size) {
        const DIRS = [
            [0, 1], [1, 0], [1, 1], [0, -1], [-1, 0], [-1, -1], [1, -1], [-1, 1]
        ];
        const grid = Array.from({ length: size }, () => Array(size).fill(''));
        this._placedWords = [];

        // Sort by length descending for better placement
        const sorted = [...palabras].sort((a, b) => b.length - a.length);

        for (const palabra of sorted) {
            if (palabra.length > size) continue;
            let placed = false;

            for (let attempt = 0; attempt < 200 && !placed; attempt++) {
                const [dr, dc] = DIRS[Math.floor(Math.random() * DIRS.length)];
                const r = Math.floor(Math.random() * size);
                const c = Math.floor(Math.random() * size);

                if (this._canPlace(grid, palabra, r, c, dr, dc, size)) {
                    const cells = [];
                    for (let i = 0; i < palabra.length; i++) {
                        grid[r + dr * i][c + dc * i] = palabra[i];
                        cells.push([r + dr * i, c + dc * i]);
                    }
                    this._placedWords.push({ palabra, cells, colorIdx: this._placedWords.length % 8 });
                    placed = true;
                }
            }
        }

        // Fill empty cells with random letters
        const ALPHA = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        for (let r = 0; r < size; r++)
            for (let c = 0; c < size; c++)
                if (!grid[r][c]) grid[r][c] = ALPHA[Math.floor(Math.random() * 26)];

        return grid;
    }

    _canPlace(grid, word, r, c, dr, dc, size) {
        for (let i = 0; i < word.length; i++) {
            const nr = r + dr * i;
            const nc = c + dc * i;
            if (nr < 0 || nr >= size || nc < 0 || nc >= size) return false;
            if (grid[nr][nc] && grid[nr][nc] !== word[i]) return false;
        }
        return true;
    }

    // ── Event binding ─────────────────────────────────────────────────────
    _bind() {
        const table = this.container.querySelector('#ws-table');
        if (!table) return;

        let selCells = [];

        const cellAt = (r, c) => table.querySelector(`[data-r="${r}"][data-c="${c}"]`);

        const getLineCells = (r0, c0, r1, c1) => {
            const dr = Math.sign(r1 - r0);
            const dc = Math.sign(c1 - c0);
            const len = Math.max(Math.abs(r1 - r0), Math.abs(c1 - c0));
            // Only allow straight lines (horiz/vert/diag)
            if (dr !== 0 && dc !== 0 && Math.abs(r1 - r0) !== Math.abs(c1 - c0)) return [];
            const cells = [];
            for (let i = 0; i <= len; i++) cells.push([r0 + dr * i, c0 + dc * i]);
            return cells;
        };

        const clearSel = () => {
            selCells.forEach(([r, c]) => cellAt(r, c)?.classList.remove('ws-cell--selecting'));
            selCells = [];
        };

        const highlight = (cells) => {
            clearSel();
            selCells = cells;
            cells.forEach(([r, c]) => cellAt(r, c)?.classList.add('ws-cell--selecting'));
        };

        const checkWord = (cells) => {
            const forward  = cells.map(([r, c]) => this.grid[r][c]).join('');
            const backward = [...forward].reverse().join('');

            const match = this.placedWords.find(
                pw => (pw.palabra === forward || pw.palabra === backward) &&
                      !this.found.has(pw.palabra)
            );

            if (match) {
                this.found.add(match.palabra);
                match.cells.forEach(([r, c]) => {
                    const el = cellAt(r, c);
                    if (el) {
                        el.classList.remove('ws-cell--selecting');
                        el.classList.add(`ws-cell--found-${match.colorIdx}`);
                    }
                });
                selCells = [];

                // Strike the word in panel
                const idx = this.placedWords.indexOf(match);
                this.container.querySelector(`#wsw-${idx}`)?.classList.add('ws-word--found');

                const count = this.found.size;
                const total = this.placedWords.length;
                const pct   = Math.round((count / total) * 100);
                const bar   = this.container.querySelector('#ws-bar');
                const prg   = this.container.querySelector('#ws-progress');
                if (bar) bar.style.width = pct + '%';
                if (prg) prg.textContent = `${count} / ${total} encontradas`;

                if (count === total) {
                    const shell = this.container.querySelector('.act-shell');
                    if (shell) shell.insertAdjacentHTML('beforeend',
                        `<div class="act-complete-banner">🎉 ¡Encontraste todas las palabras!</div>`);
                    setTimeout(() => this.onComplete?.({ completada: true, puntaje: 100 }), 500);
                }
            } else {
                clearSel();
            }
        };

        // Mouse events
        table.addEventListener('mousedown', e => {
            const td = e.target.closest('.ws-cell');
            if (!td) return;
            e.preventDefault();
            this.selecting = true;
            this.startCell = [Number(td.dataset.r), Number(td.dataset.c)];
            highlight([this.startCell]);
        });

        table.addEventListener('mouseover', e => {
            if (!this.selecting || !this.startCell) return;
            const td = e.target.closest('.ws-cell');
            if (!td) return;
            const cells = getLineCells(this.startCell[0], this.startCell[1], Number(td.dataset.r), Number(td.dataset.c));
            if (cells.length) highlight(cells);
        });

        document.addEventListener('mouseup', () => {
            if (!this.selecting) return;
            this.selecting = false;
            if (selCells.length >= 2) checkWord(selCells);
            else clearSel();
            this.startCell = null;
        });

        // Touch events
        const touchCell = (touch) => {
            const el = document.elementFromPoint(touch.clientX, touch.clientY);
            return el?.closest('.ws-cell') || null;
        };

        table.addEventListener('touchstart', e => {
            const td = touchCell(e.touches[0]);
            if (!td) return;
            this.selecting = true;
            this.startCell = [Number(td.dataset.r), Number(td.dataset.c)];
            highlight([this.startCell]);
        }, { passive: true });

        table.addEventListener('touchmove', e => {
            if (!this.selecting || !this.startCell) return;
            const td = touchCell(e.touches[0]);
            if (!td) return;
            const cells = getLineCells(this.startCell[0], this.startCell[1], Number(td.dataset.r), Number(td.dataset.c));
            if (cells.length) highlight(cells);
        }, { passive: true });

        table.addEventListener('touchend', () => {
            if (!this.selecting) return;
            this.selecting = false;
            if (selCells.length >= 2) checkWord(selCells);
            else clearSel();
            this.startCell = null;
        });
    }
}
