import React, { Component } from "react";

export default class AlbumDetails extends Component {
  render() {
    console.log("123", this.props.data);
    const { data } = this.props;
    console.log("data: ", data);
    // console.log("1223", this.props.key);
    return (
      <div>
        <img
          src={"http://localhost:5000/uploads/propertys/" + data}
          alt="img"
          style={{ width: 220, height: 130 }}
        ></img>
      </div>
    );
  }
}
