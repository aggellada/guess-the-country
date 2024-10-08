import { useRef } from "react";
import { motion } from "framer-motion";

export default function UsernameForm({ submitUsernames }) {
  const firstPlayer = useRef();
  const secondPlayer = useRef();

  const formRef = useRef();

  return (
    <div className="welcome_wrapper">
      <motion.div
        className="content_container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="title_div">
          <h1>Guess the Country Flags</h1>
          <h3>Guess the country of 255 countries:</h3>
          <h5>First player to score 5 points wins the game!</h5>
        </div>
        <div className="form_div">
          <form
            className="form_usernames"
            ref={formRef}
            onSubmit={(e) => submitUsernames(e, formRef.current)}
          >
            <label htmlFor="player1">First Player</label>
            <input
              type="text"
              ref={firstPlayer}
              id="player1"
              name="player1"
              required
            />
            <label htmlFor="player2">Second Player</label>
            <input
              type="text"
              ref={secondPlayer}
              id="player1"
              name="player2"
              required
            />
            <div className="play_game_div">
              <button className="play_game">Play Game</button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
