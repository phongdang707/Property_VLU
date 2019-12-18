const Sequelize = require("sequelize");
const db = require("../config/connectDB");
const property = require("./property");

const fullContract = db.define(
  "fullContract",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    FullContractCode: {
      type: Sequelize.INTEGER
    },
    CustomerName: {
      type: Sequelize.STRING
    },
    YearOfBirth: {
      type: Sequelize.DATE
    },
    SSN: {
      type: Sequelize.STRING
    },
    CustomerAddress: {
      type: Sequelize.STRING
    },
    Mobile: {
      type: Sequelize.STRING
    },
    PropertyID: {
      type: Sequelize.INTEGER
    },
    DateOfContract: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
    },
    Price: {
      type: Sequelize.INTEGER
    },
    Deposit: {
      type: Sequelize.INTEGER
    },
    Remain: {
      type: Sequelize.STRING
    },
    Status: {
      type: Sequelize.STRING
    }
  },
  { freezeTableName: true }
);

//Relations
property.hasOne(fullContract, { foreignKey: "id" });
fullContract.belongsTo(property, { foreignKey: "PropertyID" });

module.exports = fullContract;
