const {models} = require ('../../sequelize')


async function getAll(req, res) {
	const products = await models.products.findAll();
	res.status(200).json(products);
};

async function create(req, res) {
	if (req.body.id) {
		res.status(400).send(`Bad request: ID should not be provided, since it is determined automatically by the database.`)
	} else {
		await models.products.create(req.body);
		res.status(201).end();
	}
};

async function getById(req, res) {
	const id = getIdParam(req);
	const products = await models.products.findByPk(id);
	if (products) {
		res.status(200).json(products);
	} else {
		res.status(404).send('404 - Not found');
	}
}; 


module.exports = {
    getAll,
    create,
    getById

    
};
