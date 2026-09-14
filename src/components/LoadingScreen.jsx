import { useEffect, useState } from "react";

function LoadingScreen() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (!visible) {
    return null;
  }

  return (
    <div className="loading-screen">
      <div className="loading-content">

        <div className="loading-logo">
          THINGS
        </div>

        <div className="loading-line">
          <span></span>
        </div>

        <p>
          Discover your next thing
        </p>

      </div>
    </div>
  );
}

export default LoadingScreen;
