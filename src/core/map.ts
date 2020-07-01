interface IProps {
  map: number[][];
  ctx: CanvasRenderingContext2D;
}

export default class TetrisMap {
  constructor(props: IProps) {
    const { map, ctx } = props;
    this.render(map, ctx)
  }
  render = (map: number[][], ctx: CanvasRenderingContext2D) => {
    const h = map.length;
    const rowHeight = 500 / h;
    ctx.strokeStyle = "#eee";
    ctx.lineWidth = 1;
    const w = Math.max(...map.map((item) => item.length));
    for (let i = 0; i <= h; i++) {
      ctx.beginPath();
      ctx.moveTo(0, rowHeight * i);
      ctx.lineTo(500, rowHeight * i);
      ctx.stroke();
    }
    for (let i = 0; i <= w; i++) {
      ctx.beginPath();
      ctx.moveTo(rowHeight * i, 0);
      ctx.lineTo(rowHeight * i, 500);
      ctx.stroke();
    }
  }
}