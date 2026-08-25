import { IoCheckmarkOutline } from "react-icons/io5";
import { HiOutlineTruck } from "react-icons/hi2";
import { PiPackageDuotone } from "react-icons/pi";
import { getOrderDate } from "../checkout/utilities";
export const OrderTimeLine = ({ order }) => {
  const ORDER_TIMELINE = [
    { key: "processing", title: "Processing" },
    { key: "shipped", title: "Shipped" },
    { key: "delivered", title: "Delivered" },
  ];

  const currentIndex = ORDER_TIMELINE.findIndex(
    (step) => step.key === order?.status,
  );

  return (
    <article className="timeline border">
      <p className="details-card-header order-progress-header">Order Status</p>
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
              <p className="timeline-title timeline-header">{step.title}</p>
              {timestamp && (
                <p className="timeline-date card-text-body">
                  {getOrderDate(timestamp, true)}
                </p>
              )}
            </div>
          </div>
        );
      })}
    </article>
  );
};
