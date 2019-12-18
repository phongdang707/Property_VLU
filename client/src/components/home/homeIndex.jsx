import React, { Component } from "react";
import { Row, Layout } from "antd";
import "./1.css";
import MenuHeader from "./menu";
import CarouselSlide from "./carousel";
import SearchProperty from "./searchProperty";
import ListItemProperty from "./ListItemProperty";
import FooterTop from "../footer";

const { Content } = Layout;

class HomeIndex extends Component {
  render() {
    return (
      <div>
        <div>
          <Layout className="layout">
            <MenuHeader></MenuHeader>
            <Content style={{ padding: "0 50px" }}>
              <Row>
                <CarouselSlide></CarouselSlide>
              </Row>
              <div style={{ background: "#fff", padding: 24, minHeight: 280 }}>
                <SearchProperty></SearchProperty>
                <ListItemProperty></ListItemProperty>
              </div>
            </Content>
            <FooterTop></FooterTop>
          </Layout>
        </div>
      </div>
    );
  }
}

export default HomeIndex;
