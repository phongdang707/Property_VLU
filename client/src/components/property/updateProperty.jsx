import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import {
  Divider,
  Form,
  Input,
  Icon,
  Select,
  Row,
  Col,
  Upload,
  Button,
  Alert,
  message,
  Checkbox
} from "antd";
import { withRouter } from "react-router-dom";
import AlbumDetails from "./albumDetails";
import provinceData from "../../helpers/province";
import cityData from "../../helpers/city";
import { updateProperty } from "../../actions/index";
import reqwest from "reqwest";
import Swal from "sweetalert2";
const { Option } = Select;

class UpdateProperty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: "",
      cities: cityData[provinceData[0]],
      secondCity: cityData[provinceData[0]][0],
      propertyName: "",
      propertyTypeID: "",
      description: "",
      districtID: "",
      address: "",
      area: "",
      bedRoom: "",
      bathRoom: "",
      price: "",
      installmentRate: "",
      avatar: "",
      album: "",
      propertyStatusID: "",
      showAlter: 0,
      fileList: [],
      fileListAlbum: [],
      uploading: false,
      errors: "",
      imageUrl: ""
    };
  }
  handleProvinceChange = value => {
    this.setState({
      cities: cityData[value],
      secondCity: cityData[value][0]
    });
  };
  updateProperty = data => {
    this.props.updateProperty(data);
    Swal.fire("Good job!", "You clicked the button!", "success");
  };
  onSecondCityChange = value => {
    this.setState({
      secondCity: value
    });
  };
  // SomeMethod() {
  //   const { detailsProperty } = this.props;
  //   console.log("detailsProperty: ", detailsProperty);
  //   if (detailsProperty.length === 1) {
  //     return this.setState({
  //       data: detailsProperty
  //     });
  //   }
  // }
  //   shouldComponentUpdate = () => {
  //     let { detailsProperty } = this.props;
  //     console.log("detailsProperty: ", detailsProperty);
  //     console.log(this.props.detailsProperty);

  //     // this.setState({
  //     //   data: detailsProperty[0]
  //     // });
  //   };
  //   componentWillReceiveProps = () => {
  //     let { detailsProperty } = this.props;
  //     console.log("detailsProperty3: ", detailsProperty[0]);
  //     let a = detailsProperty[0];
  //     console.log("qa13: ", typeof a);
  //     console.log(a);
  //   };
  //   componentDidMount = () => {
  //     let { detailsProperty } = this.props;
  //     console.log("detailsProperty1: ", detailsProperty[0]);
  //   };
  renderAlbum = albumArray => {
    albumArray.forEach(element => {
      return <AlbumDetails data={element}></AlbumDetails>;
    });
  };
  getItemAvata = () => {
    console.log("detailsProperty: ", this.props.detailsProperty[0]);
    if (this.props.detailsProperty[0]) {
    }
  };
  // handleUpload = () => {
  //   const {
  //     id,
  //     fileList,
  //     fileListAlbum,
  //     propertyName,
  //     propertyTypeID,
  //     description,
  //     districtID,
  //     address,
  //     area,
  //     bedRoom,
  //     bathRoom,
  //     price,
  //     installmentRate,
  //     avatar,
  //     album,
  //     propertyStatusID
  //   } = this.state;
  //   const formData = new FormData();
  //   // formData.append("avata", fileList);
  //   // fileList.forEach(file => {
  //   //   console.log("file: ", file);
  //   //   formData.append("avata", file);
  //   // });
  //   // fileListAlbum.forEach(file => {
  //   //   console.log("file: ", file);
  //   //   formData.append("album", file);
  //   // });
  //   formData.set("propertyName", propertyName);
  //   formData.set("propertyTypeID", propertyTypeID);
  //   formData.set("description", description);
  //   formData.set("districtID", districtID);
  //   formData.set("address", address);
  //   formData.set("area", area);
  //   formData.set("bedRoom", bedRoom);
  //   formData.set("bathRoom", bathRoom);
  //   formData.set("price", price);
  //   formData.set("installmentRate", installmentRate);
  //   formData.set("propertyStatusID", propertyStatusID);
  //   // console.log("formData: ", fileList);
  //   // console.log("formData: ", formData);
  //   this.setState({
  //     uploading: true
  //   });
  //   let id = "528";
  //   reqwest({
  //     url: "http://localhost:5000/api/property/" + id,
  //     method: "put",
  //     processData: false,
  //     // headers: { "Content-Type": "multipart/form-data" },
  //     data: formData,
  //     success: () => {
  //       this.setState({
  //         fileList: [],
  //         uploading: false
  //       });
  //       message.success("Cập nhật Bất Động Sản thành công");
  //     },
  //     error: err => {
  //       console.log(err);
  //       // let obj = JSON.parse(err.response);
  //       this.setState({
  //         uploading: false
  //         // errors: obj
  //       });
  //       message.error("Cập nhật file thất bại!!");
  //     }
  //   });
  // };
  // componentDidMount = property => {
  //   this.props.updateProperty(property);
  // };
  addProperty = (id, data) => {
    this.props.updateProperty(id, data);
  };
  onSecondCityChange = value => {
    this.setState({
      secondCity: value,
      districtID: value
    });
  };
  onChangeProperty = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
    console.log("state", this.state);
  };
  onChangePropertyType = e => {
    this.setState({ propertyTypeID: e });
  };
  onChangePropertyStatus = e => {
    this.setState({ propertyStatusID: e });
  };
  render() {
    this.getItemAvata();
    const { uploading, fileList, fileListAlbum } = this.state;
    // console.log(
    //   "fileList: ",
    //   fileList.push({
    //     uid: "-1",
    //     name: "xxx.png",
    //     status: "done",
    //     url:
    //       "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    //     thumbUrl:
    //       "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
    //   })
    // );

    const { cities, id } = this.state;
    let property = {};
    let districtName = {};
    let cityName = {};
    let PropertyTypeName = {};
    let PropertyStatusName = {};
    let avata = {};
    let album = {};
    var regex = /"/gi;
    let albumArray = [];
    let renderAlbum;
    let avataName;
    let idP = {};
    const { detailsProperty } = this.props;

    if (this.props.detailsProperty[0]) {
      property = this.props.detailsProperty[0];
      if (this.props.detailsProperty[0].id) {
        idP = property.id;
      }
      if (this.props.detailsProperty[0].district) {
        districtName = property.district;
        if (districtName.city) {
          cityName = districtName.city;
          console.log("cityName: ", cityName.CityName);
        }
      }
      if (this.props.detailsProperty[0].propertyType) {
        PropertyTypeName = property.propertyType;
      }
      if (this.props.detailsProperty[0].propertyStatus) {
        PropertyStatusName = property.propertyStatus;
      }
      if (this.props.detailsProperty[0].Avatar) {
        avata = property.Avatar;
        avataName = avata.substring(18, avata.length);
        console.log("avata: ", avata.substring(18, avata.length));

        fileList.push({
          uid: `${this.props.detailsProperty[0].id}`,
          name: `${avataName}`,
          status: "done",
          url: `http://localhost:5000/${avata}`,
          thumbUrl: `http://localhost:5000/${avata}`
        });
        console.log("avata: ", avata);
      }
      if (this.props.detailsProperty[0].Album) {
        album = property.Album;
        album = album.substring(2, album.length - 2);
        console.log("album: ", album);
        album = album.replace(regex, "");
        album = album.split(",");
        album.forEach(element => {
          element = element.substring(20);
          albumArray.push(element);
          console.log("element: ", element);
          // fileListAlbum.push({
          //   // uid: `${this.props.detailsProperty[0].id}`,
          //   name: `${element}`,
          //   status: "done",
          //   url: `http://localhost:5000/${avata}`,
          //   thumbUrl: `http://localhost:5000/${avata}`
          // });
          // renderAlbum = <img src={"http://localhost:5000/" + element}></img>;
        });
        console.log("albumArray: ", albumArray);
        albumArray.map((element, key) => {
          console.log("element: ", element);
          fileListAlbum.push({
            uid: `${key}`,
            name: `${element}`,
            status: "done",
            url: `http://localhost:5000/uploads/propertys/${element}`,
            thumbUrl: `http://localhost:5000/uploads/propertys/${element}`
          });
        });
      }
    }
    console.log("fileListAlbum: ", fileListAlbum);

    // albumArray.forEach(element => {
    //   renderAlbum.push(
    //     <img
    //       src={"http://localhost:5000/uploads/propertys/" + element}
    //       alt="img"
    //       style={{ width: 220, height: 130 }}
    //     ></img>
    //   );
    // });
    console.log("albumArray", albumArray);
    console.log("cityName: ", cityName);
    console.log("districtName: ", districtName);
    console.log("1", property.district);
    const props = {
      onRemove: file => {
        this.setState(state => {
          const index = state.fileList.indexOf(file);
          const newFileList = state.fileList.slice();
          newFileList.splice(index, 1);
          return {
            fileList: newFileList
          };
        });
      },
      beforeUpload: file => {
        console.log("file: ", file);
        this.setState(state => ({
          fileList: [...state.fileList, file]
        }));
        console.log("state", fileList);
        return false;
      },
      listType: "picture",
      defaultFileList: [...fileList]
    };
    const props1 = {
      onRemove: file => {
        this.setState(state => {
          const index = state.fileListAlbum.indexOf(file);
          const newFileList = state.fileListAlbum.slice();
          newFileList.splice(index, 1);
          return {
            fileListAlbum: newFileList
          };
        });
      },
      beforeUpload: file => {
        console.log("file: ", file);
        this.setState(state => ({
          fileListAlbum: [...state.fileListAlbum, file]
        }));
        console.log("state", fileListAlbum);
        return false;
      },
      listType: "picture",
      defaultFileList: [...fileListAlbum]
    };
    return (
      <Form>
        <h1 style={{ textAlign: "center" }}>
          <Divider>THÔNG TIN BẤT ĐỘNG SẢN</Divider>
        </h1>
        <h3 style={{ marginBottom: 20 }}>
          <Icon type="form" />
          Thông tin chung
        </h3>{" "}
        <Form.Item>
          <Row>
            <Col span={5}>
              <p>Mã bất động sản:</p>
            </Col>
            <Col span={19}>{property.PropertyCode}</Col>
          </Row>
        </Form.Item>
        <Form.Item>
          <Row>
            <Col span={5}>
              <p>Tên bất động sản:</p>
            </Col>

            <Col span={19}>
              <Input
                defaultValue={property.PropertyName}
                name="propertyName"
                onChange={this.onChangeProperty}
              ></Input>
            </Col>
          </Row>
        </Form.Item>
        <Form.Item>
          <Row>
            <Col span={5}>
              <p>Loại bất động sản:</p>
            </Col>
            <Col span={19}>
              <Select
                defaultValue={PropertyTypeName.PropertyTypeName}
                style={{ width: 845 }}
              >
                <Option value="1">Chung Cư</Option>
                <Option value="2">Căn Hộ Dịch Vụ</Option>
                <Option value="3">Nhà Riêng</Option>
                <Option value="4">Villa</Option>
                <Option value="5">Studio</Option>
                <Option value="6">Office</Option>
              </Select>
            </Col>
          </Row>
        </Form.Item>
        <Form.Item>
          <Row>
            <Col span={5}>
              <p>Mô tả bất động sản:</p>
            </Col>
            <Col span={19}>
              <Input defaultValue={property.Description}></Input>
            </Col>
          </Row>
        </Form.Item>
        <Divider></Divider>
        <h3 style={{ marginBottom: 20 }}>
          <Icon type="profile" />
          Thông tin bất động sản
        </h3>
        <Form.Item>
          <Row>
            <Col span={5}>
              <p>Địa Chỉ:</p>
            </Col>
            <Col span={19}>
              <Input defaultValue={property.Address}></Input>
            </Col>
          </Row>
        </Form.Item>
        <Form.Item>
          <Row>
            <Col span={5}>
              <p>Tỉnh Thành:</p>
            </Col>
            <Col span={19}>
              <Select
                style={{ width: 845 }}
                showSearch
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.props.children
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
                }
                defaultValue={provinceData[0]}
                onChange={this.handleProvinceChange}
              >
                {provinceData.map(province => (
                  <Option key={province}>{province}</Option>
                ))}
              </Select>
            </Col>
          </Row>
        </Form.Item>
        <Form.Item>
          <Row>
            <Col span={5}>
              <p>Quận Huyện:</p>
            </Col>
            <Col span={19}>
              <Select
                style={{ width: 845 }}
                showSearch
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.props.children
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
                }
                name="districtID"
                value={this.state.secondCity}
                onChange={this.onSecondCityChange}
              >
                {cities.map((city, index) => (
                  <Option key={city} value={index}>
                    {city}
                  </Option>
                ))}
              </Select>
            </Col>
          </Row>
        </Form.Item>
        <Form.Item>
          <Row>
            <Col span={5}>
              <p>Phòng Ngủ:</p>
            </Col>
            <Col span={7}>
              <Input defaultValue={property.BedRoom}></Input>
            </Col>
            <Col span={3} offset={2}>
              <p>Phòng Tắm:</p>
            </Col>
            <Col span={7}>
              <Input defaultValue={property.BathRoom}></Input>
            </Col>
          </Row>
        </Form.Item>
        <Form.Item>
          <Row>
            <Col span={5}>
              <p>Dịch vụ:</p>
            </Col>
            <Col span={19}>
              <Checkbox.Group style={{ width: "100%" }}>
                <Row>
                  <Col span={4}>
                    <Checkbox value="1">Ban Công</Checkbox>
                  </Col>
                  <Col span={4}>
                    <Checkbox value="2">Thang Máy</Checkbox>
                  </Col>
                  <Col span={4}>
                    <Checkbox value="3">Nhà Bếp</Checkbox>
                  </Col>
                  <Col span={4}>
                    <Checkbox value="4">Hồ Bơi</Checkbox>
                  </Col>
                  <Col span={4}>
                    <Checkbox value="5">Wifi</Checkbox>
                  </Col>
                  <Col span={4}>
                    <Checkbox value="6">Chỗ Đậu Xe</Checkbox>
                  </Col>
                </Row>
              </Checkbox.Group>
            </Col>
          </Row>
        </Form.Item>
        <Form.Item>
          <Row>
            <Col span={5}>
              <p>Giá bán:</p>
            </Col>
            <Col span={19}>
              <Input defaultValue={property.Price}></Input>
            </Col>
          </Row>
        </Form.Item>
        <Divider></Divider>
        <h3 style={{ marginBottom: 20 }}>
          <Icon type="appstore" />
          Thông tin khác
        </h3>
        <Form.Item>
          <Row>
            <Col span={5}>
              <p>Trạng thái:</p>
            </Col>
            <Col span={19}>
              <Input
                defaultValue={PropertyStatusName.PropertyStatusName}
              ></Input>
            </Col>
          </Row>
        </Form.Item>
        <Form.Item>
          <Row>
            <Col span={5}>
              <p>Hình ảnh:</p>
            </Col>
            <Col span={19}>
              <Upload {...props}>
                <Button>
                  <Icon type="upload" /> Chọn File
                </Button>
              </Upload>
            </Col>
          </Row>
        </Form.Item>
        <Form.Item>
          <Row>
            <Col span={5}>
              <p>Album:</p>
            </Col>
            <Col span={19}>
              <Upload {...props1}>
                <Button>
                  <Icon type="upload" /> Chọn File
                </Button>
              </Upload>
            </Col>
          </Row>
        </Form.Item>
        <Row>
          <Col span={9} offset={5}>
            <Button
              style={{ marginTop: 0 }}
              className="btn-block1"
              type="primary"
              block
              onClick={() => this.updateProperty(idP, this.state)}
              style={{ marginTop: 16 }}
            >
              Cập nhật Bất Động Sản
            </Button>
          </Col>
          <Col span={9} offset={1}>
            <Button type="danger" block style={{ marginTop: 15 }}>
              Hủy
            </Button>
          </Col>
        </Row>
      </Form>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    detailsProperty: state.detailsProperty
  };
};
const mapDispatchToProps = dispatch => ({
  // updateProperty: property => dispatch(updateProperty(property))
});
// export default Details;
export default connect(mapStateToProps, mapDispatchToProps)(UpdateProperty);
