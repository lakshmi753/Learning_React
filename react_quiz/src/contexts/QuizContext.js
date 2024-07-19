import { createContext, useContext, useEffect, useReducer } from "react";

const QuizContext = createContext();

const SECS_PER_QUES = 30;

const initialState = {
  status: "loading",
  questions: [],
  index: 0,
  answer: null,
  points: 0,
  highScore: 0,
  secondsRemaining: 15 * SECS_PER_QUES,
};

function reducer(state, action) {
  switch (action.type) {
    case "dataRecieved":
      return {
        ...state,
        status: "ready",
        questions: action.payload,
      };

    case "start":
      return {
        ...state,
        status: "active",
      };

    case "newAnswer":
      const curQuestion = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          curQuestion.correctOption === action.payload
            ? state.points + curQuestion.points
            : state.points,
      };

    case "newQuestion":
      return {
        ...state,
        index: state.index + 1,
        answer: null,
      };

    case "tick":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finished" : state.status,
      };

    case "finish":
      return {
        ...state,
        status: "finished",
        highScore: state.points,
      };

    case "restart":
      return {
        ...initialState,
        status: "ready",
        questions: state.questions,
      };

    case "dataFailed":
      return {
        ...state,
        status: "error",
      };
    default:
      break;
  }
}

function QuizProvider({ children }) {
  const [
    { status, questions, index, answer, points, highScore, secondsRemaining },
    dispatch,
  ] = useReducer(reducer, initialState);

  const numQuestions = questions.length;
  const totalPoints = questions.reduce((acc, cur) => acc + cur.points, 0);

  useEffect(function () {
    async function getQuestions() {
      try {
        const res = await fetch("http://localhost:8000/questions");

        if (!res) {
          throw new Error("Something went wrong!");
        }

        const data = await res.json();

        dispatch({ type: "dataRecieved", payload: data });
      } catch (err) {
        dispatch({ type: "dataFailed", payload: err.message });
      }
    }

    getQuestions();
  }, []);

  return (
    <QuizContext.Provider
      value={{
        status,
        questions,
        numQuestions,
        index,
        answer,
        points,
        totalPoints,
        highScore,
        secondsRemaining,

        dispatch,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

function useQuiz() {
  const context = useContext(QuizContext);

  if (context === undefined)
    throw new Error("QuizContext is used outside the QuizProvider!");

  return context;
}

export { QuizProvider, useQuiz };
