import React, { useState } from "react";
import { useEffect } from "react";
import { UseAuth } from "../../../context/AuthContext";
import { EmptyState } from "../../../component/general/states/EmptyState";
import { EMPTY_STATES } from "../../../constants/emptyStatesCopies";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { convertToNaira } from "../../../utilities/money";
import { getOrderDate } from "../../../feature/checkout/utilities";
import { getUserOrders } from "../../../lib/validation/orders";
import { BsChevronRight } from "react-icons/bs";
import { LuDot } from "react-icons/lu";
import { FaCircleDot } from "react-icons/fa6";
import "./OrdersPage.css";

const OrdersPage = () => {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);

  const { session } = UseAuth();
  const user = session?.user;

  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;
    const fetchOrders = async () => {
      const result = await getUserOrders(user);
      if (result.success) {
        setOrders(result.data);
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
      <div className="pages-wrapper">
        <EmptyState
          {...EMPTY_STATES.orders}
          onAction={() => {
            navigate("/shop");
          }}
        />
      </div>
    );

  return (
    <div className="orders-list-card pages-wrapper">
      <header>
        <h2>My Orders</h2>
        <p className="support-txt card-text-body">
          Track and manage your book orders
        </p>
      </header>
      <p className="details-card-header">{orders.length} Orders</p>
      <article className="my-order-wrapper">
        {orders.map((order) => (
          <Link
            key={order.id}
            to={`/account/order-details/${order.id}`}
            className={`my-order-item ${order.status}-order`}
          >
            <div className="my-order-items-wrapper">
              <div className="my-order-img-wrapper">
                {order.items.map((item, index) =>
                  index < 2 ? (
                    <div className="my-order-img-container" key={index}>
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

export default OrdersPage;
