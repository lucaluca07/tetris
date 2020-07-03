import { map } from "../constants/data";
import TetrisMap from "./map";
import { deepClone, rotateArray } from "../utils/utils";
import { tetriminos } from "../constants/data";
import { randomNum } from "../utils/math";
const tetrominoKeys = Object.keys(tetriminos) as Array<keyof typeof tetriminos>;

interface Config {
  width: number;
  height: number;
}

type CommandType = "left" | "right" | "down" | "rotate";

export default class Game {
  width: number;
  height: number;
  ctx?: CanvasRenderingContext2D;
  tetromino?: number[][];
  position: [number, number];
  map: number[][];
  tetrisMap?: TetrisMap;

  constructor(config: Config) {
    const { width = 500, height = 500 } = config;
    this.width = width;
    this.height = height;
    let start = Math.floor(map[0].length / 2);
    this.position = [start, 0];
    this.map = deepClone(map);
  }

  init = (dom: Element) => {
    const canvas = document.createElement("canvas");
    canvas.width = this.width;
    canvas.height = this.height;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    this.ctx = ctx;
    this.tetrisMap = new TetrisMap({ map, ctx });
    dom.appendChild(canvas);
  };

  start = () => {
    this.tetromino = this.getTetromino();
    const map = this.getCurrentMap();
    this.tetrisMap?.updateMap(map);
    this.run();
  };

  pause = () => {};

  reset = () => {};

  command = (command: CommandType) => {
    switch (command) {
      case "left":
      case "right":
        this.move(command);
        return;
      case "rotate":
        this.rotateTetromino();
        return;
      default:
        throw new Error("Error: unknown command");
    }
  };

  run = () => {
    if (this.isOver()) return;
    window.setTimeout(() => {
      const newMap = this.move("down");
      console.log(newMap);
      this.tetrisMap?.updateMap(newMap);
      this.run();
    }, 300);
  };

  rotateTetromino = () => {
    const tetromino = this.tetromino;
    if (!tetromino) return;
    const newTetromino = rotateArray(tetromino);
    if(!this.canRotate(newTetromino)) return;
    this.tetromino = newTetromino;
  };

  getCurrentMap = () => {
    if (!this.tetromino) return;
    return this.mergeMap(this.tetromino, this.map, this.position);
  };

  mergeMap = (
    tetromino: number[][],
    map: number[][],
    position: [number, number]
  ) => {
    const newMap = deepClone(map);
    const [start, cell] = position;
    tetromino.forEach((item, i) => {
      const mapCell = [...newMap[cell + i]];
      item.forEach((item, ii) => {
        if (item) {
          mapCell[start + ii] = item;
        }
      });
      newMap[cell + i] = mapCell;
    });
    return newMap;
  };

  /**
   * 碰撞检测
   */
  isBottom = () => {
    if (!this.tetromino) return;
    const len = this.tetromino.length;
    const [x, y] = this.position;
    const isLastCell = y + len >= this.map.length;
    if (isLastCell) return true;
    return this.tetromino.some((item, i) => {
      const nextCell = this.map[y + i + 1];
      return item.some((el, ii) => el && nextCell[x + ii])
    });
  };

  isRightmost = () => {
    if (!this.tetromino) return;
    const [x, y] = this.position;
    // 最右边
    if (x + this.tetromino[0].length >= this.map[0].length) {
      return true;
    }
    return this.tetromino.some((item, i) => {
      const lastIndex = item.lastIndexOf(1);
      const cell = this.map[y + i];
      return !!cell[x + lastIndex + 1]
    });
  };

  isLeftmost = () => {
    if (!this.tetromino) return;
    const [x, y] = this.position;
    if (x <= 0) {
      return true;
    }
    return this.tetromino.some((item, i) => {
      const index = item.indexOf(1);
      const cell = this.map[y + i];
      return !!cell[x - index - 1]
    });
  };

  canRotate = (newTetromino: number[][]) => {
    const [x, y] = this.position;
    return !newTetromino.some((item, i) => {
      const cell = this.map[y + i]
      item.some((el, ii) => el && cell[x + ii])
    })
  };

  isOver = () => {
    const [x] = this.position;
    if (!this.tetromino) return;
    const len = this.tetromino[0].length;
    const firstCell = this.map[0];
    for (let i = 0; i < len; i++) {
      if (firstCell[x + i]) {
        return true;
      }
    }
    return false;
  };

  move = (type: "left" | "right" | "down") => {
    const [x, y] = this.position;
    if (!this.tetromino) return;
    switch (type) {
      case "left":
        if (this.isLeftmost()) return;
        this.position = [x - 1, y];
        return this.getCurrentMap();
      case "right":
        if (this.isRightmost()) return;
        this.position = [x + 1, y];
        return this.getCurrentMap();
      case "down":
        if (this.isBottom()) {
          this.map = this.getCurrentMap();
          this.tetromino = this.getTetromino();
          this.position = [x, 0];
        } else {
          this.position = [x, y + 1];
        }
        return this.getCurrentMap();
    }
  };

  getTetromino = () => {
    const key = tetrominoKeys[randomNum(tetrominoKeys.length - 1)];
    return tetriminos[key];
  };
}
