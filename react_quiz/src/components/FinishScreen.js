function FinishScreen() {
  return (
    <>
      <p className="result">
        <span>Emoji</span>
        You scored <strong>X points</strong> out of TotalPoints (Percentage)%
      </p>
      <p className="highscore">HighScore: X points</p>
      <button className="btn btn-ui">Restart Quiz</button>
    </>
  );
}

export default FinishScreen;
