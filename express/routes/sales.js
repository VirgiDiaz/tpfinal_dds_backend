const {models} = require ('../../sequelize')


async function getAll(req, res) {
	const sales = await models.sales.findAll();
	res.status(200).json(sales);
};

async function create(req, res) {
	if (req.body.id) {
		res.status(400).send(`Bad request: ID should not be provided, since it is determined automatically by the database.`)
	} else {
		await models.sales.create(req.body);
		res.status(201).end();
	}
};
module.exports = {
    getAll,
    create
};
