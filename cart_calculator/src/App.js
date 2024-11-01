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
      <div className="cartItem-box">
        <h2 className="cart-items">Cart Items</h2>
        <h3 className="cart-item-qty">Total Quantity : X</h3>
        <h3 className="cart-item-price">Total Price : X</h3>
        <div className="cart-box">
          <img alt="title" className="cart-item-img"></img>
          <div className="cart-item-box">
            <p className="item-name">Title</p>
            <p className="item-price">Price</p>
          </div>
        </div>
      </div>
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
      <button className="add-btn btn">Add To Cart</button>
      <button className="remove-btn btn">Remove from cart</button>
    </div>
  );
}

export default App;

//'https://dummyjson.com/carts'
