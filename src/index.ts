import Game from "./core/game";

function init() {
  const game = new Game({
    width: 500,
    height: 500,
  });

  const root = document.querySelector("#root") || document.body;

  const startButton = document.createElement("button");
  startButton.innerHTML = "start";

  startButton.addEventListener("click", () => {
    game.start();
  });
  root.appendChild(startButton);
  game.init(root);
  window.addEventListener("keydown", (event) => {
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
     */
    switch (event.keyCode) {
      case 65:
      case 37:
        game.command("left");
        return;
      case 68:
      case 38:
        game.command("right");
        return;
      case 87:
        game.command("rotate");
    }
  });
}

init();
