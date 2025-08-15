import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import { GameBoard } from "../../components/GameBoard";
import { GameOverModal } from "../../components/GameOverModal";
import { GameCellType } from "../../types/types";
import { initializeBoard } from "../../utils/utils";

export const GamePage: React.FC = () => {
  const [board, setBoard] = useState<GameCellType[]>(initializeBoard);
  const [score, setScore] = useState(0);
  const [currentTurn, setCurrentTurn] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleGameOver = () => {
    setIsModalOpen(true);
  };

  const handleScoreIncrease = () => {
    setScore((prev) => prev + 1);
    setCurrentTurn((prev) => prev + 1);
  };

  const handleNewRound = () => {
    setScore(0);
    setCurrentTurn(1);
    setIsModalOpen(false);
    setBoard(initializeBoard);
  };

  return (
    <Box maxWidth="lg">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          py: 4,
          gap: 3,
        }}
      >
        <Typography
          variant="h2"
          component="h1"
          sx={{
            textAlign: "center",
            fontWeight: "bold",
            color: "primary.main",
            mb: 2,
          }}
        >
          Multiplayer Grid Game
        </Typography>
        <Typography
          variant="h3"
          sx={{ fontWeight: "bold", color: "primary.main" }}
        >
          Score: {score}
        </Typography>
        {isModalOpen ? (
          <GameOverModal
            open={isModalOpen}
            score={score}
            onResetBoard={handleNewRound}
          />
        ) : (
          <></>
        )}
        <GameBoard
          onGameOver={handleGameOver}
          onScoreIncrease={handleScoreIncrease}
          board={board}
          setBoard={setBoard}
        />
        <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
          <Typography variant="body1" sx={{ color: "text.secondary" }}>
            Turn: {currentTurn}
          </Typography>
        </Box>
        <Box
          sx={{
            mt: 3,
            p: 2,
            bgcolor: "grey.50",
            borderRadius: 2,
            maxWidth: 600,
          }}
        >
          <Typography variant="h6" gutterBottom>
            How to Play:
          </Typography>
          <Typography variant="body2" component="div">
            • Click any cell to randomly change its shape and color
            <br />
            • New shape and color must be different from adjacent cells
            <br />
            • Each click gives +1 point and puts the cell on 3-turn cooldown
            <br />
            • Game ends when no valid moves remain
            <br />• Adjacent means up, down, left, right (not diagonals)
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
