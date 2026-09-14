import { Link } from "react-router-dom";

function Help() {
  const questions = [
    {
      title: "How do I place an order?",
      text: "Add a product to your cart, open the cart and continue to checkout. Enter your delivery details and place the order."
    },
    {
      title: "How can I save a product?",
      text: "Click the heart button on any product card or use the My List button on the product details page."
    },
    {
      title: "How does delivery work?",
      text: "Orders above ₹5,000 qualify for free delivery. Orders below that amount have a ₹99 delivery charge."
    },
    {
      title: "Where can I see my orders?",
      text: "Open the Orders page from the navigation menu to view your previous purchases."
    },
    {
      title: "Can I remove products from my list?",
      text: "Yes. Open My List and select Remove from My List below the product you want to remove."
    }
  ];

  return (
    <main className="info-page">
      <div className="info-container">

        <div className="info-header">
          <p>HELP CENTER</p>
          <h1>How can we help?</h1>
          <span>
            Find answers to common questions
            about Things.
          </span>
        </div>

        <div className="help-list">
          {questions.map((question, index) => (
            <div
              className="help-item"
              key={question.title}
            >
              <span>
                {String(index + 1).padStart(2, "0")}
              </span>

              <div>
                <h2>{question.title}</h2>
                <p>{question.text}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="info-cta">
          <div>
            <p>STILL LOOKING?</p>
            <h2>Browse the collection.</h2>
          </div>

          <Link to="/shop">
            Go to Shop →
          </Link>
        </div>

      </div>
    </main>
  );
}

export default Help;

