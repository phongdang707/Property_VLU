const Sequelize = require("sequelize");
const db = require("../config/connectDB");

const propertyType = db.define("propertyType", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  PropertyTypeName: {
    type: Sequelize.STRING
  },
  PropertyAmount: {
    type: Sequelize.INTEGER
  }
});

module.exports = propertyType;
