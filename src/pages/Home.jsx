import Hero from "../components/Hero";
import FeaturedCategories from "../components/FeaturedCategories";
import RecentlyViewed from "../components/RecentlyViewed";
import ProductRow from "../components/ProductRow";
import products from "../data/products";
import { Link } from "react-router-dom";

function Home() {
  const trending = products.filter(
    (product) =>
      product.badge === "Trending"
  );

  const newArrivals = products.filter(
    (product) =>
      product.badge === "New"
  );

  const bestSellers = products.filter(
    (product) =>
      product.badge === "Best Seller"
  );

  const sneakers = products.filter(
    (product) =>
      product.category === "Sneakers"
  );

  const electronics = products.filter(
    (product) =>
      product.category === "Electronics"
  );

  const accessories = products.filter(
    (product) =>
      product.category === "Accessories"
  );

  return (
    <main className="home-page">

      <Hero />

      <div className="home-content">

        <FeaturedCategories />

        <ProductRow
          title="Trending Things"
          products={trending}
        />

        <ProductRow
          title="New Arrivals"
          products={newArrivals}
        />

        <ProductRow
          title="Best Sellers"
          products={bestSellers}
        />

        <div className="home-divider" />

        <ProductRow
          title="Sneakers"
          products={sneakers}
        />

        <ProductRow
          title="Tech Things"
          products={electronics}
        />

        <ProductRow
          title="Accessories"
          products={accessories}
        />

        <RecentlyViewed />

        <section className="home-cta">
          <div className="home-cta-content">
            <p>
              THE THINGS COLLECTION
            </p>

            <h2>
              There is always
              <br />
              something new.
            </h2>

            <span>
              Explore our complete collection
              and find your next favorite thing.
            </span>
          </div>

          <Link
  to="/shop"
  className="home-cta-button"
>
  Explore All Things →
</Link>
        </section>

      </div>

    </main>
  );
}

export default Home;
