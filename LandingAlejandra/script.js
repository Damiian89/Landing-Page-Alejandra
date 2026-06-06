/* =========================================================
   ALEJANDRA GARCÍA — ABOGADA | script.js
   ========================================================= */

'use strict';

/* ---------- NAVBAR SCROLL ---------- */
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  updateActiveNavLink();
});

/* ---------- HAMBURGER MENU ---------- */
const hamburger = document.getElementById('hamburger');
const navLinksContainer = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinksContainer.classList.toggle('open');
});

// Close menu when a link is clicked
navLinksContainer.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinksContainer.classList.remove('open');
  });
});

/* ---------- ACTIVE NAV LINK ON SCROLL ---------- */
const sections = document.querySelectorAll('section[id]');

function updateActiveNavLink() {
  const scrollY = window.scrollY + 120;
  sections.forEach(section => {
    const top    = section.offsetTop;
    const bottom = top + section.offsetHeight;
    const id     = section.getAttribute('id');
    const link   = document.querySelector(`.nav-link[href="#${id}"]`);
    if (link) {
      if (scrollY >= top && scrollY < bottom) {
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      }
    }
  });
}

/* ---------- SCROLL REVEAL ---------- */
function setupRevealObserver() {
  const elements = document.querySelectorAll(
    '.service-card, .testimonial-card, .process-step, .about-grid > *, .contact-grid > *, .feature, .contact-item'
  );
  elements.forEach((el, i) => {
    el.classList.add('reveal');
    el.style.transitionDelay = `${(i % 4) * 0.12}s`;
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  elements.forEach(el => observer.observe(el));
}

/* ---------- COUNTER ANIMATION ---------- */
function animateCounters() {
  const counters = document.querySelectorAll('.stat-number[data-target]');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.animated) {
          entry.target.dataset.animated = 'true';
          const target = +entry.target.dataset.target;
          const duration = 1800;
          const step = 16;
          const increment = target / (duration / step);
          let current = 0;

          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              current = target;
              clearInterval(timer);
            }
            entry.target.textContent = Math.floor(current);
          }, step);
        }
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach(c => observer.observe(c));
}

/* ---------- CONTACT FORM ---------- */
const contactForm = document.getElementById('contact-form');
const toast = document.getElementById('toast');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const btn = document.getElementById('submit-form');
    const originalContent = btn.innerHTML;

    // Validate required fields
    const nombre   = document.getElementById('nombre');
    const email    = document.getElementById('email');
    const servicio = document.getElementById('servicio');
    const mensaje  = document.getElementById('mensaje');

    let valid = true;
    [nombre, email, servicio, mensaje].forEach(field => {
      field.style.borderColor = '';
      if (!field.value.trim()) {
        field.style.borderColor = '#e11d68';
        valid = false;
      }
    });

    if (!valid) {
      shakeForm();
      return;
    }

    // Loading state
    btn.disabled = true;
    btn.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="spin">
        <line x1="12" y1="2" x2="12" y2="6"/>
        <line x1="12" y1="18" x2="12" y2="22"/>
        <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"/>
        <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"/>
        <line x1="2" y1="12" x2="6" y2="12"/>
        <line x1="18" y1="12" x2="22" y2="12"/>
        <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"/>
        <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"/>
      </svg>
      Enviando...
    `;

    // Simulate async send
    setTimeout(() => {
      btn.disabled = false;
      btn.innerHTML = originalContent;
      contactForm.reset();
      showToast();
    }, 1800);
  });
}

function shakeForm() {
  contactForm.style.animation = 'shake .4s ease';
  contactForm.addEventListener('animationend', () => {
    contactForm.style.animation = '';
  }, { once: true });
}

function showToast() {
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 4000);
}

/* ---------- SMOOTH SCROLL FOR ANCHORS ---------- */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const targetId = anchor.getAttribute('href');
    if (targetId === '#') return;
    const target = document.querySelector(targetId);
    if (target) {
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

/* ---------- HERO SCROLL INDICATOR FADE ---------- */
const scrollIndicator = document.getElementById('scroll-indicator');
if (scrollIndicator) {
  window.addEventListener('scroll', () => {
    const opacity = Math.max(0, 1 - window.scrollY / 200);
    scrollIndicator.style.opacity = opacity;
  }, { passive: true });
}

/* ---------- PARALLAX SHAPES ---------- */
window.addEventListener('scroll', () => {
  const scrolled = window.scrollY;
  const shapes = document.querySelectorAll('.shape');
  shapes.forEach((shape, i) => {
    const speed = 0.05 + i * 0.03;
    shape.style.transform = `translateY(${scrolled * speed}px)`;
  });
}, { passive: true });

/* ---------- HOVER EFFECT ON SERVICE CARDS ---------- */
document.querySelectorAll('.service-card').forEach(card => {
  card.addEventListener('mouseenter', () => {
    document.querySelectorAll('.service-card').forEach(c => {
      if (c !== card) c.style.opacity = '.75';
    });
  });
  card.addEventListener('mouseleave', () => {
    document.querySelectorAll('.service-card').forEach(c => {
      c.style.opacity = '1';
    });
  });
});

/* ---------- SPIN KEYFRAME (INJECTED) ---------- */
const styleSheet = document.createElement('style');
styleSheet.textContent = `
  @keyframes spin {
    0%   { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  .spin { animation: spin 1s linear infinite; }
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    20%, 60%  { transform: translateX(-8px); }
    40%, 80%  { transform: translateX(8px); }
  }
`;
document.head.appendChild(styleSheet);

/* ---------- INIT ---------- */
document.addEventListener('DOMContentLoaded', () => {
  setupRevealObserver();
  animateCounters();
  updateActiveNavLink();

  // Hero image entrance animation
  const heroPhoto = document.getElementById('hero-photo');
  if (heroPhoto) {
    heroPhoto.style.opacity = '0';
    heroPhoto.style.transform = 'scale(.96) translateY(20px)';
    heroPhoto.style.transition = 'opacity .9s ease .3s, transform .9s ease .3s';
    setTimeout(() => {
      heroPhoto.style.opacity = '1';
      heroPhoto.style.transform = 'scale(1) translateY(0)';
    }, 100);
  }

  // Hero content entrance
  const heroBadge   = document.querySelector('.hero-badge');
  const heroTitle   = document.querySelector('.hero-title');
  const heroSub     = document.querySelector('.hero-subtitle');
  const heroActions = document.querySelector('.hero-actions');
  const heroStats   = document.querySelector('.hero-stats');

  [heroBadge, heroTitle, heroSub, heroActions, heroStats].forEach((el, i) => {
    if (!el) return;
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = `opacity .7s ease ${i * .15}s, transform .7s ease ${i * .15}s`;
    setTimeout(() => {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, 50);
  });
});
