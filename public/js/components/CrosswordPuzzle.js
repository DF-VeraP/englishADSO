class CrosswordPuzzle {
    constructor(container, data, onComplete) {
        this.container  = container;
        this.data       = data;   // { claves: [{palabra, pista}] }
        this.onComplete = onComplete;
        this.words      = [];     // placed words with grid positions
        this.cellMap    = {};     // "r,c" → { letter, wordIds[] }
        this.userMap    = {};     // "r,c" → char typed by user
        this.activeWord = null;
        this.render();
    }

    render() {
        const { claves } = this.data;
        const placed = this._autoPlace(claves.map(c => ({ ...c, palabra: c.palabra.toUpperCase() })));

        if (!placed.length) {
            this.container.innerHTML = `<div class="act-shell"><p style="color:var(--text-muted)">No se pudo generar el crucigrama. Verifica que las palabras compartan letras.</p></div>`;
            return;
        }

        this.words = placed;
        this._buildCellMap();

        // Normalize grid to start at 0,0
        const rows = Object.keys(this.cellMap).map(k => Number(k.split(',')[0]));
        const cols = Object.keys(this.cellMap).map(k => Number(k.split(',')[1]));
        const minR = Math.min(...rows), maxR = Math.max(...rows);
        const minC = Math.min(...cols), maxC = Math.max(...cols);

        // Re-key cellMap with normalized coords
        const norm = {};
        for (const [key, val] of Object.entries(this.cellMap)) {
            const [r, c] = key.split(',').map(Number);
            norm[`${r - minR},${c - minC}`] = val;
        }
        this.cellMap = norm;
        this.words.forEach(w => { w.row -= minR; w.col -= minC; });

        const gridRows = maxR - minR + 1;
        const gridCols = maxC - minC + 1;

        // Assign numbers
        let num = 1;
        this.words.sort((a, b) => a.row !== b.row ? a.row - b.row : a.col - b.col);
        const numbered = {};
        this.words.forEach(w => {
            const key = `${w.row},${w.col}`;
            if (!numbered[key]) { numbered[key] = num++; }
            w.num = numbered[key];
        });

        // Build grid HTML
        let tableHtml = '';
        for (let r = 0; r < gridRows; r++) {
            tableHtml += '<tr>';
            for (let c = 0; c < gridCols; c++) {
                const key  = `${r},${c}`;
                const cell = this.cellMap[key];
                if (!cell) {
                    tableHtml += '<td class="cw-cell-blank"></td>';
                } else {
                    const n = numbered[key] ? `<span class="cw-cell-num">${numbered[key]}</span>` : '';
                    tableHtml += `<td class="cw-cell" data-r="${r}" data-c="${c}">
                        ${n}<input class="cw-input" maxlength="1" data-r="${r}" data-c="${c}" autocomplete="off">
                    </td>`;
                }
            }
            tableHtml += '</tr>';
        }

        // Build clue lists
        const across = this.words.filter(w => w.dir === 'H').sort((a, b) => a.num - b.num);
        const down   = this.words.filter(w => w.dir === 'V').sort((a, b) => a.num - b.num);

        const clueHtml = (list) => list.map(w =>
            `<div class="cw-clue-item" id="cw-clue-${w.num}-${w.dir}">
                <span class="cw-clue-num">${w.num}.</span>
                <span>${this._esc(w.pista)}</span>
            </div>`
        ).join('');

        this.container.innerHTML = `
            <div class="act-shell">
                <div class="act-shell-title">Crucigrama</div>
                <div class="act-progress-bar">
                    <div class="act-progress-fill" id="cw-bar" style="width:0%"></div>
                </div>
                <div class="cw-layout">
                    <div class="cw-grid-wrap">
                        <table class="cw-grid" id="cw-table">${tableHtml}</table>
                    </div>
                    <div class="cw-clues-panel">
                        <div class="cw-clue-section">
                            <div class="cw-clue-dir">Horizontal →</div>
                            <div class="cw-clues-title cw-clues-across">${clueHtml(across)}</div>
                        </div>
                        <div class="cw-clue-section">
                            <div class="cw-clue-dir">Vertical ↓</div>
                            <div class="cw-clues-title cw-clues-down">${clueHtml(down)}</div>
                        </div>
                    </div>
                </div>
                <div class="cw-progress" id="cw-progress">0 / ${this.words.length} palabras completadas</div>
            </div>`;

        this._bind();
    }

    // ── Auto-placement ─────────────────────────────────────────────────────
    _autoPlace(claves) {
        const sorted  = [...claves].sort((a, b) => b.palabra.length - a.palabra.length);
        const placed  = [];
        const gridUsed = {}; // "r,c" → letter

        // Place first word horizontally at 0,0
        const first = sorted[0];
        for (let i = 0; i < first.palabra.length; i++) gridUsed[`0,${i}`] = first.palabra[i];
        placed.push({ ...first, row: 0, col: 0, dir: 'H' });

        for (let wi = 1; wi < sorted.length; wi++) {
            const word = sorted[wi];
            let done   = false;

            for (const pw of placed) {
                if (done) break;
                const newDir = pw.dir === 'H' ? 'V' : 'H';

                for (let li = 0; li < word.palabra.length && !done; li++) {
                    const letter = word.palabra[li];

                    for (let pli = 0; pli < pw.palabra.length && !done; pli++) {
                        if (pw.palabra[pli] !== letter) continue;

                        let nr, nc;
                        if (pw.dir === 'H') {
                            // pw is horizontal → new word is vertical
                            nr = pw.row - li;
                            nc = pw.col + pli;
                        } else {
                            // pw is vertical → new word is horizontal
                            nr = pw.row + pli;
                            nc = pw.col - li;
                        }

                        if (this._canPlaceCW(gridUsed, word.palabra, nr, nc, newDir)) {
                            for (let i = 0; i < word.palabra.length; i++) {
                                const kr = newDir === 'V' ? nr + i : nr;
                                const kc = newDir === 'H' ? nc + i : nc;
                                gridUsed[`${kr},${kc}`] = word.palabra[i];
                            }
                            placed.push({ ...word, row: nr, col: nc, dir: newDir });
                            done = true;
                        }
                    }
                }
            }
        }
        return placed;
    }

    _canPlaceCW(grid, word, row, col, dir) {
        for (let i = 0; i < word.length; i++) {
            const r   = dir === 'V' ? row + i : row;
            const c   = dir === 'H' ? col + i : col;
            const key = `${r},${c}`;
            if (grid[key] && grid[key] !== word[i]) return false;

            // Check no adjacent perpendicular letters (to avoid word merging)
            if (!grid[key]) {
                if (dir === 'H') {
                    if (grid[`${r - 1},${c}`] || grid[`${r + 1},${c}`]) return false;
                } else {
                    if (grid[`${r},${c - 1}`] || grid[`${r},${c + 1}`]) return false;
                }
            }
        }
        // Check no extension at start/end
        const r0 = row, c0 = col;
        const r1 = dir === 'V' ? row + word.length : row;
        const c1 = dir === 'H' ? col + word.length : col;
        if (dir === 'H') {
            if (grid[`${r0},${c0 - 1}`] || grid[`${r1},${c1}`]) return false;
        } else {
            if (grid[`${r0 - 1},${c0}`] || grid[`${r1},${c1}`]) return false;
        }
        return true;
    }

    _buildCellMap() {
        this.cellMap = {};
        this.words.forEach(w => {
            for (let i = 0; i < w.palabra.length; i++) {
                const r   = w.dir === 'V' ? w.row + i : w.row;
                const c   = w.dir === 'H' ? w.col + i : w.col;
                const key = `${r},${c}`;
                if (!this.cellMap[key]) this.cellMap[key] = { letter: w.palabra[i], wordIds: [] };
                this.cellMap[key].wordIds.push(w);
            }
        });
    }

    // ── Interaction ─────────────────────────────────────────────────────────
    _bind() {
        const table = this.container.querySelector('#cw-table');
        if (!table) return;

        table.querySelectorAll('.cw-input').forEach(inp => {
            inp.addEventListener('click', () => this._activateCell(inp));
            inp.addEventListener('focus', () => this._activateCell(inp));
            inp.addEventListener('keydown', e => this._onKey(e, inp));
            inp.addEventListener('input', e => {
                const val = inp.value.replace(/[^a-zA-Z]/g, '').toUpperCase().slice(-1);
                inp.value = val;
                if (val) {
                    this.userMap[`${inp.dataset.r},${inp.dataset.c}`] = val;
                    this._checkCell(inp);
                    this._advance(inp);
                }
            });
        });
    }

    _activateCell(inp) {
        this.container.querySelectorAll('.cw-cell--active').forEach(el => el.classList.remove('cw-cell--active'));
        inp.closest('.cw-cell')?.classList.add('cw-cell--active');
    }

    _onKey(e, inp) {
        if (e.key === 'Backspace') {
            if (!inp.value) this._movePrev(inp);
            return;
        }
        if (['ArrowRight','ArrowLeft','ArrowUp','ArrowDown'].includes(e.key)) {
            e.preventDefault();
            const r = Number(inp.dataset.r), c = Number(inp.dataset.c);
            const map = { ArrowRight:[0,1], ArrowLeft:[0,-1], ArrowUp:[-1,0], ArrowDown:[1,0] };
            const [dr, dc] = map[e.key];
            const next = this.container.querySelector(`.cw-input[data-r="${r+dr}"][data-c="${c+dc}"]`);
            next?.focus();
        }
    }

    _advance(inp) {
        const r = Number(inp.dataset.r), c = Number(inp.dataset.c);
        // Determine current word direction
        const cell = this.cellMap[`${r},${c}`];
        if (!cell) return;
        const w = this.activeWord || cell.wordIds[0];
        const dr = w?.dir === 'V' ? 1 : 0;
        const dc = w?.dir === 'H' ? 1 : 0;
        const next = this.container.querySelector(`.cw-input[data-r="${r+dr}"][data-c="${c+dc}"]`);
        if (next) next.focus();
    }

    _movePrev(inp) {
        const r = Number(inp.dataset.r), c = Number(inp.dataset.c);
        const cell = this.cellMap[`${r},${c}`];
        const w = this.activeWord || cell?.wordIds?.[0];
        const dr = w?.dir === 'V' ? -1 : 0;
        const dc = w?.dir === 'H' ? -1 : 0;
        const prev = this.container.querySelector(`.cw-input[data-r="${r+dr}"][data-c="${c+dc}"]`);
        if (prev) { prev.value = ''; delete this.userMap[`${r+dr},${c+dc}`]; prev.focus(); }
    }

    _checkCell(inp) {
        const key    = `${inp.dataset.r},${inp.dataset.c}`;
        const cell   = this.cellMap[key];
        if (!cell) return;
        const correct = inp.value.toUpperCase() === cell.letter;
        inp.style.color = correct ? 'var(--success)' : 'var(--danger)';

        // Check if any complete word is done
        let completedWords = 0;
        this.words.forEach(w => {
            const done = Array.from({ length: w.palabra.length }, (_, i) => {
                const r = w.dir === 'V' ? w.row + i : w.row;
                const c = w.dir === 'H' ? w.col + i : w.col;
                return this.userMap[`${r},${c}`] === w.palabra[i];
            }).every(Boolean);

            if (done) {
                completedWords++;
                const clue = this.container.querySelector(`#cw-clue-${w.num}-${w.dir}`);
                clue?.classList.add('cw-clue--done');
            }
        });

        const pct = Math.round((completedWords / this.words.length) * 100);
        const bar = this.container.querySelector('#cw-bar');
        const prg = this.container.querySelector('#cw-progress');
        if (bar) bar.style.width = pct + '%';
        if (prg) prg.textContent = `${completedWords} / ${this.words.length} palabras completadas`;

        if (completedWords === this.words.length) {
            const shell = this.container.querySelector('.act-shell');
            if (shell) shell.insertAdjacentHTML('beforeend',
                `<div class="act-complete-banner">🎉 ¡Crucigrama completado!</div>`);
            setTimeout(() => this.onComplete?.({ completada: true, puntaje: 100 }), 600);
        }
    }

    _esc(s) {
        return String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    }
}
