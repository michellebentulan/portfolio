/**
 * Portfolio Interaction Logic
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Intersection Observer for Scroll Animations
    // We want elements to slide up and fade in smoothly as they enter the viewport.
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1 // Trigger when 10% of element is visible
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add the class that transitions opacity and transform
                entry.target.classList.add('is-visible');
                // Stop observing once revealed so animation only plays once
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Select all elements we want to animate on scroll
    const animatedElements = document.querySelectorAll('.fade-in, .fade-in-up');
    
    animatedElements.forEach(el => {
        revealObserver.observe(el);
    });

    // 2. Trigger initial animations for Hero section immediately
    // Wait a tiny bit for render
    setTimeout(() => {
        const heroElements = document.querySelectorAll('#home .fade-in-up');
        heroElements.forEach(el => {
            el.classList.add('is-visible');
            revealObserver.unobserve(el);
        });
    }, 100);

    // 3. Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

});
