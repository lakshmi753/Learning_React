function Progress() {
  return (
    <header className="progress">
      <progress max="maxvalue" vlaue="value" />
      <p>
        Question <strong>X</strong> / TotalQuestions
      </p>
      <p>
        <strong>Points</strong> / TotalPoints
      </p>
    </header>
  );
}

export default Progress;
