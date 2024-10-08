import { motion } from "framer-motion";

export default function GameEnded({ playerTurnAndScore }) {
  let winner;
  if (playerTurnAndScore.player1Score === 3) {
    winner = "Player 1";
  } else if (playerTurnAndScore.player2Score === 3) {
    winner = "Player 2";
  }

  return (
    <motion.div
      className="game_ended"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
    >
      <div className="game_ended_content">
        <h1>Game ended!</h1>
        <h1>{winner} has won!</h1>
      </div>
    </motion.div>
  );
}
