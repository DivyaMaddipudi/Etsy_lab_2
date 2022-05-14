import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Hoverbar from "./Hoverbar";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../features/productsSlice";
import { selectUser } from "../features/userSlice";
import cookie from "react-cookies";
import { Link, Navigate } from "react-router-dom";
import { productOverview } from "../features/cartSlice";
import ProductOverView from "./ProductOverView";
import styled from "styled-components";

function searchResultItems() {
  const products = useSelector(getProducts);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const [sortBy, setSortBy] = useState();
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(100);
  const [filterByValue, setFilterByValue] = useState(false);
  const [checked, setChecked] = useState(true);
  const [product, setProduct] = useState([]);
  const [productDup, setProductDup] = useState([]);

  useEffect(() => {
    setProduct(products);
    setProductDup(products);
  }, []);

  let filteredProducts = null;
  const filterByPrice = () => {
    if (minPrice !== 0 && maxPrice !== 100) {
      // setFilterByValue(true);
      filteredProducts = product.filter((prod) => {
        return prod.itemPrice > minPrice && prod.itemPrice < maxPrice;
      });
      setProduct(filteredProducts);
    } else {
      setProduct(products);
    }
  };

  if (sortBy === "itemPrice") {
    product.sort(function (a, b) {
      return a.itemPrice - b.itemPrice;
    });
  } else if (sortBy === "itemCount") {
    product.sort(function (a, b) {
      return a.itemCount - b.itemCount;
    });
  }

  const handleStockCheckbox = () => {
    console.log(checked);
    if (checked) {
      filteredProducts = product.filter((prod) => {
        return prod.itemCount > 0;
      });

      setProduct(filteredProducts);
    } else {
      console.log("In out of stock false " + productDup);
      setProduct(productDup);
    }
  };

  const handleOpenImage = (pro) => {
    console.log(pro);
    console.log(pro._id);
    console.log(pro.itemImage);
    dispatch(productOverview(pro));
    // console.log(pro.itemCount);
    // setProductOverview(true);
    window.location.pathname = "/productOverview";
  };

  let searchPage = null;
  if (user && cookie.load("user") && product !== null) {
    searchPage = product.map((pro) => {
      return (
        <div className="col-md-4 mb-4">
          <div className="card">
            <img src={pro.itemImage} className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">{pro.itemName}</h5>
              <p>Price: ${pro.itemPrice}</p>

              <ProductContainer>
                <button
                  className="button button3"
                  onClick={() => {
                    handleOpenImage(pro);
                  }}
                >
                  View Overview
                </button>
              </ProductContainer>
            </div>
          </div>
        </div>
      );
    });
  } else {
    // dispatch(removeProductsState());
    searchPage = (
      <div>
        <h4> No Items</h4>
      </div>
    );
  }

  let redirectVar = null;
  if (!cookie.load("user")) {
    redirectVar = <Navigate to="/home" />;
  }
  return (
    <>
      {redirectVar}
      <Navbar />
      <Hoverbar />
      <hr></hr>
      <div className="container-fluid mx-2">
        <div className="row mt-5 mx-2">
          <div style={{ width: "20%", height: "50px" }}>
            <div>
              <div class="card-body">
                <label for="min-price" class="form-label">
                  Min price:
                </label>
                <span id="min-price-txt">${minPrice}</span>
                <input
                  type="range"
                  class="form-range"
                  min="0"
                  max="99"
                  id="min-price"
                  step="1"
                  defaultValue="0"
                  onChange={(event) => {
                    setMinPrice(event.target.value);
                  }}
                />
                <label for="max-price" class="form-label">
                  Max price:
                </label>
                <span id="max-price-txt">${maxPrice}</span>
                <input
                  type="range"
                  class="form-range"
                  min="1"
                  max="100"
                  id="max-price"
                  step="1"
                  defaultValue="100"
                  onChange={(event) => {
                    setMaxPrice(event.target.value);
                  }}
                />
                <button
                  style={{
                    border: "1px solid black",
                    borderRadius: "4px",
                    padding: "4px",
                  }}
                  onClick={filterByPrice}
                >
                  Apply filter
                </button>
              </div>
            </div>

            <input
              type="checkbox"
              id="count"
              name="count"
              value="count"
              onChange={() => {
                setChecked(!checked);
              }}
              onClick={handleStockCheckbox}
            />
            <label for="count" style={{ marginLeft: "4px" }}>
              Out of stock
            </label>

            <div>
              Sort by: &nbsp;
              <select
                onChange={(event) => {
                  setSortBy(event.target.value);
                }}
                style={{
                  height: "40px",
                  border: "1px solid black",
                  borderRadius: "4px",
                  border: "none",
                }}
              >
                <option value="itemPrice">Relavency</option>
                <option value="itemPrice">Price</option>
                <option value="itemCount">Quantity</option>
                <option value="salesCount">Sales Count</option>
              </select>
            </div>
          </div>
          <div className="col-md-9">
            <div className="row">{searchPage}</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default searchResultItems;
const ProductContainer = styled.footer`
  .button {
    background-color: orange; /* Green */
    border: none;
    color: white;
    padding: 8px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 4px 2px;
    cursor: pointer;
  }
  .button3 {
    border-radius: 8px;
  }
`;
