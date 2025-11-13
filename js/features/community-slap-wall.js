/**
 * CommunitySlapWall
 * Lightweight client-side guestbook for ASCII slaps with share code support.
 */

(function () {
    class CommunitySlapWall {
        constructor() {
            this.storageKey = 'community-slaps';
            this.feedEl = document.getElementById('community-art-feed');
            this.sectionEl = document.getElementById('community-art-section');
            this.countEl = document.getElementById('community-art-count');
            this.statsCountEl = document.getElementById('lab-count-art');
            this.formEl = document.getElementById('community-slap-form');
            this.artInput = document.getElementById('guest-slap-art');
            this.authorInput = document.getElementById('guest-slap-author');
            this.charCountEl = document.getElementById('slap-char-count');
            this.idleHintEl = document.getElementById('slap-idle-hint');
            this.statusEl = document.getElementById('slap-form-status');
            this.wallUpdatedEl = document.getElementById('community-wall-updated');
            this.liveRegion = document.getElementById('community-wall-live-region');
            this.templates = {
                tag: `┌────┐\n│TAG │\n└────┘`,
                frame: `╔══════╗\n║ ASCII║\n╚══════╝`,
                signature: `// Ric Rios\n:: SLAP`
            };
            this.lastUpdated = Date.now();
            this.idleTimer = null;
            this.autoRefreshInterval = null;
            this.lastUpdatedTicker = null;
            this.visibilityObserver = null;
            this.isVisible = true;
            this.entries = this.loadEntries();

            this.renderInitialEntries();
            this.bindFormControls();
            this.updateCounts();
            this.setupVisibilityObserver();
            this.deferAutoRefresh();
            this.updateLastUpdatedLabel();

            window.communitySlapWall = this;
        }

        loadEntries() {
            try {
                const stored = localStorage.getItem(this.storageKey);
                const parsed = stored ? JSON.parse(stored) : [];
                return parsed.map(entry => ({
                    ...entry,
                    hue: entry?.hue ?? this.computeHueFromArt(entry?.art || '')
                }));
            } catch (error) {
                console.warn('Failed to parse community slaps from storage', error);
                return [];
            }
        }

        persistEntries() {
            try {
                localStorage.setItem(this.storageKey, JSON.stringify(this.entries.slice(0, 60)));
            } catch (error) {
                console.warn('Unable to persist community slaps', error);
            }
        }

        ensureSectionVisible() {
            if (this.sectionEl) {
                this.sectionEl.style.display = 'block';
            }
        }

        updateCounts() {
            const count = this.entries.length;
            if (this.countEl) this.countEl.textContent = count;
            if (this.statsCountEl) this.statsCountEl.textContent = `(${count})`;
            if (window.gameStats) {
                window.gameStats.artPieces = count;
                if (typeof window.updateGameStats === 'function') {
                    window.updateGameStats();
                }
            }
            if (count > 0) this.ensureSectionVisible();
            this.lastUpdated = Date.now();
            this.updateLastUpdatedLabel();
        }

        updateLastUpdatedLabel() {
            if (!this.wallUpdatedEl) return;
            const delta = Math.max(0, Math.floor((Date.now() - this.lastUpdated) / 1000));
            const copy = delta === 0 ? 'just now' : `${delta}s ago`;
            this.wallUpdatedEl.textContent = `Last updated • ${copy}`;
        }

        setupVisibilityObserver() {
            if (!this.sectionEl || !('IntersectionObserver' in window)) return;
            this.isVisible = false;
            this.visibilityObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    this.isVisible = entry.isIntersecting;
                    if (this.isVisible) {
                        this.updateLastUpdatedLabel();
                    }
                });
            }, { threshold: 0.15 });
            this.visibilityObserver.observe(this.sectionEl);
        }

        deferAutoRefresh() {
            const start = () => {
                if (this.autoRefreshInterval) return;
                this.autoRefreshInterval = window.setInterval(() => {
                    if (this.isVisible) {
                        this.refreshFromStorage();
                    }
                }, 12000);
                this.lastUpdatedTicker = window.setInterval(() => this.updateLastUpdatedLabel(), 1000);
            };
            if (typeof window.requestIdleCallback === 'function') {
                window.requestIdleCallback(start, { timeout: 2000 });
            } else {
                setTimeout(start, 600);
            }
        }

        refreshFromStorage() {
            if (!this.isVisible) {
                this.updateLastUpdatedLabel();
                return;
            }
            const latest = this.loadEntries();
            if (!Array.isArray(latest)) return;

            const changed = latest.length !== this.entries.length ||
                (latest[0]?.id && latest[0]?.id !== this.entries[0]?.id);

            if (!changed) {
                this.updateLastUpdatedLabel();
                return;
            }

            this.entries = latest;
            this.renderInitialEntries(true);
            this.updateCounts();
            if (latest[0]) {
                this.triggerWallPulse(latest[0].hue);
                this.pulseLiveRegion('Wall refreshed.');
            }
        }

        generateGridPreview(art) {
            const lines = (art || '').split('\n');
            const grid = [];
            for (let y = 0; y < 3; y++) {
                const line = (lines[y] || '').padEnd(3, '.');
                grid.push(line.slice(0, 3));
            }
            return grid.join('\n');
        }

        describePreview(art) {
            const text = (art || '').replace(/\s+/g, ' ').trim();
            return text ? text.slice(0, 40) : 'Empty SLAP';
        }

        computeHueFromArt(art) {
            const seed = (art || '').split('').reduce((acc, char) => {
                return (acc + char.charCodeAt(0) * 31) % 360;
            }, 0);
            return seed;
        }

        triggerWallPulse(hue = null) {
            if (!this.sectionEl) return;
            const rootStyles = getComputedStyle(document.documentElement);
            const paletteAccent = rootStyles.getPropertyValue('--wall-pulse-color').trim() || 'rgba(0, 255, 157, 0.35)';
            const pulseColor = typeof hue === 'number' ? `hsl(${hue}, 85%, 60%)` : paletteAccent;
            this.sectionEl.style.setProperty('--wall-pulse-color', pulseColor);
            this.sectionEl.classList.add('wall-pulse');
            setTimeout(() => this.sectionEl?.classList.remove('wall-pulse'), 700);
        }

        pulseLiveRegion(message) {
            if (!this.liveRegion) return;
            this.liveRegion.textContent = message;
        }

        updateCharCount() {
            if (!this.charCountEl) return;
            const current = this.artInput?.value.length || 0;
            this.charCountEl.textContent = `${current} / 2800`;
        }

        resetIdleHintTimer(hasInput = false, overrideText) {
            if (!this.idleHintEl) return;
            if (this.idleTimer) {
                clearTimeout(this.idleTimer);
            }
            if (overrideText) {
                this.idleHintEl.textContent = overrideText;
            } else if (hasInput) {
                this.idleHintEl.textContent = 'Keep going.';
            } else {
                this.idleHintEl.textContent = 'Listening...';
            }
            this.idleTimer = setTimeout(() => {
                if (this.idleHintEl) {
                    this.idleHintEl.textContent = 'Waiting for trouble.';
                }
            }, 5000);
        }

        insertTemplate(type) {
            const template = this.templates[type];
            if (!template || !this.artInput) return;
            const start = this.artInput.selectionStart || 0;
            const end = this.artInput.selectionEnd || 0;
            const value = this.artInput.value;
            this.artInput.value = `${value.slice(0, start)}${template}\n${value.slice(end)}`;
            this.updateCharCount();
            this.resetIdleHintTimer(true, 'Template inserted.');
            this.artInput.focus();
        }

        renderEntry(entry, prepend = false) {
            if (!this.feedEl) return;
            const item = document.createElement('div');
            item.className = 'art-thumbnail';
            item.dataset.entryId = entry.id;
            item.setAttribute('role', 'listitem');
            const hue = entry.hue ?? this.computeHueFromArt(entry.art);
            item.innerHTML = `
                <figure class="art-preview-card">
                    <pre class="art-preview-grid">${this.generateGridPreview(entry.art).replace(/</g, '&lt;')}</pre>
                    <figcaption class="sr-only">${this.describePreview(entry.art)}</figcaption>
                </figure>
                <div class="art-meta">
                    <span class="author-chip" aria-hidden="true" style="--chip-hue: ${hue};"></span>
                    <div class="art-meta-copy">
                        <p class="art-author">posted ${new Date(entry.timestamp).toLocaleDateString()} by ${entry.author}</p>
                        <button class="art-open-btn" type="button">Open</button>
                    </div>
                </div>
            `;
            item.addEventListener('click', () => this.openLightbox(entry));
            item.querySelector('.art-open-btn')?.addEventListener('click', (event) => {
                event.stopPropagation();
                this.openLightbox(entry);
            });
            if (prepend && this.feedEl.firstChild) {
                this.feedEl.insertBefore(item, this.feedEl.firstChild);
            } else {
                this.feedEl.appendChild(item);
            }
        }

        renderInitialEntries(force = false) {
            if (!this.feedEl) return;
            this.feedEl.setAttribute('role', 'list');
            if (force) {
                this.feedEl.innerHTML = '';
            } else if (this.feedEl.childElementCount > 0) {
                return;
            }
            this.feedEl.innerHTML = '';
            this.entries.forEach(entry => this.renderEntry(entry, false));
            if (this.entries.length > 0) {
                this.ensureSectionVisible();
            }
        }

        parseGuestInput(raw) {
            const text = (raw || '').trim();
            if (!text) return { art: '', author: '', source: 'guest' };
            
            if (text.startsWith('SLAP::')) {
                try {
                    const payload = JSON.parse(atob(text.replace('SLAP::', '').trim()));
                    return {
                        art: (payload.art || '').trim(),
                        author: (payload.author || '').trim(),
                        source: payload.source || 'share'
                    };
                } catch (error) {
                    console.warn('Invalid SLAP share code', error);
                }
            }
            return { art: text, author: '', source: 'guest' };
        }

        addEntry({ art, author = 'Anonymous', source = 'guest', gridSize = 'custom' }) {
            const cleanArt = (art || '').trim();
            if (!cleanArt) {
                this.announce('Add some ASCII art first.');
                return null;
            }
            const entry = {
                id: `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`,
                art: cleanArt,
                author: (author || 'Anonymous').trim(),
                source,
                gridSize,
                timestamp: Date.now(),
                hue: this.computeHueFromArt(cleanArt)
            };
            this.entries.unshift(entry);
            this.entries = this.entries.slice(0, 60);
            this.persistEntries();
            this.renderEntry(entry, true);
            this.ensureSectionVisible();
            this.updateCounts();
            this.triggerWallPulse(entry.hue);
            this.pulseLiveRegion(`New SLAP from ${entry.author}.`);
            return entry;
        }

        addEntryFromGame({ art, author = 'Workbench', gridSize }) {
            return this.addEntry({
                art,
                author,
                source: 'workbench',
                gridSize
            });
        }

        bindFormControls() {
            if (!this.formEl) return;
            this.formEl.addEventListener('submit', (event) => {
                event.preventDefault();
                this.handleGuestSubmission();
            });
            
            const submitBtn = document.getElementById('submit-guest-slap');
            const clearBtn = document.getElementById('clear-guest-slap');

            submitBtn?.addEventListener('click', (event) => {
                event.preventDefault();
                this.handleGuestSubmission();
            });
            clearBtn?.addEventListener('click', (event) => {
                event.preventDefault();
                if (!confirm('Clear draft?')) return;
                if (this.artInput) this.artInput.value = '';
                if (this.authorInput) this.authorInput.value = '';
                this.updateCharCount();
                this.resetIdleHintTimer(false, 'Draft cleared.');
            });

            this.artInput?.addEventListener('input', () => {
                this.updateCharCount();
                this.resetIdleHintTimer(true);
            });
            this.artInput?.addEventListener('focus', () => this.resetIdleHintTimer(false));
            this.artInput?.addEventListener('blur', () => this.resetIdleHintTimer(false, 'Waiting for trouble.'));
            this.artInput?.addEventListener('keydown', (event) => {
                if ((event.metaKey || event.ctrlKey) && event.key === 'Enter') {
                    event.preventDefault();
                    this.handleGuestSubmission();
                }
            });

            this.formEl.querySelectorAll('[data-slap-template]').forEach(btn => {
                btn.addEventListener('click', (event) => {
                    event.preventDefault();
                    this.insertTemplate(btn.dataset.slapTemplate);
                });
            });

            this.updateCharCount();
        }

        handleGuestSubmission() {
            const parsed = this.parseGuestInput(this.artInput?.value);
            const author = (this.authorInput?.value || parsed.author || 'Guest').trim();
            if (!parsed.art) {
                this.announce('Paste ASCII art or a SLAP share code.');
                return;
            }

            const entry = this.addEntry({
                art: parsed.art,
                author,
                source: parsed.source
            });

            if (entry) {
                if (this.artInput) this.artInput.value = '';
                if (this.authorInput) this.authorInput.value = '';
                this.announce('SLAP added to the wall.');
                this.updateCharCount();
                this.resetIdleHintTimer(false, 'Waiting for trouble.');
            }
        }

        copyLatestShareCode() {
            if (!this.entries.length) {
                this.announce('Create or import a SLAP first.');
                return;
            }
            const latest = this.entries[0];
            const payload = {
                art: latest.art,
                author: latest.author,
                source: 'share'
            };
            const shareCode = `SLAP::${btoa(JSON.stringify(payload))}`;
            navigator.clipboard?.writeText(shareCode)
                .then(() => this.announce('Share code copied to clipboard.'))
                .catch(() => {
                    this.announce('Share code ready. Copy it manually.', true);
                    console.log('SLAP Share Code:', shareCode);
                });
        }

        openLightbox(entry) {
            const lightbox = document.createElement('div');
            lightbox.className = 'art-lightbox';
            lightbox.innerHTML = `
                <div class="lightbox-backdrop"></div>
                <div class="lightbox-content">
                    <div class="lightbox-header">
                        <h3>${entry.author}</h3>
                        <button class="lightbox-close" aria-label="Close">✕</button>
                    </div>
                    <div class="lightbox-art">
                        <pre>${entry.art.replace(/</g, '&lt;')}</pre>
                    </div>
                    <div class="lightbox-actions">
                        <button class="lightbox-btn primary" data-action="copy">Copy Art</button>
                        <button class="lightbox-btn secondary" data-action="share">Copy Share Code</button>
                    </div>
                </div>
            `;

            lightbox.querySelector('.lightbox-backdrop')?.addEventListener('click', () => lightbox.remove());
            lightbox.querySelector('.lightbox-close')?.addEventListener('click', () => lightbox.remove());
            lightbox.querySelector('[data-action="copy"]')?.addEventListener('click', () => {
                navigator.clipboard?.writeText(entry.art)
                    .then(() => this.announce('ASCII art copied.'))
                    .catch(() => this.announce('Unable to copy automatically.', true));
            });
            lightbox.querySelector('[data-action="share"]')?.addEventListener('click', () => {
                const code = `SLAP::${btoa(JSON.stringify({ art: entry.art, author: entry.author, source: 'share' }))}`;
                navigator.clipboard?.writeText(code)
                    .then(() => this.announce('Share code copied.'))
                    .catch(() => {
                        this.announce('Unable to copy automatically.', true);
                        console.log('SLAP Share Code:', code);
                    });
            });

            document.body.appendChild(lightbox);
        }

        announce(message, isWarning = false) {
            console.log(`🎯 Community Wall: ${message}`);
            if (this.statusEl) {
                this.statusEl.textContent = message;
            }
            const toast = document.createElement('div');
            toast.textContent = message;
            toast.style.cssText = `
                position: fixed;
                bottom: 20px;
                right: 20px;
                background: ${isWarning ? '#ff6b35' : 'var(--cyber-primary-accent, #00ff9d)'};
                color: #000;
                padding: 0.5rem 1rem;
                border-radius: 6px;
                font-family: var(--cyber-font-mono, 'Courier New', monospace);
                z-index: 10001;
                box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            `;
            document.body.appendChild(toast);
            setTimeout(() => toast.remove(), 2400);
        }
    }

    document.addEventListener('DOMContentLoaded', () => {
        const init = () => {
            if (document.getElementById('community-art-feed')) {
                new CommunitySlapWall();
            }
        };
        if (typeof window.requestIdleCallback === 'function') {
            window.requestIdleCallback(init, { timeout: 1500 });
        } else {
            setTimeout(init, 300);
        }
    });
})();
