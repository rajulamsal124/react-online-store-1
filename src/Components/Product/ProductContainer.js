import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import LinearProgress from "@material-ui/core/LinearProgress";
import Typography from "@material-ui/core/Typography";
import ProductsManager from "../../Managers/ProductsManager";
import ProductComponent from "./ProductComponent";

let linearProgressStyle = { flexGrow: 1, marginRight: "5%", marginLeft: "5%" };

export default class ProductContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      loading: false,
      errorMessage: ""
    };
    ProductsManager.setLoadingTrigger(this.handleLoading);
    ProductsManager.setFetchingProductsTrigger(this.handleFetchingProducts);
    ProductsManager.setFetchingFilteredProductsTrigger(
      this.handleFilteringProducts
    );
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
        let colors = new Set(); // to get unique values only to populate the color filter
        let ratings = new Set(); // to get unique values only to populate the rating filter
        let minPrice; //to get lowest price
        let maxPrice; //to get highest price

        //populate array with results
        data.map((obj, index) => {
          //to get prices for price filter
          if (index === 0) {
            minPrice = obj.price;
            maxPrice = obj.price;
          } else {
            if (obj.price < minPrice) minPrice = obj.price;
            else if (obj.price > maxPrice) maxPrice = obj.price;
          }

          colors.add(obj.color);
          ratings.add(obj.rating);

          productsArray.push(
            <Col md={4} key={obj.id}>
              <ProductComponent product={obj} />
            </Col>
          );
        });

        //show filter section
        ProductsManager.executeShowFilterSection(true);

        //for price filter
        ProductsManager.executeRefreshPriceFilterComponent(minPrice, maxPrice);

        //for color filter
        let colorsArray = [...colors];
        ProductsManager.executeRefreshColorFilterComponent(colorsArray.sort());

        //for rating filter
        let ratingsArray = [...ratings];
        ProductsManager.executeRefreshRatingFilterComponent(
          ratingsArray.sort().reverse()
        );

        //stop loading and render the products
        this.setState({
          loading: false,
          products: productsArray,
          errorMessage:
            productsArray.length === 0
              ? "No Items were found, Please choose another category."
              : ""
        });
      })
      .catch(error => {
        console.log(error);
        this.setState({
          loading: false,
          errorMessage: "An error occurred, Please try again."
        });
      });
  };

  handleFilteringProducts = filterString => {
    let url = String().concat(
      "http://test-api.edfa3ly.io/product",
      ProductsManager.getCurrentlySelectedCategoryId(),
      filterString
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
          products: productsArray,
          errorMessage:
            productsArray.length === 0
              ? "No Items were found, Please change your selected filter(s)."
              : ""
        });
      })
      .catch(error => {
        console.log(error);
        this.setState({
          loading: false,
          errorMessage: "An error occurred, Please try again."
        });
      });
  };

  render() {
    if (this.state.loading)
      return <LinearProgress style={linearProgressStyle} />;
    else if (this.state.errorMessage !== "")
      return (
        <Col md={8}>
          <Typography variant="title" align="center">
            {this.state.errorMessage}
          </Typography>
        </Col>
      );
    return this.state.products.length !== 0 ? (
      <Col md={8}>
        <Row>{this.state.products}</Row>
      </Col>
    ) : (
      <div />
    );
  }
}
