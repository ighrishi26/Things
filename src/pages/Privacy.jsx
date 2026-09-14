function Privacy() {
  return (
    <main className="info-page">
      <div className="info-container">

        <div className="info-header">
          <p>PRIVACY</p>
          <h1>Your privacy matters.</h1>
          <span>
            A simple overview of how information
            is handled on Things.
          </span>
        </div>

        <div className="info-content">

          <section>
            <h2>Information we collect</h2>
            <p>
              Things may collect information that you
              provide while using the website, such as
              contact and delivery details during
              checkout.
            </p>
          </section>

          <section>
            <h2>How information is used</h2>
            <p>
              Information is used to provide the
              shopping experience, process orders,
              maintain your saved products and improve
              the website.
            </p>
          </section>

          <section>
            <h2>Local storage</h2>
            <p>
              This frontend project uses browser
              localStorage to keep information such as
              your cart, My List, recently viewed
              products, orders and theme preference.
            </p>
          </section>

          <section>
            <h2>Your control</h2>
            <p>
              You can remove saved products, clear your
              cart, clear your order history and change
              your theme preference directly from the
              website.
            </p>
          </section>

        </div>

      </div>
    </main>
  );
}

export default Privacy;
