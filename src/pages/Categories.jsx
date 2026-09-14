import { Link } from "react-router-dom";
import products from "../data/products";

function Categories() {
  const categoryData = [
    {
      name: "Sneakers",
      description: "Step up your everyday style.",
      image: products.find(
        (product) => product.category === "Sneakers"
      )?.image
    },
    {
      name: "Electronics",
      description: "Smart tech for everyday life.",
      image: products.find(
        (product) => product.category === "Electronics"
      )?.image
    },
    {
      name: "Accessories",
      description: "The details make the difference.",
      image: products.find(
        (product) => product.category === "Accessories"
      )?.image
    },
    {
      name: "Home",
      description: "Make your space feel like yours.",
      image: products.find(
        (product) => product.category === "Home"
      )?.image
    },
    {
      name: "Gaming",
      description: "Level up your gaming setup.",
      image: products.find(
        (product) => product.category === "Gaming"
      )?.image
    }
  ];

  const categories = categoryData.map((category) => ({
    ...category,
    count: products.filter(
      (product) =>
        product.category === category.name
    ).length
  }));

  const featuredCategory = categories[0];
  const remainingCategories = categories.slice(1);

  return (
    <main className="categories-page">
      <div className="categories-container">

        <div className="categories-header">
          <div>
            <p className="categories-label">
              EXPLORE THE COLLECTION
            </p>

            <h1>
              Categories
            </h1>

            <p className="categories-description">
              Find your next thing by exploring
              our collection of products.
            </p>
          </div>

          <div className="categories-total">
            <strong>
              {products.length}
            </strong>

            <span>
              Products
            </span>
          </div>
        </div>

        <Link
          to={`/shop?category=${encodeURIComponent(
            featuredCategory.name
          )}`}
          className="featured-category"
        >
          <img
            src={featuredCategory.image}
            alt={featuredCategory.name}
          />

          <div className="featured-category-overlay">
            <div className="featured-category-content">
              <span className="featured-category-label">
                FEATURED CATEGORY
              </span>

              <h2>
                {featuredCategory.name}
              </h2>

              <p>
                {featuredCategory.description}
              </p>

              <div className="featured-category-bottom">
                <span>
                  {featuredCategory.count}{" "}
                  {featuredCategory.count === 1
                    ? "Thing"
                    : "Things"}
                </span>

                <span>
                  Explore Category →
                </span>
              </div>
            </div>
          </div>
        </Link>

        <div className="categories-section-heading">
          <div>
            <p>
              BROWSE MORE
            </p>

            <h2>
              Find Your Thing
            </h2>
          </div>
        </div>

        <div className="categories-grid">
          {remainingCategories.map(
            (category) => (
              <Link
                key={category.name}
                to={`/shop?category=${encodeURIComponent(
                  category.name
                )}`}
                className="category-card"
              >
                <img
                  src={category.image}
                  alt={category.name}
                />

                <div className="category-card-overlay">
                  <div className="category-card-content">
                    <div className="category-card-top">
                      <span>
                        {category.count}{" "}
                        {category.count === 1
                          ? "Thing"
                          : "Things"}
                      </span>
                    </div>

                    <h3>
                      {category.name}
                    </h3>

                    <p>
                      {category.description}
                    </p>

                    <span className="category-explore">
                      Explore →
                    </span>
                  </div>
                </div>
              </Link>
            )
          )}
        </div>

        <div className="categories-cta">
          <div>
            <p>
              CAN'T DECIDE?
            </p>

            <h2>
              Explore Everything.
            </h2>

            <span>
              Browse the complete Things collection.
            </span>
          </div>

          <Link
            to="/shop"
            className="categories-cta-button"
          >
            View All Things →
          </Link>
        </div>

      </div>
    </main>
  );
}

export default Categories;
