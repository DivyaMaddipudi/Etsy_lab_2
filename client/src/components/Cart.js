import React, { useState, useEffect } from "react";
import "./Cart.css";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import CartItem from "./CartItem";
import Axios from "axios";

// Components
// import CartItem from "../components/CartItem";

// Actions
// import { addToCart, removeFromCart } from "../redux/actions/cartActions";
import {
  clearCart,
  createCartItem,
  createFinalCart,
  getCartItems,
} from "../features/cartItemsSlice";
import { selectUser } from "../features/userSlice";
import Navbar from "./Navbar";
import Hoverbar from "./Hoverbar";

const CartScreen = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [finalAmount, setFinalAmount] = useState();
  const [giftOption, setGiftOption] = useState(false);
  const [giftDescription, setGiftDescription] = useState("");
  const [saveGiftOptions, setSaveGiftOptions] = useState(false);

  // const cart = useSelector((state) => state.cart);
  // const { cartItems } = cart;
  // const finalCartProducts = useSelector(getCartItems);

  const [finalCartProducts, setFinalCartProducts] = useState([]);
  useEffect(() => {
    getCartList();
  }, []);

  const getCartList = () => {
    Axios.get(
      "http://localhost:4000/api/products/getCartItems/" + user.id
    ).then((response) => {
      console.log(response.data.result);
      if (response.data.success === true) {
        console.log("geting all fav products and storing in redux");
        console.log(response.data.result);
        dispatch(createCartItem(response.data.result));
        setFinalCartProducts([...finalCartProducts, ...response.data.result]);
      }
    });
  };

  const removeFromCartHandler = (id) => {
    // dispatch(removeFromCart(id));
  };

  const getCartCount = () => {
    if (finalCartProducts === null) {
      return 0;
    } else {
      return finalCartProducts.reduce((qty, item) => Number(item.qty) + qty, 0);
    }
  };

  const getCartSubTotal = () => {
    if (finalCartProducts === null) {
      return 0;
    } else {
      return finalCartProducts
        .reduce((price, item) => price + item.itemId.itemPrice * item.qty, 0)
        .toFixed(2);
    }

    // setFinalAmount(finalPrice);
    // return finalPrice;
  };

  const handleCheckOut = () => {
    // console.log(JSON.stringify(finalCartProducts));
    // localStorage.setItem("purchase", JSON.stringify(finalCartProducts));
    finalCartProducts.map((product) => {
      console.log(product);
      // Axios.post(`http://localhost:4000/editCount/${product.itemId}`, {
      //   quantity: product.qty,
      // })
      //   .then((response) => {
      //     console.log(response);
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //   });
    });

    // dispatch(clearCart());
    // window.location.pathname = "/purchase";
    // Axios.post("http://localhost:4000/addCartProduct/" + user.id, {
    //   items: JSON.stringify(finalCartProducts),
    //   orderId: Math.floor(Math.random() * 1000),
    //   price: getCartSubTotal(),
    // }).then((response) => {
    //   if (response.data.success === true) {
    //     console.log("item create in cart");
    //
    //   }
    // });
    // window.localStorage("purchase" + user.id, {});
  };

  return (
    <>
      <Navbar />
      <Hoverbar />
      <hr></hr>
      <div className="cartscreen">
        <div className="cartscreen__left">
          <h2>Shopping Cart</h2>

          {finalCartProducts.length === 0 ? (
            <div>
              Your Cart Is Empty <Link to="/">Go Back</Link>
            </div>
          ) : (
            finalCartProducts.map((item) => (
              <CartItem
                setGiftOption={setGiftOption}
                setGiftDescription={setGiftDescription}
                giftOption={giftOption}
                giftDescription={giftDescription}
                key={item}
                item={item}
                getCartSubTotal={getCartSubTotal}
                getCartCount={getCartCount}
                // qtyChangeHandler={qtyChangeHandler}
                // removeHandler={removeFromCartHandler}
              />
            ))
          )}
        </div>
        <div
          className="cartscreen__right"
          style={{ marginTop: "80px", width: "30%" }}
        >
          <div className="cartscreen__info">
            <p>Subtotal ({getCartCount()}) items</p>
            <p>${getCartSubTotal()}</p>
          </div>
          <div>
            <button
              onClick={() => {
                handleCheckOut();
                // item.itemId,
                // item.itemImage,
                // item.itemName,
                // item.itemPrice,
                // item.qty
              }}
            >
              Proceed To Checkout
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartScreen;
