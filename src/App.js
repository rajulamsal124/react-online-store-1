import React, { Component } from "react";
import "./App.css";
import Paper from "@material-ui/core/Paper";
import { Row } from "react-bootstrap";

import CategoryContainer from "../src/Components/Category/CategoryContainer";
import ProductContainer from "../src/Components/Product/ProductContainer";
import FilterContainer from "../src/Components/Filter/FilterContainer";

let paperStyle = {
  height: "100%",
  margin: "2%"
};

let layoutStyle = { padding: "2%" };

class App extends Component {
  render() {
    return (
      <Paper elevation={4} style={paperStyle}>
        <CategoryContainer />
        <Row style={layoutStyle}>
          <FilterContainer />
          <ProductContainer />
        </Row>
      </Paper>
    );
  }
}

export default App;
