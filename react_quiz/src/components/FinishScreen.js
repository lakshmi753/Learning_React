import { useQuiz } from "../contexts/QuizContext";

function FinishScreen() {
  const { dispatch, points, totalPoints, highScore } = useQuiz();

  let emoji;

  let percentage = Math.round((points / totalPoints) * 100);

  if (percentage === 100) emoji = "🥇";
  if (percentage < 100 && percentage >= 80) emoji = "🏆";
  if (percentage < 80 && percentage >= 50) emoji = "🎁";
  if (percentage < 50 && percentage >= 20) emoji = "😉";
  if (percentage < 20 && percentage >= 0) emoji = "🙃";

  return (
    <>
      <p className="result">
        <span>{emoji}</span>
        You scored <strong>{points}</strong> out of {totalPoints} ( {percentage}
        % )
      </p>
      <p className="highscore">HighScore: {highScore} points </p>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "restart" })}
      >
        Restart Quiz
      </button>
    </>
  );
}

export default FinishScreen;
