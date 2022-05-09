module.exports = (sequelize, DataTypes) => {
  const Items = sequelize.define("Items", {
    itemId: {
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
    itemName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    itemCategory: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    itemPrice: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    itemDescription: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    itemCount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    itemImage: {
      type: DataTypes.STRING,
    },
    sales: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  });
  return Items;
};
