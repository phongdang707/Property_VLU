const property = require("../model/property");

function StandardCode(id) {
  var d = new Date();
  var n = d.getFullYear();
  let a = n.toString();
  var year = a.substr(2);
  const pad = "0000";
  const providerRandomCode =
    pad.substring(0, pad.length - id.toString().length) + id.toString();
  const providerCode = "P" + year + providerRandomCode;
  return providerCode;
}

module.exports = { StandardCode };
