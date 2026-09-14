import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">

      <div className="footer-content">

        <div className="footer-brand">

          <Link
            to="/"
            className="footer-logo"
          >
            THINGS
          </Link>

          <p>
            Discover products you'll love,
            from everyday essentials to
            things you didn't know you needed.
          </p>

        </div>

        <div className="footer-column">

          <h3>Explore</h3>

          <Link to="/">
            Home
          </Link>

          <Link to="/shop">
            Shop
          </Link>

          <Link to="/categories">
            Categories
          </Link>

          <Link to="/search">
            Search
          </Link>

        </div>

        <div className="footer-column">

          <h3>Your Things</h3>

          <Link to="/my-list">
            My List
          </Link>

          <Link to="/cart">
            Cart
          </Link>

          <Link to="/orders">
            Orders
          </Link>

        </div>

        <div className="footer-column">
  <h3>About</h3>
  <Link to="/about">About Things</Link>
  <Link to="/help">Help Center</Link>
  <Link to="/privacy">Privacy</Link>
  <Link to="/terms">Terms</Link>
</div>

      </div>

      <div className="footer-bottom">

        <span>
          © {new Date().getFullYear()} Things.
          All rights reserved.
        </span>

        <span>
          Made with React
        </span>

      </div>

    </footer>
  );
}

export default Footer;