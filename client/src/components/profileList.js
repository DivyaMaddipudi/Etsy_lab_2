import React from "react";
import {
  ShoppingCart,
  Person,
  NotificationsNoneSharp,
  FavoriteBorderSharp,
} from "@material-ui/icons";
import cookie from "react-cookies";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectUser } from "../features/userSlice";
import {
  removeAllItemsFromHome,
  removeFavouritesList,
  removeProductsState,
} from "../features/productsSlice";

function profileList({ setShowProfileLists }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const showHomePage = () => {
    setShowProfileLists(false);
  };

  const loadProfilePage = () => {
    navigate("/profile");
  };

  const handleSellOnEtsy = () => {
    navigate("/sellonetsy");
  };

  const handleSignOut = (e) => {
    e.preventDefault();
    console.log("In sign out");
    dispatch(logout());
    dispatch(removeProductsState());
    dispatch(removeFavouritesList());
    // dispatch(removeAllItemsFromHome());
    console.log("In sign out 1");
    // navigate("/");
    cookie.remove("user", { path: "/" });
    window.location.pathname = "/";
  };

  // let redirectVar = null;
  // if (!user) {
  //   console.log("cookie is found " + user);
  //   redirectVar = <Navigate to="/home" />;
  // }
  return (
    <div>
      {/* {redirectVar} */}
      <div onClick={showHomePage} className="profile-modal">
        <div className="profile-content">
          {/* <CloseLogin setshowSignIn={setshowSignIn} /> */}

          <ul className="profile-icons">
            <li onClick={loadProfilePage} className="profile-icon">
              <b>{cookie.load("user")}</b>
              <br />
              <span style={{ fontSize: "14px" }}>View your profile</span>
            </li>
            <li className="profile-icon">Gift card balance: $0.00</li>
            <li className="profile-icon">Messages</li>
            <li className="profile-icon">Purchases and reviews</li>
            <li className="profile-icon">Account Settings</li>
            <li onClick={handleSellOnEtsy} className="profile-icon">
              Sell on Etsy
            </li>
            <li onClick={handleSignOut} className="profile-icon">
              Sign out
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default profileList;
