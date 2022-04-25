const { directions: { left } } = require('./constants');

module.exports = {
  color: {
    player: {
      neutral: 'white',
      playerA: 'green',
      playerB: 'magenta',
    },
    direction: {
      selected: 'red',
    },
  },
  debug: false,
  defaultDirection: left,
  moveVersion: 'ver2',
};
