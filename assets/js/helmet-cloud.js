(() => {
  const canvas = document.querySelector('.helmet-cloud');
  const stage = document.querySelector('.helmet-stage');
  if (!canvas || !stage) return;

  const ctx = canvas.getContext('2d', { alpha: true, desynchronized: true });
  if (!ctx) return;
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const random = (() => { let seed = 0x6d2b79f5; return () => { seed = Math.imul(seed ^ (seed >>> 15), seed | 1); seed ^= seed + Math.imul(seed ^ (seed >>> 7), seed | 61); return ((seed ^ (seed >>> 14)) >>> 0) / 4294967296; }; })();
  const particles = [];
  const sourceImage = stage.querySelector('.helmet-portrait');
  const renderImage = document.createElement('canvas');
  const renderContext = renderImage.getContext('2d');
  let painted = false;
  let width = 0, height = 0, dpr = 1, frame = 0, lastFrame = 0, visible = false;
  let pointerX = 0, pointerY = 0, ready = false;
  let aura = null;

  function sampleCharacter() {
    const sampleSize = 520;
    const sampleCanvas = document.createElement('canvas');
    sampleCanvas.width = sampleSize;
    sampleCanvas.height = sampleSize;
    const sampleContext = sampleCanvas.getContext('2d', { willReadFrequently: true });
    sampleContext.drawImage(sourceImage, 0, 0, sampleSize, sampleSize);
    let data;
    try {
      data = sampleContext.getImageData(0, 0, sampleSize, sampleSize).data;
    } catch (error) {
      // Un archivo local puede mostrarse aunque el navegador impida leer sus píxeles.
      if (error.name === 'SecurityError') return;
      throw error;
    }
    const target = 7000;
    let candidates = 0;
    for (let y = 0; y < sampleSize; y += 1) {
      for (let x = 0; x < sampleSize; x += 1) {
        const index = (y * sampleSize + x) * 4;
        const red = data[index], green = data[index + 1], blue = data[index + 2], alpha = data[index + 3];
        if (alpha < 45 || red < 38 || red < green * 1.45 || red < blue * 1.35) continue;
        candidates += 1;
        const point = { x, y, red, alpha };
        if (particles.length < target) particles.push(point);
        else {
          const slot = Math.floor(random() * candidates);
          if (slot < target) particles[slot] = point;
        }
      }
    }
    for (const point of particles) {
      const brightness = point.red / 255;
      point.x = (point.x / sampleSize - .5) * 2;
      point.y = (point.y / sampleSize - .5) * 2;
      point.z = (brightness - .48) * .28 + (random() - .5) * .15;
      point.color = point.red > 190 ? '#ff4054' : point.red > 90 ? '#ef3148' : '#bd2136';
      // Frentes curvos que siguen los relieves de la armadura.
      point.contour = Math.hypot(point.x * .85 + .32, point.y + .72) - point.z * .7;
      point.size = .78 + random() * .78;
      point.phase = random() * Math.PI * 2;
    }
    // Orden estable: la profundidad apenas varía entre cuadros, así evitamos
    // asignar y ordenar miles de objetos durante cada renderizado.
    particles.sort((a, b) => a.z - b.z);
    renderImage.width = sourceImage.naturalWidth;
    renderImage.height = sourceImage.naturalHeight;
    renderContext.drawImage(sourceImage, 0, 0);
    const image = renderContext.getImageData(0, 0, renderImage.width, renderImage.height);
    for (let i = 0; i < image.data.length; i += 4) {
      image.data[i] = Math.min(255, image.data[i] * 1.3);
      image.data[i + 1] = Math.min(255, image.data[i + 1] * 1.2);
      image.data[i + 2] = Math.min(255, image.data[i + 2] * 1.2);
    }
    renderContext.putImageData(image, 0, 0);
    ready = true;
    resize();
  }

  function resize() {
    const rect = canvas.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    width = rect.width;
    height = rect.height;
    dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    aura = ctx.createRadialGradient(width * .52, height * .5, 5, width * .52, height * .5, Math.min(width, height) * .48);
    aura.addColorStop(0, 'rgba(201,35,54,.11)');
    aura.addColorStop(.6, 'rgba(115,14,29,.04)');
    aura.addColorStop(1, 'rgba(0,0,0,0)');
    if (ready && reducedMotion.matches) render(0, true);
    else requestRender();
  }

  function render(now, fixed = false) {
    if (!width || !height || !ready) return;
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = aura;
    ctx.fillRect(0, 0, width, height);

    const rotation = (fixed ? -.1 : Math.sin(now * .0003) * .16) + pointerX * .14;
    const tilt = pointerY * .055;
    const cosine = Math.cos(rotation), sine = Math.sin(rotation);
    const scale = Math.min(width * .44, height * .48);
    const camera = 5.2;
    const imageSize = scale * 2.1;
    ctx.globalAlpha = .78;
    ctx.drawImage(renderImage, (width - imageSize) * .5, height * .49 - imageSize * .5, imageSize, imageSize);
    ctx.globalAlpha = 1;
    // Cada barrido abre levemente la nube y vuelve a reunirla en su silueta.
    const wave = fixed ? -2 : (now % 5400) / 2700 * 1.7 - .2;
    const limit = Math.min(particles.length, width < 600 ? Math.max(1100, Math.round(width * 3.5)) : Math.max(2200, Math.round(width * 5.5)));
    for (let i = 0; i < limit; i += 1) {
      const p = particles[i];
      const crest = Math.max(0, 1 - Math.abs(p.contour - wave) / .18);
      const lift = crest * crest;
      const rotatedX = p.x * cosine + (p.z + lift * .12) * sine;
      const rotatedZ = p.z * cosine - p.x * sine;
      const perspective = camera / (camera - rotatedZ);
      const x = width * .5 + (rotatedX + p.x * lift * .055) * scale * perspective;
      const y = height * .49 + (p.y * (1 + lift * .055) * Math.cos(tilt) - rotatedZ * Math.sin(tilt)) * scale * perspective;
      if (x < -3 || x > width + 3 || y < -3 || y > height + 3) continue;
      ctx.globalAlpha = fixed ? p.alpha / 255 : (p.alpha / 255) * (.9 + Math.sin(now * .0018 + p.phase) * .1);
      ctx.fillStyle = lift > .55 ? '#ffc1ae' : lift > .16 ? '#ff6372' : p.color;
      ctx.beginPath();
      ctx.arc(x, y, p.size * (1 + lift * .65) * perspective, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
    if (!painted) {
      stage.classList.add('has-frame');
      painted = true;
    }
  }

  function animate(now) {
    frame = 0;
    if (!visible || document.hidden || reducedMotion.matches) return;
    if (now - lastFrame >= 1000 / 30) {
      render(now);
      lastFrame = now;
    }
    frame = requestAnimationFrame(animate);
  }
  function requestRender() {
    if (visible && ready && !frame && !reducedMotion.matches) frame = requestAnimationFrame(animate);
  }
  stage.addEventListener('pointermove', event => {
    if (event.pointerType === 'touch') return;
    const rect = stage.getBoundingClientRect();
    pointerX = ((event.clientX - rect.left) / rect.width - .5) * 2;
    pointerY = ((event.clientY - rect.top) / rect.height - .5) * 2;
  }, { passive: true });
  stage.addEventListener('pointerleave', () => { pointerX = 0; pointerY = 0; }, { passive: true });
  document.addEventListener('visibilitychange', requestRender);
  reducedMotion.addEventListener('change', () => {
    if (reducedMotion.matches) {
      cancelAnimationFrame(frame);
      frame = 0;
      render(0, true);
    } else requestRender();
  });
  new ResizeObserver(resize).observe(canvas);
  new IntersectionObserver(entries => {
    visible = entries.some(entry => entry.isIntersecting);
    if (visible && reducedMotion.matches) render(0, true);
    else requestRender();
    if (!visible) { cancelAnimationFrame(frame); frame = 0; }
  }, { rootMargin: '80px' }).observe(stage);
  if (sourceImage.complete && sourceImage.naturalWidth) sampleCharacter();
  else sourceImage.addEventListener('load', sampleCharacter, { once: true });
})();
