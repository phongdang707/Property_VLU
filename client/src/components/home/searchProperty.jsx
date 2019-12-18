import React, { Component } from "react";
import { Button, Row, Col, Select, AutoComplete, Input } from "antd";

const InputGroup = Input.Group;
const { Option } = Select;

class SearchProperty extends Component {
  render() {
    return (
      <Row type="flex" justify="center">
        <Col span={10}>
          <InputGroup compact>
            <Select defaultValue="Chọn địa chỉ" style={{ width: 150 }}>
              <Option value="1">Sài Gòn</Option>
              <Option value="2">Gia Lai</Option>
            </Select>
            <AutoComplete
              style={{ width: 350 }}
              onChange={this.handleChange}
              placeholder="Tìm kiếm bất động sản"
            />
          </InputGroup>
        </Col>
        <Col span={4}>
          <Button type="primary" icon="search">
            Search
          </Button>
        </Col>
      </Row>
    );
  }
}

export default SearchProperty;
