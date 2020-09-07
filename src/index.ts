import Game from './core/game';
import './index.css';

let status = 'init';
function init() {
  let score = 0;
  const root = document.querySelector('#root') || document.body;
  const startButton = document.querySelector('.control');
  const scoreBlock = document.querySelector('.score');
  scoreBlock!.innerHTML = String(score);

  const game = new Game({
    rowLen: 30,
    colLen: 20,
    container: root
  });

  game.on('clear', (count: number) => {
    switch (count) {
      case 1:
        score += 100;
        break;
      default:
        score += count * 1.5 * 100;
        break;
    }
    scoreBlock!.innerHTML = String(score);
  });

  game.on('over', () => {
    alert('游戏结束');
    game.command('reset');
  });

  startButton!.addEventListener('click', () => {
    let command: 'start' | 'pause' = 'start';
    if (status === 'running') {
      command = 'pause';
      status = 'pause';
    } else {
      status = 'running';
    }
    startButton!.innerHTML = status === 'pause' ? '开始' : '暂停';
    game.command(command);
  });

  window.addEventListener('keydown', event => {
    console.log(event.keyCode);
    /**
     * up: 38
     * down: 40
     * left: 37
     * right: 39
     * space: 32
     */
    switch (event.keyCode) {
      case 37:
        game.command('left');
        break;
      case 39:
        game.command('right');
        break;
      case 38:
        game.command('rotate');
        break;
      case 40:
        game.command('down');
        break;
    }
  });
}

init();
