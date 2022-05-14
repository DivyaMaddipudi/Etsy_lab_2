import Axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectUser, userSlice } from "../../features/userSlice";
import CloseLogin from "../closeLogin";

function editShop({ editShopPage, userId }) {
  const user = useSelector(selectUser);
  const [shopImage, setShopImage] = useState("");
  const [shopName, setShopName] = useState("");

  const editShopDetails = (e) => {
    e.preventDefault();
    console.log("Update form image");
    const formData = new FormData();
    formData.append("shopImage", shopImage);
    Axios.put(
      "http://localhost:4000/updateShopImageById/" + userId,
      formData
    ).then((response) => {
      if (response.data.success) {
        console.log(response);
      }
    });
  };

  return (
    <div className="bg-modal">
      <div className="modal-content">
        <CloseLogin setshowSignIn={editShopPage} />
        <h2 className="addProd_title">Edit Shop Details</h2>
        <form className="items_form" encType="multipart/form-data">
          <div className="htmlForm-group">
            <label style={{ fontSize: "18px" }} htmlFor="item_name">
              Shop Name
            </label>
            <br />
            <input
              type="text"
              className="item_name"
              id="item_name"
              placeholder="Shop Name"
              defaultValue={user.shopName}
              readOnly={true}
              required
            />
            <br />
            <label style={{ fontSize: "18px" }} htmlFor="item_image">
              Shop Image
            </label>
            <br />
            <input
              style={{ border: "none" }}
              type="file"
              name="shopImage"
              className="shop_image"
              id="shop_image"
              onChange={(event) => {
                setShopImage(event.target.files[0]);
              }}
              required
            />
          </div>

          <div>
            <button
              style={{
                marginTop: "5%",
                width: "90%",
                borderRadius: "4px",
                padding: "5px",
                backgroundColor: "gray",
                border: "none",
                color: "white",
              }}
              onClick={editShopDetails}
            >
              Update Shop Details
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default editShop;
