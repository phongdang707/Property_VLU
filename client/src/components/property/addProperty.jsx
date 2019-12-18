import React, { Component } from "react";
import {
  Form,
  Input,
  Icon,
  Select,
  Row,
  Col,
  Upload,
  Button,
  Divider,
  Alert,
  message,
  Checkbox
} from "antd";
import provinceData from "../../helpers/province";
import cityData from "../../helpers/city";
import { addProperty } from "../../actions/index";
import { connect } from "react-redux";
import Swal from "sweetalert2";
import reqwest from "reqwest";
import { Link } from "react-router-dom";
import "./index.css";
import axios from "axios";
const { Option } = Select;
const { TextArea } = Input;

class AddProperty extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
      imageUrl: "",
      PropertyServiceID: []
    };
  }
  onChange = e => {
    this.setState({
      ServiceID: e
    });
    console.log(this.state);
  };
  handleUpload = () => {
    const {
      fileList,
      fileListAlbum,
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
      avatar,
      album,
      propertyStatusID,
      PropertyServiceID,
      ServiceID
    } = this.state;

    const formData = new FormData();
    formData.append("avata", fileList);
    fileList.forEach(file => {
      console.log("file: ", file);
      formData.append("avata", file);
    });
    fileListAlbum.forEach(file => {
      console.log("file: ", file);
      formData.append("album", file);
    });
    formData.set("Service", ServiceID);
    formData.set("PropertyServiceID", PropertyServiceID);
    formData.set("propertyName", propertyName);
    formData.set("propertyTypeID", propertyTypeID);
    formData.set("description", description);
    formData.set("districtID", districtID);
    formData.set("address", address);
    formData.set("area", area);
    formData.set("bedRoom", bedRoom);
    formData.set("bathRoom", bathRoom);
    formData.set("price", price);
    formData.set("installmentRate", installmentRate);
    formData.set("propertyStatusID", propertyStatusID);
    console.log("formData: ", fileList);
    this.setState({
      uploading: true
    });

    reqwest({
      url: "http://localhost:5000/api/property/",
      method: "post",
      processData: false,
      // headers: { "Content-Type": "multipart/form-data" },
      data: formData,
      success: () => {
        this.setState({
          fileList: [],
          uploading: false
        });
        message.success("Thêm mới Bất Động Sản thành công");
      },
      error: err => {
        console.log(err);
        let obj = JSON.parse(err.response);
        this.setState({
          uploading: false,
          errors: obj
        });
        message.error("Tải file thất bại!!");
      }
    });
  };
  handleProvinceChange = (valueReslut, index) => {
    console.log("index: ", index);
    console.log(valueReslut);
    console.log("cityData[value][0]: ", cityData[valueReslut]);

    this.setState({
      cities: cityData[valueReslut],
      secondCity: cityData[valueReslut][0]
    });
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
  };
  onChangePropertyType = e => {
    this.setState({ propertyTypeID: e });
  };
  onChangePropertyStatus = e => {
    this.setState({ propertyStatusID: e });
  };
  componentDidMount = property => {
    this.props.addProperty(property);
  };
  addProperty = data => {
    this.props.addProperty(data);
    Swal.fire("Good job!", "You clicked the button!", "success");
  };

  renderAlert = () => {
    if (this.state.showAlter === 1) {
      return (
        <Alert
          message="Success Tips"
          description="Detailed description and advice about successful copywriting."
          type="success"
          showIcon
        />
      );
    }
  };
  onChangeShow = e => {
    this.setState({
      show: 1
    });
  };
  renderFormName = errors => {
    if (errors) {
      return (
        <Form.Item
          // label="Tên bất động sản:"
          // hasFeedback
          validateStatus="error"
          help={errors}
          // style={{ marginLeft: 224 }}
        >
          <Row>
            <Col span={5}>
              <p>Tên bất động sản:</p>
            </Col>
            <Col span={19}>
              <Input
                name="propertyName"
                placeholder="Nhập tên bất động sản"
                id="error2"
                onChange={this.onChangeProperty}
              />
            </Col>
          </Row>
        </Form.Item>
      );
    } else {
      return (
        <Form.Item>
          <Row>
            <Col span={5}>
              <p>Tên bất động sản:</p>
            </Col>
            <Col span={19}>
              <Input
                name="propertyName"
                placeholder="Nhập tên bất động sản"
                allowClear
                onChange={this.onChangeProperty}
              />
            </Col>
          </Row>
        </Form.Item>
      );
    }
  };
  renderPropertyType = errors => {
    if (errors) {
      return (
        <Form.Item validateStatus="error" help={errors}>
          <Row>
            <Col span={5}>
              <p>Loại bất động sản:</p>
            </Col>
            <Col span={19}>
              <Select
                name="propertyTypeID"
                placeholder="Chọn loại bất động sản"
                onChange={this.onChangePropertyType}
                showSearch
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.props.children
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
                }
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
      );
    } else {
      return (
        <Form.Item>
          <Row>
            <Col span={5}>
              <p>Loại bất động sản:</p>
            </Col>
            <Col span={19}>
              <Select
                name="propertyTypeID"
                placeholder="Chọn loại bất động sản"
                onChange={this.onChangePropertyType}
                showSearch
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.props.children
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
                }
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
      );
    }
  };
  renderPropertyDes = errors => {
    if (errors) {
      return (
        <Form.Item validateStatus="error" help={errors}>
          <Row>
            <Col span={5}>
              <p>Mô tả bất động sản:</p>
            </Col>
            <Col span={19}>
              <TextArea
                name="description"
                rows={3}
                onChange={this.onChangeProperty}
              />
            </Col>
          </Row>
        </Form.Item>
      );
    } else {
      return (
        <Form.Item>
          <Row>
            <Col span={5}>
              <p>Mô tả bất động sản:</p>
            </Col>
            <Col span={19}>
              <TextArea
                name="description"
                rows={3}
                onChange={this.onChangeProperty}
              />
            </Col>
          </Row>
        </Form.Item>
      );
    }
  };
  renderPropertyAdd = errors => {
    if (errors) {
      return (
        <Form.Item validateStatus="error" help={errors}>
          <Row>
            <Col span={5}>
              <p>Địa Chỉ:</p>
            </Col>
            <Col span={19}>
              <Input
                name="address"
                placeholder="Nhập địa chỉ bất động sản"
                allowClear
                onChange={this.onChangeProperty}
              />
            </Col>
          </Row>
        </Form.Item>
      );
    } else {
      return (
        <Form.Item>
          <Row>
            <Col span={5}>
              <p>Địa Chỉ:</p>
            </Col>
            <Col span={19}>
              <Input
                name="address"
                placeholder="Nhập địa chỉ bất động sản"
                allowClear
                onChange={this.onChangeProperty}
              />
            </Col>
          </Row>
        </Form.Item>
      );
    }
  };
  renderPropertyDistrict = errors => {
    const { cities } = this.state;
    if (errors) {
      return (
        <Form.Item validateStatus="error" help={errors}>
          <Row>
            <Col span={5}>
              <p>Quận Huyện:</p>
            </Col>
            <Col span={19}>
              <Select
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
      );
    } else {
      return (
        <Form.Item>
          <Row>
            <Col span={5}>
              <p>Quận Huyện:</p>
            </Col>
            <Col span={19}>
              <Select
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
      );
    }
  };
  renderPropertyArea = errors => {
    if (errors) {
      return (
        <Form.Item validateStatus="error" help={errors}>
          <Row>
            <Col span={5}>
              <p>
                Diện tích ( m<sup>2</sup>):
              </p>
            </Col>
            <Col span={19}>
              <Input
                name="area"
                placeholder="Nhập diện tích bất động sản"
                allowClear
                onChange={this.onChangeProperty}
              />
            </Col>
          </Row>
        </Form.Item>
      );
    } else {
      return (
        <Form.Item>
          <Row>
            <Col span={5}>
              <p>
                Diện tích ( m<sup>2</sup>):
              </p>
            </Col>
            <Col span={19}>
              <Input
                name="area"
                placeholder="Nhập diện tích bất động sản"
                allowClear
                onChange={this.onChangeProperty}
              />
            </Col>
          </Row>
        </Form.Item>
      );
    }
  };
  renderPropertyBed = errors => {
    if (errors) {
      return (
        <Form.Item
          validateStatus="error"
          help={errors}
          style={{ marginLeft: 0 }}
        >
          <Input
            name="bedRoom"
            placeholder="Nhập số phòng ngủ"
            allowClear
            onChange={this.onChangeProperty}
          />
        </Form.Item>
      );
    } else {
      return (
        <Form.Item>
          <Input
            name="bedRoom"
            placeholder="Nhập số phòng ngủ"
            allowClear
            onChange={this.onChangeProperty}
          />
        </Form.Item>
      );
    }
  };
  renderPropertyBath = errors => {
    if (errors) {
      return (
        <Form.Item
          validateStatus="error"
          help={errors}
          style={{ marginLeft: 0 }}
        >
          <Input
            name="bathRoom"
            placeholder="Nhập số phòng tắm"
            allowClear
            onChange={this.onChangeProperty}
          />
        </Form.Item>
      );
    } else {
      return (
        <Form.Item>
          <Input
            name="bathRoom"
            placeholder="Nhập số phòng tắm"
            allowClear
            onChange={this.onChangeProperty}
          />
        </Form.Item>
      );
    }
  };
  renderPropertyPrice = errors => {
    if (errors) {
      return (
        <Form.Item validateStatus="error" help={errors}>
          <Row>
            <Col span={5}>
              <p>Giá bán:</p>
            </Col>
            <Col span={19}>
              <Input
                name="price"
                suffix="VND"
                placeholder="Nhập giá bất động sản"
                allowClear
                onChange={this.onChangeProperty}
              />
            </Col>
          </Row>
        </Form.Item>
      );
    } else {
      return (
        <Form.Item>
          <Row>
            <Col span={5}>
              <p>Giá bán:</p>
            </Col>
            <Col span={19}>
              <Input
                name="price"
                suffix="VND"
                placeholder="Nhập giá bất động sản"
                allowClear
                onChange={this.onChangeProperty}
              />
            </Col>
          </Row>
        </Form.Item>
      );
    }
  };
  renderPropertyStatus = errors => {
    if (errors) {
      return (
        <Form.Item validateStatus="error" help={errors}>
          <Row>
            <Col span={5}>
              <p>Trạng thái:</p>
            </Col>
            <Col span={19}>
              <Select
                showSearch
                placeholder="Trạng thái bất động sản"
                onChange={this.onChangePropertyStatus}
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.props.children
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
                }
              >
                <Option value="0">Đang cọc trả góp</Option>
                <Option value="1">Đang bán</Option>
                <Option value="2">Đã bán thanh toán 1 lần</Option>
                <Option value="3">Đã bán trả góp</Option>
                <Option value="4">Không hiển thị</Option>
                <Option value="5">Hết hạn để bán</Option>
                <Option value="6">Đang cọc đầy đủ</Option>
              </Select>
            </Col>
          </Row>
        </Form.Item>
      );
    } else {
      return (
        <Form.Item>
          <Row>
            <Col span={5}>
              <p>Trạng thái:</p>
            </Col>
            <Col span={19}>
              <Select
                showSearch
                placeholder="Trạng thái bất động sản"
                onChange={this.onChangePropertyStatus}
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.props.children
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
                }
              >
                <Option value="0">Đang cọc trả góp</Option>
                <Option value="1">Đang bán</Option>
                <Option value="2">Đã bán thanh toán 1 lần</Option>
                <Option value="3">Đã bán trả góp</Option>
                <Option value="4">Không hiển thị</Option>
                <Option value="5">Hết hạn để bán</Option>
                <Option value="6">Đang cọc đầy đủ</Option>
              </Select>
            </Col>
          </Row>
        </Form.Item>
      );
    }
  };
  render() {
    let { errors } = this.state;
    let errProName,
      errProType,
      errProDes,
      errProAdd,
      errProBed,
      errProBath,
      errProPrice,
      errProStatus,
      errProArea,
      errProDis;
    if (errors.propertyName) {
      errProName = errors.propertyName;
    } else if (errors.propertyTypeID) {
      errProType = errors.propertyTypeID;
    } else if (errors.area) {
      errProArea = errors.area;
    } else if (errors.description) {
      errProDes = errors.description;
    } else if (errors.address) {
      errProAdd = errors.address;
    } else if (errors.districtID) {
      errProDis = errors.districtID;
    } else if (errors.bedRoom) {
      errProBed = errors.bedRoom;
    } else if (errors.bathRoom) {
      errProBath = errors.bathRoom;
    } else if (errors.price) {
      errProPrice = errors.price;
    } else if (errors.propertyStatusID) {
      errProStatus = errors.propertyStatusID;
    }
    console.log("errProDes: ", errProDes);
    console.log("errProType: ", errProType);
    console.log("errProName: ", errProName);

    console.log("errors: ", errors);
    console.log("1wqe", errors);
    console.log("state: ", this.state);
    const { uploading, fileList, fileListAlbum } = this.state;
    const { cities } = this.state;
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
        {this.renderAlert()}
        <h1 style={{ textAlign: "center" }}>
          <Divider>THÊM BẤT ĐỘNG SẢN</Divider>
        </h1>
        <h3 style={{ marginBottom: 20 }}>
          <Icon type="form" />
          Thông tin chung
        </h3>
        {this.renderFormName(errProName)}
        {this.renderPropertyType(errProType)}
        {this.renderPropertyDes(errProDes)}
        <Divider></Divider>
        <h3 style={{ marginBottom: 20 }}>
          <Icon type="profile" />
          Thông tin bất động sản
        </h3>
        {this.renderPropertyAdd(errProAdd)}
        <Form.Item>
          <Row>
            <Col span={5}>
              <p>Tỉnh Thành:</p>
            </Col>
            <Col span={19}>
              <Select
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
        {this.renderPropertyDistrict(errProDis)}
        {this.renderPropertyArea(errProArea)}

        <Row>
          <Col span={5} style={{ marginTop: 10 }}>
            <p>Phòng Ngủ:</p>
          </Col>
          <Col span={7}>{this.renderPropertyBed(errProBed)}</Col>
          <Col span={3} offset={2} style={{ marginTop: 10 }}>
            <p>Phòng Tắm:</p>
          </Col>
          <Col span={7}>{this.renderPropertyBath(errProBath)}</Col>
        </Row>
        <Form.Item>
          <Row>
            <Col span={5}>
              <p>Dịch vụ:</p>
            </Col>
            <Col span={19}>
              <Checkbox.Group
                style={{ width: "100%" }}
                onChange={this.onChange}
              >
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
        {this.renderPropertyPrice(errProPrice)}
        <Divider></Divider>
        <h3 style={{ marginBottom: 20 }}>
          <Icon type="appstore" />
          Thông tin khác
        </h3>
        {this.renderPropertyStatus(errProStatus)}
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
              onClick={this.handleUpload}
              style={{ marginTop: 16 }}
            >
              Thêm mới Bất Động Sản
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
const mapDispatchToProps = dispatch => ({
  addProperty: property => dispatch(addProperty(property))
});
export default connect(null, mapDispatchToProps)(AddProperty);
