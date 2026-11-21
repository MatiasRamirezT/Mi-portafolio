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
