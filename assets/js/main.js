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
