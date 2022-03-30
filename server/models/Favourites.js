module.exports = (sequelize, DataTypes) => {
  const Favourites = sequelize.define("Favourites", {
    favId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      unique: true,
      autoIncrement: true,
      primaryKey: true,
    },
    itemId: {
      type: DataTypes.INTEGER(11),
      references: {
        model: "Items",
        key: "itemId",
      },
    },
    userId: {
      type: DataTypes.INTEGER(11),
      references: {
        model: "Users",
        key: "id",
      },
    },
  });
  return Favourites;
};
