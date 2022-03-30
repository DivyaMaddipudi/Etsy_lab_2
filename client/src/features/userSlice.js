import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    register: null,
    shop: null,
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.shop = null;
      state.register = null;
    },
    registerUser: (state, action) => {
      state.register = action.payload;
    },
    updateUser: (state, action) => {
      state.user.shopName = action.payload.shopName;
    },
    updateUserDetails: (state, action) => {
      state.user.name = action.payload.name;
      state.user.dob = action.payload.dob;
      state.user.gender = action.payload.gender;
      state.user.city = action.payload.city;
      state.user.profilePic = action.payload.profilePic;
      state.user.about = action.payload.about;
    },
    activeShop: (state, action) => {
      state.shop = action.payload.shopName;
    },
  },
});

export const {
  login,
  logout,
  activeShop,
  updateUser,
  updateUserDetails,
  registerUser,
} = userSlice.actions;

export const selectUser = (state) => state.user.user;
export const selectShop = (state) => state.user.shop;
export const registerUserInfo = (state) => state.user.register;

export default userSlice.reducer;
