const _ = require("lodash");
const validator = require("validator");
const { property } = require("../model/property");
const validatePostInput = async data => {
  // // data {email, password, DOB, userType,... }
  // let errors = {};
  // data.propertyName = _.get(data, "propertyName", "");
  // // property
  // if (validator.isEmpty(data.propertyName)) {
  //   errors.propertyName = "propertyName is required";
  // }
  // return {
  //   isValid: _.isEmpty(errors), // true (pass het tat ca validate), false (ko pass it nhat 1 field)
  //   errors // {email: email da ton tai, password: phai it nhat 8 ky tu}
  // };
};

module.exports = {
  validatePostInput
};
