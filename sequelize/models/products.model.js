
const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
	sequelize.define('products', {
        name: {
			allowNull: false,
			type: DataTypes.STRING,
			validate: {
				is: /^\w{3,}$/
			},
        category: {
            type: DataTypes.STRING,
            allowNull: true,
          },
        description: 
        {
            type: DataTypes.STRING,
            allowNull: true,
        },}
});}
