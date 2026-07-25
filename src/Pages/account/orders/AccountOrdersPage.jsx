import React, { useState } from "react";
import { useEffect } from "react";
import { convertToNaira } from "../../../utilities/money";
import { Link } from "react-router-dom";
import "./AccountOrdersPage.css";
import { toast } from "sonner";
import { UseAuth } from "../../../context/AuthContext";
import { getOrderDate } from "../../../feature/checkout/utilities";
import { BsChevronRight } from "react-icons/bs";
import { LuDot } from "react-icons/lu";
import { FaCircleDot } from "react-icons/fa6";
import { getUserOrders } from "../../../lib/validation/orders";

const AccountOrdersPage = () => {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);

  const { session } = UseAuth();
  const user = session?.user;

  useEffect(() => {
    if (!user) return;
    const fetchOrders = async () => {
      const result = await getUserOrders(user);
      if (result.success) {
        setOrders(result.data);
        // console.log(result.data);
      } else {
        toast.error("Couldn't load your orders. Please try again.");
      }
      setLoading(false);
    };
    fetchOrders();
  }, [user]);

  if (loading) return <p className="pages-wrapper">Loading your orders...</p>;
  if (orders.length === 0)
    return (
      <p className="pages-wrapper">
        No orders yet — <a href="/shop">browse the shop</a>.
      </p>
    );

  return (
    <div className="orders-list pages-wrapper">
      <header>
        <h1>My Orders</h1>
        <p className="support-txt">Track and manage your book orders</p>
      </header>
      <p className="your-order-count">{orders.length} Orders</p>
      <article className="my-order-wrapper">
        {orders.map((order) => (
          <Link
            to={`/account/order-details/${order.id}`}
            className={`my-order-item ${order.status}-order`}
          >
            <div className="my-order-items-wrapper">
              <div className="my-order-img-wrapper">
                {order.items.map((item, index) =>
                  index < 2 ? (
                    <div className="my-order-img-container">
                      {" "}
                      <img src={item.coverImage} />
                    </div>
                  ) : (
                    ""
                  ),
                )}
              </div>
              {order.items.length > 2 && (
                <div className="other-items-count">
                  <span className="order-item-count">
                    + {order.items.length - 2}
                  </span>
                </div>
              )}
            </div>

            <div className="my-order-mini-details">
              <p className="order-number">{`Order #LB-${order.id}`}</p>
              <p className="ordered-date mobile">
                {getOrderDate(order.created_at)}
              </p>
              <p className="ordered-date desktop">
                {getOrderDate(order.created_at, true)}
              </p>
              <div className={`order-status-indicator mobile ${order.status}`}>
                <FaCircleDot />
                <span>{order.status}</span>
              </div>
              <div className="order-books-n-amount-total">
                <p>{order.items.length} books</p>
                <div className="dot-container">
                  <LuDot />
                </div>
                <p> {convertToNaira(order.total)}</p>
              </div>
            </div>

            <div className="grid-end-col">
              <div className={`order-status-indicator desktop ${order.status}`}>
                <FaCircleDot />
                <span>{order.status}</span>
              </div>
              <div className="chevron-icon-wrapper">
                <BsChevronRight />
              </div>
            </div>
          </Link>
        ))}
      </article>
    </div>
  );
};

export default AccountOrdersPage;
