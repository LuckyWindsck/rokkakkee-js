type ValidPlayer = 'neutral' | 'playerA' | 'playerB';

type ValidPlayerId = 0 | 1 | 2;

type CellData = null | ValidPlayerId;

type MapData = CellData[][];

type Position = [number, number];

export {
  ValidPlayer,
  ValidPlayerId,
  CellData,
  MapData,
  Position,
};
