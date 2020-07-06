interface IProps {
  map: number[][];
  size: number;
  ctx: CanvasRenderingContext2D;
}

export default class TetrisMap {
  map: number[][];
  ctx: CanvasRenderingContext2D;
  size: number;

  constructor(props: IProps) {
    const { map, size, ctx } = props;
    this.map = map;
    this.ctx = ctx;
    this.size = size;
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
    const w = map[0].length;
    ctx.clearRect(0, 0, this.size * w, this.size * h);
    ctx.strokeStyle = "#eee";
    ctx.fillStyle = "green";
    ctx.lineWidth = 1;
    console.log(map);
    map.forEach((row, rowIndex) => {
      row.forEach((cell, cellIndex) => {
        const x = this.size * cellIndex;
        const y = this.size * rowIndex;
        if (cell) {
          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.lineTo(x + this.size, y);
          ctx.lineTo(x + this.size, y + this.size);
          ctx.lineTo(x, y + this.size);
          ctx.closePath();
          ctx.stroke();
          ctx.fill();
        } else {
          ctx.strokeRect(x, y, this.size, this.size);
        }
      });
    });
  };
}
