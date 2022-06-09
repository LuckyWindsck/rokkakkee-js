// Map is a 2d-array of dimention r * c
// `r` is the row number, `c` is the column number
//
// Each element represent the state of a cell:
// * null - empty cell
// * 0 - unoccupied cell
// * 1 - respawn cell of player 1
// * 2 - respawn cell of player 2

module.exports = [
  [
    null,
    1,
    null,
    null,
  ],
  [
    0,
    0,
    0,
    0,
  ],
  [
    0,
    0,
    0,
    null,
  ],
  [
    0,
    0,
    0,
    0,
  ],
  [
    null,
    2,
    null,
    null,
  ],
];
