import React, { useEffect, useState } from "react";

function App() {
  const [product, setProduct] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [pageNo, setPageNo] = useState(3);

  const totalItems = 30;
  const itemsPerPage = 5;
  const totalPages = totalItems / itemsPerPage;

  const prevTwoArr = Array.from({ length: 2 }, (_, i) => pageNo - i - 1)
    .filter((el) => el >= 1)
    .reverse();
  //console.log(prevTwoArr);

  const nextThreeArr = Array.from({ length: 3 }, (_, i) => pageNo + i).filter(
    (el) => el <= totalPages
  );
  //console.log(nextThreeArr);

  const paginationBtnArr = [...prevTwoArr, ...nextThreeArr];

  useEffect(
    function () {
      async function getProducts() {
        setIsLoading(true);
        try {
          const res = await fetch(
            `https://picsum.photos/v2/list?page=${pageNo}&limit=5`
          );

          if (!res.ok) {
            throw new Error("Something went wrong! Please try again.");
          }

          const data = await res.json();

          if (!data) {
            throw new Error("Products not Available!!");
          }

          //console.log(data);
          setProduct(data);
        } catch (error) {
          //console.error(error.message);
          setError(error.message);
        } finally {
          setIsLoading(false);
        }
      }

      getProducts();
    },
    [pageNo]
  );

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
          <Pagination
            pageNo={pageNo}
            setPageNo={setPageNo}
            totalPages={totalPages}
            paginationBtnArr={paginationBtnArr}
          />
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

function Pagination({ pageNo, setPageNo, totalPages, paginationBtnArr }) {
  function handlePrevBtn() {
    if (pageNo === 1) return;

    setPageNo((pageNo) => pageNo - 1);
  }

  function handleNextBtn() {
    if (pageNo === totalPages) return;

    setPageNo((pageNo) => pageNo + 1);
  }

  return (
    <div className="pagination-box">
      {pageNo > 1 && (
        <button className="btn" onClick={handlePrevBtn}>
          {"<"}
        </button>
      )}
      {paginationBtnArr.map((el, i) => (
        <button className={pageNo === el ? "btn active" : "btn"} key={el}>
          {el}
        </button>
      ))}
      {pageNo < totalPages && (
        <button className="btn" onClick={handleNextBtn}>
          {">"}
        </button>
      )}
    </div>
  );
}

export default App;

//"https://picsum.photos/v2/list?page=1&limit=5";
