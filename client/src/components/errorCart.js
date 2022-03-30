import "./CartItem.css";
import React from "react";
import { Link } from "react-router-dom";

const CartItem = ({ item, qtyChangeHandler, qty, removeHandler }) => {
  return (
    <div className="cartitem">
      <div className="cartitem__image">
        <img
          src={"/Images/" + item.itemImage}
          // src={require("../Images/" + item.itemImage)}
          alt={item.name}
          width={150}
          height={100}
        />
      </div>
      <Link to={`/product/${item.product}`} className="cartItem__name">
        <p>{item.name}</p>
      </Link>
      <p className="cartitem__price">${item.itemPrice}</p>
      <select
        value={qty}
        onChange={(e) => qtyChangeHandler(item.itemId, e.target.value)}
        className="cartItem__select"
      >
        {[...Array(item.itemCount).keys()].map((x) => (
          <option key={x + 1} value={x + 1}>
            {x + 1}
          </option>
        ))}
      </select>
      <button
        className="cartItem__deleteBtn"
        onClick={() => removeHandler(item.product)}
      >
        <i className="fas fa-trash"></i>
      </button>
    </div>
  );
};

export default CartItem;
