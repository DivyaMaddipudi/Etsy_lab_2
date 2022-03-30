import Axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import CloseLogin from "../closeLogin";
import CategoryComponent from "./CategoryComponent";

function addProducts({ setShowProductsAddPage }) {
  const user = useSelector(selectUser);
  const [itemName, setItemName] = useState("");
  const [itemImage, setItemImage] = useState("");
  const [itemPrice, setItemPrice] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [itemCategory, setItemCategory] = useState("");
  const [itemCount, setItemCount] = useState(0);
  const [itemNewCategory, setItemNewCategory] = useState("");
  const [newCategoryVisible, setNewCategoryVisible] = useState(false);

  const addItem = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("itemImage", itemImage);
    formData.append("itemName", itemName);
    formData.append("itemDescription", itemDescription);
    formData.append("itemPrice", itemPrice);
    formData.append("itemCount", itemCount);
    if (itemCategory === "others") {
      formData.append("itemCategory", itemNewCategory);
    } else {
      formData.append("itemCategory", itemCategory);
    }
    // console.log(itemImage);
    // const itemDetails = {
    //   itemName: itemName,
    //   itemDescription: itemDescription,
    //   itemCount,
    //   itemPrice,
    // };

    Axios.post("http://localhost:4000/addProduct/" + user.id, formData, {
      headers: { "content-Type": "multipart/form-data" },
    }).then((response) => {
      console.warn(response);
      if (response.data.message === "success") {
        console.log("Image uploaded successfully");
        // window.location.pathname = "/shopHome";
      }
    });
    setShowProductsAddPage(false);
  };

  const enableNewCategory = () => {
    if (itemCategory === "others") {
      console.log("Others");
      setNewCategoryVisible(true);
    } else {
      console.log("Not others");
      setNewCategoryVisible(false);
    }
  };

  return (
    <div className="bg-modal">
      <div
        className="modal-content"
        style={{
          maxWidth: "450px",
          height: "650px",
          backgroundColor: "white",
          borderRadius: "20px !important",
          position: "relative",
        }}
      >
        <CloseLogin setshowSignIn={setShowProductsAddPage} />
        <h2 className="addProd_title">Add Item</h2>
        <form
          className="items_form "
          method="post"
          encType="multipart/form-data"
        >
          <div className="htmlForm-group">
            <label htmlFor="item_name">Item Name</label>
            <br />
            <input
              type="text"
              className="item_name"
              id="item_name"
              placeholder="Item Name"
              onChange={(event) => {
                setItemName(event.target.value);
              }}
              required
            />
          </div>

          <div className="htmlForm-group">
            <label htmlFor="category">Category</label>
            <br />
            <select
              onChange={(event) => {
                setItemCategory(event.target.value);
              }}
              // onClick={enableNewCategory}
              style={{
                width: "90%",
                height: "40px",
                border: "1px solid black",
                borderRadius: "4px",
              }}
            >
              <option value="jewellery">Jewellery</option>
              <option value="clothing">Clothing</option>
              <option value="entertainment">Entertainment</option>
              <option value="homeDecor">Home Decor</option>
              <option value="others">Others</option>
            </select>
          </div>

          {/* category component */}
          {itemCategory === "others" && (
            <div className="htmlForm-group">
              <label htmlFor="item_category">Item Category</label>
              <br />
              <input
                type="text"
                className="item_category"
                id="item_category"
                placeholder="Item Category"
                onChange={(event) => {
                  setItemNewCategory(event.target.value);
                }}
                required
              />
            </div>
          )}
          {/* <h1>{itemCategory}</h1> */}

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
          <div className="htmlForm-group">
            <label htmlFor="item_price">
              Item Price <sub>In dollars</sub>
            </label>
            <br />
            <input
              type="number"
              className="item_price"
              id="item_price"
              placeholder="Item Price"
              min="1"
              onChange={(event) => {
                setItemPrice(event.target.value);
              }}
              required
            />
          </div>

          <div className="htmlForm-group">
            <label htmlFor="item_des">Item Description</label>
            <br />
            <input
              type="text"
              className="item_des"
              id="item_des"
              placeholder="Item Description"
              onChange={(event) => {
                setItemDescription(event.target.value);
              }}
              required
            />
          </div>

          <div className="htmlForm-group">
            <label htmlFor="item_count">Item Count</label>
            <br />
            <input
              type="number"
              className="item_count"
              id="item_count"
              placeholder="Item Count"
              min="1"
              onChange={(event) => {
                setItemCount(event.target.value);
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
                border: "none",
                color: "white",
                backgroundColor: "gray",
              }}
              onClick={addItem}
            >
              Add Item
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default addProducts;
