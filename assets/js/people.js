document.addEventListener('DOMContentLoaded', function() {
    const grid = document.querySelector('.people-grid');
    const tags = document.querySelectorAll('.highlight-tag');

    tags.forEach(tag => {
        tag.addEventListener('mouseenter', () => {
            const tagType = tag.dataset.tag;
            grid.classList.add('filtering');
            
            document.querySelectorAll('.person-link').forEach(person => {
                const personTags = person.dataset.tags.split(',');
                if (personTags.includes(tagType)) {
                    person.classList.add('highlight');
                }
            });
        });

        tag.addEventListener('mouseleave', () => {
            grid.classList.remove('filtering');
            document.querySelectorAll('.person-link').forEach(person => {
                person.classList.remove('highlight');
            });
        });
    });
}); 