import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { getOrderById } from "../../services/orderServices";
import orderBox from "../../assets/order-box.png";
import dayjs from "dayjs";
import "./OrderPage.css";
import { convertToNaira } from "../../utilities/money";
import { SlPrinter } from "react-icons/sl";
import { books } from "../../data/inventory";
import { BookCardRecommendation } from "../../component/BookCardRecommendation";

export default function OrderPage({ addToCart }) {
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

        <section>
          <div className="shipping-billing-grid">
            <div>
              <div className="shipping-billing-grid-cell">
                <p className="shipping-billing-header">Shipping To</p>
                <p className="shipping-billing-name">
                  {`${order.shipping_details.firstName} ${order.shipping_details.lastName}`}
                </p>
                <div>
                  <p className="shipping-billing-detail-regular">
                    {`${order.shipping_details.address}, ${order.shipping_details.city}, ${order.shipping_details.state}`}
                  </p>
                  <p className="shipping-billing-detail-regular">
                    {order.shipping_details.tel}
                  </p>
                </div>
              </div>
            </div>

            <div>
              <div className="shipping-billing-grid-cell">
                <p className="shipping-billing-header">Billing Address</p>
                <p className="shipping-billing-name">
                  {`${order.shipping_details.firstName} ${order.shipping_details.lastName}`}
                </p>
                <div>
                  <p className="shipping-billing-detail-regular">
                    {`${order.shipping_details.address}, ${order.shipping_details.city}, ${order.shipping_details.state}`}
                  </p>
                  <p className="shipping-billing-detail-regular">
                    {order.shipping_details.tel}
                  </p>
                </div>
              </div>
            </div>

            <div>
              <div className="shipping-billing-grid-cell">
                <p className="shipping-billing-header">Delivery</p>

                <div>
                  <p className="shipping-billing-name">
                    {`${order.courier_details.minDeliveryDay} - ${order.courier_details.maxDeliveryDay}`}
                  </p>
                  <p className="shipping-billing-detail-regular">
                    {`${order.courier_details.id}`}
                  </p>
                </div>
              </div>
            </div>

            <div className="col-2">
              <div className="shipping-billing-grid-cell">
                <p className="shipping-billing-header">Payment</p>

                <div>
                  <p className="shipping-billing-detail-regular">
                    {`${order.shipping_details.address}, ${order.shipping_details.city}, ${order.shipping_details.state}`}
                  </p>
                  <p className="shipping-billing-detail-regular">
                    {order.shipping_details.tel}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="order-summary">
          <h2 className="order-summary-h2">Order Summary</h2>
          <div className="order-items">
            {order.items.map((item) => {
              return (
                <article key={item.id} className="order-item-grid">
                  <div className="order-img-container">
                    <img src={item.coverImage} height={56} alt="" />
                  </div>

                  <div className="order-item-txt">
                    <div>
                      <p className="order-item-title">{item.title}</p>
                      <p className="order-item-author">{item.author}</p>
                    </div>

                    <div className="order-item-qty">
                      <p>{`Qty: ${item.quantity}`}</p>
                    </div>
                  </div>
                  <div className="order-item-price">
                    <p>{convertToNaira(item.totalPrice)}</p>
                  </div>
                </article>
              );
            })}
          </div>

          <div className="cost-summation">
            <div className="subtotal-delivery">
              <div className="order-cost-fraction">
                <p className="cost-summation-title">Subtotal</p>
                <p className="cost-summation-money">
                  {convertToNaira(order.subtotal)}
                </p>
              </div>
              <div className="order-cost-fraction">
                <p className="cost-summation-title">Delivery</p>
                <p className="cost-summation-money">
                  {convertToNaira(order.courier_details.costInCents)}
                </p>
              </div>
            </div>

            <div className="cost-summation-total">
              <p className="cost-summation-total-title">Total</p>
              <p className="cost-summation-total-money">
                {convertToNaira(order.total)}
              </p>
            </div>
          </div>
        </section>
        <div className="order-to-shop-btn-wrapper">
          <a href="/shop">
            <button className="order-to-shop-btn">Continue Shopping</button>
          </a>
        </div>

        <section className="recommendation-sec">
          <h2 className="order-summary-h2">Inspired By Your Order</h2>
          <div className="related-reads">
            <article className="products-container special-days">
              {recommendedBooks.map((book, index) => (
                <BookCardRecommendation
                  key={index}
                  id={book.id}
                  book={book}
                  image={book.coverImage}
                  category={book.primaryCollection}
                  title={book.title}
                  priceInKobo={book.price.paperback}
                  addToCart={addToCart}
                />
              ))}
            </article>
          </div>
        </section>

        <div className="order-cta-btns"></div>
      </section>
    </>
  );
}
