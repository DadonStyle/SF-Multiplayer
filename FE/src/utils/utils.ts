import { GameCellType, Shape, Color } from "../types/types";
import {
  SHAPES,
  COLORS,
  GRID_ROWS,
  GRID_COLS,
  TOTAL_CELLS,
} from "../constants/constants";

export const getAvailableOptions = <T>(
  allOptions: T[],
  forbidden: Set<T>
): T[] => {
  return allOptions.filter((option) => !forbidden.has(option));
};

export const positionToRowCol = (position: number): [number, number] => {
  return [Math.floor(position / GRID_COLS), position % GRID_COLS];
};

export const rowColToPosition = (row: number, col: number): number => {
  return row * GRID_COLS + col;
};

export const getAdjacentPositions = (position: number): number[] => {
  const [row, col] = positionToRowCol(position);
  const adjacent: number[] = [];

  if (row > 0) adjacent.push(rowColToPosition(row - 1, col));
  if (row < GRID_ROWS - 1) adjacent.push(rowColToPosition(row + 1, col));
  if (col > 0) adjacent.push(rowColToPosition(row, col - 1));
  if (col < GRID_COLS - 1) adjacent.push(rowColToPosition(row, col + 1));

  return adjacent;
};

export const getForbiddenOptions = (
  board: GameCellType[],
  position: number
): { shapes: Set<Shape>; colors: Set<Color> } => {
  const forbiddenShapes = new Set<Shape>();
  const forbiddenColors = new Set<Color>();

  const adjacentPositions = getAdjacentPositions(position);
  for (const adjPosition of adjacentPositions) {
    const adjCell = board[adjPosition];
    if (adjCell) {
      forbiddenShapes.add(adjCell.shape);
      forbiddenColors.add(adjCell.color);
    }
  }

  return { shapes: forbiddenShapes, colors: forbiddenColors };
};

export const initializeBoard = (): GameCellType[] => {
  const board: GameCellType[] = Array(TOTAL_CELLS).fill(null);

  for (let position = 0; position < TOTAL_CELLS; position++) {
    const { shapes: forbiddenShapes, colors: forbiddenColors } =
      getForbiddenOptions(board, position);

    const availableShapes = getAvailableOptions(SHAPES, forbiddenShapes);
    const availableColors = getAvailableOptions(COLORS, forbiddenColors);

    const shape =
      availableShapes[Math.floor(Math.random() * availableShapes.length)];
    const color =
      availableColors[Math.floor(Math.random() * availableColors.length)];

    board[position] = { position, shape, color, cooldown: 0 };
  }

  return board;
};

export const generateValidCell = (
  board: GameCellType[],
  position: number
): GameCellType | null => {
  const currentCell = board[position];
  const { shapes: forbiddenShapes, colors: forbiddenColors } =
    getForbiddenOptions(board, position);
  if (currentCell) {
    forbiddenShapes.add(currentCell.shape);
    forbiddenColors.add(currentCell.color);
  }

  const availableShapes = getAvailableOptions(SHAPES, forbiddenShapes);
  const availableColors = getAvailableOptions(COLORS, forbiddenColors);

  if (availableShapes.length === 0 || availableColors.length === 0) {
    return null;
  }

  const shape =
    availableShapes[Math.floor(Math.random() * availableShapes.length)];
  const color =
    availableColors[Math.floor(Math.random() * availableColors.length)];

  return { position, shape, color, cooldown: 0 };
};
