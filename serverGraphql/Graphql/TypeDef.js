const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLFloat,
  GraphQLInputObjectType,
} = require("graphql");

const User = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    _id: { type: GraphQLString },
    username: { type: GraphQLString },
    email: { type: GraphQLString },
    phoneNumber: { type: GraphQLString },
    password: { type: GraphQLString },
    dob: { type: GraphQLString },
    gender: { type: GraphQLString },
    profilePicture: { type: GraphQLString },
    fullAddress: { type: GraphQLString },
    city: { type: GraphQLString },
    about: { type: GraphQLString },
    shopName: { type: GraphQLString },
    shopImage: { type: GraphQLString },
  }),
});

const Items = new GraphQLObjectType({
  name: "Items",
  fields: () => ({
    _id: { type: GraphQLString },
    userId: { type: GraphQLString },
    itemName: { type: GraphQLString },
    itemCategory: { type: GraphQLString },
    itemPrice: { type: GraphQLInt },
    itemDescription: { type: GraphQLString },
    itemCount: { type: GraphQLInt },
    itemImage: { type: GraphQLString },
    sales: { type: GraphQLInt },
  }),
});

const Cart = new GraphQLObjectType({
  name: "Cart",
  fields: () => ({
    itemId: { type: Items },
    userId: { type: GraphQLString },
    qty: { type: GraphQLInt },
  }),
});

const CartItem = new GraphQLObjectType({
  name: "CartItem",
  fields: () => ({
    itemId: { type: GraphQLString },
    userId: { type: GraphQLString },
    qty: { type: GraphQLInt },
  }),
});

const Purchases = new GraphQLObjectType({
  name: "Purchases",
  fields: () => ({
    _id: { type: GraphQLString },
    itemId: { type: GraphQLString },
    userId: { type: GraphQLString },
    itemName: { type: GraphQLString },
    itemImage: { type: GraphQLInt },
    itemCount: { type: GraphQLFloat },
    itemPrice: { type: GraphQLInt },
    qty: { type: GraphQLInt },
    itemDescription: { type: GraphQLString },
    giftMessage: { type: GraphQLString },
  }),
});
module.exports = {
  User,
  Items,
  Cart,
  CartItem,
  Purchases,
};
