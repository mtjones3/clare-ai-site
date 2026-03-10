(function () {
  'use strict';

  // ---- Dynamic copyright year ----
  var yearEl = document.getElementById('footerYear');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ---- Navbar scroll effect (only on pages with hero, not .solid nav) ----
  var nav = document.getElementById('nav');
  if (nav && !nav.classList.contains('solid')) {
    function onScroll() {
      if (window.scrollY > 50) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // ---- Mobile menu toggle ----
  var toggle = document.getElementById('navToggle');
  var navLinks = document.getElementById('navLinks');
  var overlay = document.getElementById('navOverlay');

  if (toggle && navLinks) {
    function closeMenu() {
      navLinks.classList.remove('open');
      toggle.classList.remove('active');
      if (overlay) overlay.classList.remove('active');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }

    function openMenu() {
      navLinks.classList.add('open');
      toggle.classList.add('active');
      if (overlay) overlay.classList.add('active');
      toggle.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    }

    toggle.addEventListener('click', function () {
      navLinks.classList.contains('open') ? closeMenu() : openMenu();
    });

    if (overlay) overlay.addEventListener('click', closeMenu);

    var links = navLinks.querySelectorAll('a');
    for (var i = 0; i < links.length; i++) {
      links[i].addEventListener('click', closeMenu);
    }
  }

  // ---- Intersection Observer for fade-in animations ----
  var fadeEls = document.querySelectorAll('.fade-up');

  if ('IntersectionObserver' in window && fadeEls.length) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    fadeEls.forEach(function (el) { observer.observe(el); });
  } else {
    fadeEls.forEach(function (el) { el.classList.add('visible'); });
  }

  // ---- Contact form validation (only on pages with the form) ----
  var form = document.getElementById('contactForm');
  var formSuccess = document.getElementById('formSuccess');

  if (form && formSuccess) {
    function showError(id) {
      var el = document.getElementById(id);
      if (el) el.style.display = 'block';
    }

    function hideError(id) {
      var el = document.getElementById(id);
      if (el) el.style.display = 'none';
    }

    function isValidEmail(email) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var valid = true;

      var name = document.getElementById('name');
      var email = document.getElementById('email');
      var message = document.getElementById('message');

      if (!name.value.trim()) { showError('nameError'); valid = false; }
      else { hideError('nameError'); }

      if (!email.value.trim() || !isValidEmail(email.value.trim())) { showError('emailError'); valid = false; }
      else { hideError('emailError'); }

      if (!message.value.trim()) { showError('messageError'); valid = false; }
      else { hideError('messageError'); }

      if (valid) {
        /*
          ============================================
          FORM SUBMISSION:
          Replace with your actual form handling.
          Options: Formspree, Netlify Forms, custom API.
          ============================================
        */
        form.style.display = 'none';
        formSuccess.style.display = 'block';
      }
    });

    var nameInput = document.getElementById('name');
    var emailInput = document.getElementById('email');
    var messageInput = document.getElementById('message');
    if (nameInput) nameInput.addEventListener('input', function () { hideError('nameError'); });
    if (emailInput) emailInput.addEventListener('input', function () { hideError('emailError'); });
    if (messageInput) messageInput.addEventListener('input', function () { hideError('messageError'); });
  }
})();
