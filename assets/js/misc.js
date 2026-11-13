document.addEventListener('DOMContentLoaded', function() {
    const showMoreBtn = document.getElementById('show-more-movies');
    const moreMovies = document.getElementById('more-movies');

    if (showMoreBtn && moreMovies) {
        showMoreBtn.addEventListener('click', function(e) {
            e.preventDefault();
            moreMovies.classList.toggle('hidden');
            showMoreBtn.textContent = moreMovies.classList.contains('hidden') ? 'Show more ↓' : 'Show less ↑';
        });
    }

    const profileImg = document.querySelector('.profile-img');
    if (profileImg) {
        const images = [
            '/assets/images/profile.jpg',
            '/assets/images/profile_sunglass.png',
            '/assets/images/profile_oakley.png'
        ];
        let idx = 0;

        profileImg.addEventListener('click', function() {
            if (profileImg.dataset.switching) return;
            profileImg.dataset.switching = 'true';

            profileImg.style.opacity = '0';
            setTimeout(() => {
                idx = (idx + 1) % images.length;
                profileImg.src = images[idx];
                profileImg.style.opacity = '1';
                delete profileImg.dataset.switching;
            }, 150);
        });
    }
}); 
// Expand shortened author lists
document.addEventListener('click', function(e) {
    const btn = e.target.closest('.authors-toggle');
    if (!btn) return;
    const p = btn.closest('.authors');
    p.querySelector('.authors-short').hidden = true;
    p.querySelector('.authors-full').hidden = false;
});
