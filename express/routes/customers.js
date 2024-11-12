const { models } = require("../../sequelize");
const { getIdParam } = require("../helpers");

async function getAll(req, res) {
  const customers = await models.customers.findAll();
  res.status(200).json(customers);
}

async function create(req, res) {
  if (req.body.id) {
    res
      .status(400)
      .send(
        `Bad request: ID should not be provided, since it is determined automatically by the database.`
      );
  } else {
    await models.customers.create(req.body);
    res.status(201).end();
  }
}
async function listSales(req, res) {
  const customerId = getIdParam(req);
  const customer = await models.customers.findByPk(customerId, {
    include: {
      model: models.sales,
      as: "sales",
    },
  });
  if (customer) {
    res.status(200).json(customer.sales);
  } else {
    res.status(404).send("404 - Not found");
  }
}

async function update(req, res) {
  const id = getIdParam(req);
  if (req.body.id === id) {
    await models.customers.update(req.body, {
      where: {
        id: id,
      },
    });
    res.status(200).end();
  } else {
    res
      .status(400)
      .send(
        `Bad request: param ID (${id}) does not match body ID (${req.body.id}).`
      );
  }
}
async function remove(req, res) {
  const id = getIdParam(req);
  await models.customers.destroy({
    where: {
      id: id,
    },
  });
  res.status(200).end();
}

async function getById(req, res) {
  const id = getIdParam(req);
  const customer = await models.customers.findByPk(id);
  if (customer) {
    res.status(200).json(customer);
  } else {
    res.status(404).send("404 - Not found");
  }
}
module.exports = {
  getAll,
  create,
  listSales,
  update,
  remove,
  getById,
};
