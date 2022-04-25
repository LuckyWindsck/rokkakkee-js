const ansicolor = require('ansicolor');
const keypress = require('keypress');

const GameBoard = require('./GameBoard');

const {
  directions: {
    upperLeft,
    upperRight,
    left,
    right,
    lowerLeft,
    lowerRight,
  },
} = require('./constants');
const { color, defaultDirection, moveVersion } = require('./setting');
const { [moveVersion]: move } = require('./move');

const selectedDirectionColor = ansicolor[color.direction.selected];

const selectionString = [
  '  0 1',
  '2     3',
  '  4 5',
].join('\n')
  .replaceAll(/\d/g, (number) => [upperLeft, upperRight, left, right, lowerLeft, lowerRight][number]);

const keypressEvent = (game) => (_ch, key) => {
  if (key?.ctrl && key?.name === 'c') {
    process.stdin.pause();
  }

  if (['left', 'right', 'up', 'down'].includes(key.name)) {
    game.selectDirection(move[game.selectedDirection][key.name]);
    game.render();
  }

  if (key.name === 'return') {
    console.log(game.selectedDirection);
  }
};

module.exports = class Game {
  constructor({ map }) {
    this.gameBoard = new GameBoard(map);
    this.selectedDirection = defaultDirection;
    this.promptFirstTime = true;
  }

  get promptMessage() {
    const questionMark = ansicolor.green('?');
    const message = '移動する方向を選んでください';
    const hintMessage = this.promptFirstTime ? ansicolor.dim(' (矢印キーで選択)') : '';

    return `${questionMark} ${message}${hintMessage}`;
  }

  selectDirection(direction) {
    this.selectedDirection = direction;
  }

  registerInputEvent() {
    keypress(process.stdin);
    process.stdin.on('keypress', keypressEvent(this));
    process.stdin.setRawMode(true);
    process.stdin.resume();
  }

  prompt() {
    console.log(this.promptMessage);
    console.log();
    console.log(selectionString.replace(
      this.selectedDirection,
      selectedDirectionColor(this.selectedDirection),
    ));
    console.log();

    this.promptFirstTime = false;
  }

  render() {
    console.clear();
    console.log(this.gameBoard.toString());
    console.log();
    this.prompt();
  }

  start() {
    this.registerInputEvent();
    this.render();
  }
};
