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

const contactForm = document.querySelector('#contact-form');
contactForm.addEventListener('submit', event => {
  event.preventDefault();
  if (!contactForm.reportValidity()) return;
  const data = new FormData(contactForm);
  const subject = encodeURIComponent(`Mensaje de ${data.get('nombre')} desde tu portafolio`);
  const body = encodeURIComponent(`Nombre: ${data.get('nombre')}\nCorreo: ${data.get('correo')}\n\n${data.get('mensaje')}`);
  document.querySelector('#form-note').textContent = 'Abriendo tu aplicación de correo con el mensaje listo para revisar y enviar.';
  window.location.href = `mailto:matias_r.m5@hotmail.com?subject=${subject}&body=${body}`;
});
