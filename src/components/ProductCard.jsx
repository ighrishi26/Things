import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function ProductCard({ product }) {

  const [saved, setSaved] = useState(() => {
    const list =
      JSON.parse(localStorage.getItem("things-list")) || [];

    return list.some(
      (item) => item.id === product.id
    );
  });

  useEffect(() => {
  const updateSavedState = () => {
    const list =
      JSON.parse(
        localStorage.getItem("things-list")
      ) || [];

    setSaved(
      list.some(
        (item) => item.id === product.id
      )
    );
  };

  window.addEventListener(
    "things-list-updated",
    updateSavedState
  );

  return () => {
    window.removeEventListener(
      "things-list-updated",
      updateSavedState
    );
  };
}, [product.id]);

  const addToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const cart =
      JSON.parse(localStorage.getItem("things-cart")) || [];

    const existingItem = cart.find(
      (item) => item.id === product.id
    );

    let updatedCart;

    if (existingItem) {
      updatedCart = cart.map((item) =>
        item.id === product.id
          ? {
              ...item,
              quantity: item.quantity + 1
            }
          : item
      );
    } else {
      updatedCart = [
        ...cart,
        {
          ...product,
          quantity: 1
        }
      ];
    }

    localStorage.setItem(
      "things-cart",
      JSON.stringify(updatedCart)
    );

    window.dispatchEvent(
      new Event("things-cart-updated")
    );

    window.dispatchEvent(
      new CustomEvent("things-toast", {
        detail: `${product.name} added to cart`
      })
    );
  };

  const addToList = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const list =
      JSON.parse(localStorage.getItem("things-list")) || [];

    const alreadyExists = list.some(
      (item) => item.id === product.id
    );

    if (alreadyExists) {
      window.dispatchEvent(
        new CustomEvent("things-toast", {
          detail: `${product.name} is already in My List`
        })
      );

      return;
    }

    const updatedList = [
      ...list,
      product
    ];

    localStorage.setItem(
      "things-list",
      JSON.stringify(updatedList)
    );

    setSaved(true);

    window.dispatchEvent(
      new Event("things-list-updated")
    );

    window.dispatchEvent(
      new CustomEvent("things-toast", {
        detail: `${product.name} added to My List`
      })
    );
  };

  return (
    <div className="product-card">

      <Link
        to={`/product/${product.id}`}
        className="product-card-link"
      >

        <div className="product-image-container">

          <img
            src={product.image}
            alt={product.name}
            className="product-image"
          />

          {product.badge && (
            <span className="product-badge">
              {product.badge}
            </span>
          )}

          <div className="product-overlay">

            <span className="view-product">
              View Product →
            </span>

          </div>

        </div>

        <div className="product-info">

          <div className="product-title-row">

            <h3>{product.name}</h3>

            <span className="product-rating">
              ★ {product.rating}
            </span>

          </div>

          <p className="product-category">
            {product.category}
          </p>

          <div className="product-bottom">

            <span className="product-price">
              ₹{product.price.toLocaleString("en-IN")}
            </span>

            <span className="quick-view">
              View →
            </span>

          </div>

        </div>

      </Link>

      <div className="product-actions">

        <button
          className={
            saved
              ? "card-action-button saved-action"
              : "card-action-button"
          }
          onClick={addToList}
          title={
            saved
              ? "Already in My List"
              : "Add to My List"
          }
        >
          {saved ? "♥" : "♡"}
        </button>

        <button
          className="card-action-button cart-action"
          onClick={addToCart}
          title="Add to Cart"
        >
          🛒
        </button>

      </div>

    </div>
  );
}

export default ProductCard;