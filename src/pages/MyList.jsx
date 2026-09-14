import { useState } from "react";
import { Link } from "react-router-dom";

import ProductCard from "../components/ProductCard";

function MyList() {
  const [list, setList] = useState(() => {
    if (typeof window === "undefined") {
      return [];
    }

    try {
      return (
        JSON.parse(localStorage.getItem("things-list")) || []
      );
    } catch {
      return [];
    }
  });

  const removeFromList = (id) => {
    const updatedList = list.filter(
      (product) => product.id !== id
    );

    setList(updatedList);

    localStorage.setItem(
      "things-list",
      JSON.stringify(updatedList)
    );

    window.dispatchEvent(
      new Event("things-list-updated")
    );
  };

  const clearList = () => {
    const confirmed = window.confirm(
      "Are you sure you want to clear your list?"
    );

    if (!confirmed) {
      return;
    }

    setList([]);

    localStorage.removeItem("things-list");

    window.dispatchEvent(
      new Event("things-list-updated")
    );
  };

  return (
    <main className="my-list-page">
      <div className="my-list-container">

        <div className="my-list-header">
          <div>
            <p className="my-list-label">
              YOUR COLLECTION
            </p>

            <h1>
              My List
            </h1>

            <p>
              Things you've saved for later.
            </p>
          </div>

          <div className="my-list-count">
            <strong>
              {list.length}
            </strong>

            <span>
              {list.length === 1
                ? "Thing Saved"
                : "Things Saved"}
            </span>
          </div>
        </div>

        {list.length === 0 ? (
          <div className="empty-list">

            <div className="empty-list-icon">
              ♡
            </div>

            <p className="empty-list-label">
              NOTHING SAVED YET
            </p>

            <h2>
              Your list is empty
            </h2>

            <p>
              Save products you like and
              they'll appear here.
            </p>

            <Link
              to="/shop"
              className="empty-list-button"
            >
              Browse Things →
            </Link>

          </div>
        ) : (
          <>
            <div className="my-list-toolbar">
              <span>
                {list.length}{" "}
                {list.length === 1
                  ? "Thing"
                  : "Things"}{" "}
                in your collection
              </span>

              <button
                className="clear-list-button"
                onClick={clearList}
              >
                Clear All
              </button>
            </div>

            <div className="my-list-grid">
              {list.map((product) => (
                <div
                  className="my-list-item"
                  key={product.id}
                >
                  <ProductCard
                    product={product}
                  />

                  <button
                    className="remove-list-button"
                    onClick={() =>
                      removeFromList(product.id)
                    }
                  >
                    Remove from My List
                  </button>
                </div>
              ))}
            </div>

            <div className="my-list-footer">
              <div>
                <p>
                  KEEP EXPLORING
                </p>

                <h2>
                  Find your next Thing.
                </h2>

                <span>
                  Discover more products for
                  your collection.
                </span>
              </div>

              <Link
                to="/shop"
                className="my-list-shop-button"
              >
                Continue Shopping →
              </Link>
            </div>
          </>
        )}

      </div>
    </main>
  );
}

export default MyList;