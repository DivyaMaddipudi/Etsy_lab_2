var connection = new require("./kafka/Connection");
//topics files
//var signin = require('./services/signin.js');
var Books = require("./services/books.js");
var addUser = require("./services/addUser");
var addToCart = require("./services/addToCart");
var getFavs = require("./services/getFavs");
var addProduct = require("./services/addItemToShop");
var getProductsBasedOnId = require("./services/getProductsById");
var editProductById = require("./services/updateItem");
var addProuctsToPurchases = require("./services/addToPurchases");
const updateUser = require("./services/updateUser");
const addFavourites = require("./services/addFavourites");
// var createShop = require("./services/createShop");
// var signIn = require("./services/signin");

const dotenv = require("dotenv");
dotenv.config({ path: "config.env" });

const connectDB = require("./database/connection.js");
connectDB();

function handleTopicRequest(topic_name, fname) {
  //var topic_name = 'root_topic';
  console.log("In hadnle topic req");
  var consumer = connection.getConsumer(topic_name);
  var producer = connection.getProducer();
  console.log("server is running ");
  consumer.on("message", function (message) {
    console.log("message received for " + topic_name + " ", fname);
    console.log(JSON.stringify(message.value));
    var data = JSON.parse(message.value);

    fname.handle_request(data.data, function (err, res) {
      console.log("after handle" + res);
      var payloads = [
        {
          topic: data.replyTo,
          messages: JSON.stringify({
            correlationId: data.correlationId,
            data: res,
          }),
          partition: 0,
        },
      ];
      producer.send(payloads, function (err, data) {
        console.log(data);
      });
      return;
    });
  });
}
// Add your TOPICs here
//first argument is topic name
//second argument is a function that will handle this topic request
handleTopicRequest("post_book", Books);
handleTopicRequest("addUser", addUser);
handleTopicRequest("addToCart", addToCart);
handleTopicRequest("getFavourites", getFavs);
handleTopicRequest("addToShop", addProduct);
handleTopicRequest("getProductsById", getProductsBasedOnId);
handleTopicRequest("editProductById", editProductById);
handleTopicRequest("addToPurchase", addProuctsToPurchases);
handleTopicRequest("updateUser", updateUser);
handleTopicRequest("addFavourites", addFavourites);

// handleTopicRequest("create_shop", createShop);

// handleTopicRequest("add_user", signIn);
