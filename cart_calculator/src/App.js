import React, { useEffect, useState } from "react";

function App() {
  const [products, setProducts] = useState([]);

  useEffect(function () {
    async function getProducts() {
      try {
        const res = await fetch("https://fakestoreapi.com/products");

        const data = await res.json();

        if (!data) {
          throw new Error("Something went wrong! Please try again!");
        }

        //console.log(data);
        setProducts(data);
      } catch (error) {
        console.error(error.message);
      }
    }

    getProducts();
  }, []);

  return (
    <div className="container">
      <div className="menu-box">
        {products.map((item) => (
          <Item key={item.id} itemObj={item} />
        ))}
      </div>
      <div className="cartItem-box"></div>
    </div>
  );
}

function Item({ itemObj }) {
  return (
    <div className="item-box">
      <img alt={itemObj.title} src={itemObj.image} className="item-img" />
      <div className="item-detail">
        <span>{itemObj.title}</span>
        <span>
          <b>{itemObj.price}</b>
        </span>
      </div>
    </div>
  );
}

export default App;

//'https://dummyjson.com/carts'
