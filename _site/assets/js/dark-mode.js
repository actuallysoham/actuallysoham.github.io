(function() {
    const THEMES = [
        { name: 'light',     icon: 'fa-sun' },
        { name: 'dark',      icon: 'fa-moon' },
        { name: 'edgy',      icon: 'fa-bolt' },
        { name: 'aesthetic', icon: 'fa-feather' },
        { name: 'retro',     icon: 'fa-floppy-disk' },
    ];

    function getTheme() {
        return localStorage.getItem('theme') || 'light';
    }

    function setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
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

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => setTheme(getTheme()));
    } else {
        setTheme(getTheme());
    }

    document.addEventListener('DOMContentLoaded', function() {
        const btn = document.querySelector('.dark-mode-toggle');
        if (btn) btn.addEventListener('click', cycleTheme);
    });
})();
