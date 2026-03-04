document.addEventListener('DOMContentLoaded', () => {

    // Navbar and Hero Scroll Effects
    const navbar = document.querySelector('.navbar');
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    let isScrolling = false;

    window.addEventListener('scroll', () => {
        if (!isScrolling) {
            window.requestAnimationFrame(() => {
                const scrolled = window.scrollY;
                if (scrolled > 50) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }

                if (hero && heroContent && scrolled < window.innerHeight) {
                    const rate = scrolled * 0.3;
                    heroContent.style.transform = `translateY(${rate}px)`;
                    heroContent.style.opacity = Math.max(0, 1 - (scrolled / (window.innerHeight * 0.8)));
                }

                isScrolling = false;
            });
            isScrolling = true;
        }
    }, { passive: true });

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

    // ============================================
    // PREMIUM 10X ENHANCEMENTS
    // ============================================

    // --- Scroll Reveal Animation ---
    const revealElements = document.querySelectorAll('.reveal, .reveal-scale, .reveal-left, .reveal-right, .reveal-chain');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // --- Image Loading with Fade ---
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        if (img.complete) {
            img.classList.add('loaded');
        } else {
            img.addEventListener('load', () => {
                img.classList.add('loaded');
            });
            img.addEventListener('error', () => {
                img.classList.add('loaded'); // Show anyway on error
            });
        }
    });

    // --- Floating Particles System ---
    function createParticles() {
        const container = document.createElement('div');
        container.className = 'particles-container';
        document.body.appendChild(container);

        const particleCount = window.innerWidth <= 768 ? 8 : 15;

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';

            // Random positioning and timing
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 15 + 's';
            particle.style.animationDuration = (15 + Math.random() * 10) + 's';

            // Random size variation
            const size = 2 + Math.random() * 4;
            particle.style.width = size + 'px';
            particle.style.height = size + 'px';

            container.appendChild(particle);
        }
    }

    // Only create particles on homepage
    if (document.body.classList.contains('homepage')) {
        createParticles();
    }

    // --- Hero Parallax Effect (now handled in the unified scroll listener above) ---

    // --- Add reveal classes to elements ---
    function addRevealClasses() {
        // Section titles
        document.querySelectorAll('.section-title').forEach((el, i) => {
            if (!el.classList.contains('reveal')) {
                el.classList.add('reveal');
            }
        });

        // Feature cards with stagger
        document.querySelectorAll('.feature-card').forEach((el, i) => {
            if (!el.classList.contains('reveal')) {
                el.classList.add('reveal', 'stagger-' + Math.min(i + 1, 5));
            }
        });

        // Featured cards with stagger
        document.querySelectorAll('.featured-card').forEach((el, i) => {
            if (!el.classList.contains('reveal-scale')) {
                el.classList.add('reveal-scale', 'stagger-' + Math.min(i + 1, 5));
            }
        });

        // Service cards with chained sequential reveal and long stagger
        document.querySelectorAll('.service-card').forEach((el, i) => {
            if (!el.classList.contains('reveal-chain')) {
                el.classList.add('reveal-chain', 'stagger-long-' + Math.min((i % 8) + 1, 8));
            }
        });

        // Founder section
        const founderContent = document.querySelector('.founder-content');
        const founderImage = document.querySelector('.founder-image-wrapper');
        if (founderContent && !founderContent.classList.contains('reveal-left')) {
            founderContent.classList.add('reveal-left');
        }
        if (founderImage && !founderImage.classList.contains('reveal-right')) {
            founderImage.classList.add('reveal-right');
        }

        // Luxury separators
        document.querySelectorAll('.luxury-separator-custom').forEach(el => {
            if (!el.classList.contains('reveal-scale')) {
                el.classList.add('reveal-scale');
            }
        });

        // Paragraphs in sections
        document.querySelectorAll('.section-desc, .intro p, .founder-text').forEach(el => {
            if (!el.classList.contains('reveal')) {
                el.classList.add('reveal');
            }
        });

        // Buttons
        document.querySelectorAll('.featured-services .btn, .founder-section .btn').forEach(el => {
            if (!el.classList.contains('reveal')) {
                el.classList.add('reveal');
            }
        });

        // Re-observe new elements
        document.querySelectorAll('.reveal, .reveal-scale, .reveal-left, .reveal-right, .reveal-chain').forEach(el => {
            revealObserver.observe(el);
        });
    }

    // Add reveal classes after short delay to ensure DOM is ready
    setTimeout(addRevealClasses, 100);

});

// Contact Form Handling with EmailJS
const contactForm = document.getElementById('contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', function (event) {
        event.preventDefault();

        // Show loading state
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.innerText;
        submitBtn.innerText = 'Se trimite...';
        submitBtn.disabled = true;

        // Generate a random 5-digit number for the contact_number variable
        this.contact_number.value = Math.random() * 100000 | 0;

        // Service and Template IDs (User needs to replace these)
        const serviceID = 'service_xm9yznh';
        const templateID = 'template_h0lfufu';

        emailjs.sendForm(serviceID, templateID, this)
            .then(() => {
                // Success
                submitBtn.innerText = 'Mesaj Trimis!';
                submitBtn.style.backgroundColor = '#4CD964'; // Success Green
                submitBtn.style.borderColor = '#4CD964';
                contactForm.reset();

                setTimeout(() => {
                    submitBtn.innerText = originalBtnText;
                    submitBtn.disabled = false;
                    submitBtn.style.backgroundColor = '';
                    submitBtn.style.borderColor = '';
                }, 3000);
            }, (err) => {
                // Error
                submitBtn.innerText = 'Eroare!';
                submitBtn.style.backgroundColor = '#FF3B30'; // Error Red
                submitBtn.style.borderColor = '#FF3B30';
                console.log('FAILED...', err);
                alert('A apărut o eroare la trimitere. Te rugăm să ne contactezi telefonic.');

                setTimeout(() => {
                    submitBtn.innerText = originalBtnText;
                    submitBtn.disabled = false;
                    submitBtn.style.backgroundColor = '';
                    submitBtn.style.borderColor = '';
                }, 3000);
            });
    });
};
