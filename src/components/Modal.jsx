import { forwardRef, useEffect, useState } from "react";

import { motion } from "framer-motion";

const Modal = forwardRef(function Modal(
  { startProgress, answerIsCorrect, playerTurnAndScore, usernames },
  ref
) {
  const [timer, setTimer] = useState(3);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 0) {
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  });

  console.log(timer);

  return (
    <motion.dialog
      ref={ref}
      initial={{ opacity: 0, y: "-500px" }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: "300px" }}
    >
      <h1>You are {answerIsCorrect ? "correct!" : "wrong!"}</h1>
      {answerIsCorrect && <p>You gained a point.</p>}
      {playerTurnAndScore.turn === "X" ? (
        <p>
          It's <strong>{usernames.player2}'s</strong> turn!
        </p>
      ) : (
        <p>
          It's <strong>{usernames.player1}'s</strong> turn!
        </p>
      )}
      <p>This modal will close in {timer} seconds.</p>
      <button className="next_button" onClick={startProgress}>
        Next question
      </button>
    </motion.dialog>
  );
});

export default Modal;
