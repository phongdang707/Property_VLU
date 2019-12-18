var express = require("express");
const route = express.Router();
const installementContract = require("./installementContract.router");

route.post(
  "/addInstallmentContract",
  installementContract.addInstallmentContract
);

route.get("/", installementContract.getInstallmentContract);
// route.get("/:id", propertyFullContract.getFullContractById);

// route.delete("/deleteAll", propertyFullContract.deleteAll);
route.delete("/:id", installementContract.deleteById);
module.exports = route;
