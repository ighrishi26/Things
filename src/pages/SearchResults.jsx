import {
  useMemo,
  useState
} from "react";
import { useSearchParams } from "react-router-dom";

import ProductCard from "../components/ProductCard";
import products from "../data/products";

function SearchResults() {
  const [searchParams, setSearchParams] =
    useSearchParams();

  const initialQuery =
    searchParams.get("q") || "";

  const [query, setQuery] =
    useState(initialQuery);

  const filteredProducts = useMemo(() => {
    const search = query
      .toLowerCase()
      .trim();

    if (!search) {
      return [];
    }

    return products.filter((product) => {
      return (
        product.name
          .toLowerCase()
          .includes(search) ||
        product.category
          .toLowerCase()
          .includes(search) ||
        product.description
          .toLowerCase()
          .includes(search)
      );
    });
  }, [query]);

  const handleSearch = (e) => {
    e.preventDefault();

    const value = query.trim();

    if (value) {
      setSearchParams({ q: value });
    } else {
      setSearchParams({});
    }
  };

  const clearSearch = () => {
    setQuery("");
    setSearchParams({});
  };

  const popularSearches = [
    "Sneakers",
    "Electronics",
    "Accessories",
    "Home",
    "Gaming"
  ];

  const handlePopularSearch = (value) => {
    setQuery(value);
    setSearchParams({ q: value });
  };

  return (
    <main className="search-page">
      <div className="search-container">

        <div className="search-header">
          <p className="search-label">
            DISCOVER
          </p>

          <h1>
            Search Things
          </h1>

          <p>
            Find something worth adding
            to your collection.
          </p>
        </div>

        <form
          className="search-main-form"
          onSubmit={handleSearch}
        >
          <span className="search-main-icon">
            🔍
          </span>

          <input
            type="text"
            placeholder="Search products, categories..."
            value={query}
            onChange={(e) =>
              setQuery(e.target.value)
            }
          />

          {query && (
            <button
              type="button"
              className="clear-search"
              onClick={clearSearch}
            >
              ×
            </button>
          )}

          <button
            type="submit"
            className="search-submit"
          >
            Search
          </button>
        </form>

        {!query.trim() && (
          <div className="popular-searches">
            <span>
              POPULAR
            </span>

            <div>
              {popularSearches.map(
                (item) => (
                  <button
                    key={item}
                    onClick={() =>
                      handlePopularSearch(item)
                    }
                  >
                    {item}
                  </button>
                )
              )}
            </div>
          </div>
        )}

        {!query.trim() ? (
          <div className="search-empty">
            <div className="search-empty-icon">
              🔍
            </div>

            <h2>
              What are you looking for?
            </h2>

            <p>
              Search for products, categories
              or things you might like.
            </p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="search-empty no-results">
            <div className="search-empty-icon">
              ✕
            </div>

            <h2>
              No Things Found
            </h2>

            <p>
              We couldn't find anything
              matching "{query}".
            </p>

            <button
              className="search-reset-button"
              onClick={clearSearch}
            >
              Clear Search
            </button>
          </div>
        ) : (
          <section className="search-results">

            <div className="search-results-header">
              <div>
                <p>
                  SEARCH RESULTS
                </p>

                <h2>
                  Results for "{query}"
                </h2>
              </div>

              <span>
                {filteredProducts.length}{" "}
                {filteredProducts.length === 1
                  ? "Thing"
                  : "Things"}
              </span>
            </div>

            <div className="search-grid">
              {filteredProducts.map(
                (product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                  />
                )
              )}
            </div>

          </section>
        )}

      </div>
    </main>
  );
}

export default SearchResults;