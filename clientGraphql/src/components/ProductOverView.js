import Axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createCartItem } from "../features/cartItemsSlice";
import {
  addProductToCart,
  addQtyToCart,
  getAllCartProducts,
  getFinalCartProducts,
} from "../features/cartSlice";
import cookie from "react-cookies";
import { Navigate } from "react-router-dom";
import userSlice, { selectUser } from "../features/userSlice";
import Hoverbar from "./Hoverbar";
import Navbar from "./Navbar";
import "./ProductOverView.css";
import { getCartItems } from "../features/cartItemsSlice";
import { Link } from "react-router-dom";
import { ADD_PRODUCT_TO_CART } from "../GraphQL/Mutation";
import { useMutation } from "@apollo/client";

function ProductOverView() {
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const productView = useSelector(getAllCartProducts);
  // const cartProduct = useSelector(getAllCartProducts);
  // const cartItems = useSelector(getCartItems);
  const [addToCartMessage, setAddToCart] = useState("");

  const [addProductToCart] = useMutation(ADD_PRODUCT_TO_CART, {
    onCompleted(res) {
      console.log(res);
    },
    onError(e) {
      console.log(e.message);
    },
  });

  const addToCartHandler = (itemId) => {
    console.log("add to cart handler");

    addProductToCart({
      variables: {
        userId: user.id,
        itemId: itemId,
        qty: Number(qty),
      },
    })
      .then((res) => {
        console.log(res);
        if (res.data !== undefined) {
          console.log(res.data);
          console.log("Item added to card");
          // window.location.pathname = "/home";
        }
      })
      .catch((error) => {
        console.log(error);
      });

    // Axios.post("http://localhost:4000/api/products/addToCart", {
    //   itemId: itemId,
    //   userId: user.id,
    //   qty: Number(qty),
    // })
    //   .then((response) => {
    //     console.log(response);
    //     if (response.data.success) {
    //       console.log("Items added to cart successfully");
    //       // window.location.pathname = "/home";
    //     }
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    setAddToCart("Item added to your cart successfully");
  };

  let redirectVar = null;
  if (user === null || !cookie.load("user")) {
    console.log("cookie is found " + user);
    redirectVar = <Navigate to="/home" />;
  }
  return (
    <>
      {redirectVar}
      <Navbar />
      <Hoverbar />
      <hr></hr>

      <h3
        style={{
          textAlign: "center",
          fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
        }}
      >
        {addToCartMessage}
      </h3>

      <div className="productscreen">
        <div className="productscreen__left">
          <div className="left__image">
            <img
              src={productView.itemImage}
              alt={productView.itemName}
              //   height={300}
              width={450}
            />
          </div>

          <div className="left__info">
            <p className="left__name">{productView.itemName}</p>
            <p>Price: ${productView.itemPrice}</p>
            <p>Description: {productView.itemDescription}</p>
            <p>
              <Link
                to={`/shopHomeForOthers/${productView.userId}/${productView._id}`}
              >
                Shop Home
              </Link>
            </p>
          </div>
        </div>
        <div className="productscreen__right">
          <div className="right__info">
            <p>
              Price:
              <span>${productView.itemPrice}</span>
            </p>
            <p>
              Status:
              <span>
                {productView.itemCount > 0 ? "In Stock" : "Out of Stock"}
              </span>
            </p>
            <p>
              Qty
              <select value={qty} onChange={(e) => setQty(e.target.value)}>
                <option key={0} value={0}>
                  0
                </option>
                {[...Array(productView.itemCount).keys()].map((x) => (
                  <option key={x + 1} value={x + 1}>
                    {x + 1}
                  </option>
                ))}
              </select>
            </p>
            <p>
              {productView.itemCount !== 0 ? (
                <button
                  style={{
                    backgroundColor: "rgb(243, 234, 223)",
                    color: "black",
                  }}
                  type="button"
                  onClick={() => addToCartHandler(productView._id)}
                >
                  Add To Cart
                </button>
              ) : (
                <div style={{ width: "150%" }}>
                  Sorry, item is out of stock!
                </div>
              )}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductOverView;
