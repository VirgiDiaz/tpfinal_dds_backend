const {models} = require ('../../sequelize')

async function create(req, res) {
	if (req.body.id) {
		res.status(400).send(`Bad request: ID should not be provided, since it is determined automatically by the database.`)
	} else {
		await models.sale_items.create(req.body);
		res.status(201).end();
	}
};
module.exports = {
   
    create
};
