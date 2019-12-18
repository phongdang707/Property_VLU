import React, { Component } from "react";
import { Carousel } from "antd";
import "./1.css";

export default class CarouselSlide extends Component {
  render() {
    return (
      <Carousel autoplay={100}>
        <img src="./img/ppc0006.jpg" alt="12"></img>
        <img src="./img/ppc0005.jpg" alt="12"></img>
        <img src="./img/ppc0004.jpg" alt="12"></img>
        <img src="./img/ppc0003.jpg" alt="12"></img>
        <img src="./img/ppc0002.jpg" alt="12"></img>
      </Carousel>
    );
  }
}
