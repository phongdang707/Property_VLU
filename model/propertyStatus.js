const Sequelize = require("sequelize");
const db = require("../config/connectDB");
const batdongsan = require("./property");
console.log("property:sdsd ", batdongsan);

const propertyStatus = db.define("propertyStatus", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  PropertyStatusName: {
    type: Sequelize.STRING
  }
});

module.exports = propertyStatus;
