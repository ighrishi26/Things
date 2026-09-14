import { useEffect } from "react";

function Toast({ message, onClose }) {

  useEffect(() => {

    if (!message) {
      return;
    }

    const timer = setTimeout(() => {
      onClose();
    }, 2200);

    return () => clearTimeout(timer);

  }, [message, onClose]);

  if (!message) {
    return null;
  }

  return (
    <div className="toast">

      <span className="toast-icon">
        ✓
      </span>

      <span>
        {message}
      </span>

    </div>
  );
}

export default Toast;