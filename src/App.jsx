import { useEffect, useState } from "react";
import GuessInput from "./GuessInput";
import Welcome from "./Welcome";
import Results from "./Results";
import ShareButton from "./ShareButton";
import Answer from "./Answer";

function mulberry32(seed) {
  return function () {
    var t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function getSeededRandom() {
  const date = new Date();
  const estDate = new Date(
    date.toLocaleString("en-US", { timeZone: "America/New_York" })
  );
  const seed =
    estDate.getFullYear() * 10000 +
    (estDate.getMonth() + 1) * 100 +
    estDate.getDate();
  const randomFunc = mulberry32(seed);
  return randomFunc();
}

const fetchPrice = async (itemId) => {
  const response = await fetch(
    `https://sky.coflnet.com/api/item/price/${itemId}/current?count=1`
  );

  const json = await response.json();

  return json?.buy || 0;
};

function App() {
  const [guessCount, setGuessCount] = useState(0); // Change to 0
  const [items, setItems] = useState([]);
  const [answerItem, setAnswerItem] = useState({});
  const [win, setWin] = useState(false);
  const [results, setResults] = useState([]);
  const [guesses, setGuesses] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      const response = await fetch("/Skydle/items.json");
      const data = await response.json();
      setItems(data);
    };

    fetchItems();
  }, [setItems]);

  useEffect(() => {
    const selectItem = async () => {
      const selectedItem = items[Math.floor(getSeededRandom() * items.length)];
      if (selectedItem?.id) {
        const price = await fetchPrice(selectedItem.id);
        setAnswerItem({ ...selectedItem, price });
      } else {
        const price = 0;
        setAnswerItem({ ...selectedItem, price });
      }
    };
    selectItem();
  }, [items, setAnswerItem]);

  return (
    <main>
      <h1 className="text-center">Skydle</h1>
      <p>Guess {guessCount} of 10</p>
      <GuessInput
        setGuessCount={setGuessCount}
        items={items}
        answerItem={answerItem}
        setWin={setWin}
        setResults={setResults}
        fetchPrice={fetchPrice}
        win={win}
        guessCount={guessCount}
        setGuesses={setGuesses}
      />
      <p style={{ textAlign: "center", fontWeight: "bold" }}>
        {win
          ? "Congratulations, you guessed it Correctly!"
          : guessCount < 10
          ? ""
          : "No more guesses left. The Correct answer was:"}
      </p>
      {guessCount < 10 && !win && (
        <>
          {guessCount < 1 && <Welcome />}
          <Results results={results} answerItem={answerItem} />
        </>
      )}
      {(win || guessCount >= 10) && (
        <>
          <Answer answerItem={answerItem} />
          <ShareButton guessCount={guessCount} guesses={guesses} />
        </>
      )}
    </main>
  );
}

export default App;
