const { directions } = require('./src/util/constants');

module.exports = {
  color: {
    player: {
      neutral: 'white',
      playerA: 'magenta',
      playerB: 'green',
    },
  },
  debug: false,
  defaultDirection: directions.left,
  moveVersion: 'ver2',
};
