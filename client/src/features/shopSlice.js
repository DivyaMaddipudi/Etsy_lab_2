import { createSlice } from "@reduxjs/toolkit";

export const shopSlice = createSlice({
  name: "shop",
  initialState: {
    userInfo: [],
    products: [],
  },
  reducers: {
    // by id
    userId: (state, action) => {
      state.userId = action.payload;
    },
    removeUserId: (state) => {
      state.userId = null;
    },
    userDetails: (state, action) => {
      state.userInfo = action.payload;
    },
    removeUserDetails: (state) => {
      state.userInfo = null;
    },
    createProducts: (state, action) => {
      state.products = action.payload;
    },
    removeProducts: (state) => {
      state.products = null;
    },
  },
});

export const {
  userId,
  removeUserId,
  userDetails,
  removeUserDetails,
  createProducts,
  removeProducts,
} = shopSlice.actions;

export const getSearchItemUserInfo = (state) => state.shop.userInfo;
export const getUserProducts = (state) => state.shop.products;
export const getUserId = (state) => state.shop.userId;

export default shopSlice.reducer;
