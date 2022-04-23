var items = require("../schema/items");

async function handle_request(msg, callback) {
  console.log("get products based on id");
  const userId = msg.id;
  const term = msg.term;
  //   console.log(userId);
  console.log("get products based on id");
  if (term) {
    console.log("filtering in shop");
    await items
      .find({ userId: userId, itemName: { $regex: term, $options: "i" } })
      .then((products) => {
        console.log(products);
        callback(null, { products });
      });
  } else {
    console.log("getting all in shop");

    await items
      .find({ userId: userId })
      .then((products) => {
        // console.log(products);
        callback(null, { products });
      })
      .catch((err) => {
        callback(null, {
          success: false,
          message: "Unable to fetch products by specific id",
        });
      });
  }
}

exports.handle_request = handle_request;
