/**
 * HPC Institute – main.js
 * Loaded with defer – no render blocking
 * Minimal vanilla JS for best PageSpeed score
 */

(function () {
  'use strict';

  /* ── Smooth scroll for any anchor href="#..." ── */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* ── Reveal instructor photos if WebP files exist ── */
  document.querySelectorAll('.instructor-photo').forEach(function (img) {
    img.addEventListener('load', function () {
      this.style.display = 'block';
      var avatar = this.previousElementSibling;
      if (avatar && avatar.classList.contains('instructor-avatar')) {
        avatar.style.display = 'none';
      }
    });
  });

  /* ── Basic form validation ── */
  var form = document.getElementById('lead-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var nombre = document.getElementById('nombre');
      var email = document.getElementById('email');
      var telefono = document.getElementById('telefono');
      var valid = true;

      [nombre, email, telefono].forEach(function (field) {
        field.style.borderColor = '';
      });

      if (!nombre.value.trim()) {
        nombre.style.borderColor = '#e53e3e';
        valid = false;
      }

      var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email.value.trim())) {
        email.style.borderColor = '#e53e3e';
        valid = false;
      }

      if (!telefono.value.trim()) {
        telefono.style.borderColor = '#e53e3e';
        valid = false;
      }

      if (!valid) return;

      /* ── PLACEHOLDER: Replace this block with your actual form submission logic ──
         Options:
           1. Replace the <form> in index.html with your ActiveCampaign / MailChimp
              embed code (provided to you).
           2. Or post to your own backend endpoint here via fetch().
         Example fetch:
         fetch('/api/leads', {
           method: 'POST',
           headers: { 'Content-Type': 'application/json' },
           body: JSON.stringify({
             nombre: nombre.value.trim(),
             email: email.value.trim(),
             telefono: telefono.value.trim()
           })
         }).then(function(res) {
           if (res.ok) window.location.href = '/gracias';
         });
      ──────────────────────────────────────────────────────────────────────────── */

      /* Temporary success UI until real form is wired */
      var btn = form.querySelector('button[type="submit"]');
      btn.textContent = '✓ ¡Lugar reservado!';
      btn.disabled = true;
      btn.style.background = '#22c55e';
      btn.style.color = '#fff';
      btn.style.boxShadow = 'none';
    });
  }

  /* ── Intersection Observer for staggered card animation ── */
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.style.animationPlayState = 'running';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.pain-card, .learn-list li, .instructor-card, .testimonial-card').forEach(function (el, i) {
      el.style.animationDelay = (i * 80) + 'ms';
      el.style.animationPlayState = 'paused';
      observer.observe(el);
    });
  }

})();
