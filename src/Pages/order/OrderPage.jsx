import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { getOrderById } from "../../services/orderServices";
import orderBox from "../../assets/order-box.png";
import { OrderSummary } from "../../component/order/OrderSummary";
import dayjs from "dayjs";
import "./OrderPage.css";
import { convertToNaira } from "../../utilities/money";
import { SlPrinter } from "react-icons/sl";
import { books } from "../../data/inventory";
import { BookCardRecommendation } from "../../component/BookCardRecommendation";
import { SignUpPostCheckoutForm } from "../../feature/PostCheckout/SignUpPostCheckout";

import { OrderInfo } from "../../component/order/OrderInfo";

export default function OrderPage() {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

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

  const collections = useMemo(() => {
    return [...new Set(order?.items.flatMap((item) => item.collections) ?? [])];
  }, [order]);
  const purchasedIDs = new Set(order?.items.map((item) => item.id));

  const recommendedBooks = books
    .filter((book) => !purchasedIDs.has(book.id))
    .map((book) => ({
      ...book,
      score: book.collections.filter((collection) =>
        collections.includes(collection),
      ).length,
    }))
    .filter((book) => book.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 6);

  if (loading) return <p style={{ marginBlock: "5rem" }}>Loading...</p>;
  if (!order) return <p style={{ marginBlock: "5rem" }}>Order not found</p>;

  return (
    <>
      <section className="order-page-wrapper">
        <div className="banner-and-signup">
          <section className="banner-section">
            <div>
              <p className="orderpage-header">
                Thanks you for{" "}
                <span className="header-red">shopping with us!</span>
              </p>
            </div>

            <div className="order-img-wrapper">
              <img src={orderBox} alt="Order box" />
            </div>

            <p className="mini-support-txt hero-msg-support">
              Your books are being carefully prepared for shipment.
            </p>

            <div className="order-details">
              <div>
                <p className="order-details-header mini-support-txt">
                  An email confirmation has been sent to
                </p>

                <p className="order-details-detail">
                  {order.shipping_details.email}
                </p>
              </div>

              <div className="user-order-details">
                <div>
                  <p className="order-details-header mini-support-txt">
                    Order Ref.
                  </p>

                  <p className="order-details-detail">{order.reference}</p>
                </div>
                <div>
                  <p className="order-details-header mini-support-txt">
                    Order Date
                  </p>

                  <p className="order-details-detail">
                    {dayjs(order.created_at).format("D, MMM YYYY h:mm A")}
                  </p>
                </div>
                <div>
                  <p className="order-details-header mini-support-txt">
                    Order Total
                  </p>

                  <p className="order-details-detail">
                    {convertToNaira(order.total)}
                  </p>
                </div>
              </div>
            </div>

            <button className="print-btn">
              <SlPrinter />
              <p className="order-details-header">Print receipt</p>
            </button>
          </section>

          <section className="signup-checkout">
            <SignUpPostCheckoutForm />
            {/* <SignupForm prefilledEmail={order.email} /> */}
          </section>
        </div>

        <section className="shipping-billing-section">
          <OrderInfo order={order} />
        </section>

        <section className="order-summary">
          <h2 className="order-summary-h2">Order Summary</h2>
          <OrderSummary order={order} />

          <div className="order-to-shop-btn-wrapper">
            <a href="/shop">
              <button className="order-to-shop-btn">Browse More Books</button>
            </a>
          </div>
        </section>

        <section className="recommendation-sec">
          <h2 className="order-summary-h2">Inspired By Your Order</h2>
          <div className="related-reads">
            <article className="products-container special-days">
              {recommendedBooks.map((book, index) => (
                <BookCardRecommendation key={index} book={book} />
              ))}
            </article>
          </div>
        </section>
      </section>
    </>
  );
}
