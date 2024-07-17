import { createContext, useContext, useReducer } from "react";

const QuizContext = createContext();

const initialState = {
  status: "loading",
  questions: [],
  index: 0,
  answer: null,
  points: 0,
  highScore: 0,
};

function reducer({ state, action }) {
  switch (action.type) {
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
  const [{ status, questions, index, answer, points, highScore }, dispatch] =
    useReducer(reducer, initialState);

  return <QuizContext.Provider value={{}}>{children}</QuizContext.Provider>;
}

function useQuiz() {
  const context = useContext(QuizContext);

  if (context === undefined)
    throw new Error("QuizContext is used outside the QuizProvider!");

  return context;
}

export { QuizProvider, useQuiz };
