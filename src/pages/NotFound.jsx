import { Link } from "react-router-dom";

function NotFound() {
  return (
    <main className="not-found-page">
      <div className="not-found-container">

        <p className="not-found-label">
          THINGS / ERROR 404
        </p>

        <h1>
          This Thing
          <br />
          Doesn't Exist.
        </h1>

        <p className="not-found-description">
          The page you're looking for doesn't exist
          or may have been moved somewhere else.
        </p>

        <div className="not-found-buttons">
          <Link
            to="/"
            className="not-found-primary"
          >
            Back to Home →
          </Link>

          <Link
            to="/shop"
            className="not-found-secondary"
          >
            Explore Things
          </Link>
        </div>

        <div className="not-found-number">
          404
        </div>

      </div>
    </main>
  );
}

export default NotFound;
