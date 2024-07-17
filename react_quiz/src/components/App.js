import { useQuiz } from "../contexts/QuizContext";
import Error from "./Error";
import Header from "./Header";
import Loader from "./Loader";
import Main from "./Main";

export default function App() {
  const { status } = useQuiz();

  return (
    <div className="app">
      <Header />
      <Main />
      {status === "loading" && <Loader />}
      {status === "error" && <Error />}
    </div>
  );
}
