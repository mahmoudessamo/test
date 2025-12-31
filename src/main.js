import { GameScene } from './GameScene.js';
import { CANVAS_SIZE } from './constants.js';

class GameController {
  constructor() {
    this.canvas = document.getElementById('gameCanvas');
    this.canvas.width = CANVAS_SIZE;
    this.canvas.height = CANVAS_SIZE;
    
    this.menuScene = document.getElementById('menu-scene');
    this.gameOverScene = document.getElementById('gameover-scene');
    this.finalScoreText = document.getElementById('final-score');
    
    this.game = new GameScene(this.canvas, (score) => this.showGameOver(score));
    
    this.initEvents();
  }

  initEvents() {
    document.getElementById('start-btn').addEventListener('click', () => this.startGame());
    document.getElementById('restart-btn').addEventListener('click', () => this.startGame());
  }

  startGame() {
    this.menuScene.classList.add('hidden');
    this.gameOverScene.classList.add('hidden');
    document.getElementById('score-display').innerText = `SCORE: 0`;
    this.game.start();
  }

  showGameOver(score) {
    this.finalScoreText.innerText = `SCORE: ${score}`;
    this.gameOverScene.classList.remove('hidden');
  }
}

window.addEventListener('load', () => {
  new GameController();
});
