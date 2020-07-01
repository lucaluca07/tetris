import Game from "./core/game";

const game = new Game({
  width: 500,
  height: 800,
});

const root = document.querySelector("#root") || document.body;

game.init(root);
