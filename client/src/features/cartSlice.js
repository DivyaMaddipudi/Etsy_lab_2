import { createSlice, current } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    productOverview: [],
  },
  reducers: {
    // by id
    productOverview: (state, action) => {
      state.productOverview = action.payload;
    },
    removeCartPreviewProducts: (state) => {
      state.cartProducts = null;
    },
    addProductToCart: (state, action) => {
      state.finalCartProducts = action.payload;
    },
    removeCartProduct: (state) => {
      state.finalCartProducts = null;
    },
  },
});

export const {
  productOverview,
  addProductToCart,
  removeCartPreviewProducts,
  removeCartProduct,
} = cartSlice.actions;

export const getAllCartProducts = (state) => state.cart.productOverview;
// export const getFinalCartProducts = (state) => state.cart.finalCartProducts;

export default cartSlice.reducer;
