import React, { Component } from "react";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import ProductsManager from "../../Managers/ProductsManager";

let containerStyle = {
  display: "flex",
  flexDirection: "row",
  alignItems: "flex-end",
  justifyContent: "flex-end",
  marginBottom: "2%"
};

export default class SortingComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedSortingMethod: ProductsManager.getDefaultSortingMethod(),
      open: false
    };
  }

  handleChange = event => {
    this.setState({ selectedSortingMethod: event.target.value });
    ProductsManager.setDefaultSortingMethod(event.target.value);
    ProductsManager.executeFetchingFilteredProductsTrigger();
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  renderSortingOptions = () => {
    //static options

    let arr = [
      <MenuItem value="&_sort=name&_order=asc" key="nameAsc">
        Name
      </MenuItem>,
      <MenuItem value="&_sort=rating&_order=desc" key="rateDesc">
        Highest Rated
      </MenuItem>,
      <MenuItem value="&_sort=rating&_order=asc" key="rateAsc">
        Lowest Rated
      </MenuItem>,
      <MenuItem value="&_sort=price&_order=desc" key="priceDesc">
        Highest Price
      </MenuItem>,
      <MenuItem value="&_sort=price&_order=asc" key="priceAsc">
        Lowest Price
      </MenuItem>,
      <MenuItem value="&_sort=releaseDate&_order=desc" key="dateDesc">
        Recently Added
      </MenuItem>
    ];
    return arr;
  };

  render() {
    return (
      <div style={containerStyle}>
        <InputLabel
          htmlFor="demo-controlled-open-select"
          style={{ marginRight: "1%" }}
        >
          Sort by
        </InputLabel>
        <Select
          open={this.state.open}
          onClose={this.handleClose}
          onOpen={this.handleOpen}
          value={this.state.selectedSortingMethod}
          onChange={this.handleChange}
        >
          {this.renderSortingOptions()}
        </Select>
      </div>
    );
  }
}
