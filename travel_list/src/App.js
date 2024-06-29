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

  function handleClearingList() {
    if (itemsArr.length === 0) return;

    const confirmed = window.confirm(
      "Do you really want to clear your packing list 😯"
    );

    if (confirmed) {
      setItemsArr([]);
    }
  }

  return (
    <div className="app">
      <Logo />
      <Form onSetNewItem={handleSetnewItem} />
      <PackingList
        itemsArr={itemsArr}
        onTogglePacked={handleTogglePacked}
        onRemoveItem={handleRemoveItem}
        onClearingList={handleClearingList}
      />
      <Stats itemsArr={itemsArr} />
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

function PackingList({
  itemsArr,
  onTogglePacked,
  onRemoveItem,
  onClearingList,
}) {
  const [sortBy, setSortBy] = useState("input");
  let sortedArr;

  if (sortBy === "input") {
    sortedArr = itemsArr;
  }

  if (sortBy === "discription") {
    sortedArr = itemsArr
      .slice()
      .sort((a, b) => a.discription.localeCompare(b.discription));
  }

  if (sortBy === "packed") {
    sortedArr = itemsArr
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));
  }

  return (
    <div className="list">
      <ul>
        {sortedArr.map((item) => (
          <Item
            itemObj={item}
            key={item.id}
            onTogglePacked={onTogglePacked}
            onRemoveItem={onRemoveItem}
          />
        ))}
      </ul>
      <div className="actions">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">Sort by input</option>
          <option value="discription">Sort by discription</option>
          <option value="packed">Sort by packed status</option>
        </select>
        <button onClick={onClearingList}>Clear List</button>
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
        onChange={() => onTogglePacked(itemObj.id)}
      />
      <span style={itemObj.packed ? { textDecoration: "line-through" } : {}}>
        {itemObj.quantity} {itemObj.discription}
      </span>
      <button onClick={() => onRemoveItem(itemObj.id)}>❌</button>
    </li>
  );
}

function Stats({ itemsArr }) {
  if (itemsArr.length === 0) {
    return (
      <footer className="stats">
        <em>Start adding some items to your packing list 😉</em>
      </footer>
    );
  }

  const totalItems = itemsArr.length;
  const packedItems = itemsArr.filter((items) => items.packed).length;
  const percentage = Math.round((packedItems / totalItems) * 100);

  return (
    <footer className="stats">
      {percentage === 100 ? (
        <em>👍 You have packed everything, ready to go 🛩️</em>
      ) : (
        <em>
          🎒 You have {totalItems} items in your list and you already have
          packed {packedItems} items ({percentage}%) 🙂
        </em>
      )}
    </footer>
  );
}
