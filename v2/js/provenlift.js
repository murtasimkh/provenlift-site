// ProvenLift v2 - Shared JavaScript

// Mobile navigation toggle
document.addEventListener('DOMContentLoaded', function() {
  const navToggle = document.getElementById('navToggle');
  const navLinksContainer = document.getElementById('navLinks');
  
  if (navToggle && navLinksContainer) {
    navToggle.addEventListener('click', function() {
      const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', !isExpanded);
      navLinksContainer.classList.toggle('open');
    });
    
    // Close mobile nav when clicking a link
    navLinksContainer.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinksContainer.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
    
    // Close mobile nav when clicking outside
    document.addEventListener('click', (e) => {
      if (!navToggle.contains(e.target) && !navLinksContainer.contains(e.target)) {
        navLinksContainer.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }
  
  // Set current year in footer
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
  
  // Nav scroll state
  const nav = document.getElementById('nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 20) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    });
  }
  
  // Scroll spy for nav active state (minimal)
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link[href^="/"]');
  
  if (sections.length && navLinks.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '/' + id || link.getAttribute('href') === '#' + id) {
              link.classList.add('active');
            }
          });
        }
      });
    }, {
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0.1
    });
    
    sections.forEach(section => observer.observe(section));
  }
  
  // Form validation enhancement
  const forms = document.querySelectorAll('form[novalidate]');
  forms.forEach(form => {
    form.addEventListener('submit', function(e) {
      if (!form.checkValidity()) {
        e.preventDefault();
        e.stopPropagation();
        
        // Focus first invalid field
        const firstInvalid = form.querySelector(':invalid');
        if (firstInvalid) {
          firstInvalid.focus();
          firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }
      form.classList.add('was-validated');
    });
    
    // Clear validation on input
    form.querySelectorAll('input, select, textarea').forEach(input => {
      input.addEventListener('input', () => {
        if (form.classList.contains('was-validated')) {
          input.classList.remove('invalid');
        }
      });
    });
  });
  
  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const navHeight = document.getElementById('nav')?.offsetHeight || 72;
        const targetPosition = target.getBoundingClientRect().top + window.scrollY - navHeight;
        window.scrollTo({ top: targetPosition, behavior: 'smooth' });
      }
    });
  });
});