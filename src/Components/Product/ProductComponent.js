import React, { Component } from "react";
import PropTypes from "prop-types";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import StarRatingComponent from "react-star-rating-component";
import HelperManager from "../../Managers/HelperManager";

let cardStyle = {
  width: "100%",
  marginBottom: "10%"
};

let cardContentStyle = {
  paddingBottom: "6%"
};

let cardMediaStyle = {
  height: "200px"
};

let priceAndRatingStyle = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  height: "20px"
};

let colorStyle = {
  display: "flex",
  flexDirection: "row",
  height: "20px"
};

export default class ProductComponent extends Component {
  constructor(props) {
    super(props);
    this.product = this.props.product;
  }

  render() {
    return (
      <Card raised style={cardStyle}>
        <CardMedia
          image={HelperManager.getImage(this.product)}
          style={cardMediaStyle}
        />
        <CardContent style={cardContentStyle}>
          <Typography
            gutterBottom
            noWrap
            variant="subTitle"
            style={{ fontWeight: "bold" }}
          >
            {this.product.name}
          </Typography>
          <div style={priceAndRatingStyle}>
            <Typography variant="body2">
              {this.product.price.toLocaleString(undefined, {
                style: "currency",
                currency: this.product.currency
              })}
            </Typography>
            <StarRatingComponent
              name={String(this.product.id)}
              editing={false}
              value={this.product.rating}
            />
          </div>
          <div style={colorStyle}>
            <Typography variant="body2">Color: </Typography>
            <div
              style={{
                borderRadius: "10px",
                width: "15px",
                height: "15px",
                background: this.product.color,
                borderWidth: "1px",
                borderColor: "black",
                borderStyle: "solid",
                marginTop: "5px",
                marginLeft: "5px"
              }}
            />
          </div>
        </CardContent>
      </Card>
    );
  }
}

ProductComponent.propTypes = {
  product: PropTypes.object.isRequired
};
