// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");

var purchasesDb = require("../schema/purchases");

async function handle_request(msg, callback) {
  console.log("handling add to purchases ");

  const purchase = msg.product;

  console.log(purchase.itemId);
  const purchases = new purchasesDb({
    userId: purchase.userId,
    itemName: purchase.itemName,
    itemPrice: purchase.itemPrice,
    itemCount: purchase.itemCount,
    qty: purchase.qty,
    itemId: purchase.itemId,
    itemImage: purchase.itemImage,
    itemDescription: purchase.itemDescription,
    giftMessage: purchase.giftMessage,
  });

  purchases
    .save(purchases)
    .then((data) => {
      console.log(data);
      //   res.send({ success: true, result: data });
      callback(null, { success: true, result: data });
    })
    .catch((err) => {
      console.log(err);
      //   res.status(500).send({ message: "some error occured" });
      callback(null, { message: "some error occured" });
    });
}

exports.handle_request = handle_request;
