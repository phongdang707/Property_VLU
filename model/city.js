const Sequelize = require("sequelize");
const db = require("../config/connectDB");
const district = require("./district");
const city = db.define("city", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  CityName: {
    type: Sequelize.STRING
  }
});
// city.hasMany(district);
// district.belongsTo(city);
// city.hasMany(district, { foreignKey: "id" });
// district.belongsTo(city, { foreignKey: "CityID" });
module.exports = city;
