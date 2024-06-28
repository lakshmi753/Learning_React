import { useState } from "react";

export default function App() {
  const [itemsArr, setItemsArr] = useState([]);

  function handleSetnewItem(newItem) {
    setItemsArr((items) => [...items, newItem]);
  }

  function handleTogglePacked(id) {
    setItemsArr((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  function handleRemoveItem(id) {
    setItemsArr((items) => items.filter((item) => item.id !== id));
  }

  return (
    <div className="app">
      <Logo />
      <Form onSetNewItem={handleSetnewItem} />
      <PackingList
        itemsArr={itemsArr}
        onTogglePacked={handleTogglePacked}
        onRemoveItem={handleRemoveItem}
      />
      <Stats />
    </div>
  );
}

function Logo() {
  return <h1>🏕️🗼Far Away ⛱️⛺</h1>;
}

function Form({ onSetNewItem }) {
  const [discription, setDiscription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmitNewItem(e) {
    e.preventDefault();

    const newItem = {
      discription,
      quantity,
      packed: false,
      id: Date.now(),
    };

    onSetNewItem(newItem);

    setDiscription("");
    setQuantity(1);
  }

  return (
    <form className="add-form" onSubmit={handleSubmitNewItem}>
      <h3>What do you need for your 🤩 trip ?</h3>
      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option key={num} value={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Enter Items..."
        value={discription}
        onChange={(e) => setDiscription(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
}

function PackingList({ itemsArr, onTogglePacked, onRemoveItem }) {
  return (
    <div className="list">
      <ul>
        {itemsArr.map((item) => (
          <Item
            itemObj={item}
            key={item.id}
            onTogglePacked={onTogglePacked}
            onRemoveItem={onRemoveItem}
          />
        ))}
      </ul>
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

function Item({ itemObj, onTogglePacked, onRemoveItem }) {
  return (
    <li>
      <input
        type="checkbox"
        value={itemObj.packed}
        onChange={onTogglePacked(itemObj.id)}
      />
      <span style={itemObj.packed ? { textDecoration: "line-through" } : {}}>
        {itemObj.quantity} {itemObj.discription}
      </span>
      <button onClick={onRemoveItem(itemObj.id)}>❌</button>
    </li>
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
