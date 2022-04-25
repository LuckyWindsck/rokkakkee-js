const ansicolor = require('ansicolor');

const { color: { player: playerColor }, debug } = require('./setting');

module.exports = class Cell {
  constructor({ owner, enterable, value }) {
    this.owner = owner;
    this.enterable = enterable;
    this.value = value;
  }

  toString() {
    const color = ansicolor[playerColor[this.owner]];

    // Unoccupied Cell
    if (this.enterable && this.owner === 'neutral') {
      return color('-');
    }

    // Occupied Cell
    if (this.enterable && this.owner !== 'neutral') {
      return color(String(this.value));
    }

    // Empty Cell
    if (!this.enterable && this.owner === 'neutral') {
      return debug ? ansicolor.dim('-') : ' ';
    }

    // Respawn Cell
    if (!this.enterable && this.owner !== 'neutral') {
      return color('*');
    }

    // Code should not reach here, just for surpressing the warning of eslint(consistent-return)
    throw Error('Unexpected cell state');
  }
};
