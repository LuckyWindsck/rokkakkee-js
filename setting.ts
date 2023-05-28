import { directions } from './src/util/constants';

const color = {
  player: {
    neutral: 'white',
    playerA: 'magenta',
    playerB: 'green',
  },
} as const;
const debug = false;
const defaultDirection = directions.left;
const moveVersion = 'ver2';

export {
  color,
  debug,
  defaultDirection,
  moveVersion,
};
