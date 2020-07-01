import { map } from '../constants/data'
import TetrisMap from './map'
interface Config {
  width: number
  height: number
}

export default class Game {
  width: number;
  height: number;
  ctx?: CanvasRenderingContext2D;

  constructor(config: Config) {
    const { width = 500, height = 500 } = config;
    this.width = width;
    this.height = height;
  }

  init = (dom: Element) => {
    const canvas = document.createElement("canvas");
    canvas.width = this.width;
    canvas.height = this.height;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    this.ctx = ctx;
    new TetrisMap({ map, ctx });
    dom.appendChild(canvas)
  }

  start = () => {

  }

  pause = () => {

  }

  command = (command: 'left' | 'right' | 'down' | 'rotate') => {

  }

  reset = () => {

  }
}
