import ansicolor from 'ansicolor';
// @ts-ignore
import keypress from 'keypress';

import { color, defaultDirection, moveVersion } from '../setting';

import Cell from './Cell';
import Player from './Player';
import type { MapData, Position } from './types';
import type { Direction } from './util/constants';
import { directions } from './util/constants';
import moves from './util/move';

const {
  upperLeft, upperRight, left, right, lowerLeft, lowerRight,
} = directions;
const { [moveVersion]: move } = moves;

const spaces = (num: number) => ' '.repeat(num);

const selectionString = [
  '  0 1',
  '2     3',
  '  4 5',
].join('\n')
  .replaceAll(/\d/g, (number) => [upperLeft, upperRight, left, right, lowerLeft, lowerRight][Number(number)]);

interface GameOptions {
  map: MapData;
}

interface Key {
  name: undefined | string;
  ctrl: boolean;
  meta: boolean;
  shift: boolean;
  sequence: string;
  code?: string;
  scroll?: number;
  release?: boolean;
  button?: number;
}

export default class Game {
  neutral: Player;

  playerA: Player;

  playerB: Player;

  players: Record<string, Player>;

  gameBoard: Cell[][];

  currentPlayer: Player;

  selectedDirection: Direction;

  promptFirstTime: boolean;

  rule: string;

  constructor({ map }: GameOptions) {
    this.neutral = new Player(0);
    this.playerA = new Player(1);
    this.playerB = new Player(2);

    this.players = {
      neutral: this.neutral,
      playerA: this.playerA,
      playerB: this.playerB,
    };

    this.gameBoard = map.map((row, rowIdx) => row.map((col, colIdx) => {
      const pos: Position = [rowIdx, colIdx];
      const state = col;
      const cell = new Cell({ game: this, pos, state });

      if (state === 1) {
        this.playerA.setRespawn(cell);
        this.playerA.respawn();
      }

      if (state === 2) {
        this.playerB.setRespawn(cell);
        this.playerB.respawn();
      }

      return cell;
    }));

    this.currentPlayer = this.playerB;
    this.selectedDirection = defaultDirection;
    this.promptFirstTime = true;

    this.rule = `陣取り合戦 ロッカッケー のあぞびかた（ブラウザー版）

1. 緑と紫が交互に進んで戦うよ！

2. マスの数字 1 は 防御力！
    自陣なら通過すると +1
    敵陣なら攻撃すると -1
    0 まで減ると 白に戻る！

3. 本体を直接攻撃されるとポータルに戻される！

4. マスが全て埋まったとき
    自陣のマスが多いほうの勝ち！`;
  }

  get currentPlayerColor() {
    return color.player[this.currentPlayer.name];
  }

  get promptMessage() {
    const questionMark = ansicolor.cyan('?');
    const message = ansicolor[this.currentPlayerColor]('移動する方向を選んでください');
    const hintMessage = this.promptFirstTime ? ansicolor.dim(' (矢印キーで選択)') : '';

    return `${questionMark} ${message}${hintMessage}`;
  }

  selectDirection(direction: Direction) {
    this.selectedDirection = direction;
  }

  registerInputEvent() {
    const keypressEvent = (game: this) => (_ch: string, key: Key) => {
      if (key?.ctrl && key?.name === 'c') {
        process.stdin.pause();

        return;
      }

      // @ts-ignore
      if (['left', 'right', 'up', 'down'].includes(key.name)) {
        // @ts-ignore
        game.selectDirection(move[game.selectedDirection][key.name]);
        game.render();

        return;
      }

      // @ts-ignore
      if (['space', 'return'].includes(key.name)) {
        const [row, col] = game.currentPlayer.pos;

        if (row === undefined || col === undefined) throw Error('Logical Error');

        const originalCell = game.gameBoard[row][col];
        let targetCell: Cell;

        switch (game.selectedDirection) {
          case upperLeft:
            targetCell = game.gameBoard[row - 1]?.[col + (row % 2 ? -1 : 0)];
            break;
          case upperRight:
            targetCell = game.gameBoard[row - 1]?.[col + (row % 2 ? 0 : 1)];
            break;
          case left:
            targetCell = game.gameBoard[row]?.[col - 1];
            break;
          case right:
            targetCell = game.gameBoard[row]?.[col + 1];
            break;
          case lowerLeft:
            targetCell = game.gameBoard[row + 1]?.[col + (row % 2 ? -1 : 0)];
            break;
          case lowerRight:
            targetCell = game.gameBoard[row + 1]?.[col + (row % 2 ? 0 : 1)];
            break;
          default:
            break;
        }

        const canMove = targetCell!?.enterable === true;

        if (!canMove) {
          game.render();
          console.log(`${game.selectedDirection} 方向に移動できません。`);
          return;
        }

        game.currentPlayer.move(originalCell, targetCell!);
        const gameEnd = game.gameBoard.flat().every((cell) => cell.value !== 0);

        if (gameEnd) {
          const playerAcells = game.gameBoard.flat().filter((cell) => cell.owner === 'playerA').length;
          const playerBcells = game.gameBoard.flat().filter((cell) => cell.owner === 'playerB').length;

          console.clear();
          game.showGameBoard();
          console.log();

          if (playerAcells > playerBcells) {
            console.log(ansicolor[color.player.playerA]('* の勝ち'));
          } else if (playerAcells < playerBcells) {
            console.log(ansicolor[color.player.playerB]('* の勝ち'));
          } else {
            console.log('引き分け');
          }

          process.exit();
        }

        game.nextTurn();
        game.render();
      }
    };

    keypress(process.stdin);
    process.stdin.on('keypress', keypressEvent(this));
    process.stdin.setRawMode(true);
    process.stdin.resume();
  }

  showGameBoard() {
    console.log(
      this.gameBoard.map((row, rowIdx) => {
        const padStart = rowIdx % 2 ? '' : spaces(3);
        const rowString = row.map((col, _colIdx) => col.toString()).join(spaces(5));

        return padStart + rowString;
      }).join('\n'.repeat(2)),
    );
  }

  prompt() {
    console.log(this.promptMessage);
    console.log();
    console.log(selectionString.replace(
      this.selectedDirection,
      ansicolor[this.currentPlayerColor](this.selectedDirection),
    ));
    console.log();

    this.promptFirstTime = false;
  }

  render() {
    console.clear();
    this.showGameBoard();
    console.log();
    this.prompt();
  }

  nextTurn() {
    this.currentPlayer = this.currentPlayer === this.playerA ? this.playerB : this.playerA;
  }

  showRule() {
    console.log(this.rule);
  }

  start() {
    this.registerInputEvent();
    this.render();
  }
}
