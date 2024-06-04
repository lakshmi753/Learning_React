import { useState } from "react";
import "./index.css";

const faqs = [
  {
    title: "Where are these chairs assembled?",
    text: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusantium, quaerat temporibus quas dolore provident nisi ut aliquid ratione beatae sequi aspernatur veniam repellendus.",
  },
  {
    title: "How long do I have to return my chair?",
    text: "Pariatur recusandae dignissimos fuga voluptas unde optio nesciunt commodi beatae, explicabo natus.",
  },
  {
    title: "Do you ship to countries outside the EU?",
    text: "Excepturi velit laborum, perspiciatis nemo perferendis reiciendis aliquam possimus dolor sed! Dolore laborum ducimus veritatis facere molestias!",
  },
];

export default function App() {
  return (
    <div>
      <Accordion />
    </div>
  );
}

function Accordion() {
  const [isSelected, setIsSelected] = useState(null);

  function handleSelected(num) {
    setIsSelected(isSelected !== num ? num : null);
  }
  return (
    <div className="accordion">
      {faqs.map((el, i) => (
        <AccordianItems
          key={el.title}
          title={el.title}
          num={i}
          isSelected={isSelected}
          onIsSelected={handleSelected}
        >
          {el.text}
        </AccordianItems>
      ))}
    </div>
  );
}

function AccordianItems({ title, num, children, isSelected, onIsSelected }) {
  const isOpen = isSelected === num;
  return (
    <div
      className={`item ${isOpen ? "open" : ""}`}
      onClick={() => onIsSelected(num)}
    >
      <p>{num <= 9 ? `0${num + 1}` : num + 1}</p>
      <p className="title">{title}</p>
      <p className="icon">{isOpen ? "-" : "+"}</p>
      {isOpen && <div className="content-box">{children}</div>}
    </div>
  );
}
