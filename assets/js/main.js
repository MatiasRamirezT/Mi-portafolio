(() => {
  const header = document.querySelector('.site-header');
  const menu = header.querySelector('nav');
  const menuButton = header.querySelector('.menu-button');
  const compact = matchMedia('(max-width: 56rem)');
  header.classList.add('is-interactive');

  function showMenu(open = false) {
    menuButton.hidden = !compact.matches;
    menu.hidden = compact.matches && !open;
    menuButton.setAttribute('aria-expanded', String(compact.matches && open));
  }
  showMenu();
  compact.addEventListener('change', () => showMenu());
  menuButton.addEventListener('click', () => showMenu(menu.hidden));
  menu.addEventListener('click', event => {
    const link = event.target.closest('a');
    if (!link || !compact.matches) return;
    showMenu();
    const target = document.querySelector(link.hash);
    target.tabIndex = -1;
    target.focus({ preventScroll: true });
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && compact.matches && !menu.hidden) {
      showMenu();
      menuButton.focus();
    }
  });

  const gallery = document.querySelector('.exhibit');
  const frame = gallery.querySelector('.art-frame');
  const controls = gallery.querySelector('.slide-controls');
  const layers = [...gallery.querySelectorAll('.art-layer')];
  const bars = [...gallery.querySelectorAll('.progress-bars i')];
  const count = gallery.querySelector('.counter');
  const caption = gallery.querySelector('.slide-name');
  const announcement = gallery.querySelector('.slide-announcement');
  const play = controls.querySelector('.play');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');
  const slides = [
    { es: 'Señal', en: 'Signal', field: ['Soporte de software', 'Software support'] },
    { es: 'Estratos', en: 'Strata', field: ['Análisis de datos', 'Data analysis'] },
    { es: 'Enlace', en: 'Link', field: ['Colaboración', 'Collaboration'] }
  ];
  let index = 0;
  let playing = !reduce.matches;
  let onScreen = true;
  let timer;
  let origin = null;
  const isEnglish = () => document.documentElement.lang === 'en';

  function updateCaption(announce = false) {
    const en = isEnglish();
    const slide = slides[index];
    caption.textContent = slide[en ? 'en' : 'es'];
    gallery.querySelector('.slide-subject').textContent = slide.field[en ? 1 : 0];
    const label = playing ? (en ? 'Pause gallery' : 'Pausar galería') : (en ? 'Play gallery' : 'Reproducir galería');
    play.setAttribute('aria-label', label);
    play.title = label;
    play.firstElementChild.textContent = playing ? 'Ⅱ' : '▶';
    count.textContent = String(index + 1).padStart(2,'0') + ' / 03';
    if (announce) announcement.textContent = [count.textContent, caption.textContent,slide.field[en ? 1 : 0]].join(' · ');
  }
  function schedule() {
    clearTimeout(timer);
    if (playing && onScreen && !document.hidden) timer = setTimeout(() => selectSlide(index + 1, false), 6500);
  }
  function selectSlide(next, manual) {
    if (manual) playing = false;
    index = (next + slides.length) % slides.length;
    layers.forEach((layer, i) => {
      layer.classList.toggle('is-current', i === index);
      bars[i].classList.toggle('current', i === index);
    });
    updateCaption(manual);
    schedule();
  }
  function pause() {
    playing = false;
    updateCaption();
    schedule();
  }
  controls.hidden = false;
  controls.querySelector('.prev').addEventListener('click', () => selectSlide(index - 1, true));
  controls.querySelector('.next').addEventListener('click', () => selectSlide(index + 1, true));
  play.addEventListener('click', () => {
    playing = !playing;
    updateCaption();
    schedule();
  });
  gallery.addEventListener('focusin', event => {
    if (event.target.matches(':focus-visible')) pause();
  });
  gallery.addEventListener('keydown', event => {
    if (!['ArrowLeft','ArrowRight','Home','End'].includes(event.key)) return;
    event.preventDefault();
    const next = { ArrowLeft: index - 1, ArrowRight: index + 1, Home: 0, End: slides.length - 1 };
    selectSlide(next[event.key], true);
  });
  frame.addEventListener('pointerdown', event => {
    origin = { x: event.clientX, y: event.clientY };
    frame.setPointerCapture(event.pointerId);
  });
  frame.addEventListener('pointerup', event => {
    if (!origin) return;
    const dx = event.clientX - origin.x;
    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(event.clientY - origin.y)) {
      selectSlide(index + (dx < 0 ? 1 : -1), true);
    }
    origin = null;
  });
  frame.addEventListener('pointercancel', () => { origin = null; });
  frame.addEventListener('pointermove', event => {
    if (event.pointerType !== 'mouse' || reduce.matches) return;
    const rect = frame.getBoundingClientRect();
    frame.style.setProperty('--ry', ((event.clientX-rect.left)/rect.width-.5)*13 + 'deg');
    frame.style.setProperty('--rx', (.5-(event.clientY-rect.top)/rect.height)*13 + 'deg');
  });
  frame.addEventListener('pointerleave', () => {
    frame.style.removeProperty('--rx');
    frame.style.removeProperty('--ry');
  });
  reduce.addEventListener('change', () => { if (reduce.matches) pause(); });
  window.addEventListener('portfolio-language-change', () => updateCaption());
  document.addEventListener('visibilitychange', schedule);
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
      schedule();
    }).observe(gallery);
    const reveal = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add('arrived');
        reveal.unobserve(entry.target);
      }
    });
    document.querySelectorAll('.section-heading, .project-poster, .skill-card, .education-grid article').forEach(el => reveal.observe(el));
    const navLinks = [...menu.querySelectorAll('a')];
    const track = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        navLinks.forEach(a => {
          if (a.hash === '#' + entry.target.id) a.setAttribute('aria-current','location');
          else a.removeAttribute('aria-current');
        });
      }
    }, { rootMargin: '-12% 0px -65% 0px' });
    document.querySelectorAll('main > section').forEach(section => track.observe(section));
  }
  updateCaption();
  schedule();
})();
