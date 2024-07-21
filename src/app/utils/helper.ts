export function interpolateValue(
  x: number,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
): number {
  let y = y1 + ((x - x1) / (x2 - x1)) * (y2 - y1);
  return +y.toFixed(2);
}
