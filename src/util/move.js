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

const moveVer1 = {
  [upperLeft]: {
    left,
    right: upperRight,
    up: upperLeft,
    down: lowerLeft,
  },
  [upperRight]: {
    left: upperLeft,
    right,
    up: upperRight,
    down: lowerRight,
  },
  [left]: {
    left,
    right,
    up: upperLeft,
    down: lowerLeft,
  },
  [right]: {
    left,
    right,
    up: upperRight,
    down: lowerRight,
  },
  [lowerLeft]: {
    left,
    right: lowerRight,
    up: upperLeft,
    down: lowerLeft,
  },
  [lowerRight]: {
    left: lowerLeft,
    right,
    up: upperRight,
    down: lowerRight,
  },
};

const moveVer2 = {
  [upperLeft]: {
    left,
    right: upperRight,
    up: upperLeft,
    down: left,
  },
  [upperRight]: {
    left: upperLeft,
    right,
    up: upperRight,
    down: right,
  },
  [left]: {
    left,
    right,
    up: upperLeft,
    down: lowerLeft,
  },
  [right]: {
    left,
    right,
    up: upperRight,
    down: lowerRight,
  },
  [lowerLeft]: {
    left,
    right: lowerRight,
    up: left,
    down: lowerLeft,
  },
  [lowerRight]: {
    left: lowerLeft,
    right,
    up: right,
    down: lowerRight,
  },
};

module.exports = {
  ver1: moveVer1,
  ver2: moveVer2,
};
