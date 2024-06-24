import React, { useState } from "react";

let secretNumber = Math.ceil(Math.random() * 20);

export default function App() {
  const [msg, setMsg] = useState("🎯 Start guessing");
  const [guessedNum, setGuessedNum] = useState("");
  const [score, setScore] = useState(20);
  const [highScore, setHighScore] = useState(0);
  const [secretNum, setSecretNum] = useState("?");
  const [disabled, setDisabled] = useState(false);

  function handleGuessingNum() {
    //console.log(guessedNum);

    if (!guessedNum) {
      setMsg("⚠️ No number");
    } else if (guessedNum === secretNumber) {
      setMsg("🎉 Correct number");
      setHighScore(highScore < score ? score : highScore);
      setSecretNum(secretNumber);
      setDisabled(true);
    } else if (guessedNum !== secretNumber) {
      if (score > 1) {
        setMsg(guessedNum > secretNumber ? "📈 Too high" : "📉 Too low");
        setScore((score) => score - 1);
      } else {
        setMsg("😵‍💫 Game over");
        setScore(0);
        setDisabled(true);
      }
    }
  }

  function handlePlayAgain() {
    setMsg("🎯 Start guessing");
    setScore(20);
    setDisabled(false);
    setGuessedNum("");
    setSecretNum("?");
    secretNumber = Math.ceil(Math.random() * 20);
  }

  return (
    <div
      style={msg === "🎉 Correct number" ? { backgroundColor: "#60b347" } : {}}
    >
      <Header secretNum={secretNum} onReset={handlePlayAgain} />
      <main>
        <LeftSection
          guessedNum={guessedNum}
          onGuessingNum={handleGuessingNum}
          disabled={disabled}
          setGuessedNum={setGuessedNum}
        />
        <RightSection msg={msg} score={score} highScore={highScore} />
      </main>
    </div>
  );
}

function Header({ secretNum, onReset }) {
  return (
    <header>
      <h1>Guess My Number!</h1>
      <p className="between">(Between 1 and 20)</p>
      <button className="btn again" onClick={onReset}>
        Again!
      </button>
      <div className="number">{secretNum}</div>
    </header>
  );
}

function LeftSection({ guessedNum, onGuessingNum, disabled, setGuessedNum }) {
  return (
    <section className="left">
      <input
        disabled={disabled}
        type="number"
        className="guess"
        value={guessedNum}
        onChange={(e) => setGuessedNum(Number(e.target.value))}
      />
      <button className="btn check" onClick={onGuessingNum}>
        Check!
      </button>
    </section>
  );
}

function RightSection({ msg, score, highScore }) {
  return (
    <section className="right">
      <p className="message">{msg}</p>
      <p className="label-score">
        💯 Score: <span className="score">{score}</span>
      </p>
      <p className="label-highscore">
        🥇 Highscore: <span className="highscore">{highScore}</span>
      </p>
    </section>
  );
}
