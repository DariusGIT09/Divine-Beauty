document.addEventListener('DOMContentLoaded', () => {

    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle
    const burger = document.querySelector('.burger-menu');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links a');

    if (burger) {
        burger.addEventListener('click', () => {
            // Toggle Nav
            nav.classList.toggle('nav-active');

            // Burger Animation
            burger.classList.toggle('toggle');
        });

        // Close menu when a link is clicked
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('nav-active');
                burger.classList.remove('toggle');
            });
        });
    }

    // Service Image Hover Logic
    const serviceCards = document.querySelectorAll('.service-card');

    serviceCards.forEach(card => {
        const primaryImg = card.querySelector('.img-primary');
        const secondaryImg = card.querySelector('.img-secondary');

        // Only apply if both images exist
        if (primaryImg && secondaryImg) {
            card.addEventListener('mouseenter', () => {
                primaryImg.classList.remove('visible');
                primaryImg.classList.add('hidden');

                secondaryImg.classList.remove('hidden');
                secondaryImg.classList.add('visible');
            });

            card.addEventListener('mouseleave', () => {
                primaryImg.classList.remove('hidden');
                primaryImg.classList.add('visible');

                secondaryImg.classList.remove('visible');
                secondaryImg.classList.add('hidden');
            });
        }
    });

    // Smooth Scrolling for Anchors
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});
