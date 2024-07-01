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

  return (
    <div className="app">
      <div className="sidebar">
        <FriendList friends={friends} />
        <Button>Add Friend</Button>
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

function Button({ children }) {
  return <button className="button">{children}</button>;
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
