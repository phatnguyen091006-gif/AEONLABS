/* ===================================
   AEONLABS — Scripts v2
   =================================== */

document.addEventListener('DOMContentLoaded', () => {
    initNavbar();
    initScrollAnimations();
    initContactForm();
});

/* --- Navbar --- */
function initNavbar() {
    const navbar = document.getElementById('navbar');
    const toggle = document.getElementById('nav-toggle');
    const links = document.getElementById('nav-links');
    if (!navbar || !toggle || !links) return;

    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 60);
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

/* --- Scroll Animations --- */
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
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
    });

    elements.forEach(el => observer.observe(el));
}

/* --- n8n Webhook --- */
var N8N_WEBHOOK = 'https://ndrwngvn.app.n8n.cloud/webhook-test/184c3378-27d5-4062-9d4d-dcf4001340c4';

function sendToWebhook(payload) {
    return fetch(N8N_WEBHOOK, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });
}

/* --- Contact Form --- */
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

        sendToWebhook({
            name, email, company, service, message,
            source: 'AEONLABS Website — Contact Form',
            page: window.location.href
        }).then(function() {
            form.style.display = 'none';
            document.getElementById('form-success').style.display = 'block';
        }).catch(function() {
            form.style.display = 'none';
            document.getElementById('form-success').style.display = 'block';
        });
    });
}
