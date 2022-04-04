import Axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getFinalCart } from "../features/cartItemsSlice";
import { selectUser } from "../features/userSlice";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AirportShuttleIcon from "@mui/icons-material/AirportShuttle";
import Navbar from "./Navbar";
import Hoverbar from "./Hoverbar";
import cookie from "react-cookies";

function Purchases() {
  const user = useSelector(selectUser);
  const [purchasedProducts, setPurchasedProducts] = useState([]);
  // const [purchasedProducts, setPurchasedProducts] = useState([]);

  useEffect(() => {
    getPurchasedItems();
  }, []);

  const getPurchasedItems = () => {
    Axios.get(
      "http://localhost:4000/api/products/getPurchasedItems/" + user.id
    ).then((response) => {
      if (response.data.success === true) {
        console.log("----------------Purchased products-------------------");
        console.log(response.data.result);
        //   setPurchasedProducts(response.data.result);
        setPurchasedProducts([...purchasedProducts, ...response.data.result]);

        // setPurchasedProducts(response.data.result[0].items);
      }
    });
  };

  let renderFavourites = null;

  // const purchasedProducts = JSON.parse(localStorage.getItem("purchase"));

  if (purchasedProducts.length === 0) {
    renderFavourites = () => {
      return <div>No Purchases till now...</div>;
    };
  } else {
    renderFavourites = purchasedProducts.map((pro) => {
      return (
        <div className="home_cards mb-4">
          <div className="home_card card">
            <div
              className="purchase_item_header"
              style={{ backgroundColor: "rgb(197, 197, 197)" }}
            >
              <p className="purchase_item_price">Item Price ${pro.itemPrice}</p>
              <p className="purchase_item_price">
                Ship To {cookie.load("user")}
              </p>
              <p style={{ width: "70%" }} className="purchase_item_price">
                Order Id #{pro._id}
              </p>
            </div>

            <hr style={{ marginTop: "-2px" }}></hr>
            <div className="item">
              <img src={pro.itemImage} className="card-img-left" alt="..." />

              <div style={{ marginLeft: "10px" }} className="item-details">
                <h5 className="card-title">{pro.itemName}</h5>
                {pro.giftMessage !== "" ? (
                  <p className="card-text">Gift Message: {pro.giftMessage}</p>
                ) : (
                  <p className="card-text"></p>
                )}

                {/* <button className="btn-sm btn-dark">Edit</button> */}
              </div>
            </div>
          </div>
        </div>
      );
    });
  }

  return (
    <>
      <Navbar />
      <Hoverbar />
      <hr></hr>
      <h2 style={{ marginLeft: "110px" }}>Purchases Page</h2>
      <div className="profile_favourites">
        <div className="container-fluid mx-1">
          <div className="row mt-5 mx-1">
            <div className="col-md-9">
              <div className="row"> {renderFavourites} </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Purchases;
