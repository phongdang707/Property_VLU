var express = require("express");
const route = express.Router();
const propertyFullContract = require("./fullContract.router");

route.post("/addFullContract", propertyFullContract.addFullContract);

route.get("/", propertyFullContract.getFullContract);
route.get("/:id", propertyFullContract.getFullContractById);

route.delete("/deleteAll", propertyFullContract.deleteAll);
route.delete("/:id", propertyFullContract.deleteById);
module.exports = route;
