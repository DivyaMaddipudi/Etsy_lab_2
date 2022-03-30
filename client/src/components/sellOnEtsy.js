import React from "react";
import Navbar from "./Navbar";
import Hoverbar from "./Hoverbar";
import { Navigate, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectShop, selectUser } from "../features/userSlice";

function sellOnEtsy() {
  // const navigate = useNavigate();

  const user = useSelector(selectUser);
  const shop = useSelector(selectShop);

  let redirectVar = null;
  if (!user) {
    console.log("cookie is found " + user);
    redirectVar = <Navigate to="/home" />;
  }

  let gotoSellPage = null;
  if (user.shopName === null) {
    if (shop === null) {
      gotoSellPage = <div>{<Navigate to="/shopName" />}</div>;
    } else {
      gotoSellPage = (
        <div>
          <Navigate to="/shopHome" />
        </div>
      );
    }
  } else {
    gotoSellPage = (
      <div>
        <Navigate to="/shopHome" />
      </div>
    );
  }

  return (
    <div>
      {redirectVar}
      <Navbar />
      <Hoverbar />
      <hr></hr>
      {/* {user.shopName} */}
      {gotoSellPage}
    </div>
  );
}

export default sellOnEtsy;
