import axios from "axios";

// axios.get("http://localhost:5000/api/property/getAllCity").then(res => {
//   console.log("res23: ", res);
//   // console.log(res);
//   res.data.forEach(element => {
//     console.log("element: ", element);
//     provinceData.push(element.CityName);
//   });
// });

// let provinceData = [];
// let provinceDataEmpty = [];
// axios.get("http://localhost:5000/api/property/getAllCity").then(res => {
//   console.log("res23: ", res);
//   // console.log(res);
//   res.data.forEach(element => {
//     // console.log("element: ", element);
//     provinceData.push(element.city.CityName);
//   });
//   console.log("provinceData: ", provinceData);
//   provinceDataEmpty = [...new Set(provinceData)];
//   console.log("unique: ", provinceDataEmpty);
//   console.log("provinceDataEmpty1: ", provinceDataEmpty);
// });
// console.log("provinceDataEmpty: ", provinceDataEmpty);
const city = {
  "Hồ Chí Minh": [
    "Quận",
    "Quận Bình Tân",
    " Quận Bình Thạnh",
    " Quận 1",
    " Quận 2",
    " Quận 3",
    "Quận 4",
    " Quận 5",
    " Quận 6",
    "Quận 7",
    "Quận 8",
    "Quận 9",
    " Quận 10",
    " Quận 11",
    " Thủ Đức"
  ],

  "Hà Nội": [
    "Hoàn Kiếm",
    "Đống Đa",
    "Ba Đình",
    "Hai Bà Trưng",
    " Hoàng Mai",
    "Thanh Xuân",
    "Long Biên",
    "Nam Từ Liêm",
    "Bắc Từ Liêm",
    "Tây Hồ"
  ],
  "Vũng Tàu": [],
  "Đà Nẵng": [],
  "Bình Dương": ["Huyện Bến Cát", "Huyện Bến Cát", "Huyện Thuận An"],
  "Bắc Giang": [],
  "Đồng Nai": [],
  "Cà Mau": [],
  "Long An": ["Huyện Bến Lức", "Huyện Đức Hòa", "Huyện Đức Huệ"],
  "Cần Thơ": []
};
export default city;
// const cityData = {
//     //   "Gia Lai": ["Yên Đỗ", "Yên Thế", "Biển Hồ"],
//     //   Huế: ["Phú Mậu", "Phú Vang", "Hương Phong"],
//     //   "Hồ Chí Minh": ["Quận 7", "Gò Vấp", "Bình Thạnh"]
//     // };
