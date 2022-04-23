import Axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addProductToCart, getFinalCartProducts } from "../features/cartSlice";
import { selectUser } from "../features/userSlice";
import "./Cart.css";
import CartItem from "./errorCart";

function Cart() {
  const dispatch = useDispatch();
  // const cart = useSelector(getFinalCartProducts);
  // const { cartItems } = cart;
  const finalCartProd = useSelector(getFinalCartProducts);
  const user = useSelector(selectUser);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    getCartItems();
  }, []);

  const getCartItems = () => {
    Axios.get("http://localhost:4000/getFinalCartProducts/" + user.id).then(
      (response) => {
        console.log(response);
        setCartItems([...cartItems, ...response.data.result]);
      }
    );
  };

  const qtyChangeHandler = (itemId, qty) => {
    // dispatch(addProductToCart(id, qty));
    console.log(itemId);
    Axios.put("http://localhost:4000/updateCartQuantity/" + user.id, {
      itemId: itemId,
      qty: qty,
    }).then((response) => {
      if (response.data.success === true) {
        console.log("Cart quantity updated");
      }
    });
  };

  // const removeFromCartHandler = (id) => {
  //   // dispatch(removeCartProduct(id));
  // };

  return (
    <div className="cartscreen">
      <div className="cartscreen__left">
        <h2>Shopping Cart</h2>
        {/* {finalCartProd.qty} */}

        {cartItems.length === 0 ? (
          <div>
            Your Cart Is Empty <Link to="/">Go Back</Link>
          </div>
        ) : (
          cartItems.map((item) => (
            <CartItem
              key={item.itemId}
              item={item}
              qty={finalCartProd.qty}
              qtyChangeHandler={() => {
                qtyChangeHandler(item.itemId, finalCartProd.qty);
              }}
              // removeHandler={removeFromCartHandler}
            />
          ))
        )}
      </div>

      <div className="cartscreen__right">
        <div className="cartscreen__info">
          {/* <p>Subtotal ({getCartCount}) items</p>
          <p>${getCartSubTotal}</p> */}
        </div>
        <div>
          <button>Proceed To Checkout</button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
