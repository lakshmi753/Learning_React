import React, { useEffect, useState } from "react";

function App() {
  const [product, setProduct] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(function () {
    async function getProducts() {
      setIsLoading(true);
      try {
        const res = await fetch(`https://picsum.photos/v2/list?page=2&limit=5`);

        if (!res.ok) {
          throw new Error("Something went wrong! Please try again.");
        }

        const data = await res.json();

        if (!data) {
          throw new Error("Products not Available!!");
        }

        console.log(data);
        setProduct(data);
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
        <>
          <div className="item-box">
            {product.map((item) => (
              <Item key={item.id} itemObj={item} />
            ))}
          </div>
          <Pagination />
        </>
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
    <img
      alt={itemObj.author}
      src={itemObj.download_url}
      className="product-img"
    />
  );
}

function Pagination() {
  return (
    <div className="pagination-box">
      <button>⏮️ Prev</button>
      <button>Next ⏭️</button>
    </div>
  );
}

export default App;

//"https://picsum.photos/v2/list?page=1&limit=5";
