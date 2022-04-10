//import the require dependencies
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var cors = require("cors");
var kafka = require("./kafka/client");
//use cors to allow cross origin resource sharing
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(bodyParser.json());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Allow Access Control

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT,DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  res.setHeader("Cache-Control", "no-cache");
  next();
});

//Route to get All Books when user visits the Home Page
/*app.get('/books', function(req,res){   
    res.writeHead(200,{
        'Content-Type' : 'application/json'
    });
    res.end(JSON.stringify(books));
    
});
*/

app.post("/api/users/register", function (req, res) {
  console.log(req.body + " IN USER REGISTER POST");
  kafka.make_request("add_user", req.body, function (err, results) {
    console.log(req.body + " ----------------------------------");
    console.log(req.body.email + " ----------------------------------");
    console.log(req.body.username + " ----------------------------------");
    console.log("in result");
    if (err) {
      console.log(err);
      console.log("Inside err");
      res.json({
        status: "error",
        msg: "System Error, Try Again.",
      });
    } else {
      console.log("Inside else");
      console.log(results);
      res.json({
        updatedList: results,
      });

      res.end();
    }
  });
});

app.post("/api/users/signin", function (req, res) {
  console.log(req.body + " IN USER signin POST");
  kafka.make_request("add_user", req.body, function (err, results) {
    console.log(req.body + " ----------------------------------");
    console.log(req.body.email + " ----------------------------------");
    console.log(req.body.username + " ----------------------------------");
    console.log("in result");
    if (err) {
      console.log(err);
      console.log("Inside err");
      res.json({
        status: "error",
        msg: "System Error, Try Again.",
      });
    } else {
      console.log("Inside else");
      console.log(results);
      res.json({
        updatedList: results,
      });

      res.end();
    }
  });
});

app.post("/book", function (req, res) {
  kafka.make_request("post_book", req.body, function (err, results) {
    console.log(req.body + " ----------------------------------");
    console.log(req.body.BookID + " ----------------------------------");
    console.log(req.body.Author + " ----------------------------------");

    console.log("in result");
    if (err) {
      console.log(err);

      console.log("Inside err");
      res.json({
        status: "error",
        msg: "System Error, Try Again.",
      });
    } else {
      console.log("Inside else");
      console.log(results);
      res.json({
        updatedList: results,
      });

      res.end();
    }
  });
});
//start your server on port 3001
app.listen(4001);
console.log("Server Listening on port 4001");
