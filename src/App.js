import { useEffect, useState } from "react";
import "./App.css";
import UsernameForm from "./components/UsernameForm";
import GamePage from "./components/GamePage";

function App() {
  const [page, setPage] = useState("usernameForm");
  const [usernames, setUsernames] = useState({
    player1: "Player1",
    player2: "Player2",
  });

  const [allCountriesData, setAllCountriesData] = useState([]);
  const [countryToGuess, setCountryToGuess] = useState(null);
  const [threeCountries, setThreeCountries] = useState([]);

  useEffect(() => {
    const fetchCountriesData = async () => {
      const response = await fetch("https://restcountries.com/v3.1/all");
      const data = await response.json();
      setAllCountriesData(data);
    };
    fetchCountriesData();
  }, []);

  const setGame = () => {
    const threeCountriesArray = [
      allCountriesData[Math.floor(Math.random() * maxLength)],
      allCountriesData[Math.floor(Math.random() * maxLength)],
      allCountriesData[Math.floor(Math.random() * maxLength)],
    ];
    const country = threeCountriesArray[Math.floor(Math.random() * 3)];
    setCountryToGuess(country);
    setThreeCountries(threeCountriesArray);
  };

  const maxLength = allCountriesData && allCountriesData.length;

  const submitUsernames = (e, form) => {
    e.preventDefault();
    setPage("gamePage");

    const fd = new FormData(form);

    fd.forEach((value, key) => {
      setUsernames((prev) => {
        return { ...prev, [key]: value };
      });
    });

    setGame();
  };

  const saveNewUsernames = (identifier, newUsername) => {
    setUsernames((prev) => {
      return { ...prev, [identifier]: newUsername };
    });
  };

  let displayPage;
  if (page === "usernameForm") {
    displayPage = <UsernameForm submitUsernames={submitUsernames} />;
  } else if (page === "gamePage") {
    displayPage = (
      <GamePage
        usernames={usernames}
        saveNewUsernames={saveNewUsernames}
        countryToGuess={countryToGuess}
        threeCountries={threeCountries}
        setGame={setGame}
      />
    );
  }

  return <>{displayPage}</>;
}

export default App;
