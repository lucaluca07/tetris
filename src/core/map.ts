interface IProps {
  map: number[][];
  ctx: CanvasRenderingContext2D;
}

export default class TetrisMap {
  map: number[][];
  ctx: CanvasRenderingContext2D;

  constructor(props: IProps) {
    const { map, ctx } = props;
    this.map = map;
    this.ctx = ctx;
    this.render();
  }

  updateMap = (map: number[][]) => {
    this.map = map;
    this.render();
  };
  render = () => {
    const map = this.map;
    const ctx = this.ctx;
    const h = map.length;
    const rowHeight = 500 / h;
    ctx.clearRect(0, 0, 500, 500);
    ctx.strokeStyle = "#eee";
    ctx.fillStyle = "green"
    ctx.lineWidth = 1;
    map.forEach((row, rowIndex) => {
      row.forEach((cell, cellIndex) => {
        const x = rowHeight * cellIndex;
        const y = rowHeight * rowIndex;
        if(cell) {
          ctx.fillRect(x, y, rowHeight, rowHeight);
        } else {
          ctx.strokeRect(x, y, rowHeight, rowHeight);
        }
      });
    });
  };
}
