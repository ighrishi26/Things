import {
  useEffect,
  useState
} from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Toast from "./components/Toast";
import LoadingScreen from "./components/LoadingScreen";
import NavigationLoader from "./components/NavigationLoader";

import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Categories from "./pages/Categories";
import ProductDetails from "./pages/ProductDetails";
import SearchResults from "./pages/SearchResults";
import MyList from "./pages/MyList";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";
import About from "./pages/About";
import Help from "./pages/Help";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import PageTitle from "./components/PageTitle";
import ScrollToTop from "./components/ScrollToTop";
import BackToTop from "./components/BackToTop";
import NotFound from "./pages/NotFound";

import "./App.css";

function App() {
  const [toastMessage, setToastMessage] = useState("");

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("things-theme") || "dark";
  });

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);

    localStorage.setItem(
      "things-theme",
      theme
    );
  }, [theme]);

  useEffect(() => {
    const handleToast = (event) => {
      setToastMessage(event.detail);
    };

    window.addEventListener(
      "things-toast",
      handleToast
    );

    return () => {
      window.removeEventListener(
        "things-toast",
        handleToast
      );
    };
  }, []);

  const toggleTheme = () => {
    setTheme((currentTheme) =>
      currentTheme === "dark"
        ? "light"
        : "dark"
    );
  };

  return (
    <BrowserRouter>
  <PageTitle />
  <ScrollToTop />
  <NavigationLoader />

  <LoadingScreen />

      <Navbar
        theme={theme}
        toggleTheme={toggleTheme}
      />

      <Routes>
  <Route path="/" element={<Home />} />
  <Route path="/shop" element={<Shop />} />
  <Route path="/categories" element={<Categories />} />
  <Route
    path="/product/:id"
    element={
      <ProductDetails
        showToast={setToastMessage}
      />
    }
  />
  <Route path="/search" element={<SearchResults />} />
  <Route path="/my-list" element={<MyList />} />
  <Route path="/cart" element={<Cart />} />
  <Route path="/checkout" element={<Checkout />} />
  <Route path="/orders" element={<Orders />} />

  <Route path="/about" element={<About />} />
  <Route path="/help" element={<Help />} />
  <Route path="/privacy" element={<Privacy />} />
  <Route path="/terms" element={<Terms />} />

  <Route path="*" element={<NotFound />} />
</Routes>

      <Footer />

      <Toast
        message={toastMessage}
        onClose={() => setToastMessage("")}
      />
  <BackToTop />
    </BrowserRouter>
  );
}

export default App;