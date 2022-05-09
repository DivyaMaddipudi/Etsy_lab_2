const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
} = require("graphql");
const { GraphQLSchema } = require("graphql");
const Userdb = require("../models/model");
const UserType = require("./TypeDefs/UserType");
const userController = require("../controller/User");
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
        const req = new Userdb({
          username: args.username,
          email: args.email,
          password: args.password,
        });

        // save user in the db
        // user.save(user);
        userController.create(req);
        return args;
      },
    },
  },
});

module.exports = new GraphQLSchema({ query: RootQuery, mutation: Mutation });
