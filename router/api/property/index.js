var express = require("express");
const route = express.Router();
const propertyController = require("./property.router");
const userController = require("../property/userController");
// const { uploadImage } = require("../../../middleware/uploadImage");
// const { uploadAlbum } = require("../../../middleware/uploadAlbum");
// const districtController = require("./districtController");

var multer = require("multer");
// var upload = multer({ dest: "uploads/" });

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, `./uploads/propertys`);
  },
  filename: function(req, file, cb) {
    console.log("123", file);
    cb(null, Date.now() + "-" + file.originalname);
  }
});
var upload = multer({ storage: storage });

// Property
route.get("/", propertyController.getProperty);
route.get("/getAllCity", propertyController.getAllCity);
route.get("/getServiceById/:id", propertyController.getServiceById);
route.get("/:id", propertyController.getPropertyById);
route.post("/searchProperty", propertyController.searchProperty);
route.post(
  "/",
  // uploadImage("property"),
  upload.fields([
    { name: "avata", maxCount: 1 },
    { name: "album", maxCount: 8 }
  ]),
  propertyController.createProperty
);
// route.get(
//   "/",
//   uploadImage("property")
//   // uploadAlbum("album"),
//   propertyController.createProperty
// );
route.post("/addFullContract", propertyController.addFullContract);
route.post("/signin", userController.signIn);

route.put(
  "/:id",
  // upload.fields([
  //   { name: "avata", maxCount: 1 },
  //   { name: "album", maxCount: 8 }
  // ]),
  propertyController.updateProperty
);
route.delete("/:id", propertyController.deleteProperty);
// route.get("/getProvince", propertyController.getCityProvince);

module.exports = route;
