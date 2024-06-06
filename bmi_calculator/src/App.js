import React, { useState } from "react";

export default function App() {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [bmi, setBmi] = useState("");

  function handleHeight(e) {
    setHeight(Number(e.target.value));
  }

  function handleWeight(e) {
    setWeight(Number(e.target.value));
  }

  function claculateBMI(e) {
    e.preventDefault();

    const heightInM = height / 100;
    setBmi(Math.floor(weight / (heightInM * heightInM)));
    //console.log(bmi);
  }

  function resetAll() {
    setHeight("");
    setWeight("");
    setBmi("");
  }
  return (
    <div className="app">
      <div className="container">
        <Header />
        <BmiForm
          height={height}
          weight={weight}
          onHeight={handleHeight}
          onWeight={handleWeight}
          onCalculate={claculateBMI}
        />
        {/*<Buttons onClick={claculateBMI}>Calculate</Buttons>*/}

        <Buttons onClick={resetAll}>Reset</Buttons>

        <div className="box">
          <Result BMI={bmi} />
        </div>
      </div>
    </div>
  );
}

function Header() {
  return (
    <header>
      <h1>BMI Calculator</h1>
    </header>
  );
}

function BmiForm({ height, weight, onHeight, onWeight, onCalculate }) {
  return (
    <form onSubmit={onCalculate}>
      <div className="box">
        <label>Height :</label>
        <input
          type="number"
          placeholder="Height (in cm)"
          value={height}
          onChange={onHeight}
        />
      </div>

      <div className="box">
        <label>Weight :</label>
        <input
          type="number"
          placeholder="Weight (in kg)"
          value={weight}
          onChange={onWeight}
        />
      </div>
      <Buttons>Calculate</Buttons>
    </form>
  );
}

function Buttons({ children, onClick }) {
  return (
    <div className="box">
      <button className="btn" onClick={onClick}>
        {children}
      </button>
    </div>
  );
}

function Result({ BMI }) {
  let y;

  if (BMI) {
    if (BMI < 18) {
      y = "UnderWeight";
    } else if (BMI >= 18 && BMI <= 25) {
      y = "Normal";
    } else if (BMI > 25 && BMI <= 30) {
      y = "OverWeight";
    } else if (BMI > 30) {
      y = "Obese";
    }
  }

  return (
    <div>
      <p>Your BMI is : {BMI}</p>
      <p>Your weight category is : {y}</p>
    </div>
  );
}
