(function() {
    const THEMES = [
        { name: 'light',     icon: 'fa-sun' },
        { name: 'dark',      icon: 'fa-moon' },
        { name: 'edgy',      icon: 'fa-bolt' },
        { name: 'aesthetic', icon: 'fa-feather' },
        { name: 'retro',     icon: 'fa-floppy-disk' },
    ];

    function getTheme() {
        return document.documentElement.getAttribute('data-theme') || 'light';
    }

    function setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        try { localStorage.setItem('theme', theme); } catch (e) {}
        updateIcon(theme);
    }

    function updateIcon(theme) {
        const icon = document.querySelector('.theme-icon');
        if (!icon) return;
        const entry = THEMES.find(t => t.name === theme) || THEMES[0];
        icon.className = `theme-icon fa-solid ${entry.icon}`;
    }

    function cycleTheme() {
        const current = getTheme();
        const idx = THEMES.findIndex(t => t.name === current);
        const next = THEMES[(idx + 1) % THEMES.length];
        setTheme(next.name);
    }

    // Only sync the icon on load; the theme itself is set in <head>, and is
    // persisted only when the visitor explicitly picks one.
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => updateIcon(getTheme()));
    } else {
        updateIcon(getTheme());
    }

    document.addEventListener('DOMContentLoaded', function() {
        const btn = document.querySelector('.dark-mode-toggle');
        if (btn) btn.addEventListener('click', cycleTheme);
    });
})();
