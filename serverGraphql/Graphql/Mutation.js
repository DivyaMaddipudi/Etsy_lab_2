const { Customer, Items, User } = require("../Graphql/TypeDef");
const UserController = require("../controller/User");
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLFloat,
} = require("graphql");

const mutation = new GraphQLObjectType({
  name: "userMutation",
  fields: {
    register: {
      type: User,
      args: {
        // _id: { type: GraphQLString },
        username: { type: GraphQLString },
        email: { type: GraphQLString },
        // phoneNumber: { type: GraphQLString },
        password: { type: GraphQLString },
        // dob: { type: GraphQLString },
        // gender: { type: GraphQLString },
        // profilePicture: { type: GraphQLString },
        // fullAddress: { type: GraphQLString },
        // city: { type: GraphQLString },
        // about: { type: GraphQLString },
        // shopName: { type: GraphQLString },
        // shopImage: { type: GraphQLString },
      },
      resolve(parent, args) {
        UserController.create(args.username, args.email, args.password);
        return args;
      },
    },
    login: {
      type: User,
      args: {
        // _id: { type: GraphQLString },
        username: { type: GraphQLString },
        email: { type: GraphQLString },
        // phoneNumber: { type: GraphQLString },
        password: { type: GraphQLString },
        // dob: { type: GraphQLString },
        // gender: { type: GraphQLString },
        // profilePicture: { type: GraphQLString },
        // fullAddress: { type: GraphQLString },
        // city: { type: GraphQLString },
        // about: { type: GraphQLString },
        // shopName: { type: GraphQLString },
        // shopImage: { type: GraphQLString },
      },
      resolve(parent, args) {
        UserController.create(args.username, args.email, args.password);
        return args;
      },
    },
  },
});

module.exports = {
  mutation,
};
