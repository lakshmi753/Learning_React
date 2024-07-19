import { useQuiz } from "../contexts/QuizContext";
import Options from "./Options";

function Questions() {
  const { questions, index } = useQuiz();
  const curQuestion = questions.at(index);

  return (
    <div>
      <h4>{curQuestion.question}</h4>
      <Options question={curQuestion} />
    </div>
  );
}

export default Questions;
