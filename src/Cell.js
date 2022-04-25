const ansicolor = require('ansicolor');

const { color: { player: playerColor } } = require('./setting');

module.exports = class Cell {
  constructor({ owner, enterable, value }) {
    this.owner = owner;
    this.enterable = enterable;
    this.value = value;
  }

  toString() {
    const color = ansicolor[playerColor[this.owner]];

    let displayString = '';

    if (this.owner === 'neutral') {
      displayString = this.enterable ? '-' : ' ';
    } else {
      displayString = this.value === null ? '*' : String(this.value);
    }

    return color(displayString);
  }
};
