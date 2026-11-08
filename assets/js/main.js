const header = document.querySelector('.site-header');
let queued = false;

function syncHeader() {
  header.classList.toggle('is-condensed', window.scrollY > 130);
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const progress = maxScroll > 0 ? Math.min(window.scrollY / maxScroll, 1) : 0;
  document.documentElement.style.setProperty('--reading-progress', progress);
  document.documentElement.style.setProperty('--reading-progress-percent', `${progress * 100}%`);
  queued = false;
}
window.addEventListener('scroll', () => {
  if (!queued) {
    window.requestAnimationFrame(syncHeader);
    queued = true;
  }
}, { passive: true });
syncHeader();
