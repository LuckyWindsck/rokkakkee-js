const directions = {
  upperLeft: '↖',
  upperRight: '↗',
  left: '←',
  right: '→',
  lowerLeft: '↙',
  lowerRight: '↘',
} as const;

type Direction = typeof directions[keyof typeof directions];

export {
  directions,
  Direction,
};
