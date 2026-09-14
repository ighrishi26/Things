import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function PageTitle() {
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;

    const titles = {
      "/": "THINGS — Find Your Next Thing",
      "/shop": "THINGS — Shop",
      "/categories": "THINGS — Categories",
      "/search": "THINGS — Search",
      "/my-list": "THINGS — My List",
      "/cart": "THINGS — Cart",
      "/checkout": "THINGS — Checkout",
      "/orders": "THINGS — Orders",
      "/about": "THINGS — About",
      "/help": "THINGS — Help",
      "/privacy": "THINGS — Privacy",
      "/terms": "THINGS — Terms"
    };

    if (path.startsWith("/product/")) {
      document.title = "THINGS — Product";
      return;
    }

    document.title =
      titles[path] ||
      "THINGS — Find Your Next Thing";
  }, [location.pathname]);

  return null;
}

export default PageTitle;