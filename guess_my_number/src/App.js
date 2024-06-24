export default function App() {
  return (
    <div>
      <Header />
      <main>
        <LeftSection />
        <RightSection />
      </main>
    </div>
  );
}

function Header() {
  return (
    <header>
      <h1>Guess My Number!</h1>
      <p className="between">(Between 1 and 20)</p>
      <button className="btn again">Again!</button>
      <div className="number">?</div>
    </header>
  );
}

function LeftSection() {
  return (
    <section className="left">
      <input type="number" className="guess" />
      <button className="btn check">Check!</button>
    </section>
  );
}

function RightSection() {
  return (
    <section className="right">
      <p className="message">Start Guessing...</p>
      <p className="label-score">💯 Score : 20</p>
      <p className="label-highscore">🥇 Highscore : 0</p>
    </section>
  );
}
