export default function App() {
  return (
    <div>
      <main>
        <Section0 />
        <Section1 />
        <img src="dice-5.png" alt="Playing dice" className="dice" />
        <Button classs="btn btn--new">🔄 New game</Button>
        <Button classs="btn btn--roll">🎲 Roll dice</Button>
        <Button classs="btn btn--hold">📥 Hold</Button>
      </main>
    </div>
  );
}

function Section0() {
  return (
    <section className="player player--0 player--active">
      <h2 className="name">Player 1</h2>
      <p className="score">0</p>
      <div className="current">
        <p className="current-label">Current</p>
        <p className="current-score">0</p>
      </div>
    </section>
  );
}

function Section1() {
  return (
    <section className="player player--1">
      <h2 className="name">Player 2</h2>
      <p className="score">0</p>
      <div className="current">
        <p className="current-label">Current</p>
        <p className="current-score">0</p>
      </div>
    </section>
  );
}

function Button({ children, classs }) {
  return <button className={classs}>{children}</button>;
}
