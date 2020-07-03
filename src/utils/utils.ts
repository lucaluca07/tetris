export const deepClone = (data: any): any => {
  if (typeof data !== "object" || !data) return data;
  if (Array.isArray(data)) {
    return data.map((item) => deepClone(item));
  } else {
    const obj: any = {};
    Object.keys(data).forEach((key) => {
      obj[key] = deepClone(data[key]);
    });
    return obj;
  }
};

export function rotateArray(arg: any[]): any[] {
  let rowLen = arg.length
  let colLen = arg[0].length

  let newArg = new Array(colLen).fill(0).map(_ => new Array(rowLen).fill(0))

  arg = [...arg].reverse()

  newArg.forEach((row, rowIndex) => {
    row.forEach((_, col) => {
      newArg[rowIndex][col] = arg[col][rowIndex]
    })
  })

  return newArg
}

