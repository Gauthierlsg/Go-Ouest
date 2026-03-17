// Animated tennis header — pixel-art doubles (baseliner + volleyer each side)
// Players can't move backward while hitting the ball

const CLAY_R = 194, CLAY_G = 69, CLAY_B = 10;
const SKIN   = '#f4c490';
const HAIR   = '#3d2310';
const SHIRT_A = '#e8670e';  // GO OUEST orange
const SHIRT_B = '#1a4a8a';  // navy (opposing team)
const SHORTS  = '#fef6ee';
const SHOE    = '#2a1a0e';
const RAQUET  = '#f5c518';
const STR     = 'rgba(255,255,255,0.6)';

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

// p = 1 "pixel" in screen px — kept small for compact players
function drawPixelPlayer(ctx, cx, cy, facing, state, frame, p, shirt) {
  ctx.save();
  ctx.translate(Math.round(cx), Math.round(cy));
  if (facing === 'left') ctx.scale(-1, 1);
  ctx.imageSmoothingEnabled = false;

  const r = (x, y, w, h, col) => {
    ctx.fillStyle = col;
    ctx.fillRect(Math.round(x * p), Math.round(y * p), Math.round(w * p), Math.round(h * p));
  };

  // Head
  r(-1, -10, 3, 1, HAIR);
  r(-1, -9,  3, 3, SKIN);
  r(-1, -9,  1, 1, HAIR);
  r( 1, -9,  1, 1, HAIR);
  r( 0, -8,  1, 1, '#1a0a00');  // eye

  // Torso
  r(-1, -6, 4, 4, shirt);

  // Shorts
  r(-1, -2, 4, 2, SHORTS);

  // Legs & shoes
  if (state === 'run') {
    if (frame === 0) {
      r(-1,  0, 2, 3, SKIN);
      r( 1,  1, 2, 2, SKIN);
      r(-2,  3, 3, 1, SHOE);
      r( 1,  3, 2, 1, SHOE);
    } else {
      r(-1,  1, 2, 2, SKIN);
      r( 1,  0, 2, 3, SKIN);
      r(-1,  3, 2, 1, SHOE);
      r( 1,  3, 3, 1, SHOE);
    }
  } else {
    r(-1,  0, 2, 3, SKIN);
    r( 1,  0, 2, 3, SKIN);
    r(-2,  3, 3, 1, SHOE);
    r( 1,  3, 3, 1, SHOE);
  }

  // Arms & racket
  if (state === 'hit') {
    r(-3, -6, 2, 3, SKIN);
    r( 3, -7, 2, 2, SKIN);
    r( 4, -9, 2, 2, SKIN);
    r( 5, -14, 4, 1, RAQUET);
    r( 5,  -7, 4, 1, RAQUET);
    r( 5, -14, 1, 8, RAQUET);
    r( 8, -14, 1, 8, RAQUET);
    r( 6, -13, 2, 6, STR);
    r( 6,  -6, 1, 4, RAQUET);
  } else {
    r(-2, -6, 2, 3, SKIN);
    r( 3, -6, 2, 3, SKIN);
    r( 4, -13, 1, 1, RAQUET);
    r( 7, -13, 1, 1, RAQUET);
    r( 4, -13, 4, 1, RAQUET);
    r( 4,  -8, 4, 1, RAQUET);
    r( 4, -13, 1, 6, RAQUET);
    r( 7, -13, 1, 6, RAQUET);
    r( 5, -12, 2, 4, STR);
    r( 5,  -7, 1, 3, RAQUET);
  }

  ctx.restore();
}

function drawPixelBall(ctx, x, y, p) {
  ctx.imageSmoothingEnabled = false;
  const s = Math.max(2, Math.round(p * 2.5));
  ctx.fillStyle = 'rgba(0,0,0,0.22)';
  ctx.fillRect(Math.round(x - s / 2 + 1), Math.round(y - s / 2 + 2), s, s);
  ctx.fillStyle = '#c8ff40';
  ctx.fillRect(Math.round(x - s / 2), Math.round(y - s / 2), s, s);
  ctx.fillStyle = 'rgba(255,255,255,0.65)';
  ctx.fillRect(Math.round(x - s / 2), Math.round(y - s / 2), Math.ceil(s / 3), Math.ceil(s / 3));
}

function drawScore(ctx, score, flash, c, W) {
  const fontSize = Math.max(10, Math.round(c.h * 0.16));
  ctx.save();
  ctx.font = `bold ${fontSize}px monospace`;
  ctx.textBaseline = 'middle';
  ctx.textAlign = 'center';
  const midY = c.y + c.h / 2;

  // Blink: 5 on/off cycles over 50 frames → toggle every 5 frames
  const leftVisible  = flash.left  <= 0 || Math.floor(flash.left  / 5) % 2 === 0;
  const rightVisible = flash.right <= 0 || Math.floor(flash.right / 5) % 2 === 0;

  const lx = c.x / 2;
  if (leftVisible) {
    ctx.fillStyle = 'rgba(0,0,0,0.4)';
    ctx.fillText(String(score.left), lx + 1, midY + 1);
    ctx.fillStyle = '#ffffff';
    ctx.fillText(String(score.left), lx, midY);
  }

  const rx = c.x + c.w + (W - c.x - c.w) / 2;
  if (rightVisible) {
    ctx.fillStyle = 'rgba(0,0,0,0.4)';
    ctx.fillText(String(score.right), rx + 1, midY + 1);
    ctx.fillStyle = '#ffffff';
    ctx.fillText(String(score.right), rx, midY);
  }

  ctx.restore();
}

// ── Player factory ──
function mkPlayer(side, role, shirt) {
  return {
    x: 0, y: 0, tx: 0, ty: 0,
    facing: side === 'left' ? 'right' : 'left',
    state: 'idle', frame: 0, frameTimer: 0,
    hitting: false,
    missDecided: false,
    willMiss: false,
    side, role, shirt,
  };
}

export function initHeaderArt() {
  const canvas = document.getElementById('header-art');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let W = 0, H = 0, animId;

  const ball = { x: 0, y: 0, vx: 0, vy: 0, speed: 0, baseSpeed: 0, trail: [] };
  const score = { left: 0, right: 0 };
  const flash = { left: 0, right: 0 }; // countdown frames for blink (>0 = flashing)
  let rallyCount = 0;

  // [0]=L_base  [1]=L_volley  [2]=R_volley  [3]=R_base
  const players = [
    mkPlayer('left',  'base',   SHIRT_A),
    mkPlayer('left',  'volley', SHIRT_A),
    mkPlayer('right', 'volley', SHIRT_B),
    mkPlayer('right', 'base',   SHIRT_B),
  ];

  let lastHitterLeft  = -1;
  let lastHitterRight = -1;

  function resetBall(c) {
    ball.baseSpeed = (W / 1000) * (2.4 + Math.random() * 0.5) * 3;
    ball.speed = ball.baseSpeed;
    ball.x  = c.x + c.w * 0.38;
    ball.y  = c.y + c.h * (0.28 + Math.random() * 0.44);
    ball.vx =  ball.speed;
    ball.vy = (Math.random() - 0.5) * (W / 1000) * 1.0 * 3;
    ball.trail = [];
    lastHitterLeft = lastHitterRight = -1;
    rallyCount = 0;
    for (const pl of players) { pl.missDecided = false; pl.willMiss = false; }
  }

  function xBounds(c, mid, p, role, side) {
    const sbL = c.x + c.w * 0.229;
    const sbR = c.x + c.w * 0.771;
    if (role === 'base') {
      return side === 'left'
        ? { min: c.x + p * 3,      max: c.x + c.w * 0.14 }
        : { min: c.x + c.w * 0.86, max: c.x + c.w - p * 3 };
    }
    const logoMargin = c.w * 0.20;
    return side === 'left'
      ? { min: sbL + p * 2,     max: mid - logoMargin }
      : { min: mid + logoMargin, max: sbR - p * 2 };
  }

  function yBounds(c, role) {
    const slT = c.y + c.h * 0.142;
    const slB = c.y + c.h * 0.858;
    if (role === 'volley') return { min: slT + 2, max: slB - 2 };
    return { min: c.y + 2, max: c.y + c.h - 2 };
  }

  function readyPositions(c) {
    const qL = c.x + c.w * 0.095;
    const vL = c.x + c.w * 0.340;
    const vR = c.x + c.w * 0.660;
    const qR = c.x + c.w * 0.905;
    const hi = c.y + c.h * 0.28;
    const lo = c.y + c.h * 0.72;
    const mid = c.y + c.h * 0.5;
    return { qL, vL, vR, qR, hi, lo, mid };
  }

  function clampPlayer(pl, c, mid, p) {
    const bx = xBounds(c, mid, p, pl.role, pl.side);
    const by = yBounds(c, pl.role);
    pl.tx = Math.max(bx.min, Math.min(bx.max, pl.tx));
    pl.ty = Math.max(by.min, Math.min(by.max, pl.ty));
    pl.x  = Math.max(bx.min, Math.min(bx.max, pl.x));
    pl.y  = Math.max(by.min, Math.min(by.max, pl.y));
  }

  function initPositions(c) {
    const r = readyPositions(c);
    players[0].x = players[0].tx = r.qL; players[0].y = players[0].ty = r.lo;
    players[1].x = players[1].tx = r.vL; players[1].y = players[1].ty = r.hi;
    players[2].x = players[2].tx = r.vR; players[2].y = players[2].ty = r.hi;
    players[3].x = players[3].tx = r.qR; players[3].y = players[3].ty = r.lo;
  }

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
    if (!W || !H) return;
    const c = courtBounds(W, H);
    resetBall(c);
    initPositions(c);
  }

  function tick() {
    if (!W || !H) { animId = requestAnimationFrame(tick); return; }

    const c   = courtBounds(W, H);
    const p   = Math.max(1.3, H / 130);
    const mid = c.x + c.w / 2;
    const r   = readyPositions(c);

    // ── Move ball ──
    ball.x += ball.vx;
    ball.y += ball.vy;

    const minSpeed = (W / 1000) * 2.4 * 3;
    ball.speed = ball.speed * 0.9992 + minSpeed * 0.0008;
    const spd = Math.hypot(ball.vx, ball.vy);
    if (spd > 0.1) { ball.vx = (ball.vx / spd) * ball.speed; ball.vy = (ball.vy / spd) * ball.speed; }

    if (ball.y < c.y)       { ball.y = c.y;       ball.vy =  Math.abs(ball.vy); }
    if (ball.y > c.y + c.h) { ball.y = c.y + c.h; ball.vy = -Math.abs(ball.vy); }

    // ── Hit detection ──
    const Y_TOL = c.h * 0.38;
    // Miss chance increases gradually: 0% before 5 exchanges, then up to ~25%
    const MISS_CHANCE = rallyCount < 4 ? 0 : Math.min(0.40, (rallyCount - 4) * 0.08);

    function doHit(pl, idx, newVxSign) {
      if (pl.hitting) return false;
      ball.vx    = newVxSign * Math.abs(ball.vx) * (0.88 + Math.random() * 0.38);
      ball.vy    = (Math.random() - 0.5) * ball.speed * 0.85;
      ball.speed = (W / 1000) * (1.25 + Math.random() * 0.9) * 3;
      pl.hitting = true;
      pl.state   = 'hit';
      rallyCount++;
      // Reset miss decisions for all players on new rally
      for (const p2 of players) { p2.missDecided = false; p2.willMiss = false; }
      if (idx <= 1) lastHitterLeft  = idx;
      else          lastHitterRight = idx;
      setTimeout(() => { pl.hitting = false; pl.state = 'idle'; }, 240);
      return true;
    }

    // Decide miss once per approach
    function decideMiss(pl) {
      if (!pl.missDecided) {
        pl.missDecided = true;
        pl.willMiss = Math.random() < MISS_CHANCE;
      }
      return pl.willMiss;
    }

    function canHit(idx) {
      if (idx <= 1) return lastHitterLeft  !== idx;
      else          return lastHitterRight !== idx;
    }

    // Ball going LEFT → left team
    if (ball.vx < 0) {
      const v = players[1], b = players[0];
      const vZone = ball.x <= v.x + p * 6 && Math.abs(ball.y - v.y) < Y_TOL;
      const bZone = ball.x <= b.x + p * 6;
      if (vZone && canHit(1) && !decideMiss(v))       doHit(v, 1, 1);
      else if (bZone && canHit(0) && !decideMiss(b) && Math.abs(ball.y - b.y) < Y_TOL) doHit(b, 0, 1);
      else if (ball.x < c.x - 10)  { score.right++; flash.right = 50; resetBall(c); }
    }

    // Ball going RIGHT → right team
    if (ball.vx > 0) {
      const v = players[2], b = players[3];
      const vZone = ball.x >= v.x - p * 6 && Math.abs(ball.y - v.y) < Y_TOL;
      const bZone = ball.x >= b.x - p * 6;
      if (vZone && canHit(2) && !decideMiss(v))       doHit(v, 2, -1);
      else if (bZone && canHit(3) && !decideMiss(b) && Math.abs(ball.y - b.y) < Y_TOL) doHit(b, 3, -1);
      else if (ball.x > c.x + c.w + 10) { score.left++; flash.left = 50; resetBall(c); }
    }

    // ── Player targets ──
    if (ball.vx < 0) {
      const vCanHit = canHit(1);
      const vReaches = Math.abs(ball.y - players[1].y) < Y_TOL * 1.2 && ball.x > r.vL - c.w * 0.08;
      if (vCanHit && vReaches) {
        const bx = xBounds(c, mid, p, 'volley', 'left');
        players[1].tx = Math.max(bx.min, Math.min(bx.max, ball.x - p * 4));
        players[1].ty = Math.max(c.y + p * 6, Math.min(c.y + c.h - p * 6, ball.y));
        players[0].tx = r.qL;
        players[0].ty = ball.y > r.mid ? r.hi : r.lo;
      } else {
        const bx = xBounds(c, mid, p, 'base', 'left');
        players[0].tx = Math.max(bx.min, Math.min(bx.max, ball.x - p * 6));
        players[0].ty = Math.max(c.y + p * 6, Math.min(c.y + c.h - p * 6, ball.y));
        players[1].tx = r.vL;
        players[1].ty = ball.y > r.mid ? r.hi : r.lo;
      }
      players[2].tx = r.vR; players[2].ty = r.hi;
      players[3].tx = r.qR; players[3].ty = r.lo;
    } else {
      const vCanHit = canHit(2);
      const vReaches = Math.abs(ball.y - players[2].y) < Y_TOL * 1.2 && ball.x < r.vR + c.w * 0.08;
      if (vCanHit && vReaches) {
        const bx = xBounds(c, mid, p, 'volley', 'right');
        players[2].tx = Math.max(bx.min, Math.min(bx.max, ball.x + p * 4));
        players[2].ty = Math.max(c.y + p * 6, Math.min(c.y + c.h - p * 6, ball.y));
        players[3].tx = r.qR;
        players[3].ty = ball.y > r.mid ? r.hi : r.lo;
      } else {
        const bx = xBounds(c, mid, p, 'base', 'right');
        players[3].tx = Math.max(bx.min, Math.min(bx.max, ball.x + p * 6));
        players[3].ty = Math.max(c.y + p * 6, Math.min(c.y + c.h - p * 6, ball.y));
        players[2].tx = r.vR;
        players[2].ty = ball.y > r.mid ? r.hi : r.lo;
      }
      players[0].tx = r.qL; players[0].ty = r.lo;
      players[1].tx = r.vL; players[1].ty = r.hi;
    }

    for (const pl of players) clampPlayer(pl, c, mid, p);

    for (const pl of players) {
      if (pl.hitting) {
        if (pl.side === 'left')  pl.tx = Math.max(pl.tx, pl.x);
        else                     pl.tx = Math.min(pl.tx, pl.x);
      }
    }

    // ── Move players ──
    for (const pl of players) {
      const dx   = pl.tx - pl.x;
      const dy   = pl.ty - pl.y;
      const dist = Math.hypot(dx, dy);
      const moveSpd = (W / 1000) * 2.2 * 3;
      const spd2 = Math.min(dist, moveSpd);
      if (dist > 1) {
        pl.x += (dx / dist) * spd2;
        pl.y += (dy / dist) * spd2;
        if (!pl.hitting) pl.state = 'run';
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

    // Score (decrement flash counters)
    if (flash.left  > 0) flash.left--;
    if (flash.right > 0) flash.right--;
    drawScore(ctx, score, flash, c, W);

    // Players (back first for z-order)
    for (const pl of [players[0], players[3], players[1], players[2]]) {
      drawPixelPlayer(ctx, pl.x, pl.y, pl.facing, pl.state, pl.frame, p, pl.shirt);
    }

    // Ball trail
    ball.trail.push({ x: ball.x, y: ball.y });
    if (ball.trail.length > 4) ball.trail.shift();
    for (let i = 0; i < ball.trail.length - 1; i++) {
      const ratio = i / ball.trail.length;
      const ts = Math.max(1, Math.round(p * 2 * ratio * 0.5));
      ctx.fillStyle = `rgba(200,255,50,${ratio * 0.22})`;
      ctx.fillRect(Math.round(ball.trail[i].x - ts / 2), Math.round(ball.trail[i].y - ts / 2), ts, ts);
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
