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

# 🎨 Inkspire — Custom Poster & 3D Print E-Commerce Store

A clean, minimal e-commerce platform for custom posters and 3D printed products. Built with vanilla HTML, CSS, and JavaScript. Powered by the Unsplash API.

---

## 🌐 Live Demo

Open `index.html` directly in your browser — no server required.

---

## 📌 Project Overview

**Concept:** Users can browse a curated gallery powered by Unsplash, upload their own designs, and complete a full end-to-end shopping flow.

**API Used:** [Unsplash API](https://api.unsplash.com/search/photos)  
Each Unsplash photo is treated as an orderable product (poster). The API drives the entire product catalog.

---

## 🗂️ File Structure

```
inkspire/
├── index.html           → Home / Hero + Featured Products
├── products.html        → Product listing (API + filter/sort/search)
├── product-detail.html  → Single product page
├── cart.html            → Cart page (localStorage)
├── checkout.html        → Address + order summary + form validation
├── payment.html         → Simulated UPI / Card / COD payment
├── order-success.html   → Confirmation + confetti animation
├── upload.html          → Drag & drop custom design upload
├── css/
│   ├── style.css        → Global styles, CSS variables, typography
│   ├── products.css     → Grid, filter sidebar, cards, skeletons
│   ├── cart.css         → Cart layout styles
│   └── checkout.css     → Forms, step indicator, payment, upload
├── js/
│   ├── api.js           → fetch() + Unsplash API calls (async/await)
│   ├── hofs.js          → All 4 HOFs clearly commented
│   ├── cart.js          → Cart logic + localStorage + throttle
│   ├── products.js      → Render products, pagination, wishlist
│   ├── search.js        → Search + debounce (300ms)
│   ├── upload.js        → Drag & drop upload UI + preview
│   └── theme.js         → Dark/light mode toggle
└── README.md
```

---

## 🔌 API Integration

**Unsplash API** — `https://api.unsplash.com/search/photos`

- Uses `fetch()` with `async/await`
- Graceful error handling with `try/catch` + mock data fallback
- Pagination via `?page=N` query parameter
- Each photo from the API becomes a product with auto-generated price based on `likes`

**Setup:** Replace `YOUR_UNSPLASH_CLIENT_ID` in `js/api.js` with your Unsplash Access Key from [unsplash.com/oauth/applications](https://unsplash.com/oauth/applications).

---

## ⚙️ Higher Order Functions (HOFs)

All 4 HOFs are in `js/hofs.js` with clear comments:

| HOF | Use |
|-----|-----|
| `.map()` | Transform raw Unsplash API response into product objects |
| `.filter()` | Filter products by category, maxPrice, material |
| `.sort()` | Sort by price-asc, price-desc, newest |
| `.reduce()` | Calculate cart total from cart items array |

---

## 🚀 Features

### Core
- ✅ Public API integration (Unsplash) with `fetch`
- ✅ All 4 array HOFs: `.map()`, `.filter()`, `.sort()`, `.reduce()`
- ✅ Search, filtering, sorting — no `for`/`while` loops
- ✅ Fully responsive (mobile, tablet, desktop)
- ✅ Dark / Light mode toggle (CSS variables)

### Shopping Flow
- ✅ Product grid (12/page) with images, price, add to cart
- ✅ Product detail page with size/material selector & live price
- ✅ Cart with quantity controls, remove, order summary
- ✅ Checkout with address form + validation
- ✅ Simulated payment (UPI / Card / COD)
- ✅ Order success with random order ID + confetti

### Bonus
- ✅ **Debounce** — 300ms on search input
- ✅ **Throttle** — max 1 add-to-cart click per 500ms
- ✅ **Pagination** — 12 products/page, Unsplash `?page=N`
- ✅ **Loading skeletons** — animated cards while API fetches
- ✅ **Toast notifications** — slide-in for add to cart & wishlist
- ✅ **localStorage** — cart, wishlist, theme, last search
- ✅ **Custom upload** — drag & drop JPG/PNG/PDF/STL with preview

---

## 🎨 Design

| Token | Value |
|-------|-------|
| Background | `#FAFAF8` (light) / `#0D0D0D` (dark) |
| Text | `#1A1A1A` |
| Accent | `#C8A96E` (gold) |
| Borders | `#E8E4DE` |
| Heading font | Playfair Display |
| Body font | DM Sans |

Inspired by **Society6** — editorial typography, clean white grid, generous whitespace.

---

## 🛠️ Setup & Run

1. Clone the repo:
   ```bash
   git clone https://github.com/yourusername/inkspire.git
   cd inkspire
   ```

2. (Optional) Add Unsplash API key in `js/api.js`:
   ```js
   const UNSPLASH_ACCESS_KEY = 'your_key_here';
   ```
   Without a key, the app uses built-in mock data — fully functional.

3. Open `index.html` in any modern browser.

No build step, no npm install, no server required.

---

## 📅 Milestones

| Milestone | Status |
|-----------|--------|
| M1 — Project Setup & README | ✅ Done |
| M2 — API Integration | ✅ Done |
| M3 — Core Features (HOFs, Search, Filter, Sort, Dark Mode) | ✅ Done |
| M4 — Documentation & Final Submission | ✅ Done |

---

## 🧑‍💻 Technologies

- HTML5 (semantic elements, SEO meta tags)
- CSS3 (custom properties, grid, flexbox, animations)
- Vanilla JavaScript (ES6+, async/await, localStorage)
- Unsplash API (free tier)
- Google Fonts (Playfair Display + DM Sans)
- Phosphor Icons (outline icon set)
