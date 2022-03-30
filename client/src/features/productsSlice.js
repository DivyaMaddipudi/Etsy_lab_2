import { createSlice } from "@reduxjs/toolkit";

export const productSlice = createSlice({
  name: "items",
  initialState: {
    products: [],
    items: [],
    favourites: [],
  },
  reducers: {
    // by id
    productsList: (state, action) => {
      state.products = action.payload;
    },
    removeProductsState: (state) => {
      state.products = null;
    },
    updateProducts: (state, action) => {
      state.products = action.payload;
    },
    getAllItems: (state, action) => {
      state.items = action.payload;
    },
    removeAllItemsFromHome: (state) => {
      state.items = null;
    },
    favouritesList: (state, action) => {
      state.favourites = action.payload;
    },
    updateFavourites: (state, action) => {
      state.favourites = action.payload;
    },
    removeFavouritesList: (state) => {
      state.favourites = null;
    },
  },
});

export const {
  productsList,
  removeProductsState,
  updateProducts,
  getAllItems,
  favouritesList,
  updateFavourites,
  removeFavouritesList,
  removeAllItemsFromHome,
} = productSlice.actions;

export const getProducts = (state) => state.product.products;
export const getAllProducts = (state) => state.product.items;
export const getAllFavourites = (state) => state.product.favourites;

export default productSlice.reducer;
