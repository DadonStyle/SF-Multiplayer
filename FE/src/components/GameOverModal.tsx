import React from "react";
import { createPortal } from "react-dom";
import { Modal, Box, Typography, Button } from "@mui/material";

interface GameOverModalProps {
  open: boolean;
  score: number;
  onResetBoard: () => void;
  title?: string;
  subtitle?: string;
}

export const GameOverModal: React.FC<GameOverModalProps> = ({
  open,
  score,
  onResetBoard,
  title = "Game Over!",
  subtitle = "No valid shape/color combination available",
}) => {
  const handleNewRound = () => {
    onResetBoard();
  };

  return createPortal(
    <Modal open={open} onClose={() => {}} aria-labelledby="game-over-title">
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          border: "2px solid",
          borderColor: "error.main",
          borderRadius: 3,
          boxShadow: 24,
          p: 4,
          textAlign: "center",
        }}
      >
        <Typography
          id="game-over-title"
          variant="h3"
          sx={{
            fontWeight: "bold",
            color: "error.main",
            mb: 2,
          }}
        >
          {title}
        </Typography>

        <Typography variant="h5" sx={{ mb: 1 }}>
          Final Score: {score}
        </Typography>

        <Typography variant="body1" sx={{ mb: 2, color: "text.secondary" }}>
          {subtitle}
        </Typography>

        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={handleNewRound}
          sx={{ minWidth: 150 }}
        >
          New Round
        </Button>
      </Box>
    </Modal>,
    document.body
  );
};
