let currentlySelectedCategory = undefined;
let fetchingProductsTrigger = undefined;
let loadingTigger = undefined;

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
  setCurrentlySelectedCategory = category => {
    currentlySelectedCategory = category;
    this.executeFetchingProductsTrigger();
  };

  //used to get the id of the category
  getCurrentlySelectedCategoryId = () => {
    if (currentlySelectedCategory !== undefined)
      return String().concat("?categoryId=", currentlySelectedCategory.id);
    return "";
  };
}

const ProductsManagerInstance = new ProductsManager();
export default ProductsManagerInstance;
