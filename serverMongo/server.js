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

app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

//mongodb connection
connectDB();

//parse request to body-parser
app.use(bodyParse.urlencoded({ extended: true }));

//load routers
app.use("/", require("./routes/router"));
app.use("/", require("./routes/productsRouter"));

const { GraphQLList } = require("graphql");
const { GraphQLSchema } = require("graphql");
const {
  graphql,
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
} = require("graphql");
const Userdb = require("./models/model");
const { graphqlHTTP } = require("express-graphql");

const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLInt },
    username: { type: GraphQLString },
    email: { type: GraphQLString },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    getAllUsers: {
      type: new GraphQLList(UserType),
      args: { id: { type: GraphQLString } },
      resolve(parent, args) {
        return Userdb.find({});
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    createUser: {
      type: UserType,
      args: {
        username: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      resolve(parent, args) {
        const user = new Userdb({
          username: args.username,
          email: args.email,
          password: args.password,
        });

        // save user in the db
        user.save(user);
        return args;
      },
    },
  },
});

const schema = new GraphQLSchema({ query: RootQuery, mutation: Mutation });

app.use("/graphql", graphqlHTTP({ schema, graphiql: true }));

// app.listen(3003, () => console.log("server running"));

module.exports = app.listen(PORT, () => console.log("Server Started " + PORT));
