import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getOrderById } from "../../services/orderServices";
import dayjs from "dayjs";
// import { convertToNaira } from "../../utilities/money";
import "./OrderPage.css";
import { convertToNaira } from "../../utilities/money";

export default function OrderPage() {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchOrder() {
      try {
        const data = await getOrderById(id);
        console.log(data);
        setOrder(data);
      } catch (err) {
        console.error("Failed to fetch order:", err);
      } finally {
        setLoading(false);
      }
    }

    if (id) fetchOrder();
  }, [id]);

  console.log(order);

  if (loading) return <p style={{ marginBlock: "5rem" }}>Loading...</p>;
  if (!order) return <p style={{ marginBlock: "5rem" }}>Order not found</p>;

  return (
    <>
      <section className="banner-section main-section">
        <div className="banner">
          <p>
            Thank you,{" "}
            <span className="order-highlight">
              {order.shipping_details.lastName}!
            </span>
          </p>
          <p className="strong-text">We're processing your order📚</p>

          <p>
            Order summary has been sent to{" "}
            <span className="order-highlight">
              {order.shipping_details.email}
            </span>
          </p>
        </div>

        <div className="order-clipper">
          <div className="order-strip">
            <p className="order-highlight">Order Ref.</p>
            <p className="order-number">{order.reference}</p>
          </div>
          <div className="order-strip">
            <p className="order-highlight">Date</p>
            <p className="order-number">
              {dayjs(order.created_at).format("MMMM D, YYYY h:mm A")}
            </p>
          </div>
        </div>

        <article className="your-order">
          <h2 className="your-order-header">Your Order</h2>
          <div className="order-items-container">
            {order.items.map((item) => {
              return (
                <article key={item.id} className="order-item">
                  <div className="order-left">
                    <div className="order-image-container">
                      <img src={item.coverImage} alt="" />
                    </div>
                    <div className="order-item-details">
                      <p className="order-item-title">{item.title}</p>
                      <p className="order-item-author">{item.author}</p>
                      <p className="order-price-breakdown">
                        {item.quantity} x {item.price.paperback} paperback
                      </p>
                    </div>
                  </div>
                  <p className="order-item-price">
                    {convertToNaira(item.totalPrice)}
                  </p>
                </article>
              );
            })}
          </div>

          <div className="order-cost-breakdown">
            <div className="item-cost-element">
              <p className="order-cost-text">Subtotal</p>
              <p className="order-cost-digit">
                {convertToNaira(order.subtotal)}
              </p>
            </div>
            <div className="item-cost-element">
              <p className="order-cost-text">Delivery</p>
              <p className="order-cost-digit">
                {convertToNaira(order.courier_details.costInCents)}
              </p>
            </div>
            <div className="item-cost-element order-total">
              <p className="order-cost-text total-h2">Total</p>
              <p className="order-cost-digit">{convertToNaira(order.total)}</p>
            </div>
          </div>

          <div className="order-delivery-details">
            <p className="order-delivery-detail-header">
              Delivery Details (
              {`${order.courier_details.id} ${order.courier_details.desc}`} )
            </p>
            <div className="order-delivery-summary">
              <div className="location">
                <span className="order-delivery-h3">Address:</span>{" "}
                <span className="order-summary-detail order-highlight">
                  {order.shipping_details.address},{" "}
                  {order.shipping_details.city}, {order.shipping_details.state},{" "}
                  {order.shipping_details.country}.
                </span>
              </div>
              <div className="delivery-date">
                <span className="order-delivery-h3">Arrival: </span>
                <span className="order-summary-detail order-highlight">
                  {`${order.courier_details.minDeliveryDay} - ${order.courier_details.maxDeliveryDay}`}
                  .
                </span>
              </div>
            </div>
          </div>
        </article>

        <div className="order-cta-btns">
          <button
            className="button-primary"
            onClick={() => {
              navigate(`/orderStatus/${id}`);
            }}
          >
            ORDER STATUS
          </button>
          <button
            className="button-secondary"
            onClick={() => {
              navigate("/shop");
            }}
          >
            CONTINUE SHOPPING
          </button>
        </div>
      </section>
    </>
  );
}
