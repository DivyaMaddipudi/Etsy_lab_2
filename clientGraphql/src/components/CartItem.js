import "./CartItem.css";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createFinalCart,
  createCartItem,
  removeCartItem,
  getCartItems,
} from "../features/cartItemsSlice";
import { Delete } from "@material-ui/icons";
import Axios from "axios";
import { selectUser } from "../features/userSlice";
import {
  ADD_PRODUCT_TO_CART,
  DELETE_ITEM_FROM_CART,
} from "../GraphQL/Mutation";
import { useMutation } from "@apollo/client";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  const [giftOption, setGiftOption] = useState(false);
  const [giftDescription, setGiftDescription] = useState("");
  const user = useSelector(selectUser);

  // const { error, loading, data } = useQuery(LOAD_CART_ITEMS, {
  //   variables: { userId: user.id },
  // });

  const [addProductToCart] = useMutation(ADD_PRODUCT_TO_CART, {
    onCompleted(res) {
      console.log(res);
    },
    onError(e) {
      console.log(e.message);
    },
  });

  const [deleteItemFromCart] = useMutation(DELETE_ITEM_FROM_CART, {
    onCompleted(res) {
      console.log(res);
    },
    onError(e) {
      console.log(e.message);
    },
  });

  useEffect(() => {
    dispatch(
      createCartItem({
        userId: item.userId,
        itemId: item.itemId._id,
        itemName: item.itemId.itemName,
        itemPrice: item.itemId.itemPrice,
        itemImage: item.itemId.itemImage,
        itemDescription: item.itemId.itemDescription,
        qty: item.qty,
        itemCount: item.itemId.itemCount,
        giftMessage: "",
      })
    );
  }, []);

  const qtyChangeHandler = (id, qty) => {
    console.log(qty);
    console.log("item updation qty in axios");
    console.log(item);

    console.log(item.itemId._id);

    addProductToCart({
      variables: {
        userId: user.id,
        itemId: item.itemId._id,
        qty: Number(qty),
      },
    })
      .then((response) => {
        console.log("itm qty change in response axios");
        console.log(response.data);
        if (response.data !== undefined) {
          console.log("Items added to cart successfully" + Number(qty));
          window.location.reload(true);
          // window.location.pathname = "/home";
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const removeHandler = (id) => {
    console.log("remove");

    deleteItemFromCart({
      variables: {
        itemId: id,
      },
    }).then((res) => {
      console.log(res);
      if (res.data !== undefined) {
        console.log(res.data);
        console.log("item deleted successfully");
        window.location.reload(true);

        // window.location.pathname = "/home";
      }
    });

    // Axios.delete(
    //   "http://localhost:4000/api/products/deleteCartItem/" + id
    // ).then((response) => {
    //   console.log(response.data);
    //   if (response.data.success === true) {
    //     console.log("item deleted successfully");
    //     console.log(response.data.res);
    //     window.location.reload(true);
    //   }
    // });

    // dispatch(removeFromCart(id));
  };

  const giftOptions = (giftMessage, itemId) => {
    console.log("Added gift options");
    console.log(giftMessage + " " + itemId);
    dispatch(
      createCartItem({
        userId: item.userId,
        itemId: item.itemId._id,
        itemName: item.itemId.itemName,
        itemPrice: item.itemId.itemPrice,
        itemImage: item.itemId.itemImage,
        itemDescription: item.itemId.itemDescription,
        qty: item.qty,
        itemCount: item.itemId.itemCount,
        giftMessage: giftMessage,
      })
    );
  };

  return (
    <div
      className="cart_pag"
      style={{
        display: "flex",
        width: "100%",
        // backgroundColor: "green",
        height: "200px",
      }}
    >
      <div className="cartitem">
        <div className="cartitem__image">
          <img
            src={item.itemId.itemImage}
            alt={item.itemId.itemName}
            width={200}
            height={150}
          />
        </div>
        <div style={{ marginLeft: "50px" }} className="cartItem__name">
          <p>{item.itemId.itemName}</p>
          <input
            type="checkbox"
            id="gift"
            name="gift"
            onChange={() => {
              setGiftOption(!giftOption);
            }}
          />
          <label for="gift"> This order contains gift</label>
          {giftOption ? (
            <>
              <input
                type="text"
                style={{ width: "95%", paddingLeft: "5px" }}
                placeholder="Enter gift message!!"
                onChange={(event) => {
                  setGiftDescription(event.target.value);
                }}
              />
              <button
                style={{
                  borderRadius: "4px",
                  backgroundColor: "rgb(243, 234, 223)",
                  marginTop: "1px",
                  border: "1px solid black",
                }}
                onClick={() => giftOptions(giftDescription, item.itemId._id)}
              >
                Save Gift Message
              </button>
            </>
          ) : (
            <div></div>
          )}
        </div>
        <p className="cartitem__price">${item.itemId.itemPrice}</p>
        <select
          value={item.qty}
          onChange={(e) => qtyChangeHandler(item._id, e.target.value)}
          className="cartItem__select"
        >
          <option key={0} value={0}>
            0
          </option>
          {[...Array(item.itemId.itemCount).keys()].map((x) => (
            <option key={x + 1} value={x + 1}>
              {x + 1}
            </option>
          ))}
        </select>

        <button
          className="cartItem__deleteBtn"
          onClick={() => removeHandler(item.itemId._id)}
        >
          <Delete />
        </button>
      </div>
    </div>
  );
};

export default CartItem;
