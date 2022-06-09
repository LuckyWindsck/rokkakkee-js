module.exports = class Player {
  constructor(id) {
    this.id = id;
    this.name = ['neutral', 'playerA', 'playerB'][id];
    this.pos = [undefined, undefined];
    this.respawnCell = undefined;
  }

  setRespawn(cell) {
    this.respawnCell = cell;
  }

  respawn() {
    this.pos = this.respawnCell.pos;
    this.respawnCell.playerOnCell = true;
  }

  move(originalCell, targetCell) {
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
};
