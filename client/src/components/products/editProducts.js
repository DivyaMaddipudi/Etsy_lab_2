import Axios from "axios";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import CloseLogin from "../closeLogin";

function editProducts({ setShowProductsEditPage, products, itemId }) {
  const user = useSelector(selectUser);
  const [itemName, setItemName] = useState("");
  const [itemImage, setItemImage] = useState("");
  const [itemPrice, setItemPrice] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [itemCategory, setItemCategory] = useState("");
  const [itemCount, setItemCount] = useState(0);
  const [product, setProduct] = useState();
  const [productExist, setProductExist] = useState(false);

  const itemDetails = {
    itemName: itemName,
    itemPrice: itemPrice,
    itemDescription: itemDescription,
    itemCategory: itemCategory,
    itemCount: itemCount,
  };

  const editItem = (e) => {
    // e.preventDefault();
    console.log("Inedit client axios");
    Axios.put(
      "http://localhost:4000/updateItemById/" + itemId,
      itemDetails
    ).then((response) => {
      if (response.data.success) {
        console.log("Item details edited successfully.....");
      }
    });
  };

  useEffect(() => {
    fetchItemDetails();
  }, []);

  const fetchItemDetails = () => {
    Axios.get("http://localhost:4000/getItemById/" + itemId).then(
      (response) => {
        if (response) {
          console.log(response.data[0]);
          setItemName(response.data[0].itemName);
          setItemDescription(response.data[0].itemDescription);
          setItemPrice(response.data[0].itemPrice);
          setItemCount(response.data[0].itemCount);
          setItemCategory(response.data[0].itemCategory);
          setProduct(response.data[0]);
          setProductExist(true);
          console.log("Products stored in product");
        }
      }
    );
  };
  return (
    <div className="bg-modal">
      <div className="modal-content">
        <CloseLogin setshowSignIn={setShowProductsEditPage} />
        <h2 className="addProd_title">Edit product</h2>
        {console.log("==================Hello===================")}
        {console.log(product)}
        {productExist ? (
          <form className="items_form" encType="multipart/form-data">
            <div className="htmlForm-group">
              <label htmlFor="item_name">Item Name</label>
              <br />
              <input
                type="text"
                className="item_name"
                id="item_name"
                //   placeholder="Item Name"
                defaultValue={product.itemName}
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
                defaultValue={product.itemCategory}
                onChange={(event) => {
                  setItemCategory(event.target.value);
                }}
                style={{
                  width: "90%",
                  height: "40px",
                  border: "1px solid black",
                  borderRadius: "4px",
                }}
              >
                <option value=""></option>
                <option value="jewellery">Jewellery</option>
                <option value="clothing">Clothing</option>
                <option value="entertainment">Entertainment</option>
                <option value="homeDecor">Home Decor</option>
                <option value="others">Others</option>
              </select>
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
                defaultValue={product.itemPrice}
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
                defaultValue={product.itemDescription}
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
                defaultValue={product.itemCount}
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
                  backgroundColor: "gray",
                  border: "none",
                  color: "white",
                }}
                onClick={editItem}
              >
                Edit Item
              </button>
            </div>
          </form>
        ) : (
          <div
            style={{
              display: "flex",
              height: "300px",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <h2>No items</h2>
          </div>
        )}
      </div>
    </div>
  );
}

export default editProducts;
