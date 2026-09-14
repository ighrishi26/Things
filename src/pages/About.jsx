import { Link } from "react-router-dom";

function About() {
  return (
    <main className="info-page">
      <div className="info-container">

        <div className="info-header">
          <p>ABOUT THINGS</p>
          <h1>Things worth having.</h1>
          <span>
            We believe great products don't need
            to be complicated.
          </span>
        </div>

        <div className="info-content">

          <section>
            <h2>Our idea</h2>

            <p>
              Things is a modern e-commerce concept
              built around discovering products that
              are useful, interesting and worth adding
              to your everyday life.
            </p>

            <p>
              From technology and sneakers to home
              products and accessories, we bring
              different categories together in one
              simple shopping experience.
            </p>
          </section>

          <section>
            <h2>What we value</h2>

            <div className="info-values">

              <div>
                <strong>01</strong>
                <h3>Simple</h3>
                <p>
                  Shopping should feel easy and
                  straightforward.
                </p>
              </div>

              <div>
                <strong>02</strong>
                <h3>Curated</h3>
                <p>
                  Every Thing should have a reason
                  to be here.
                </p>
              </div>

              <div>
                <strong>03</strong>
                <h3>Useful</h3>
                <p>
                  We focus on products that fit
                  real everyday life.
                </p>
              </div>

            </div>
          </section>

        </div>

        <div className="info-cta">
          <div>
            <p>READY TO EXPLORE?</p>
            <h2>Find your next Thing.</h2>
          </div>

          <Link to="/shop">
            Shop Things →
          </Link>
        </div>

      </div>
    </main>
  );
}

export default About;