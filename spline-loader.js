/* ===================================
   AEONLABS — Spline 3D Loader
   Lazy loads Spline models with fallback
   =================================== */
(function(){
'use strict';

// Configure Spline scene URLs here. Leave empty to use fallback content.
var SPLINE_CONFIG = {
    'hero-3d':          '', // Hero background 3D scene
    'about-3d':         '', // About section (replaces canvas globe)
    'services-hero-3d': '', // Services page hero
    'results-hero-3d':  '', // Case Studies page hero
    'about-hero-3d':    '', // About page hero
    'contact-3d':       ''  // Contact page visual
};

var viewerLoaded = false;

function loadViewer(cb) {
    if (viewerLoaded) return cb();
    var script = document.createElement('script');
    script.type = 'module';
    script.src = 'https://unpkg.com/@splinetool/viewer@1.9.82/build/spline-viewer.js';
    script.onload = function() { viewerLoaded = true; cb(); };
    script.onerror = function() { console.warn('Spline viewer failed to load'); };
    document.head.appendChild(script);
}

function initSpline() {
    var containers = document.querySelectorAll('.spline-container[id]');
    if (!containers.length) return;

    var observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (!entry.isIntersecting) return;
            var el = entry.target;
            var id = el.id;
            var url = el.getAttribute('data-spline-url') || SPLINE_CONFIG[id] || '';
            if (!url) return; // Keep fallback content

            observer.unobserve(el);
            el.classList.add('loading');

            loadViewer(function() {
                var viewer = document.createElement('spline-viewer');
                viewer.setAttribute('url', url);
                viewer.setAttribute('loading-anim-type', 'none');
                viewer.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;';

                // Hide fallback when loaded
                viewer.addEventListener('load', function() {
                    el.classList.remove('loading');
                    var fb = el.querySelector('.spline-fallback');
                    if (fb) fb.style.display = 'none';
                    // Disable globe if Spline took over
                    if (id === 'about-3d' && window.GLOBE_ENABLED !== undefined) {
                        window.GLOBE_ENABLED = false;
                    }
                });

                el.appendChild(viewer);
            });
        });
    }, { rootMargin: '200px' });

    containers.forEach(function(c) { observer.observe(c); });
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initSpline);
else initSpline();
})();
