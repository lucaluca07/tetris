export const map = Array(20).fill(Array(20).fill(0));

const I = [1, 1, 1, 1];
const J = [
  [1, 1, 1],
  [0, 0, 1],
];
const L = [
  [1, 1, 1],
  [1, 0, 0],
];
const O = [
  [1, 1],
  [1, 1],
];
const S = [
  [0, 1, 1],
  [1, 1, 0],
];
const T = [
  [1, 1, 1],
  [0, 1, 0],
];
const Z = [
  [1, 1, 0],
  [0, 1, 1],
];

export const tetriminos = {
  I,
  J,
  L,
  O,
  S,
  T,
  Z,
};
