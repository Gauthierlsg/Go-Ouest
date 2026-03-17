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
    r( 5, -11, 1, 7, RAQUET);
    r( 6, -10, 1, 5, STR);
  } else {
    r(-2, -6, 2, 3, SKIN);
    r( 3, -6, 2, 3, SKIN);
    r( 4, -9, 1, 6, RAQUET);
    r( 5, -8, 1, 4, STR);
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

// ── Player factory ──
// role: 'base' | 'volley'
// side: 'left' | 'right'
function mkPlayer(side, role, shirt) {
  return {
    x: 0, y: 0, tx: 0, ty: 0,
    facing: side === 'left' ? 'right' : 'left',
    state: 'idle', frame: 0, frameTimer: 0,
    hitting: false,
    side, role, shirt,
  };
}

export function initHeaderArt() {
  const canvas = document.getElementById('header-art');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let W = 0, H = 0, animId;

  const ball = { x: 0, y: 0, vx: 0, vy: 0, speed: 2.0, trail: [] };

  // [0]=L_base  [1]=L_volley  [2]=R_volley  [3]=R_base
  const players = [
    mkPlayer('left',  'base',   SHIRT_A),
    mkPlayer('left',  'volley', SHIRT_A),
    mkPlayer('right', 'volley', SHIRT_B),
    mkPlayer('right', 'base',   SHIRT_B),
  ];

  // Last hitter index per team (-1 = none)
  let lastHitterLeft  = -1; // 0=base, 1=volley
  let lastHitterRight = -1; // 2=volley, 3=base

  let rhythmTimer = 0;
  const RHYTHM_INTERVAL = 210;

  function resetBall(c) {
    ball.speed = 1.8 + Math.random() * 0.8;
    ball.x  = c.x + c.w * 0.38;
    ball.y  = c.y + c.h * (0.28 + Math.random() * 0.44);
    ball.vx =  ball.speed;
    ball.vy = (Math.random() - 0.5) * 1.1;
    ball.trail = [];
    lastHitterLeft = lastHitterRight = -1;
  }

  // x constraints per role — volleyers stay near T, baselines near baseline
  function xBounds(c, mid, p, role, side) {
    if (role === 'base') {
      return side === 'left'
        ? { min: c.x + p * 3,          max: c.x + c.w * 0.14 }
        : { min: c.x + c.w * 0.86,     max: c.x + c.w - p * 3 };
    }
    // volley: stay in service box, not too close to net (min p*12 from net each side)
    return side === 'left'
      ? { min: c.x + c.w * 0.26,  max: mid - p * 12 }
      : { min: mid + p * 12,       max: c.x + c.w * 0.74 };
  }

  function readyPositions(c) {
    const qL = c.x + c.w * 0.095;  // left baseline
    const vL = c.x + c.w * 0.340;  // left volley position (T area)
    const vR = c.x + c.w * 0.660;  // right volley position
    const qR = c.x + c.w * 0.905;  // right baseline
    const hi = c.y + c.h * 0.28;
    const lo = c.y + c.h * 0.72;
    const mid = c.y + c.h * 0.5;
    return { qL, vL, vR, qR, hi, lo, mid };
  }

  function clampTx(pl, c, mid, p) {
    const b = xBounds(c, mid, p, pl.role, pl.side);
    pl.tx = Math.max(b.min, Math.min(b.max, pl.tx));
    pl.x  = Math.max(b.min, Math.min(b.max, pl.x));
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

    // ── Rhythm ──
    rhythmTimer++;
    if (rhythmTimer >= RHYTHM_INTERVAL) {
      rhythmTimer = 0;
      const power = Math.random() < 0.35;
      const dir   = ball.vx > 0 ? 1 : -1;
      ball.speed  = power ? 3.6 + Math.random() * 1.4 : 1.4 + Math.random() * 1.0;
      const angle = (Math.random() - 0.5) * 0.9;
      ball.vx     = dir * ball.speed * Math.cos(angle);
      ball.vy     = ball.speed * Math.sin(angle);
    }

    // ── Move ball ──
    ball.x += ball.vx;
    ball.y += ball.vy;

    ball.speed = ball.speed * 0.9992 + 2.0 * 0.0008;
    const spd = Math.hypot(ball.vx, ball.vy);
    if (spd > 0.1) { ball.vx = (ball.vx / spd) * ball.speed; ball.vy = (ball.vy / spd) * ball.speed; }

    if (ball.y < c.y)       { ball.y = c.y;       ball.vy =  Math.abs(ball.vy); }
    if (ball.y > c.y + c.h) { ball.y = c.y + c.h; ball.vy = -Math.abs(ball.vy); }

    // ── Hit detection ──
    const Y_TOL = c.h * 0.38;

    function doHit(pl, idx, newVxSign) {
      if (pl.hitting) return false;
      ball.vx    = newVxSign * Math.abs(ball.vx) * (0.88 + Math.random() * 0.38);
      ball.vy    = (Math.random() - 0.5) * ball.speed * 0.85;
      ball.speed = 1.7 + Math.random() * 2.0;
      pl.hitting = true;
      pl.state   = 'hit';
      rhythmTimer = 0;
      if (idx <= 1) lastHitterLeft  = idx;
      else          lastHitterRight = idx;
      setTimeout(() => { pl.hitting = false; pl.state = 'idle'; }, 240);
      return true;
    }

    // Alternation helper: can this player hit?
    // Left team: if lastHitterLeft===0 only idx=1 can hit; if ===1 only idx=0; else either
    function canHit(idx) {
      if (idx <= 1) return lastHitterLeft  !== idx;
      else          return lastHitterRight !== idx;
    }

    // Ball going LEFT → left team
    if (ball.vx < 0) {
      const v = players[1], b = players[0];
      const vZone = ball.x <= v.x + p * 6 && Math.abs(ball.y - v.y) < Y_TOL;
      const bZone = ball.x <= b.x + p * 6;
      if (vZone && canHit(1))       doHit(v, 1, 1);
      else if (bZone && canHit(0) && Math.abs(ball.y - b.y) < Y_TOL) doHit(b, 0, 1);
      else if (bZone && !canHit(0) && vZone && Math.abs(ball.y - v.y) < Y_TOL) doHit(v, 1, 1); // forced
      else if (ball.x < c.x - 10)  resetBall(c);
    }

    // Ball going RIGHT → right team
    if (ball.vx > 0) {
      const v = players[2], b = players[3];
      const vZone = ball.x >= v.x - p * 6 && Math.abs(ball.y - v.y) < Y_TOL;
      const bZone = ball.x >= b.x - p * 6;
      if (vZone && canHit(2))       doHit(v, 2, -1);
      else if (bZone && canHit(3) && Math.abs(ball.y - b.y) < Y_TOL) doHit(b, 3, -1);
      else if (bZone && !canHit(3) && vZone && Math.abs(ball.y - v.y) < Y_TOL) doHit(v, 2, -1);
      else if (ball.x > c.x + c.w + 10) resetBall(c);
    }

    // ── Player targets ──
    if (ball.vx < 0) {
      // Determine who will intercept based on alternation
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

    // Enforce x bounds on all players
    for (const pl of players) clampTx(pl, c, mid, p);

    // Can't move backward while hitting
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
      const spd2 = Math.min(dist, 3.2);
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

    // Draw all 4 players (back ones first for z-order)
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
