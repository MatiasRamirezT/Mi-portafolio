/* A single, time-based canvas loop. Decorative; never hides the HTML content. */
(() => {
  const canvas = document.querySelector('.plasma-canvas');
  const scene = document.querySelector('.sword-scene');
  const toggle = document.querySelector('.plasma-toggle');
  if (!canvas || !scene || !toggle) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let active = false, paused = false, visible = true, frame = 0, previous = 0;
  let width = 0, height = 0, particles = [], emission = 0;
  const upper = [[.16,.17],[.29,.25],[.48,.32],[.70,.35],[.96,.36]];
  const lower = [[.16,.94],[.29,.85],[.48,.77],[.70,.74],[.96,.73]];
  function point(path, t) {
    const position = t * (path.length - 1), i = Math.min(path.length - 2, Math.floor(position));
    const mix = position - i;
    return { x: (path[i][0] + (path[i+1][0]-path[i][0])*mix)*width,
      y: (path[i][1] + (path[i+1][1]-path[i][1])*mix)*height };
  }
  function clear() { ctx.clearRect(0, 0, width, height); }
  function resize() {
    const box = scene.getBoundingClientRect(), ratio = Math.min(devicePixelRatio || 1, 1.5);
    width = box.width; height = box.height;
    canvas.width = Math.round(width * ratio); canvas.height = Math.round(height * ratio);
    ctx.setTransform(ratio,0,0,ratio,0,0); particles = [];
  }
  function draw(now) {
    frame = 0;
    const dt = Math.min((now-previous)/1000 || 0, .04); previous = now;
    clear(); emission += dt * (width < 600 ? 28 : 65);
    while (emission >= 1 && particles.length < 140) {
      emission--;
      const direction = Math.random() > .5 ? 1 : -1;
      const origin = point(direction < 0 ? upper : lower, Math.random());
      particles.push({ ...origin, vx: 8 + Math.random()*30,
        vy: direction*(8+Math.random()*28), life: 0, duration: .5+Math.random()*.9,
        seed: Math.random()*6.28, size: .5+Math.random()*1.8 });
    }
    ctx.globalCompositeOperation = 'lighter';
    // Filaments follow the plasma edges; low-amplitude motion avoids flashing.
    for (const [index,path] of [upper,lower].entries()) {
      ctx.beginPath();
      for (let i=0;i<=90;i++) {
        const p=point(path,i/90);
        p.y += Math.sin(i*.65+now*.003)*Math.sin(i/90*Math.PI)*3;
        if(i===0)ctx.moveTo(p.x,p.y);else ctx.lineTo(p.x,p.y);
      }
      ctx.strokeStyle='rgba(255, 66, 27, .65)';ctx.lineWidth=1.2;
      ctx.shadowColor='#ff260c';ctx.shadowBlur=10;ctx.stroke();
    }
    particles = particles.filter(p => p.life < p.duration);
    for(const p of particles) {
      p.life += dt; p.x += p.vx*dt; p.y += p.vy*dt;
      const alpha = Math.sin(Math.PI*Math.min(p.life/p.duration,1))*.75;
      const drift = Math.sin(p.life*7+p.seed)*3;
      ctx.beginPath();ctx.moveTo(p.x,p.y);
      ctx.quadraticCurveTo(p.x-5,p.y+drift,p.x-10,p.y-p.vy*.08);
      ctx.strokeStyle=`rgba(255, ${Math.round(70+100*alpha)}, 45, ${alpha})`;
      ctx.lineWidth=p.size;ctx.shadowBlur=7;ctx.stroke();
    }
    ctx.shadowBlur=0;ctx.globalCompositeOperation='source-over';
    frame=requestAnimationFrame(draw);
  }
  function sync() {
    const running = active && !paused && !reduced.matches && visible && !document.hidden;
    toggle.hidden = !active || reduced.matches;
    toggle.textContent = paused ? 'Reanudar plasma' : 'Pausar plasma';
    toggle.setAttribute('aria-pressed', String(paused));
    canvas.dataset.running = String(running);
    if(running && !frame) { previous=performance.now();frame=requestAnimationFrame(draw); }
    if(!running) { cancelAnimationFrame(frame);frame=0;particles=[];emission=0;clear(); }
  }
  toggle.addEventListener('click',()=>{paused=!paused;sync();});
  scene.addEventListener('swordchange',e=>{active=e.detail.active;sync();});
  document.addEventListener('visibilitychange',sync);
  reduced.addEventListener('change',sync);
  new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;sync();}).observe(scene);
  new ResizeObserver(resize).observe(scene);
  resize();sync();
})();
