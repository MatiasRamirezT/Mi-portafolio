const header = document.querySelector('.site-header');
const traces = document.querySelector('.circuit-traces');
const motion = matchMedia('(prefers-reduced-motion: no-preference)');
const tileHeight = 360;
traces.style.setProperty('--circuit-period', tileHeight + 'px');
let queued = false;

function syncScroll() {
  header.classList.toggle('is-condensed', window.scrollY > 130);
  if (motion.matches) {
    const offset = (Math.max(0, window.scrollY) * .4) % tileHeight;
    traces.style.setProperty('--circuit-offset', -offset + 'px');
  }
  queued = false;
}
window.addEventListener('scroll', () => {
  if (!queued) {
    window.requestAnimationFrame(syncScroll);
    queued = true;
  }
}, { passive: true });
motion.addEventListener('change', syncScroll);
syncScroll();

const gallery = document.querySelector('.project-evidence');
const galleryChoices = gallery.querySelector('.evidence-choices');
function showEvidence(id) {
  for (const view of gallery.querySelectorAll('.evidence-view')) view.hidden = view.id !== 'vista-' + id;
  for (const button of galleryChoices.querySelectorAll('button')) {
    button.setAttribute('aria-pressed', String(button.dataset.galleryChoice === id));
  }
}
galleryChoices.addEventListener('click', event => {
  const button = event.target.closest('button');
  if (button) showEvidence(button.dataset.galleryChoice);
});
showEvidence(galleryChoices.querySelector('button').dataset.galleryChoice);
galleryChoices.hidden = false;

const contactForm = document.querySelector('.contact-form');
contactForm.addEventListener('submit', event => {
  event.preventDefault();
  const fields = new FormData(contactForm);
  const name = fields.get('name').trim();
  const email = fields.get('email').trim();
  const message = fields.get('message').trim().replace(/\r?\n/g, '\r\n');
  const english = document.documentElement.lang === 'en';
  const subject = english ? 'Portfolio inquiry from ' + name : 'Contacto desde el portafolio de parte de ' + name;
  const body = message + '\r\n\r\n' + name + '\r\n' + email;
  window.location.assign(contactForm.action + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body));
});
