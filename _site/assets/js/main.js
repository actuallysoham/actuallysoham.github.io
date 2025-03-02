document.addEventListener('DOMContentLoaded', function() {
    const showMoreBtn = document.getElementById('show-more-news');
    const olderNews = document.getElementById('older-news');
    
    if (showMoreBtn && olderNews) {
        showMoreBtn.addEventListener('click', function(e) {
            e.preventDefault();
            olderNews.classList.toggle('hidden');
            this.textContent = olderNews.classList.contains('hidden') ? 'Show older' : 'Show less';
        });
    }
}); 