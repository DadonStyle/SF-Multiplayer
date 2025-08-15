import React, { Dispatch } from "react";
import { Box } from "@mui/material";
import { CooldownState, GameCellType } from "../types/types";
import { GameCell } from "./GameCell";
import { COOLDOWN_TURNS } from "../constants/constants";
import { generateValidCell } from "../utils/utils";

interface GameBoardProps {
  board: GameCellType[];
  setBoard: Dispatch<GameCellType[]>;
  onGameOver: (setBoard: Dispatch<GameCellType[]>) => void;
  onScoreIncrease: () => void;
}

export const GameBoard: React.FC<GameBoardProps> = ({
  board,
  setBoard,
  onGameOver,
  onScoreIncrease,
}) => {
  const handleCellClick = (position: number) => {
    const newCell = generateValidCell(board, position);
    if (!newCell) {
      onGameOver(setBoard);
      return;
    }
    newCell.cooldown = COOLDOWN_TURNS as CooldownState;
    const newBoard = [...board];
    for (let i = 0; i < newBoard.length; i++) {
      if (newBoard[i].cooldown > 0) {
        newBoard[i] = {
          ...newBoard[i],
          cooldown: Math.max(0, newBoard[i].cooldown - 1) as CooldownState,
        };
      }
    }
    newBoard[position] = newCell;
    setBoard(newBoard);
    onScoreIncrease();
  };

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(6, 1fr)",
        gridTemplateRows: "repeat(3, 1fr)",
        gap: 1,
        padding: 2,
        bgcolor: "grey.100",
        borderRadius: 3,
        border: "3px solid",
        borderColor: "primary.main",
      }}
    >
      {board.map((cell) => (
        <GameCell
          key={cell.position}
          cell={cell}
          onClick={() => handleCellClick(cell.position)}
          disabled={cell.cooldown > 0}
        />
      ))}
    </Box>
  );
};
