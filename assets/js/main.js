const header = document.querySelector('.site-header');
const main = document.querySelector('#contenido');
const routeSvg = document.querySelector('.plasma-pathway');
const routeGlow = document.querySelector('.plasma-route-glow');
const routeCore = document.querySelector('.plasma-route-core');
const routeRunner = document.querySelector('.plasma-route-runner');
const routeNodes = document.querySelector('.plasma-route-nodes');
let queued = false;
let routeQueued = false;

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

function drawPlasmaRoute() {
  if (!main || !routeSvg) return;
  const mainRect = main.getBoundingClientRect();
  const width = main.clientWidth;
  const height = main.scrollHeight;
  routeSvg.setAttribute('viewBox', `0 0 ${width} ${height}`);
  routeSvg.setAttribute('width', width);
  routeSvg.setAttribute('height', height);

  const targets = [
    document.querySelector('.hero-intro h1'),
    document.querySelector('.profile-details .section-heading'),
    ...document.querySelectorAll('main > section:not(#perfil) > .section-heading'),
  ].filter(Boolean);
  const points = targets.map((target, index) => {
    const rect = (target.querySelector?.('.section-kicker') || target).getBoundingClientRect();
    const x = index === 0
      ? rect.left - mainRect.left + Math.min(rect.width * .46, 290)
      : Math.max(15, rect.left - mainRect.left - 45);
    const y = index === 0
      ? rect.top - mainRect.top + rect.height + 38
      : rect.top - mainRect.top + Math.min(rect.height * .5, 12);
    return { x: Math.max(10, Math.min(width - 10, x)), y: Math.max(10, Math.min(height - 10, y)) };
  });
  if (!points.length) return;

  let path = `M ${points[0].x} ${points[0].y}`;
  for (let i = 1; i < points.length; i += 1) {
    const from = points[i - 1];
    const to = points[i];
    const middleY = from.y + (to.y - from.y) * .5;
    const sway = Math.min(62, Math.max(20, Math.abs(to.y - from.y) * .055)) * (i % 2 ? 1 : -1);
    path += ` C ${from.x + sway} ${middleY - 26}, ${to.x + sway} ${middleY + 26}, ${to.x} ${to.y}`;
  }
  routeGlow.setAttribute('d', path);
  routeCore.setAttribute('d', path);
  routeRunner.setAttribute('d', path);
  routeNodes.replaceChildren();
  const ns = 'http://www.w3.org/2000/svg';
  for (const point of points) {
    const halo = document.createElementNS(ns, 'circle');
    halo.setAttribute('cx', point.x);
    halo.setAttribute('cy', point.y);
    halo.setAttribute('r', '9');
    halo.setAttribute('class', 'plasma-route-node-halo');
    const core = document.createElementNS(ns, 'circle');
    core.setAttribute('cx', point.x);
    core.setAttribute('cy', point.y);
    core.setAttribute('r', '3.5');
    core.setAttribute('class', 'plasma-route-node-core');
    routeNodes.append(halo, core);
  }
}
function queueRoute() {
  if (routeQueued) return;
  routeQueued = true;
  window.requestAnimationFrame(() => {
    drawPlasmaRoute();
    routeQueued = false;
  });
}
window.addEventListener('resize', queueRoute, { passive: true });
window.addEventListener('portfolio-language-change', queueRoute);
if ('ResizeObserver' in window) new ResizeObserver(queueRoute).observe(main);
if (document.fonts?.ready) document.fonts.ready.then(queueRoute);
queueRoute();
