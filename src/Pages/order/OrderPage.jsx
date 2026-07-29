import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { getOrderByRef } from "../../services/orderServices";
import orderBox from "../../assets/order-box.png";
import {
  OrderCostBreakDown,
  BooksPurchased,
} from "../../component/order/OrderSummary";
import { books } from "../../data/inventory";
import { BookCardRecommendationCard } from "../../component/BookCardRecommendationCard";
import { OrderInfo } from "../../component/order/OrderInfo";
import { toast } from "sonner";
import { UseAuth } from "../../context/AuthContext";
import "./OrderPage.css";
import {
  AuthenticatedBanner,
  GuestBanner,
} from "../../feature/PostCheckout/Banner";
export default function OrderPage() {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const { ref } = useParams();

  const { session } = UseAuth();
  const recentOrder = useMemo(() => {
    const stored = sessionStorage.getItem("recentOrder");
    return stored ? JSON.parse(stored) : [];
  }, []);

  useEffect(() => {
    async function loadOrder() {
      if (recentOrder?.reference === ref) {
        setOrder(recentOrder);
        setLoading(false);
        return;
      }

      if (!session) {
        setLoading(false);
        return;
      }

      try {
        const data = await getOrderByRef(ref);
        setOrder(data);
      } catch {
        toast.error("Failed to fetch order");
      } finally {
        setLoading(false);
      }
    }
    loadOrder();
  }, [recentOrder, ref, session]);

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
      {!session && recentOrder && (
        <GuestBanner orderBox={orderBox} order={order} />
      )}

      <section className="order-page-wrapper">
        {session && <AuthenticatedBanner order={order} orderBox={orderBox} />}

        <div className="pages-wrapper-variation order-page-body">
          <section className="shipping-billing-section">
            <OrderInfo order={order} />
          </section>

          <section className="order-summary">
            <h2 className="order-summary-h2">Order Summary</h2>
            <BooksPurchased order={order} />
            <OrderCostBreakDown order={order} />
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
                  <BookCardRecommendationCard key={index} book={book} />
                ))}
              </article>
            </div>
          </section>
        </div>
      </section>
    </>
  );
}
