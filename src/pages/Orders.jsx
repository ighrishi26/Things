import { useState } from "react";
import { Link } from "react-router-dom";

function Orders() {
  const [orders, setOrders] = useState(() => {
    if (typeof window === "undefined") {
      return [];
    }

    try {
      return JSON.parse(localStorage.getItem("things-orders")) || [];
    } catch {
      return [];
    }
  });

  const clearOrders = () => {
    const confirmed = window.confirm(
      "Are you sure you want to clear your order history?"
    );

    if (!confirmed) {
      return;
    }

    localStorage.removeItem("things-orders");
    setOrders([]);
  };

  if (orders.length === 0) {
    return (
      <main className="orders-page">
        <div className="empty-orders">
          <div className="empty-orders-icon">📦</div>

          <p className="orders-label">YOUR ORDERS</p>

          <h1>No orders yet</h1>

          <p>Once you place an order, you'll find it here.</p>

          <Link to="/shop" className="empty-orders-button">
            Start Shopping
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="orders-page">
      <div className="orders-header">
        <div>
          <p className="orders-label">YOUR ACTIVITY</p>

          <h1>Orders</h1>

          <p>Track and review your Things purchases.</p>
        </div>

        <button className="clear-orders-button" onClick={clearOrders}>
          Clear History
        </button>
      </div>

      <div className="orders-count">
        {orders.length}{" "}
        {orders.length === 1 ? "order" : "orders"}{" "}
        placed
      </div>

      <div className="orders-list">
        {orders.map((order) => (
          <article className="order-card" key={order.id}>
            <div className="order-card-header">
              <div className="order-main-info">
                <div className="order-number">
                  <span>ORDER</span>

                  <strong>#{String(order.id).slice(-8)}</strong>
                </div>

                <div className="order-date">
                  <span>PLACED ON</span>

                  <strong>{order.date}</strong>
                </div>
              </div>

              <div className="order-status">
                <span className="status-dot" />
                {order.status}
              </div>
            </div>

            <div className="order-divider" />

            <div className="order-body">
              <div className="order-products">
                {order.items.map((item) => (
                  <div className="order-product" key={item.id}>
                    <Link
                      to={`/product/${item.id}`}
                      className="order-product-image"
                    >
                      <img src={item.image} alt={item.name} />
                    </Link>

                    <div className="order-product-info">
                      <Link
                        to={`/product/${item.id}`}
                        className="order-product-name"
                      >
                        {item.name}
                      </Link>

                      <p>{item.category}</p>

                      <div className="order-product-meta">
                        <span>
                          Qty: {item.quantity || 1}
                        </span>
                        <strong>
                          ${Number(item.price).toFixed(2)}
                        </strong>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="order-summary">
                <div>
                  <span>TOTAL</span>
                  <strong>${Number(order.total).toFixed(2)}</strong>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}

export default Orders;
