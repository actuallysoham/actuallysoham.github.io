document.addEventListener('DOMContentLoaded', function() {
    const topicCards = document.querySelectorAll('.topic-card');
    const publications = document.querySelectorAll('.publication');
    
    topicCards.forEach(card => {
        card.addEventListener('click', function() {
            const topic = this.dataset.topic;
            
            // Toggle active state of cards
            if (this.classList.contains('active')) {
                this.classList.remove('active');
                // Show all publications when no topic is selected
                publications.forEach(pub => pub.classList.remove('hidden'));
            } else {
                // Remove active state from all cards
                topicCards.forEach(c => c.classList.remove('active'));
                this.classList.add('active');
                
                // Filter publications
                publications.forEach(pub => {
                    const pubTags = pub.dataset.tags ? pub.dataset.tags.split(',') : [];
                    if (pubTags.includes(topic)) {
                        pub.classList.remove('hidden');
                    } else {
                        pub.classList.add('hidden');
                    }
                });
            }
            
            // Update year headers visibility
            document.querySelectorAll('.year-divider').forEach(year => {
                const yearPublications = year.nextElementSibling.querySelectorAll('.publication:not(.hidden)');
                year.style.display = yearPublications.length > 0 ? '' : 'none';
            });
        });
    });

    // Add BibTeX toggle functionality
    document.querySelectorAll('.bibtex-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const bibtex = this.dataset.bibtex;
            navigator.clipboard.writeText(bibtex).then(() => {
                // Optional: Show feedback
                const originalText = this.innerHTML;
                this.innerHTML = `
                    <svg class="copy-icon" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z"/>
                    </svg>
                    Copied!
                `;
                setTimeout(() => {
                    this.innerHTML = originalText;
                }, 2000);
            });
        });
    });

    // Tab functionality
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons and contents
            tabButtons.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));

            // Add active class to clicked button and corresponding content
            button.classList.add('active');
            document.getElementById(button.dataset.tab).classList.add('active');
        });
    });
}); 