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
import { getAllCartProducts } from "../features/cartSlice";
import Navbar from "./Navbar";
import Hoverbar from "./Hoverbar";
import { useNavigate } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";
import { LOAD_CART_ITEMS } from "../GraphQL/Queries";
import {
  ADD_ITEM_TO_PURCHASES,
  DELETE_ITEM_FROM_CART,
  EDIT_ITEM_QTY,
  CLEAR_CART,
} from "../GraphQL/Mutation";
import { useMutation } from "@apollo/client";

const CartScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const productOverview = useSelector(getAllCartProducts);
  const [finalAmount, setFinalAmount] = useState();
  const [itemsQtyError, setItemsQtyError] = useState("");

  const { error, loading, data } = useQuery(LOAD_CART_ITEMS, {
    variables: { userId: user.id },
  });

  const [deleteItemFromCart] = useMutation(DELETE_ITEM_FROM_CART, {
    onCompleted(res) {
      console.log(res);
    },
    onError(e) {
      console.log(e.message);
    },
  });

  const [addItemsToPurchases] = useMutation(ADD_ITEM_TO_PURCHASES, {
    onCompleted(res) {
      console.log(res);
    },
    onError(e) {
      console.log(e.message);
    },
  });

  const [clearCartItems] = useMutation(CLEAR_CART, {
    onCompleted(res) {
      console.log(res);
    },
    onError(e) {
      console.log(e.message);
    },
  });

  const [editItemQty] = useMutation(EDIT_ITEM_QTY, {
    onCompleted(res) {
      console.log(res);
    },
    onError(e) {
      console.log(e.message);
    },
  });

  const checkOutItems = useSelector(getCartItems);

  const [finalCartProducts, setFinalCartProducts] = useState([]);

  useEffect(() => {
    getCartList();
  }, [data]);

  const getCartList = () => {
    console.log("In cart screen");

    if (data !== undefined) {
      setFinalCartProducts([...finalCartProducts, ...data.getCartList]);
    }
    // setFinalCartProducts
    // Axios.get(
    //   "http://localhost:4000/api/products/getCartItems/" + user.id
    // ).then((response) => {
    //   console.log(response.data.result);
    //   if (response.data.success === true) {
    //     console.log("geting all fav products and storing in redux");
    //     console.log(response.data.result);
    //     setFinalCartProducts([...finalCartProducts, ...response.data.result]);
    //   }
    // });
  };

  // const removeFromCartHandler = (id) => {
  //   // dispatch(removeFromCart(id));
  // };

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
  };

  const handleCheckOut = async () => {
    console.log("---------------Handling checkout-----------------");
    console.log(checkOutItems.length);
    if (user.about === null) {
      navigate("/shippingAddress");
    } else {
      checkOutItems.map((product) => {
        console.log(product);
        console.log("---------------Handling checkout-----------------");

        if (product.qty === 0) {
          console.log("Deleting product with item qty 0");

          deleteItemFromCart({
            variables: {
              itemId: product.itemId,
            },
          }).then((res) => {
            console.log(res);
            if (res.data !== undefined) {
              console.log(res.data);
              console.log("item deleted successfully");
              // window.location.pathname = "/home";
            }
          });
        } else {
          console.log("--------------- Printing product ---------------");
          console.log(product);
          addItemsToPurchases({
            variables: {
              itemId: product.itemId,
              userId: user.id,
              itemName: product.itemName,
              itemImage: product.itemImage,
              itemCount: product.itemCount,
              itemPrice: product.itemPrice,
              qty: product.qty,
              itemDescription: product.itemDescription,
              giftMessage: product.giftMessage,
            },
          }).then((res) => {
            console.log(res);
            if (res.data !== undefined) {
              console.log(res.data);
              // window.location.pathname = "/home";
            }
          });

          editItemQty({
            variables: {
              itemId: product.itemId,
              itemCount: product.itemCount - product.qty,
              sales: product.qty,
            },
          }).then((res) => {
            console.log(res);
            if (res.data !== undefined) {
              console.log(res.data);
              console.log("item deleted successfully");
              window.location.pathname = "/purchase";
            }
          });
        }
      });

      clearCartItems().then((res) => {
        console.log(res);
      });
      // Axios.delete("http://localhost:4000/api/products/clearCart")
      //   .then((response) => {
      //     if (response) {
      //       console.log("Items deleted successfully");
      //       console.log(response.data.message);
      //     }
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //   });

      dispatch(clearCart());

      // window.location.pathname = "/purchase";
    }
  };

  return (
    <>
      <Navbar />
      <Hoverbar />
      <hr></hr>
      <div className="cartscreen">
        <div className="cartscreen__left">
          <h2>Shopping Cart</h2>

          {itemsQtyError === "" ? (
            <div></div>
          ) : (
            <div>
              <h3 style={{ textAlign: "center", color: "red" }}>
                {itemsQtyError}
              </h3>
            </div>
          )}

          {finalCartProducts.length === 0 ? (
            <div>
              Your Cart Is Empty <Link to="/">Go Back</Link>
            </div>
          ) : (
            finalCartProducts.map((item) => (
              <CartItem
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
              style={{ backgroundColor: "rgb(243, 234, 223)", color: "black" }}
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
