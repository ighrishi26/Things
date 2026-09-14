# THINGS

A modern Netflix-inspired e-commerce frontend built with React and Vite.

THINGS focuses on a cinematic shopping experience where users can discover products, browse categories, save products, manage a cart, complete a checkout flow and view previous orders.

## Features

* Netflix-inspired dark UI
* Responsive design
* Product browsing
* Category filtering
* Product sorting
* Product details
* Search functionality
* My List / wishlist
* Shopping cart
* Quantity management
* Checkout form
* Order history
* Recently viewed products
* Dark / light theme
* Toast notifications
* Mobile navigation
* 404 page
* Local browser storage

## Tech Stack

* React
* Vite
* React Router
* JavaScript
* CSS
* Browser localStorage

## Project Structure

```text
Things/
│
├── public/
│
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Hero.jsx
│   │   ├── ProductCard.jsx
│   │   ├── ProductRow.jsx
│   │   ├── FeaturedCategories.jsx
│   │   ├── RecentlyViewed.jsx
│   │   ├── Toast.jsx
│   │   ├── LoadingScreen.jsx
│   │   └── Footer.jsx
│   │
│   ├── data/
│   │   └── products.js
│   │
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Shop.jsx
│   │   ├── Categories.jsx
│   │   ├── ProductDetails.jsx
│   │   ├── SearchResults.jsx
│   │   ├── MyList.jsx
│   │   ├── Cart.jsx
│   │   ├── Checkout.jsx
│   │   ├── Orders.jsx
│   │   ├── About.jsx
│   │   ├── Help.jsx
│   │   ├── Privacy.jsx
│   │   ├── Terms.jsx
│   │   └── NotFound.jsx
│   │
│   ├── App.jsx
│   ├── App.css
│   └── index.css
│
├── package.json
└── vite.config.js
```

## Main User Flow

```text
Home
  ↓
Shop / Categories
  ↓
Product Details
  ↓
Add to Cart / My List
  ↓
Cart
  ↓
Checkout
  ↓
Order Placed
  ↓
Orders
```

## Local Storage

The application uses browser localStorage for frontend persistence.

The following keys are used:

```text
things-theme
things-cart
things-list
things-recently-viewed
things-orders
```

## Installation

Clone the project and install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The application will run on the local Vite development server.

## Production Build

Create a production build:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Pages

| Route          | Purpose             |
| -------------- | ------------------- |
| `/`            | Home page           |
| `/shop`        | Product collection  |
| `/categories`  | Browse categories   |
| `/product/:id` | Product details     |
| `/search`      | Search products     |
| `/my-list`     | Saved products      |
| `/cart`        | Shopping cart       |
| `/checkout`    | Checkout            |
| `/orders`      | Order history       |
| `/about`       | About THINGS        |
| `/help`        | Help center         |
| `/privacy`     | Privacy information |
| `/terms`       | Terms               |
| `*`            | 404 page            |

## Future Improvements

Possible future versions can include:

* Django REST API backend
* MySQL / PostgreSQL database
* User authentication
* Real product database
* Payment gateway
* Admin dashboard
* Product management
* Real order processing
* Cloud image storage
* Deployment

## Project Purpose

This project was created to practice and demonstrate modern React frontend development, component-based architecture, routing, state management, responsive UI design and browser-based data persistence.

---

**THINGS — Find Your Next Thing.**
