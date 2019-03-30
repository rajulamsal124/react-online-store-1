let currentlySelectedCategory = undefined;
let fetchingProductsTrigger = undefined;
let loadingTigger = undefined;

let refreshPriceFilterComponent = undefined;
let refreshColorFilterComponent = undefined;
let refreshRatingFilterComponent = undefined;

let showFilterSectionTrigger = undefined;

let fetchingFilteredProductsTrigger = undefined;
let filter = {};

class ProductsManager {
  //set a callback to the loading trigger in products container
  setLoadingTrigger = callback => {
    loadingTigger = callback;
  };

  //execute the loading trigger callback, the flag indicates whether to turn loading on or off (true/false)
  executeLoadingTrigger = flag => {
    if (loadingTigger !== undefined) loadingTigger(flag);
  };

  //set a callback to the product fetching method
  setFetchingProductsTrigger = callback => {
    fetchingProductsTrigger = callback;
  };

  //execute product fetching method
  executeFetchingProductsTrigger = () => {
    if (fetchingProductsTrigger !== undefined) {
      this.executeLoadingTrigger(true);
      fetchingProductsTrigger();
    }
  };

  //set the currently selected category
  //will execute product fetching
  //and clears any previously set filters
  setCurrentlySelectedCategory = category => {
    currentlySelectedCategory = category;
    this.clearFilter(); //clear previous filters
    this.executeShowFilterSection(false);
    this.executeRefreshPriceFilterComponent(undefined, undefined); //clear previously set price filter values
    this.executeRefreshColorFilterComponent([]); //clear previously set color filter values
    this.executeRefreshRatingFilterComponent([]); //clear previously set rating filter values
    this.executeFetchingProductsTrigger();
  };

  //used to get the id of the category
  getCurrentlySelectedCategoryId = () => {
    if (currentlySelectedCategory !== undefined)
      return String().concat("?categoryId=", currentlySelectedCategory.id);
    return "";
  };

  //used to set a trigger to refresh the PriceFilter component
  setRefreshPriceFilterComponent = callback => {
    refreshPriceFilterComponent = callback;
  };

  //this method takes the lowest and highest price found when a user chooses a category
  executeRefreshPriceFilterComponent = (min, max) => {
    if (refreshPriceFilterComponent !== undefined)
      refreshPriceFilterComponent(min, max);
  };

  //used to set a trigger to refresh the ColorFilter component
  setRefreshColorFilterComponent = callback => {
    refreshColorFilterComponent = callback;
  };

  //this method takes a list of retrieved colors when a user chooses a category
  executeRefreshColorFilterComponent = listOfColors => {
    if (refreshColorFilterComponent !== undefined)
      refreshColorFilterComponent(listOfColors);
  };

  //used to set a trigger to refresh the RatingFilter component
  setRefreshRatingFilterComponent = callback => {
    refreshRatingFilterComponent = callback;
  };

  //this method takes a list of retrieved ratings when a user chooses a category
  executeRefreshRatingFilterComponent = listOfRatings => {
    if (refreshRatingFilterComponent !== undefined)
      refreshRatingFilterComponent(listOfRatings);
  };

  //set a callback to the filtered product fetching method
  setFetchingFilteredProductsTrigger = callback => {
    fetchingFilteredProductsTrigger = callback;
  };

  //execute filtered product fetching method
  //filteration is done based on an already selected product category
  executeFetchingFilteredProductsTrigger = () => {
    if (fetchingFilteredProductsTrigger !== undefined) {
      let filterString = this.constructFilterString();
      //if (filterString !== "") {
      this.executeLoadingTrigger(true);
      fetchingFilteredProductsTrigger(filterString);
      //}
    }
  };

  //used to add any filters
  addFilter = (key, value) => {
    if (value === "") {
      //unsetting a filter
      delete filter[key];
    } else filter[key] = value;
  };

  clearFilter = () => {
    filter = {};
  };

  //used to create one string to be added to the url of the request
  constructFilterString = () => {
    let filterString = "";
    for (let key in filter) {
      filterString += String().concat("&", key, "=", filter[key]);
    }
    return filterString;
  };

  setShowFilterSectionTrigger = callback => {
    showFilterSectionTrigger = callback;
  };

  executeShowFilterSection = flag => {
    if (showFilterSectionTrigger !== undefined) showFilterSectionTrigger(flag);
  };
}

const ProductsManagerInstance = new ProductsManager();
export default ProductsManagerInstance;
