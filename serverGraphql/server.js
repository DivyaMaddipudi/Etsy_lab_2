const express = require("express");
const mongoose = require("mongoose");
const indexRouter = require("./routes/index");
const morgan = require("morgan");
const cors = require("cors");

const dotenv = require("dotenv");
const bodyParse = require("body-parser");
const connectDB = require("./database/connection");

const app = express();
app.use(express.json());

dotenv.config({ path: "config.env" });
const PORT = process.env.PORT || 4000;
app.use(morgan("short"));

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
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type",
    "Authorization"
  );
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

const { GraphQLSchema } = require("graphql");
const { query } = require("./Graphql/Query");
const { mutation } = require("./Graphql/Mutation");
// const isAuth = require("./is-auth");

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

//mongodb connection
connectDB();

//parse request to body-parser
// app.use(isAuth);
app.use(bodyParse.urlencoded({ extended: true }));

//load routers
// app.use("/", require("./routes/router"));
// app.use("/", require("./routes/productsRouter"));
// const schema = require("./Schemas");

const { graphqlHTTP } = require("express-graphql");
const schema = new GraphQLSchema({
  query: query,
  mutation: mutation,
});
// app.listen(3003, () => console.log("server running"));
app.use("/graphql", graphqlHTTP({ schema, graphiql: true }));

module.exports = app.listen(4002, () => console.log("Server Started " + 4002));
