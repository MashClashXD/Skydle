import React, { useEffect } from "react";
import { useState, useRef } from "react";

const flashInputRed = (inputElement) => {
  inputElement.style.transition = "background-color 0.3s ease";
  inputElement.style.backgroundColor = "#eb4949"; // Set background color to red to indicate error
  setTimeout(() => {
    inputElement.style.backgroundColor = ""; // Reset background color after 500ms
  }, 500);
};

const GuessInput = ({
  setGuessCount,
  items,
  answerItem,
  setWin,
  setResults,
  fetchPrice,
  win,
  guessCount,
  setGuesses,
}) => {
  const [guess, setGuess] = useState("");
  const guessInputRef = useRef(null);
  const guessSubmitRef = useRef(null);
  const [autocomplete, setAutocomplete] = useState([]);

  useEffect(() => {
    guessInputRef.current.focus();
  }, []);

  useEffect(() => {
    const trimmedGuess = guess.trim().toLowerCase();

    if (trimmedGuess) {
      setAutocomplete(
        items
          .filter(
            (item) =>
              item.name.toLowerCase().includes(trimmedGuess) &&
              item.name.toLowerCase() !== trimmedGuess
          )
          .slice(0, 5)
      );
    } else {
      setAutocomplete([]);
    }
  }, [guess, setAutocomplete]);

  const handleGuess = async (e) => {
    e.preventDefault();

    guessInputRef.current.disabled = true;

    const trimmedGuess = guess.trim().toLowerCase();

    const item = items.find((item) => item.name.toLowerCase() === trimmedGuess);

    if (!item) {
      return flashInputRed(guessInputRef.current);
    }

    const price = await fetchPrice(item.id);

    item.price = price;

    setResults((results) => [item, ...results]);

    const newGuess = [
      item.category === answerItem.category ? 2 : 0,
      item.material === answerItem.material ? 2 : 0,
      item.tier === answerItem.tier
        ? 2
        : Math.abs(item.tier - answerItem.tier) === 1
        ? 1
        : 0,
      item.price === answerItem.price
        ? 2
        : Math.abs(item.price - answerItem.price) /
            Math.max(item.price, answerItem.price) <
          0.25
        ? 1
        : 0,
    ];

    setGuesses((guesses) => [...guesses, newGuess]);

    setGuessCount((guessCount) => guessCount + 1);

    setGuess("");

    guessInputRef.current.disabled = false;

    guessInputRef.current.focus();

    if (answerItem.name.toLowerCase() === trimmedGuess) {
      return setWin(true);
    }
  };

  return (
    <form className="input-group mb-3" onSubmit={(e) => handleGuess(e)}>
      <label htmlFor="guess-input" className="hidden-label">
        Guess the Skydle
      </label>
      <input
        type="text"
        className="form-control"
        placeholder="Start guessing..."
        id="guess-input"
        ref={guessInputRef}
        value={guess}
        onChange={(e) => setGuess(e.target.value)}
        disabled={win || guessCount >= 10}
        tabIndex={0}
      />
      <div className="input-group-append">
        <button
          className="btn btn-outline-secondary"
          type="submit"
          disabled={win || guessCount >= 10}
          ref={guessSubmitRef}
          tabIndex={0}
        >
          Guess
        </button>
      </div>
      <section className="autocomplete-items">
        {autocomplete.map((item, index) => (
          <div
            key={index}
            onClick={() => {
              setGuess(item.name);
              guessSubmitRef.current.focus();
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setGuess(item.name);
                guessSubmitRef.current.focus();
              }
            }}
            tabIndex={0}
          >
            {item.name}
          </div>
        ))}
      </section>
    </form>
  );
};

export default GuessInput;
