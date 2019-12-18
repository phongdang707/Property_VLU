import React, { Component } from "react";
import { connect } from "react-redux";

function mapStateToProps(state) {
  return {};
}

class PropertyItem extends Component {
  render() {
    return <div>123213</div>;
  }
}

export default connect(mapStateToProps)(PropertyItem);
