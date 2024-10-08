import { useEffect, useRef, useState } from "react";
import Modal from "./Modal";
import GameEnded from "./GameEnded";

import { AnimatePresence, motion } from "framer-motion";

export default function GamePage({
  usernames,
  saveNewUsernames,
  countryToGuess,
  threeCountries,
  setGame,
}) {
  const [usernameIsEditing, setUsernameIsEditing] = useState({
    player1: false,
    player2: false,
  });
  const [playerTurnAndScore, setPlayerTurnAndScore] = useState({
    player1Score: 0,
    player2Score: 0,
    turn: "X",
  });
  const [progress, setProgress] = useState(0);
  const [modal, setModal] = useState(false);
  const [answerIsCorrect, setAnswerIsCorrect] = useState(false);

  const editPlayer1Ref = useRef();
  const editPlayer2Ref = useRef();
  const modalRef = useRef();

  useEffect(() => {
    if (modal && modalRef.current) {
      modalRef.current.showModal();
    }
  }, [modal]);

  useEffect(() => {
    const userIsEditing =
      usernameIsEditing.player1 || usernameIsEditing.player2;

    let interval;
    let timeout;
    let timeoutTwo;

    if (!modal) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (
            (prev >= 100 && playerTurnAndScore.turn === "X") ||
            (prev >= 100 && playerTurnAndScore.turn === "O")
          ) {
            clearInterval(interval);
            setAnswerIsCorrect(false);
            setModal(true);

            if (modal) {
              timeout = timeoutFunc();
            }

            return 0;
          }
          return prev + 1;
        });

        if (userIsEditing) {
          clearInterval(interval);
        }
      }, 50);
    }

    if (modal) {
      timeoutTwo = timeoutFunc();
    }

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
      clearTimeout(timeoutTwo);
    };
  }, [usernameIsEditing, modal]);

  const timeoutFunc = () => {
    const timeout = setTimeout(() => {
      setModal(false);
      setGame();
      setPlayerTurnAndScore((prev) => {
        return {
          ...prev,
          turn: prev.turn === "X" ? "O" : "X",
        };
      });
      console.log("timeout executing");
    }, 3000);

    return timeout;
  };

  const startProgress = () => {
    setModal(false);
    setGame();
    setPlayerTurnAndScore((prev) => {
      return {
        ...prev,
        turn: prev.turn === "X" ? "O" : "X",
      };
    });
  };

  const editUsername = (identifier) => {
    setUsernameIsEditing((prev) => {
      return { ...prev, [identifier]: true };
    });
  };

  const saveButton = (identifier) => {
    let identity;
    if (identifier === "player1" && editPlayer1Ref.current) {
      identity = editPlayer1Ref.current.value;
    } else if (identifier === "player2" && editPlayer2Ref.current) {
      identity = editPlayer2Ref.current.value;
    }
    setUsernameIsEditing((prev) => {
      return { ...prev, [identifier]: false };
    });
    saveNewUsernames(identifier, identity);
  };

  const selectCountry = (country) => {
    const isCorrectGuess = countryToGuess.name.common === country.name.common;
    const playerTurn = playerTurnAndScore.turn;

    if (isCorrectGuess) {
      setAnswerIsCorrect(true);
      setModal(true);
      setProgress(0);
      setPlayerTurnAndScore((prev) => {
        return {
          ...prev,
          [playerTurn === "X" ? "player1Score" : "player2Score"]:
            prev[playerTurn === "X" ? "player1Score" : "player2Score"] + 1,
        };
      });
    } else {
      setAnswerIsCorrect(false);
      setModal(true);
      setProgress(0);
    }
  };

  const gameHasWinner =
    playerTurnAndScore.player1Score === 3 ||
    playerTurnAndScore.player2Score === 3;

  if (gameHasWinner) {
    return <GameEnded playerTurnAndScore={playerTurnAndScore} />;
  }

  return (
    <>
      <AnimatePresence>
        {modal && (
          <Modal
            ref={modalRef}
            startProgress={startProgress}
            answerIsCorrect={answerIsCorrect}
            playerTurnAndScore={playerTurnAndScore}
            usernames={usernames}
          />
        )}
      </AnimatePresence>

      <div className="game_wrapper">
        <div className="top_gamediv">
          <div
            className={
              playerTurnAndScore.turn === "X"
                ? "player1_div_active"
                : "player1_div"
            }
          >
            <div className="edit_block">
              {usernameIsEditing.player1 ? (
                <input
                  type="text"
                  ref={editPlayer1Ref}
                  defaultValue={usernames.player1}
                />
              ) : (
                <h1>{usernames.player1}</h1>
              )}

              {usernameIsEditing.player1 ? (
                <button onClick={() => saveButton("player1")}>Save</button>
              ) : (
                <button onClick={() => editUsername("player1")}>Edit</button>
              )}
            </div>
            {playerTurnAndScore.turn === "X" && (
              <p className="your_turn">Your turn</p>
            )}
          </div>
          <div>
            <h1>{playerTurnAndScore.player1Score}</h1>
          </div>
          <div className="scoreboard">
            <h1>Guess the Country!</h1>
            <h1 className="country_text">{countryToGuess.name.common}</h1>
          </div>
          <div>
            <h1>{playerTurnAndScore.player2Score}</h1>
          </div>
          <div
            className={
              playerTurnAndScore.turn === "O"
                ? "player2_div_active"
                : "player2_div"
            }
          >
            <div className="edit_block">
              {usernameIsEditing.player2 ? (
                <input
                  type="text"
                  ref={editPlayer2Ref}
                  defaultValue={usernames.player2}
                />
              ) : (
                <h1>{usernames.player2}</h1>
              )}
              {usernameIsEditing.player2 ? (
                <button onClick={() => saveButton("player2")}>Save</button>
              ) : (
                <button onClick={() => editUsername("player2")}>Edit</button>
              )}
            </div>
            {playerTurnAndScore.turn === "O" && (
              <p className="your_turn">Your turn</p>
            )}
          </div>
        </div>
        <div className="bottom_gamediv">
          {threeCountries.map((country, i) => {
            return (
              <motion.div
                onClick={() => selectCountry(country)}
                className="country_card_div"
                whileHover={{ scale: 1.1, cursor: "pointer" }}
              >
                <img
                  src={country.flags.png}
                  alt={country.flags.alt}
                  className="country_image"
                />
                <div className="country_details">
                  <p>Country: {country.name.common}</p>
                  <p>Population: {country.population}</p>
                  <p>Language: {Object.values(country.languages)[0]}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
        <div className="progressbar_div">
          <progress
            className="progress_bar"
            id="file"
            value={progress}
            max="100"
          >
            32%
          </progress>
        </div>
      </div>
    </>
  );
}
