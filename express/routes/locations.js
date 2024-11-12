const { models } = require("../../sequelize");
const { getIdParam } = require("../helpers");

async function getAll(req, res) {
  const locations = await models.locations.findAll();
  res.status(200).json(locations);
}

async function create(req, res) {
  if (req.body.id) {
    res
      .status(400)
      .send(
        `Bad request: ID should not be provided, since it is determined automatically by the database.`
      );
  } else {
    await models.locations.create(req.body);
    res.status(201).end();
  }
}

async function getById(req, res) {
  const id = getIdParam(req);
  const location = await models.locations.findByPk(id);
  if (location) {
    res.status(200).json(location);
  } else {
    res.status(404).send("404 - Not found");
  }
}

async function update(req, res) {
  const id = getIdParam(req);
  if (req.body.id === id) {
    await models.locations.update(req.body, {
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
  await models.locations.destroy({
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
