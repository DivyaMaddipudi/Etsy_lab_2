var favouritesDb = require("../schema/favourites");

async function handle_request(msg, callback) {
  console.log("handling get fav ");
  const userId = msg.id;
  console.log(userId);
  console.log("Get favourites");
  await favouritesDb
    .find({ userId })
    .populate("itemId")
    .then((favItems) => {
      console.log(favItems);
      callback(null, { result: favItems });
    })
    .catch((err) => {
      callback(null, { err });
    });
}

exports.handle_request = handle_request;
