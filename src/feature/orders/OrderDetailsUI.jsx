import { Link } from "react-router-dom";
import useEmblaCarousel from "embla-carousel-react";
import { OrderTimeLine } from "./OrderTimeLine";
import { OrderShippingAddress } from "./OrderShippingAddress";
import { OrderCostSummary } from "./OrderCostSummary";
import { OrderDelivery } from "./OrderDelivery";
import { OrderPayment } from "./OrderPayment";
import { OrderDetailsHeader } from "./OrderDetailsHeader";
import BookRecommendations from "../../component/order/BookRecommendations";
import { BooksPurchased } from "../../component/order/OrderSummary";
import { CarouselButton } from "../carousel/CarouselButton";
import { RiArrowLeftLongLine } from "react-icons/ri";
import "./OrderDetailsUI.css";

export const OrderDetailsUI = ({ order, backTo, path }) => {
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

  return (
    <section>
      <nav>
        <Link className="order-details-navigation" to={path}>
          <RiArrowLeftLongLine />
          {backTo}
        </Link>
      </nav>
      <div className="page-content-wrapper">
        <OrderDetailsHeader order={order} />

        <div className="order-details-wrapper">
          <OrderTimeLine order={order} />
          <div className="grouped-details-cards">
            {/* SHIPPING ADDRESS */}
            <OrderShippingAddress order={order} />

            {/* PAYMENT */}
            <OrderPayment />

            {/* DELIVERY NOTES */}
            <OrderDelivery order={order} />

            {/* ORDER SUMARY */}
            <OrderCostSummary order={order} display="desktop" />
          </div>
          {/* BOOKS PURCHASED GRID */}
          <div className="order-details-card-text-flex books-purchased-container border">
            <p className="details-card-header">
              {`Book${order?.items?.length > 1 ? "s" : ""} Purchased (${order?.items?.length}) `}
            </p>
            <div>
              <BooksPurchased order={order} />
            </div>
          </div>

          {/* ORDER COST BREAKDOWN */}
          <OrderCostSummary order={order} display="mobile" />
        </div>
        <article className="recommendation">
          <div className="carousel-section-header">
            <p className="details-card-header">You May Also Like</p>
            <CarouselButton emblaApi={emblaApi} />
          </div>
          <BookRecommendations emblaRef={emblaRef} order={order} />
        </article>
      </div>
    </section>
  );
};
