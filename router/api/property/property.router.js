// import { StandardCode } from "../../../helpers/standard_code";
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
var validator = require("validator");
const { validatePostInput } = require("../../../validator/index");

// const sequelize = require("sequelize");

module.exports.createProperty = async (req, res, next) => {
  try {
    let errors = {};
    let {
      service,
      propertyName,
      propertyTypeID,
      description,
      districtID,
      address,
      area,
      bedRoom,
      bathRoom,
      price,
      installmentRate,
      propertyStatusID,
      PropertyServiceID,
      Service
    } = req.body;
    var ServiceID = Service.split(",");

    area = Number(area);

    console.log("area: ", area);
    bedRoom = Number(bedRoom);
    bathRoom = Number(bathRoom);
    price = Number(price);
    if (
      propertyName === undefined ||
      propertyName === "" ||
      propertyName == null
    ) {
      errors.propertyName = "Vui lòng nhập tên bất động sản";
      // return res.status(400).json(errors);
    } else if (
      propertyTypeID === undefined ||
      propertyTypeID === "" ||
      propertyTypeID == null
    ) {
      errors.propertyTypeID = "Vui lòng nhập loại bất động sản";
    } else if (
      description === undefined ||
      description === "" ||
      description == null
    ) {
      errors.description = "Vui lòng nhập mô tả bất động sản";
    } else if (address === undefined || address === "" || address == null) {
      errors.address = "Vui lòng nhập địa chỉ bất động sản";
    } else if (
      districtID === undefined ||
      districtID === "" ||
      districtID == null
    ) {
      errors.districtID = "Vui lòng nhập Quận (Huyện) bất động sản";
    } else if (area === undefined || area === "" || area == null) {
      errors.area = "Vui lòng nhập diện tích bất động sản";
    } else if (typeof area !== "number" || isNaN(area) === true) {
      errors.area = "Vui lòng nhập số";
    } else if (bedRoom === undefined || bedRoom === "" || bedRoom == null) {
      errors.bedRoom = "Vui lòng nhập phòng ngủ bất động sản";
    } else if (typeof bedRoom !== "number" || isNaN(bedRoom) === true) {
      errors.bedRoom = "Vui lòng nhập số";
    } else if (bathRoom === undefined || bathRoom === "" || bathRoom == null) {
      errors.bathRoom = "Vui lòng nhập phòng tắm bất động sản";
    } else if (typeof bathRoom !== "number" || isNaN(bathRoom) === true) {
      errors.bathRoom = "Vui lòng nhập số";
    } else if (price === undefined || price === "" || price == null) {
      errors.price = "Vui lòng nhập số tiền bất động sản";
    } else if (typeof price !== "number" || isNaN(price) === true) {
      errors.price = "Vui lòng nhập số";
    } else if (
      propertyStatusID === undefined ||
      propertyStatusID === "" ||
      propertyStatusID == null
    ) {
      errors.propertyStatusID = "Vui lòng nhập tình trạng bất động sản";
    }
    // Check Length errors
    if (Object.entries(errors).length === 0 && errors.constructor === Object) {
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

      let newProperty = await new Property({
        PropertyName: propertyName,
        PropertyTypeID: propertyTypeID,
        Description: description,
        DistrictID: districtID,
        Address: address,
        Area: area,
        BedRoom: bedRoom,
        BathRoom: bathRoom,
        Price: price,
        InstallmentRate: installmentRate,
        PropertyStatusID: propertyStatusID
      });

      // let album = [];
      // let avatar;
      // req.files.forEach(Element => {
      //   console.log("Element: ", Element);
      //   album.push(Element.path);
      // });
      // avatar = album.slice(0, 1);
      // console.log("avatar: ", avatar);
      // console.log("album1: ", album);
      // console.log("req.file.path: ", req.file.path);

      console.log("123213", req.files.avata[0].path);
      let album = [];
      console.log(req.files.album);

      if (req.files.album) {
        req.files.album.forEach(Element => {
          console.log("Element: ", Element);
          album.push(Element.path);
        });
      } else {
        return (errors.uploadAlbum = "Vui lòng nhập file");
      }

      console.log("album: ", album);

      // Lưu lại trên db

      let a = await newProperty.save();

      // Tạo 1 propertyCode
      let propertyCode = StandardCode(a.dataValues.id);
      // Thêm propertyCode vào cho property
      let b = await newProperty.update(
        {
          PropertyCode: propertyCode,
          Avatar: req.files.avata[0].path,
          Album: album
        },
        { where: { id: a.dataValues.id } }
      );

      let newService = await new PropertyService({
        ServiceID
      });
      // PropertyService.bulkCreate([{ ServiceID: "12" }, { ServiceID: "4546" }]);
      let dataService = [];
      ServiceID.forEach(element => {
        dataService.push({ ServiceID: element, PropertyID: a.dataValues.id });
      });
      PropertyService.bulkCreate(dataService);
      res.status(200).json(b);
    } else {
      // Trả về validation
      return res.status(400).json(errors);
    }
  } catch (error) {
    // Xuất ra lỗi nếu có sai
    console.log(error);

    res.status(400).json({
      error
    });
  }
};
module.exports.getPropertyById = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log("id: ", id);
    result = await Property.findAll({
      where: { id: id },
      include: [
        // { model: PropertyService },
        { model: PropertyStatus },
        { model: PropertyType },
        {
          model: District,
          include: [
            {
              model: City
            }
          ]
        }
      ]
    });
    return res.status(200).json(result);
  } catch (error) {
    console.log("error: ", error);
  }
};
module.exports.getProperty = async (req, res, next) => {
  let { page } = req.body;
  console.log("page: ", page);
  if (!page) {
    page = 1;
  }

  try {
    // if (!city) {
    //   conditionCity = { [Op.ne]: null };
    // } else {
    //   conditionCity = { [Op.like]: `%${city}%` };
    // }
    // if (!name) {
    //   conditionName = { [Op.ne]: null };
    // } else {
    //   conditionName = { [Op.like]: `%${name}%` };
    // }
    result = await Property.findAll({
      include: [
        { model: PropertyType },
        { model: PropertyStatus },
        // { model: PropertyService, include: [{ model: Service }] },
        {
          model: District,
          // right: true,
          include: [
            {
              // where: {
              //   [Op.and]: [
              //     {
              //       CityName: conditionCity
              //     }
              //   ]
              // },
              model: City
            }
          ]
        }
      ],
      limit: 24,
      offset: (page - 1) * 24,
      order: [["id", "DESC"]]
    });
    // console.log(result[0]);

    return res.status(200).json(result);
  } catch (error) {
    console.log("error: ", error);
  }
};
module.exports.updateProperty = async (req, res, next) => {
  const { id } = req.params;
  const {
    propertyName,
    description,
    address,
    area,
    bedRoom,
    bathRoom,
    price,
    album,
    installmentRate,
    serviceName,
    districtName,
    cityName,
    propertyTypeName,
    propertyAmount,
    PropertyStatusName,
    districtID,
    Avatar
  } = req.body;
  try {
    Property.update(
      {
        PropertyName: propertyName,
        Description: description,
        Address: address,
        Area: area,
        BedRoom: bedRoom,
        BathRoom: bathRoom,
        Price: price,
        InstallmentRate: installmentRate,
        Album: album,
        DistrictName: districtName,
        DistrictID: districtID
        // Avatar: avata,
        // Album: album
      },
      {
        where: { id },
        include: [
          { model: PropertyType },
          { model: PropertyStatus },
          // { model: PropertyService, include: [{ model: Service }] },
          {
            model: District,
            right: true,
            include: [
              {
                right: true,
                model: City
              }
            ]
          }
        ]
      }
    );
    result = await Property.findOne({ raw: true, where: { id: id } }).then(
      property => {
        return res.status(200).json(property);
      }
    );
  } catch (error) {
    console.log(error);
  }
};
module.exports.deleteProperty = async (req, res, next) => {
  var { id } = req.params;
  console.log("id: ", id);
  try {
    let a = await Property.destroy({
      where: { id }
    });
    await Property.findAll({
      include: [{ model: PropertyStatus }]
    }).then(result => {
      result.sort().reverse();
      return res.status(200).json(result);
    });
  } catch (error) {
    console.log(error);
  }
};
module.exports.uploadAvatar = (req, res, next) => {
  const { id } = req.params; // headers, params, body, file
  console.log(req.params);
  Property.findById(id)
    .then(property => {
      if (!property)
        return Promise.reject({ status: 404, message: "Not found" });

      property.avatar = req.file.path;
      return property.save();
    })
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => {
      if (!err.status) return res.json(err);
      res.status(200).json({ messgage: err.message });
    });
};

module.exports.getAllCity = async (req, res, next) => {
  try {
    result = await District.findAll({
      // include: [{ model: City }]
    });
    // console.log(result[0]);

    return res.status(200).json(result);
  } catch (error) {
    console.log("error: ", error);
  }
};
module.exports.searchProperty = async (req, res, next) => {
  const { search } = req.body;
  console.log("phonadasdsadsa", req.body);

  console.log("search: ", search);
  let conditionSearch;
  // let conditionName;
  // let conditionCity;
  try {
    if (!search) {
      conditionSearch = { [Op.ne]: null };
    } else {
      conditionSearch = { [Op.like]: `%${search}%` };
    }
    // if (!city) {
    //   conditionCity = { [Op.ne]: null };
    // } else {
    //   conditionCity = { [Op.like]: `%${city}%` };
    // }
    // if (!name) {
    //   conditionName = { [Op.ne]: null };
    // } else {
    //   conditionName = { [Op.like]: `%${name}%` };
    // }
    result = await Property.findAll({
      where: {
        [Op.or]: [
          {
            PropertyName: conditionSearch
          },
          {
            PropertyCode: conditionSearch
          },
          {
            DistrictID: conditionSearch
          },
          {
            Address: conditionSearch
          },
          {
            Area: conditionSearch
          },
          {
            Price: conditionSearch
          },
          {
            InstallmentRate: conditionSearch
          }
        ]
      },
      include: [
        { model: PropertyType },
        { model: PropertyStatus },
        // { model: PropertyService, include: [{ model: Service }] },
        {
          model: District,
          // right: true,
          include: [
            {
              // where: {
              //   [Op.and]: [
              //     {
              //       CityName: conditionCity
              //     }
              //   ]
              // },
              model: City
            }
          ]
        }
      ]
    });
    // console.log(result[0]);

    return res.status(200).json(result.reverse());
  } catch (error) {
    console.log("error: ", error);
  }
};
module.exports.addFullContract = async (req, res, next) => {
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
    Status
  } = req.body;
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
    Status: Status
  });

  console.log("newFullContract: ", newFullContract);
  // newFullContract.save();
  FullContract.create(newFullContract);
  // result = await FullContract.findOne({
  //   include: [{ model: Property }]
  // });

  // console.log("a: ", a);
  // res.status(200).json(result);
  // console.log(StandardCodeFullContract(12));

  // console.log(" req.body: ", req.body);
};
module.exports.getServiceById = async (req, res, next) => {
  try {
    const { id } = req.params;
    result = await PropertyService.findAll({
      where: { PropertyID: id },
      include: [{ model: Service }]
    });
    let dataService = [];
    result.forEach(element => {
      console.log("12312321312", element.service.dataValues.ServiceName);
      dataService.push(element.service.dataValues.ServiceName);
    });
    return res.status(200).json(dataService);
  } catch (error) {
    console.log("error: ", error);
  }
};
