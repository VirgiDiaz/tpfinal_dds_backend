const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");

const routes = {
  customers: require("./routes/customers"),
  locations: require("./routes/locations"),
  sales: require("./routes/sales"),
  sale_items: require("./routes/sale_items"),
  products: require("./routes/products"),
};

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

function makeHandlerAwareOfAsyncErrors(handler) {
  return async function (req, res, next) {
    try {
      await handler(req, res);
    } catch (error) {
      next(error);
    }
  };
}

for (const [routeName, routeController] of Object.entries(routes)) {
  if (routeController.getAll) {
    app.get(
      `/api/${routeName}`,
      makeHandlerAwareOfAsyncErrors(routeController.getAll)
    );
  }
  if (routeController.getById) {
    app.get(
      `/api/${routeName}/:id`,
      makeHandlerAwareOfAsyncErrors(routeController.getById)
    );
  }
  if (routeController.create) {
    app.post(
      `/api/${routeName}`,
      makeHandlerAwareOfAsyncErrors(routeController.create)
    );
  }
  if (routeController.update) {
    app.put(
      `/api/${routeName}/:id`,
      makeHandlerAwareOfAsyncErrors(routeController.update)
    );
  }
  if (routeController.remove) {
    app.delete(
      `/api/${routeName}/:id`,
      makeHandlerAwareOfAsyncErrors(routeController.remove)
    );
  }
}

app.get(
  `/api/customers/:id/sales`,
  makeHandlerAwareOfAsyncErrors(routes.customers.listSales)
);
app.get(
  `/api/sales/:id/products`,
  makeHandlerAwareOfAsyncErrors(routes.sales.listProducts)
);

app.post(
  `/api/sales/:id/products`,
  makeHandlerAwareOfAsyncErrors(routes.sales.addProduct)
);

app.put(
  "/api/sales/:saleId/items/:productId",
  makeHandlerAwareOfAsyncErrors(routes.sale_items.update)
);
app.delete(
  "/api/sales/:saleId/items/:productId",
  makeHandlerAwareOfAsyncErrors(routes.sale_items.remove)
);

module.exports = app;
