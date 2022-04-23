var items = require("../schema/items");

async function handle_request(msg, callback) {
  //   console.log("get products based on id");
  const userId = msg.id;
  //   console.log(userId);
  console.log("get products based on id");
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

exports.handle_request = handle_request;
