import Axios from "axios";
import React, { useEffect, useState } from "react";
import FavoriteTwoToneIcon from "@mui/icons-material/FavoriteTwoTone";

function productsByCategory() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    getItemsByCategory();
  }, []);

  const getItemsByCategory = () => {
    Axios.get("http://localhost:4000/getItemsByCategory").then((response) => {
      if (response.data.success === true) {
        console.log(response.data.result);
        setProducts(response.data.result);
      }
    });
  };

  let renderFavourites = null;
  if (products.length === 0) {
    renderFavourites = () => {
      return <div>No Favourites added</div>;
    };
  } else {
    renderFavourites = products.map((pro) => {
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
                // handleFavourite(pro.itemId, user.id);
              }}
            >
              <FavoriteTwoToneIcon />
            </div>
            <img
              src={"/Images/" + pro.itemImage}
              // src={require("../Images/" + pro.itemImage)}
              className="card-img-top"
              alt="..."
            />
            <p style={{ marginTop: "60%" }} className="home_price">
              ${pro.itemPrice}
            </p>

            <div className="card-body">
              <h5 className="card-title">{pro.itemName}</h5>

              {/* <p className="card-text">{pro.itemDescription}</p> */}
              {/* <button className="btn-sm btn-dark">Edit</button> */}
            </div>
          </div>
        </div>
      );
    });
  }

  return (
    <div>
      <div className="categories">
        <div className="profile_favourites">
          <div className="container-fluid mx-2">
            <div className="row mt-5 mx-2">
              <div className="col-md-3">
                {products.length === 0 ? (
                  ""
                ) : (
                  <p className="categories_title">
                    Categories We think you'll love
                  </p>
                )}
              </div>
              <div className="col-md-9">
                <div className="row"> {renderFavourites} </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default productsByCategory;
