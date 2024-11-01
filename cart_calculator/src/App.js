import React, { useEffect, useState } from "react";

function App() {
  const [products, setProducts] = useState([]);
  const [cartProduct, setCartProduct] = useState([]);

  const totalCartItems = cartProduct.length;
  const totalCartAmount = cartProduct.reduce((acc, cur) => acc + cur.price, 0);

  function handleAddCartProducts(itemObj) {
    setCartProduct((cartProduct) => [...cartProduct, itemObj]);
  }

  function handleRemoveCartProduct(itemObj) {
    setCartProduct((cartProduct) =>
      cartProduct.filter((item) => item.id !== itemObj.id)
    );
  }

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
          <Item
            key={item.id}
            itemObj={item}
            onAddCartItem={handleAddCartProducts}
            onRemoveCartItem={handleRemoveCartProduct}
            cartProduct={cartProduct}
          />
        ))}
      </div>
      <div className="cartItem-box">
        <h2 className="cart-items">Cart Items</h2>
        <h3 className="cart-item-qty">Total Quantity : {totalCartItems}</h3>
        <h3 className="cart-item-price">Total Price : {totalCartAmount}</h3>
        {cartProduct.map((item) => (
          <div className="cart-box" key={item.id}>
            <img alt="title" className="cart-item-img" src={item.image}></img>
            <div className="cart-item-box">
              <p className="item-name">{item.title}</p>
              <p className="item-price">{item.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Item({ itemObj, onAddCartItem, onRemoveCartItem, cartProduct }) {
  return (
    <div className="item-box">
      <img alt={itemObj.title} src={itemObj.image} className="item-img" />
      <div className="item-detail">
        <span>{itemObj.title}</span>
        <span>
          <b>{itemObj.price}</b>
        </span>
      </div>
      {cartProduct.some((item) => item.id === itemObj.id) ? (
        <button
          className="remove-btn btn"
          onClick={() => onRemoveCartItem(itemObj)}
        >
          Remove From Cart
        </button>
      ) : (
        <button className="add-btn btn" onClick={() => onAddCartItem(itemObj)}>
          Add To Cart
        </button>
      )}
    </div>
  );
}

export default App;

//'https://dummyjson.com/carts'
