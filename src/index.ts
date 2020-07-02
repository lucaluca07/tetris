import Game from "./core/game";

function init() {
  const game = new Game({
    width: 500,
    height: 500,
  });
  
  const root = document.querySelector("#root") || document.body;
  
  const startButton = document.createElement("button");
  startButton.innerHTML = 'start'

  startButton.addEventListener('click', () => {
    game.start();
  })
  root.appendChild(startButton)
  game.init(root);
}


init();

