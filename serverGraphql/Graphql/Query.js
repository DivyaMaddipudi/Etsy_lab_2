const { User, Items, Cart } = require("../Graphql/TypeDef");
const UserController = require("../controller/User");
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLFloat,
} = require("graphql");
const Userdb = require("../models/model");
const itemsDb = require("../models/items");
const cartsdb = require("../models/cart");

const query = new GraphQLObjectType({
  name: "query",
  fields: {
    getItemsList: {
      type: new GraphQLList(Items),

      resolve(parent, args) {
        return itemsDb.find({});
      },
    },
    getCartList: {
      type: new GraphQLList(Cart),
      args: {
        userId: { type: GraphQLString },
      },
      async resolve(parent, args) {
        const cartItems = await cartsdb
          .find({ userId: args.userId })
          .populate("itemId")
          .exec();
        console.log(cartItems);

        return cartItems;
      },
    },
  },
});

module.exports = {
  query,
};
