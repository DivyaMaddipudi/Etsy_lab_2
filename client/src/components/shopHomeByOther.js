import Axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  createProducts,
  getUserId,
  userDetails,
  userId,
} from "../features/shopSlice";
import { selectUser } from "../features/userSlice";
import Hoverbar from "./Hoverbar";
import Navbar from "./Navbar";
// import ShopHeader from "./shopHeader";
import ShopHeaderByOther from "./shopHeaderByOther";
import ShopHomeOtherUser from "./shopHomeOtherUser";

function shopHomeByOther() {
  const { id } = useParams(); //itemId
  const [userIdFromSearch, setUserIdFromSearch] = useState();
  // const user = useSelector(selectUser);

  const [userInfo, setUserInfo] = useState("");
  const [itemsByUser, setItemsByUser] = useState([]);
  const dispatch = useDispatch();
  const userid = useSelector(getUserId);

  useEffect(() => {
    getUserIdFromItemId();
    getItemsFromUserid();
    getUserDetails();
    // setTimeout(() => {
    //   getItemsFromUserid();
    // }, 2000);

    // setTimeout(() => {
    //   userDetails();
    // }, 3000);
  });

  const getUserIdFromItemId = () => {
    Axios.get("http://localhost:4000/getItemById/" + id).then((response) => {
      if (response) {
        dispatch(userId(response.data[0].userId));
      }
    });
  };

  const getItemsFromUserid = () => {
    Axios.get("http://localhost:4000/getItemsBasedOnUser/" + userid).then(
      (response) => {
        if (response) {
          console.log(response);
          // setUserInfo();
          dispatch(createProducts(response.data.result));
          console.log("helllo");
          console.log(userInfo);
        }
      }
    );
  };

  const getUserDetails = () => {
    Axios.get("http://localhost:4000/getShopById/" + userid).then(
      (response) => {
        if (response) {
          console.log(response);
          // setUserInfo(response.data.result[0]);
          dispatch(userDetails(response.data.result[0]));
          // console.log(response.data.result[0].name);
          console.log("hi");
        }
      }
    );
  };

  return (
    <div>
      <Navbar />
      <Hoverbar />
      <hr></hr>
      <h1>{userIdFromSearch}</h1>

      <ShopHeaderByOther />
      <ShopHomeOtherUser />

      {/* shop home header  */}
    </div>
  );
}

export default shopHomeByOther;
