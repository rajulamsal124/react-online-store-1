
# React-Online-Store

In this small project, I'm focusing on building the frontend of a single page
in an online store, the cataloge page will be containing product categories, products as well as some
filters that could be applied to narrow down your search.

## Getting Started

To make sure that all the packages are installed, run `npm install` in the terminal of the project's directory.
Once done installing the packages, simply type `npm start` to run the project.

This project is using [Material-UI](https://material-ui.com/), follow the link to know more about the library.
The API used to feed the components with the required data is [Edfa3ly's test API](http://test-api.edfa3ly.io/)

## Architectural Approach

My main focus was to minimize the number of unnecessary calls to the API that might be triggered mistakenly, as well as minimizing any setting of the state in containers (parent components) and instead focusing on manipulating the state of child componenets, if needed.
I've used the singleton pattern and created a manager class that will be responsible for executing any logic needed between components, this approach was helpful in particular when I was populating the Filteration components (Price, Color and Rating), as well as executing the triggers of other components.

There are three main parent components:

### CategoryContainer
This container is responsible for fetching the product categories.

### ProductContainer
This container is responsible for fetching filtered products, please note that the `id` of the category selected from the previous container is used to fetch the products.

### FilterContainer
This container contains all the filteration componenets used, each component boundries/ limits are populated based on the retrieved products in the previous container.
Whenever the user applies any filter(s), a method in the products container is triggered to fetch the new products without removing/ destroying the previously set boundries/ limits.

## Shortcomings
1- The retrieved products are not paged, which is not optimal.  
2- This project doesn't provide any localization options, all the strings/ texts are in English and can't be changed.


