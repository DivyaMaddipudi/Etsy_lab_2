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

function ProductOverView() {
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const productView = useSelector(getAllCartProducts);
  // const cartProduct = useSelector(getAllCartProducts);
  // const cartItems = useSelector(getCartItems);
  const [addToCartMessage, setAddToCart] = useState("");

  const addToCartHandler = (itemId) => {
    console.log("add to cart handler");
    Axios.post("http://54.174.244.242:4001/api/products/addToCart", {
      itemId: itemId,
      userId: user.id,
      qty: Number(qty),
    })
      .then((response) => {
        console.log(response);
        if (response.data.success) {
          console.log("Items added to cart successfully");
          // window.location.pathname = "/home";
        }
      })
      .catch((err) => {
        console.log(err);
      });
    setAddToCart("Item added to your cart successfully");
    // cartItems.map((ele) => console.log(ele));
    // if (cartItems) {

    // dispatch(
    //   createCartItem({
    //     itemId: productView._id,
    //     itemName: productView.itemName,
    //     itemDescription: productView.itemDescription,
    //     itemImage: productView.itemImage,
    //     itemPrice: productView.itemPrice,
    //     itemCount: productView.itemCount,
    //     // itemId: productView._id,
    //     qty: Number(qty),
    //   })
    // );
    // }

    // if (cartItems) {
    //   console.log(cartItems.qty);
    //   console.log(qty);
    // } else {
    //   console.log("No cart items");
    // }
    // console.log(productView.length);
    // if (user !== null) {
    //   Axios.post("http://54.174.244.242:4000/addProductToCart/" + user.id, {
    // itemId: cartProduct.itemId,
    // itemName: cartProduct.itemName,
    // itemDescription: cartProduct.itemDescription,
    // itemImage: cartProduct.itemImage,
    // itemPrice: cartProduct.itemPrice,
    // itemId: cartProduct.itemId,
    // qty: qty,
    //   }).then((response) => {
    //     if (response.data.success === true) {
    //       console.log("-------------responce data ------", response.data);
    //     }
    //   });
    //   console.log("Add to cart clicked");
    // }
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
