import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const createOrder = (
  cart,
  form,
  subtotal,
  delivery,
  total,
  existingOrders
) => ({
  id: `order-${existingOrders.length + 1}`,
  date: new Date().toLocaleDateString("en-IN"),
  items: cart,
  customer: form,
  subtotal,
  delivery,
  total,
  status: "Order Placed"
});

function Checkout() {
  const navigate = useNavigate();

  const [cart] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("things-cart")) || [];
    } catch {
      return [];
    }
  });

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    pincode: ""
  });

  const [errors, setErrors] = useState({});
  const [placingOrder, setPlacingOrder] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((current) => ({
      ...current,
      [name]: value
    }));

    setErrors((current) => ({
      ...current,
      [name]: ""
    }));
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

  const totalItems = cart.reduce(
    (total, item) =>
      total + item.quantity,
    0
  );

  const validateForm = () => {
    const newErrors = {};

    if (!form.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        form.email
      )
    ) {
      newErrors.email = "Enter a valid email";
    }

    if (!form.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(form.phone)) {
      newErrors.phone =
        "Enter a valid 10-digit phone number";
    }

    if (!form.address.trim()) {
      newErrors.address = "Address is required";
    }

    if (!form.city.trim()) {
      newErrors.city = "City is required";
    }

    if (!form.pincode.trim()) {
      newErrors.pincode = "Pincode is required";
    } else if (!/^\d{6}$/.test(form.pincode)) {
      newErrors.pincode =
        "Enter a valid 6-digit pincode";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const placeOrder = (e) => {

  e.preventDefault();

  if (placingOrder) {
    return;
  }

  if (!validateForm()) {
    return;
  }

  setPlacingOrder(true);

    const existingOrders =
      JSON.parse(
        localStorage.getItem("things-orders")
      ) || [];

    const newOrder = createOrder(
      cart,
      form,
      subtotal,
      delivery,
      total,
      existingOrders
    );

    localStorage.setItem(
      "things-orders",
      JSON.stringify([
        newOrder,
        ...existingOrders
      ])
    );

    localStorage.removeItem("things-cart");

    window.dispatchEvent(
      new Event("things-cart-updated")
    );

    window.dispatchEvent(
      new CustomEvent("things-toast", {
        detail: "Order placed successfully"
      })
    );

    navigate("/orders");
  };

  if (cart.length === 0) {
    return (
      <main className="checkout-page">

        <div className="empty-checkout">

          <div className="empty-checkout-icon">
            🛒
          </div>

          <p className="checkout-label">
            CHECKOUT
          </p>

          <h1>
            Nothing to checkout
          </h1>

          <p>
            Add some Things to your cart before
            continuing.
          </p>

          <Link
            to="/shop"
            className="empty-checkout-button"
          >
            Browse Things
          </Link>

        </div>

      </main>
    );
  }

  return (
    <main className="checkout-page">

      <div className="checkout-header">

        <div>
          <p className="checkout-label">
            SECURE CHECKOUT
          </p>

          <h1>
            Complete Your Order
          </h1>

          <p>
            Enter your details and place your order.
          </p>
        </div>

        <Link
          to="/cart"
          className="back-to-cart"
        >
          ← Back to Cart
        </Link>

      </div>

      <form
        className="checkout-layout"
        onSubmit={placeOrder}
      >

        <div className="checkout-form">

          <section className="checkout-section">

            <div className="checkout-section-heading">
              <span>01</span>

              <div>
                <h2>Contact Information</h2>
                <p>
                  How can we reach you?
                </p>
              </div>
            </div>

            <div className="checkout-fields">

              <div className="checkout-field full-width">
                <label>
                  Full Name
                </label>

                <input
                  type="text"
                  name="name"
                  placeholder="Enter your full name"
                  value={form.name}
                  onChange={handleChange}
                />

                {errors.name && (
                  <small>
                    {errors.name}
                  </small>
                )}
              </div>

              <div className="checkout-field">
                <label>
                  Email Address
                </label>

                <input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={handleChange}
                />

                {errors.email && (
                  <small>
                    {errors.email}
                  </small>
                )}
              </div>

              <div className="checkout-field">
                <label>
                  Phone Number
                </label>

                <input
  type="tel"
  name="phone"
  placeholder="10-digit mobile number"
  maxLength="10"
  value={form.phone}
  onChange={(e) => {
    const value = e.target.value
      .replace(/\D/g, "")
      .slice(0, 10);

    setForm((current) => ({
      ...current,
      phone: value
    }));

    setErrors((current) => ({
      ...current,
      phone: ""
    }));
  }}
/>

                {errors.phone && (
                  <small>
                    {errors.phone}
                  </small>
                )}
              </div>

            </div>

          </section>

          <section className="checkout-section">

            <div className="checkout-section-heading">
              <span>02</span>

              <div>
                <h2>Delivery Address</h2>
                <p>
                  Where should we deliver your order?
                </p>
              </div>
            </div>

            <div className="checkout-fields">

              <div className="checkout-field full-width">
                <label>
                  Address
                </label>

                <textarea
                  name="address"
                  placeholder="House number, street, area..."
                  rows="4"
                  value={form.address}
                  onChange={handleChange}
                />

                {errors.address && (
                  <small>
                    {errors.address}
                  </small>
                )}
              </div>

              <div className="checkout-field">
                <label>
                  City
                </label>

                <input
                  type="text"
                  name="city"
                  placeholder="Enter your city"
                  value={form.city}
                  onChange={handleChange}
                />

                {errors.city && (
                  <small>
                    {errors.city}
                  </small>
                )}
              </div>

              <div className="checkout-field">
                <label>
                  Pincode
                </label>

                <input
  type="text"
  name="pincode"
  placeholder="6-digit pincode"
  maxLength="6"
  value={form.pincode}
  onChange={(e) => {
    const value = e.target.value
      .replace(/\D/g, "")
      .slice(0, 6);

    setForm((current) => ({
      ...current,
      pincode: value
    }));

    setErrors((current) => ({
      ...current,
      pincode: ""
    }));
  }}
/>

                {errors.pincode && (
                  <small>
                    {errors.pincode}
                  </small>
                )}
              </div>

            </div>

          </section>

          <section className="checkout-section">

            <div className="checkout-section-heading">
              <span>03</span>

              <div>
                <h2>Payment Method</h2>
                <p>
                  Select your preferred payment method.
                </p>
              </div>
            </div>

            <div className="payment-card">

              <div className="payment-radio">
                <div className="payment-radio-dot" />
              </div>

              <div className="payment-info">

                <h3>
                  Cash on Delivery
                </h3>

                <p>
                  Pay when your order arrives at
                  your doorstep.
                </p>

              </div>

              <span className="payment-badge">
                AVAILABLE
              </span>

            </div>

          </section>

        </div>

        <aside className="checkout-summary">

          <div className="checkout-summary-header">
            <h2>
              Order Summary
            </h2>

            <span>
              {totalItems}{" "}
              {totalItems === 1
                ? "item"
                : "items"}
            </span>
          </div>

          <div className="checkout-products">

            {cart.map((item) => (

              <div
                className="checkout-product"
                key={item.id}
              >

                <div className="checkout-product-image">

                  <img
                    src={item.image}
                    alt={item.name}
                  />

                  <span>
                    {item.quantity}
                  </span>

                </div>

                <div className="checkout-product-info">

                  <h3>
                    {item.name}
                  </h3>

                  <p>
                    {item.category}
                  </p>

                </div>

                <strong>
                  ₹
                  {(
                    item.price *
                    item.quantity
                  ).toLocaleString("en-IN")}
                </strong>

              </div>

            ))}

          </div>

          <div className="checkout-summary-lines">

            <div>
              <span>Subtotal</span>

              <span>
                ₹{subtotal.toLocaleString("en-IN")}
              </span>
            </div>

            <div>
              <span>Delivery</span>

              <span>
                {delivery === 0
                  ? "FREE"
                  : `₹${delivery}`}
              </span>
            </div>

          </div>

          <div className="checkout-summary-divider" />

          <div className="checkout-total">

            <span>
              Total
            </span>

            <strong>
              ₹{total.toLocaleString("en-IN")}
            </strong>

          </div>

          <button
  type="submit"
  className="place-order-button"
  disabled={placingOrder}
>
  {placingOrder
    ? "Placing Order..."
    : "Place Order"}
</button>

          <div className="checkout-security">

            <span>🔒</span>

            <p>
              Your information is secure and
              protected.
            </p>

          </div>

        </aside>

      </form>

    </main>
  );
}

export default Checkout;
