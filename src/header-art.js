// Animated tennis header — two stick-figure players rallying

const CLAY_R = 194, CLAY_G = 69, CLAY_B = 10;

function courtBounds(W, H) {
  const mx = W * 0.0833, my = H * 0.068;
  return { x: mx, y: my, w: W - mx * 2, h: H - my * 2 };
}

function drawCourt(ctx, c) {
  const mid  = c.x + c.w / 2;
  const slT  = c.y + c.h * 0.142;
  const slB  = c.y + c.h * 0.858;
  const sbL  = c.x + c.w * 0.229;
  const sbR  = c.x + c.w * 0.771;
  const midY = c.y + c.h * 0.5;

  ctx.save();
  ctx.strokeStyle = 'rgba(255,255,255,0.55)';
  ctx.lineWidth = 1.5;

  ctx.strokeRect(c.x, c.y, c.w, c.h);

  ctx.beginPath();
  ctx.moveTo(c.x, slT); ctx.lineTo(c.x + c.w, slT);
  ctx.moveTo(c.x, slB); ctx.lineTo(c.x + c.w, slB);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(sbL, slT); ctx.lineTo(sbL, slB);
  ctx.moveTo(sbR, slT); ctx.lineTo(sbR, slB);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(sbL, midY); ctx.lineTo(c.x + c.w * 0.380, midY);
  ctx.moveTo(sbR, midY); ctx.lineTo(c.x + c.w * 0.620, midY);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(c.x,       midY); ctx.lineTo(c.x + 10,       midY);
  ctx.moveTo(c.x + c.w, midY); ctx.lineTo(c.x + c.w - 10, midY);
  ctx.stroke();

  // Net: short stubs only (not full line, matching original SVG)
  ctx.strokeStyle = 'rgba(255,255,255,0.80)';
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.moveTo(mid, c.y);                ctx.lineTo(mid, c.y + c.h * 0.163);
  ctx.moveTo(mid, c.y + c.h * 0.837); ctx.lineTo(mid, c.y + c.h);
  ctx.stroke();

  ctx.restore();
}

// facing: 'right' | 'left'
function drawPlayer(ctx, x, y, facing, s, hitting) {
  ctx.save();
  ctx.strokeStyle = 'rgba(255,255,255,0.92)';
  ctx.fillStyle   = 'rgba(255,255,255,0.92)';
  ctx.lineWidth   = Math.max(1.2, 2.2 * s);
  ctx.lineCap     = 'round';
  ctx.lineJoin    = 'round';

  const dir = facing === 'right' ? 1 : -1;

  // Head
  ctx.beginPath();
  ctx.arc(x, y - 13 * s, 4.5 * s, 0, Math.PI * 2);
  ctx.fill();

  // Torso
  ctx.beginPath();
  ctx.moveTo(x, y - 8.5 * s);
  ctx.lineTo(x, y + 3 * s);
  ctx.stroke();

  // Legs — slight squat stance
  ctx.beginPath();
  ctx.moveTo(x, y + 3 * s);
  ctx.lineTo(x - 4.5 * s, y + 13 * s);
  ctx.moveTo(x, y + 3 * s);
  ctx.lineTo(x + 4.5 * s, y + 13 * s);
  ctx.stroke();

  // Racket arm — raised when hitting
  const armSwing = hitting ? -0.6 : 0.1;
  const armEndX  = x + dir * 9 * s;
  const armEndY  = y - 4 * s + armSwing * 4 * s;

  ctx.beginPath();
  ctx.moveTo(x, y - 5 * s);
  ctx.lineTo(armEndX, armEndY);
  ctx.stroke();

  // Racket head (ellipse)
  ctx.save();
  ctx.translate(armEndX + dir * 5 * s, armEndY - 1 * s);
  ctx.rotate(facing === 'right' ? 0.25 : -0.25);
  ctx.beginPath();
  ctx.ellipse(0, 0, 4 * s, 6.5 * s, 0, 0, Math.PI * 2);
  ctx.strokeStyle = 'rgba(255,210,40,0.95)';
  ctx.lineWidth   = Math.max(1, 1.5 * s);
  ctx.stroke();
  // Cross strings
  ctx.lineWidth = Math.max(0.5, 0.8 * s);
  ctx.strokeStyle = 'rgba(255,210,40,0.45)';
  ctx.beginPath();
  ctx.moveTo(-4 * s, 0); ctx.lineTo(4 * s, 0);
  ctx.moveTo(0, -6.5 * s); ctx.lineTo(0, 6.5 * s);
  ctx.stroke();
  ctx.restore();

  ctx.restore();
}

export function initHeaderArt() {
  const canvas = document.getElementById('header-art');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let W = 0, H = 0, animId;

  // Ball
  const ball = { x: 0, y: 0, vx: 0, vy: 0, trail: [] };

  // Players: index 0 = left, index 1 = right
  const players = [
    { y: 0, hitting: false },
    { y: 0, hitting: false },
  ];

  function resetBall(c) {
    const speed = 2.2 + Math.random() * 0.6;
    ball.x  = c.x + c.w * 0.3;
    ball.y  = c.y + c.h * (0.3 + Math.random() * 0.4);
    ball.vx = speed;
    ball.vy = (Math.random() - 0.5) * 1.2;
    ball.trail = [];
    players[0].y = ball.y;
    players[1].y = ball.y;
  }

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
    if (!W || !H) return;
    const c = courtBounds(W, H);
    resetBall(c);
  }

  function tick() {
    if (!W || !H) { animId = requestAnimationFrame(tick); return; }

    const c = courtBounds(W, H);
    const s = Math.max(0.55, H / 210);       // player scale
    const pxL = c.x - 6 * s;                  // left  player X (outside baseline)
    const pxR = c.x + c.w + 6 * s;            // right player X

    // Solid clear each frame
    ctx.fillStyle = `rgb(${CLAY_R},${CLAY_G},${CLAY_B})`;
    ctx.fillRect(0, 0, W, H);

    drawCourt(ctx, c);

    // Move ball
    ball.x += ball.vx;
    ball.y += ball.vy;

    // Bounce top / bottom
    if (ball.y < c.y)       { ball.y = c.y;       ball.vy =  Math.abs(ball.vy); }
    if (ball.y > c.y + c.h) { ball.y = c.y + c.h; ball.vy = -Math.abs(ball.vy); }

    // Left player returns
    if (ball.vx < 0 && ball.x <= pxL) {
      ball.x  = pxL;
      ball.vx =  Math.abs(ball.vx);
      ball.vy = (Math.random() - 0.5) * 2.0;
      players[0].hitting = true;
      setTimeout(() => { players[0].hitting = false; }, 120);
    }

    // Right player returns
    if (ball.vx > 0 && ball.x >= pxR) {
      ball.x  = pxR;
      ball.vx = -Math.abs(ball.vx);
      ball.vy = (Math.random() - 0.5) * 2.0;
      players[1].hitting = true;
      setTimeout(() => { players[1].hitting = false; }, 120);
    }

    // Players smoothly track ball Y
    const lag = 0.07;
    players[0].y += (ball.y - players[0].y) * lag;
    players[1].y += (ball.y - players[1].y) * lag;

    // Clamp to court
    const margin = 14 * s;
    players[0].y = Math.max(c.y + margin, Math.min(c.y + c.h - margin, players[0].y));
    players[1].y = Math.max(c.y + margin, Math.min(c.y + c.h - margin, players[1].y));

    // Draw players
    drawPlayer(ctx, pxL, players[0].y, 'right', s, players[0].hitting);
    drawPlayer(ctx, pxR, players[1].y, 'left',  s, players[1].hitting);

    // Ball trail
    ball.trail.push({ x: ball.x, y: ball.y });
    if (ball.trail.length > 8) ball.trail.shift();

    for (let i = 0; i < ball.trail.length; i++) {
      const ratio = i / ball.trail.length;
      ctx.beginPath();
      ctx.arc(ball.trail[i].x, ball.trail[i].y, 2.5 * ratio, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(200,255,50,${ratio * 0.35})`;
      ctx.fill();
    }

    // Ball
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, 4.5, 0, Math.PI * 2);
    ctx.fillStyle = '#c8ff40';
    ctx.fill();

    animId = requestAnimationFrame(tick);
  }

  const ro = new ResizeObserver(() => resize());
  ro.observe(canvas);
  resize();
  tick();

  return () => { cancelAnimationFrame(animId); ro.disconnect(); };
}
