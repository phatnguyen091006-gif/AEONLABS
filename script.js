/* ===================================
   AEONLABS AI Marketing — Scripts
   =================================== */

document.addEventListener('DOMContentLoaded', () => {
    initNavbar();
    initScrollAnimations();
    initParticles();
    initCountUp();
    initContactForm();
});

/* --- Navbar Scroll Effect --- */
function initNavbar() {
    const navbar = document.getElementById('navbar');
    const toggle = document.getElementById('nav-toggle');
    const links = document.getElementById('nav-links');
    if (!navbar || !toggle || !links) return;

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
    if (!elements.length) return;

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
    if (!counters.length) return;

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

/* --- Go High Level Integration --- */
var GHL_WEBHOOK = 'https://services.leadconnectorhq.com/hooks/tYIxCosCGk6xIbPT7uJp/webhook-trigger/c6949617-2508-4085-b6db-1464aa7aeb7d';

function sendToGHL(payload) {
    return fetch(GHL_WEBHOOK, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        mode: 'no-cors'
    });
}

/* --- Contact Form Handler --- */
function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        const name = document.getElementById('c-name').value.trim();
        const email = document.getElementById('c-email').value.trim();
        const company = document.getElementById('c-company').value.trim();
        const service = document.getElementById('c-service').value;
        const message = document.getElementById('c-message').value.trim();

        if (!name || !email) return;

        const btn = document.getElementById('contact-submit');
        btn.querySelector('span').textContent = 'Sending...';
        btn.disabled = true;

        // Send to Go High Level
        sendToGHL({
            name: name,
            email: email,
            company: company,
            service: service,
            message: message,
            source: 'AEONLABS Website — Contact Form',
            page: window.location.href
        }).then(function() {
            form.style.display = 'none';
            document.getElementById('form-success').style.display = 'block';
        }).catch(function() {
            // no-cors mode doesn't return readable responses, so treat as success
            form.style.display = 'none';
            document.getElementById('form-success').style.display = 'block';
        });
    });
}
