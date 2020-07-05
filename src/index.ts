import Game from './core/game';

function init() {
  const root = document.querySelector('#root') || document.body;
  const startButton = document.createElement('button');
  startButton.innerHTML = 'start';
  root.appendChild(startButton);

  const game = new Game({
    width: 500,
    height: 500,
    container: root
  });

  startButton.addEventListener('click', () => {
    game.command('start');
  });

  window.addEventListener('keydown', event => {
    console.log(event.keyCode);
    /**
     * W: 87
     * S: 83
     * A: 65
     * D: 68
     * up: 38
     * down: 40
     * left: 37
     * right: 39
     * space: 32
     */
    switch (event.keyCode) {
      case 65:
      case 37:
        game.command('left');
        break;
      case 68:
      case 38:
        game.command('right');
        break;
      case 87:
        game.command('rotate');
        break;
      case 32:
        event.preventDefault();
        game.command('pause');
        break;
    }
  });
}

init();
