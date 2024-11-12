const { models } = require("../../sequelize");
const { getIdParam } = require("../helpers");

async function getAll(req, res) {
  const products = await models.products.findAll();
  res.status(200).json(products);
}

async function create(req, res) {
  if (req.body.id) {
    res
      .status(400)
      .send(
        `Bad request: ID should not be provided, since it is determined automatically by the database.`
      );
  } else {
    await models.products.create(req.body);
    res.status(201).end();
  }
}

async function getById(req, res) {
  const id = getIdParam(req);
  const products = await models.products.findByPk(id);
  if (products) {
    res.status(200).json(products);
  } else {
    res.status(404).send("404 - Not found");
  }
}
async function update(req, res) {
  const id = getIdParam(req);
  if (req.body.id === id) {
    await models.products.update(req.body, {
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
  await models.products.destroy({
    where: {
      id: id,
    },
  });
  res.status(200).end();
}

module.exports = {
  getAll,
  create,
  getById,
  update,
  remove,
};
