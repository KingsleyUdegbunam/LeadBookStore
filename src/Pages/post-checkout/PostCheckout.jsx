import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getOrderByRef } from "../../services/orderServices";
import { books } from "../../data/inventory";
import {
  OrderCostBreakDown,
  BooksPurchased,
} from "../../component/order/OrderSummary";
import { OrderInfo } from "../../component/order/OrderInfo";
import { UseAuth } from "../../context/AuthContext";
import {
  AuthenticatedBanner,
  GuestBanner,
} from "../../feature/post-checkout/components/Banner";
import { LoadingState } from "../../component/general/states/LoadingState";
import { EmptyState } from "../../component/general/states/EmptyState";
import image from "../../assets/empty-states/orders.svg";
import { BookCard } from "../../component/BookCard";
import { CarouselWrapper } from "../../feature/carousel/CarouselWrapper";
import useEmblaCarousel from "embla-carousel-react";
import { CarouselButton } from "../../feature/carousel/CarouselButton";
import { Receipt } from "./Receipt";
import "./PostCheckout.css";

export default function PostCheckout() {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const { ref } = useParams();
  const { session } = UseAuth();
  const navigate = useNavigate();

  const recentOrder = useMemo(() => {
    const stored = sessionStorage.getItem(`order:${ref}`);
    return stored ? JSON.parse(stored) : [];
  }, [ref]);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    dragFree: true,
    slidesToScroll: 1,

    breakpoints: {
      "(min-width: 768px)": {
        slidesToScroll: 3,
      },
      "(min-width: 1024px)": {
        slidesToScroll: 5,
      },
    },
  });

  useEffect(() => {
    async function loadOrder() {
      if (recentOrder?.ref === ref) {
        setOrder(recentOrder);
        return;
      }

      if (!session) {
        return;
      }
      const { data, error } = await getOrderByRef(ref);
      if (error) {
        return;
      }
      setOrder(data);
      sessionStorage.setItem(`order:${ref}`, JSON.stringify(data));
    }

    loadOrder().finally(() => {
      setLoading(false);
    });
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
    .slice(0, 10);

  if (loading) return <LoadingState />;
  if (!order && !loading)
    return (
      <div className="pages-wrapper">
        <EmptyState
          image={image}
          title="We couldn't retrieve your order details"
          body="You can still track your order using your order reference."
          actionText="Track My Order"
          onAction={() =>
            navigate(session ? `/account/orders` : "/track-order")
          }
        />
      </div>
    );

  return (
    <>
      <section className="no-print">
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
            <div className="carousel-section-header">
              <h2 className="order-summary-h2">Inspired By Your Order</h2>
              <CarouselButton emblaApi={emblaApi} />
            </div>
            <div className="related-reads">
              <CarouselWrapper array={recommendedBooks} emblaRef={emblaRef}>
                {(book) => <BookCard book={book} />}
              </CarouselWrapper>
            </div>
          </section>
        </div>
      </section>

      <div id="receipt">
        <Receipt order={order} />
      </div>
    </>
  );
}
