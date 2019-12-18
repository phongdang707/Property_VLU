import React, { Component } from "react";
import { Menu, Dropdown, Avatar } from "antd";
import { logout } from "../actions/index";
import { connect } from "react-redux";
import { Redirect, Link } from "react-router-dom";

class User extends Component {
  render() {
    const menu = (
      <Menu>
        <Menu.Item title="Non clickable text">Thông tin tài khoản</Menu.Item>
        <Menu.Item title="Non clickable text" onClick={this.props.logout}>
          {/* <a href="/"> Đăng xuất </a> */}
          <Link to="/">Đăng xuất</Link>
        </Menu.Item>
      </Menu>
    );

    return (
      <div>
        <Dropdown overlay={menu}>
          <a className="ant-dropdown-link" href="#2">
            Admin <Avatar src="./img/messi1.jpg" />
          </a>
        </Dropdown>
      </div>
    );
  }
}

export default connect(null, { logout })(User);
