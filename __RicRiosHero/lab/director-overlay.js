// Director overlay: glass chips that appear at bottom-left
let host;
function ensureHost() {
  if (!host) {
    host = document.createElement('div');
    host.className = 'director-host';
    document.body.appendChild(host);
  }
  return host;
}

export function createDirector() {
  ensureHost();
  const chips = new Set();

  function show(text, ms = 1400) {
    const chip = document.createElement('div');
    chip.className = 'director-chip';
    chip.textContent = text;
    ensureHost().appendChild(chip);
    chips.add(chip);
    requestAnimationFrame(()=> chip.classList.add('in'));
    const t1 = setTimeout(()=> chip.classList.add('out'), Math.max(400, ms));
    const t2 = setTimeout(()=> { chip.remove(); chips.delete(chip); }, Math.max(800, ms + 250));
    return () => { clearTimeout(t1); clearTimeout(t2); chip.remove(); chips.delete(chip); };
  }

  function clear() {
    chips.forEach(c => c.remove());
    chips.clear();
  }

  return { show, clear };
}
