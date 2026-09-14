import { useState } from "react";
import { Link } from "react-router-dom";

function Cart() {
  const [cart, setCart] = useState(() => {
    try {
      return (
        JSON.parse(
          localStorage.getItem("things-cart")
        ) || []
      );
    } catch {
      return [];
    }
  });

  const updateCart = (updatedCart) => {
    setCart(updatedCart);

    localStorage.setItem(
      "things-cart",
      JSON.stringify(updatedCart)
    );

    window.dispatchEvent(
      new Event("things-cart-updated")
    );
  };

  const increaseQuantity = (id) => {
    const updatedCart = cart.map((item) =>
      item.id === id
        ? {
            ...item,
            quantity: item.quantity + 1
          }
        : item
    );

    updateCart(updatedCart);
  };

  const decreaseQuantity = (id) => {
    const updatedCart = cart
      .map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity - 1
            }
          : item
      )
      .filter((item) => item.quantity > 0);

    updateCart(updatedCart);
  };

  const removeItem = (id) => {
    const updatedCart = cart.filter(
      (item) => item.id !== id
    );

    updateCart(updatedCart);
  };

  const subtotal = cart.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  );

  const delivery =
    subtotal === 0 || subtotal >= 5000
      ? 0
      : 99;

  const total = subtotal + delivery;

  const remainingForFreeDelivery =
    Math.max(5000 - subtotal, 0);

  const deliveryProgress =
    Math.min((subtotal / 5000) * 100, 100);

  const totalItems = cart.reduce(
    (total, item) =>
      total + item.quantity,
    0
  );

  if (cart.length === 0) {
    return (
      <main className="cart-page">

        <div className="empty-cart">

          <div className="empty-cart-icon">
            🛒
          </div>

          <p className="cart-label">
            YOUR CART
          </p>

          <h1>
            Your cart is empty
          </h1>

          <p>
            Looks like you haven't added
            anything yet.
          </p>

          <Link
            to="/shop"
            className="empty-cart-button"
          >
            Start Shopping
          </Link>

        </div>

      </main>
    );
  }

  return (
    <main className="cart-page">

      <div className="cart-header">

        <div>
          <p className="cart-label">
            YOUR SHOPPING BAG
          </p>

          <h1>
            Cart
          </h1>

          <p>
            {totalItems}{" "}
            {totalItems === 1
              ? "item"
              : "items"}{" "}
            ready to go.
          </p>
        </div>

        <Link
          to="/shop"
          className="continue-shopping"
        >
          ← Continue Shopping
        </Link>

      </div>

      <div className="cart-layout">

        <section className="cart-items">

          {cart.map((item) => (

            <div
              className="cart-item"
              key={item.id}
            >

              <Link
                to={`/product/${item.id}`}
                className="cart-item-image"
              >
                <img
                  src={item.image}
                  alt={item.name}
                />
              </Link>

              <div className="cart-item-details">

                <div>

                  <p className="cart-item-category">
                    {item.category}
                  </p>

                  <Link
                    to={`/product/${item.id}`}
                    className="cart-item-name"
                  >
                    {item.name}
                  </Link>

                  <p className="cart-item-price">
                    ₹{item.price.toLocaleString("en-IN")}
                  </p>

                </div>

                <div className="cart-item-bottom">

                  <div className="quantity-control">

                    <button
                      onClick={() =>
                        decreaseQuantity(item.id)
                      }
                    >
                      −
                    </button>

                    <span>
                      {item.quantity}
                    </span>

                    <button
                      onClick={() =>
                        increaseQuantity(item.id)
                      }
                    >
                      +
                    </button>

                  </div>

                  <span className="cart-item-total">
                    ₹
                    {(
                      item.price *
                      item.quantity
                    ).toLocaleString("en-IN")}
                  </span>

                </div>

              </div>

              <button
                className="remove-cart-item"
                onClick={() =>
                  removeItem(item.id)
                }
                title="Remove item"
              >
                ×
              </button>

            </div>

          ))}

        </section>

        <aside className="cart-summary">

          <h2>
            Order Summary
          </h2>

          <div className="free-delivery">

            {delivery === 0 ? (
              <p className="free-delivery-success">
                ✓ You've unlocked free delivery
              </p>
            ) : (
              <>
                <p>
                  Add ₹
                  {remainingForFreeDelivery.toLocaleString(
                    "en-IN"
                  )}{" "}
                  more for free delivery
                </p>

                <div className="delivery-progress">
                  <span
                    style={{
                      width: `${deliveryProgress}%`
                    }}
                  />
                </div>
              </>
            )}

          </div>

          <div className="summary-line">
            <span>
              Subtotal
            </span>

            <span>
              ₹{subtotal.toLocaleString("en-IN")}
            </span>
          </div>

          <div className="summary-line">
            <span>
              Delivery
            </span>

            <span>
              {delivery === 0
                ? "FREE"
                : `₹${delivery}`}
            </span>
          </div>

          <div className="summary-divider" />

          <div className="summary-total">
            <span>
              Total
            </span>

            <span>
              ₹{total.toLocaleString("en-IN")}
            </span>
          </div>

          <Link
            to="/checkout"
            className="checkout-button"
          >
            Proceed to Checkout
          </Link>

          <div className="secure-checkout">
            🔒 Secure Checkout
          </div>

        </aside>

      </div>

    </main>
  );
}

export default Cart;