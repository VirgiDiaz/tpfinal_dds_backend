function applyExtraSetup(sequelize) {
	const { customers, locations, sales, products, sale_items } = sequelize.models;

	customers.belongsTo(locations);
	locations.hasMany(customers);
    sales.belongsTo(customers);
    customers.hasMany(sales);
    products.belongsToMany(sales, { through: sale_items });
    sales.belongsToMany(products, { through: sale_items });
}

module.exports = { applyExtraSetup };   