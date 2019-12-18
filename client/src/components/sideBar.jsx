import React, { Component } from "react";
import { Layout, Menu, Icon, Row, Col } from "antd";
import { Link } from "react-router-dom";
import "./index.css";

const { Sider } = Layout;
const { SubMenu } = Menu;
const DemoBox = props => (
  <p className={`width-${props.value}`}>{props.children}</p>
);
class SiderBar extends Component {
  state = {
    collapsed: false
  };

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };
  render() {
    return (
      <Sider
        collapsible
        collapsed={this.state.collapsed}
        onCollapse={this.onCollapse}
      >
        <div className="logo">
          <Row>
            <Col span={4} offset={1}>
              <DemoBox value={80}>
                <img
                  className="logoAdmin"
                  alt="saskdjlk"
                  src="./img/koko.png"
                  style={{ width: 80, marginTop: 12 }}
                ></img>
              </DemoBox>
            </Col>
          </Row>
        </div>
        <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
          <SubMenu
            key="sub1"
            title={
              <span>
                <Icon type="home" />
                <span>Bất động sản</span>
              </span>
            }
          >
            <Menu.Item key="3">
              <Link to="/admin">Danh sách BDS</Link>
            </Menu.Item>
            <Menu.Item key="4">
              <Link to="/admin/addProperty">Thêm BDS</Link>
            </Menu.Item>
          </SubMenu>
          <SubMenu
            key="sub2"
            title={
              <span>
                <Icon type="schedule" />
                <span>Quản lý hợp đồng</span>
              </span>
            }
          >
            <Menu.Item key="6">
              <Link to="/admin/fullContract">Một lần</Link>
            </Menu.Item>
            <Menu.Item key="8">
              <Link to="/admin/intallmentContract">Trả góp</Link>
            </Menu.Item>
          </SubMenu>
          <SubMenu
            key="sub3"
            title={
              <span>
                <Icon type="solution" />

                <span>Hợp đồng trả góp</span>
              </span>
            }
          >
            <Menu.Item key="6">Team 1</Menu.Item>
            <Menu.Item key="8">Team 2</Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>
    );
  }
}

export default SiderBar;
