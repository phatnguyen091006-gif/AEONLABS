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

/* --- Make Webhook --- */
var MAKE_WEBHOOK = 'https://hook.eu1.make.com/wohza8zeumeslwma74esp8wqybpzurjv';

function sendToWebhook(payload) {
    return fetch(MAKE_WEBHOOK, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });
}

/* --- Contact Form --- */
function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    const errorMsg = document.getElementById('form-error');

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        const name = document.getElementById('c-name').value.trim();
        const email = document.getElementById('c-email').value.trim();
        const phone = document.getElementById('c-phone') ? document.getElementById('c-phone').value.trim() : '';
        const service = document.getElementById('c-service').value;
        const message = document.getElementById('c-message').value.trim();

        if (!name || !email || !service) {
            alert('Please fill in your name, email, and select a service.');
            return;
        }

        const btn = document.getElementById('contact-submit');
        btn.querySelector('span').textContent = 'Sending...';
        btn.disabled = true;
        if (errorMsg) errorMsg.style.display = 'none';

        sendToWebhook({
            name, email, phone, service, message,
            submittedAt: new Date().toISOString(),
            source: 'AEONLABS Website — Contact Form',
            page: window.location.href
        }).then(function(response) {
            if (response.ok) {
                form.style.display = 'none';
                document.getElementById('form-success').style.display = 'block';
            } else {
                throw new Error('Server responded with ' + response.status);
            }
        }).catch(function(err) {
            console.error('Submission error:', err);
            if (errorMsg) errorMsg.style.display = 'block';
            btn.querySelector('span').textContent = 'Send Message';
            btn.disabled = false;
        });
    });
}
