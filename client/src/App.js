import "./App.css";
import React, { Component, useState, useEffect } from "react";

// import { useState, useEffect } from "react";
import Home from "./components/Home";
import Signin from "./components/Signin";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Register from "./components/register";
import WelcomePage from "./components/welcomePage";
import Navbar from "./components/Navbar";
import ProfilePage from "./components/profilePage";
import SellOnEtsy from "./components/sellOnEtsy";
import ShopHome from "./components/shopHome";
import { useSelector } from "react-redux";
import userSlice, { selectUser } from "./features/userSlice";
import CheckShopName from "./components/checkShopName";
import SearchResultItems from "./components/searchResultItems";
// import ShopHomeByOther from "./components/shopHomeByOther";
import ProfileForm from "./components/profileForm";
import ProfileDashboard from "./components/profileDashboard";
import ProductOverView from "./components/ProductOverView";
// import CartScreen from "./components/CartScreen";
import Cart from "./components/Cart";
import Purchases from "./components/Purchases";
import ProductView from "./components/ProductView";
import ShopHomeByOther from "./components/shopHomeByOther";

function App() {
  const user = useSelector(selectUser);
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/welcome" element={<WelcomePage />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/updateProfile" element={<ProfileForm />} />
          <Route path="/sellonetsy" element={<SellOnEtsy />} />
          <Route path="/shopHome" element={<ShopHome />} />
          {/* <Route path="/shopHome/:id" element={<ShopHome />} /> */}
          <Route path="/shopName" element={<CheckShopName />} />
          <Route path="/searchResults" element={<SearchResultItems />} />
          <Route path="/shopHomeForOthers/:id" element={<ShopHomeByOther />} />
          <Route path="/profileDashboard" element={<ProfileDashboard />} />
          <Route path="/profileForm" element={<ProfileForm />} />
          <Route path="/productOverview" element={<ProductOverView />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/purchase" element={<Purchases />} />
          <Route path="/productView/:id" element={<ProductView />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
