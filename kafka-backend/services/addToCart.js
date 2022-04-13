// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");

var cartDb = require("../schema/cart");

async function handle_request(msg, callback) {
  console.log("handling add cart ");
  const userId = msg.userId;
  console.log(userId);
  const itemId = msg.itemId;
  console.log(itemId);
  const qty = msg.qty;

  const cart = new cartDb({
    userId: userId,
    itemId: itemId,
    qty: qty,
  });

  const isCartItemExist = await cartDb.exists({ itemId: itemId });

  if (isCartItemExist) {
    console.log("item already exist");

    cartDb
      .findOneAndUpdate({ itemId: itemId }, { qty: qty })
      .then((data) => {
        // console.log(data);
        callback(null, { success: true, result: data });

        // res.send({ success: true, result: data });
      })
      .catch((err) => {
        console.log(err);
        callback(null, { message: "some error occured" });

        // res.status(500).send({ message: "some error occured" });
      });
  } else {
    console.log("item not exist");
    cart
      .save(cart)
      .then((data) => {
        // console.log(data);
        callback(null, { success: true, result: data });

        // res.send({ success: true, result: data });
      })
      .catch((err) => {
        console.log(err);
        callback(null, { message: "some error occured" });

        // res.status(500).send({ message: "some error occured" });
      });
  }
}

exports.handle_request = handle_request;
