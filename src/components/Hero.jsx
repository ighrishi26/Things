import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="hero">

      <div className="hero-background" />

      <div className="hero-content">

        <p className="hero-label">
          THINGS EXCLUSIVE
        </p>

        <h1>
          Find Your
          <br />
          Next Thing.
        </h1>

        <p className="hero-description">
          Discover products you'll love,
          from everyday essentials to
          things you didn't know you needed.
        </p>

        <div className="hero-buttons">

          <Link
            to="/shop"
            className="hero-button primary"
          >
            Shop Now
          </Link>

          <Link
            to="/categories"
            className="hero-button secondary"
          >
            Explore Categories
          </Link>

        </div>

      </div>

      <div className="hero-scroll">
        <span>SCROLL TO EXPLORE</span>
        <span>↓</span>
      </div>

    </section>
  );
}

export default Hero;