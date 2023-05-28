import ansicolor from 'ansicolor';

import { color, debug } from '../setting';

import type Game from './Game';
import type Player from './Player';
import type { CellData, Position, ValidPlayer } from './types';

const { player: playerColor } = color;

interface CellOptions {
  game: Game;
  pos: Position;
  state: CellData;
}

export default class Cell {
  game: Game;

  pos: Position;

  owner: ValidPlayer;

  value: null | number;

  playerOnCell: boolean;

  constructor({ game, pos, state }: CellOptions) {
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

  playerInvade(player: Player) {
    this.game.players[this.owner].respawn();
    this.owner = player.name;
    this.value = 1;
    this.playerOnCell = true;
  }

  playerAttack() {
    if (this.value === null) throw Error('Logical Error');

    this.value -= 1;

    if (this.value === 0) this.owner = 'neutral';
  }

  playerCome(player: Player) {
    this.owner = player.name;
    if (this.value === null) throw Error('Logical Error');
    this.value += 1;
    if (this.value === 10) this.value = 9;
    this.playerOnCell = true;
  }

  playerLeave() {
    this.playerOnCell = false;
  }

  toString() {
    let cellColor: (text: string|number|null|undefined) => string;
    let character: string;

    if (this.enterable && this.owner === 'neutral') {
      // Unoccupied Cell
      cellColor = ansicolor[playerColor[this.owner]];
      character = '-';
    } else if (this.enterable && this.owner !== 'neutral') {
      // Occupied Cell
      cellColor = ansicolor[playerColor[this.owner]];
      character = this.playerOnCell ? '*' : String(this.value);
    } else if (!this.enterable && this.owner === 'neutral') {
      // Empty Cell
      cellColor = ansicolor.dim;
      character = debug ? '-' : ' ';
    } else if (!this.enterable && this.owner !== 'neutral') {
      // Respawn Cell
      cellColor = (text) => ansicolor.inverse(ansicolor[playerColor[this.owner]](text));
      character = this.playerOnCell ? '*' : '-';
    } else {
      throw Error('Logical Error');
    }

    return cellColor(character);
  }
}
