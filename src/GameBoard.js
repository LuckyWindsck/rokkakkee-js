const { spaces } = require('./util');
const Cell = require('./Cell');

const emptyCell = () => new Cell({
  owner: 'neutral',
  enterable: false,
  value: null,
});

const unoccupiedCell = () => new Cell({
  owner: 'neutral',
  enterable: true,
  value: 0,
});

const respawnCell = (playerNumber) => new Cell({
  owner: `player${String.fromCharCode(64 + playerNumber)}`, // 1 -> A
  enterable: false,
  value: null,
});

module.exports = class GameBoard {
  constructor(map) {
    this.map = map;
    this.gameBoard = map.map((row) => row.map((col) => {
      if (col === null) return emptyCell();
      if (col === 0) return unoccupiedCell();
      return respawnCell(col);
    }));
  }

  toString() {
    return this.gameBoard.map((row, rowIdx) => {
      const padStart = rowIdx % 2 ? '' : spaces(3);
      const rowString = row.map((col, _colIdx) => col.toString()).join(spaces(5));

      return padStart + rowString;
    }).join('\n'.repeat(2));
  }
};
