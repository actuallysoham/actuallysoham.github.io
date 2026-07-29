function layoutJustifiedRows(grid) {
    // Collect the flat list of photo items once, before any row wrappers exist.
    let items = grid.__photoItems;
    if (!items) {
        items = Array.from(grid.querySelectorAll('.photo-item'));
        grid.__photoItems = items;
    }
    const imgs = items.map(function(item) { return item.querySelector('img'); });

    Promise.all(imgs.map(function(img) {
        if (img.complete && img.naturalWidth) return Promise.resolve();
        return new Promise(function(resolve) {
            img.addEventListener('load', resolve, { once: true });
            img.addEventListener('error', resolve, { once: true });
        });
    })).then(function() {
        const gap = window.innerWidth < 700 ? 6 : 10;
        const targetHeight = window.innerWidth < 700 ? 160 : 260;
        const gridStyle = getComputedStyle(grid);
        const containerWidth = grid.clientWidth - parseFloat(gridStyle.paddingLeft) - parseFloat(gridStyle.paddingRight);

        const rows = [];
        let row = [];
        let rowAspectSum = 0;

        function flushRow(stretch) {
            if (!row.length) return;
            const scale = stretch
                ? (containerWidth - gap * (row.length - 1)) / (rowAspectSum * targetHeight)
                : 1;
            const rowHeight = targetHeight * scale;
            row.forEach(function(entry) {
                entry.width = Math.round(entry.aspect * rowHeight);
                entry.height = Math.round(rowHeight);
            });
            rows.push(row);
            row = [];
            rowAspectSum = 0;
        }

        items.forEach(function(item, i) {
            const img = imgs[i];
            const aspect = (img.naturalWidth && img.naturalHeight) ? (img.naturalWidth / img.naturalHeight) : 1.5;
            row.push({ item: item, aspect: aspect });
            rowAspectSum += aspect;
            const rowWidthAtTarget = rowAspectSum * targetHeight + gap * (row.length - 1);
            if (rowWidthAtTarget >= containerWidth) flushRow(true);
        });
        flushRow(false);

        grid.innerHTML = '';
        rows.forEach(function(rowEntries) {
            const rowEl = document.createElement('div');
            rowEl.className = 'photo-row';
            rowEntries.forEach(function(entry) {
                entry.item.style.width = entry.width + 'px';
                entry.item.style.height = entry.height + 'px';
                rowEl.appendChild(entry.item);
            });
            grid.appendChild(rowEl);
        });
    });
}

document.addEventListener('DOMContentLoaded', function() {
    const grid = document.querySelector('.photo-grid');
    const lightbox = document.querySelector('.gallery-lightbox');
    if (!grid) return;

    layoutJustifiedRows(grid);
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() { layoutJustifiedRows(grid); }, 150);
    });

    if (!lightbox) return;

    const items = Array.from(grid.querySelectorAll('.photo-item')).map(function(item) {
        return {
            full: item.getAttribute('data-full'),
            caption: item.getAttribute('data-caption') || ''
        };
    });

    const lightboxImg = lightbox.querySelector('img');
    const lightboxCaption = lightbox.querySelector('.lightbox-caption');
    let currentIndex = 0;

    function show(index) {
        currentIndex = (index + items.length) % items.length;
        const photo = items[currentIndex];
        lightboxImg.src = photo.full;
        lightboxCaption.textContent = photo.caption;
    }

    function open(index) {
        show(index);
        lightbox.classList.add('active');
    }

    function close() {
        lightbox.classList.remove('active');
        lightboxImg.src = '';
    }

    grid.querySelectorAll('.photo-item').forEach(function(item, index) {
        item.addEventListener('click', function() {
            open(index);
        });
    });

    lightbox.querySelector('.lightbox-close').addEventListener('click', close);
    lightbox.querySelector('.lightbox-prev').addEventListener('click', function(e) {
        e.stopPropagation();
        show(currentIndex - 1);
    });
    lightbox.querySelector('.lightbox-next').addEventListener('click', function(e) {
        e.stopPropagation();
        show(currentIndex + 1);
    });

    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) close();
    });

    document.addEventListener('keydown', function(e) {
        if (!lightbox.classList.contains('active')) return;
        if (e.key === 'Escape') close();
        if (e.key === 'ArrowLeft') show(currentIndex - 1);
        if (e.key === 'ArrowRight') show(currentIndex + 1);
    });
});
