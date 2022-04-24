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
import userSlice, { selectUser } from "../features/userSlice";
import Hoverbar from "./Hoverbar";
import Navbar from "./Navbar";
import "./ProductOverView.css";
import { getCartItems } from "../features/cartItemsSlice";
import { useParams } from "react-router-dom";

function ProductView() {
  const { id } = useParams();

  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const productView = useSelector(getAllCartProducts);
  // const cartProduct = useSelector(getAllCartProducts);
  // const cartItems = useSelector(getCartItems);

  const addToCartHandler = () => {
    console.log("add to cart handler");

    // cartItems.map((ele) => console.log(ele));
    // if (cartItems) {
    dispatch(
      createCartItem({
        itemId: productView.itemId,
        itemName: productView.itemName,
        itemDescription: productView.itemDescription,
        itemImage: productView.itemImage,
        itemPrice: productView.itemPrice,
        itemCount: productView.itemCount,
        itemId: productView.itemId,
        qty: Number(qty),
      })
    );
    // }

    // if (cartItems) {
    //   console.log(cartItems.qty);
    //   console.log(qty);
    // } else {
    //   console.log("No cart items");
    // }
    // console.log(productView.length);
    // if (user !== null) {
    //   Axios.post("http://localhost:4000/addProductToCart/" + user.id, {
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
  return (
    <>
      <Navbar />
      <Hoverbar />
      <hr></hr>
      <h1>{id}</h1>

      {/* <div className="productscreen">
        <div className="productscreen__left">
          <div className="left__image">
            <img
              src={require("../Images/" + productView.itemImage)}
              alt={productView.itemName}
              //   height={300}
              width={450}
            />
          </div>

          <div className="left__info">
            <p className="left__name">{productView.itemName}</p>
            <p>Price: ${productView.itemPrice}</p>
            <p>Description: {productView.itemDescription}</p>
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
              <button type="button" onClick={addToCartHandler}>
                Add To Cart
              </button>
            </p>
          </div>
        </div>
      </div> */}
    </>
  );
}

export default ProductView;
