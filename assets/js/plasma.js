(() => {
  const title = document.querySelector('#titulo-perfil');
  const name = [...title.children].map(line => line.textContent).join(' ');
  title.setAttribute('aria-label', name);
  const cooling = new WeakMap();
  for (const line of title.children) {
    line.setAttribute('aria-hidden', 'true');
    const parts = document.createDocumentFragment();
    for (const char of line.textContent) {
      if (char === ' ') {
        parts.append(' ');
        continue;
      }
      const letter = document.createElement('b');
      letter.className = 'name-letter';
      letter.textContent = char;
      parts.append(letter);
    }
    line.replaceChildren(parts);
  }
  function lightLetter(event) {
    const letter = event.target.closest('.name-letter');
    if (!letter) return;
    clearTimeout(cooling.get(letter));
    letter.classList.add('is-lit');
    cooling.set(letter, setTimeout(() => {
      letter.classList.remove('is-lit');
      cooling.delete(letter);
    }, 520));
  }
  title.addEventListener('pointerover', lightLetter);
  title.addEventListener('pointerdown', lightLetter);

  const light = document.createElement('div');
  light.className = 'plasma-light';
  light.setAttribute('aria-hidden', 'true');
  document.body.append(light);
  const fine = matchMedia('(any-hover: hover) and (any-pointer: fine) and (forced-colors: none)');
  const root = document.documentElement;
  let frame = 0;
  let x = 0;
  let y = 0;
  function hideLight() {
    cancelAnimationFrame(frame);
    frame = 0;
    root.classList.remove('plasma-pointer');
    light.classList.remove('is-visible');
  }
  function paintLight() {
    frame = 0;
    light.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
    root.classList.add('plasma-pointer');
    light.classList.add('is-visible');
  }
  function follow(event) {
    if (event.pointerType !== 'mouse' || !fine.matches) {
      if (frame || root.classList.contains('plasma-pointer')) hideLight();
      return;
    }
    x = event.clientX;
    y = event.clientY;
    if (!frame) frame = requestAnimationFrame(paintLight);
  }
  window.addEventListener('pointermove', follow, { passive: true });
  window.addEventListener('pointerdown', follow, { passive: true });
  document.documentElement.addEventListener('pointerleave', hideLight);
  window.addEventListener('blur', hideLight);
  document.addEventListener('visibilitychange', () => { if (document.hidden) hideLight(); });
  fine.addEventListener('change', hideLight);

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('plasma-enter');
          observer.unobserve(entry.target);
        }
      }
    }, { threshold: .15 });
    document.querySelectorAll('.section-heading').forEach(heading => observer.observe(heading));
  }
})();
