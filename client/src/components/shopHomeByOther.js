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
  const { itemId } = useParams(); //itemId
  const { userId } = useParams();
  const [userIdFromSearch, setUserIdFromSearch] = useState();
  // const user = useSelector(selectUser);

  const [userInfo, setUserInfo] = useState("");
  const [itemsByUser, setItemsByUser] = useState([]);
  const dispatch = useDispatch();
  const userid = useSelector(getUserId);

  useEffect(() => {
    // getUserIdFromItemId();
    getItemsFromUserid();
    getUserDetails();
  });

  const getUserIdFromItemId = () => {
    Axios.get("http://localhost:4000/getItemById/" + itemId).then(
      (response) => {
        if (response) {
          dispatch(userId(response.data[0].userId));
        }
      }
    );
  };

  const getItemsFromUserid = () => {
    Axios.get(
      "http://localhost:4000/api/products/getAllProducts/" + userId
    ).then((response) => {
      if (response) {
        console.log(response.data.result);
        // setUserInfo();
        dispatch(createProducts(response.data.result));
      }
    });
  };

  const getUserDetails = () => {
    Axios.get("http://localhost:4000/api/users/getShopById/" + userId).then(
      (response) => {
        if (response) {
          console.log(response);
          // setUserInfo(response.data.result[0]);
          dispatch(userDetails(response.data.user));
          // console.log(response.data.result[0].name);
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
    </div>
  );
}

export default shopHomeByOther;
