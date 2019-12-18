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
const { Option } = Select;

class Details extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: ""
    };
  }
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
  render() {
    console.log(this.props.id);
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
    // let service = [];
    let proService = "";
    const { detailsProperty, service } = this.props;
    console.log("service: ", service);
    console.log("12312312asxzcsad", this.props.service);
    // console.log("service: ", service);

    console.log("detailsProperty: ", this.props.detailsProperty[0]);
    if (this.props.detailsProperty[0]) {
      property = this.props.detailsProperty[0];
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
          // renderAlbum = <img src={"http://localhost:5000/" + element}></img>;
        });
      }
      // if (this.props.detailsProperty[0].PropertyServiceID) {
      //   service = this.props.detailsProperty[0].PropertyServiceID;
      //   let a = service.split(",");
      //   console.log("a: ", a);
      //   a.forEach(element => {
      //     if (element == 1) {
      //       proService = "Ban Cong"
      //     }else if(element == 2 ){
      //       proServic
      //     }
      //   });
      // }
    }
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
    // console.log("service: ", typeof service);

    return (
      <div>
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

            <Col span={19}>{property.PropertyName}</Col>
          </Row>
        </Form.Item>
        <Form.Item>
          <Row>
            <Col span={5}>
              <p>Loại bất động sản:</p>
            </Col>
            <Col span={19}>{PropertyTypeName.PropertyTypeName}</Col>
          </Row>
        </Form.Item>
        <Form.Item>
          <Row>
            <Col span={5}>
              <p>Mô tả bất động sản:</p>
            </Col>
            <Col span={19}>{property.Description}</Col>
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
            <Col span={19}>{property.Address}</Col>
          </Row>
        </Form.Item>
        <Form.Item>
          <Row>
            <Col span={5}>
              <p>Tỉnh Thành:</p>
            </Col>
            <Col span={19}>{cityName.CityName}</Col>
          </Row>
        </Form.Item>
        <Form.Item>
          <Row>
            <Col span={5}>
              <p>Quận (Huyện):</p>
            </Col>
            <Col span={19}>{districtName.DistrictName}</Col>
          </Row>
        </Form.Item>
        <Form.Item>
          <Row>
            <Col span={5}>
              <p>Diện tích ( m2):</p>
            </Col>
            <Col span={19}>{property.Area}</Col>
          </Row>
        </Form.Item>
        <Form.Item>
          <Row>
            <Col span={5}>
              <p>Phòng Ngủ:</p>
            </Col>
            <Col span={7}>{property.BedRoom}</Col>
            <Col span={3} offset={2}>
              <p>Phòng Tắm:</p>
            </Col>
            <Col span={7}>{property.BathRoom}</Col>
          </Row>
        </Form.Item>
        <Form.Item>
          <Row>
            <Col span={5}>
              <p>Dịch vụ:</p>
            </Col>
            <Col span={19}>{this.props.service.toString()}</Col>
          </Row>
        </Form.Item>
        <Form.Item>
          <Row>
            <Col span={5}>
              <p>Giá bán:</p>
            </Col>
            <Col span={19}>{property.Price}</Col>
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
            <Col span={19}>{PropertyStatusName.PropertyStatusName}</Col>
          </Row>
        </Form.Item>
        <Form.Item>
          <Row>
            <Col span={5}>
              <p>Hình ảnh:</p>
            </Col>
            <Col span={19}>
              <img
                src={"http://localhost:5000/" + avata}
                alt="img"
                style={{ width: 220, height: 130 }}
              ></img>
            </Col>
          </Row>
        </Form.Item>
        <Form.Item>
          <Row>
            <Col span={5}>
              <p>Album:</p>
            </Col>
            <Col span={19}>
              {albumArray.map((value, key) => {
                return (
                  <img
                    key={key}
                    src={"http://localhost:5000/uploads/propertys/" + value}
                    alt="img"
                    style={{
                      width: 220,
                      height: 130,
                      marginRight: 20,
                      marginBottom: 20
                    }}
                  ></img>
                );
              })}
            </Col>
          </Row>
        </Form.Item>
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => ({
  detailsProperty: state.detailsProperty,
  service: state.service
});
// export default Details;
export default connect(mapStateToProps, null)(Details);
