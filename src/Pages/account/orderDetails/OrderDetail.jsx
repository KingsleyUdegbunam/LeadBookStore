import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getOrderById } from "../../../services/orderServices";
import { Link } from "react-router-dom";
import { OrderSummary } from "../../../component/order/OrderSummary";
import { getOrderDate } from "../../../feature/checkout/utilities";
import { RiArrowLeftLongLine } from "react-icons/ri";
import { FaCircleDot } from "react-icons/fa6";
import { TbTruckDelivery } from "react-icons/tb";
import { MdPayment } from "react-icons/md";
import { LuClipboardList } from "react-icons/lu";
import { GrNotes } from "react-icons/gr";

import { PiPackageDuotone } from "react-icons/pi";
import { HiOutlineTruck } from "react-icons/hi2";

import { IoCheckmarkOutline } from "react-icons/io5";
import { convertToNaira } from "../../../utilities/money";
import BookRecommendation from "../../../component/order/BookRecommendation";
import "./OrderDetail.css";
import { toast } from "sonner";

const OrderDetail = () => {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    if (!id) return;
    async function fetchOrder() {
      setLoading(true);
      try {
        const data = await getOrderById(id);
        setOrder(data);
      } catch {
        toast.error("Oops, we've got some book worms in this page");
      } finally {
        setLoading(false);
      }
    }

    if (id) fetchOrder();
    window.scrollTo(0, 0);
  }, [id]);

  const ORDER_TIMELINE = [
    { key: "processing", title: "Processing" },
    { key: "shipped", title: "Shipped" },
    { key: "delivered", title: "Delivered" },
  ];

  const currentIndex = ORDER_TIMELINE.findIndex(
    (step) => step.key === order?.status,
  );

  if (loading) return <p className="pages-wrapper">Loading...</p>;
  if (!order) return;
  return (
    <section className="pages-wrapper order-details-page-wrapper">
      <nav>
        <Link className="order-details-navigation" to="/account/orders">
          <RiArrowLeftLongLine />
          Back to orders
        </Link>
      </nav>
      <div className="page-content-wrapper">
        <header className="order-details-page-header section">
          <div className="order-detail-number-date">
            <div className="order-number-and-status">
              <h2>Order #LB-{id}</h2>
              <div className={`order-status-indicator  ${order?.status}`}>
                {" "}
                <FaCircleDot />
                <p> {order?.status}</p>
              </div>
            </div>
            <p className="order-placed-date card-text-body">{`Placed on ${getOrderDate(order?.created_at, true)}`}</p>
          </div>
        </header>

        <div className="order-details-wrapper">
          <article className="timeline border">
            <p className="details-card-header order-progress-header">
              Order Status
            </p>
            {ORDER_TIMELINE.map((step, index) => {
              // Get Data
              const timestamp = order[`${step.key}_at`];

              // Calculate State
              const isCompleted = index < currentIndex;
              const isCurrent = index === currentIndex;
              const isLast = index === ORDER_TIMELINE.length - 1;

              // Decide icon
              let icon;

              if (step.key === "processing") {
                icon = <PiPackageDuotone />;
              } else if (step.key === "shipped") {
                icon = <HiOutlineTruck />;
              } else {
                icon = <IoCheckmarkOutline />;
              }
              return (
                <div className="timeline-item" key={step.key}>
                  {/* The cirle and the connecting line */}
                  <div className="timeline-marker">
                    <div
                      className={`timeline-icon ${isCompleted ? "completed" : ""} ${isCurrent ? "current" : ""}`}
                    >
                      {icon}
                    </div>

                    {!isLast && (
                      <div
                        className={`timeline-line ${isCompleted ? "completed" : ""}`}
                      />
                    )}
                  </div>

                  <div className="timeline-content">
                    <p className="timeline-title timeline-header">
                      {step.title}
                    </p>
                    {timestamp && (
                      <p className="timeline-date">
                        {getOrderDate(timestamp, true)}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </article>

          <div className="grouped-details-cards">
            {/* SHIPPING ADDRESS */}
            <article className="order-details-card">
              <div className="order-details-card-left">
                <div className="details-card-icon-wrapper">
                  <TbTruckDelivery />
                </div>

                <div className="order-details-card-text-flex">
                  <p className="details-card-header">Shipping Address</p>
                  <div className="card-text-body">
                    <p className="client">
                      {`${order?.shipping_details?.firstName} ${order?.shipping_details?.lastName},`}
                    </p>
                    <p className="client">
                      {`${order?.shipping_details?.address} ${order?.shipping_details?.city},`}
                    </p>

                    <p className="client">
                      {`${order?.shipping_details?.state}, ${order?.shipping_details?.country}.`}
                    </p>
                  </div>
                </div>
              </div>
            </article>

            {/* PAYMENT */}
            <article className="order-details-card">
              <div className="order-details-card-left">
                <div className="details-card-icon-wrapper">
                  <MdPayment />
                </div>

                <div className="order-details-card-text-flex">
                  <p className="details-card-header">Payment Method</p>
                  <div className="card-text-body">
                    <p className="client">Paystack </p>
                  </div>
                </div>
              </div>
              <p className="detail-card-pill green">Paid</p>
            </article>

            {/* DELIVERY NOTES */}
            {order?.shipping_details?.deliveryNotes && (
              <article className="order-details-card">
                <div className="order-details-card-left">
                  <div className="details-card-icon-wrapper">
                    <GrNotes />
                  </div>

                  <div className="order-details-card-text-flex">
                    <p className="details-card-header">Delivery Notes</p>
                    <div className="card-text-body">
                      <p className="client">
                        {order?.shipping_details?.deliveryNotes}
                      </p>
                    </div>
                  </div>
                </div>
              </article>
            )}

            {/* ORDER SUMARY */}
            <article className="order-details-card display-desktop detail-orders">
              <div className="order-details-card-left">
                <div className="details-card-icon-wrapper">
                  <LuClipboardList />
                </div>

                <div className="order-details-card-text-flex details-orders">
                  <p className="details-card-header">Order Summary</p>
                  <div className="card-text-body">
                    <div className="order-subtotal">
                      <div className="flex py space-between">
                        <p className="client">{`Subtotal (${order?.items?.length} book${order?.items?.length > 1 ? "s" : ""})`}</p>
                        <p>{convertToNaira(order?.subtotal)}</p>
                      </div>

                      <div className="flex py space-between">
                        <p className="client">{`Delivery Fee (${order?.courier_details?.id})`}</p>
                        <p>
                          {convertToNaira(order?.courier_details?.costInCents)}
                        </p>
                      </div>
                    </div>
                    <div className="flex order-total-cost space-between">
                      <p className="client">Total Paid</p>
                      <p>{convertToNaira(order?.total)}</p>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          </div>
          {/* BOOKS PURCHASED GRID */}
          <div className="order-details-card-text-flex books-purchased-container border">
            <p className="details-card-header">
              {`Book${order?.items?.length > 1 ? "s" : ""} Purchased (${order?.items?.length}) `}
            </p>
            <div>
              <OrderSummary order={order} />
            </div>
          </div>

          {/* ORDER COST BREAKDOWN */}
          <article className="order-details-card display-mobile detail-orders">
            <div className="order-details-card-left">
              <div className="details-card-icon-wrapper">
                <LuClipboardList />
              </div>

              <div className="order-details-card-text-flex details-orders">
                <p className="details-card-header">Order Summary</p>
                <div className="card-text-body">
                  <div className="order-subtotal">
                    <div className="flex py space-between">
                      <p className="client">{`Subtotal (${order?.items?.length} book${order?.items?.length > 1 ? "s" : ""})`}</p>
                      <p>{convertToNaira(order?.subtotal)}</p>
                    </div>

                    <div className="flex py space-between">
                      <p className="client">{`Delivery Fee (${order?.courier_details?.id})`}</p>
                      <p>
                        {convertToNaira(order?.courier_details?.costInCents)}
                      </p>
                    </div>
                  </div>
                  <div className="flex order-total-cost space-between">
                    <p className="client">Total Paid</p>
                    <p>{convertToNaira(order?.total)}</p>
                  </div>
                </div>
              </div>
            </div>
          </article>
        </div>
        <article className="border recommendation">
          <p className="details-card-header">You May Also Like</p>
          <BookRecommendation order={order} />
        </article>
      </div>
    </section>
  );
};

export default OrderDetail;
