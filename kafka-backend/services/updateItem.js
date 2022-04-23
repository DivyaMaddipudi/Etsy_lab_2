var items = require("../schema/items");

async function handle_request(msg, callback) {
  console.log("In edit item -----------------------------");
  const itemId = msg.id;
  console.log(msg.id);
  const itemName = msg.body.itemName;
  const itemDescription = msg.body.itemDescription;
  const itemPrice = msg.body.itemPrice;
  const itemCount = msg.body.itemCount;
  items
    .updateOne(
      { _id: itemId },
      {
        itemName,
        itemDescription,
        itemPrice,
        itemCount,
      }
    )
    .then((data) => {
      if (!data) {
        console.log(data + " can't update item details");
      } else {
        console.log(data);
        console.log("item details updated successfully");
        callback(null, { data });
      }
    });
}

exports.handle_request = handle_request;
