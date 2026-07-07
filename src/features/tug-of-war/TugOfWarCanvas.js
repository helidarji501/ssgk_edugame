/**
 * TugOfWarCanvas.js
 *
 * Pure-JS canvas game engine for Math Tug of War.
 * Not a React component — instantiated via `new TugOfWarGame(canvas, options)`.
 */

const WIN_THRESHOLD = 200;
const ROPE_Y       = 0.55;          // rope vertical position (ratio of canvas height)
const PULL_AMOUNT  = 40;
const AI_PULL      = 30;
const EASE_MS      = 600;

/* ── Colour palette ── */
const NAVY    = '#384959';
const SAFFRON = '#88BDF2';
const GREEN   = '#6A89A7';
const WHITE   = '#FFFFFF';
const BROWN   = '#8B5C2A';
const ROPE_A  = '#A07020';
const ROPE_B  = '#805010';
const SKY_TOP = '#88BDF2';
const SKY_BOT = '#BDDDFC';
const GROUND  = '#BDDDFC';


export default class TugOfWarGame {
  /**
   * @param {HTMLCanvasElement} canvas
   * @param {{ onCorrect, onWrong, onGameEnd, playerAvatarId, difficulty }} options
   */
  constructor(canvas, options = {}) {
    this.canvas = canvas;
    this.ctx    = canvas.getContext('2d');
    this.opts   = options;

    this.difficulty = options.difficulty ?? 1;

    // ── State ──
    this.ropeOffset     = 0;       // +player / -AI
    this.targetOffset   = 0;       // for easing
    this.isAnimating    = false;
    this.rafId          = null;
    this.particles      = [];
    this.shakeFrames    = 0;
    this.lastTimestamp  = 0;

    // Load single Tug of War scene asset
    this.sceneImage = new Image();
    this.sceneImage.src = '/tug_of_war_scene.png';

    // AI timer
    this._aiTimeout = null;
    this._scheduleAI();

    // Bind
    this._tick = this._tick.bind(this);
  }

  /* ─── Public API ─── */

  start() {
    this.isAnimating = true;
    this.lastTimestamp = performance.now();
    this.rafId = requestAnimationFrame(this._tick);
  }

  stop() {
    this.isAnimating = false;
    if (this.rafId) cancelAnimationFrame(this.rafId);
    if (this._aiTimeout) clearTimeout(this._aiTimeout);
  }

  /** Called externally when the player submits an answer. */
  submitAnswer(answer, correctAnswer) {
    if (!this.isAnimating) return;

    if (answer === correctAnswer) {
      const pull = PULL_AMOUNT + this.difficulty * 10;
      this.targetOffset += pull;
      this._spawnParticles(true);
      this.shakeFrames = 8;
      this.opts.onCorrect?.();
    } else {
      this.targetOffset -= AI_PULL;
      this.opts.onWrong?.();
    }

    // Re-schedule AI after player answers
    this._scheduleAI();
  }

  /* ─── Game loop ─── */

  _tick(timestamp) {
    if (!this.isAnimating) return;

    const dt = Math.min(timestamp - this.lastTimestamp, 50);
    this.lastTimestamp = timestamp;

    // Ease ropeOffset toward target
    const diff = this.targetOffset - this.ropeOffset;
    this.ropeOffset += diff * Math.min(1, dt / EASE_MS * 4);

    // Update particles
    this._updateParticles(dt);

    // Draw
    this._draw();

    // Win check
    this._checkWinCondition();

    this.rafId = requestAnimationFrame(this._tick);
  }

  _checkWinCondition() {
    if (this.ropeOffset >= WIN_THRESHOLD) {
      this.stop();
      this.opts.onGameEnd?.('player');
    } else if (this.ropeOffset <= -WIN_THRESHOLD) {
      this.stop();
      this.opts.onGameEnd?.('ai');
    }
  }

  /* ─── AI ─── */

  _scheduleAI() {
    if (this._aiTimeout) clearTimeout(this._aiTimeout);
    // Higher difficulty → faster AI
    const minDelay = Math.max(800, 2500 - this.difficulty * 600);
    const maxDelay = Math.max(1500, 3000 - this.difficulty * 400);
    const delay = minDelay + Math.random() * (maxDelay - minDelay);

    this._aiTimeout = setTimeout(() => {
      if (!this.isAnimating) return;
      this.targetOffset -= AI_PULL;
      this._spawnParticles(false);
      this.shakeFrames = 4;
      this._scheduleAI();
    }, delay);
  }

  /* ─── Drawing ─── */

  _draw() {
    const { ctx, canvas } = this;
    const W = canvas.width;
    const H = canvas.height;

    ctx.save();

    // Screen shake
    if (this.shakeFrames > 0) {
      const sx = (Math.random() - 0.5) * 6;
      const sy = (Math.random() - 0.5) * 6;
      ctx.translate(sx, sy);
      this.shakeFrames--;
    }

    this._drawBackground(W, H);
    this._drawGround(W, H);
    this._drawSceneImage(W, H);
    this._drawParticles();
    this._drawCenterMarker(W, H);

    ctx.restore();
  }

  _drawSceneImage(W, H) {
    if (!this.sceneImage.complete) return;
    const { ctx } = this;
    const centerX = W / 2 + this.ropeOffset;

    // Scale or size the image
    const imgWidth = 650;
    const imgHeight = (this.sceneImage.height / this.sceneImage.width) * imgWidth;

    const x = centerX - imgWidth / 2;
    // Align bottom edge of feet with the horizon (H * 0.7)
    const y = H * 0.7 - imgHeight;

    ctx.drawImage(this.sceneImage, x, y, imgWidth, imgHeight);
  }

  _drawBackground(W, H) {
    const { ctx } = this;
    const grad = ctx.createLinearGradient(0, 0, 0, H * 0.6);
    grad.addColorStop(0, SKY_TOP);
    grad.addColorStop(1, SKY_BOT);
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, W, H);

    // Stars
    ctx.fillStyle = 'rgba(255,255,255,0.3)';
    for (let i = 0; i < 30; i++) {
      const sx = ((i * 137.5) % W);
      const sy = ((i * 73.3) % (H * 0.4));
      ctx.beginPath();
      ctx.arc(sx, sy, 1 + (i % 2), 0, Math.PI * 2);
      ctx.fill();
    }

    // Ground hills
    ctx.fillStyle = '#1A4510';
    ctx.beginPath();
    ctx.moveTo(0, H * 0.55);
    ctx.quadraticCurveTo(W * 0.25, H * 0.45, W * 0.5, H * 0.52);
    ctx.quadraticCurveTo(W * 0.75, H * 0.58, W, H * 0.5);
    ctx.lineTo(W, H);
    ctx.lineTo(0, H);
    ctx.fill();
  }

  _drawGround(W, H) {
    const { ctx } = this;
    ctx.fillStyle = GROUND;
    ctx.fillRect(0, H * 0.7, W, H * 0.3);

    // Grass texture lines
    ctx.strokeStyle = '#3A7A2E';
    ctx.lineWidth = 1;
    for (let i = 0; i < 20; i++) {
      const gx = (i / 20) * W + ((i * 17) % 30);
      ctx.beginPath();
      ctx.moveTo(gx, H * 0.7);
      ctx.lineTo(gx - 3, H * 0.7 - 8);
      ctx.stroke();
    }
  }

  _drawCenterMarker(W, H) {
    const { ctx } = this;
    const groundY = H * 0.7;
    const lineBottom = H * 0.85;

    // Screen center-based positioning for boundary lines
    const screenCenter = W / 2;
    const winDistance = 200; // Distance from center to win boundary (matches WIN_THRESHOLD)

    // Left win boundary: center - winDistance
    // Right win boundary: center + winDistance

    // ─── Vertical Marker Lines (painted field markers) ───

    // Left Win Boundary Line (AI win zone) - Red line near AI
    const leftWinX = screenCenter - winDistance;
    ctx.strokeStyle = '#DC2626';
    ctx.lineWidth = 3;
    ctx.setLineDash([]);
    ctx.beginPath();
    ctx.moveTo(leftWinX, groundY + 10);
    ctx.lineTo(leftWinX, lineBottom);
    ctx.stroke();
    // Red line accent on grass
    ctx.strokeStyle = 'rgba(220, 38, 38, 0.4)';
    ctx.lineWidth = 8;
    ctx.beginPath();
    ctx.moveTo(leftWinX, groundY + 15);
    ctx.lineTo(leftWinX, lineBottom - 5);
    ctx.stroke();

    // Center Line - White dashed line at exact screen center
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
    ctx.lineWidth = 2;
    ctx.setLineDash([8, 8]);
    ctx.beginPath();
    ctx.moveTo(screenCenter, groundY + 10);
    ctx.lineTo(screenCenter, lineBottom);
    ctx.stroke();
    ctx.setLineDash([]);

    // Right Win Boundary Line (Player win zone) - Green line near Player
    const rightWinX = screenCenter + winDistance;
    ctx.strokeStyle = '#22C55E';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(rightWinX, groundY + 10);
    ctx.lineTo(rightWinX, lineBottom);
    ctx.stroke();
    // Green line accent on grass
    ctx.strokeStyle = 'rgba(34, 197, 94, 0.4)';
    ctx.lineWidth = 8;
    ctx.beginPath();
    ctx.moveTo(rightWinX, groundY + 15);
    ctx.lineTo(rightWinX, lineBottom - 5);
    ctx.stroke();

    // Line labels
    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
    ctx.font = 'bold 10px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('AI WIN', leftWinX, lineBottom + 20);
    ctx.fillText('CENTER', screenCenter, lineBottom + 20);
    ctx.fillText('PLAYER WIN', rightWinX, lineBottom + 20);

    // Win zone indicators
    const barY = H * 0.85;
    // Player win zone
    ctx.fillStyle = 'rgba(255,153,51,0.2)';
    ctx.fillRect(rightWinX - 20, barY, 40, 10);
    // AI win zone
    ctx.fillStyle = 'rgba(99,102,241,0.2)';
    ctx.fillRect(leftWinX - 20, barY, 40, 10);

    // Offset bar - spans between win boundaries
    const barW = winDistance * 2;
    const barX = screenCenter - winDistance;
    ctx.fillStyle = 'rgba(255,255,255,0.08)';
    ctx.beginPath();
    ctx.roundRect(barX, barY, barW, 10, 5);
    ctx.fill();

    // Knot position on bar (relative to screen center)
    const knotX = screenCenter + this.ropeOffset;
    const clampedX = Math.max(barX + 5, Math.min(barX + barW - 5, knotX));
    ctx.fillStyle = '#DC2626';
    ctx.beginPath();
    ctx.arc(clampedX, barY + 5, 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = WHITE;
    ctx.lineWidth = 1.5;
    ctx.stroke();
  }

  /* ─── Particles ─── */

  _spawnParticles(playerSide) {
    const W = this.canvas.width;
    const H = this.canvas.height;
    const cx = W / 2 + this.ropeOffset;
    const baseX = playerSide ? cx + 40 : cx - 40;
    const baseY = H * ROPE_Y;

    for (let i = 0; i < 12; i++) {
      this.particles.push({
        x: baseX + (Math.random() - 0.5) * 30,
        y: baseY + (Math.random() - 0.5) * 20,
        vx: (Math.random() - 0.5) * 4,
        vy: -Math.random() * 3 - 1,
        life: 1,
        color: playerSide
          ? [SAFFRON, WHITE, GREEN][i % 3]
          : '#6366F1',
        size: 2 + Math.random() * 3,
      });
    }
  }

  _updateParticles(dt) {
    const decay = dt / 1000;
    this.particles = this.particles.filter((p) => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.08; // gravity
      p.life -= decay * 1.5;
      return p.life > 0;
    });
  }

  _drawParticles() {
    const { ctx } = this;
    for (const p of this.particles) {
      ctx.globalAlpha = Math.max(0, p.life);
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  }
}
