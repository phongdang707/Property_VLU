const Sequelize = require("sequelize");

module.exports = new Sequelize("team11", "root", "", {
  dialect: "mysql",
  host: "localhost",
  operatorAliases: false,
  timezone: "+07:00",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  define: {
    freezeTableName: true
  }
});
