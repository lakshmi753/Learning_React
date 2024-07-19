import { useQuiz } from "../contexts/QuizContext";

function Options({ question }) {
  const { dispatch, answer } = useQuiz();

  const hasAnswered = answer !== null;

  return (
    <div>
      <div className="options">
        {question.options.map((option, i) => (
          <button
            className={`btn btn-option ${answer === i ? "answer" : ""} ${
              hasAnswered
                ? i === question.correctOption
                  ? "correct"
                  : "wrong"
                : ""
            }`}
            key={i}
            disabled={hasAnswered}
            onClick={() => dispatch({ type: "newAnswer", payload: i })}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Options;
