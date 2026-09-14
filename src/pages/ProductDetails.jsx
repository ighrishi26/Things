import { useEffect, useState } from "react";
import {
  Link,
  useNavigate,
  useParams
} from "react-router-dom";

import ProductCard from "../components/ProductCard";
import products from "../data/products";

function ProductDetails({ showToast }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const product = products.find(
    (item) =>
      String(item.id) === String(id)
  );

  const [quantity, setQuantity] = useState(1);

  const [saved, setSaved] = useState(() => {
    const list =
      JSON.parse(
        localStorage.getItem("things-list")
      ) || [];

    return product
      ? list.some(
          (item) => item.id === product.id
        )
      : false;
  });

  useEffect(() => {
    if (!product) {
      return;
    }

    const saved =
      JSON.parse(
        localStorage.getItem(
          "things-recently-viewed"
        )
      ) || [];

    const updated = [
      product.id,
      ...saved.filter(
        (savedId) =>
          String(savedId) !==
          String(product.id)
      )
    ].slice(0, 6);

    localStorage.setItem(
      "things-recently-viewed",
      JSON.stringify(updated)
    );

    window.dispatchEvent(
  new Event("things-recently-viewed-updated")
);
  }, [product]);

  if (!product) {
    return (
      <main className="product-not-found">

        <div>
          <p>THINGS</p>

          <h1>
            Product Not Found
          </h1>

          <span>
            This product doesn't exist
            or may have been removed.
          </span>

          <Link to="/shop">
            Back to Shop
          </Link>
        </div>

      </main>
    );
  }

  const relatedProducts = products
    .filter(
      (item) =>
        item.category === product.category &&
        item.id !== product.id
    )
    .slice(0, 4);

  const increaseQuantity = () => {
    setQuantity(
      (current) => current + 1
    );
  };

  const decreaseQuantity = () => {
    setQuantity(
      (current) =>
        Math.max(current - 1, 1)
    );
  };

  const addToCart = () => {
    const cart =
      JSON.parse(
        localStorage.getItem("things-cart")
      ) || [];

    const existingItem = cart.find(
      (item) => item.id === product.id
    );

    let updatedCart;

    if (existingItem) {
      updatedCart = cart.map((item) =>
        item.id === product.id
          ? {
              ...item,
              quantity:
                item.quantity + quantity
            }
          : item
      );
    } else {
      updatedCart = [
        ...cart,
        {
          ...product,
          quantity
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

    const message =
      `${product.name} added to cart`;

    if (showToast) {
      showToast(message);
    }

    window.dispatchEvent(
      new CustomEvent("things-toast", {
        detail: message
      })
    );
  };

  const addToList = () => {
    const list =
      JSON.parse(
        localStorage.getItem("things-list")
      ) || [];

    const alreadyExists = list.some(
      (item) => item.id === product.id
    );

    if (alreadyExists) {
      if (showToast) {
        showToast(
          `${product.name} is already in My List`
        );
      }

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

    const message =
      `${product.name} added to My List`;

    if (showToast) {
      showToast(message);
    }
  };

  const buyNow = () => {
    addToCart();
    navigate("/checkout");
  };

  return (
    <main className="product-details-page">

      <div className="product-details-container">

        <Link
          to="/shop"
          className="product-back-link"
        >
          ← Back to Shop
        </Link>

        <div className="product-details-layout">

          <div className="product-details-gallery">

            <div className="product-main-image">

              <img
                src={product.image}
                alt={product.name}
              />

              {product.badge && (
                <span className="details-badge">
                  {product.badge}
                </span>
              )}

            </div>

            <div className="image-caption">
              <span>
                THINGS / {product.category.toUpperCase()}
              </span>

              <span>
                Premium Selection
              </span>
            </div>

          </div>

          <div className="product-details-info">

            <div className="details-category">
              {product.category}
            </div>

            <h1>
              {product.name}
            </h1>

            <div className="details-rating">

              <span className="rating-stars">
                ★
              </span>

              <strong>
                {product.rating}
              </strong>

              <span>
                Customer Rating
              </span>

            </div>

            <div className="details-price">
              ₹
              {product.price.toLocaleString(
                "en-IN"
              )}
            </div>

            <p className="details-description">
              {product.description}
            </p>

            <div className="details-divider" />

            <div className="details-section-title">
              Quantity
            </div>

            <div className="details-actions-row">

              <div className="details-quantity">

                <button
                  type="button"
                  onClick={decreaseQuantity}
                >
                  −
                </button>

                <span>
                  {quantity}
                </span>

                <button
                  type="button"
                  onClick={increaseQuantity}
                >
                  +
                </button>

              </div>

              <span className="details-stock">
                ✓ In Stock
              </span>

            </div>

            <div className="details-buttons">

              <button
                className="details-add-cart"
                onClick={addToCart}
              >
                Add to Cart
              </button>

              <button
                className={
                  saved
                    ? "details-list-button saved"
                    : "details-list-button"
                }
                onClick={addToList}
              >
                {saved ? "♥ Saved" : "♡ My List"}
              </button>

            </div>

            <button
              className="details-buy-button"
              onClick={buyNow}
            >
              Buy Now
            </button>

            <div className="product-features">

              <div className="product-feature">

                <span>🚚</span>

                <div>
                  <strong>
                    Fast Delivery
                  </strong>

                  <p>
                    Free delivery on orders
                    above ₹5,000.
                  </p>
                </div>

              </div>

              <div className="product-feature">

                <span>↩</span>

                <div>
                  <strong>
                    Easy Returns
                  </strong>

                  <p>
                    Simple returns on eligible
                    products.
                  </p>
                </div>

              </div>

              <div className="product-feature">

                <span>✓</span>

                <div>
                  <strong>
                    Quality Guaranteed
                  </strong>

                  <p>
                    Carefully selected Things.
                  </p>
                </div>

              </div>

            </div>

          </div>

        </div>

        {relatedProducts.length > 0 && (
          <section className="related-products">

            <div className="related-header">

              <div>
                <p>
                  YOU MAY ALSO LIKE
                </p>

                <h2>
                  More {product.category}
                </h2>
              </div>

              <Link to="/shop">
                View All →
              </Link>

            </div>

            <div className="related-grid">

              {relatedProducts.map(
                (relatedProduct) => (
                  <ProductCard
                    key={relatedProduct.id}
                    product={relatedProduct}
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

export default ProductDetails;
