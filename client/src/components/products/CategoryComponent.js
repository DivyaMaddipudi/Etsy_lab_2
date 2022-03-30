import React, { useState } from "react";

function CategoryComponent() {
  const [ItemNewCategory, setItemNewCategory] = useState("");
  return (
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
  );
}

export default CategoryComponent;
