import { createSlice } from "@reduxjs/toolkit";

export const cartItemsSlice = createSlice({
  name: "cartItems",
  initialState: {
    cartItems: [],
    finalCart: [],
  },
  reducers: {
    // by id
    createCartItem: (state, action) => {
      const exist = state.cartItems.findIndex(
        (ele) => ele.itemId === action.payload.itemId
      );
      console.log(exist + "----------------------------: exist");
      if (exist !== -1) {
        state.cartItems[exist] = {
          ...state.cartItems[exist],
          ...action.payload,
        };
      } else {
        state.cartItems.push(action.payload);
      }
    },
    removeCartItem: (state, action) => {
      console.log("----------------------------: deleted" + action.payload);
      let index = state.cartItems.findIndex(
        ({ id }) => id === action.payload.itemId
      );
      state.cartItems.splice(index, 1);
      // state.cartItems.splice(action.payload, 1);
      // const item = state.cartItems.filter(
      //   (ele) => ele.itemId === action.payload
      // );
      //   state.cartProducts = null;
      // console.log(item + "----------------------------: deleted");
    },
    clearCart: (state) => {
      state.cartItems = [];
    },
    updateCartItem: (state, action) => {
      state.cartItems = action.payload;
    },

    createFinalCart: (state, action) => {
      const exist = state.finalCart.findIndex(
        (ele) => ele.itemId === action.payload.itemId
      );
      console.log(exist + "----------------------------: exist");
      if (exist !== -1) {
        state.finalCart[exist] = {
          ...state.finalCart[exist],
          ...action.payload,
        };
      } else {
        state.finalCart.push(action.payload);
      }
    },
  },
});

export const {
  createCartItem,
  removeCartItem,
  updateCartItem,
  createFinalCart,
  clearCart,
} = cartItemsSlice.actions;

export const getCartItems = (state) => state.cartItem.cartItems;
export const getFinalCart = (state) => state.cart.finalCart;

export default cartItemsSlice.reducer;
