module.exports = (sequelize, DataTypes) => {
  const Cart = sequelize.define("Cart", {
    cartId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      unique: true,
      autoIncrement: true,
      primaryKey: true,
    },

    userId: {
      type: DataTypes.INTEGER(11),
      references: {
        model: "Users",
        key: "id",
      },
    },
    itemId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    orderId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
    },
    qty: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
    },
  });
  return Cart;
};
