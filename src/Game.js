const GameBoard = require('./GameBoard');

module.exports = class Game {
  constructor({ map }) {
    this.gameBoard = new GameBoard(map);
  }

  render() {
    console.clear();
    console.log(this.gameBoard.toString());
  }

  start() {
    this.render();
  }
};
