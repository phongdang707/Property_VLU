import React, { Component } from "react";
import { Row, Pagination } from "antd";
import ItemProperty from "./ItemProperty";
import axios from "axios";

class ListItemProperty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataState: [],
      page: 1
    };
  }

  onChange = page => {
    console.log(page);
    this.setState({
      page: page
    });
  };
  UNSAFE_componentWillMount() {
    axios.get("http://localhost:5000/api/property").then(result => {
      const data = result.data;
      console.log("COMPONENT WILL Mount data : ", data);
      this.setState({
        dataState: [...data]
      });
    });
  }
  componentDidCatch = () => {
    let page = this.state.page;
    axios.get("http://localhost:5000/api/property", page).then(result => {
      const data = result.data;
      console.log("COMPONENT WILL Mount data : ", data);
      this.setState({
        dataState: [...data]
      });
    });
  };
  renderData() {
    this.state.dataState.map((key, value) => {
      return <ItemProperty data={value} key={key}></ItemProperty>;
    });
  }
  render() {
    console.log(this.state);

    return (
      <div>
        <Row style={{ marginTop: 15, marginBottom: 20 }} gutter={16}>
          {this.state.dataState.map((value, key) => {
            return (
              <ItemProperty
                style={{ marginBottom: 20 }}
                data={value}
                key={key}
              ></ItemProperty>
            );
          })}
        </Row>
        <Row>
          <Pagination
            current={this.state.page}
            onChange={this.onChange}
            total={50}
          />
        </Row>
      </div>
      //   {/* <ItemProperty></ItemProperty>
      //   <ItemProperty></ItemProperty> */}
    );
  }
}

export default ListItemProperty;
