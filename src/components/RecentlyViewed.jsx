import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import products from "../data/products";

function RecentlyViewed() {
  const [recentProducts, setRecentProducts] = useState([]);

  useEffect(() => {
    const updateRecentlyViewed = () => {
      const savedIds =
        JSON.parse(
          localStorage.getItem(
            "things-recently-viewed"
          )
        ) || [];

      const viewedProducts = savedIds
        .map((id) =>
          products.find(
            (product) =>
              String(product.id) === String(id)
          )
        )
        .filter(Boolean);

      setRecentProducts(viewedProducts);
    };

    updateRecentlyViewed();

    window.addEventListener(
      "things-recently-viewed-updated",
      updateRecentlyViewed
    );

    return () => {
      window.removeEventListener(
        "things-recently-viewed-updated",
        updateRecentlyViewed
      );
    };
  }, []);

  if (recentProducts.length === 0) {
    return null;
  }

  return (
    <section className="recently-viewed">
      <div className="recently-viewed-header">
        <div>
          <p className="recently-viewed-label">
            YOUR ACTIVITY
          </p>

          <h2>
            Recently Viewed
          </h2>
        </div>
      </div>

      <div className="recently-viewed-row">
        {recentProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </section>
  );
}

export default RecentlyViewed;