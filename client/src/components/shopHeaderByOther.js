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
  const [salesValue, setSalesValue] = useState();

  const userInformation = useSelector(getSearchItemUserInfo);
  useEffect(() => {
    Axios.get("http://localhost:4000/api/products/getSalesCount").then(
      (response) => {
        console.log("In sales count axios");
        console.log(response);
        console.log("In sales count axios");
        if (response.data.success) {
          console.log(response.data.result);
          response.data.result
            .filter((sales) => sales._id === userInformation._id)
            .map((salesCount) => setSalesValue(salesCount.sum));
          console.log(salesValue);
        } else {
          console.log("failed in geting sales count");
        }
      }
    );
  }, []);

  return (
    <div className="shophome_header">
      {/* {shopImage} */}
      <div className="shop_details">
        <img width="180px" src={userInformation.shopImage} alt="shop"></img>
        <div className="shop_info">
          <h3 className="shop_name">{userInformation.shopName}</h3>
          <p>Sales: {salesValue}</p>
          {/* {editButton} */}
        </div>
      </div>
      <div className="owner_details">
        <h6 style={{ fontSize: "18px" }}>SHOP OWNER</h6>
        <img
          style={{ width: "30%", borderRadius: "50%", height: "100px" }}
          src={userInformation.profilePic}
        ></img>
        <h5>{userInformation.username}</h5>
        <h5>+1 {userInformation.phoneNumber}</h5>
      </div>
    </div>
  );
}

export default shopHeaderByOther;
