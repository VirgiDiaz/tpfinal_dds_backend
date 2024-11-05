const {models} = require ('../../sequelize')


async function getAll(req, res) {
	const customers = await models.customers.findAll();
	res.status(200).json(customers);
};

async function create(req, res) {
	if (req.body.id) {
		res.status(400).send(`Bad request: ID should not be provided, since it is determined automatically by the database.`)
	} else {
		await models.customers.create(req.body);
		res.status(201).end();
	}
};
module.exports = {
    getAll,
    create
    
};
