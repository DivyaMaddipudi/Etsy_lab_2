const { Customer, Items, User } = require("../Graphql/TypeDef");
const UserController = require("../controller/User");
const Userdb = require("../models/model");

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
        username: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      resolve(parent, args) {
        UserController.create(args.username, args.email, args.password);
        return args;
      },
    },
    findShopDuplicates: {
      type: User,
      args: {
        shopName: { type: GraphQLString },
      },
      async resolve(parent, args) {
        const shopAvailability = await Userdb.findOne({
          shopName: args.shopName,
        }).count();
        if (shopAvailability !== 0) {
          console.log("in db");
          throw new Error("shop name already exists db");
        }
        return args;
      },
    },
    createShop: {
      type: User,
      args: {
        id: { type: GraphQLString },
        shopName: { type: GraphQLString },
      },
      async resolve(parent, args) {
        const data = await Userdb.findByIdAndUpdate(
          { _id: args.id },
          {
            shopName: args.shopName,
          }
        );
        console.log(data);
        if (!data) {
          console.log(data + " can't update shopname");
          throw new Error("Can't update shopname");
        }
        return args;
      },
    },
  },
});

module.exports = {
  mutation,
};
