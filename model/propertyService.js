const Sequelize = require("sequelize");
const db = require("../config/connectDB");
const service = require("./service");
const property = require("./property");
console.log("property: ", property);
const propertyService = db.define("propertyService", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  ServiceID: {
    type: Sequelize.INTEGER
  },
  PropertyID: {
    type: Sequelize.INTEGER
  }
});

service.hasMany(propertyService, { foreignKey: "id" });
propertyService.belongsTo(service, { foreignKey: "ServiceID" });

property.hasMany(propertyService, { foreignKey: "id" });
propertyService.belongsTo(property, { foreignKey: "PropertyID" });

module.exports = propertyService;
