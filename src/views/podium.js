// Animated pixel-art podium — GO OUEST 2026
import { computeKnockout, label } from '../tournament.js';
import { getState } from '../state.js';

// ─── Colors ────────────────────────────────────────────────────────────────
const SKIN   = '#f4c490';
const HAIR_M = '#3d2310';
const HAIR_F = '#c87842';
const SHOE   = '#2a1a0e';
const SHORTS = '#fef6ee';
const SKIRT  = '#fef6ee';
const SHIRT  = ['#c2450a', '#8a8a8a', '#a0622a']; // orange / silver / bronze
const MEDAL  = ['#ffd700', '#c8c8c8', '#cd7f32'];
const BLOCK  = ['#d4a017', '#a0a0a0', '#b87333'];
const GOLD   = '#ffd700';
const CONFETTI = ['#c2450a', '#ffd700', '#fef6ee', '#1a4a8a', '#e8670e', '#fff'];

// ─── Pixel draw helpers ────────────────────────────────────────────────────
function px(ctx, p, x, y, w, h, col) {
  ctx.fillStyle = col;
  ctx.fillRect(Math.round(x * p), Math.round(y * p), Math.round(w * p), Math.round(h * p));
}

// Male character — arms raised, celebrating
function drawMale(ctx, cx, cy, p, shirt, jumpOff) {
  ctx.save();
  ctx.translate(Math.round(cx), Math.round(cy + jumpOff));
  ctx.imageSmoothingEnabled = false;
  const r = (x, y, w, h, c) => px(ctx, p, x, y, w, h, c);

  // Hair
  r(-1, -10, 3, 1, HAIR_M);
  // Head
  r(-1, -9, 3, 3, SKIN);
  r(-1, -9, 1, 1, HAIR_M); r(1, -9, 1, 1, HAIR_M);
  r(0, -8, 1, 1, '#1a0a00'); // eye
  // Shirt
  r(-1, -6, 4, 4, shirt);
  // Shorts
  r(-1, -2, 4, 2, SHORTS);
  // Legs (jump pose — both knees slightly bent)
  r(-1, 0, 2, 2, SKIN); r(1, 0, 2, 2, SKIN);
  r(-1, 2, 2, 1, SHOE); r(1, 2, 2, 1, SHOE);
  // Arms raised up
  r(-3, -8, 2, 2, SKIN); // left arm up
  r(3, -8, 2, 2, SKIN);  // right arm up
  r(-3, -10, 2, 2, SKIN); // left hand
  r(3, -10, 2, 2, SKIN);  // right hand

  ctx.restore();
}

// Female character — arms raised, skirt, different hair
function drawFemale(ctx, cx, cy, p, shirt, jumpOff) {
  ctx.save();
  ctx.translate(Math.round(cx), Math.round(cy + jumpOff));
  ctx.imageSmoothingEnabled = false;
  const r = (x, y, w, h, c) => px(ctx, p, x, y, w, h, c);

  // Longer hair
  r(-1, -11, 3, 1, HAIR_F); r(-2, -10, 1, 4, HAIR_F); r(2, -10, 1, 4, HAIR_F);
  // Head
  r(-1, -10, 3, 3, SKIN);
  r(-1, -10, 1, 1, HAIR_F);
  r(0, -9, 1, 1, '#1a0a00'); // eye
  // Shirt
  r(-1, -7, 4, 3, shirt);
  // Skirt (wider than shorts, a-line)
  r(-2, -4, 5, 3, SKIRT);
  // Legs (jump pose)
  r(-1, -1, 2, 1, SKIN); r(1, -1, 2, 1, SKIN);
  r(-1, 0, 2, 1, SHOE);  r(1, 0, 2, 1, SHOE);
  // Arms raised
  r(-3, -9, 2, 2, SKIN); r(3, -9, 2, 2, SKIN);
  r(-3, -11, 2, 2, SKIN); r(3, -11, 2, 2, SKIN);

  ctx.restore();
}

// Trophy cup — gold pixel art
function drawTrophy(ctx, cx, cy, p) {
  ctx.save();
  ctx.translate(Math.round(cx), Math.round(cy));
  ctx.imageSmoothingEnabled = false;
  const r = (x, y, w, h, c) => px(ctx, p, x, y, w, h, c);

  r(-3, -10, 6, 1, GOLD);   // rim
  r(-3, -9,  6, 5, GOLD);   // cup body
  r(-4, -8,  1, 3, GOLD);   // left handle
  r( 3, -8,  1, 3, GOLD);   // right handle
  r(-1, -4,  2, 2, GOLD);   // stem
  r(-2, -2,  4, 1, GOLD);   // base
  // Shine
  ctx.fillStyle = 'rgba(255,255,255,0.55)';
  ctx.fillRect(Math.round(-2 * p), Math.round(-9 * p), Math.round(2 * p), Math.round(3 * p));

  ctx.restore();
}

// Confetti particles
function mkConfetti(W) {
  return Array.from({ length: 60 }, () => ({
    x: Math.random() * W,
    y: Math.random() * -200,
    vy: 1.2 + Math.random() * 2,
    vx: (Math.random() - 0.5) * 1.5,
    rot: Math.random() * Math.PI * 2,
    vrot: (Math.random() - 0.5) * 0.15,
    w: 5 + Math.random() * 6,
    h: 3 + Math.random() * 4,
    col: CONFETTI[Math.floor(Math.random() * CONFETTI.length)],
  }));
}

// ─── Main render ───────────────────────────────────────────────────────────
export function renderPodium(container) {
  const { matches } = getState();
  const { rounds, champion } = computeKnockout(matches);

  const first  = rounds.finals[0]?.winner ?? null;
  const second = rounds.finals[0]?.loser  ?? null;
  const third  = rounds.finals[1]?.winner ?? null;

  // [rank, duo, x-order on screen]
  // Classic podium: 2nd left, 1st center, 3rd right
  const podium = [
    { rank: 2, duo: second, order: 0 },
    { rank: 1, duo: first,  order: 1 },
    { rank: 3, duo: third,  order: 2 },
  ];

  container.innerHTML = `
    <div class="podium-wrap">
      <div class="podium-title">🏆 Podium GO OUEST 2026</div>
      <canvas id="podium-canvas" class="podium-canvas" aria-label="Podium animé"></canvas>
      <div class="podium-names" id="podium-names"></div>
    </div>`;

  const canvas  = container.querySelector('#podium-canvas');
  const namesEl = container.querySelector('#podium-names');
  const ctx     = canvas.getContext('2d');

  // Names row (below canvas)
  namesEl.innerHTML = podium.map(({ rank, duo }) => {
    const known = Boolean(duo?.team);
    return `
    <div class="podium-name podium-name--${rank}" style="opacity:${known ? 1 : 0.35}">
      <span class="podium-medal">${['🥇','🥈','🥉'][rank - 1]}</span>
      <span>${known ? label(duo.team) : '—'}</span>
    </div>`;
  }).join('');

  let confetti = [];
  let animId;
  let t = 0;

  function resize() {
    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    confetti = mkConfetti(canvas.width);
  }

  function tick() {
    const W = canvas.width, H = canvas.height;
    if (!W || !H) { animId = requestAnimationFrame(tick); return; }

    t += 0.05;
    ctx.clearRect(0, 0, W, H);

    // Background gradient
    const grad = ctx.createLinearGradient(0, 0, 0, H);
    grad.addColorStop(0, '#1a0a00');
    grad.addColorStop(1, '#3d1a00');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, W, H);

    const p      = Math.max(1.5, H / 100);
    const blockW = W * 0.22;
    const gap    = W * 0.05;
    const totalW = 3 * blockW + 2 * gap;
    const startX = (W - totalW) / 2;

    // Block heights: 1st tallest
    const heights = [H * 0.38, H * 0.52, H * 0.28];
    const blockBaseY = H * 0.85;

    podium.forEach(({ rank, duo }, i) => {
      const bh   = heights[i];
      const bx   = startX + i * (blockW + gap);
      const by   = blockBaseY - bh;
      const bcx  = bx + blockW / 2;
      const known = Boolean(duo?.team);

      // Podium block
      ctx.fillStyle = known ? BLOCK[rank - 1] : '#4a3a2a';
      ctx.fillRect(Math.round(bx), Math.round(by), Math.round(blockW), Math.round(bh));
      ctx.fillStyle = 'rgba(255,255,255,0.10)';
      ctx.fillRect(Math.round(bx), Math.round(by), Math.round(blockW * 0.3), Math.round(bh));

      // Rank number
      ctx.save();
      ctx.font = `bold ${Math.round(p * 7)}px monospace`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = 'rgba(0,0,0,0.35)';
      ctx.fillText(rank, Math.round(bcx), Math.round(by + bh * 0.5));
      ctx.fillStyle = known ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.25)';
      ctx.fillText(rank, Math.round(bcx), Math.round(by + bh * 0.5));
      ctx.restore();

      const phase  = [0, Math.PI * 0.6, Math.PI * 1.2][i];
      const jump   = Math.abs(Math.sin(t + phase)) * p * -7;
      const spacing = p * 7;
      const playerY = by - p * 2;

      if (known) {
        drawMale  (ctx, bcx - spacing, playerY, p, SHIRT[rank - 1], jump);
        drawFemale(ctx, bcx + spacing, playerY, p, SHIRT[rank - 1], jump);
        if (rank === 1) drawTrophy(ctx, bcx, by - p * 14 + jump * 0.5, p);
      } else {
        // Empty silhouettes — greyed out, no jump
        ctx.save();
        ctx.globalAlpha = 0.18;
        drawMale  (ctx, bcx - spacing, playerY, p, '#ffffff', 0);
        drawFemale(ctx, bcx + spacing, playerY, p, '#ffffff', 0);
        ctx.restore();
        // "?" label
        ctx.save();
        ctx.font = `bold ${Math.round(p * 5)}px monospace`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'bottom';
        ctx.fillStyle = 'rgba(255,255,255,0.25)';
        ctx.fillText('?', Math.round(bcx), Math.round(by - p));
        ctx.restore();
      }
    });

    // Confetti
    for (const c of confetti) {
      c.x += c.vx; c.y += c.vy; c.rot += c.vrot;
      if (c.y > H + 20) { c.y = -20; c.x = Math.random() * W; }
      ctx.save();
      ctx.translate(c.x, c.y);
      ctx.rotate(c.rot);
      ctx.fillStyle = c.col;
      ctx.globalAlpha = 0.85;
      ctx.fillRect(-c.w / 2, -c.h / 2, c.w, c.h);
      ctx.restore();
    }

    animId = requestAnimationFrame(tick);
  }

  const ro = new ResizeObserver(() => { resize(); });
  ro.observe(canvas);
  // Defer start to ensure canvas is in DOM with correct dimensions
  requestAnimationFrame(() => requestAnimationFrame(() => {
    resize();
    tick();
  }));

  // Return cleanup
  return () => { cancelAnimationFrame(animId); ro.disconnect(); };
}
