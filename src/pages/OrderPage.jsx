import { useLocation } from "react-router-dom";
import { convertToNaira } from "../utilities/money";
import { useNavigate } from "react-router-dom";
import "./OrderPage.css";

export default function OrderPage() {
  console.log(useLocation());
  const { state } = useLocation();
  const { cartInDetail, shippingDetails, address, orderSummary } = state;

  const navigate = useNavigate();

  return (
    <>
      <section className="banner-section main-section">
        <div className="banner">
          <p>ORDER CONFIRMED</p>
          <p>
            Thank you,{" "}
            <span className="order-highlight">{shippingDetails.lastName}</span>
          </p>
          <p>
            A confirmation has been sent to{" "}
            <span className="order-highlight">{shippingDetails.email}</span>
          </p>
        </div>

        <div className="order-clipper">
          <div className="order-strip">
            <p className="order-highlight">Order Number</p>
            <p className="order-number">ORG-0041</p>
          </div>
          <div className="order-strip">
            <p className="order-highlight">Date</p>
            <p className="order-number">{orderSummary.today}</p>
          </div>
        </div>

        <article className="your-order">
          <h2 className="your-order-header">Your Order</h2>
          <div className="order-items-container">
            {cartInDetail.map((item) => {
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
                {convertToNaira(orderSummary.subtotal)}
              </p>
            </div>
            <div className="item-cost-element">
              <p className="order-cost-text">Delivery</p>
              <p className="order-cost-digit">
                {convertToNaira(orderSummary.shippingOption.costInCents)}
              </p>
            </div>
            <div className="item-cost-element order-total">
              <p className="order-cost-text total-h2">Total</p>
              <p className="order-cost-digit">
                {convertToNaira(orderSummary.total)}
              </p>
            </div>
          </div>

          <div className="order-delivery-details">
            <p className="order-delivery-detail-header">
              Delivery Details(
              {`${orderSummary.shippingOption.id} ${orderSummary.shippingOption.desc}`}{" "}
              )
            </p>
            <div className="order-delivery-summary">
              <div className="location">
                <span className="order-delivery-h3">Address:</span>{" "}
                <span className="order-summary-detail order-highlight">
                  {shippingDetails.address}, {address.city}, {address.state}
                </span>
              </div>
              <div className="delivery-date">
                <span className="order-delivery-h3">Estimated: </span>
                <span className="order-summary-detail order-highlight">
                  {`${orderSummary.shippingOption.maxDeliveryDay} - ${orderSummary.shippingOption.minDeliveryDay}`}
                </span>
              </div>
            </div>
          </div>
        </article>

        <div className="order-cta-btns">
          <button className="track-btn">TRACK MY ORDER</button>
          <button
            className="back-to-shop-btn"
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
