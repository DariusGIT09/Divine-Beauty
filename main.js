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
