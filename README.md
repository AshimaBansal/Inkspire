# Inkspire – Custom Product Marketplace

## Overview
Inkspire is a web application that allows users to browse and customize products such as posters and simple 3D items. Users can view products, apply filters, add items to a cart, and go through a basic checkout flow.

The project is built to demonstrate understanding of JavaScript concepts, API integration, and UI development.


## Purpose
The main objective of this project is to:

* Work with a public API using fetch
* Build a responsive user interface
* Implement features like search, filter, and sort using JavaScript array methods
* Understand how real-world e-commerce platforms function at a basic level


## API Used

* Unsplash API
  Used to fetch images for the poster gallery.

* Dummy/Fake product API (if used)
  Used to simulate product data like categories and prices.


## Features

### Product Section
* Display products with images, title, and price
* Product detail page with options like size, quantity, and material
* Basic price calculation based on selected options
* Option to upload a custom image


### Cart & Checkout
* Add items to cart
* Remove items from cart
* Update quantity
* View total price
* Simple checkout form (name, address, contact)
* Order confirmation screen


### Search, Filter, and Sort
* Search products by name
* Filter products by category or price
* Sort products based on price or other criteria

(All implemented using array methods like filter and sort)


### UI Features
* Responsive design for different screen sizes
* Dark and light mode toggle
* Loading indicator while fetching data


### Additional Features (Optional)
* Wishlist using localStorage
* Pagination for product listing
* Debouncing in search input
  

## Technologies Used
* HTML
* CSS (or Tailwind CSS)
* JavaScript
* React


## Project Setup
1. Clone the repository

   ```bash
   git clone https://github.com/your-username/inkspire.git
   ```

2. Navigate to the project folder

   ```bash
   cd inkspire
   ```

3. Install dependencies

   ```bash
   npm install
   ```

4. Start the development server

   ```bash
   npm run dev
   ```

5. Open in browser

   ```
   http://localhost:5173
   ```

## Notes
* This project is for learning purposes and simulates an e-commerce platform.
* Payment and backend services are not fully implemented.
* Data may be fetched from public APIs or mocked locally.


## Conclusion
Inkspire is a simple implementation of a customizable product marketplace. It focuses on applying JavaScript concepts, handling API data, and building an interactive user interface.

## Author
Ashima Bansal
GitHub: https://github.com/AshimaBansal
