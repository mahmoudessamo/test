import { GRID_SIZE, COLORS } from './constants.js';

export class Serpent {
  constructor() {
    this.reset();
  }

  reset() {
    this.body = [
      { x: 10, y: 10 },
      { x: 9, y: 10 },
      { x: 8, y: 10 }
    ];
  }

  update(direction, gridCount) {
    const head = { 
      x: this.body[0].x + direction.x, 
      y: this.body[0].y + direction.y 
    };

    // Wrap around logic
    if (head.x < 0) head.x = gridCount - 1;
    if (head.x >= gridCount) head.x = 0;
    if (head.y < 0) head.y = gridCount - 1;
    if (head.y >= gridCount) head.y = 0;

    this.body.unshift(head);
    return head;
  }

  popTail() {
    return this.body.pop();
  }

  checkCollision() {
    const head = this.body[0];
    for (let i = 1; i < this.body.length; i++) {
      if (this.body[i].x === head.x && this.body[i].y === head.y) {
        return true;
      }
    }
    return false;
  }

  draw(ctx) {
    this.body.forEach((part, index) => {
      const isHead = index === 0;
      ctx.fillStyle = isHead ? COLORS.primary : COLORS.secondary;
      
      // Glow effect
      ctx.shadowBlur = isHead ? 15 : 5;
      ctx.shadowColor = isHead ? COLORS.primary : COLORS.secondary;
      
      const size = GRID_SIZE - 2;
      ctx.beginPath();
      ctx.roundRect(
        part.x * GRID_SIZE + 1, 
        part.y * GRID_SIZE + 1, 
        size, 
        size, 
        isHead ? 6 : 4
      );
      ctx.fill();
    });
    ctx.shadowBlur = 0;
  }
}
