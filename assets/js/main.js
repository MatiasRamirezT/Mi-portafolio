const header = document.querySelector('.site-header');
let queued = false;

function syncHeader() {
  header.classList.toggle('is-condensed', window.scrollY > 130);
  queued = false;
}
window.addEventListener('scroll', () => {
  if (!queued) {
    window.requestAnimationFrame(syncHeader);
    queued = true;
  }
}, { passive: true });
syncHeader();
