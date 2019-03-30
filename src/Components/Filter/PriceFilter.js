import React, { Component } from "react";
import InputLabel from "@material-ui/core/InputLabel";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import ProductsManager from "../../Managers/ProductsManager";
import HelperManager from "../../Managers/HelperManager";

let containerStyle = {
  display: "flex",
  flexDirection: "column",
  marginLeft: "10%",
  marginRight: "10%",
  marginTop: "5%"
};

let inputRowStyle = {
  display: "flex",
  flexDirection: "row",
  marginBottom: "5%",
  marginTop: "5%"
};

export default class PriceFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      minPrice: undefined,
      maxPrice: undefined,
      minError: false,
      maxError: false
    };
    ProductsManager.setRefreshPriceFilterComponent(this.initializeValue);
  }

  initializeValue = (min, max) => {
    this.setState({
      minPrice: min,
      maxPrice: max
    });
  };

  handleMinValue = event => {
    let { value } = event.target;
    if (HelperManager.validateNumericStrings(value)) {
      if (value > this.state.maxPrice)
        this.setState({
          minPrice: value,
          minError: true
        });
      else
        this.setState({
          minPrice: value,
          minError: false
        });
    }
  };

  handleMaxValue = event => {
    let { value } = event.target;
    if (HelperManager.validateNumericStrings(value)) {
      if (value < this.state.minPrice)
        this.setState({
          maxPrice: value,
          maxError: true
        });
      else
        this.setState({
          maxPrice: value,
          maxError: false
        });
    }
  };

  handleFiltering = () => {
    ProductsManager.addFilter("price_gte", this.state.minPrice);
    ProductsManager.addFilter("price_lte", this.state.maxPrice);
    ProductsManager.executeFetchingFilteredProductsTrigger();
  };

  render() {
    if (this.state.minPrice !== undefined && this.state.maxPrice !== undefined)
      return (
        <div style={containerStyle}>
          <InputLabel htmlFor="demo-controlled-open-select">Price</InputLabel>

          <div style={inputRowStyle}>
            <TextField
              label="Minimum"
              value={this.state.minPrice}
              onChange={this.handleMinValue}
              variant="outlined"
              error={this.state.minError}
              style={{
                marginRight: "5%"
              }}
            />
            <TextField
              label="Maximum"
              value={this.state.maxPrice}
              onChange={this.handleMaxValue}
              variant="outlined"
              error={this.state.maxError}
            />
          </div>
          <Button
            variant="contained"
            color="primary"
            disabled={this.state.minError || this.state.maxError}
            onClick={this.handleFiltering}
          >
            Apply
          </Button>
        </div>
      );

    return <div />;
  }
}
