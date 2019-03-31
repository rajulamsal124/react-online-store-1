import React, { Component } from "react";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import ProductsManager from "../../Managers/ProductsManager";
import HelperManager from "../../Managers/HelperManager";

let containerStyle = {
  display: "flex",
  flexDirection: "column",
  marginLeft: "10%",
  marginRight: "10%",
  marginTop: "5%"
};

export default class ColorFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      colorList: [],
      selectedColor: "",
      open: false
    };
    ProductsManager.setRefreshColorFilterComponent(this.refreshColorList);
  }

  handleChange = event => {
    this.setState({ selectedColor: event.target.value });
    ProductsManager.addFilter("color", event.target.value);
    ProductsManager.executeFetchingFilteredProductsTrigger();
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  refreshColorList = list => {
    this.setState({
      colorList: list
    });
  };

  renderColor = () => {
    if (this.state.colorList !== []) {
      let arr = [];
      arr.push(
        <MenuItem value="" key="nocolor">
          <em>None</em>
        </MenuItem>
      );

      this.state.colorList.map(color =>
        arr.push(
          <MenuItem value={color} key={color}>
            {HelperManager.capitalizeFirstLetter(color)}
          </MenuItem>
        )
      );

      return arr;
    }
    return [];
  };

  render() {
    if (this.state.colorList.length !== 0)
      return (
        <div style={containerStyle}>
          <InputLabel htmlFor="demo-controlled-open-select">Color</InputLabel>
          <Select
            open={this.state.open}
            onClose={this.handleClose}
            onOpen={this.handleOpen}
            value={this.state.selectedColor}
            onChange={this.handleChange}
          >
            {this.renderColor()}
          </Select>
        </div>
      );

    return <div />;
  }
}
