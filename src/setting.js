const { directions: { left } } = require('./constants');

const color = {
  player: {
    neutral: 'white',
    playerA: 'green',
    playerB: 'magenta',
  },
  direction: {
    selected: 'red',
  },
};

const defaultDirection = left;

const moveVersion = 'ver2';

module.exports = {
  color,
  defaultDirection,
  moveVersion,
};
