const Property = require("../../../model/property");
const PropertyType = require("../../../model/propertyType");
const PropertyStatus = require("../../../model/propertyStatus");
const PropertyService = require("../../../model/propertyService");
const District = require("../../../model/district");
const City = require("../../../model/city");
const Sequelize = require("sequelize");
const Service = require("../../../model/service");
const FullContract = require("../../../model/fullContract");
const Op = Sequelize.Op;

module.exports.addFullContract = async (req, res, next) => {
  try {
    let {
      PropertyID,
      CustomerAddress,
      CustomerName,
      DateOfContract,
      Deposit,
      Mobile,
      Price,
      Remain,
      SSN,
      Status,
      YearOfBirth
    } = req.body;
    console.log("req.body: ", req.body);
    function StandardCodeFullContract(id) {
      var d = new Date();
      var n = d.getFullYear();
      let a = n.toString();
      var year = a.substr(2);

      var d1 = new Date();
      var n1 = d1.getMonth();

      let month = n1.toString();

      // var month = b.substr(2);
      console.log("month: ", month);
      const pad = "0000";
      const providerRandomCode =
        pad.substring(0, pad.length - id.toString().length) + id.toString();
      const providerCode = "FC" + year + month + providerRandomCode;
      return providerCode;
    }

    let newFullContract = new FullContract({
      PropertyID: PropertyID,
      CustomerAddress: CustomerAddress,
      CustomerName: CustomerName,
      DateOfContract: DateOfContract,
      Deposit: Deposit,
      Mobile: Mobile,
      Price: Price,
      Remain: Remain,
      SSN: SSN,
      Status: Status,
      YearOfBirth: YearOfBirth
    });

    // let a = FullContract.create(req.body)

    let a = await newFullContract.save();
    console.log("a: ", a);
    let fullContractCode = StandardCodeFullContract(a.dataValues.id);
    console.log("fullContractCode: ", fullContractCode);
    let b = await newFullContract.update(
      {
        FullContractCode: fullContractCode
      },
      { where: { id: a.dataValues.id } }
    );
    result = await FullContract.findAll({
      include: [{ model: Property }]
    });
    result.sort().reverse();

    // console.log("a: ", a);
    res.status(200).json(b);
    // console.log(StandardCodeFullContract(12));

    // console.log(" req.body: ", req.body);
  } catch (error) {
    console.log(error);
  }
};

module.exports.getFullContract = async (req, res, next) => {
  try {
    let a = await FullContract.findAll({
      raw: true,
      include: [
        {
          model: Property
        }
      ]
    }).then(result => {
      result.sort().reverse();
      console.log("result", result);
      res.json(result);
    });

    // console.log(" req.body: ", req.body);
  } catch (error) {
    console.log(error);
  }
};
module.exports.getFullContractById = async (req, res, next) => {
  try {
    let { id } = req.params;
    let a = await FullContract.findAll({
      where: { id: id },
      include: [
        {
          model: Property
        }
      ]
    }).then(result => {
      console.log("result", result);
      res.json(result);
    });

    // console.log(" req.body: ", req.body);
  } catch (error) {
    console.log(error);
  }
};
module.exports.deleteAll = async (req, res, next) => {
  try {
    FullContract.destroy({
      where: {},
      truncate: true
    });
    // let a = await FullContract.destroy().then(result => {
    //   console.log("result", result);
    //   res.json(result);
    // });
    // let a = await FullContract.destroy();
    // console.log("a: ", a);
    // console.log(" req.body: ", req.body);
  } catch (error) {
    console.log(error);
  }
};
module.exports.deleteById = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log("id: ", id);
    let a = await FullContract.destroy({
      where: { id }
    });
    await FullContract.findAll({
      include: [
        {
          model: Property
        }
      ]
    }).then(result => {
      result.sort().reverse();
      return res.status(200).json(result);
    });
    // FullContract.destroy({
    //   where: {},
    //   truncate: true
    // });
    // let a = await FullContract.destroy().then(result => {
    //   console.log("result", result);
    //   res.json(result);
    // });
    // let a = await FullContract.destroy();
    // console.log("a: ", a);
    // console.log(" req.body: ", req.body);
  } catch (error) {
    console.log(error);
  }
};
