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
  Checkbox,
  DatePicker
} from "antd";
import moment from "moment";
import { withRouter } from "react-router-dom";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";
import reqwest from "reqwest";
import Swal from "sweetalert2";
import {
  showProperty,
  searchProperty,
  detailsProperty,
  deleteProperty
} from "../actions/index";
const { Option } = Select;
const InputGroup = Input.Group;
const { TextArea } = Input;
const dateFormatList = ["DD/MM/YYYY", "DD/MM/YY"];

class AddFullContract extends Component {
  constructor(props) {
    super(props);
    this.state = {
      PropertyCode: "",
      Price: "",
      InstallmentRate: "",
      data: [],
      SSN: "",
      YearOfBirth: "",
      Mobile: "",
      CustomerAddress: "",
      CustomerName: "",
      PropertyID: ""
    };
  }

  UNSAFE_componentWillMount() {
    let idParams = this.props.id;
    axios.get("http://localhost:5000/api/property/" + idParams).then(result => {
      console.log("result: ", result);
      const data = result.data;
      const PropertyCode = data[0].PropertyCode;
      const Price = data[0].Price;
      const InstallmentRate = data[0].InstallmentRate;
      console.log("COMPONENT WILL Mount data : ", data[0].PropertyCode);
      this.setState({
        PropertyCode: data[0].PropertyCode,
        Price,
        InstallmentRate,
        data: [...data],
        PropertyID: idParams
      });
    });
  }
  updateProperty = data => {
    try {
      axios
        .post("http://localhost:5000/api/fullContract/addFullContract", data)
        .then(result => {
          console.log("result: ", result);
          message.success("Thêm hợp đồng thành công");
        });
    } catch (err) {
      message.error("Lỗi hệ thống");
    }
  };
  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  onChangeDate = (date, dateString) => {
    console.log(dateString);
    this.setState({
      YearOfBirth: dateString
    });
  };

  render() {
    let property = {};
    const { detailsProperty } = this.props;
    console.log("detailsProperty: ", detailsProperty);
    if (this.props.detailsProperty[0]) {
      property = this.props.detailsProperty[0];
    }
    console.log("1ád2312", this.state);
    let PropertyCode = {};
    if ((this.state.data.length = 0)) {
      let idParams = this.props.id;
      axios
        .get("http://localhost:5000/api/property/" + idParams)
        .then(result => {
          console.log("result: ", result);
          const data = result.data;
          const PropertyCode = data[0].PropertyCode;
          const price = data[0].Price;
          const InstallmentRate = data[0].InstallmentRate;
          console.log("COMPONENT WILL Mount data : ", data[0].PropertyCode);
          this.setState({
            PropertyCode,
            price,
            InstallmentRate,
            data: [...data]
          });
        });
    }

    return (
      <Form>
        <h1 style={{ textAlign: "center" }}>
          <Divider>HỢP ĐỒNG THANH TOÁN 1 LẦN</Divider>
        </h1>
        <h3 style={{ marginBottom: 20 }}>
          <Icon type="profile" />
          Thông tin khách hàng
        </h3>
        <Form.Item>
          <Row>
            <Col span={5}>
              <p>Tên khách hàng:</p>
            </Col>
            <Col span={19}>
              <Input
                placeholder="Nhập tên khách hàng"
                name="CustomerName"
                onChange={this.onChange}
              ></Input>
            </Col>
          </Row>
        </Form.Item>
        <Form.Item>
          <Row>
            <Col span={5}>
              <p>CMND/CCCD:</p>
            </Col>
            <Col span={19}>
              <Input
                placeholder="Nhập CMND (CCCD)"
                name="SSN"
                onChange={this.onChange}
              ></Input>
            </Col>
          </Row>
        </Form.Item>
        <Form.Item>
          <Row>
            <Col span={5}>
              <p>Số điện thoại:</p>
            </Col>
            <Col span={19}>
              <Input
                name="Mobile"
                placeholder="Nhập số điện thoại"
                onChange={this.onChange}
              ></Input>
            </Col>
          </Row>
        </Form.Item>
        <Form.Item>
          <Row>
            <Col span={5}>
              <p>Năm sinh:</p>
            </Col>
            <Col span={19}>
              <DatePicker
                style={{ width: 845 }}
                defaultValue={moment("01/01/2015")}
                format={dateFormatList}
                name="YearOfBirth"
                onChange={this.onChangeDate}
              />
            </Col>
          </Row>
        </Form.Item>
        <Form.Item>
          <Row>
            <Col span={5}>
              <p>Địa chỉ:</p>
            </Col>
            <Col span={19}>
              <TextArea
                rows={4}
                placeholder="Nhập số địa chỉ"
                name="CustomerAddress"
                onChange={this.onChange}
              />
            </Col>
          </Row>
        </Form.Item>
        <Divider></Divider>
        <h3 style={{ marginBottom: 20 }}>
          <Icon type="form" />
          Thông tin bất động sản
        </h3>{" "}
        <Form.Item>
          <Row>
            <Col span={5}>
              <p>Mã bất động sản:</p>
            </Col>
            <Col span={19}>
              <Input disabled defaultValue={property.PropertyCode}></Input>
            </Col>
          </Row>
        </Form.Item>
        <Form.Item>
          <Row>
            <Col span={5}>
              <p>Giá bất động sản:</p>
            </Col>
            <Col span={19}>
              <Input disabled defaultValue={property.Price}></Input>
            </Col>
          </Row>
        </Form.Item>
        <Form.Item>
          <Row>
            <Col span={5}>
              <p>Đặt cọc</p>
            </Col>
            <Col span={19}>
              <Input disabled defaultValue={property.InstallmentRate}></Input>
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
              onClick={() => this.updateProperty(this.state)}
              style={{ marginTop: 16 }}
            >
              Thêm hợp đồng
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

export default connect(mapStateToProps, null)(AddFullContract);
