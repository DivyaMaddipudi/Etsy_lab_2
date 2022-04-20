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
import Pagination from "./Pagination";

function Purchases() {
  const user = useSelector(selectUser);
  const [purchasedProducts, setPurchasedProducts] = useState([]);
  // const [purchasedProducts, setPurchasedProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  useEffect(() => {
    getPurchasedItems();
  }, []);
  //Get current posts
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPurchasedItems = purchasedProducts.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const getPurchasedItems = () => {
    Axios.get(
      "http://54.174.244.242:4000/api/products/getPurchasedItems/" + user.id
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

  let renderPurchases = null;

  // const purchasedProducts = JSON.parse(localStorage.getItem("purchase"));

  if (purchasedProducts.length === 0) {
    renderPurchases = () => {
      return <div>No Purchases till now...</div>;
    };
  } else {
    renderPurchases = currentPurchasedItems.map((pro) => {
      return (
        <div className="home_cards mb-4">
          <div className="home_card card">
            <div
              className="purchase_item_header"
              style={{ backgroundColor: "rgb(243, 234, 223)" }}
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

                <p className="card-text">{pro.itemDescription}</p>
                <p className="card-text">Quantity: {pro.qty}</p>

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

  //change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // const setItemsInPage = (itemsCount) => {
  //   localStorage.setItem("itemsPerPage", itemsCount);
  //   setItemsPerPage(localStorage.getItem("itemsPerPage"));
  // };

  return (
    <>
      <Navbar />
      <Hoverbar />
      <hr></hr>
      <div className="purchases_header">
        <h2 style={{ marginLeft: "110px" }}>Purchases Page</h2>
        <div style={{ width: "20%" }}>
          <label htmlFor="itemsPerPage" style={{ marginRight: "10px" }}>
            Items per page
          </label>
          <select
            style={{ width: "25%", height: "30px", marginTop: "5px" }}
            onChange={(e) => {
              setItemsPerPage(e.target.value);
            }}
            id="itemsPerPage"
          >
            <option></option>
            <option value="2"> 2 </option>
            <option value="5" selected>
              5
            </option>
            <option value="10"> 10 </option>
          </select>
        </div>
      </div>
      <div className="profile_favourites">
        <div className="container-fluid mx-1">
          <div className="row mt-5 mx-1">
            <div className="col-md-9">
              <div className="row"> {renderPurchases} </div>
              <Pagination
                itemsPerPage={itemsPerPage}
                totalItems={purchasedProducts.length}
                paginate={paginate}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Purchases;
