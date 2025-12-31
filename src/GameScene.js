import { Serpent } from './Serpent.js';
import { InputManager } from './InputManager.js';
import { GRID_SIZE, CANVAS_SIZE, INITIAL_SPEED, COLORS } from './constants.js';

export class GameScene {
  constructor(canvas, onGameOver) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.onGameOver = onGameOver;
    this.input = new InputManager();
    this.serpent = new Serpent();
    this.gridCount = CANVAS_SIZE / GRID_SIZE;
    
    this.score = 0;
    this.food = this.getRandomFood();
    this.lastTime = 0;
    this.speed = INITIAL_SPEED;
    this.isRunning = false;
  }

  getRandomFood() {
    let newFood;
    while (true) {
      newFood = {
        x: Math.floor(Math.random() * this.gridCount),
        y: Math.floor(Math.random() * this.gridCount)
      };
      // Don't spawn food on snake
      const onSnake = this.serpent.body.some(p => p.x === newFood.x && p.y === newFood.y);
      if (!onSnake) break;
    }
    return newFood;
  }

  start() {
    this.score = 0;
    this.speed = INITIAL_SPEED;
    this.serpent.reset();
    this.input.reset();
    this.food = this.getRandomFood();
    this.isRunning = true;
    this.lastTime = performance.now();
    this.animate();
  }

  stop() {
    this.isRunning = false;
  }

  update(currentTime) {
    if (!this.isRunning) return;

    const deltaTime = currentTime - this.lastTime;

    if (deltaTime > this.speed) {
      this.lastTime = currentTime;
      this.input.update();
      
      const head = this.serpent.update(this.input.direction, this.gridCount);

      if (head.x === this.food.x && head.y === this.food.y) {
        this.score += 10;
        this.food = this.getRandomFood();
        this.speed = Math.max(60, this.speed - 1); // Gradually speed up
        document.getElementById('score-display').innerText = `SCORE: ${this.score}`;
      } else {
        this.serpent.popTail();
      }

      if (this.serpent.checkCollision()) {
        this.isRunning = false;
        this.onGameOver(this.score);
      }
    }
  }

  draw() {
    // Clear with slight trail effect
    this.ctx.fillStyle = 'rgba(23, 23, 23, 0.8)';
    this.ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

    // Draw Grid (Subtle)
    this.ctx.strokeStyle = '#2F2F2F';
    this.ctx.lineWidth = 0.5;
    for(let i=0; i<=this.gridCount; i++) {
      this.ctx.beginPath();
      this.ctx.moveTo(i * GRID_SIZE, 0);
      this.ctx.lineTo(i * GRID_SIZE, CANVAS_SIZE);
      this.ctx.stroke();
      this.ctx.beginPath();
      this.ctx.moveTo(0, i * GRID_SIZE);
      this.ctx.lineTo(CANVAS_SIZE, i * GRID_SIZE);
      this.ctx.stroke();
    }

    // Draw Food
    this.ctx.fillStyle = COLORS.accent;
    this.ctx.shadowBlur = 15;
    this.ctx.shadowColor = COLORS.accent;
    this.ctx.beginPath();
    this.ctx.arc(
      this.food.x * GRID_SIZE + GRID_SIZE/2, 
      this.food.y * GRID_SIZE + GRID_SIZE/2, 
      GRID_SIZE/3, 0, Math.PI * 2
    );
    this.ctx.fill();
    this.ctx.shadowBlur = 0;

    // Draw Serpent
    this.serpent.draw(this.ctx);
  }

  animate(currentTime) {
    if (!this.isRunning) return;
    this.update(currentTime);
    this.draw();
    requestAnimationFrame((t) => this.animate(t));
  }
}
