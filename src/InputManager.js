export class InputManager {
  constructor() {
    this.direction = { x: 1, y: 0 };
    this.nextDirection = { x: 1, y: 0 };
    this.init();
  }

  init() {
    window.addEventListener('keydown', (e) => {
      switch (e.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
          if (this.direction.y === 0) this.nextDirection = { x: 0, y: -1 };
          break;
        case 'ArrowDown':
        case 's':
        case 'S':
          if (this.direction.y === 0) this.nextDirection = { x: 0, y: 1 };
          break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
          if (this.direction.x === 0) this.nextDirection = { x: -1, y: 0 };
          break;
        case 'ArrowRight':
        case 'd':
        case 'D':
          if (this.direction.x === 0) this.nextDirection = { x: 1, y: 0 };
          break;
      }
    });
  }

  update() {
    this.direction = this.nextDirection;
  }

  reset() {
    this.direction = { x: 1, y: 0 };
    this.nextDirection = { x: 1, y: 0 };
  }
}
