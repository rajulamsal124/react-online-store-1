import React, { Component } from "react";
import PropTypes from "prop-types";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import HelperManager from "../../Managers/HelperManager";
import ProductsManger from "../../Managers/ProductsManager";

let cardStyle = {
  width: "100%"
};

let cardMediaStyle = {
  height: "150px"
};

let cardContentStyle = {
  textAlign: "center",
  fontWeight: "500"
};

export default class CategoryComponent extends Component {
  constructor(props) {
    super(props);
    this.category = this.props.category;
  }

  handleCategoryClick = () => {
    ProductsManger.setCurrentlySelectedCategory(this.category);
  };

  render() {
    return (
      <Card raised style={cardStyle} onClick={this.handleCategoryClick}>
        <CardActionArea>
          <CardMedia
            image={HelperManager.getImage(this.category)}
            style={cardMediaStyle}
          />
          <CardContent style={cardContentStyle}>
            {this.category.name}
          </CardContent>
        </CardActionArea>
      </Card>
    );
  }
}

CategoryComponent.propTypes = {
  category: PropTypes.object.isRequired
};
