import Axios from "axios";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getProducts } from "../features/productsSlice";
import { getSearchItemUserInfo } from "../features/shopSlice";
import { selectUser } from "../features/userSlice";
// import EditShop from "./ShopDetails/editShop";
import EditShopImage from "./products/editShopImage";

function shopHeaderByOther({ searchProductUserId }) {
  // const user = useSelector(selectUser);
  // const product = useSelector(getProducts);
  // const [shopName, setShopName] = useState("");
  // const [userId, setUserId] = useState();
  // const [editShopPage, setEditShopPage] = useState(false);
  // const [userName, setUserName] = useState("");
  // const [shopImage, setShopImage] = useState("");
  // const [shopDetails, setShopDetails] = useState();
  // const [prodUserId, setProdUserId] = useState(0);

  const userInformation = useSelector(getSearchItemUserInfo);

  return (
    <div className="shophome_header">
      {/* {shopImage} */}
      <div className="shop_details">
        <img
          width="180px"
          // src={"/Images/" + userInformation.shopImage}
          alt="shop"
        ></img>
        <div className="shop_info">
          <h3 className="shop_name">{userInformation.shopName}</h3>
          <p> 10 Sales </p>
          {/* {editButton} */}
        </div>
      </div>
      <div className="owner_details">
        <h6 style={{ fontSize: "18px" }}>SHOP OWNER</h6>
        <img
          style={{ width: "30%", borderRadius: "50%", height: "100px" }}
          src={"/Users/Images/" + userInformation.profilePic}
        ></img>
        <h5>{userInformation.name}</h5>
      </div>
    </div>
  );
}

export default shopHeaderByOther;
