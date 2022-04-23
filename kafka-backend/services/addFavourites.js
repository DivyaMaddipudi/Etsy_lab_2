var favouritesDb = require("../schema/favourites");

async function handle_request(msg, callback) {
  console.log("handling add fav ");
  const userId = msg.userId;
  console.log(userId);
  const itemId = msg.itemId;

  const favourites = new favouritesDb({
    userId,
    itemId,
  });

  favourites
    .save(favourites)
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
