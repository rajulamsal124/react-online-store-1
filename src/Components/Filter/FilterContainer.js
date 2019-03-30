import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import ProductsManager from "../../Managers/ProductsManager";
import PriceFilter from "./PriceFilter";
import ColorFilter from "./ColorFilter";
import RatingFilter from "./RatingFilter";

export default class FilterContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    };
    ProductsManager.setShowFilterSectionTrigger(this.handleVisibility);
  }

  handleVisibility = flag => {
    this.setState({
      visible: flag
    });
  };

  render() {
    if (this.state.visible)
      return (
        <Col md={4}>
          <Paper elevation={4}>
            <Row
              style={{
                display: "inline"
              }}
            >
              <Typography
                gutterBottom
                variant="title"
                style={{
                  marginLeft: "5%"
                }}
              >
                Filters
              </Typography>
            </Row>
            <Row
              style={{
                display: "inline"
              }}
            >
              <PriceFilter />
            </Row>
            <Row
              style={{
                display: "inline"
              }}
            >
              <ColorFilter />
            </Row>
            <Row
              style={{
                display: "inline"
              }}
            >
              <RatingFilter />
            </Row>
          </Paper>
        </Col>
      );
    return <div />;
  }
}
