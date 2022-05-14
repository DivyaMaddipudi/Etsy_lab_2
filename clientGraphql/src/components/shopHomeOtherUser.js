import React, { useState, useEffect } from "react";
import { PhotoCameraOutlined, EditOutlined } from "@material-ui/icons";
import cookie from "react-cookies";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import { Navigate } from "react-router-dom";
import { getUserProducts } from "../features/shopSlice";

function shopHomeOtherUser() {
  const products = useSelector(getUserProducts);
  const user = useSelector(selectUser);
  let renderFavourites = null;
  if (products === null) {
    renderFavourites = () => {
      return <div>No Items in shop</div>;
    };
  } else {
    renderFavourites = products.map((pro) => {
      return (
        <div className="home_cards col-md-4 mb-4">
          <div className="home_card card">
            {/* <div
              style={{
                backgroundColor: "white",
                borderRadius: "50%",
                padding: "5px",
              }}
              className="favourite_icon"
              onClick={() => {
                handleFavourite(pro.itemId, user.id);
              }}
            >
              <FavoriteBorderIcon />
            </div> */}
            <img src={pro.itemImage} className="card-img-top" alt="..." />
            <p
              style={{ marginTop: "65%", width: "35%", marginLeft: "15px" }}
              className="home_price"
            >
              ${pro.itemPrice}
            </p>
            <div className="card-body">
              <h5 className="card-title">{pro.itemName}</h5>
              <p className="card-text">{pro.itemDescription}</p>
              {/* <button className="btn-sm btn-dark">Edit</button> */}
            </div>
          </div>
        </div>
      );
    });
  }

  let redirectVar = null;
  if (user === null || !cookie.load("user")) {
    console.log("cookie is found " + user);
    redirectVar = <Navigate to="/home" />;
  }

  return (
    <div>
      {redirectVar}

      <div className="profile_favourites">
        <h2 style={{ fontSize: "30px" }}>ITEMS</h2>

        <div className="container-fluid mx-1">
          <div className="row mt-5 mx-1">
            <div
              //   style={{ boxShadow: "3px 0px 4px 2px pink" }}
              className="col-md-9"
            >
              <div className="row"> {renderFavourites} </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default shopHomeOtherUser;
