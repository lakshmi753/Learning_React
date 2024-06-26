import React, { useReducer } from "react";

const initialState = {
  activePlayer: Number(false),
  currrentScore: 0,
  totalScore0: 0,
  totalScore1: 0,
  diceHidden: true,
  dice: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "rolling":
      return {
        ...state,
        dice: action.payload,
        activePlayer:
          action.payload !== 1
            ? Number(state.activePlayer)
            : Number(!state.activePlayer),
        diceHidden: false,
        currrentScore:
          action.payload !== 1 ? state.currrentScore + action.payload : 0,
      };

    case "holding":
      return {
        ...state,
        activePlayer: Number(!state.activePlayer),
        totalScore0:
          state.activePlayer === 0
            ? state.totalScore0 < 100
              ? state.totalScore0 + state.currrentScore
              : state.totalScore0
            : state.totalScore0,
        totalScore1:
          state.activePlayer === 1
            ? state.totalScore1 < 100
              ? state.totalScore1 + state.currrentScore
              : state.totalScore1
            : state.totalScore1,
        currrentScore: 0,
      };

    case "playAgain":
      return {
        ...initialState,
      };

    default:
      break;
  }
}

export default function App() {
  const [
    { activePlayer, currrentScore, diceHidden, dice, totalScore0, totalScore1 },
    dispatch,
  ] = useReducer(reducer, initialState);

  let disabled = totalScore0 >= 100 || totalScore1 >= 100;

  function handleRollBtn() {
    dispatch({ type: "rolling", payload: Math.trunc(Math.random() * 6) + 1 });
  }

  function handleHoldBtn() {
    dispatch({ type: "holding" });
  }

  function handleNewBtn() {
    dispatch({ type: "playAgain" });
  }

  return (
    <div>
      <main>
        <Section0
          activePlayer={activePlayer}
          currrentScore={currrentScore}
          totalScore0={totalScore0}
        />
        <Section1
          activePlayer={activePlayer}
          currrentScore={currrentScore}
          totalScore1={totalScore1}
        />
        <img
          src={`dice-${dice}.png`}
          alt="Playing dice"
          className={`dice ${diceHidden || disabled ? "hidden" : ""}`}
        />
        <Button classs="btn btn--new" onBtnClick={handleNewBtn}>
          🔄 New game
        </Button>
        <Button
          classs="btn btn--roll"
          onBtnClick={handleRollBtn}
          disable={disabled}
        >
          🎲 Roll dice
        </Button>
        <Button
          classs="btn btn--hold"
          onBtnClick={handleHoldBtn}
          disable={disabled}
        >
          📥 Hold
        </Button>
      </main>
    </div>
  );
}

function Section0({ activePlayer, currrentScore, totalScore0 }) {
  return (
    <section
      className={`player player--0 ${
        activePlayer === 0 ? "player--active" : ""
      } ${totalScore0 >= 100 ? "player--winner" : ""}`}
    >
      <h2 className="name" id="name--0">
        Player 1
      </h2>
      <p className="score" id="score--0">
        {totalScore0}
      </p>
      <div className="current">
        <p className="current-label">Current</p>
        <p className="current-score" id="current--0">
          {activePlayer === 0 ? currrentScore : 0}
        </p>
      </div>
    </section>
  );
}

function Section1({ activePlayer, currrentScore, totalScore1 }) {
  return (
    <section
      className={`player player--1 ${
        activePlayer === 1 ? "player--active" : ""
      } ${totalScore1 >= 100 ? "player--winner" : ""}`}
    >
      <h2 className="name" id="name--1">
        Player 2
      </h2>
      <p className="score" id="score--1">
        {totalScore1}
      </p>
      <div className="current">
        <p className="current-label">Current</p>
        <p className="current-score" id="current--1">
          {activePlayer === 1 ? currrentScore : 0}
        </p>
      </div>
    </section>
  );
}

function Button({ children, classs, onBtnClick, disable }) {
  return (
    <button
      className={`${classs} ${disable ? "hidden" : ""}`}
      onClick={onBtnClick}
    >
      {children}
    </button>
  );
}
