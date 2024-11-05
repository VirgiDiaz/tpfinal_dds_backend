
const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
	sequelize.define('sale_items', {
        amount: {
            type: DataTypes.INTEGER,
            allowNull: false,
          }
});}
