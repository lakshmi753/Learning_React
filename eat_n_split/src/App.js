import { useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

export default function App() {
  const [friends, setFriends] = useState(initialFriends);
  const [isOpenFormAdd, setIsOpenFormAdd] = useState(false);

  function handleOpenFormAdd() {
    setIsOpenFormAdd((isOpen) => !isOpen);
  }

  function handleAddFrnd(newFrnd) {
    setFriends((frnd) => [...frnd, newFrnd]);
  }

  return (
    <div className="app">
      <div className="sidebar">
        <FriendList friends={friends} />
        {isOpenFormAdd && <FormAddFriend onAddFrnd={handleAddFrnd} />}
        <Button onBtnClick={handleOpenFormAdd}>
          {isOpenFormAdd ? "Close" : "Add Friend"}
        </Button>
      </div>
      <FormSplit />
    </div>
  );
}

function FriendList({ friends }) {
  return (
    <ul>
      {friends.map((frnd) => (
        <Friend frndObj={frnd} key={frnd.id} />
      ))}
    </ul>
  );
}

function Friend({ frndObj }) {
  return (
    <li>
      <img src={frndObj.image} alt={frndObj.name} />
      <h3>{frndObj.name}</h3>

      {frndObj.balance < 0 && (
        <p className="red">
          You owe to {frndObj.name} {Math.abs(frndObj.balance)}€
        </p>
      )}

      {frndObj.balance > 0 && (
        <p className="green">
          {frndObj.name} owe to you {frndObj.balance}€
        </p>
      )}

      {frndObj.balance === 0 && <p>You and {frndObj.name} are even</p>}

      <Button>Select</Button>
    </li>
  );
}

function FormAddFriend({ onAddFrnd }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48");

  function handleAddNewFrnd(e) {
    e.preventDefault();

    const id = crypto.randomUUID();

    const newFrnd = {
      id,
      name,
      image: `${image}?=${id}`,
      balance: 0,
    };

    onAddFrnd(newFrnd);

    setName("");
    setImage("https://i.pravatar.cc/48");
  }

  return (
    <form className="form-add-friend" onSubmit={handleAddNewFrnd}>
      <label>🙋 Frnd name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <label>👨‍💼 Image Url</label>
      <input
        type="text"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />

      <Button>Add</Button>
    </form>
  );
}

function Button({ children, onBtnClick }) {
  return (
    <button className="button" onClick={onBtnClick}>
      {children}
    </button>
  );
}

function FormSplit() {
  return (
    <form className="form-split-bill">
      <h2>Split the bill with X</h2>

      <label>💰 Bill value</label>
      <input type="number" />

      <label>🧍Your expense </label>
      <input type="number" />

      <label>🧑‍🤝‍🧑 X's expense</label>
      <input type="number" disabled />

      <label>🤑 Who is paying the bill ?</label>
      <select>
        <option value="user">You</option>
        <option value="friend">X</option>
      </select>

      <Button>Split Bill</Button>
    </form>
  );
}
