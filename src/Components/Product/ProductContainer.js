import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import LinearProgress from "@material-ui/core/LinearProgress";
import ProductsManager from "../../Managers/ProductsManager";
import ProductComponent from "./ProductComponent";

let linearProgressStyle = { flexGrow: 1, marginRight: "33%" };

export default class ProductContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      loading: false
    };
    ProductsManager.setLoadingTrigger(this.handleLoading);
    ProductsManager.setFetchingProductsTrigger(this.handleFetchingProducts);
  }

  handleLoading = flag => {
    this.setState({
      loading: flag
    });
  };

  handleFetchingProducts = () => {
    let url = String().concat(
      "http://test-api.edfa3ly.io/product",
      ProductsManager.getCurrentlySelectedCategoryId()
    );

    fetch(url)
      .then(response => response.json())
      .then(data => {
        let productsArray = [];

        //populate array with results
        data.map(obj =>
          productsArray.push(
            <Col md={4} key={obj.id}>
              <ProductComponent product={obj} />
            </Col>
          )
        );

        //stop loading and render the products
        this.setState({
          loading: false,
          products: productsArray
        });
      })
      .catch(error => {
        console.log(error);
      });
  };
  render() {
    if (this.state.loading)
      return <LinearProgress style={linearProgressStyle} />;
    return this.state.products.length !== 0 ? (
      <Col md={8}>
        <Row>{this.state.products}</Row>
      </Col>
    ) : (
      <div />
    );
  }
}
