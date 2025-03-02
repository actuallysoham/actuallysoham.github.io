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
}); 