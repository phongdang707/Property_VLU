import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { Table, Input, Button, Icon, Divider } from "antd";
import Swal from "sweetalert2";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";
import { detailsFullContract, deleteFullContract } from "../actions/index";
import Highlighter from "react-highlight-words";
function refreshPage() {
  window.location.reload(false);
}

class viewListIntallmentContract extends Component {
  state = {
    searchText: "",
    searchedColumn: "",
    dataState: []
  };

  UNSAFE_componentWillMount() {
    console.log("vao 1");

    axios.get("http://localhost:5000/api/installementContract").then(result => {
      const data = result.data;
      console.log("COMPONENT WILL Mount data : ", data);
      this.setState({
        dataState: [...data]
      });
    });
  }

  deleteProperty = (e, data) => {
    e.preventDefault();
    Swal.fire({
      title: `Bạn có muốn xóa hợp đồng`,
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
          .delete("http://localhost:5000/api/installementContract/" + data.key)
          .then(res => {
            console.log("res: ", res);
            Swal.fire("Xóa thành công!", "BDS đã được xóa", "success");
            return this.setState({ dataState: [...res.data] });
          })
          .catch(err => {
            console.log(err);
          });
      }
    });
  };

  detailsFullContract = (e, id) => {
    console.log(e);
    console.log(id);
    this.props.detailsFullContract(id);
  };

  render() {
    const data = [];
    console.log("dataState: ", this.state.dataState);
    this.state.dataState.forEach(element => {
      console.log("element12321: ", element);
      console.log("element: ", Object.values(element)[16]);

      data.push({
        key: `${element.id}`,
        InstallmentContractCode: `${element.InstallmentContractCode}`,
        PropertyCode: `${element.property.PropertyCode}`,
        CustomerName: `${element.CustomerName}`,
        Mobile: `${element.Mobile}`,
        DateOfContract: `${element.DateOfContract}`,
        Price: `${element.Price}`,
        Status: `${element.Status}`
      });
    });
    console.log("data: ", data);
    console.log(this.state);
    const columns = [
      {
        title: "Mã hợp đồng",
        dataIndex: "InstallmentContractCode",
        key: "InstallmentContractCode",
        width: "15%"
      },
      {
        title: "Mã bất động sản",
        dataIndex: "PropertyCode",
        key: "PropertyCode",
        width: "10%"
      },
      {
        title: "Tên khách hàng",
        dataIndex: "CustomerName",
        key: "CustomerName",
        width: "15%"
      },
      {
        title: "Số điện thoại",
        dataIndex: "Mobile",
        key: "Mobile",
        width: "15%"
      },
      {
        title: "Ngày lập hợp đồng",
        dataIndex: "DateOfContract",
        key: "DateOfContract",
        width: "10%"
      },
      {
        title: "Giá trị hợp đồng",
        dataIndex: "Price",
        key: "Price",
        width: "10%"
      },
      {
        title: "Trạng thái hợp đồng",
        dataIndex: "Status",
        key: "Status",
        width: "10%"
      },
      {
        title: "Action",
        key: "action",
        render: (text, record) => (
          <span>
            <Link
              to={"/Print/" + text.key}
              onClick={e => this.detailsFullContract(e, text.key)}
            >
              In
            </Link>
            <Divider type="vertical" />
            <a href=" " onClick={e => this.deleteProperty(e, text)}>
              Xóa
            </a>
          </span>
        )
      }
    ];
    return <Table columns={columns} dataSource={data} />;
  }
}
const mapDispatchToProps = dispatch => ({
  detailsFullContract: id => dispatch(detailsFullContract(id)),
  deleteFullContract: id => dispatch(deleteFullContract(id))
});
export default connect(null, mapDispatchToProps)(viewListIntallmentContract);
