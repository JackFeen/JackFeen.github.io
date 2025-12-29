// Intersection Observer for scroll-triggered animations
document.addEventListener('DOMContentLoaded', function() {
    
    // Observer options
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    // Create observer for timeline elements
    const timelineObserver = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add a staggered delay based on order
                const delay = Array.from(document.querySelectorAll('.timeline-row, .season-marker'))
                    .indexOf(entry.target) * 100;
                
                setTimeout(() => {
                    entry.target.classList.add('fade-in');
                }, delay);
                
                timelineObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all timeline elements
    document.querySelectorAll('.timeline-row, .season-marker').forEach(el => {
        timelineObserver.observe(el);
    });

    // Observer for project cards
    const projectObserverOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -100px 0px'
    };

    const projectObserver = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add a staggered delay based on order
                const delay = Array.from(document.querySelectorAll('.project-card'))
                    .indexOf(entry.target) * 150;
                
                setTimeout(() => {
                    entry.target.classList.add('fade-in');
                }, delay);
                
                projectObserver.unobserve(entry.target);
            }
        });
    }, projectObserverOptions);

    // Observe all project cards
    document.querySelectorAll('.project-card').forEach(card => {
        projectObserver.observe(card);
    });

    // Dark theme toggle
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;

    // Check for saved theme preference or default to light mode
    const currentTheme = localStorage.getItem('theme') || 'light';
    if (currentTheme === 'dark') {
        body.classList.add('dark-theme');
        themeToggle.classList.add('active');
    }

    // Toggle theme on click
    themeToggle.addEventListener('click', function() {
        body.classList.toggle('dark-theme');
        themeToggle.classList.toggle('active');
        
        // Save preference to localStorage
        const theme = body.classList.contains('dark-theme') ? 'dark' : 'light';
        localStorage.setItem('theme', theme);
    });
});