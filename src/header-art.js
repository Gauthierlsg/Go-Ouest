// Animated tennis header — pixel-art players, court movement, variable ball rhythm
// All drawing uses fillRect only (no arcs) for pixel art feel

const CLAY_R = 194, CLAY_G = 69, CLAY_B = 10;
const SKIN   = '#f4c490';
const HAIR   = '#3d2310';
const SHIRT  = '#e8670e';   // GO OUEST orange
const SHORTS = '#fef6ee';
const SHOE   = '#2a1a0e';
const RAQUET = '#f5c518';
const STR    = 'rgba(255,255,255,0.6)';

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

  ctx.strokeStyle = 'rgba(255,255,255,0.80)';
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.moveTo(mid, c.y);                ctx.lineTo(mid, c.y + c.h * 0.163);
  ctx.moveTo(mid, c.y + c.h * 0.837); ctx.lineTo(mid, c.y + c.h);
  ctx.stroke();
  ctx.restore();
}

// p = one "pixel" size in screen px
// facing: 'right' | 'left'
// state: 'idle' | 'run' | 'hit'
// frame: 0 or 1 for run animation
function drawPixelPlayer(ctx, cx, cy, facing, state, frame, p) {
  ctx.save();
  ctx.translate(Math.round(cx), Math.round(cy));
  if (facing === 'left') ctx.scale(-1, 1);
  ctx.imageSmoothingEnabled = false;

  const r = (x, y, w, h, col) => {
    ctx.fillStyle = col;
    ctx.fillRect(Math.round(x * p), Math.round(y * p), Math.round(w * p), Math.round(h * p));
  };

  // ─── Head ───
  r(-2, -13, 4, 1, HAIR);
  r(-2, -12, 4, 4, SKIN);
  r(-2, -12, 1, 1, HAIR);  // sideburn
  r( 1, -12, 1, 1, HAIR);
  r(-1, -10, 1, 1, '#1a0a00'); // left eye
  r( 1, -10, 1, 1, '#1a0a00'); // right eye

  // ─── Torso ───
  r(-2, -8, 5, 5, SHIRT);

  // ─── Shorts ───
  r(-2, -3, 5, 3, SHORTS);

  // ─── Legs & shoes ───
  if (state === 'run') {
    if (frame === 0) {
      // left leg forward, right leg back
      r(-2,  0, 2, 4, SKIN);
      r( 1,  1, 2, 3, SKIN);
      r(-3,  4, 3, 2, SHOE); // left shoe (forward)
      r( 1,  4, 2, 2, SHOE);
    } else {
      r(-2,  1, 2, 3, SKIN);
      r( 1,  0, 2, 4, SKIN);
      r(-2,  4, 2, 2, SHOE);
      r( 1,  4, 3, 2, SHOE); // right shoe (forward)
    }
  } else {
    // idle / hit: slight squat
    r(-2,  0, 2, 4, SKIN);
    r( 1,  0, 2, 4, SKIN);
    r(-3,  4, 3, 2, SHOE);
    r( 1,  4, 3, 2, SHOE);
  }

  // ─── Arms ───
  if (state === 'hit') {
    // back-swing arm
    r(-4, -8, 2, 4, SKIN);
    // hitting arm raised forward
    r( 3, -9, 2, 2, SKIN);
    r( 4, -11, 2, 3, SKIN);
    // Racket — extended on hit
    r( 5, -14, 2, 9, RAQUET);
    r( 6, -13, 1, 7, STR);
  } else {
    // normal ready position
    r(-3, -8, 2, 4, SKIN);  // off-hand arm
    r( 3, -8, 2, 4, SKIN);  // racket arm
    // Racket — vertical ready
    r( 4, -12, 2, 8, RAQUET);
    r( 5, -11, 1, 6, STR);
  }

  ctx.restore();
}

// Draw a pixel-art tennis ball at (x,y) with size p*3
function drawPixelBall(ctx, x, y, p) {
  ctx.imageSmoothingEnabled = false;
  const s = Math.max(2, Math.round(p * 3));
  // Shadow
  ctx.fillStyle = 'rgba(0,0,0,0.25)';
  ctx.fillRect(Math.round(x - s / 2 + 1), Math.round(y - s / 2 + 2), s, s);
  // Ball body
  ctx.fillStyle = '#c8ff40';
  ctx.fillRect(Math.round(x - s / 2), Math.round(y - s / 2), s, s);
  // Highlight pixel
  ctx.fillStyle = 'rgba(255,255,255,0.7)';
  ctx.fillRect(Math.round(x - s / 2), Math.round(y - s / 2), Math.ceil(s / 3), Math.ceil(s / 3));
}

export function initHeaderArt() {
  const canvas = document.getElementById('header-art');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let W = 0, H = 0, animId;

  // ── Ball state ──
  const ball = { x: 0, y: 0, vx: 0, vy: 0, speed: 2.4, trail: [] };

  // ── Player state ──
  // x: current X, y: current Y, tx/ty: target position
  const players = [
    { x: 0, y: 0, tx: 0, ty: 0, facing: 'right', state: 'idle', frame: 0, frameTimer: 0, hitting: false },
    { x: 0, y: 0, tx: 0, ty: 0, facing: 'left',  state: 'idle', frame: 0, frameTimer: 0, hitting: false },
  ];

  // ── Rhythm timers ──
  let rhythmTimer = 0;
  const RHYTHM_INTERVAL = 180; // frames between speed changes

  function resetBall(c) {
    ball.speed = 2.0 + Math.random() * 0.8;
    ball.x  = c.x + c.w * 0.35;
    ball.y  = c.y + c.h * (0.3 + Math.random() * 0.4);
    ball.vx =  ball.speed;
    ball.vy = (Math.random() - 0.5) * 1.4;
    ball.trail = [];
  }

  function playerReady(pl, c, side) {
    // "Ready position": near own baseline, center-Y
    const halfW = c.w * 0.12;
    pl.tx = side === 0
      ? c.x + halfW
      : c.x + c.w - halfW;
    pl.ty = c.y + c.h * 0.5;
  }

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
    if (!W || !H) return;
    const c = courtBounds(W, H);
    resetBall(c);
    players[0].x = c.x + c.w * 0.10; players[0].y = c.y + c.h * 0.5;
    players[1].x = c.x + c.w * 0.90; players[1].y = c.y + c.h * 0.5;
    playerReady(players[0], c, 0);
    playerReady(players[1], c, 1);
  }

  let tick_n = 0;

  function tick() {
    if (!W || !H) { animId = requestAnimationFrame(tick); return; }
    tick_n++;

    const c  = courtBounds(W, H);
    const p  = Math.max(2, H / 90);  // 1 "pixel" in screen px
    const mid = c.x + c.w / 2;

    // ── Rhythm: randomly change ball speed ──
    rhythmTimer++;
    if (rhythmTimer >= RHYTHM_INTERVAL) {
      rhythmTimer = 0;
      // 40% chance power shot, 60% normal
      const power = Math.random() < 0.4;
      const dir   = ball.vx > 0 ? 1 : -1;
      ball.speed  = power ? 3.8 + Math.random() * 1.2 : 1.5 + Math.random() * 1.0;
      const angle = (Math.random() - 0.5) * 1.0;
      ball.vx     = dir * ball.speed * Math.cos(angle);
      ball.vy     = ball.speed * Math.sin(angle);
    }

    // ── Move ball ──
    ball.x += ball.vx;
    ball.y += ball.vy;

    // Gradual speed decay toward 2.0
    ball.speed = ball.speed * 0.999 + 2.0 * 0.001;
    const spd  = Math.hypot(ball.vx, ball.vy);
    if (spd > 0.1) { ball.vx = (ball.vx / spd) * ball.speed; ball.vy = (ball.vy / spd) * ball.speed; }

    // Bounce top / bottom
    if (ball.y < c.y)       { ball.y = c.y;       ball.vy =  Math.abs(ball.vy); }
    if (ball.y > c.y + c.h) { ball.y = c.y + c.h; ball.vy = -Math.abs(ball.vy); }

    // Reach left player zone
    const hitZoneL = players[0].x + p * 5;
    const hitZoneR = players[1].x - p * 5;

    if (ball.vx < 0 && ball.x <= hitZoneL) {
      ball.x  = hitZoneL;
      ball.vx =  Math.abs(ball.vx) * (0.9 + Math.random() * 0.3);
      ball.vy = (Math.random() - 0.5) * ball.speed * 0.8;
      ball.speed = 1.8 + Math.random() * 1.6;
      players[0].hitting = true;
      players[0].state   = 'hit';
      rhythmTimer = 0;
      setTimeout(() => { players[0].hitting = false; players[0].state = 'idle'; }, 200);
    }

    if (ball.vx > 0 && ball.x >= hitZoneR) {
      ball.x  = hitZoneR;
      ball.vx = -Math.abs(ball.vx) * (0.9 + Math.random() * 0.3);
      ball.vy = (Math.random() - 0.5) * ball.speed * 0.8;
      ball.speed = 1.8 + Math.random() * 1.6;
      players[1].hitting = true;
      players[1].state   = 'hit';
      rhythmTimer = 0;
      setTimeout(() => { players[1].hitting = false; players[1].state = 'idle'; }, 200);
    }

    // ── Update player targets ──
    // Ball going left → left player moves to intercept
    if (ball.vx < 0) {
      players[0].tx = Math.max(c.x + p * 5, Math.min(mid - p * 4, ball.x - p * 10));
      players[0].ty = Math.max(c.y + p * 10, Math.min(c.y + c.h - p * 10, ball.y));
      playerReady(players[1], c, 1);
    } else {
      players[1].tx = Math.min(c.x + c.w - p * 5, Math.max(mid + p * 4, ball.x + p * 10));
      players[1].ty = Math.max(c.y + p * 10, Math.min(c.y + c.h - p * 10, ball.y));
      playerReady(players[0], c, 0);
    }

    // ── Move players toward targets ──
    for (const [i, pl] of players.entries()) {
      const dx = pl.tx - pl.x;
      const dy = pl.ty - pl.y;
      const dist = Math.hypot(dx, dy);
      const moveSpd = Math.min(dist, 3.5);

      if (dist > 1) {
        pl.x += (dx / dist) * moveSpd;
        pl.y += (dy / dist) * moveSpd;
        if (!pl.hitting) pl.state = 'run';
        // Animate run frames every 8 ticks
        pl.frameTimer++;
        if (pl.frameTimer >= 8) { pl.frameTimer = 0; pl.frame = 1 - pl.frame; }
      } else {
        if (!pl.hitting) { pl.state = 'idle'; pl.frame = 0; }
      }
    }

    // ── Draw ──
    ctx.fillStyle = `rgb(${CLAY_R},${CLAY_G},${CLAY_B})`;
    ctx.fillRect(0, 0, W, H);

    drawCourt(ctx, c);

    // Players
    drawPixelPlayer(ctx, players[0].x, players[0].y, players[0].facing, players[0].state, players[0].frame, p);
    drawPixelPlayer(ctx, players[1].x, players[1].y, players[1].facing, players[1].state, players[1].frame, p);

    // Ball trail (short, pixel-art)
    ball.trail.push({ x: ball.x, y: ball.y });
    if (ball.trail.length > 5) ball.trail.shift();

    for (let i = 0; i < ball.trail.length - 1; i++) {
      const ratio = i / ball.trail.length;
      const ts = Math.max(1, Math.round(p * 3 * ratio * 0.6));
      ctx.fillStyle = `rgba(200,255,50,${ratio * 0.3})`;
      ctx.fillRect(
        Math.round(ball.trail[i].x - ts / 2),
        Math.round(ball.trail[i].y - ts / 2),
        ts, ts
      );
    }

    drawPixelBall(ctx, ball.x, ball.y, p);

    animId = requestAnimationFrame(tick);
  }

  const ro = new ResizeObserver(() => resize());
  ro.observe(canvas);
  resize();
  tick();

  return () => { cancelAnimationFrame(animId); ro.disconnect(); };
}
