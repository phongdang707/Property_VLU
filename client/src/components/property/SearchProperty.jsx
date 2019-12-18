import React, { Component } from "react";
import { Input, Row, Col, Form } from "antd";
import { searchProperty } from "../../actions/index";
import { connect } from "react-redux";
const { Search } = Input;
class SearchProperty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ""
    };
  }

  phong = value => {
    this.setState({
      value
    });
    this.props.searchProperty(value);
  };
  render() {
    console.log(this.state);
    return (
      <Row style={{ marginBottom: 20 }}>
        <Col>
          <Search
            enterButton
            placeholder="Nhập nội dung tìm kiếm"
            style={{ width: 300 }}
            onSearch={value => this.phong(value)}
          ></Search>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    searchProperty: state.searchProperty
  };
};
export default connect(mapStateToProps, { searchProperty })(SearchProperty);
