const Sequelize = require("sequelize");
const db = require("../config/connectDB");
const propertyType = require("./propertyType");
const district = require("./district");
const propertyStatus = require("./propertyStatus");
// const propertyService = require("./propertyService");

const property = db.define("property", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  PropertyCode: {
    type: Sequelize.STRING
  },
  PropertyName: {
    type: Sequelize.STRING
  },
  PropertyTypeID: {
    type: Sequelize.INTEGER
  },
  Description: {
    type: Sequelize.STRING
  },
  DistrictID: {
    type: Sequelize.INTEGER
  },
  Address: {
    type: Sequelize.STRING
  },
  Area: {
    type: Sequelize.INTEGER
  },
  BedRoom: {
    type: Sequelize.INTEGER
  },
  BathRoom: {
    type: Sequelize.INTEGER
  },
  Price: {
    type: Sequelize.INTEGER
  },
  InstallmentRate: {
    type: Sequelize.STRING
  },
  Avatar: {
    type: Sequelize.STRING
  },
  Album: {
    type: Sequelize.ARRAY(Sequelize.DECIMAL)
  },
  PropertyStatusID: {
    type: Sequelize.INTEGER
  },
  PropertyServiceID: {
    type: Sequelize.INTEGER
  }
});
//Relations
propertyType.hasMany(property, { foreignKey: "id" });
property.belongsTo(propertyType, { foreignKey: "PropertyTypeID" });

district.hasMany(property, { foreignKey: "id" });
property.belongsTo(district, { foreignKey: "DistrictID" });

propertyStatus.hasOne(property, { foreignKey: "id" });
property.belongsTo(propertyStatus, { foreignKey: "PropertyStatusID" });

// property.hasMany(propertyService, { foreignKey: "PropertyServiceID" });
// propertyService.belongsTo(property, { foreignKey: "PropertyServiceID" });

module.exports = property;
