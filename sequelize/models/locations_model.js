
const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
	sequelize.define('locations', {
        ciudad: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          provincia: {
            type: DataTypes.STRING,
            allowNull: true,
          },
});}

