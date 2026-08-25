import { LuClipboardList } from "react-icons/lu";
import { convertToNaira } from "../../utilities/money";

export const OrderCostSummary = ({ order, display }) => {
  return (
    <article className={`order-details-card display-${display} detail-orders`}>
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
                <p>{convertToNaira(order?.courier_details?.costInCents)}</p>
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
  );
};
