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
                this.innerHTML = 'Copied!';
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