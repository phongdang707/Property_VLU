const Sequelize = require("sequelize");
const db = require("../config/connectDB");

const service = db.define("service", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  ServiceName: {
    type: Sequelize.STRING
  }
});

module.exports = service;
