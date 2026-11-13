// People page: a floating cloud of faces.
// - Faces drift gently inside an ellipse and bump into each other.
// - Hover / focus / tap a face: name, how we're connected, and lines to
//   people we've written papers with.
// - Chips above the cloud filter by where we met (hover to preview, click to lock).
// - Drag faces around with a mouse. Without JS, the page is a plain grid.
(function () {
    const cloud = document.getElementById('people-cloud');
    const dataEl = document.getElementById('people-data');
    if (!cloud || !dataEl) return;

    const data = JSON.parse(dataEl.textContent);
    const links = Array.from(cloud.querySelectorAll('.person-link'));
    const svg = cloud.querySelector('.people-links');
    const card = cloud.querySelector('.person-card');
    const chips = Array.from(document.querySelectorAll('.pf-chip'));
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // ---------- Connections from publications ----------
    const norm = s => String(s)
        .replace(/[‡†*]/g, '')
        .replace(/\b[A-Z]\.\s*/g, '')      // drop middle initials
        .replace(/\s+/g, ' ')
        .trim()
        .toLowerCase();

    const people = data.people.map((p, i) => ({
        ...p, i, papers: [], linked: new Map() // linked: index -> shared paper count
    }));
    const byName = new Map();
    people.forEach(p => {
        byName.set(norm(p.name), p);
        (p.aliases || []).forEach(a => byName.set(norm(a), p));
    });

    const shortTitle = t => {
        let s = t.split(':')[0].trim();
        return s.length > 52 ? s.slice(0, 50).trim() + '…' : s;
    };

    data.papers.forEach(paper => {
        const inCloud = [];
        (paper.authors || []).forEach(a => {
            const p = byName.get(norm(a));
            if (p && !inCloud.includes(p)) inCloud.push(p);
        });
        inCloud.forEach(p => {
            p.papers.push({ title: shortTitle(paper.title), year: paper.year });
            inCloud.forEach(q => {
                if (q !== p) p.linked.set(q.i, (p.linked.get(q.i) || 0) + 1);
            });
        });
    });

    // ---------- Layout ----------
    const n = links.length;
    let W = 0, H = 0, cx = 0, cy = 0, ax = 0, by = 0, R = 40;
    const GAP = 12;

    // Shuffled sunflower spiral so the starting layout is even but unordered
    const order = links.map((_, i) => i).sort(() => Math.random() - 0.5);
    const nodes = links.map((el, i) => ({
        el, p: people[i], x: 0, y: 0, vx: 0, vy: 0,
        th: Math.random() * Math.PI * 2, s: 1, pinned: false
    }));

    function measure(first) {
        const oldW = W, oldH = H;
        W = cloud.clientWidth;
        H = W < 600 ? Math.round(W * 1.5) : Math.round(Math.min(W * 0.82, 700));
        cloud.style.height = H + 'px';
        cx = W / 2; cy = H / 2;
        ax = W / 2 - 4; by = H / 2 - 4;
        R = Math.max(24, Math.min(46, Math.sqrt(0.5 * ax * by / n)));
        cloud.style.setProperty('--size', (2 * R) + 'px');

        if (first) {
            const golden = Math.PI * (3 - Math.sqrt(5));
            order.forEach((k, j) => {
                const rho = Math.sqrt((j + 0.5) / n) * 0.92;
                const phi = j * golden;
                nodes[k].x = cx + rho * (ax - R) * Math.cos(phi);
                nodes[k].y = cy + rho * (by - R) * Math.sin(phi);
            });
        } else if (oldW && oldH) {
            nodes.forEach(nd => {
                nd.x = cx + (nd.x - oldW / 2) * (W / oldW);
                nd.y = cy + (nd.y - oldH / 2) * (H / oldH);
            });
        }
    }

    // ---------- State ----------
    let filter = null;        // locked place
    let preview = null;       // hovered place
    let active = null;        // node showing its card
    let drag = null;
    let tapArmed = null;      // touch: face whose card is showing; next tap opens the link

    const currentFilter = () => preview || filter;
    const matches = nd => {
        const f = currentFilter();
        return !f || nd.p.met === f;
    };

    // ---------- Simulation ----------
    function step() {
        const f = currentFilter();
        const wander = reduceMotion ? 0 : 0.035;

        nodes.forEach(nd => {
            if (nd.pinned) { nd.vx = nd.vy = 0; return; }
            nd.th += (Math.random() - 0.5) * 0.35;
            nd.vx += Math.cos(nd.th) * wander;
            nd.vy += Math.sin(nd.th) * wander;

            // Gravity: filtered-in faces gather in the middle
            let g = 0.0007;
            if (f) g = matches(nd) ? 0.004 : 0.0001;
            nd.vx += (cx - nd.x) * g;
            nd.vy += (cy - nd.y) * g * (W / H);

            nd.vx *= 0.9; nd.vy *= 0.9;
            const sp = Math.hypot(nd.vx, nd.vy), max = f ? 3 : 1.2;
            if (sp > max) { nd.vx *= max / sp; nd.vy *= max / sp; }
            nd.x += nd.vx; nd.y += nd.vy;
        });

        // Resolve overlaps (position based, a couple of passes)
        for (let pass = 0; pass < 2; pass++) {
            for (let i = 0; i < n; i++) {
                const a = nodes[i];
                for (let j = i + 1; j < n; j++) {
                    const b = nodes[j];
                    let dx = b.x - a.x, dy = b.y - a.y;
                    let d = Math.hypot(dx, dy);
                    const min = R * a.s + R * b.s + GAP;
                    if (d >= min) continue;
                    if (d < 0.01) { dx = Math.random() - 0.5; dy = Math.random() - 0.5; d = Math.hypot(dx, dy); }
                    const push = (min - d) / d;
                    const wa = a.pinned ? 0 : (b.pinned ? 1 : 0.5);
                    const wb = b.pinned ? 0 : (a.pinned ? 1 : 0.5);
                    a.x -= dx * push * wa; a.y -= dy * push * wa;
                    b.x += dx * push * wb; b.y += dy * push * wb;
                }
            }
        }

        // Keep everyone inside the ellipse
        nodes.forEach(nd => {
            const r = R * nd.s;
            const ex = (nd.x - cx) / (ax - r), ey = (nd.y - cy) / (by - r);
            const k = ex * ex + ey * ey;
            if (k > 1) {
                const s = 1 / Math.sqrt(k);
                nd.x = cx + (nd.x - cx) * s;
                nd.y = cy + (nd.y - cy) * s;
                nd.vx *= -0.3; nd.vy *= -0.3;
            }
        });
    }

    // ---------- Rendering ----------
    function render() {
        const f = currentFilter();
        nodes.forEach(nd => {
            const target = f && !matches(nd) ? 0.72 : 1;
            nd.s += (target - nd.s) * 0.12;
            nd.el.style.transform =
                `translate(${(nd.x - R).toFixed(1)}px, ${(nd.y - R).toFixed(1)}px) scale(${nd.s.toFixed(3)})`;
        });
        if (active) drawConnections();
    }

    function drawConnections() {
        const a = active;
        let html = '';
        a.p.linked.forEach((count, j) => {
            const b = nodes[j];
            const w = Math.min(1 + count * 0.5, 2.5);
            html += `<line x1="${a.x.toFixed(1)}" y1="${a.y.toFixed(1)}" x2="${b.x.toFixed(1)}" y2="${b.y.toFixed(1)}" stroke-width="${w}"/>`;
        });
        svg.innerHTML = html;
        placeCard();
    }

    // ---------- Hover card ----------
    const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

    // Notes may contain Markdown-style links: [text](https://...)
    const linkify = s => esc(s).replace(/\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g,
        (_, t, u) => `<a href="${u}" target="_blank" rel="noopener">${t}</a>`);

    function fillCard(p, touch) {
        let html = `<div class="pc-name">${esc(p.name)}</div>`;
        if (p.note) html += `<div class="pc-note">${linkify(p.note)}</div>`;
        if (p.papers.length) {
            const k = p.papers.length;
            html += `<div class="pc-papers"><div class="pc-label">${k} paper${k > 1 ? 's' : ''} together</div><ul>`;
            p.papers.slice(0, 3).forEach(pp => { html += `<li>${esc(pp.title)}${pp.year ? ` <span>${esc(pp.year)}</span>` : ''}</li>`; });
            if (k > 3) html += `<li class="pc-more">+${k - 3} more</li>`;
            html += `</ul></div>`;
        }
        if (p.linked.size) {
            html += `<div class="pc-linked">Lines show ${p.linked.size} co-author${p.linked.size > 1 ? 's' : ''} here</div>`;
        }
        if (touch) html += `<div class="pc-hint">Tap again to open their page →</div>`;
        card.innerHTML = html;
        card.classList.toggle('has-link', !!card.querySelector('a'));
    }

    function placeCard() {
        const a = active;
        const cw = card.offsetWidth, ch = card.offsetHeight;
        const r = R * a.s;
        let left = a.x - cw / 2;
        left = Math.max(0, Math.min(W - cw, left));
        let top = a.y - r - ch - 10;
        if (top < 0) top = a.y + r + 10;
        card.style.transform = `translate(${left.toFixed(1)}px, ${top.toFixed(1)}px)`;
    }

    // Cards with links stay open briefly so the pointer can reach them
    let hideTimer = null;
    function cancelHide() { clearTimeout(hideTimer); hideTimer = null; }
    function softHide() {
        cancelHide();
        if (card.classList.contains('has-link')) hideTimer = setTimeout(deactivate, 250);
        else deactivate();
    }
    card.addEventListener('pointerenter', e => { if (e.pointerType === 'mouse') cancelHide(); });
    card.addEventListener('pointerleave', e => { if (e.pointerType === 'mouse' && !drag) softHide(); });

    function activate(nd, touch) {
        cancelHide();
        if (active === nd) {
            if (touch) { fillCard(nd.p, true); placeCard(); }
            return;
        }
        deactivate();
        active = nd;
        nd.pinned = true;
        cloud.classList.add('has-active');
        nd.el.classList.add('is-active');
        nd.p.linked.forEach((_, j) => nodes[j].el.classList.add('is-linked'));
        fillCard(nd.p, touch);
        card.hidden = false;
        drawConnections();
    }

    function deactivate() {
        cancelHide();
        if (!active) return;
        if (!drag || drag.node !== active) active.pinned = false;
        active.el.classList.remove('is-active');
        nodes.forEach(o => o.el.classList.remove('is-linked'));
        cloud.classList.remove('has-active');
        svg.innerHTML = '';
        card.hidden = true;
        active = null;
        tapArmed = null;
    }

    // ---------- Pointer interaction ----------
    function localPoint(e) {
        const rect = cloud.getBoundingClientRect();
        return { x: e.clientX - rect.left, y: e.clientY - rect.top };
    }

    nodes.forEach(nd => {
        const el = nd.el;

        el.addEventListener('pointerenter', e => { if (e.pointerType === 'mouse' && !drag) activate(nd); });
        el.addEventListener('pointerleave', e => { if (e.pointerType === 'mouse' && !drag) softHide(); });
        el.addEventListener('focus', () => activate(nd));
        el.addEventListener('blur', e => { if (!card.contains(e.relatedTarget)) deactivate(); });

        // Dragging: mouse/pen only, so touch screens can still scroll
        el.addEventListener('pointerdown', e => {
            nd.lastPointer = e.pointerType;
            if (e.pointerType === 'touch' || e.button !== 0) return;
            const pt = localPoint(e);
            drag = { node: nd, id: e.pointerId, sx: pt.x, sy: pt.y, ox: nd.x - pt.x, oy: nd.y - pt.y, moved: false, lx: pt.x, ly: pt.y, vx: 0, vy: 0 };
            el.setPointerCapture(e.pointerId);
        });
        el.addEventListener('pointermove', e => {
            if (!drag || drag.id !== e.pointerId) return;
            const pt = localPoint(e);
            if (!drag.moved && Math.hypot(pt.x - drag.sx, pt.y - drag.sy) > 5) {
                drag.moved = true;
                cloud.classList.add('is-dragging');
            }
            if (drag.moved) {
                nd.pinned = true;
                nd.x = pt.x + drag.ox; nd.y = pt.y + drag.oy;
                drag.vx = pt.x - drag.lx; drag.vy = pt.y - drag.ly;
                drag.lx = pt.x; drag.ly = pt.y;
            }
        });
        const endDrag = e => {
            if (!drag || drag.id !== e.pointerId) return;
            const d = drag;
            drag = null;
            cloud.classList.remove('is-dragging');
            if (d.moved) {
                el.dataset.dragged = '1';
                nd.pinned = false;                        // let it go; the card follows
                nd.vx = d.vx * 0.6; nd.vy = d.vy * 0.6;   // a gentle fling
            }
        };
        el.addEventListener('pointerup', endDrag);
        el.addEventListener('pointercancel', endDrag);

        el.addEventListener('click', e => {
            if (el.dataset.dragged) { delete el.dataset.dragged; e.preventDefault(); return; }
            // Touch: first tap shows the card, second tap follows the link.
            // (Tapping also focuses the link, which opens the card, so we can't
            // rely on `active` here; track the first tap explicitly.)
            const touch = e.pointerType === 'touch' || nd.lastPointer === 'touch' ||
                (!e.pointerType && !window.matchMedia('(hover: hover)').matches);
            if (touch && tapArmed !== nd) {
                e.preventDefault();
                activate(nd, true);
                tapArmed = nd;
            }
        });
        el.addEventListener('dragstart', e => e.preventDefault());
    });

    // Tap outside a face closes the card
    document.addEventListener('pointerdown', e => {
        if (active && !e.target.closest('.person-link, .person-card')) deactivate();
    });

    // ---------- Filters (where we met) ----------
    function applyFilterClasses() {
        const f = currentFilter();
        cloud.classList.toggle('is-filtering', !!f);
        nodes.forEach(nd => nd.el.classList.toggle('is-match', !!f && matches(nd)));
        chips.forEach(c => {
            const on = (c.dataset.place || null) === filter;
            c.classList.toggle('is-active', on);
            c.setAttribute('aria-pressed', on ? 'true' : 'false');
        });
    }

    chips.forEach(chip => {
        const place = chip.dataset.place || null;
        chip.addEventListener('mouseenter', () => { if (place) { preview = place; applyFilterClasses(); } });
        chip.addEventListener('mouseleave', () => { preview = null; applyFilterClasses(); });
        chip.addEventListener('click', () => {
            filter = place && filter !== place ? place : null;
            preview = null;
            applyFilterClasses();
        });
    });

    // ---------- Run ----------
    cloud.classList.add('is-floating');
    measure(true);
    for (let k = 0; k < 120; k++) step();   // settle before first paint
    render();
    requestAnimationFrame(() => cloud.classList.add('is-ready'));

    let visible = true, raf = null;
    function loop() {
        raf = null;
        if (!visible || document.hidden) return;
        step();
        render();
        raf = requestAnimationFrame(loop);
    }
    function kick() { if (!raf) raf = requestAnimationFrame(loop); }

    if ('IntersectionObserver' in window) {
        new IntersectionObserver(entries => {
            visible = entries[0].isIntersecting;
            if (visible) kick();
        }).observe(cloud);
    }
    document.addEventListener('visibilitychange', kick);
    if ('ResizeObserver' in window) {
        let lastW = cloud.clientWidth;
        new ResizeObserver(() => {
            if (cloud.clientWidth !== lastW) { lastW = cloud.clientWidth; measure(false); kick(); }
        }).observe(cloud);
    }
    kick();
})();
