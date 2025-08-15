export type Shape = "triangle" | "square" | "diamond" | "circle";
export type Color = "red" | "green" | "blue" | "yellow";
export type CooldownState = 0 | 1 | 2 | 3;

export interface GameCellType {
  position: number;
  shape: Shape;
  color: Color;
  cooldown: CooldownState;
}

export interface GameState {
  cells: GameCellType[];
  score: number;
  isGameOver: boolean;
  currentTurn: number;
}

export interface Position {
  row: number;
  col: number;
}

export interface GameBoardProps {
  gameState: GameState;
}

export interface GameCellProps {
  cell: GameCellType;
  onClick: () => void;
  disabled: boolean;
}

export interface ShapeProps {
  color: Color;
  size?: number;
}
