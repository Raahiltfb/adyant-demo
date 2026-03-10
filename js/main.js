/* =========================================================
   ADYANT™ — MAIN JAVASCRIPT
   Ultra-Premium Interactions & Animations
   ========================================================= */

'use strict';

// =========================================================
//  PRELOADER
// =========================================================
window.addEventListener('load', () => {
  setTimeout(() => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
      preloader.classList.add('hidden');
      // Start hero animations after preloader
      document.querySelectorAll('.floating-note').forEach(note => {
        note.style.opacity = '1';
      });
    }
  }, 2400);
});

// =========================================================
//  CUSTOM CURSOR
// =========================================================
(function initCursor() {
  const cursorOuter = document.getElementById('cursor-outer');
  const cursorInner = document.getElementById('cursor-inner');

  if (!cursorOuter || !cursorInner) return;
  if (window.matchMedia('(max-width: 900px)').matches) {
    cursorOuter.style.display = 'none';
    cursorInner.style.display = 'none';
    return;
  }

  let mouseX = -100, mouseY = -100;
  let outerX = -100, outerY = -100;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursorInner.style.transform = `translate(${mouseX - 3}px, ${mouseY - 3}px)`;
  });

  // Smooth outer cursor
  function animateCursor() {
    outerX += (mouseX - outerX) * 0.15;
    outerY += (mouseY - outerY) * 0.15;
    cursorOuter.style.transform = `translate(${outerX - 20}px, ${outerY - 20}px)`;
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  // Hover effects
  const hoverTargets = 'a, button, .fragrance-card, .variant-btn, .nav-link, .nav-cta';
  document.querySelectorAll(hoverTargets).forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
  });
})();

// =========================================================
//  NAVBAR — Scroll behavior
// =========================================================
(function initNavbar() {
  const navbar = document.getElementById('navbar');
  const menuToggle = document.getElementById('menuToggle');
  const mobileMenu = document.getElementById('mobileMenu');

  if (!navbar) return;

  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    if (scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    lastScroll = scrollY;
  }, { passive: true });

  // Mobile menu
  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');
      const spans = menuToggle.querySelectorAll('span');
      if (mobileMenu.classList.contains('open')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
      } else {
        spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
      }
    });
    mobileMenu.querySelectorAll('.mobile-nav-link, .mobile-cta').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        menuToggle.querySelectorAll('span').forEach(s => {
          s.style.transform = ''; s.style.opacity = '';
        });
      });
    });
  }
})();

// =========================================================
//  PARTICLE CANVAS — Hero Background
// =========================================================
(function initParticles() {
  const canvas = document.getElementById('particleCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let particles = [];
  let width, height;
  let animFrame;

  function resize() {
    width = canvas.width = canvas.offsetWidth;
    height = canvas.height = canvas.offsetHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  class Particle {
    constructor() {
      this.reset();
    }
    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.size = Math.random() * 1.5 + 0.3;
      this.speedX = (Math.random() - 0.5) * 0.3;
      this.speedY = -Math.random() * 0.5 - 0.1;
      this.opacity = Math.random() * 0.4 + 0.05;
      this.fadeSpeed = Math.random() * 0.003 + 0.001;
      this.gold = Math.random() > 0.6;
    }
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      this.opacity -= this.fadeSpeed;
      if (this.opacity <= 0 || this.y < -10) this.reset();
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      if (this.gold) {
        ctx.fillStyle = `rgba(218, 165, 32, ${this.opacity})`;
      } else {
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity * 0.5})`;
      }
      ctx.fill();
    }
  }

  // Create particles
  for (let i = 0; i < 120; i++) {
    particles.push(new Particle());
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);
    particles.forEach(p => { p.update(); p.draw(); });
    animFrame = requestAnimationFrame(animate);
  }
  animate();

  // Pause when not visible
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      cancelAnimationFrame(animFrame);
    } else {
      animate();
    }
  });
})();

// =========================================================
//  SCROLLYTELLING — Olfactory Journey
// =========================================================
(function initScrollytelling() {
  const section = document.getElementById('scrollstory');
  const panels = document.querySelectorAll('.story-panel');
  const storyAtmosphere = document.getElementById('storyAtmosphere');
  if (!section || !panels.length) return;

  // Create progress dots
  const storyCanvas = document.getElementById('storyCanvas');
  const dotsEl = document.createElement('div');
  dotsEl.className = 'story-progress';
  panels.forEach((_, i) => {
    const dot = document.createElement('div');
    dot.className = 'story-dot' + (i === 0 ? ' active' : '');
    dotsEl.appendChild(dot);
  });
  if (storyCanvas) storyCanvas.appendChild(dotsEl);
  const dots = dotsEl.querySelectorAll('.story-dot');

  // Bottle dissassembly elements
  const bottleCap = document.getElementById('bottleCap');
  const bottleAtomizer = document.getElementById('bottleAtomizer');
  const bottleBody = document.getElementById('bottleBody');
  const liquidFill = document.getElementById('liquidFill');
  const bottleWrap = document.getElementById('bottleWrap');

  const atmosphereColors = [
    'radial-gradient(ellipse 60% 60% at 50% 50%, rgba(218, 165, 32, 0.12) 0%, transparent 70%)',
    'radial-gradient(ellipse 60% 60% at 50% 50%, rgba(139, 0, 0, 0.08) 0%, transparent 70%)',
    'radial-gradient(ellipse 60% 60% at 50% 50%, rgba(101, 67, 33, 0.15) 0%, transparent 70%)',
  ];

  let currentPanel = -1;
  let ticking = false;

  function updateScrollStory() {
    const rect = section.getBoundingClientRect();
    
    // Check if we are inside the scroll area
    if (rect.top <= 0 && rect.bottom >= window.innerHeight) {
      const sectionHeight = section.offsetHeight - window.innerHeight;
      const progress = Math.abs(rect.top) / sectionHeight;
      
      // FIX: Clean panel index calculation (removed the 1.2 multiplier overshoot)
      const panelIndex = Math.floor(progress * panels.length);
      const safeIndex = Math.max(0, Math.min(panelIndex, panels.length - 1));

      if (safeIndex !== currentPanel) {
        currentPanel = safeIndex;
        panels.forEach((p, i) => {
          p.classList.toggle('active', i === currentPanel);
        });
        dots.forEach((d, i) => {
          d.classList.toggle('active', i === currentPanel);
        });
        // Keep the background color changes
        if (storyAtmosphere && atmosphereColors[currentPanel]) {
          storyAtmosphere.style.background = atmosphereColors[currentPanel];
        }
      }

      // Keep the Bottle disassembly (the drifting cap and liquid)
      if (bottleCap && bottleAtomizer && bottleBody) {
        const disassembly = Math.max(0, (progress - 0.1) * 2.5);
        const clamp = Math.min(disassembly, 1);

        bottleCap.style.transform = `translateX(-50%) translateY(${-clamp * 80}px) rotate(${clamp * 8}deg)`;
        bottleAtomizer.style.transform = `translateX(-50%) translateY(${-clamp * 30}px)`;
        bottleBody.style.transform = `translateX(-50%) translateY(${clamp * 20}px)`;

        if (liquidFill) {
          const liquidHeight = 75 - (clamp * 30);
          liquidFill.style.height = liquidHeight + '%';
        }
      }
    } else if (rect.top > 0) {
        // Reset if above section
        if (currentPanel !== -1) {
            panels.forEach(p => p.classList.remove('active'));
            currentPanel = -1;
        }
    }
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateScrollStory);
      ticking = true;
    }
  }, { passive: true });

  // Initial call
  updateScrollStory();
})();

// =========================================================
//  BOTTLE 3D MOUSE PARALLAX
// =========================================================
(function initBottleParallax() {
  const heroSection = document.getElementById('hero');
  const bottleWrap = document.getElementById('bottleWrap');
  if (!heroSection || !bottleWrap) return;
  if (window.matchMedia('(max-width: 900px)').matches) return;

  let targetRotX = 0, targetRotY = 0;
  let currentRotX = 0, currentRotY = 0;

  heroSection.addEventListener('mousemove', (e) => {
    const rect = heroSection.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    targetRotY = ((e.clientX - centerX) / rect.width) * 15;
    targetRotX = -((e.clientY - centerY) / rect.height) * 8;
  });

  heroSection.addEventListener('mouseleave', () => {
    targetRotX = 0;
    targetRotY = 0;
  });

  function animateBottle() {
    currentRotX += (targetRotX - currentRotX) * 0.06;
    currentRotY += (targetRotY - currentRotY) * 0.06;
    // We compose with the float animation by using a container transform
    bottleWrap.style.setProperty('--rx', currentRotX + 'deg');
    bottleWrap.style.setProperty('--ry', currentRotY + 'deg');
    requestAnimationFrame(animateBottle);
  }
  animateBottle();
})();

// =========================================================
//  INTERSECTION OBSERVER — Reveal Animations
// =========================================================
(function initRevealObserver() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

  // Trust cards with staggered delay
  document.querySelectorAll('.trust-card').forEach((el, i) => {
    el.style.transitionDelay = el.getAttribute('data-delay') + 's';
    observer.observe(el);
  });

  // Fragrance cards
  document.querySelectorAll('.fragrance-card').forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(40px)';
    el.style.transition = `opacity 0.6s ease ${i * 0.1}s, transform 0.6s cubic-bezier(0.34,1.56,0.64,1) ${i * 0.1}s, box-shadow 0.4s ease, border-color 0.4s ease`;
    const cardObs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          cardObs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    cardObs.observe(el);
  });

  // Section headers
  document.querySelectorAll('.section-header').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.8s ease, transform 0.8s cubic-bezier(0.25,0.46,0.45,0.94)';
    const hObs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          hObs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });
    hObs.observe(el);
  });

  // Craft section
  const craftInner = document.querySelector('.craft-inner');
  if (craftInner) {
    const children = craftInner.querySelectorAll('.craft-text-col, .craft-visual-col');
    children.forEach((el, i) => {
      el.style.opacity = '1';
      el.style.transform = `translateX(${i === 0 ? '-30px' : '30px'})`;
      el.style.transition = `opacity 0.9s ease ${i * 0.2}s, transform 0.9s cubic-bezier(0.25,0.46,0.45,0.94) ${i * 0.2}s`;
      observer.observe(el);
    });
  }
})();

// =========================================================
//  STAT COUNTER ANIMATION
// =========================================================
(function initStatCounters() {
  const statNums = document.querySelectorAll('.stat-number[data-count]');
  if (!statNums.length) return;

  const counterObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = parseInt(entry.target.getAttribute('data-count'));
        animateCount(entry.target, target);
        counterObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  statNums.forEach(el => counterObs.observe(el));

  function animateCount(el, target) {
    let start = 0;
    const duration = 2000;
    const startTime = performance.now();
    const suffix = el.closest('.stat-item') ?
      (el.closest('.stat-item').querySelector('.stat-label').textContent.includes('%') ? '+' : '+') : '+';

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3); // ease out cubic
      const current = Math.floor(ease * target);
      el.textContent = current.toLocaleString('en-IN') + (progress >= 1 ? '' : '');
      if (progress < 1) requestAnimationFrame(update);
      else el.textContent = target.toLocaleString('en-IN');
    }
    requestAnimationFrame(update);
  }
})();

// =========================================================
//  PRODUCT VARIANT SELECTION
// =========================================================
(function initVariants() {
  document.querySelectorAll('.fragrance-card').forEach(card => {
    const variants = card.querySelectorAll('.variant-btn');
    const priceDisplay = card.querySelector('.card-price-display');

    variants.forEach(btn => {
      btn.addEventListener('click', () => {
        variants.forEach(v => v.classList.remove('active'));
        btn.classList.add('active');
        if (priceDisplay) {
          priceDisplay.textContent = btn.getAttribute('data-price');
          // Animate price change
          priceDisplay.style.transform = 'scale(1.2)';
          priceDisplay.style.color = 'var(--gold)';
          setTimeout(() => {
            priceDisplay.style.transform = '';
            priceDisplay.style.color = '';
          }, 300);
        }
      });
    });

    // Wishlist toggle
    const wishlistBtn = card.querySelector('.btn-wishlist');
    if (wishlistBtn) {
      wishlistBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        wishlistBtn.classList.toggle('active');
        wishlistBtn.textContent = wishlistBtn.classList.contains('active') ? '♥' : '♡';
      });
    }
  });
})();

// =========================================================
//  CART TOAST
// =========================================================
let toastTimeout;
function addToCart(productName) {
  const toast = document.getElementById('cartToast');
  const toastName = document.getElementById('toastProductName');
  if (!toast || !toastName) return;

  clearTimeout(toastTimeout);
  toastName.textContent = productName;
  toast.classList.add('show');

  toastTimeout = setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

// =========================================================
//  NEWSLETTER
// =========================================================
function subscribeNewsletter() {
  const email = document.getElementById('newsletterEmail');
  const success = document.getElementById('newsletterSuccess');
  if (!email || !success) return;

  const emailVal = email.value.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailVal || !emailRegex.test(emailVal)) {
    email.style.borderColor = 'rgba(255, 80, 80, 0.5)';
    email.placeholder = 'Please enter a valid email';
    setTimeout(() => {
      email.style.borderColor = '';
      email.placeholder = 'Your email address';
    }, 2000);
    return;
  }

  // Success
  email.style.opacity = '0';
  setTimeout(() => {
    email.style.display = 'none';
    success.classList.add('show');
  }, 300);
}

// =========================================================
//  SMOOTH SCROLL
// =========================================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = 80;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

// =========================================================
//  PARALLAX — Subtle depth on scroll
// =========================================================
(function initParallax() {
  const heroContent = document.querySelector('.hero-content');
  const bottleStage = document.getElementById('bottleStage');
  if (!heroContent) return;

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        if (heroContent) {
          heroContent.style.transform = `translateY(${scrollY * 0.2}px)`;
          heroContent.style.opacity = Math.max(0, 1 - scrollY / 600) + '';
        }
        if (bottleStage) {
          bottleStage.style.transform = `translateY(calc(-50% + ${scrollY * 0.3}px))`;
          bottleStage.style.opacity = Math.max(0, 1 - scrollY / 500) + '';
        }
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
})();

// =========================================================
//  CARD SPOTLIGHT EFFECT
// =========================================================
(function initCardSpotlight() {
  document.querySelectorAll('.fragrance-card').forEach(card => {
    const glow = card.querySelector('.card-glow');
    if (!glow) return;

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      glow.style.background = `radial-gradient(circle at ${x}% ${y}%, rgba(218,165,32,0.12) 0%, transparent 60%)`;
    });

    card.addEventListener('mouseleave', () => {
      glow.style.background = 'radial-gradient(circle at 50% 50%, rgba(218,165,32,0.08) 0%, transparent 60%)';
    });
  });
})();

// =========================================================
//  TRUST CARD STAGGER REVEAL
// =========================================================
(function initTrustCards() {
  const trustGrid = document.getElementById('trustGrid');
  if (!trustGrid) return;

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const cards = entry.target.querySelectorAll('.trust-card');
        cards.forEach((card, i) => {
          setTimeout(() => {
            card.classList.add('visible');
          }, i * 120);
        });
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  obs.observe(trustGrid);
})();

// =========================================================
//  MAGNETIC BUTTON EFFECT (Primary CTAs)
// =========================================================
(function initMagneticButtons() {
  if (window.matchMedia('(max-width: 900px)').matches) return;

  document.querySelectorAll('.btn-primary, .btn-buy, .nav-cta').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.15}px, ${y * 0.25}px) translateY(-3px)`;
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
    });
  });
})();

// =========================================================
//  CINEMATIC GLOW RING — Hero bottle
// =========================================================
(function initGlowRing() {
  const bottleGlass = document.querySelector('.bottle-glass');
  if (!bottleGlass) return;

  let angle = 0;
  function animateGlow() {
    angle += 0.5;
    const x = 50 + Math.sin(angle * Math.PI / 180) * 20;
    const y = 50 + Math.cos(angle * Math.PI / 180) * 20;
    bottleGlass.style.boxShadow = `
      inset 0 0 60px rgba(218,165,32,0.08),
      0 0 ${30 + Math.sin(angle * 0.03) * 15}px rgba(218,165,32,${0.12 + Math.sin(angle * 0.02) * 0.06}),
      0 20px 60px rgba(0,0,0,0.7),
      inset 1px 0 0 rgba(255,255,255,0.15),
      inset -1px 0 0 rgba(0,0,0,0.2)
    `;
    requestAnimationFrame(animateGlow);
  }
  animateGlow();
})();

// =========================================================
//  TEXT SCRAMBLE EFFECT — Hero title
// =========================================================
(function initTextScramble() {
  const chars = '✦∙·°⋆';
  const heroEyebrow = document.querySelector('.hero-eyebrow');
  if (!heroEyebrow) return;

  setTimeout(() => {
    const originalText = heroEyebrow.textContent;
    let iteration = 0;
    const interval = setInterval(() => {
      heroEyebrow.textContent = originalText
        .split('')
        .map((char, idx) => {
          if (idx < iteration) return char;
          if (char === ' ') return ' ';
          return chars[Math.floor(Math.random() * chars.length)];
        })
        .join('');
      if (iteration >= originalText.length) clearInterval(interval);
      iteration += 0.5;
    }, 50);
  }, 3000);
})();

// =========================================================
//  SECTION LINE ACCENT — Gold separator line animation
// =========================================================
(function initLineAccents() {
  const style = document.createElement('style');
  style.textContent = `
    .collection-section::before {
      transition: transform 1s ease;
      transform: scaleX(0);
      transform-origin: left;
    }
    .collection-section.line-visible::before {
      transform: scaleX(1);
    }
  `;
  document.head.appendChild(style);

  const collSection = document.querySelector('.collection-section');
  if (collSection) {
    const lineObs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('line-visible');
          lineObs.unobserve(e.target);
        }
      });
    }, { threshold: 0.05 });
    lineObs.observe(collSection);
  }
})();

// =========================================================
//  SCROLL PROGRESS INDICATOR
// =========================================================
(function initScrollProgress() {
  const progressBar = document.createElement('div');
  progressBar.style.cssText = `
    position: fixed;
    top: 0; left: 0;
    height: 2px;
    width: 0%;
    background: linear-gradient(90deg, #B8860B, #DAA520, #F5C842);
    z-index: 9997;
    transition: width 0.1s linear;
    box-shadow: 0 0 8px rgba(218,165,32,0.5);
    pointer-events: none;
  `;
  document.body.appendChild(progressBar);

  window.addEventListener('scroll', () => {
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = (window.scrollY / docHeight) * 100;
    progressBar.style.width = scrolled + '%';
  }, { passive: true });
})();

// =========================================================
//  FLOATING WHATSAPP — Pulse animation
// =========================================================
(function initFloatingWA() {
  const wa = document.getElementById('floatingWA');
  if (!wa) return;

  // Add pulse ring
  const ring = document.createElement('div');
  ring.style.cssText = `
    position: absolute;
    inset: -4px;
    border-radius: 50%;
    border: 1px solid rgba(37, 211, 102, 0.3);
    animation: waPulse 2s ease-out infinite;
    pointer-events: none;
  `;
  const keyframes = document.createElement('style');
  keyframes.textContent = `
    @keyframes waPulse {
      0% { transform: scale(1); opacity: 0.6; }
      100% { transform: scale(1.4); opacity: 0; }
    }
  `;
  document.head.appendChild(keyframes);
  wa.style.position = 'fixed'; // ensure relative parent
  wa.appendChild(ring);

  // Show after delay
  wa.style.opacity = '0';
  wa.style.transition = 'opacity 0.5s ease, all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
  setTimeout(() => { wa.style.opacity = '1'; }, 4000);
})();

// =========================================================
//  KEYBOARD NAVIGATION (Accessibility)
// =========================================================
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    const mobileMenu = document.getElementById('mobileMenu');
    if (mobileMenu && mobileMenu.classList.contains('open')) {
      mobileMenu.classList.remove('open');
    }
  }
});

// =========================================================
//  PERFORMANCE — Reduce animations on low power
// =========================================================
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const style = document.createElement('style');
  style.textContent = `
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  `;
  document.head.appendChild(style);
}

// =========================================================
//  LAZY IMAGE LOADING
// =========================================================
if ('loading' in HTMLImageElement.prototype) {
  document.querySelectorAll('img').forEach(img => {
    img.loading = 'lazy';
  });
}

// =========================================================
//  MINI BOTTLE 3D TILT ON HOVER
// =========================================================
(function initMiniBottleTilt() {
  document.querySelectorAll('.card-bottle-visual').forEach(visual => {
    const bottle = visual.querySelector('.mini-bottle');
    if (!bottle) return;

    visual.addEventListener('mousemove', (e) => {
      const rect = visual.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      bottle.style.transform = `perspective(600px) rotateY(${x * 20}deg) rotateX(${-y * 12}deg) translateY(-5px)`;
    });

    visual.addEventListener('mouseleave', () => {
      bottle.style.transform = '';
      bottle.style.transition = 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)';
      setTimeout(() => { bottle.style.transition = ''; }, 500);
    });
  });
})();

// =========================================================
//  COLLECTION FILTER BAR (future enhancement placeholder)
// =========================================================
// Placeholder for potential filter functionality

// =========================================================
//  CONSOLE SIGNATURE
// =========================================================
console.log('%c ADYANT™ ', 'background: linear-gradient(135deg, #B8860B, #DAA520); color: #000; padding: 8px 20px; font-size: 18px; font-weight: bold; letter-spacing: 6px; border-radius: 4px;');
console.log('%c Elegance, Distilled. ', 'color: #DAA520; font-size: 12px; letter-spacing: 4px; font-style: italic;');
