import React, { Component } from "react";
import { Layout, Menu, Form, Icon, Input, Checkbox } from "antd";
import { Modal, Button } from "rsuite";
import { connect } from "react-redux";
import { login } from "../../actions/index";
import { Redirect, Link } from "react-router-dom";
import axios from "axios";
import jwtDecode from "jwt-decode";
import setHeaders from "../../helpers/setHeader";
import Swal from "sweetalert2";
const { Header } = Layout;

class MenuHeader extends Component {
  constructor(props) {
    super(props);
    this.state = { show: false, userName: "", passWord: "", errors: "" };
    this.close = this.close.bind(this);
    this.open = this.open.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }
  componentWillReceiveProps = nextProps => {
    this.setState({
      errors: nextProps.errors
    });
  };
  close() {
    const { userName, passWord } = this.state;
    console.log("passWord: ", passWord);
    console.log("userName: ", userName);
    let data = { userName, passWord };
    // if (this.props.login(data)) {
    //   this.setState({ show: false });
    // }
    this.props.login(data);
    // axios
    //   .post("http://localhost:5000/api/property/signin", data)
    //   .then(res => {
    //     console.log(res);

    //     const { token } = res.data;
    //     console.log("token: ", token);
    //     // dua jwt len localstorage
    //     localStorage.setItem("token", token);

    //     // decode --> dispatch auth reducer
    //     // const decoded = jwtDecode(token);
    //     // console.log(decoded);
    //     // set params token header cua nhung request
    //     // setHeaders({ token });
    //     Swal.fire({
    //       icon: "success",
    //       title: "Đăng nhập thành công..."
    //     });
    //   })
    //   .catch(
    //     Swal.fire({
    //       icon: "error",
    //       title: "Lỗi đăng nhập...",
    //       text: "Sai mật khẩu hoặc tài khoản!"
    //     })
    //   );
  }
  open() {
    this.setState({ show: true });
  }
  closeModal() {
    this.setState({ show: false });
  }
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  render() {
    console.log(this.state);

    return (
      <Header style={{ backgroundColor: "white" }}>
        <div className="logo" />
        <Menu
          mode="horizontal"
          defaultSelectedKeys={["1"]}
          style={{ lineHeight: "64px" }}
        >
          <Menu.Item key="1">Trang chủ</Menu.Item>
          <Menu.Item key="2">Giới thiệu</Menu.Item>
          <Menu.Item key="3">Bất động sản</Menu.Item>
          <Menu.Item key="4">Tin tức</Menu.Item>
          <Menu.Item key="5">Liên hệ</Menu.Item>

          {/* <Menu.Item key="6">
            <Link to="/admin">Đăng nhập </Link>
          </Menu.Item> */}
          <Menu.Item key="6" onClick={this.open}>
            Đăng Nhập
          </Menu.Item>
          <Modal show={this.state.show} onHide={this.closeModal}>
            <Modal.Header>
              <Modal.Title>Đăng nhập</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form exticon="true" className="login-form">
                <Form.Item>
                  <Input
                    name="userName"
                    onChange={this.onChange}
                    prefix={
                      <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    placeholder="Tên người dùng"
                  />
                </Form.Item>
                <Form.Item>
                  <Input
                    name="passWord"
                    onChange={this.onChange}
                    prefix={
                      <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    type="password"
                    placeholder="Mật khẩu"
                  />
                </Form.Item>
                <Form.Item>
                  <Checkbox>Ghi nhớ</Checkbox>
                  <a className="login-form-forgot" href="">
                    Quên mật khẩu
                  </a>
                  Hoặc <a href="">Đăng ký ngay!</a>
                </Form.Item>
                <Modal.Footer>
                  <Button onClick={this.close} appearance="primary">
                    Đăng Nhập
                  </Button>
                  <Button onClick={this.closeModal} appearance="subtle">
                    Thoát
                  </Button>
                </Modal.Footer>
              </Form>
            </Modal.Body>
          </Modal>
        </Menu>
      </Header>
    );
  }
}
const WrappedNormalLoginForm = Form.create({ name: "normal_login" })(
  MenuHeader
);
const mapStateToProps = state => {
  return {
    errors: state.errors
  };
};

export default connect(mapStateToProps, { login })(WrappedNormalLoginForm);
