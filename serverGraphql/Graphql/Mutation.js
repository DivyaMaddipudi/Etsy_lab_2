const {
  Customer,
  Items,
  User,
  Cart,
  CartItem,
  Purchases,
} = require("../Graphql/TypeDef");
const UserController = require("../controller/User");
const Userdb = require("../models/model");
const Itemsdb = require("../models/items");
const cartdb = require("../models/cart");
const purchasesdb = require("../models/purchases");

const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLUpload,
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

    addToCart: {
      type: CartItem,
      args: {
        userId: { type: GraphQLString },
        itemId: { type: GraphQLString },
        qty: { type: GraphQLInt },
      },
      async resolve(parent, args) {
        const cart = new cartdb({
          userId: args.userId,
          itemId: args.itemId,
          qty: args.qty,
        });
        const isCartItemExist = await cartdb.exists({ itemId: args.itemId });
        if (isCartItemExist) {
          console.log("item already exist");
          await cartdb.findOneAndUpdate(
            { itemId: args.itemId },
            { qty: args.qty }
          );
          console.log("qty updated");
        } else {
          console.log("item not exist");
          cart.save(cart);
        }
        return cart;
      },
    },
    deleteFromCart: {
      type: CartItem,
      args: {
        itemId: { type: GraphQLString },
      },
      async resolve(parent, args) {
        const cart = await cartdb.findOneAndDelete({ itemId: args.itemId });
        console.log(cart);
        return cart;
      },
    },
    addItemToPurchases: {
      type: Purchases,
      args: {
        itemId: { type: GraphQLString },
        userId: { type: GraphQLString },
        itemName: { type: GraphQLString },
        itemImage: { type: GraphQLString },
        itemCount: { type: GraphQLInt },
        totalPrice: { type: GraphQLFloat },
        qty: { type: GraphQLInt },
        itemDescription: { type: GraphQLString },
        giftMessage: { type: GraphQLString },
      },
      async resolve(parent, args) {
        const purchases = new purchasesdb({
          userId: args.userId,
          itemName: args.itemName,
          itemPrice: args.itemPrice,
          itemCount: args.itemCount,
          qty: args.qty,
          itemId: args.itemId,
          itemImage: args.itemImage,
          itemDescription: args.itemDescription,
          giftMessage: args.giftMessage,
        });

        await purchases.save(purchases);
        return args;
      },
    },
    editItemQtyById: {
      type: Items,
      args: {
        itemId: { type: GraphQLString },
        itemCount: { type: GraphQLInt },
        sales: { type: GraphQLInt },
      },
      async resolve(parent, args) {
        const items_update = Itemsdb.findByIdAndUpdate(
          { _id: args.itemId },
          {
            itemCount: args.itemCount,
            sales: args.sales,
          },
          {
            new: true,
          }
        );
        console.log(items_update);
        return items_update;
      },
    },
    clearCart: {
      type: CartItem,
      async resolve(parent, args) {
        const cartDel = await cartdb.deleteMany({});
        return cartDel;
      },
    },

    // addShopItem: {
    //   type: Items,
    //   args: {
    //     userId: { type: GraphQLString },
    //     itemName: { type: GraphQLString },
    //     itemCategory: { type: GraphQLString },
    //     itemPrice: { type: GraphQLString },
    //     itemDescription: { type: GraphQLString },
    //     itemCount: { type: GraphQLString },
    //     itemImage: { type: GraphQLUpload },
    //     sales: { type: GraphQLInt },
    //   },
    //   async resolve(parent, args) {
    //     const uploadSingle = upload("etsyappstoragelab").single("itemImage");
    //     uploadSingle(req, res, async (err) => {
    //       const product = new Itemsdb({
    //         userId: args.userId,
    //         itemName: args.itemName,
    //         itemCategory: args.itemCategory,
    //         itemPrice: args.itemPrice,
    //         itemDescription: args.itemDescription,
    //         itemCount: args.itemCount,
    //         itemImage: args.itemImage,
    //       });

    //       await product.save(product);
    //     });
    //   },
    // },
  },
});

// const upload = (bucketName) =>
//   multer({
//     storage: multerS3({
//       s3,
//       bucket: bucketName,
//       metadata: function (req, file, cb) {
//         cb(null, { fieldName: file.fieldname });
//       },
//       key: function (req, file, cb) {
//         cb(null, `ProductImage-${Date.now()}.jpeg`);
//       },
//     }),
//   });

module.exports = {
  mutation,
};
