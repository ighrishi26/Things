import { Link } from "react-router-dom";
import products from "../data/products";

function FeaturedCategories() {

  const categories = [
    {
      name: "Sneakers",
      subtitle: "Step into something better.",
      image: products.find(
        (product) => product.category === "Sneakers"
      )?.image
    },
    {
      name: "Electronics",
      subtitle: "Tech worth having.",
      image: products.find(
        (product) => product.category === "Electronics"
      )?.image
    },
    {
      name: "Accessories",
      subtitle: "The details matter.",
      image: products.find(
        (product) => product.category === "Accessories"
      )?.image
    },
    {
      name: "Home",
      subtitle: "Make your space yours.",
      image: products.find(
        (product) => product.category === "Home"
      )?.image
    }
  ];

  return (
    <section className="featured-categories">

      <div className="featured-header">

        <div>
          <p className="featured-label">
            BROWSE BY TYPE
          </p>

          <h2>
            Find Your Thing
          </h2>
        </div>

        <Link
          to="/categories"
          className="featured-all-link"
        >
          View All →
        </Link>

      </div>

      <div className="featured-grid">

        {categories.map((category) => (

          <Link
            key={category.name}
            to={`/shop?category=${encodeURIComponent(category.name)}`}
            className="featured-category-card"
          >

            <img
              src={category.image}
              alt={category.name}
            />

            <div className="featured-category-overlay">

              <div className="featured-category-content">

                <p>
                  {category.subtitle}
                </p>

                <h3>
                  {category.name}
                </h3>

                <span>
                  Explore →
                </span>

              </div>

            </div>

          </Link>

        ))}

      </div>

    </section>
  );
}

export default FeaturedCategories;