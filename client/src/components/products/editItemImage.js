import Axios from "axios";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import CloseLogin from "../closeLogin";

function editItemImage({ setShowProductsEditPage, products, itemId }) {
  const [itemImage, setItemImage] = useState("");
  const [product, setProduct] = useState();
  const [productExist, setProductExist] = useState(false);

  const editImage = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("itemImage", itemImage);
    console.log("Inedit client axios" + itemImage);
    Axios.put(
      "http://localhost:4000/updateItemImageById/" + itemId,
      formData
    ).then((response) => {
      if (response.data.success) {
        console.log("Item details edited successfully.....");
      }
    });
    // setShowProductsEditPage(false);
  };

  useEffect(() => {
    fetchItemDetails();
  }, []);

  const fetchItemDetails = () => {
    Axios.get("http://localhost:4000/getItemById/" + itemId).then(
      (response) => {
        if (response.data.success) {
          console.log(response.data);
          setItemImage(response.data.result.itemImage);
          // setProductExist(true);
          console.log("Products stored in product");
        }
      }
    );
  };

  return (
    <div className="bg-modal">
      <div className="modal-content">
        <CloseLogin setshowSignIn={setShowProductsEditPage} />
        <h2 className="addProd_title">Add product</h2>
        <form className="items_form" encType="multipart/form-data">
          <div className="htmlForm-group">
            <label htmlFor="item_image">Item Image</label>
            <br />
            <input
              style={{ border: "none" }}
              type="file"
              name="itemImage"
              className="item_image"
              id="item_image"
              onChange={(event) => {
                setItemImage(event.target.files[0]);
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
              onClick={editImage}
            >
              Update Image
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default editItemImage;
