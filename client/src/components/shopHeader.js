import Axios from "axios";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getProducts } from "../features/productsSlice";
import { selectUser } from "../features/userSlice";
// import EditShop from "./ShopDetails/editShop";
import EditShopImage from "./products/editShopImage";

function shopHeader({ searchProductUserId }) {
  const user = useSelector(selectUser);
  const product = useSelector(getProducts);
  const [shopName, setShopName] = useState("");
  const [userId, setUserId] = useState();
  const [editShopPage, setEditShopPage] = useState(false);
  const [userName, setUserName] = useState("");
  const [shopImage, setShopImage] = useState("");
  const [shopDetails, setShopDetails] = useState();
  const [prodUserId, setProdUserId] = useState(0);
  const [salesCount, setSalesCount] = useState([]);

  const [salesValue, setSalesValue] = useState();

  useEffect(() => {
    console.log(user.id + " -------------redux user id --------------------");
    Axios.get("http://localhost:4000/api/users/getShopById/" + user.id).then(
      (response) => {
        if (response.data.success) {
          // setShop(response.data.result);
          // console.log(response.data.user["shopImage"]);
          // console.log(response.data.user["shopName"]);
          // console.log(response.data.user.shopImage);
          // console.log(response.data.user);

          console.log(response);
          setShopName(response.data.user.shopName);
          setUserName(response.data.user.name);
          setShopImage(response.data.user.shopImage);
        } else {
          console.log("Failed in getting shop by id ");
        }
      }
    );

    Axios.get("http://localhost:4000/api/products/getSalesCount").then(
      (response) => {
        console.log("In sales count axios");
        console.log(response);
        console.log("In sales count axios");
        if (response.data.success) {
          console.log(response.data.result);
          response.data.result
            .filter((sales) => sales._id === user.id)
            .map((salesCount) => setSalesValue(salesCount.sum));
          console.log(salesValue);
        } else {
          console.log("failed in geting sales count");
        }
      }
    );
  }, []);

  const editShopDetails = (id) => {
    setUserId(id);
    setEditShopPage(true);
    console.log("In edit shop details");
  };

  return (
    <div className="shophome_header">
      {/* {shopImage} */}
      <div className="shop_details">
        <img width="180px" src={shopImage} alt="shop"></img>
        <div className="shop_info">
          <h3 className="shop_name">{shopName}</h3>

          <p>Sales: {salesValue}</p>
          {/* {editButton} */}

          <button
            onClick={() => editShopDetails(user.id)}
            id="imgupload"
            className="editshop_btn"
            type="submit"
          >
            Edit shop
          </button>
        </div>
      </div>
      <div className="owner_details">
        <h6 style={{ fontSize: "18px" }}>SHOP OWNER</h6>
        <img
          style={{ width: "30%", borderRadius: "50%", height: "100px" }}
          src={"/Users/Images/" + user.profilePic}
        ></img>
        <h5>{userName}</h5>
      </div>
      {editShopPage && (
        <EditShopImage editShopPage={setEditShopPage} userId={userId} />
      )}
    </div>
  );
}

export default shopHeader;
