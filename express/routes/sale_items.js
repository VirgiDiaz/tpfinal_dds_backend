const { models } = require("../../sequelize");

async function create(req, res) {
  if (req.body.id) {
    res
      .status(400)
      .send(
        `Bad request: ID should not be provided, since it is determined automatically by the database.`
      );
  } else {
    await models.sale_items.create(req.body);
    res.status(201).end();
  }
}
async function update(req, res) {
  const saleId = req.body.saleId;
  const productId = req.body.productId;
  const amount = req.body.amount;

  if (!saleId || !productId) {
    res.status(400).send("Bad request: 'saleId' and 'productId' are required.");
    return;
  }
  const [updated] = await models.sale_items.update(
    { amount },
    {
      where: {
        saleId: saleId,
        productId: productId,
      },
    }
  );

  if (updated) {
    res
      .status(200)
      .send("La cantidad del producto fue actualizada exitosamente.");
  } else {
    res.status(404).send("Producto no encontrado.");
  }
}

async function remove(req, res) {
  const saleId = req.body.saleId;
  const productId = req.body.productId;
  if (!saleId || !productId) {
    res.status(400).send("Bad request: 'saleId' and 'productId' are required.");
    return;
  }
  const removed = await models.sale_items.destroy({
    where: {
      saleId: saleId,
      productId: productId,
    },
  });
  if (removed) {
    res.status(200).send("El producto fue eliminado exitosamente.");
  } else {
    res.status(404).send("Producto no encontrado.");
  }
}

module.exports = {
  create,
  update,
  remove,
};
