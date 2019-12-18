import React, { Component } from "react";
import { Table, Divider, Row, Col, Menu, Dropdown, Icon, message } from "antd";
import axios from "axios";
import {
  showProperty,
  searchProperty,
  detailsProperty,
  deleteProperty,
  showFullContract,
  service
} from "../../actions/index";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Swal from "sweetalert2";
import SearchProperty from "./SearchProperty";
import { Avatar, Badge, Select } from "antd";

const { Option } = Select;

// function phong(value) {
//   this.props.detailsProperty(value);
//   // console.log("value: ", value);
// }

const onClick = ({ key }) => {
  message.info(`Click on item ${key}`);
};

function handleChange(value) {
  // console.log(`selected ${value}`);
}

class ViewListProperty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataState: [],
      value: "",
      searchProperty: "",
      check: false
    };
  }
  phong = value => {
    this.props.detailsProperty(value);
  };
  menu = value => {
    // console.log("value: ", value);
    this.props.detailsProperty(value);
    return (
      <Menu onClick={this.phong}>
        <Menu.Item key={value}>
          <a target="_blank" rel="noopener noreferrer">
            <Link
              to={"/admin/addFullContract/" + value}
              // onClick={e => this.detailsProperty(value)}
            >
              Hợp đồng 1 lần
            </Link>
          </a>
        </Menu.Item>
        <Menu.Item key={value + 1}>
          <Link
            to={"/admin/addInstallmentContract/" + value}
            // onClick={e => this.detailsProperty(value)}
          >
            Hợp đồng trả góp
          </Link>
        </Menu.Item>
      </Menu>
    );
  };

  deleteProperty = (e, data) => {
    e.preventDefault();
    Swal.fire({
      title: `Bạn có muốn xóa BDS ${data.name}`,
      text: "Bạn sẽ không được hoàn tác khi xác nhận!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Đồng ý",
      cancelButtonText: "Hủy"
    }).then(result => {
      if (result.value) {
        axios
          .delete("http://localhost:5000/api/property/" + data.key)
          .then(res => {
            // console.log("res: ", res);
            Swal.fire("Xóa thành công!", "BDS đã được xóa", "success");
            return this.setState({ dataState: [...res.data] });
          })
          .catch(err => {
            console.log(err);
          });
      }
    });
  };

  UNSAFE_componentWillMount() {
    // console.log("vao 1");
    axios.get("http://localhost:5000/api/fullContract").then(result => {
      const data = result.data;
      console.log("COMPONENT WILL Mount data123 : ", data);
      data.forEach(element => {
        if (Object.values(element)[7] === element.PropertyID) {
          console.log("element12321321: ", element);
          this.setState({
            check: true
          });
        } else {
          this.setState({
            check: false
          });
        }
        // console.log("elementID: ", Object.values(element)[7]);
        // console.log("elementPropertyID: ", element.PropertyID);
      });

      // if(data.PropertyID == data)
    });
    axios.get("http://localhost:5000/api/property").then(result => {
      const data = result.data;
      console.log("COMPONENT WILL Mount data : ", data);
      this.setState({
        dataState: [...data]
      });
    });
  }
  componentDidMount() {
    // console.log("vao 2");

    let data;
    if (this.props.searchProperty.payload) {
      // console.log("vao payload");
      data = this.props.searchProperty.payload;
      this.state.dataState = [...data];
      // console.log("data: ", data);
    }
  }

  detailsProperty = (e, id) => {
    console.log(e);
    console.log(id);
    this.props.detailsProperty(id);
    this.props.service(id);
  };

  render() {
    console.log("this.state.check123: ", this.state.check);
    if (this.props.searchProperty.payload.length >= 1) {
      this.state.dataState = this.props.searchProperty.payload;
    }
    console.log(this.state);
    const data = [];
    if (this.state.dataState.length) {
      this.state.dataState.forEach(element => {
        console.log("element: ", element);

        let a, b, c;

        if (!element.propertyStatus) {
          a = null;
        } else {
          a = element.propertyStatus.PropertyStatusName;
        }
        data.push({
          key: `${element.id}`,
          name: `${element.PropertyName}`,
          price: `${element.Price}`,
          property_code: `${element.PropertyCode}`,
          status: `${a}`,
          avata: `${element.Avatar}`
        });
      });
    }

    const columns = [
      {
        title: "Mã bất động sản",
        dataIndex: "property_code",
        key: "property_code"
      },

      {
        title: "Tên BDS",
        dataIndex: "name",
        key: "name"
      },
      {
        title: "Giá",
        dataIndex: "price",
        key: "price"
      },
      {
        title: "Hình ảnh",
        key: "avata",
        dataIndex: "avata",
        render: avata => (
          console.log("avata1: ", avata),
          console.log(typeof avata),
          console.log("avata: ", avata.substring(22, avata.length - 2)),
          (
            <span>
              <img
                src={"http://localhost:5000/" + avata}
                style={{ width: 120, height: 80 }}
                alt="new"
              />
            </span>
          )
        )
      },
      {
        title: "Tình trạng",
        dataIndex: "status",
        key: "status"
      },
      {
        title: "Action",
        key: "action",
        render: (text, record) => (
          <span>
            <Link
              to={"/admin/Details/" + text.key}
              onClick={e => this.detailsProperty(e, text.key)}
              id={text.key}
            >
              Chi tiết
            </Link>
            <Divider type="vertical" />
            <Link
              to={"/admin/UpdateProperty/" + text.key}
              onClick={e => this.detailsProperty(e, text.key)}
              id={text.key}
            >
              Cập nhật
            </Link>

            <Divider type="vertical" />
            {this.state.check ? (
              <Dropdown overlay={() => this.menu(text.key)}>
                <a className="ant-dropdown-link" href="#">
                  Thêm hợp đồng <Icon type="down" />
                </a>
              </Dropdown>
            ) : (
              <Dropdown overlay={() => this.menu(text.key)}>
                <a className="ant-dropdown-link" href="#">
                  Thêm hợp đồng <Icon type="down" />
                </a>
              </Dropdown>
            )}
            {/* <Dropdown overlay={() => this.menu(text.key)}>
              <a className="ant-dropdown-link" href="#">
                Thêm hợp đồng <Icon type="down" />
              </a>
            </Dropdown> */}
            <Divider type="vertical" />
            <a href=" " onClick={e => this.deleteProperty(e, text)}>
              Xóa
            </a>
          </span>
        )
      }
    ];

    return (
      <div>
        <SearchProperty dataState={this.state.dataState}></SearchProperty>
        <h1 style={{ textAlign: "center" }}>
          <Divider>DANH SÁCH BẤT ĐỘNG SẢN</Divider>
        </h1>
        <Row>
          <Col>
            {" "}
            <Table
              columns={columns}
              dataSource={data}
              pagination={{ pageSize: 10 }}
            />
          </Col>{" "}
        </Row>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  detailsFullContract: state.detailsFullContract,
  showProperty: state.showProperty,
  property: state.property,
  deleteProperty,
  searchProperty: state.searchProperty,
  showFullContract: state.showFullContract
});

const mapDispatchToProps = dispatch => ({
  showProperty: () => dispatch(showProperty()),
  deleteProperty: id => dispatch(deleteProperty(id)),
  detailsProperty: id => dispatch(detailsProperty(id)),
  service: id => dispatch(service(id))
});
export default connect(mapStateToProps, mapDispatchToProps)(ViewListProperty);
