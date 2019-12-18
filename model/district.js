const Sequelize = require("sequelize");
const db = require("../config/connectDB");
const city = require("./city");

const district = db.define("district", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  CityID: {
    type: Sequelize.STRING
  },
  DistrictName: {
    type: Sequelize.STRING
  }
});
city.hasMany(district, { foreignKey: "id" });
district.belongsTo(city, { foreignKey: "CityID" });

module.exports = district;
