const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  sequelize.define("sales", {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    methodOfPayment: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  });
};
