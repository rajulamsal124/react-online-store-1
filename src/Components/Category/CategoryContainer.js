import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import CategoryComponent from "./CategoryComponent.js";

let containerStyle = {
  padding: "2%"
};

let headerStyle = {
  textAlign: "center",
  marginBottom: "2%"
};
export default class CategoryContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: []
    };
  }

  componentDidMount() {
    fetch("http://test-api.edfa3ly.io/category")
      .then(response => response.json())
      .then(data => {
        let categoriesArray = [];

        //populate array with results
        data.map(obj =>
          categoriesArray.push(
            <Col md={2} key={obj.id}>
              <CategoryComponent category={obj} />
            </Col>
          )
        );

        //set state one time only
        this.setState({
          categories: categoriesArray
        });
      })
      .catch(error => {
        console.log(error);
      });
  }
  render() {
    return (
      <div style={containerStyle}>
        <h1 style={headerStyle}>Please choose a product category</h1>
        <Row
          style={{
            justifyContent: "space-Evenly"
          }}
        >
          {this.state.categories}
        </Row>
      </div>
    );
  }
}
