class AsciiSlapStudio {
    constructor(root) {
        this.root = root;
        this.canvas = root.querySelector('#slap-canvas');
        if (!this.canvas) return;

        this.cols = parseInt(this.canvas.dataset.cols || '64', 10);
        this.rows = parseInt(this.canvas.dataset.rows || '32', 10);
        this.char = '█';
        this.color = '#ffffff';
        this.brushSize = 1;
        this.isDrawing = false;
        this.isDriftMode = false;
        this.activePointerId = null;
        this.history = [];
        this.redoStack = [];
        this.strokeTimestamps = [];
        this.driftTimeouts = new Map();
        this.storageKey = 'slap_drafts_v1';
        this.drafts = this.loadDrafts();

        this.grid = Array.from({ length: this.rows }, () =>
            Array.from({ length: this.cols }, () => ({ char: ' ', color: '' }))
        );
        this.cells = Array.from({ length: this.rows }, () => new Array(this.cols));

        this.flowMeterEl = this.root.querySelector('[data-flow-meter]');
        this.statusEl = this.root.querySelector('[data-slap-status]');
        this.draftsList = this.root.querySelector('#slap-drafts-list');

        this.handlePointerDown = this.handlePointerDown.bind(this);
        this.handlePointerMove = this.handlePointerMove.bind(this);
        this.handlePointerUp = this.handlePointerUp.bind(this);
        this.handlePointerLeave = this.handlePointerLeave.bind(this);

        this.renderGrid();
        this.bindUI();
        this.renderDrafts();
        this.updateFlowMeter(true);
        window.addEventListener('resize', () => this.refreshLayout());
    }

    renderGrid() {
        const frag = document.createDocumentFragment();
        this.canvas.style.setProperty('--slap-cols', this.cols);
        this.canvas.style.setProperty('--slap-rows', this.rows);

        for (let y = 0; y < this.rows; y++) {
            for (let x = 0; x < this.cols; x++) {
                const cell = document.createElement('span');
                cell.className = 'slap-cell';
                cell.dataset.x = x;
                cell.dataset.y = y;
                cell.textContent = ' ';
                frag.appendChild(cell);
                this.cells[y][x] = cell;
            }
        }

        this.canvas.innerHTML = '';
        this.canvas.appendChild(frag);
        this.canvas.addEventListener('pointerdown', this.handlePointerDown);
        this.canvas.addEventListener('pointermove', this.handlePointerMove);
        this.canvas.addEventListener('pointerleave', this.handlePointerLeave);
        document.addEventListener('pointerup', this.handlePointerUp);
    }

    bindUI() {
        this.root.querySelectorAll('.slap-color').forEach(btn => {
            btn.addEventListener('click', () => {
                this.color = btn.dataset.color;
                this.setActive(btn, '.slap-color');
            });
        });

        this.root.querySelectorAll('.slap-glyph').forEach(btn => {
            btn.addEventListener('click', () => {
                this.char = btn.dataset.char;
                this.setActive(btn, '.slap-glyph');
            });
        });

        this.root.querySelectorAll('.slap-brush').forEach(btn => {
            btn.addEventListener('click', () => {
                this.brushSize = Math.max(1, parseInt(btn.dataset.brush, 10));
                this.setActive(btn, '.slap-brush');
            });
        });

        this.root.querySelectorAll('[data-slap-action]').forEach(btn => {
            btn.addEventListener('click', (event) => {
                const action = btn.dataset.slapAction;
                switch (action) {
                    case 'undo':
                        event.preventDefault();
                        this.undo();
                        break;
                    case 'clear':
                        event.preventDefault();
                        this.clear();
                        break;
                    case 'copy':
                        event.preventDefault();
                        this.copyAscii();
                        break;
                    case 'export-file':
                        event.preventDefault();
                        this.downloadAsciiFile();
                        break;
                    case 'post':
                        event.preventDefault();
                        this.postToLocalWall();
                        break;
                    case 'clear-wall':
                        event.preventDefault();
                        this.clearDrafts();
                        break;
                    default:
                        break;
                }
            });
        });
    }

    setActive(target, selector) {
        this.root.querySelectorAll(selector).forEach(btn => btn.classList.remove('active'));
        target.classList.add('active');
    }

    handlePointerDown(e) {
        const cell = this.getCellFromEvent(e);
        if (!cell) return;
        e.preventDefault();
        this.isDrawing = true;
        this.isDriftMode = !!e.shiftKey;
        this.activePointerId = e.pointerId;
        this.canvas.setPointerCapture?.(e.pointerId);
        this.announce(this.isDriftMode ? 'Drift mode active.' : 'Drawing…');
        this.applyBrush(cell.x, cell.y);
    }

    handlePointerMove(e) {
        if (!this.isDrawing) return;
        if (this.activePointerId !== null && e.pointerId !== undefined && e.pointerId !== this.activePointerId) {
            return;
        }
        const cell = this.getCellFromEvent(e);
        if (!cell) return;
        e.preventDefault();
        if (e.shiftKey) {
            this.isDriftMode = true;
        }
        this.applyBrush(cell.x, cell.y);
    }

    handlePointerUp(e) {
        if (!this.isDrawing) return;
        if (this.activePointerId !== null && e.pointerId !== undefined && e.pointerId !== this.activePointerId) {
            return;
        }
        this.stopDrawing();
    }

    handlePointerLeave() {
        if (!this.isDrawing) return;
        this.stopDrawing();
    }

    stopDrawing() {
        this.isDrawing = false;
        if (this.activePointerId !== null) {
            this.canvas.releasePointerCapture?.(this.activePointerId);
            this.activePointerId = null;
        }
        this.isDriftMode = false;
        this.announce('Idle.');
    }

    getCellFromEvent(e) {
        const target = e.target.closest('.slap-cell');
        if (!target) return null;
        return {
            x: Number(target.dataset.x),
            y: Number(target.dataset.y),
            el: target
        };
    }

    applyBrush(x, y) {
        const dimension = this.brushSize;
        const offset = Math.floor(dimension / 2);
        const changes = [];

        for (let by = 0; by < dimension; by++) {
            for (let bx = 0; bx < dimension; bx++) {
                const targetY = y - offset + by;
                const targetX = x - offset + bx;
                if (this.isInBounds(targetX, targetY)) {
                    const prev = { ...this.grid[targetY][targetX] };
                    if (prev.char === this.char && prev.color === this.color) continue;
                    this.grid[targetY][targetX] = { char: this.char, color: this.color };
                    this.updateCell(targetX, targetY);
                    if (this.isDriftMode) {
                        this.scheduleDriftFade(targetX, targetY);
                    }
                    this.triggerCellPulse(targetX, targetY);
                    changes.push({ x: targetX, y: targetY, prev });
                }
            }
        }

        if (changes.length) {
            this.history.push(changes);
            if (this.history.length > 200) this.history.shift();
            this.redoStack = [];
            this.recordStroke();
        }
    }

    updateCell(x, y) {
        const cell = this.cells[y][x];
        if (!cell) return;
        const value = this.grid[y][x];
        cell.textContent = value.char;
        cell.style.color = value.color || 'var(--text-primary)';
    }

    triggerCellPulse(x, y) {
        const cell = this.cells[y][x];
        if (!cell) return;
        cell.classList.remove('pulse');
        // Force reflow to restart animation
        void cell.offsetWidth; // eslint-disable-line no-void
        cell.classList.add('pulse');
    }

    scheduleDriftFade(x, y) {
        const cell = this.cells[y][x];
        if (!cell) return;
        cell.classList.add('drift');
        if (this.driftTimeouts.has(cell)) {
            clearTimeout(this.driftTimeouts.get(cell));
        }
        const timeout = setTimeout(() => {
            cell.classList.remove('drift');
            this.driftTimeouts.delete(cell);
        }, 5000);
        this.driftTimeouts.set(cell, timeout);
    }

    recordStroke() {
        const now = Date.now();
        this.strokeTimestamps.push(now);
        this.strokeTimestamps = this.strokeTimestamps.filter(ts => now - ts <= 5000);
        this.updateFlowMeter();
    }

    updateFlowMeter(forceIdle = false) {
        if (!this.flowMeterEl) return;
        if (forceIdle) {
            this.flowMeterEl.textContent = 'Flow: idle.';
            return;
        }
        const now = Date.now();
        this.strokeTimestamps = this.strokeTimestamps.filter(ts => now - ts <= 5000);
        const rate = this.strokeTimestamps.length / 5; // per second
        let label = 'Flow: calibrating…';
        if (this.strokeTimestamps.length === 0) {
            label = 'Flow: idle.';
        } else if (rate > 12) {
            label = 'Flow: overclocked.';
        } else if (rate > 6) {
            label = 'Flow: locked in.';
        } else if (rate > 2) {
            label = 'Flow: warming up.';
        }
        this.flowMeterEl.textContent = label;
    }

    isInBounds(x, y) {
        return x >= 0 && x < this.cols && y >= 0 && y < this.rows;
    }

    undo() {
        const batch = this.history.pop();
        if (!batch || !batch.length) {
            this.announce('Nothing to undo.', true);
            return;
        }
        batch.forEach(change => {
            this.grid[change.y][change.x] = change.prev;
            this.updateCell(change.x, change.y);
        });
        this.redoStack.push(batch);
        this.announce('Undo applied.');
    }

    clear() {
        this.resetDriftTimers();
        const changes = [];
        for (let y = 0; y < this.rows; y++) {
            for (let x = 0; x < this.cols; x++) {
                const prev = { ...this.grid[y][x] };
                if (prev.char === ' ' && !prev.color) continue;
                this.grid[y][x] = { char: ' ', color: '' };
                this.updateCell(x, y);
                changes.push({ x, y, prev });
            }
        }
        if (changes.length) {
            this.history.push(changes);
            this.redoStack = [];
            this.announce('Canvas cleared.');
            this.strokeTimestamps = [];
            this.updateFlowMeter(true);
        }
    }

    resetDriftTimers() {
        this.driftTimeouts.forEach((timeout, cell) => {
            clearTimeout(timeout);
            cell.classList.remove('drift');
        });
        this.driftTimeouts.clear();
    }

    exportArt() {
        return this.grid.map(row => row.map(cell => cell.char).join('')).join('\n');
    }

    copyAscii() {
        const art = this.exportArt();
        if (!art.trim()) {
            this.announce('Draw something first.', true);
            return;
        }
        navigator.clipboard?.writeText(art)
            .then(() => this.announce('ASCII art copied.'))
            .catch(() => {
                this.announce('ASCII ready. Copy manually.', true);
                console.log(art);
            });
    }

    downloadAsciiFile() {
        const art = this.exportArt();
        if (!art.trim()) {
            this.announce('Draw something first.', true);
            return;
        }
        const blob = new Blob([art], { type: 'text/plain' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.href = url;
        link.download = `slap_${Date.now()}.txt`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        requestAnimationFrame(() => URL.revokeObjectURL(url));
        this.announce('Exported as .txt');
    }

    postToLocalWall() {
        const art = this.exportArt();
        if (!art.trim()) {
            this.announce('Draw something first.', true);
            return;
        }
        const draft = {
            id: `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`,
            createdAt: Date.now(),
            glyph: this.char,
            color: this.color,
            brush: this.brushSize,
            art,
            grid: this.serializeGrid()
        };
        this.drafts.unshift(draft);
        this.drafts = this.drafts.slice(0, 20);
        this.persistDrafts();
        this.renderDrafts();
        this.announce('Posted to local wall.');
        window.communitySlapWall?.addEntry({
            art,
            author: 'Workbench',
            source: 'local-wall',
            gridSize: `${this.cols}×${this.rows}`
        });
        window.labLogConsole?.log?.('SLAP posted locally.', 'slap');
    }

    serializeGrid() {
        return {
            rows: this.rows,
            cols: this.cols,
            cells: this.grid.map(row =>
                row.map(cell => ({ char: cell.char, color: cell.color }))
            )
        };
    }

    hydrateGrid(serialized) {
        if (!serialized || !Array.isArray(serialized.cells)) return false;
        if (serialized.rows !== this.rows || serialized.cols !== this.cols) return false;
        this.resetDriftTimers();
        for (let y = 0; y < this.rows; y++) {
            const row = serialized.cells[y] || [];
            for (let x = 0; x < this.cols; x++) {
                const cell = row[x] || { char: ' ', color: '' };
                this.grid[y][x] = { char: cell.char, color: cell.color };
                this.updateCell(x, y);
            }
        }
        this.history = [];
        this.redoStack = [];
        return true;
    }

    loadDraft(draftId) {
        const draft = this.drafts.find(entry => entry.id === draftId);
        if (!draft) return;
        const hydrated = this.hydrateGrid(draft.grid);
        if (!hydrated) {
            this.importArt(draft.art);
        }
        this.announce('Post loaded into editor.');
    }

    importArt(art) {
        this.resetDriftTimers();
        const lines = art.split('\n');
        for (let y = 0; y < this.rows; y++) {
            for (let x = 0; x < this.cols; x++) {
                const char = (lines[y] && lines[y][x]) ? lines[y][x] : ' ';
                this.grid[y][x] = { char, color: '' };
                this.updateCell(x, y);
            }
        }
        this.history = [];
        this.redoStack = [];
    }

    deleteDraft(draftId) {
        const nextDrafts = this.drafts.filter(entry => entry.id !== draftId);
        if (nextDrafts.length === this.drafts.length) return;
        this.drafts = nextDrafts;
        this.persistDrafts();
        this.renderDrafts();
        this.announce('Post removed.');
    }

    clearDrafts() {
        if (!this.drafts.length) {
            this.announce('No posts to clear.', true);
            return;
        }
        if (!confirm('Clear entire local wall?')) return;
        this.drafts = [];
        this.persistDrafts();
        this.renderDrafts();
        this.announce('Local wall cleared.');
    }

    loadDrafts() {
        try {
            const stored = localStorage.getItem(this.storageKey);
            return stored ? JSON.parse(stored) : [];
        } catch (error) {
            console.warn('Unable to load local SLAP wall entries', error);
            return [];
        }
    }

    persistDrafts() {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(this.drafts));
        } catch (error) {
            console.warn('Unable to persist local SLAP wall entries', error);
        }
    }

    renderDrafts() {
        if (!this.draftsList) return;
        if (!this.drafts.length) {
            this.draftsList.innerHTML = '<li class="slap-draft-empty">No local posts yet.</li>';
            return;
        }
        this.draftsList.innerHTML = this.drafts.map(draft => `
            <li class="slap-draft-item" data-draft-id="${draft.id}">
                <span class="slap-draft-snippet">${this.buildDraftLabel(draft)}</span>
                <div class="slap-draft-actions">
                    <button type="button" data-draft-action="edit">Edit</button>
                    <button type="button" data-draft-action="remove">Remove</button>
                </div>
            </li>
        `).join('');
        this.attachDraftActionHandlers();
    }

    attachDraftActionHandlers() {
        this.draftsList?.querySelectorAll('.slap-draft-item').forEach(item => {
            const draftId = item.dataset.draftId;
            item.querySelector('[data-draft-action="edit"]')?.addEventListener('click', (event) => {
                event.preventDefault();
                this.loadDraft(draftId);
            });
            item.querySelector('[data-draft-action="remove"]')?.addEventListener('click', (event) => {
                event.preventDefault();
                this.deleteDraft(draftId);
            });
        });
    }

    buildDraftLabel(draft) {
        const date = new Date(draft.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const sample = draft.art.replace(/\s+/g, ' ').trim().slice(0, 24) || 'Empty post';
        return `${date} • ${this.escapeHtml(sample)}`;
    }

    escapeHtml(text) {
        return text.replace(/[&<>'"]/g, (char) => {
            if (char === '&') return '&amp;';
            if (char === '<') return '&lt;';
            if (char === '>') return '&gt;';
            if (char === '"') return '&quot;';
            if (char === "'") return '&#39;';
            return char;
        });
    }

    announce(message, warning = false) {
        const copy = message.startsWith('Status:') ? message : `Status: ${message}`;
        if (this.statusEl) {
            this.statusEl.textContent = warning ? `⚠ ${copy}` : copy;
        }
        console[warning ? 'warn' : 'log'](`🎨 SLAP: ${message}`);
    }

    refreshLayout() {
        // Triggered when modal opens/resizes
        const art = this.exportArt();
        this.canvas.style.setProperty('--slap-cols', this.cols);
        this.canvas.style.setProperty('--slap-rows', this.rows);
        // Re-render text to ensure sizing aligns
        for (let y = 0; y < this.rows; y++) {
            for (let x = 0; x < this.cols; x++) {
                this.updateCell(x, y);
            }
        }
        return art;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const root = document.querySelector('[data-slap-root]');
    if (!root) return;
    window.asciiSlapStudio = new AsciiSlapStudio(root);
});
