import type Cell from './Cell';
import type { Position, ValidPlayer, ValidPlayerId } from './types';

export default class Player {
  id: ValidPlayerId;

  name: ValidPlayer;

  pos: [undefined, undefined] | Position;

  respawnCell: undefined | Cell;

  constructor(id: ValidPlayerId) {
    this.id = id;
    this.name = ['neutral', 'playerA', 'playerB'][id] as ValidPlayer;
    this.pos = [undefined, undefined];
    this.respawnCell = undefined;
  }

  setRespawn(cell: Cell) {
    this.respawnCell = cell;
  }

  respawn() {
    if (!this.respawnCell) throw Error('Logical Error');

    this.pos = this.respawnCell.pos;
    this.respawnCell.playerOnCell = true;
  }

  move(originalCell: Cell, targetCell: Cell) {
    if (targetCell.owner === 'neutral' || targetCell.owner === this.name) {
      originalCell.playerLeave();
      this.pos = targetCell.pos;
      targetCell.playerCome(this);
      return;
    }

    if (targetCell.playerOnCell) {
      originalCell.playerLeave();
      this.pos = targetCell.pos;
      targetCell.playerInvade(this);
      return;
    }

    targetCell.playerAttack();
  }
}
