import React, { Component } from "react";
import { Layout } from "antd";
const { Footer } = Layout;
class FooterTop extends Component {
  render() {
    return (
      <div>
        <Footer style={{ textAlign: "center" }}>
          Design ©2019 Created by Team 11 K23T3 VLU
        </Footer>
      </div>
    );
  }
}

export default FooterTop;
