const Sequelize = require("sequelize");
const db = require("../config/connectDB");

const service = db.define("user", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  UserName: {
    type: Sequelize.STRING
  },
  PassWord: {
    type: Sequelize.STRING
  }
});

module.exports = service;
