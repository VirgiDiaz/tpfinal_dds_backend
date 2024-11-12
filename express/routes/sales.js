const { models } = require("../../sequelize");
const { getIdParam } = require("../helpers");

async function getAll(req, res) {
  const sales = await models.sales.findAll();
  res.status(200).json(sales);
}

async function create(req, res) {
  try {
    if (req.body.id) {
      res
        .status(400)
        .send(
          "Bad request: ID should not be provided, since it is determined automatically by the database."
        );
    } else {
      const sale = await models.sales.create(req.body);
      res.status(201).json(sale);
    }
  } catch (error) {
    console.error("Error al crear la venta:", error);
    res.status(500).send("Error al crear la venta.");
  }
}

async function listProducts(req, res) {
  const saleId = getIdParam(req);
  const sale = await models.sales.findByPk(saleId, {
    include: {
      model: models.products,
      as: "products",
    },
  });
  if (sale) {
    res.status(200).json(sale.products);
  } else {
    res.status(404).send("404 - Not found");
  }
}

async function addProduct(req, res) {
  const saleId = getIdParam(req);
  const sale = await models.sales.findByPk(saleId);
  if (!sale) {
    res.status(404).send("404 - Not found");
    return;
  }

  const productId = req.body.productId;
  const amount = req.body.amount;

  const product = await models.products.findByPk(productId);
  if (!product) {
    res.status(400).send("400 - Bad request: item not found");
    return;
  }

  await sale.addProduct(product, { through: { amount } });

  res.status(201).end();
}
async function remove(req, res) {
  const id = getIdParam(req);
  await models.sales.destroy({
    where: {
      id: id,
    },
  });
  res.status(200).end();
}

async function getById(req, res) {
  const id = getIdParam(req);
  const sale = await models.sales.findByPk(id);
  if (sale) {
    res.status(200).json(sale);
  } else {
    res.status(404).send("404 - Not found");
  }
}

async function update(req, res) {
  const id = getIdParam(req);
  if (req.body.id === id) {
    await models.sales.update(req.body, {
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

module.exports = {
  getAll,
  create,
  listProducts,
  addProduct,
  remove,
  update,
  getById,
};
