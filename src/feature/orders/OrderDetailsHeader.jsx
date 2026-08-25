import { getOrderDate } from "../checkout/utilities";
import { FaCircleDot } from "react-icons/fa6";

export const OrderDetailsHeader = ({ order }) => {
  return (
    <header className="order-details-page-header section">
      <div className="order-detail-number-date">
        <div className="order-number-and-status">
          <h2>Order #LB-{order.id}</h2>
          <div className={`order-status-indicator  ${order?.status}`}>
            <FaCircleDot />
            <p> {order?.status}</p>
          </div>
        </div>
        <p className="order-placed-date card-text-body">{`Placed on ${getOrderDate(order?.created_at, true)}`}</p>
      </div>
    </header>
  );
};
