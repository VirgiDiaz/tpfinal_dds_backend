const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
	sequelize.define('customers', {
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER
		},
		name: {
			allowNull: false,
			type: DataTypes.STRING,
			validate: {
				is: /^\w{3,}$/
			}
		},
        lastName:{
            allowNull: false,
			type: DataTypes.STRING,
			validate: {
				is: /^\w{3,}$/
			}
        },
        phone:
        {
            allowNull: true,
            type:DataTypes.STRING,
            validate: {
                is: /^\d{3,}$/
              },
        },
        comment:
        {
            allowNull: true,
            type:DataTypes.STRING,
        },
	});

    

};