/* ===================================
   AEONLABS AI Marketing — Scripts
   =================================== */

document.addEventListener('DOMContentLoaded', () => {
    initNavbar();
    initScrollAnimations();
    initParticles();
    initCountUp();
    initSmoothScroll();
});

/* --- Navbar Scroll Effect --- */
function initNavbar() {
    const navbar = document.getElementById('navbar');
    const toggle = document.getElementById('nav-toggle');
    const links = document.getElementById('nav-links');

    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 80);
    });

    toggle.addEventListener('click', () => {
        toggle.classList.toggle('active');
        links.classList.toggle('open');
    });

    links.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            toggle.classList.remove('active');
            links.classList.remove('open');
        });
    });
}

/* --- Scroll-triggered Animations --- */
function initScrollAnimations() {
    const elements = document.querySelectorAll('[data-animate]');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.getAttribute('data-delay') || 0;
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, parseInt(delay));
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    elements.forEach(el => observer.observe(el));
}

/* --- Hero Particles --- */
function initParticles() {
    const container = document.getElementById('hero-particles');
    if (!container) return;

    for (let i = 0; i < 40; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');

        const x = Math.random() * 100;
        const y = 50 + Math.random() * 50;
        const size = 1 + Math.random() * 2;
        const duration = 5 + Math.random() * 8;
        const delay = Math.random() * 8;

        particle.style.left = `${x}%`;
        particle.style.top = `${y}%`;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.animationDuration = `${duration}s`;
        particle.style.animationDelay = `${delay}s`;

        container.appendChild(particle);
    }
}

/* --- Count-up Animation --- */
function initCountUp() {
    const counters = document.querySelectorAll('[data-count]');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseInt(el.getAttribute('data-count'));
                animateCount(el, target);
                observer.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
}

function animateCount(el, target) {
    const duration = 2000;
    const startTime = performance.now();

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(eased * target);
        if (progress < 1) requestAnimationFrame(update);
    }

    requestAnimationFrame(update);
}

/* --- Smooth Scroll --- */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = 80;
                const y = target.getBoundingClientRect().top + window.pageYOffset - offset;
                window.scrollTo({ top: y, behavior: 'smooth' });
            }
        });
    });
}

