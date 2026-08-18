import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { getOrderByRef } from "../../services/orderServices";
import { books } from "../../data/inventory";
import {
  OrderCostBreakDown,
  BooksPurchased,
} from "../../component/order/OrderSummary";
import { OrderInfo } from "../../component/order/OrderInfo";
import { toast } from "sonner";
import { UseAuth } from "../../context/AuthContext";
import {
  AuthenticatedBanner,
  GuestBanner,
} from "../../feature/post-checkout/components/Banner";
import { BookCard } from "../../component/BookCard";
import "./PostCheckout.css";
import { LoadingState } from "../../component/general/states/LoadingState";

export default function PostCheckout() {
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

  if (loading) return <LoadingState />;
  if (!order) return <p style={{ marginBlock: "5rem" }}>Order not found</p>;

  return (
    <>
      <section className="">
        {!session && recentOrder && <GuestBanner order={order} />}

        {session && <AuthenticatedBanner order={order} />}

        <div className="order-page-body pages-wrapper-variation">
          <section className="shipping-billing-section order-section-wrapper">
            <OrderInfo order={order} />
          </section>

          <section className="order-summary order-section-wrapper">
            <h2 className="order-summary-h2">Order Summary</h2>
            <BooksPurchased order={order} />
            <OrderCostBreakDown order={order} />
            <div className="order-to-shop-btn-wrapper">
              <a href="/shop">
                <button className="button-secondary">Browse More Books</button>
              </a>
            </div>
          </section>
          <section className="recommendation-sec order-section-wrapper">
            <h2 className="order-summary-h2">Inspired By Your Order</h2>
            <div className="related-reads">
              <article className="products-container special-days">
                {recommendedBooks.map((book, index) => (
                  <BookCard index={index} book={book} />
                ))}
              </article>
            </div>
          </section>
        </div>
      </section>
    </>
  );
}
