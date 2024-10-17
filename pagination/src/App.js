import React, { useEffect, useState } from "react";

function App() {
  const [product, setProduct] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(function () {
    async function getProducts() {
      setIsLoading(true);
      try {
        const res = await fetch(`https://dummyjson.com/products`);

        if (!res.ok) {
          throw new Error("Something went wrong! Please try again.");
        }

        const data = await res.json();

        if (!data) {
          throw new Error("Products not Available!!");
        }

        console.log(data.products);
        setProduct(data.products);
      } catch (error) {
        //console.error(error.message);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    }

    getProducts();
  }, []);

  return (
    <div className="product-container">
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Error error={error} />
      ) : (
        product.map((item) => <Item key={item.id} itemObj={item} />)
      )}
    </div>
  );
}

function Loader() {
  return (
    <div>
      <p>Loading...</p>
    </div>
  );
}

function Error({ error }) {
  return (
    <div>
      <p>Error : {error}</p>
    </div>
  );
}

function Item({ itemObj }) {
  return (
    <div className="item-box">
      <img alt={itemObj.title} src={itemObj.images} className="product-img" />
      <p className="product-title">{itemObj.title}</p>
    </div>
  );
}

function Pagination() {
  return (
    <div>
      <button>⏮️ Prev</button>
      <button>Next ⏭️</button>
    </div>
  );
}

export default App;
