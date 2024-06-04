import { useState } from "react";
import "./index.css";

export default function App() {
  return (
    <div className="App">
      <h1>Hello World !!</h1>
      <h2>🌄 Today's thought 🏜️</h2>
      <ThoughtBox />
    </div>
  );
}

function ThoughtBox() {
  const [advice, steAdvice] = useState("");
  const [count, setCount] = useState(0);

  const handleAdvice = async function () {
    const res = await fetch("https://api.adviceslip.com/advice");
    const data = await res.json();
    //console.log(data);
    steAdvice(data.slip.advice);
    setCount((c) => c + 1);
  };

  /* if (count === 0) {
    handleAdvice();
  }*/

  return (
    <div>
      <p>{advice}</p>
      <div>
        <button onClick={handleAdvice} style={{ cursor: "pointer" }}>
          Get Advice
        </button>
      </div>
      <div>
        <p>
          You have already read{" "}
          <span>
            <b>{count}</b>
          </span>{" "}
          {count <= 1 ? "piece" : "pieces"} of advice
        </p>
      </div>
    </div>
  );
}
