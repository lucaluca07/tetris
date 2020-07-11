export function randomNum(end: number): number;
export function randomNum(start: number, end: number): number;
export function randomNum(start: number, end?: number) {
  if (end) {
    return parseInt(String(Math.random() * (end - start + 1) + start), 10);
  }
  return parseInt(String(Math.random() * (start + 1)), 10);
}
