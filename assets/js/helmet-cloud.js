(() => {
  const canvas = document.querySelector('.helmet-cloud');
  const stage = document.querySelector('.helmet-stage');
  if (!canvas || !stage) return;

  const ctx = canvas.getContext('2d', { alpha: true, desynchronized: true });
  if (!ctx) return;
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const random = (() => { let seed = 0x6d2b79f5; return () => { seed = Math.imul(seed ^ (seed >>> 15), seed | 1); seed ^= seed + Math.imul(seed ^ (seed >>> 7), seed | 61); return ((seed ^ (seed >>> 14)) >>> 0) / 4294967296; }; })();
  const particles = [];
  const sourceImage = new Image();
  sourceImage.src = 'assets/images/spartan-particle-person.webp';
  let width = 0, height = 0, dpr = 1, frame = 0, lastFrame = 0, visible = false;
  let pointerX = 0, pointerY = 0, ready = false;

  function sampleCharacter() {
    const sampleSize = 520;
    const sampleCanvas = document.createElement('canvas');
    sampleCanvas.width = sampleSize;
    sampleCanvas.height = sampleSize;
    const sampleContext = sampleCanvas.getContext('2d', { willReadFrequently: true });
    sampleContext.drawImage(sourceImage, 0, 0, sampleSize, sampleSize);
    const { data } = sampleContext.getImageData(0, 0, sampleSize, sampleSize);
    const candidates = [];
    for (let y = 0; y < sampleSize; y += 1) {
      for (let x = 0; x < sampleSize; x += 1) {
        const index = (y * sampleSize + x) * 4;
        const red = data[index], green = data[index + 1], blue = data[index + 2], alpha = data[index + 3];
        if (alpha < 45 || red < 38 || red < green * 1.45 || red < blue * 1.35) continue;
        candidates.push({ x, y, red, alpha });
      }
    }
    const target = 7000;
    if (candidates.length <= target) particles.push(...candidates);
    else {
      for (let i = 0; i < target; i += 1) {
        const choice = Math.floor(random() * candidates.length);
        particles.push(candidates[choice]);
        candidates[choice] = candidates[candidates.length - 1];
        candidates.pop();
      }
    }
    for (const point of particles) {
      const brightness = point.red / 255;
      point.x = (point.x / sampleSize - .5) * 2;
      point.y = (point.y / sampleSize - .5) * 2;
      point.z = (brightness - .48) * .28 + (random() - .5) * .15;
      point.color = point.red > 190 ? '#ff4054' : point.red > 90 ? '#ef3148' : '#bd2136';
      point.size = .78 + random() * .78;
      point.phase = random() * Math.PI * 2;
    }
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
    if (ready && reducedMotion.matches) render(0, true);
    else requestRender();
  }

  function render(now, fixed = false) {
    if (!width || !height || !ready) return;
    ctx.clearRect(0, 0, width, height);
    const aura = ctx.createRadialGradient(width * .52, height * .5, 5, width * .52, height * .5, Math.min(width, height) * .48);
    aura.addColorStop(0, 'rgba(201,35,54,.11)');
    aura.addColorStop(.6, 'rgba(115,14,29,.04)');
    aura.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = aura;
    ctx.fillRect(0, 0, width, height);

    const rotation = (fixed ? -.1 : Math.sin(now * .0003) * .16) + pointerX * .14;
    const tilt = pointerY * .055;
    const cosine = Math.cos(rotation), sine = Math.sin(rotation);
    const scale = Math.min(width * .44, height * .48);
    const camera = 5.2;
    const imageSize = scale * 2.1;
    ctx.globalAlpha = .78;
    ctx.filter = 'brightness(1.3) saturate(1.2)';
    ctx.drawImage(sourceImage, (width - imageSize) * .5, height * .49 - imageSize * .5, imageSize, imageSize);
    ctx.filter = 'none';
    ctx.globalAlpha = 1;
    const limit = Math.min(particles.length, width < 600 ? Math.max(2200, Math.round(width * 7)) : Math.max(3400, Math.round(width * 9)));
    const projected = [];
    for (let i = 0; i < limit; i += 1) {
      const p = particles[i];
      const rotatedX = p.x * cosine + p.z * sine;
      const rotatedZ = p.z * cosine - p.x * sine;
      const perspective = camera / (camera - rotatedZ);
      projected.push({
        p,
        depth: rotatedZ,
        x: width * .5 + rotatedX * scale * perspective,
        y: height * .49 + (p.y * Math.cos(tilt) - rotatedZ * Math.sin(tilt)) * scale * perspective,
        size: p.size * perspective,
      });
    }
    projected.sort((a, b) => a.depth - b.depth);
    for (const point of projected) {
      if (point.x < -3 || point.x > width + 3 || point.y < -3 || point.y > height + 3) continue;
      ctx.globalAlpha = fixed ? point.p.alpha / 255 : (point.p.alpha / 255) * (.9 + Math.sin(now * .0018 + point.p.phase) * .1);
      ctx.fillStyle = point.p.color;
      ctx.beginPath();
      ctx.arc(point.x, point.y, point.size, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
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
  sourceImage.addEventListener('load', sampleCharacter, { once: true });
})();
