const Sequelize = require("sequelize");
const db = require("../config/connectDB");
const property = require("./property");

const installmentContract = db.define(
  "installmentContract",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    InstallmentContractCode: {
      type: Sequelize.STRING
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
      type: Sequelize.STRING
    },
    InstallmentPaymentMethod: {
      type: Sequelize.STRING
    },
    PaymentPeriod: {
      type: Sequelize.STRING
    },
    DateOfContract: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
    },
    Price: {
      type: Sequelize.STRING
    },
    Deposit: {
      type: Sequelize.STRING
    },
    Remain: {
      type: Sequelize.STRING
    },
    Status: {
      type: Sequelize.STRING
    },
    Taken: {
      type: Sequelize.STRING
    },
    LoanAmount: {
      type: Sequelize.STRING
    }
  },
  { freezeTableName: true }
);

//Relations
property.hasOne(installmentContract, { foreignKey: "id" });
installmentContract.belongsTo(property, { foreignKey: "PropertyID" });

module.exports = installmentContract;
