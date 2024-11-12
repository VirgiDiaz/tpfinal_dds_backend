const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  sequelize.define("locations", {
    city: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: /^[A-Za-zÁÉÍÓÚáéíóúñÑ ]{3,}$/,
      },
    },
    province: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        is: /^[A-Za-zÁÉÍÓÚáéíóúñÑ ]{3,}$/,
      },
    },
  });
};
