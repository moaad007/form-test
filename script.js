const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

document.addEventListener('DOMContentLoaded', () => {
    const testimonialContainer = document.querySelector('.testimonial-cards');
    
    // Clone testimonials for smooth infinite scroll
    function cloneTestimonials() {
        const testimonials = document.querySelectorAll('.testimonial-card');
        testimonials.forEach(card => {
            const clone = card.cloneNode(true);
            testimonialContainer.appendChild(clone);
        });
    }

    // Only apply for mobile screens
    if (window.innerWidth <= 968) {
        cloneTestimonials();
    }

    // Update on resize
    window.addEventListener('resize', () => {
        if (window.innerWidth <= 968) {
            // Check if cards aren't already cloned
            if (document.querySelectorAll('.testimonial-card').length <= 3) {
                cloneTestimonials();
            }
        }
    });
});

