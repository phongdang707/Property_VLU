import React, { Component } from "react";
import { Layout, Row, Col } from "antd";
import User from "./user";
const { Header } = Layout;
export default class HeaderTop extends Component {
  render() {
    return (
      <div>
        <Header style={{ background: "#fff", padding: 0 }}>
          <Row>
            <Col span={2} offset={22}>
              <User></User>
            </Col>
          </Row>
        </Header>
      </div>
    );
  }
}
