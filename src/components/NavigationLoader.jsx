import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function NavigationLoader() {
  const location = useLocation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let frameId;

    frameId = requestAnimationFrame(() => {
      setVisible(true);
    });

    const timer = setTimeout(() => {
      setVisible(false);
    }, 350);

    return () => {
      cancelAnimationFrame(frameId);
      clearTimeout(timer);
    };
  }, [location.pathname, location.search]);

  if (!visible) {
    return null;
  }

  return (
    <div className="navigation-loader">
      <div className="navigation-loader-bar"></div>
    </div>
  );
}

export default NavigationLoader;