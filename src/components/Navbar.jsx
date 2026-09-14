import { useCallback, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

function Navbar({ theme, toggleTheme }) {
  const location = useLocation();
  const navigate = useNavigate();

  const getStoredCartCount = useCallback(() => {
    const cart =
      JSON.parse(
        localStorage.getItem("things-cart")
      ) || [];

    return cart.reduce(
      (total, item) =>
        total + (item.quantity || 0),
      0
    );
  }, []);

  const getStoredListCount = useCallback(() => {
    const list =
      JSON.parse(
        localStorage.getItem("things-list")
      ) || [];

    return list.length;
  }, []);

  const [cartCount, setCartCount] = useState(
    getStoredCartCount
  );
  const [listCount, setListCount] = useState(
    getStoredListCount
  );
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const updateCounts = useCallback(() => {
    setCartCount(getStoredCartCount());
    setListCount(getStoredListCount());
  }, [getStoredCartCount, getStoredListCount]);

  useEffect(() => {
    const handleCartUpdate = () => updateCounts();
    const handleListUpdate = () => updateCounts();

    window.addEventListener(
      "things-cart-updated",
      handleCartUpdate
    );

    window.addEventListener(
      "things-list-updated",
      handleListUpdate
    );

    return () => {
      window.removeEventListener(
        "things-cart-updated",
        handleCartUpdate
      );

      window.removeEventListener(
        "things-list-updated",
        handleListUpdate
      );
    };
  }, [updateCounts]);

  const handleSearch = (e) => {
    e.preventDefault();

    const value = searchQuery.trim();

    if (!value) {
      return;
    }

    navigate(
      `/search?q=${encodeURIComponent(value)}`
    );

    setSearchQuery("");
    setMenuOpen(false);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <header className="navbar">
      <div className="navbar-left">

        <button
          className="menu-button"
          onClick={() =>
            setMenuOpen((open) => !open)
          }
          aria-label="Toggle menu"
        >
          {menuOpen ? "×" : "☰"}
        </button>

        <Link
          to="/"
          className="navbar-logo"
        >
          THINGS
        </Link>

        <nav
          className={
            menuOpen
              ? "nav-links mobile-open"
              : "nav-links"
          }
        >
          <Link
            to="/"
            className={
              isActive("/")
                ? "active"
                : ""
            }
          >
            Home
          </Link>

          <Link
            to="/shop"
            className={
              isActive("/shop")
                ? "active"
                : ""
            }
          >
            Shop
          </Link>

          <Link
            to="/categories"
            className={
              isActive("/categories")
                ? "active"
                : ""
            }
          >
            Categories
          </Link>

          <Link
            to="/my-list"
            className={
              isActive("/my-list")
                ? "active"
                : ""
            }
          >
            My List
            {listCount > 0 && (
              <span className="nav-count">
                {listCount}
              </span>
            )}
          </Link>

          <Link
            to="/orders"
            className={
              isActive("/orders")
                ? "active"
                : ""
            }
          >
            Orders
          </Link>
        </nav>
      </div>

      <div className="navbar-right">

        <form
          className="navbar-search"
          onSubmit={handleSearch}
        >
          <span className="search-icon">
            🔍
          </span>

          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) =>
              setSearchQuery(e.target.value)
            }
          />
        </form>

        <button
          className="theme-button"
          onClick={toggleTheme}
          title={
            theme === "dark"
              ? "Switch to light mode"
              : "Switch to dark mode"
          }
        >
          {theme === "dark"
            ? "☀️"
            : "🌙"}
        </button>

        <Link
          to="/cart"
          className={
            isActive("/cart")
              ? "cart-link active"
              : "cart-link"
          }
        >
          🛒

          {cartCount > 0 && (
            <span className="nav-count">
              {cartCount}
            </span>
          )}
        </Link>

      </div>
    </header>
  );
}

export default Navbar;
