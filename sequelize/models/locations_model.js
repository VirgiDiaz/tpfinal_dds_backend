
const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
	sequelize.define('locations', {
        city: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          province: {
            type: DataTypes.STRING,
            allowNull: true,
          },
});}

