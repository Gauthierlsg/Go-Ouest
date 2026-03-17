// Animated tennis court header — straight-line ball physics, pure Canvas2D

const CLAY_R = 194, CLAY_G = 69, CLAY_B = 10; // #c2450a

// Court proportions matching the original SVG (viewBox 900×220)
// Court rect: x=75 y=15 w=750 h=190
function courtBounds(W, H) {
  const mx = W * 0.0833, my = H * 0.068;
  return { x: mx, y: my, w: W - mx * 2, h: H - my * 2 };
}

function drawCourt(ctx, c) {
  const mid = c.x + c.w / 2;
  const slT = c.y + c.h * 0.142;   // service line top
  const slB = c.y + c.h * 0.858;   // service line bottom
  const sbL = c.x + c.w * 0.229;   // service box left vertical
  const sbR = c.x + c.w * 0.771;   // service box right vertical
  const midY = c.y + c.h * 0.5;

  ctx.save();
  ctx.strokeStyle = 'rgba(255,255,255,0.55)';
  ctx.lineWidth = 1.5;

  // Outer rectangle
  ctx.strokeRect(c.x, c.y, c.w, c.h);

  // Service lines (horizontal)
  ctx.beginPath();
  ctx.moveTo(c.x, slT); ctx.lineTo(c.x + c.w, slT);
  ctx.moveTo(c.x, slB); ctx.lineTo(c.x + c.w, slB);
  ctx.stroke();

  // Service box verticals
  ctx.beginPath();
  ctx.moveTo(sbL, slT); ctx.lineTo(sbL, slB);
  ctx.moveTo(sbR, slT); ctx.lineTo(sbR, slB);
  ctx.stroke();

  // Half-court center service marks (short, stop before center)
  ctx.beginPath();
  ctx.moveTo(sbL, midY); ctx.lineTo(c.x + c.w * 0.380, midY);
  ctx.moveTo(sbR, midY); ctx.lineTo(c.x + c.w * 0.620, midY);
  ctx.stroke();

  // Side center markers (= sign)
  ctx.beginPath();
  ctx.moveTo(c.x,       midY - 4); ctx.lineTo(c.x + 10,      midY - 4);
  ctx.moveTo(c.x,       midY + 4); ctx.lineTo(c.x + 10,      midY + 4);
  ctx.moveTo(c.x + c.w, midY - 4); ctx.lineTo(c.x + c.w - 10, midY - 4);
  ctx.moveTo(c.x + c.w, midY + 4); ctx.lineTo(c.x + c.w - 10, midY + 4);
  ctx.stroke();

  // Net: two SHORT stubs at top and bottom (like original SVG), not full line
  ctx.strokeStyle = 'rgba(255,255,255,0.80)';
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  // Top stub: from court top to just past top service line
  ctx.moveTo(mid, c.y);  ctx.lineTo(mid, c.y + c.h * 0.163);
  // Bottom stub: from just before bottom service line to court bottom
  ctx.moveTo(mid, c.y + c.h * 0.837); ctx.lineTo(mid, c.y + c.h);
  ctx.stroke();

  ctx.restore();
}

function makeBall(c, i, total) {
  const side = i % 2 === 0 ? -1 : 1;
  const angle = (0.3 + Math.random() * 0.5) * (Math.random() < 0.5 ? 1 : -1);
  const speed = 2.2 + Math.random() * 1.4;
  return {
    x: c.x + (i % 2 === 0 ? c.w * 0.15 : c.w * 0.85),
    y: c.y + c.h * (0.2 + (i / total) * 0.6),
    vx: side * Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed,
    trail: [],
  };
}

export function initHeaderArt() {
  const canvas = document.getElementById('header-art');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let W = 0, H = 0, balls = [], animId, firstDraw = true;

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

    const c = courtBounds(W, H);

    // First frame: solid fill; subsequent frames: semi-transparent for ghost trails
    if (firstDraw) {
      ctx.fillStyle = `rgb(${CLAY_R},${CLAY_G},${CLAY_B})`;
      ctx.fillRect(0, 0, W, H);
      firstDraw = false;
    } else {
      ctx.fillStyle = `rgba(${CLAY_R},${CLAY_G},${CLAY_B},0.30)`;
      ctx.fillRect(0, 0, W, H);
    }

    drawCourt(ctx, c);

    for (const b of balls) {
      // Straight-line movement — no noise
      b.x += b.vx;
      b.y += b.vy;

      // Bounce off court bounds
      if (b.x < c.x)       { b.x = c.x;       b.vx =  Math.abs(b.vx); }
      if (b.x > c.x + c.w) { b.x = c.x + c.w; b.vx = -Math.abs(b.vx); }
      if (b.y < c.y)       { b.y = c.y;       b.vy =  Math.abs(b.vy); }
      if (b.y > c.y + c.h) { b.y = c.y + c.h; b.vy = -Math.abs(b.vy); }

      // Trail
      b.trail.push({ x: b.x, y: b.y });
      if (b.trail.length > 38) b.trail.shift();

      for (let i = 0; i < b.trail.length; i++) {
        const ratio = i / b.trail.length;
        ctx.beginPath();
        ctx.arc(b.trail[i].x, b.trail[i].y, 2.5 * ratio, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,248,220,${ratio * 0.7})`;
        ctx.fill();
      }

      // Ball
      ctx.beginPath();
      ctx.arc(b.x, b.y, 4.5, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255,255,235,0.95)';
      ctx.fill();
    }

    animId = requestAnimationFrame(tick);
  }

  const ro = new ResizeObserver(() => resize());
  ro.observe(canvas);
  resize();
  tick();

  return () => { cancelAnimationFrame(animId); ro.disconnect(); };
}
