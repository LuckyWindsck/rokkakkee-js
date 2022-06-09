const { directions: { left } } = require('./constants');

module.exports = {
  color: {
    player: {
      neutral: 'white',
      playerA: 'magenta',
      playerB: 'green',
    },
  },
  debug: false,
  defaultDirection: left,
  moveVersion: 'ver2',
};
