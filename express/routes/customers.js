const { models} = require("../../sequelize");
const { getIdParam } = require("../helpers");
const { Sequelize } = require("sequelize");
const Op = Sequelize.Op;


async function getAll(req, res) {
  const { name, lastName, city } = req.query;

  const filterOptions = {};
  
  // Filtrar por nombre o apellido si están presentes
  if (name || lastName) {
    filterOptions[Op.or] = [];
    if (name) filterOptions[Op.or].push({ name: { [Op.like]: `%${name}%` } });
    if (lastName) filterOptions[Op.or].push({ lastName: { [Op.like]: `%${lastName}%` } });
  }

  // Filtrar por ciudad directamente si está presente
  if (city) {
    filterOptions["$location.city$"] = { [Op.like]: `%${city}%` };
  }

  try {
    const customers = await models.customers.findAll({
      where: filterOptions,
      include: {
        model: models.locations,
        as: "location", // asegúrate de que "location" sea el alias correcto en tu modelo
      },
    });
    res.status(200).json(customers);
  } catch (error) {
    console.error("Error al devolver clientes:", error);
    res.status(500).json({ message: "Error al devolver clientes" });
  }
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
