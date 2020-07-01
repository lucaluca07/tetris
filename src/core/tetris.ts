import { tetriminos } from '../constants/data'
import { randomNum } from '../utils/math'
const tetrominoKeys = Object.keys(tetriminos) as Array<keyof typeof tetriminos>

export default class Tetriminos {
  construct() {

  }

  getTetromino = () => {
    const key = tetrominoKeys[randomNum(tetrominoKeys.length)]
    return tetriminos[key];
  }

  down = () => {}
  left = () => {}
  right = () => {}
  rotate = () => {}
}
