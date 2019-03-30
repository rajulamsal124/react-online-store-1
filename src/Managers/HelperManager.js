//this is a manager that contains common helper methods that could be used across different components

class HelperManager {
  //a method that returns the image url or a fallback one in case it wasn't found
  getImage = obj => {
    let { image } = obj;
    if (image !== null && image !== undefined && image !== "") return image;
    // fallback image in case image prop was corrupted
    return "https://www.edfa3ly.com/build/static/Edfa3ly/images/footer-logo-edfa3ly.png";
  };

  //a method to capitalize the first letter of a string
  capitalizeFirstLetter = text => {
    return String().concat(text.charAt(0).toUpperCase(), text.slice(1));
  };
}

const HelperManagerInstance = new HelperManager();
export default HelperManagerInstance;
