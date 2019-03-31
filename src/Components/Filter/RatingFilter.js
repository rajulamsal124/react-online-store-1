import React, { Component } from "react";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import ProductsManager from "../../Managers/ProductsManager";

let containerStyle = {
  display: "flex",
  flexDirection: "column",
  marginLeft: "10%",
  marginRight: "10%",
  marginTop: "5%"
};

export default class RatingFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ratingsList: [],
      selectedRating: "",
      open: false
    };
    ProductsManager.setRefreshRatingFilterComponent(this.refreshRatingsList);
  }

  handleChange = event => {
    if (this.state.selectedRating !== event.target.value) {
      this.setState({ selectedRating: event.target.value });
      ProductsManager.addFilter("rating", event.target.value);
      ProductsManager.executeFetchingFilteredProductsTrigger();
    }
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  refreshRatingsList = list => {
    this.setState({
      ratingsList: list
    });
  };

  renderRating = () => {
    if (this.state.ratingsList !== []) {
      let arr = [];
      arr.push(
        <MenuItem value="" key="norating">
          <em>None</em>
        </MenuItem>
      );

      this.state.ratingsList.map(rating =>
        arr.push(
          <MenuItem value={rating} key={rating}>
            {rating}
          </MenuItem>
        )
      );

      return arr;
    }
    return [];
  };

  render() {
    if (this.state.ratingsList.length !== 0)
      return (
        <div style={containerStyle}>
          <InputLabel htmlFor="demo-controlled-open-select">Rating</InputLabel>
          <Select
            open={this.state.open}
            onClose={this.handleClose}
            onOpen={this.handleOpen}
            value={this.state.selectedRating}
            onChange={this.handleChange}
          >
            {this.renderRating()}
          </Select>
        </div>
      );

    return <div />;
  }
}
