const ansicolor = require('ansicolor');

const { color: { player: playerColor }, debug } = require('../setting');

module.exports = class Cell {
  constructor({ game, pos, state }) {
    this.game = game;
    this.pos = pos;

    switch (state) {
      // Empty Cell
      case null:
        this.owner = 'neutral';
        this.value = null;
        this.playerOnCell = false;
        break;
      // Unoccupied Cell
      case 0:
        this.owner = 'neutral';
        this.value = 0;
        this.playerOnCell = false;
        break;
      // Respawn Cell of playerA
      case 1:
        this.owner = 'playerA';
        this.value = null;
        this.playerOnCell = true;
        break;
      // Respawn Cell of playerB
      case 2:
        this.owner = 'playerB';
        this.value = null;
        this.playerOnCell = true;
        break;
      default:
        throw Error('Unexpected cell state');
    }
  }

  get enterable() {
    return this.value !== null;
  }

  playerInvade(player) {
    this.game.players[this.owner].respawn();
    this.owner = player.name;
    this.value = 1;
    this.playerOnCell = true;
  }

  playerAttack() {
    this.value -= 1;

    if (this.value === 0) this.owner = 'neutral';
  }

  playerCome(player) {
    this.owner = player.name;
    this.value += 1;
    if (this.value === 10) this.value = 9;
    this.playerOnCell = true;
  }

  playerLeave() {
    this.playerOnCell = false;
  }

  toString() {
    let color;
    let character;

    // Unoccupied Cell
    if (this.enterable && this.owner === 'neutral') {
      color = ansicolor[playerColor[this.owner]];
      character = '-';
    }

    // Occupied Cell
    if (this.enterable && this.owner !== 'neutral') {
      color = ansicolor[playerColor[this.owner]];
      character = this.playerOnCell ? '*' : String(this.value);
    }

    // Empty Cell
    if (!this.enterable && this.owner === 'neutral') {
      color = ansicolor.dim;
      character = debug ? '-' : ' ';
    }

    // Respawn Cell
    if (!this.enterable && this.owner !== 'neutral') {
      color = (text) => ansicolor.inverse(ansicolor[playerColor[this.owner]](text));
      character = this.playerOnCell ? '*' : '-';
    }

    return color(character);
  }
};
