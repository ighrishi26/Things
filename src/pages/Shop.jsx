import { useState } from "react";
import { useSearchParams } from "react-router-dom";

import ProductCard from "../components/ProductCard";
import products from "../data/products";

function Shop() {
  const [searchParams, setSearchParams] =
    useSearchParams();

  const category =
    searchParams.get("category") || "All";

  const [sort, setSort] =
    useState("default");

  const categories = [
    "All",
    "Sneakers",
    "Electronics",
    "Accessories",
    "Home",
    "Gaming"
  ];

  const handleCategoryChange = (
    selectedCategory
  ) => {
    if (selectedCategory === "All") {
      setSearchParams({});
    } else {
      setSearchParams({
        category: selectedCategory
      });
    }
  };

  const handleSortChange = (e) => {
    setSort(e.target.value);
  };

  let filteredProducts =
    category === "All"
      ? [...products]
      : products.filter(
          (product) =>
            product.category === category
        );

  if (sort === "low-high") {
    filteredProducts.sort(
      (a, b) => a.price - b.price
    );
  }

  if (sort === "high-low") {
    filteredProducts.sort(
      (a, b) => b.price - a.price
    );
  }

  if (sort === "rating") {
    filteredProducts.sort(
      (a, b) => b.rating - a.rating
    );
  }

  if (sort === "name") {
    filteredProducts.sort(
      (a, b) =>
        a.name.localeCompare(b.name)
    );
  }

  return (
    <main className="shop-page">

      <div className="shop-container">

        <div className="shop-header">

          <div>
            <p className="shop-label">
              THE COLLECTION
            </p>

            <h1>
              Shop Things
            </h1>

            <p>
              Discover something worth adding
              to your collection.
            </p>
          </div>

          <div className="shop-header-count">
            <strong>
              {filteredProducts.length}
            </strong>

            <span>
              {filteredProducts.length === 1
                ? "Thing"
                : "Things"}
            </span>
          </div>

        </div>

        <div className="shop-toolbar">

          <div className="shop-categories">

            {categories.map(
              (item) => (
                <button
                  key={item}
                  className={
                    category === item
                      ? "shop-category active"
                      : "shop-category"
                  }
                  onClick={() =>
                    handleCategoryChange(item)
                  }
                >
                  {item}
                </button>
              )
            )}

          </div>

          <div className="shop-sort">

            <label htmlFor="sort">
              SORT BY
            </label>

            <select
              id="sort"
              value={sort}
              onChange={handleSortChange}
            >
              <option value="default">
                Recommended
              </option>

              <option value="low-high">
                Price: Low to High
              </option>

              <option value="high-low">
                Price: High to Low
              </option>

              <option value="rating">
                Highest Rated
              </option>

              <option value="name">
                Name: A to Z
              </option>
            </select>

          </div>

        </div>

        <div className="shop-results-bar">

          <span>
            {category === "All"
              ? "All Things"
              : `${category} Things`}
          </span>

          {sort !== "default" && (
            <button
              className="clear-sort"
              onClick={() =>
                setSort("default")
              }
            >
              Clear Sort ×
            </button>
          )}

        </div>

        {filteredProducts.length === 0 ? (
          <div className="shop-empty">

            <div className="shop-empty-icon">
              ◌
            </div>

            <h2>
              Nothing found
            </h2>

            <p>
              There are no products in this
              category yet.
            </p>

            <button
              onClick={() =>
                handleCategoryChange("All")
              }
            >
              View All Things
            </button>

          </div>
        ) : (
          <div className="shop-grid">

            {filteredProducts.map(
              (product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                />
              )
            )}

          </div>
        )}

      </div>

    </main>
  );
}

export default Shop;