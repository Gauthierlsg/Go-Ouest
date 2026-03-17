// Animated tennis court header — pure Canvas2D, no dependencies

const CLAY_R = 194, CLAY_G = 69, CLAY_B = 10; // #c2450a

function noise2(x, y, t) {
  return (
    Math.sin(x * 0.31 + t * 0.71) * 0.35 +
    Math.sin(y * 0.43 + t * 0.53 + 1.3) * 0.35 +
    Math.sin((x + y) * 0.17 + t * 0.89 + 2.7) * 0.30
  );
}

function courtBounds(W, H) {
  const mx = W * 0.07, my = H * 0.10;
  return { x: mx, y: my, w: W - mx * 2, h: H - my * 2 };
}

function drawCourt(ctx, c) {
  const mid = c.x + c.w / 2;
  const sl = c.h * 0.18;

  ctx.save();
  ctx.strokeStyle = 'rgba(255,255,255,0.55)';
  ctx.lineWidth = 1.5;

  // Outer boundary
  ctx.strokeRect(c.x, c.y, c.w, c.h);

  // Service lines
  ctx.beginPath();
  ctx.moveTo(c.x, c.y + sl);           ctx.lineTo(c.x + c.w, c.y + sl);
  ctx.moveTo(c.x, c.y + c.h - sl);    ctx.lineTo(c.x + c.w, c.y + c.h - sl);
  ctx.stroke();

  // Service box verticals
  ctx.beginPath();
  ctx.moveTo(c.x + c.w * 0.275, c.y + sl); ctx.lineTo(c.x + c.w * 0.275, c.y + c.h - sl);
  ctx.moveTo(c.x + c.w * 0.725, c.y + sl); ctx.lineTo(c.x + c.w * 0.725, c.y + c.h - sl);
  ctx.stroke();

  // Center service line
  ctx.beginPath();
  ctx.moveTo(mid, c.y + sl); ctx.lineTo(mid, c.y + c.h - sl);
  ctx.stroke();

  // Side center marks
  const midY = c.y + c.h / 2;
  ctx.beginPath();
  ctx.moveTo(c.x, midY - 4);       ctx.lineTo(c.x + 10, midY - 4);
  ctx.moveTo(c.x, midY + 4);       ctx.lineTo(c.x + 10, midY + 4);
  ctx.moveTo(c.x + c.w, midY - 4); ctx.lineTo(c.x + c.w - 10, midY - 4);
  ctx.moveTo(c.x + c.w, midY + 4); ctx.lineTo(c.x + c.w - 10, midY + 4);
  ctx.stroke();

  // Net (thicker, brighter)
  ctx.strokeStyle = 'rgba(255,255,255,0.80)';
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.moveTo(mid, c.y); ctx.lineTo(mid, c.y + c.h);
  ctx.stroke();

  ctx.restore();
}

function makeBall(c, i, total) {
  return {
    x: c.x + ((i + 1) / (total + 1)) * c.w,
    y: c.y + c.h / 2 + (Math.random() - 0.5) * c.h * 0.4,
    vx: (Math.random() < 0.5 ? 1 : -1) * (1.2 + Math.random()),
    vy: (Math.random() < 0.5 ? 1 : -1) * (0.8 + Math.random()),
    nx: Math.random() * 200,
    ny: Math.random() * 200,
    trail: [],
  };
}

export function initHeaderArt() {
  const canvas = document.getElementById('header-art');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let W = 0, H = 0, balls = [], frame = 0, animId;
  let firstDraw = true;

  function resize() {
    W = canvas.width = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
    if (!W || !H) return;
    firstDraw = true;
    const c = courtBounds(W, H);
    balls = Array.from({ length: 4 }, (_, i) => makeBall(c, i, 4));
  }

  function tick() {
    if (!W || !H) { animId = requestAnimationFrame(tick); return; }

    const t = frame * 0.009;
    const c = courtBounds(W, H);

    // Fade: first frame paint solid, then semi-transparent overlay for ghost trails
    if (firstDraw) {
      ctx.fillStyle = `rgb(${CLAY_R},${CLAY_G},${CLAY_B})`;
      ctx.fillRect(0, 0, W, H);
      firstDraw = false;
    } else {
      ctx.fillStyle = `rgba(${CLAY_R},${CLAY_G},${CLAY_B},0.28)`;
      ctx.fillRect(0, 0, W, H);
    }

    drawCourt(ctx, c);

    for (const b of balls) {
      // Noise-driven steering
      b.nx += 0.013; b.ny += 0.013;
      b.vx += noise2(b.nx, b.ny, t) * 0.18;
      b.vy += noise2(b.ny, b.nx + 70, t) * 0.18;

      // Speed clamping
      const sp = Math.hypot(b.vx, b.vy);
      if (sp > 3.2) { b.vx *= 3.2 / sp; b.vy *= 3.2 / sp; }
      if (sp < 0.6) { b.vx *= 1.6; b.vy *= 1.6; }

      b.x += b.vx; b.y += b.vy;

      // Bounce
      if (b.x < c.x)        { b.x = c.x;        b.vx =  Math.abs(b.vx); }
      if (b.x > c.x + c.w)  { b.x = c.x + c.w;  b.vx = -Math.abs(b.vx); }
      if (b.y < c.y)        { b.y = c.y;        b.vy =  Math.abs(b.vy); }
      if (b.y > c.y + c.h)  { b.y = c.y + c.h;  b.vy = -Math.abs(b.vy); }

      // Trail
      b.trail.push({ x: b.x, y: b.y });
      if (b.trail.length > 40) b.trail.shift();

      for (let i = 0; i < b.trail.length; i++) {
        const ratio = i / b.trail.length;
        const r = 2.5 * ratio;
        const a = ratio * 0.65;
        ctx.beginPath();
        ctx.arc(b.trail[i].x, b.trail[i].y, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,248,220,${a})`;
        ctx.fill();
      }

      // Ball
      ctx.beginPath();
      ctx.arc(b.x, b.y, 4.5, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255,255,235,0.95)';
      ctx.fill();
    }

    frame++;
    animId = requestAnimationFrame(tick);
  }

  const ro = new ResizeObserver(() => resize());
  ro.observe(canvas);
  resize();
  tick();

  return () => { cancelAnimationFrame(animId); ro.disconnect(); };
}
