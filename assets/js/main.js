const swordButton = document.querySelector('.sword-button');
const swordAction = document.querySelector('.sword-action');
const swordInstruction = document.querySelector('#sword-instruction');
const swordStatus = document.querySelector('#sword-status');

if (swordButton && swordAction && swordInstruction && swordStatus) {
  swordButton.disabled = false;
  swordAction.disabled = false;
  swordAction.addEventListener('click', () => swordButton.click());
  swordButton.addEventListener('click', () => {
    const isActive = swordButton.getAttribute('aria-pressed') !== 'true';
    swordButton.setAttribute('aria-pressed', String(isActive));
    document.querySelector('.hero-forge').classList.toggle('is-active', isActive);
    document.body.classList.toggle('sword-active', isActive);
    document.querySelector('.sword-scene').dispatchEvent(new CustomEvent('swordchange', { detail: { active: isActive } }));
    swordButton.setAttribute('aria-label', isActive ? 'Desactivar espada de energía' : 'Activar espada de energía');
    swordAction.textContent = isActive ? 'Desactivar espada' : 'Activar espada';
    swordInstruction.textContent = isActive ? 'Pulsa de nuevo para apagar la energía.' : 'Pulsa el mango para revelar mi nombre.';
    swordStatus.textContent = isActive ? 'Espada de energía activada.' : 'Espada de energía desactivada.';
  });
}
