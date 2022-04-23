import Axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  favouritesList,
  getAllFavourites,
  getAllItems,
  getAllProducts,
  getProducts,
  updateFavourites,
} from "../features/productsSlice";
import cookie from "react-cookies";
import { Navigate } from "react-router-dom";
import FavoriteTwoToneIcon from "@mui/icons-material/FavoriteTwoTone";
// import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AirportShuttleIcon from "@mui/icons-material/AirportShuttle";
import { selectUser } from "../features/userSlice";
import { Link } from "react-router-dom";
import { productOverview } from "../features/cartSlice";
import ProductOverView from "./ProductOverView";

function EtsyBody() {
  const dispatch = useDispatch();
  // const [products, setProducts] = useState([]);
  const products = useSelector(getAllProducts);
  const user = useSelector(selectUser);
  // const favourites = useSelector(getAllFavourites);
  // const product = useSelector(getProducts);
  // const getAllItemsFromItems = useSelector(getAllItems);
  const [favourites, setFavourites] = useState([]);
  const [items, SetItems] = useState([]);
  const [favouriteIcon, setFavoutriteIcon] = useState(false);
  const [prodLen, setProdLen] = useState(0);
  // const [productOverview, setProductOverview] = useState(false);

  useEffect(() => {
    getItems();
    // getFavourites();
  }, []);

  const getItems = () => {
    console.log(localStorage.getItem("token"));
    Axios.defaults.headers.common["authorization"] =
      localStorage.getItem("token");
    Axios.get("http://3.101.88.78:4000/api/products/getItems").then(
      (response) => {
        if (response.data.success === true) {
          console.log(response.data.result);
          dispatch(getAllItems(response.data.result));

          for (let i = 0; i < response.data.result.length; i++) {
            // console.log(response.data.result[i].itemId);
            const updateItems = [
              ...items,
              {
                itemId: response.data.result[i].itemId,
                userId: response.data.result[i].userId,
                itemName: response.data.result[i].itemName,
                itemCategory: response.data.result[i].itemCategory,
                itemPrice: response.data.result[i].itemPrice,
                itemDescription: response.data.result[i].itemDescription,
                itemCount: response.data.result[i].itemCount,
                itemImage: response.data.result[i].itemImage,
              },
            ];
            SetItems(updateItems);
            // console.log("-------------geting all products----------------");
          }
        }
      }
    );
  };

  const getFavourites = () => {
    if (user !== null) {
      Axios.get(
        "http://3.101.88.78:4000/api/products/getFavourites/" + user.id
      ).then((response) => {
        console.log("user id for favourites" + user.id);
        console.log(response.data.result);
        if (response.data.success === true) {
          dispatch(favouritesList(response.data.result));
        }
      });
    }
  };

  const handleFavourite = (itemId, userId) => {
    console.log("Favourites added " + itemId + " " + userId);
    Axios.post("http://3.101.88.78:4001/api/products/addFavourite", {
      itemId: itemId,
      userId: userId,
    }).then((response) => {
      if (response.data) {
        console.log(response.data.result);
        console.log("new fav added");
        // setFavoutriteIcon(true);
      }
    });
  };

  const handleOpenImage = (pro) => {
    // console.log(pro.itemId);
    // console.log(pro.itemImage);
    dispatch(productOverview(pro));
    // console.log(pro.itemCount);
    // setProductOverview(true);
    let redirectVar = null;
    if (user === null || !cookie.load("user")) {
      console.log("cookie is found " + user);
      redirectVar = <Navigate to="/home" />;
    } else {
      window.location.pathname = "/productOverview";
    }
  };

  var renderProducts = null;

  renderProducts = products.map((pro) => {
    return (
      <div className="home_cards col-md-4 mb-4">
        <div className="home_card card">
          <div
            style={{
              backgroundColor: "white",
              borderRadius: "50%",
              padding: "5px",
            }}
            className="favourite_icon"
            onClick={() => {
              handleFavourite(pro._id, user.id);
            }}
          >
            {/* {toggleFavourites} */}
            <FavoriteTwoToneIcon />
            {/* {favourites.itemId === products.itemId &&
              favourites.userId === user.id} */}
          </div>
          <img
            src={pro.itemImage}
            className="home_image card-img-top"
            alt="..."
            onClick={() => {
              handleOpenImage(pro);
            }}
          />
          <p className="home_price">
            <AirportShuttleIcon />
            &nbsp;
            {localStorage.getItem("preferedCurrency") === null
              ? "$"
              : localStorage.getItem("preferedCurrency")}
            {pro.itemPrice}
          </p>

          {/* <div className="card-body">
            <h5 className="card-title">{pro.itemName}</h5>

            <p className="card-text">{pro.itemDescription}</p>
            <button className="btn-sm btn-dark">View Product</button>
          </div> */}
        </div>
      </div>
    );
  });

  return (
    <div
      className="etsy_body"
      style={{
        // backgroundColor: "red",
        marginTop: "10%",
        marginLeft: "3%",
        marginRight: "3%",
      }}
    >
      <div className="container-fluid mx-2">
        <div className="row mt-5 mx-2">
          <div className="col-md-9">
            {/* {products.length} */}
            {products.length === 0 ? (
              <div></div>
            ) : (
              <div className="row">{renderProducts}</div>
            )}
          </div>
          <div className="col-md-3">
            {products.length === 0 ? (
              ""
            ) : (
              <p className="categories_title">
                Items you may like from all the shops
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default EtsyBody;
