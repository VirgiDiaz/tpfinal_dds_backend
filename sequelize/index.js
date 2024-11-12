const { Sequelize } = require("sequelize");
const { applyExtraSetup } = require("./extra-setup");

const sequelize = new Sequelize("salesCRM", "UserCRM", "1234567890", {
  host: "localhost",
  dialect: "mssql",
  port: 1433,
  dialectOptions: {},
  logging: console.log,
});

const modelDefiners = [
  require("./models/customers.model"),
  require("./models/locations_model"),
  require("./models/sales.model"),
  require("./models/sale_items.model"),
  require("./models/products.model"),
];

for (const modelDefiner of modelDefiners) {
  modelDefiner(sequelize);
}

sequelize
  .sync()
  .then(() => {
    console.log("Base de datos y tablas sincronizadas.");
  })
  .catch((err) => {
    console.error("Error al sincronizar la base de datos:", err);
  });

applyExtraSetup(sequelize);
module.exports = sequelize;
