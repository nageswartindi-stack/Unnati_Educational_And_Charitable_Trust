document.addEventListener('DOMContentLoaded', () => {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const navToggle = document.getElementById('nav-toggle');
  const siteNav = document.getElementById('site-nav');
  if (navToggle && siteNav) {
    navToggle.addEventListener('click', () => siteNav.classList.toggle('show'));
  }

  document.querySelectorAll('.nav-item.has-sub .nav-link-sub').forEach(button => {
    const item = button.closest('.nav-item');
    if (!item) return;
    button.addEventListener('click', (e) => {
      if (window.innerWidth <= 760) {
        e.preventDefault();
        item.classList.toggle('open');
      }
    });
    button.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        item.classList.toggle('open');
      }
      if (e.key === 'Escape') {
        item.classList.remove('open');
      }
    });
  });

  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', () => {
      if (siteNav && siteNav.classList.contains('show')) siteNav.classList.remove('show');
      document.querySelectorAll('.nav-item.open').forEach(item => item.classList.remove('open'));
    });
  });

  const donateNow = document.getElementById('donate-now');
  if (donateNow) {
    donateNow.addEventListener('click', () => alert('Thank you — this is a demo donation flow.'));
  }

  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      alert(`Thanks, ${form.elements['name'].value || 'Friend'}! We received your message (demo).`);
      form.reset();
    });
  }

  const revealItems = document.querySelectorAll('.reveal');
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealItems.forEach(el => obs.observe(el));

  document.querySelectorAll('.count').forEach((countEl) => {
    const target = Number(countEl.dataset.target || 0);
    if (!target) return;
    let current = 0;
    const step = Math.max(1, Math.floor(target / 60));
    const interval = setInterval(() => {
      current += step;
      if (current >= target) {
        countEl.textContent = target.toLocaleString();
        clearInterval(interval);
      } else {
        countEl.textContent = current.toLocaleString();
      }
    }, 25);
  });

  // Auto-scroll gallery
  const galleryScroll = document.querySelector('.gallery-scroll');
  if (galleryScroll) {
    let scrollAmount = 0;
    const scrollSpeed = 1; // pixels per frame
    const maxScroll = galleryScroll.scrollWidth - galleryScroll.clientWidth;

    function autoScroll() {
      scrollAmount += scrollSpeed;
      if (scrollAmount >= maxScroll) {
        scrollAmount = 0; // reset to start
      }
      galleryScroll.scrollLeft = scrollAmount;
      requestAnimationFrame(autoScroll);
    }
    autoScroll();
  }

  // Highlight active nav link on scroll
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.site-nav a[href^="#"]');

  function highlightNav() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', highlightNav);
});
