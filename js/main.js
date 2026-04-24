/* ===== SCROLL PROGRESS BAR ===== */
const progressBar = document.querySelector('.scroll-progress');
if (progressBar) {
  window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = progress + '%';
  }, { passive: true });
}

/* ===== INTERSECTION OBSERVER — FADE IN ===== */
const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const children = entry.target.querySelectorAll('[data-animate]');
      children.forEach((child, i) => {
        child.style.transitionDelay = `${i * 100}ms`;
        child.classList.add('is-visible');
      });
      entry.target.classList.add('is-visible');
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.section, .mini-cta').forEach(el => {
  fadeObserver.observe(el);
});

/* ===== STICKY HEADER + DARK/LIGHT MODE ===== */
const header = document.getElementById('header');
let lastScroll = 0;

// All sections are dark — header always has light text unless scrolled
function updateHeaderTheme() {
  // header--dark is always on in this dark theme
  if (!header.classList.contains('scrolled')) {
    header.classList.add('header--dark');
  }
}

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }

  if (currentScroll > lastScroll && currentScroll > 300) {
    header.style.transform = 'translateY(-100%)';
  } else {
    header.style.transform = 'translateY(0)';
  }

  lastScroll = currentScroll;
  updateHeaderTheme();
}, { passive: true });

updateHeaderTheme();

/* ===== SMOOTH SCROLL ===== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = anchor.getAttribute('href');
    const target = document.querySelector(targetId);
    if (target) {
      const headerHeight = header.offsetHeight;
      const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
      window.scrollTo({ top: targetPosition, behavior: 'smooth' });

      // Close mobile menu
      const mobileMenu = document.querySelector('.header__mobile-menu');
      const burger = document.querySelector('.header__burger');
      if (mobileMenu && mobileMenu.classList.contains('is-open')) {
        mobileMenu.classList.remove('is-open');
        burger.classList.remove('is-open');
        document.body.style.overflow = '';
      }
    }
  });
});

/* ===== BURGER MENU ===== */
const burger = document.querySelector('.header__burger');
const mobileMenu = document.querySelector('.header__mobile-menu');

if (burger && mobileMenu) {
  burger.addEventListener('click', () => {
    burger.classList.toggle('is-open');
    mobileMenu.classList.toggle('is-open');
    document.body.style.overflow = mobileMenu.classList.contains('is-open') ? 'hidden' : '';
  });
}

/* ===== YOUTUBE MODAL ===== */
document.querySelectorAll('[data-youtube]').forEach(trigger => {
  trigger.addEventListener('click', () => {
    const videoId = trigger.dataset.youtube;
    const modal = document.createElement('div');
    modal.className = 'modal modal--video';
    modal.innerHTML = `
      <div class="modal__overlay"></div>
      <div class="modal__content">
        <button class="modal__close" aria-label="Close">&times;</button>
        <iframe
          src="https://www.youtube.com/embed/${encodeURIComponent(videoId)}?autoplay=1&rel=0"
          frameborder="0"
          allow="autoplay; fullscreen"
          allowfullscreen>
        </iframe>
      </div>
    `;
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';

    const closeModal = () => {
      modal.remove();
      document.body.style.overflow = '';
    };

    modal.querySelector('.modal__overlay').addEventListener('click', closeModal);
    modal.querySelector('.modal__close').addEventListener('click', closeModal);
    document.addEventListener('keydown', function handler(e) {
      if (e.key === 'Escape') {
        closeModal();
        document.removeEventListener('keydown', handler);
      }
    });
  });
});

/* ===== PARALLAX (subtle) ===== */
const parallaxElements = document.querySelectorAll('[data-parallax]');
if (parallaxElements.length > 0 && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    parallaxElements.forEach(el => {
      const speed = parseFloat(el.dataset.parallax) || 0.15;
      el.style.transform = `translate3d(0, ${scrollY * speed}px, 0)`;
    });
  }, { passive: true });
}

/* ===== MOBILE PARALLAX for bridge/chess/final-cta backgrounds ===== */
(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const bgs = document.querySelectorAll('[data-parallax-mobile]');
  if (!bgs.length) return;

  const mq = window.matchMedia('(max-width: 1023px)');
  let ticking = false;

  const update = () => {
    const vh = window.innerHeight;
    const active = mq.matches;
    bgs.forEach(bg => {
      if (!active) { bg.style.transform = ''; return; }
      const section = bg.parentElement;
      const rect = section.getBoundingClientRect();
      const speed = parseFloat(bg.dataset.parallaxMobile) || 0.18;
      const sectionCenter = rect.top + rect.height / 2;
      const offset = (vh / 2 - sectionCenter) * speed;
      bg.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0)`;
    });
    ticking = false;
  };

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(update);
      ticking = true;
    }
  }, { passive: true });
  window.addEventListener('resize', update, { passive: true });
  if (mq.addEventListener) mq.addEventListener('change', update);
  update();
})();

/* ===== PAIN SWITCHER (MOBILE) ===== */
document.querySelectorAll('.pain__switcher-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const tab = btn.dataset.target;
    document.querySelectorAll('.pain__switcher-btn').forEach(b => b.classList.remove('is-active'));
    btn.classList.add('is-active');
    document.querySelectorAll('.pain__column[data-tab]').forEach(col => {
      col.classList.toggle('is-active', col.dataset.tab === tab);
    });
  });
});

/* ===== GNM SCHEMA ANIMATION ===== */
const gnmSchema = document.querySelector('.gnm__schema');
if (gnmSchema) {
  new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.gnm__schema-step, .gnm__schema-arrow').forEach((step, i) => {
          setTimeout(() => step.classList.add('is-visible'), i * 300);
        });
      }
    });
  }, { threshold: 0.5 }).observe(gnmSchema);
}

/* ===== FORMAT TIMELINE ===== */
document.querySelectorAll('.format__step').forEach(step => {
  new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('is-visible');
    });
  }, { threshold: 0.5 }).observe(step);
});

/* ===== CARD TILT ON HOVER (desktop only, no touch) ===== */
if (window.matchMedia('(min-width: 1024px) and (hover: hover) and (pointer: fine)').matches) {
  document.querySelectorAll('.card').forEach(card => {
    card.style.transition = 'transform 0.2s ease, box-shadow 0.3s ease, border-color 0.3s ease';
    card.style.willChange = 'transform';

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -2;
      const rotateY = ((x - centerX) / centerX) * 2;
      card.style.transform = `translateY(-6px) perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}

/* ===== GOLD LINE ANIMATION ===== */
document.querySelectorAll('.gold-line').forEach(line => {
  new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      }
    });
  }, { threshold: 0.5 }).observe(line);
});

/* ===== HERO METRICS COUNTER STAGGER ===== */
const heroMetrics = document.querySelector('.hero__metrics');
if (heroMetrics) {
  new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.hero__metric').forEach((metric, i) => {
          metric.style.transitionDelay = `${i * 150}ms`;
          metric.classList.add('is-visible');
        });
      }
    });
  }, { threshold: 0.3 }).observe(heroMetrics);
}

/* ===== COOKIE BANNER ===== */
const cookieBanner = document.getElementById('cookieBanner');
if (cookieBanner) {
  if (localStorage.getItem('cookieAccepted') === '1') {
    cookieBanner.classList.add('is-hidden');
  }
}

/* ===== YANDEX METRIKA GOALS ===== */
document.querySelectorAll('.btn--primary').forEach(btn => {
  btn.addEventListener('click', () => {
    if (typeof ym !== 'undefined') {
      ym(0, 'reachGoal', 'cta_click', {
        section: btn.closest('section')?.id || 'mini-cta'
      });
    }
  });
});
