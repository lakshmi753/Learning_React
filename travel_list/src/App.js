export default function App() {
  return (
    <div className="app">
      <Logo />
      <Form />
      <PackingList />
      <Stats />
    </div>
  );
}

function Logo() {
  return <h1>🏕️🗼Far Away ⛱️⛺</h1>;
}

function Form() {
  return (
    <form className="add-form">
      <h3>What do you need for your 🤩 trip ?</h3>
      <select>
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option key={num} value={num}>
            {num}
          </option>
        ))}
      </select>
      <input type="text" placeholder="Enter Items..." />
      <button>Add</button>
    </form>
  );
}

function PackingList() {
  return (
    <div className="list">
      <ul></ul>
      <div className="actions">
        <select>
          <option value="input">Sort by input</option>
          <option value="discription">Sort by discription</option>
          <option value="packed">Sort by packed status</option>
        </select>
        <button>Clear List</button>
      </div>
    </div>
  );
}

function Stats() {
  return (
    <footer className="stats">
      <em>
        🎒 You have X items in your list and you already have packed Y (y%) 🙂
      </em>
    </footer>
  );
}
