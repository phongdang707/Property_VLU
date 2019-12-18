import React, { Component } from "react";
import { Row, Col, Card, Divider, Rate, Typography } from "antd";
import { FaBed, FaDollarSign } from "react-icons/fa";
var currencyFormatter = require("currency-formatter");
const { Title } = Typography;
const { Meta } = Card;

class ItemProperty extends Component {
  format_number(pnumber, decimals) {
    if (isNaN(pnumber)) {
      return 0;
    }
    if (pnumber == "") {
      return 0;
    }
    var snum = new String(pnumber);
    var sec = snum.split(".");
    var whole = parseFloat(sec[0]);
    var result = "";

    if (sec.length > 1) {
      var dec = new String(sec[1]);
      dec = String(parseFloat(sec[1]) / Math.pow(10, dec.length - decimals));
      dec = String(
        whole + Math.round(parseFloat(dec)) / Math.pow(10, decimals)
      );
      var dot = dec.indexOf(".");
      if (dot == -1) {
        dec += ".";
        dot = dec.indexOf(".");
      }
      while (dec.length <= dot + decimals) {
        dec += "0";
      }
      result = dec;
    } else {
      var dot;
      var dec = new String(whole);
      if (decimals) {
        dec += ".";
        dot = dec.indexOf(".");
        while (dec.length <= dot + decimals) {
          dec += "0";
        }
      }
      result = dec;
    }
    return result;
  }
  render() {
    let city;
    if (this.props.data.district.city) {
      city = this.props.data.district.city.CityName;
      console.log(this.props.data.district.city.CityName);
    }

    console.log("city: ", city);
    console.log(this.props.data);

    return (
      <Col span={8} style={{ marginBottom: 20 }}>
        <Card
          hoverable
          style={{ width: 400, height: 600 }}
          cover={
            <img
              alt="example"
              src={"http://localhost:5000/" + this.props.data.Avatar}
              style={{ width: 400, height: 260 }}
            />
          }
        >
          <Meta
            title={this.props.data.PropertyName}
            description={this.props.data.Description}
            style={{ marginBottom: 10, fontWeight: "bold" }}
          ></Meta>
          <Row>
            <Col span={12}>
              <FaBed /> {this.props.data.BathRoom} Phòng Tắm
            </Col>
            <Col span={12}>
              <FaBed /> {this.props.data.BedRoom} Phòng Ngủ
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <b>Địa chỉ:</b> {this.props.data.Address}{" "}
              {/* {this.props.data.district.DistrictName}{" "} */}
              {this.props.data.district.city.CityName}
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <b> Quận (Huyện):</b> {this.props.data.district.DistrictName}{" "}
            </Col>
            <Col span={24}>
              <b>Tỉnh (Thành phố) : </b>{" "}
              {this.props.data.district.city.CityName}
            </Col>
            <Col span={24}>
              <b>Loại Bất động sản : </b>{" "}
              {this.props.data.propertyType.PropertyTypeName}{" "}
            </Col>
            <Col span={24}>
              <b>Tình trạng bất động sản : </b>{" "}
              {this.props.data.propertyStatus.PropertyStatusName}{" "}
            </Col>
          </Row>
          <Divider />
          <Row>
            <Col span={6}>
              <Rate disabled defaultValue={3} style={{ fontSize: 11 }} />
            </Col>
            <Col span={18} style={{ marginTop: 4 }}>
              <Title level={3} style={{ color: "#6449e7" }}>
                {/* <FaDollarSign></FaDollarSign> */}
                {currencyFormatter.format(this.props.data.Price, {
                  symbol: "VNĐ",
                  decimal: ",",
                  thousand: ",",
                  precision: 0,
                  format: "%v %s" // %s is the symbol and %v is the value
                })}{" "}
                {/* {this.format_number(this.props.data.Price, 3)} VNĐ */}
                <Col span={3}></Col>
                <Col span={18}></Col>
              </Title>
            </Col>
          </Row>
        </Card>
      </Col>
    );
  }
}

export default ItemProperty;
